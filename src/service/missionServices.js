import firestore, { firebase } from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { updateUserProfile, getUserProfile } from './authServices';

const usersCollection = firestore().collection('users');

const WEEK = 0;
const MONTH = 1;
const SEASON = 2;

const selfMaxWeek = 2;
const randMaxWeek = 2;
const selfMaxMonth = 1;
const randMaxMonth = 1;
const selfMaxSeason = 1;
const randMaxSeason = 1;

/** 새로운 미션을 생성하기 위해 호출하는 함수.
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
 *  compareDate: Date,
 *  isOutdated: boolean,
 * }
 * @param {*} misData 미션 데이터 정보
 * @returns 성공시 Promise<misData> | 실패시 -1
 */
const createCurrentMis = (misData) => {
  const user = auth().currentUser;
  let misRef = usersCollection.doc(user.uid).collection('currentMisList');

  try {
    return misRef.doc().set(misData);
  } catch (e) {
    console.log(e.message);
    return -1;
  }
}

/** misID를 이용해 진행 미션 한 개를 조회하는 함수.
 * @param {str} misID 조회하고자 하는 미션의 ID
 * @returns 성공시 Promise | 실패시 -1
 */
const getCurrentMisById = async (misID) => {
  const user = auth().currentUser;
  try {
    const misRef = usersCollection.doc(user.uid).collection('currentMisList');
    const docRef = misRef.where(firebase.firestore.FieldPath.documentId(), '==', misID);
    let data = await docRef.get();
    const ret = data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    return ret[0];
  } catch (e) {
    console.log(e.message);
    return -1;
  }
}

/** 기간별 진행미션 리스트 조회
 * 
 * @param {int} period period=0이면 한주, 1이면 한달, 2이면 계절, 그 외에는 전체 미션 리스트 데이터를 가져옴
 * @returns 성공시 Promise | 실패시 -1
 */
const getCurrentMisList = async (period) => {
  const user = auth().currentUser;
  let misRef = usersCollection.doc(user.uid).collection('currentMisList');

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
    return ret;
  } catch (e) {
    console.log(e.message);
    return -1;
  }
}

/** misID와 misData를 받아 misID에 해당하는 미션을 수정하는 함수
 * misData = {
 *   misTitle: 'fakeTItle',
 *   misMemo: 'newMemo'
 * }
 * 위와 같은 형식으로 misData에는 수정할 정보만 넣어서 호출
 * @param {*} misID 수정하고자 하는 미션의 ID
 * @param {*} misData 수정할 내용
 * @returns 성공시 Promise | 실패시 -1
 */
const updateCurrentMis = async (misID, misData) => {
  const user = auth().currentUser;
  let misRef = usersCollection.doc(user.uid).collection('currentMisList');

  try {
    if ( misData.isSuccess == true ) {
      const ret = misRef.doc(misID).update(misData);
      createSuccessMis(misID);
      return ret;
    } else if ( misData.isSuccess == false ) {
      const ret = misRef.doc(misID).update(misData);
      deleteSuccessMis(misID);
      return ret;
    } else {
      // misID로 미션 조회 후 해당 미션의 성공여부를 읽어옴
      const data = await getCurrentMisById(misID);

      if ( data.isSuccess == true ) {
        updateSuccessMis(misID, misData);
      }
      
      return misRef.doc(misID).update(misData);
    }
  } catch (e) {
    console.log(e.message);
    return -1;
  }
}

/** misID에 해당하는 미션을 삭제하는 함수
 * @param {*} misID 삭제하고자 하는 미션의 ID
 * @returns 성공시 Promise | 실패시 -1
 */
const deleteCurrentMis = async (misID) => {
  const user = auth().currentUser;
  const misRef = usersCollection.doc(user.uid).collection('currentMisList');
  
  // misID로 미션 조회 후 해당 미션의 성공여부를 읽어옴
  let data = await getCurrentMisById(misID);
  
  try {
    if ( data.isSuccess == true ) { // 성공미션 리스트에도 존재.
      deleteSuccessMis(misID);
    }
    if ( data.isOutdated == true ){
      console.log("This mission is outdated. You can't delete it.");
    } else return misRef.doc(misID).delete();
  } catch (e) {
    console.log(e.message);
    return -1;
  }
}

/** 성공미션 생성(미션이 성공상태가 되었을 때 호출되어야 할 함수)
 * @param {*} misID currentMisList에서 successMisList로 추가할 미션의 ID
 * @returns 성공시 Promise<void> | 실패시 -1
 */
const createSuccessMis = async (misID) => {
  try {
    const user = auth().currentUser;
    const misData = await getCurrentMisById(misID);
    const ret = usersCollection.doc(user.uid).collection('successMisList').doc(misID).set(misData);
    const userProfile = await getUserProfile();
    let successNum = userProfile.successNum;
    successNum = successNum + 1;
    updateUserProfile({'successNum': successNum});
    return ret;
  } catch (e) {
    console.log(e.message);
    return -1;
  }
}

/** misID에 해당하는 성공 미션 한 개 조회
 * 
 * @param {*} misID 조회하고자 하는 성공미션의 ID
 * @returns 성공시 Promise | 실패시 -1
 */
const getSuccessMisById = async (misID) => {
  try {
    const user = auth().currentUser;
    const misRef = usersCollection.doc(user.uid).collection('successMisList');
    const docRef = misRef.where(firebase.firestore.FieldPath.documentId(), '==', misID);
    const data = await docRef.get();

    const ret = data.docs.map(doc => ({ ...doc.data(), id: doc.id }))
    return ret[0];
  } catch(e) {
    console.log(e.message);
    return -1;
  }
}

/** 성공미션 기간별 전체 리스트 조회
 * 
 * @param {int} period period=0이면 한주, 1이면 한달, 2이면 계절, 그 외에는 전체 미션 리스트 데이터를 가져옴
 * @returns 성공시 Promise | 실패시 -1
 */
const getSuccessMisList = async (period) => {
  const user = auth().currentUser;
  let misRef = usersCollection.doc(user.uid).collection('successMisList');

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
      console.log('There is no data. 1');
      return -1;
    }
    return ret;
  } catch (e) {
    console.log(e.message);
    return -1;
  }
}

/** 성공미션 리스트에서 successDate를 기준으로 최근에 성공한 미션을 조회
 * 성공미션이 3개 이상 있으면 세 개 조회, 그보다 적은 경우에는 있는 미션을 모두 조회
 * @returns 성공시 Promise<> | 실패시 -1 | 성공미션이 없는 경우 0
 */
const getLatestSuccessMis = async () => {
  try {
    const user = auth().currentUser;
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
    const latestMis = await usersCollection.doc(user.uid).collection('successMisList').orderBy('successDate', 'desc').limit(limitNum).get();
    console.log(latestMis.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    return latestMis.docs.map(doc => ({ ...doc.data(), id: doc.id }));
  } catch (e) {
    console.log(e.message);
    return -1;
  }
}

/**  성공미션 수정. 미션정보 중 isOutdated=true인 경우 수정되지 않음.
 * misData = {
 *   misTitle: 'fakeTitle'
 * }
 * 위와 같은 형식으로 misData에는 수정할 정보만 넣어서 호출
 * @param {*} misID 수정하고자 하는 미션의 ID
 * @param {*} misData 수정할 내용
 * @returns 성공시 Promise | 실패시 -1
 */
const updateSuccessMis = async (misID, misData) => {
  try {
    const user = auth().currentUser;
    const data = await getSuccessMisById(misID);
    const isOutdated = data.isOutdated;
    
    if ( isOutdated == false ) {
      usersCollection.doc(user.uid).collection('currentMisList').doc(misID).update(misData);
      return usersCollection.doc(user.uid).collection('successMisList').doc(misID).update(misData);
    } else {
      console.log("This mission is outdated. You can't update it.");
      return -1;
    }
  } catch(e) {
    console.log(e.message);
    return -1;
  }
}

/** 성공미션 삭제. 미션정보 중 isOutdated=true인 경우 삭제되지 않음.
 * misID에 해당하는 성공미션을 삭제.
 * @param {*} misID 삭제하고자 하는 미션의 ID
 * @returns 성공시 Promise<void> | 실패시 -1
 */
const deleteSuccessMis = async (misID) => {
  try {
    const user = auth().currentUser;
    const data = await getSuccessMisById(misID);
    const isOutdated = data.isOutdated;

    if ( isOutdated == false ) {
      const ret = usersCollection.doc(user.uid).collection('successMisList').doc(misID).delete();
      const userProfile = await getUserProfile();
      let successNum = userProfile.successNum;
      successNum = successNum - 1;
      updateUserProfile({'successNum': successNum});
      return ret;
    } else {
      console.log("This mission is outdated. You can't delete it.");
      return -1;
    }
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
}
