import firestore, { firebase } from '@react-native-firebase/firestore';
import { updateUserProfile, getUserProfile, getCurrentUser, usersCollection, checkUserLevel } from './authServices';
import { deleteRev, getRevById } from './reviewServices';

const WEEK = 0;
const MONTH = 1;
const SEASON = 2;

const selfMaxWeek = 2;
const randMaxWeek = 2;
const selfMaxMonth = 1;
const randMaxMonth = 1;
const selfMaxSeason = 1;
const randMaxSeason = 1;

/** 
 * 새로운 미션을 생성하기 위해 호출하는 함수.
 * misData는 아래와 같은 형식입니다.
 * {
 *  misTitle: str,
 *  misPeriod: int,
 *  picNum: int,
 *  isSuccess: boolean,
 *  successDate: Date,
 *  isMisSelf: boolean,
 *  isAlarmSet: boolean,
 *  misAlarmHour: Date,
 *  misAlarmMinute: int,
 *  misAlarmStart: Date,
 *  misAlarmStop: Date,
 *  misMemo: str,
 *  hasReview: boolean
 * }
 * @param {*} misData 미션 데이터 정보
 * @returns 성공시 Promise<misData> | 실패시 -1
 */
const createCurrentMis = (misData) => {
  let misRef = usersCollection.doc(getCurrentUser().uid).collection('currentMisList');

  try {
    return misRef.doc().set(misData);
  } catch (e) {
    console.log(e.message);
    return -1;
  }
}

/** 
 * misID를 이용해 진행 미션 한 개를 조회하는 함수.
 * @param {str} misID 조회하고자 하는 미션의 ID
 * @returns 성공시 Promise | 실패시 -1
 */
const getCurrentMisById = async (misID) => {
  try {
    const misRef = usersCollection.doc(getCurrentUser().uid).collection('currentMisList');
    const docRef = misRef.where(firebase.firestore.FieldPath.documentId(), '==', misID);
    let data = await docRef.get();
    const ret = data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    return ret[0];
  } catch (e) {
    console.log(e.message);
    return -1;
  }
}

/** 
 * 기간별 진행미션 리스트 조회
 * @param {int} period period=0이면 한주, 1이면 한달, 2이면 계절, 그 외에는 전체 미션 리스트 데이터를 가져옴
 * @returns 성공시 Promise | 실패시 -1
 */
const getCurrentMisList = async (period) => {
  let misRef = usersCollection.doc(getCurrentUser().uid).collection('currentMisList');

  if ( period == WEEK ) {
    misRef = misRef.where('misPeriod', '==', 0);
  } else if ( period == MONTH ) {
    misRef = misRef.where('misPeriod', '==', 1);
  } else if ( period == SEASON ) {
    misRef = misRef.where('misPeriod', '==', 2);
  }

  try {
    const data = await misRef.get();
    const ret = data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    console.log(ret);
    return ret;
  } catch (e) {
    console.log(e.message);
    return -1;
  }
}

/**
 * misID와 misData를 받아 misID에 해당하는 미션을 수정하는 함수
 * 
 * updateInfo = {
 *   misTitle: 'fakeTItle',
 *   misMemo: 'newMemo'
 * }
 * 위와 같은 형식으로 updateMisInfo.updateInfo에는 수정할 정보만 넣어서 호출
 * @param {
 *  misID: str,
 *  updateInfo: {object}
 * } updateMisInfo 
 * @returns 성공시 Promise | 실패시 -1
 */
const updateCurrentMis = async (updateMisInfo) => {
  let misRef = usersCollection.doc(getCurrentUser().uid).collection('currentMisList');

  try {
    // 미션 title이 변경되면 후기탭에서 참조할 데이터의 미션 title도 변경해줌
    if(updateMisInfo.updateInfo.misTitle){
      const misData = await getCurrentMisById(updateMisInfo.misID);
      if ( misData.hasReview == true ) {
        usersCollection.doc(getCurrentUser().uid).collection('revList').doc(updateMisInfo.misID).update({misTitle: updateMisInfo.updateInfo.misTitle});
      }
    }
    
    // 성공상태로 변화하면 성공시간을 변경, 실패상태로 변화하면 성공시간을 null로 다시 설정해줌
    if ( updateMisInfo.updateInfo.isSuccess == true ) {
      misRef.doc(updateMisInfo.misID).update({successDate: firestore.FieldValue.serverTimestamp()});
    } else if ( updateMisInfo.updateInfo.isSuccess == false ) {
      misRef.doc(updateMisInfo.misID).update({successDate: null});
    }
    return misRef.doc(updateMisInfo.misID).update(updateMisInfo.updateInfo);
  } catch (e) {
    console.log(e.message);
    return -1;
  }
}

/** 
 * misID에 해당하는 미션을 삭제하는 함수
 * @param {*} misID 삭제하고자 하는 미션의 ID
 * @returns 성공시 Promise | 실패시 -1
 */
/**
 * misID에 해당하는 진행미션을 삭제.
 * @param {
 *  misID: str
 *  hasReview: boolean
 * } delMisInfo 삭제하고자 하는 미션의 ID
 * @returns 성공시 Promise | 실패시 -1
 */
const deleteCurrentMis = async (delMisInfo) => {
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
}

/** 
 * 성공미션 생성(해당 미션의 기간이 끝났을 때, 미션이 이미 성공상태라면 자동으로 호출되는 함수)
 * @param {*} misID currentMisList에서 successMisList로 추가할 미션의 ID
 * @returns 성공시 Promise<void> | 실패시 -1
 */
const createSuccessMis = async (misID) => {
  try {
    const misData = await getCurrentMisById(misID);
    const ret = usersCollection.doc(getCurrentUser().uid).collection('successMisList').doc(misID).set(misData);
    const userProfile = await getUserProfile();
    let successNum = userProfile.successNum;
    successNum = successNum + 1;
    updateUserProfile({'successNum': successNum});
    checkUserLevel();
    return ret;
  } catch (e) {
    console.log(e.message);
    return -1;
  }
}

/** 
 * misID에 해당하는 성공 미션 한 개 조회
 * 
 * @param {*} misID 조회하고자 하는 성공미션의 ID
 * @returns 성공시 Promise | 실패시 -1
 */
const getSuccessMisById = async (misID) => {
  try {
    const misRef = usersCollection.doc(getCurrentUser().uid).collection('successMisList');
    const docRef = misRef.where(firebase.firestore.FieldPath.documentId(), '==', misID);
    const data = await docRef.get();

    const ret = data.docs.map(doc => ({ ...doc.data(), id: doc.id }))
    return ret[0];
  } catch(e) {
    console.log(e.message);
    return -1;
  }
}

/** 
 * 성공미션 기간별 전체 리스트 조회
 * 
 * @param {int} period period=0이면 한주, 1이면 한달, 2이면 계절, 그 외에는 전체 미션 리스트 데이터를 가져옴
 * @returns 성공시 Promise | 실패시 -1
 */
const getSuccessMisList = async (period) => {
  let misRef = usersCollection.doc(getCurrentUser().uid).collection('successMisList');

  if ( period == WEEK ) {
    misRef = misRef.where('misPeriod', '==', 0);
  } else if ( period == MONTH ) {
    misRef = misRef.where('misPeriod', '==', 1);
  } else if ( period == SEASON ) {
    misRef = misRef.where('misPeriod', '==', 2);
  }

  try {
    const data = await misRef.get();
    const ret = data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    if(ret.length == 0) {
      console.log('There is no data.');
      return -1;
    }
    console.log(ret);
    return ret;
  } catch (e) {
    console.log(e.message);
    return -1;
  }
}

/** 
 * 성공미션 리스트에서 successDate를 기준으로 최근에 성공한 미션을 조회
 * 성공미션이 3개 이상 있으면 세 개 조회, 그보다 적은 경우에는 있는 미션을 모두 조회
 * @returns 성공시 Promise<> | 실패시 -1 | 성공미션이 없는 경우 0
 */
const getLatestSuccessMis = async () => {
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
      return 0;
    }
    const latestMis = await usersCollection.doc(getCurrentUser().uid).collection('successMisList').orderBy('successDate', 'desc').limit(limitNum).get();
    return latestMis.docs.map(doc => ({ ...doc.data(), id: doc.id }));
  } catch (e) {
    console.log(e.message);
    return -1;
  }
}

/** 
 * 성공미션 수정.
 * misData = {
 *   misTitle: 'fakeTitle'
 * }
 * 위와 같은 형식으로 updateMisInfo.misData에는 수정할 정보만 넣어서 호출
 * @param {
 *  misID: str,
 *  misData: {object}
 * } updateMisInfo 
 * @returns 성공시 Promise | 실패시 -1
 */
const updateSuccessMis = (updateMisInfo) => {
  try {
    return usersCollection.doc(getCurrentUser().uid).collection('successMisList').doc(updateMisInfo.misID).update(updateMisInfo.misData);
  } catch(e) {
    console.log(e.message);
    return -1;
  }
}

/**
 * misID에 해당하는 성공미션을 삭제.
 * @param {
 *  misID: str
 *  hasReview: boolean
 * } delMisInfo 삭제하고자 하는 미션의 ID
 * @returns 성공시 Promise<void> | 실패시 -1
 */
const deleteSuccessMis = async (delMisInfo) => {
  try {

    if (delMisInfo.hasReview == true) {
      const revInfo = await getRevById(delMisInfo.misID);
      await deleteRev({misID: delMisInfo.misID, revImg: revInfo.revImg, isOutdated: true});
    }

    const ret = usersCollection.doc(getCurrentUser().uid).collection('successMisList').doc(delMisInfo.misID).delete();
    const userProfile = await getUserProfile();
    let successNum = userProfile.successNum;
    successNum = successNum - 1;
    updateUserProfile({'successNum': successNum});
    checkUserLevel();
    return ret;
  } catch (e) {
    console.log(e.message);
    return -1;
  }
}


/**
 * 진행중인 미션의 기간이 끝났을 때 불려올 함수
 * @param {int} period
 * @returns 성공시 Promise<number> | 실패시 -1
 */
export const clearCurrentMisList = async (period) => {
  try {
    const curMisList = await getCurrentMisList(period);
    curMisList.forEach(async (element) => {
      // 미션의 기간이 끝났을 때 저장해놓을 필요가 없는 필드들을 삭제
      const updateMisInfo = {
        misID: element.id,
        updateInfo: {
          isAlarmSet: firebase.firestore.FieldValue.delete(),
          misAlarmHour: firebase.firestore.FieldValue.delete(),
          misAlarmMinute: firebase.firestore.FieldValue.delete(),
          misAlarmStart: firebase.firestore.FieldValue.delete(),
          misAlarmStop: firebase.firestore.FieldValue.delete(),
          picNum: firebase.firestore.FieldValue.delete()
        }
      }
      await updateCurrentMis(updateMisInfo);

      // 이때 성공상태인 미션들은 successMisList에 넣어줌
      if (element.isSuccess == true) {
        await createSuccessMis(element.id);
      }
  
      // currentMisList를 비워줌
      return await deleteCurrentMis({misID: element.id, hasReview: false});
    });
  } catch (e) {
    console.log(e.message);
    return -1;
  }
}

/**
 * 진행중인 미션의 기간이 끝났는지 아닌지 체크하는 함수.
 * 만약 기간이 끝났다면 현재 미션들을 모두 outdated로 바꾸고, currentMisList를 비운다.
 * @returns Promise<number>
 */
const checkCurrentMisListValid = async () => {
  const HOUR = 1*60*60*1000;
  const DAY = 24*HOUR;

  const timeCollection = firestore().collection('TargetTime');
  let targetWeek = await timeCollection.doc("targetWeek").get();
  let targetMonth = await timeCollection.doc("targetMonth").get();
  let targetSeason = await timeCollection.doc("targetSeason").get();
  
  let now = new Date();
  let today = new Date().getTime() + 9*HOUR;
  let diffWeek = today - targetWeek.data().targetTime;
  let diffMonth = today - targetMonth.data().targetTime;
  let diffSeason = today - targetSeason.data().targetTime;
  
  if (diffWeek >= 0) {
    const nextTime = targetWeek.data().targetTime + 7*DAY;
    timeCollection.doc("targetWeek").update({targetTime: nextTime});
    clearCurrentMisList(0);
  }

  if (diffMonth >= 0) {
    const thisMonth = now.getMonth();
    let nextTime = new Date(now.getFullYear(), thisMonth+1, 1).getTime();
    if ( nextTime == targetMonth.data().targetTime ) {
      nextTime = new Date(now.getFullYear(), thisMonth+2, 1).getTime();
    }
    timeCollection.doc("targetMonth").update({targetTime: nextTime});
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
    let nextTime = new Date(now.getFullYear(), thisMonth+3, 1).getTime();
    if ( nextTime == targetSeason.data().targetTime ) {
      nextTime = new Date(now.getFullYear(), thisMonth+4, 1).getTime();
    }
    timeCollection.doc("targetSeason").update({targetTime: nextTime});
    clearCurrentMisList(2);
  }
  return;
}

/**
 * 랜덤미션 생성하기를 눌렀을 때 랜덤미션 키워드 2개를 묶어 반환하는 함수
 * {"result1": "인테리어", "result2": "캠핑"} 형식으로 return
 * @returns 성공시 Promise <result1: str, result2: str> | 실패시 -1
 */
const getRandomKeyword = async () => {
  try {
    const docRef = firestore().collection('crawlingData').doc('randomKeyword');
    const data = (await docRef.get()).data();
    const targetList = data["220531"];
    const range = (targetList).length;

    const randNo1 = Math.floor(Math.random()*range)+1;
    let randNo2 = Math.floor(Math.random()*range)+1;
    while (randNo1 == randNo2) {
      randNo2 = Math.floor(Math.random()*range)+1;
    }

    const result = {
      result1: targetList[randNo1], 
      result2: targetList[randNo2]
    };
    console.log(result);
    return result;

  } catch (e) {
    console.log(e.message);
    return -1;
  }
}

export {
  selfMaxWeek,
  randMaxWeek,
  selfMaxMonth,
  randMaxMonth,
  selfMaxSeason,
  randMaxSeason,

  createCurrentMis,
  getCurrentMisById,
  getCurrentMisList,
  updateCurrentMis,
  deleteCurrentMis,
  
  getSuccessMisById,
  getSuccessMisList,
  getLatestSuccessMis,
  updateSuccessMis,
  deleteSuccessMis,

  checkCurrentMisListValid,
  getRandomKeyword
}
