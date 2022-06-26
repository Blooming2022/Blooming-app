import firestore, {firebase} from '@react-native-firebase/firestore';
import {
  updateUserProfile,
  getUserProfile,
  getCurrentUser,
  usersCollection,
  checkUserLevel,
} from './authServices';
import {getKSTTime} from './commonServices';
import {deleteRev, getRevById} from './reviewServices';

const WEEK = 0;
const MONTH = 1;
const SEASON = 2;

/**
 * 새로운 미션을 생성하기 위해 호출하는 함수.
 * misData는 아래와 같은 형식입니다.
 * {
 *  misTitle: str,
 *  misPeriod: int,
 *  picNum: int,
 *  isSuccess: boolean,
 *  misSuccessDate: timeStamp,
 *  isMisSelf: boolean,
 *  misMemo: str,
 *  hasReview: boolean
 * }
 * const newMisInfo = await createCurrentMis(misData);
 * 와 같이 await를 사용해서 호출해주셔야 새로 생성된 미션 정보를 읽어올 수 있습니다.
 * @param {*} misData 미션 데이터 정보
 * @returns 성공시 Promise<FirebaseFirestoreTypes.DocumentData> | 실패시 -1
 */
const createCurrentMis = async misData => {
  let misRef = usersCollection.doc(getCurrentUser().uid).collection('currentMisList');
  try {
    const doc = misRef.doc();
    await doc.set(misData);
    let documentData = (await doc.get()).data();
    documentData.id = doc.id;
    return documentData;
  } catch (e) {
    console.log(e.message);
    return -1;
  }
};

/**
 * misID를 이용해 진행 미션 한 개를 조회하는 함수.
 * @param {str} misID 조회하고자 하는 미션의 ID
 * @returns 성공시 Promise | 실패시 -1
 */
const getCurrentMisById = async misID => {
  try {
    const misRef = usersCollection.doc(getCurrentUser().uid).collection('currentMisList');
    const docRef = misRef.where(firebase.firestore.FieldPath.documentId(), '==', misID);
    let data = await docRef.get();
    const ret = data.docs.map(doc => ({...doc.data(), id: doc.id}));
    return ret[0];
  } catch (e) {
    console.log(e.message);
    return -1;
  }
};

/**
 * 기간별 진행미션 리스트 조회
 * @param {int} period period=0이면 한주, 1이면 한달, 2이면 계절, 그 외에는 전체 미션 리스트 데이터를 가져옴
 * @returns 성공시 Promise | 실패시 -1
 */
const getCurrentMisList = async period => {
  let misRef = usersCollection.doc(getCurrentUser().uid).collection('currentMisList');

  if (period == WEEK) {
    misRef = misRef.where('misPeriod', '==', 0);
  } else if (period == MONTH) {
    misRef = misRef.where('misPeriod', '==', 1);
  } else if (period == SEASON) {
    misRef = misRef.where('misPeriod', '==', 2);
  }

  try {
    const data = await misRef.get();
    const ret = data.docs.map(doc => ({...doc.data(), id: doc.id}));
    console.log(ret);
    return ret;
  } catch (e) {
    console.log(e.message);
    return -1;
  }
};

/**
 * misID와 updateInfo가 담긴 object를 받아 misID에 해당하는 미션을 수정하는 함수
 *
 * updateInfo = {
 *   misTitle: 'fakeTItle',
 *   misMemo: 'newMemo',
 *   misSuccessDate: timeStamp,
 * }
 * 위와 같은 형식으로 updateMisInfo.updateInfo에는 수정할 정보만 넣어서 호출해주세요.
 *
 * const updatedMisInfo = await updateCurrentMis(updateMisInfo);
 * 와 같이 await를 사용해서 호출해주셔야 수정된 current 미션 정보를 읽어올 수 있습니다.
 *
 * @param {
 *  misID: str,
 *  updateInfo: {object}
 * } updateMisInfo 미션을 수정할 정보를 담은 object
 * @returns 성공시 Promise<FirebaseFirestoreTypes.DocumentData> | 실패시 -1
 */
const updateCurrentMis = async updateMisInfo => {
  try {
    const uid = getCurrentUser().uid;
    let misRef = usersCollection.doc(uid).collection('currentMisList');

    // misTitle, misSuccessDate가 변경되면 후기가 있는지 체크하고, 후기 데이터에서도 변경해줌. 실패상태로 변하면 후기를 삭제함
    if (
      updateMisInfo.updateInfo.misTitle ||
      updateMisInfo.updateInfo.misSuccessDate ||
      updateMisInfo.updateInfo.isSuccess == false
    ) {
      const misData = await getCurrentMisById(updateMisInfo.misID);
      let updateRevInfo = {
        misID: updateMisInfo.misID,
      };
      if (misData.hasReview == true) {
        if (updateMisInfo.updateInfo.misTitle)
          updateRevInfo.misTitle = updateMisInfo.updateInfo.misTitle;
        if (updateMisInfo.updateInfo.misSuccessDate)
          updateRevInfo.misSuccessDate = updateMisInfo.updateInfo.misSuccessDate;
        await usersCollection
          .doc(uid)
          .collection('revList')
          .doc(updateMisInfo.misID)
          .update(updateRevInfo);
        if (updateMisInfo.updateInfo.isSuccess == false) {
          const delRevInfo = {
            misID: updateMisInfo.misID,
            revImg: (await getRevById(updateMisInfo.misID)).revImg,
            isOutdated: false,
          };
          deleteRev(delRevInfo);
        }
      }
    }

    // 이미 성공했던 미션을 실패상태로 바꾸면 misSuccessDate 필드값을 null로 재설정
    if (updateMisInfo.updateInfo.isSuccess == false) {
      updateMisInfo.updateInfo.misSuccessDate = null;
    }
    await misRef.doc(updateMisInfo.misID).update(updateMisInfo.updateInfo);

    // 미션정보에 미션 ID를 추가해서 반환
    let documentData = (await misRef.doc(updateMisInfo.misID).get()).data();
    documentData.id = misRef.doc(updateMisInfo.misID).id;
    return documentData;
  } catch (e) {
    console.log(e.message);
    return -1;
  }
};

/**
 * misID에 해당하는 진행미션을 삭제.
 * @param {
 *  misID: str
 *  hasReview: boolean
 * } delMisInfo 삭제하고자 하는 미션의 정보를 담은 object
 * @returns 성공시 Promise<void> | 실패시 -1
 */
const deleteCurrentMis = async delMisInfo => {
  try {
    if (delMisInfo.hasReview == true) {
      const revInfo = await getRevById(delMisInfo.misID);
      await deleteRev({misID: delMisInfo.misID, revImg: revInfo.revImg, isOutdated: false});
    }
    const misRef = usersCollection.doc(getCurrentUser().uid).collection('currentMisList');
    return misRef.doc(delMisInfo.misID).delete();
  } catch (e) {
    console.log(e.message);
    return -1;
  }
};

/**
 * 성공미션 생성(해당 미션의 기간이 끝났을 때, 미션의 isSuccess:true 상태라면 호출되는 함수)
 * @param {*} misID currentMisList에서 prevSuccessMisList로 추가할 미션의 ID
 * @returns 성공시 Promise<void> | 실패시 -1
 */
const createPrevSuccessMis = async misID => {
  try {
    const misData = await getCurrentMisById(misID);
    const ret = usersCollection
      .doc(getCurrentUser().uid)
      .collection('prevSuccessMisList')
      .doc(misID)
      .set(misData);
    const userProfile = await getUserProfile();
    let successNum = userProfile.successNum;
    successNum = successNum + 1;
    updateUserProfile({successNum: successNum});
    checkUserLevel();
    return ret;
  } catch (e) {
    console.log(e.message);
    return -1;
  }
};

/**
 * misID에 해당하는 PrevSuccessMission 한 개 조회
 *
 * @param {*} misID 조회하고자 하는 PrevSuccessMission의 ID
 * @returns 성공시 Promise | 실패시 -1
 */
const getPrevSuccessMisById = async misID => {
  try {
    const misRef = usersCollection.doc(getCurrentUser().uid).collection('prevSuccessMisList');
    const docRef = misRef.where(firebase.firestore.FieldPath.documentId(), '==', misID);
    const data = await docRef.get();

    const ret = data.docs.map(doc => ({...doc.data(), id: doc.id}));
    return ret[0];
  } catch (e) {
    console.log(e.message);
    return -1;
  }
};

/**
 * 성공미션 기간별 전체 리스트 조회
 *
 * @param {int} period period=0이면 한주, 1이면 한달, 2이면 계절, 그 외에는 전체 미션 리스트 데이터를 가져옴
 * @returns 성공시 Promise | 실패시 -1
 */
const getPrevSuccessMisList = async period => {
  let misRef = usersCollection.doc(getCurrentUser().uid).collection('prevSuccessMisList');

  if (period == WEEK) {
    misRef = misRef.where('misPeriod', '==', 0);
  } else if (period == MONTH) {
    misRef = misRef.where('misPeriod', '==', 1);
  } else if (period == SEASON) {
    misRef = misRef.where('misPeriod', '==', 2);
  }

  try {
    const data = await misRef.get();
    const ret = data.docs.map(doc => ({...doc.data(), id: doc.id}));
    console.log(ret);
    return ret;
  } catch (e) {
    console.log(e.message);
    return -1;
  }
};

/**
 * PrevSuccessMisList에서 misSuccessDate 필드값을 기준으로 최근에 성공한 미션을 조회
 * PrevSuccessMission이 3개 이상 있으면 세 개 조회, 그보다 적은 경우에는 PrevSuccessMisList 내의 미션을 모두 조회
 * @returns 성공시 Promise<> | 실패시 -1 | 성공미션이 없는 경우 0
 */
const getLatestPrevSuccessMis = async () => {
  try {
    const userProfile = await getUserProfile();
    const successNum = userProfile.successNum;
    let limitNum;
    if (successNum >= 3) {
      limitNum = 3;
    } else if (successNum == 2) {
      limitNum = 2;
    } else if (successNum == 1) {
      limitNum = 1;
    } else {
      limitNum = 0;
      console.log('There is no Data.');
      return [];
    }
    const latestMis = await usersCollection
      .doc(getCurrentUser().uid)
      .collection('prevSuccessMisList')
      .orderBy('misSuccessDate', 'desc')
      .limit(limitNum)
      .get();
    return latestMis.docs.map(doc => ({...doc.data(), id: doc.id}));
  } catch (e) {
    console.log(e.message);
    return -1;
  }
};

/**
 * misID에 해당하는 PrevSuccessMission을 삭제.
 * @param {
 *  misID: str
 *  hasReview: boolean
 * } delMisInfo 삭제하고자 하는 미션의 ID
 * @returns 성공시 Promise<void> | 실패시 -1
 */
const deletePrevSuccessMis = async delMisInfo => {
  try {
    if (delMisInfo.hasReview == true) {
      const revInfo = await getRevById(delMisInfo.misID);
      await deleteRev({misID: delMisInfo.misID, revImg: revInfo.revImg, isOutdated: true});
    }

    const ret = usersCollection
      .doc(getCurrentUser().uid)
      .collection('prevSuccessMisList')
      .doc(delMisInfo.misID)
      .delete();
    const userProfile = await getUserProfile();
    let successNum = userProfile.successNum;
    successNum = successNum - 1;
    updateUserProfile({successNum: successNum});
    checkUserLevel();
    return ret;
  } catch (e) {
    console.log(e.message);
    return -1;
  }
};

/**
 * 진행중인 미션의 기간이 끝났을 때 불려올 함수
 * @param {int} period
 * @returns 성공시 Promise<number> | 실패시 -1
 */
const clearCurrentMisList = async period => {
  try {
    const curMisList = await getCurrentMisList(period);
    curMisList.forEach(async element => {
      // 미션의 기간이 끝났을 때 저장해놓을 필요가 없는 필드들을 삭제
      const updateMisInfo = {
        misID: element.id,
        updateInfo: {
          picNum: firebase.firestore.FieldValue.delete(),
          isSuccess: firebase.firestore.FieldValue.delete(),
        },
      };
      await updateCurrentMis(updateMisInfo);

      // 이때 성공상태인 미션들은 prevSuccessMisList에 넣어줌
      if (element.isSuccess == true) {
        await createPrevSuccessMis(element.id);
      }

      // currentMisList를 비워줌
      return await deleteCurrentMis({misID: element.id, hasReview: false});
    });
  } catch (e) {
    console.log(e.message);
    return -1;
  }
};

/**
 * 진행중인 미션의 기간이 끝났는지 아닌지 체크하는 함수.
 * 만약 기간이 끝났다면 currentMisList 내의 isSuccess:true인 미션을 모두 prevSuccessMissionList로 옮기고, currentMisList를 비운다.
 * @returns Promise<void>
 */
const checkCurrentMisListValid = async () => {
  const HOUR = 1 * 60 * 60 * 1000;
  const DAY = 24 * HOUR;

  const timeCollection = firestore().collection('TargetTime');
  let targetWeek = await timeCollection.doc('targetWeek').get();
  let targetMonth = await timeCollection.doc('targetMonth').get();
  let targetSeason = await timeCollection.doc('targetSeason').get();

  let now = new Date();
  let today = new Date().getTime() + 9 * HOUR;
  let diffWeek = today - targetWeek.data().targetTime;
  let diffMonth = today - targetMonth.data().targetTime;
  let diffSeason = today - targetSeason.data().targetTime;

  if (diffWeek >= 0) {
    const nextTime = targetWeek.data().targetTime + 7 * DAY;
    timeCollection.doc('targetWeek').update({targetTime: nextTime});
    clearCurrentMisList(0);
  }

  if (diffMonth >= 0) {
    const thisMonth = now.getMonth();
    let nextTime = new Date(now.getFullYear(), thisMonth + 1, 1).getTime();
    if (nextTime == targetMonth.data().targetTime) {
      nextTime = new Date(now.getFullYear(), thisMonth + 2, 1).getTime();
    }
    timeCollection.doc('targetMonth').update({targetTime: nextTime});
    clearCurrentMisList(1);
  }

  if (diffSeason >= 0) {
    let thisMonth;
    switch (now.getMonth()) {
      case 11:
      case 0:
      case 1:
        thisMonth = 11;
        break;

      case 2:
      case 3:
      case 4:
        thisMonth = 2;
        break;

      case 5:
      case 6:
      case 7:
        thisMonth = 5;
        break;

      case 8:
      case 9:
      case 10:
        thisMonth = 8;
        break;
    }
    let nextTime = new Date(now.getFullYear(), thisMonth + 3, 1).getTime();
    if (nextTime == targetSeason.data().targetTime) {
      nextTime = new Date(now.getFullYear(), thisMonth + 4, 1).getTime();
    }
    timeCollection.doc('targetSeason').update({targetTime: nextTime});
    clearCurrentMisList(2);
  }
  return;
};

/**
 * 랜덤미션 생성하기를 눌렀을 때 랜덤미션 키워드 2개를 묶어 반환하는 함수
 * {"result1": "인테리어", "result2": "캠핑"} 형식으로 return
 * @param {boolean} isSeason 계절 랜덤미션을 생성하면 true, 아니면 false 넣어 호출
 * @returns 성공시 Promise <result1: str, result2: str> | 실패시 -1
 */
const getRandomKeywords = async isSeason => {
  try {
    const docRef = firestore().collection('crawlingData').doc('randomKeywords');
    const data = (await docRef.get()).data();
    let seasonDocRef;
    let seasonData;

    const getLengthOfObject = obj => Object.keys(obj).length;

    const range = getLengthOfObject(data);
    let seasonRange;

    let randNo1, randNo2;
    let keyword1, keyword2;
    let season;

    if (!isSeason) {
      randNo1 = Math.floor(Math.random() * range);
      randNo2 = Math.floor(Math.random() * range);
      while (randNo1 == randNo2) {
        randNo2 = Math.floor(Math.random() * range);
      }
      keyword1 = data[randNo1];
      keyword2 = data[randNo2];
    } else {
      const now = getKSTTime();
      const month = new Date(now).getMonth();
      if (month === 2 || month === 3 || month === 4) season = 0;
      if (month === 5 || month === 6 || month === 7) season = 1;
      if (month === 8 || month === 9 || month === 10) season = 2;
      if (month === 0 || month === 1 || month === 11) season = 3;

      if (season == 0) {
        seasonDocRef = firestore().collection('crawlingData').doc('springKeywords');
        seasonData = (await seasonDocRef.get()).data();
      } else if (season == 1) {
        seasonDocRef = firestore().collection('crawlingData').doc('summerKeywords');
        seasonData = (await seasonDocRef.get()).data();
      } else if (season == 2) {
        seasonDocRef = firestore().collection('crawlingData').doc('autumnKeywords');
        seasonData = (await seasonDocRef.get()).data();
      } else if (season == 3) {
        seasonDocRef = firestore().collection('crawlingData').doc('winterKeywords');
        seasonData = (await seasonDocRef.get()).data();
      }
      seasonRange = getLengthOfObject(seasonData);

      randNo1 = Math.floor(Math.random() * range);
      randNo2 = Math.floor(Math.random() * seasonRange);
      keyword1 = data[randNo1];
      keyword2 = seasonData[randNo2];

      while (keyword1 == keyword2) {
        randNo1 = Math.floor(Math.random() * range);
        keyword1 = data[randNo1];
      }
    }

    const result = {
      result1: keyword1,
      result2: keyword2,
    };
    console.log(result);
    return result;
  } catch (e) {
    console.log(e.message);
    return -1;
  }
};

export {
  createCurrentMis,
  getCurrentMisById,
  getCurrentMisList,
  updateCurrentMis,
  deleteCurrentMis,
  getPrevSuccessMisById,
  getPrevSuccessMisList,
  getLatestPrevSuccessMis,
  deletePrevSuccessMis,
  checkCurrentMisListValid,
  getRandomKeywords,
};
