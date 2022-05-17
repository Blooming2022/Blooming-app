import firestore, { firebase } from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { updateUser } from './authServices';

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
 *  compareDate: Date
 * }
 * @param {*} misData 미션 데이터 정보
 * @returns 성공시 Promise<misData> | 실패시 -1
 */
const createMis = (misData) => {
  // period 설정해주기
  const user = auth().currentUser;
  const period = misData.misPeriod;
  let misRef = usersCollection.doc(user.uid);

  // misData 안의 misPeriod==0이면 한주, 1이면 한달, 2이면 계절미션 리스트에 새로 생성
  if ( period == WEEK ) {
    misRef = misRef.collection('misListWeek');
  } else if ( period == MONTH ) {
    misRef = misRef.collection('misListMonth');
  } else if ( period == SEASON ) {
    misRef = misRef.collection('misListSeason');
  }

  try {
    return misRef.doc().set(misData);
  } catch (e) {
    console.log(e.message);
    return -1;
  }
}

/** misID를 이용해 해당 미션 한 개를 조회하는 함수.
 * @param {str} misID 조회하고자 하는 미션의 ID
 * @returns 성공시 Promise | 실패시 -1
 */
 const getMisById = async (misID) => {
  let period;
  let ret;
  const user = auth().currentUser;

  try {
    for(period=WEEK; period<=SEASON; period++) {
  
      let misRef = usersCollection.doc(user.uid);
      if ( period == WEEK ) {
        misRef = misRef.collection('misListWeek');
      } else if ( period == MONTH ) {
        misRef = misRef.collection('misListMonth');
      } else if ( period == SEASON ) {
        misRef = misRef.collection('misListSeason');
      }
      const docRef = misRef.where(firebase.firestore.FieldPath.documentId(), '==', misID);
      let data = await docRef.get();
      ret = data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
  
      if(ret[0]) break;
    }
    return ret;
  } catch (e) {
    console.log(e.message);
    return -1;
  }
}

/** 미션 기간별 전체 리스트 조회
 * 
 * @param {int} period period=0이면 한주, 1이면 한달, 2이면 계절 미션 리스트 데이터를 가져옴
 * @returns 성공시 Promise | 실패시 -1
 */
const getMisList = async (period) => {
  const user = auth().currentUser;
  let misRef = usersCollection.doc(user.uid);

  if ( period == WEEK ) {
    misRef = misRef.collection('misListWeek');
  } else if ( period == MONTH ) {
    misRef = misRef.collection('misListMonth');
  } else if ( period == SEASON ) {
    misRef = misRef.collection('misListSeason');
  }

  try {
    const data = await misRef.get();
    const ret = await data.docs.map(doc => ({ ...doc.data(), id: doc.id }))
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
const updateMis = async (misID, misData) => {
  const user = auth().currentUser;
  let misRef = usersCollection.doc(user.uid);

  // misID로 미션 조회 후 해당 미션의 misPeriod를 읽어옴
  let data = await getMisById(misID);
  const period = data[0].misPeriod;
  
  // misData 안의 misPeriod==0이면 한주, 1이면 한달, 2이면 계절미션 리스트에서 찾아서 수정
  if ( period == WEEK ) {
    misRef = misRef.collection('misListWeek');
  } else if ( period == MONTH ) {
    misRef = misRef.collection('misListMonth');
  } else if ( period == SEASON ) {
    misRef = misRef.collection('misListSeason');
  }

  try {
    return misRef.doc(misID).update(misData);
  } catch (e) {
    console.log(e.message);
    return -1;
  }
}

/** misID에 해당하는 미션을 삭제하는 함수
 * @param {*} misID 삭제하고자 하는 미션의 ID
 * @returns 성공시 Promise | 실패시 -1
 */
const deleteMis = async (misID) => {
  const user = auth().currentUser;
  let misRef = usersCollection.doc(user.uid);

  // misID로 미션 조회 후 해당 미션의 misPeriod를 읽어옴
  let data = await getMisById(misID);
  const period = data[0].misPeriod;

  if ( period == WEEK ) {
    misRef = misRef.collection('misListWeek');
  } else if ( period == MONTH ) {
    misRef = misRef.collection('misListMonth');
  } else if ( period == SEASON ) {
    misRef = misRef.collection('misListSeason');
  }

  try {
    return misRef.doc(misID).delete();
  } catch (e) {
    console.log(e.message);
    return -1;
  }
}

/** 성공미션 생성(미션이 성공상태가 되었을 때 호출되어야 할 함수)
 * misData는 아래와 같은 형식입니다.
 * {
 *  successDate: Date,
 *  misPeriod: int,
 *  misTitle: str
 * }
 * @param {*} misData 추가할 미션 정보
 * @returns 성공시 Promise<void> | 실패시 -1
 */
const createMisSuccess = async (misData) => {
  try {
    const user = auth().currentUser;
    const ret = usersCollection.doc(user.uid).collection('misListSuccess').doc().set(misData);
    const userSimpleData = await getCurUserSimpleData();
    let successNum = userSimpleData.successNum;
    successNum = successNum + 1;
    updateUser({'successNum': successNum});
    return ret;
  } catch (e) {
    console.log(e.message);
    return -1;
  }
}

/** misID에 해당하는 성공 미션 한 개 조회
 * 
 * @param {*} misID 조회하고자 하는 미션의 ID
 * @returns 성공시 Promise | 실패시 -1
 */
const getMisSuccessById = async (misID) => {
  try {
    const user = auth().currentUser;
    const misRef = usersCollection.doc(user.uid).collection('misListSuccess');
    const docRef = misRef.where(firebase.firestore.FieldPath.documentId(), '==', misID);
    const data = await docRef.get();

    const ret = data.docs.map(doc => ({ ...doc.data(), id: doc.id }))
    return ret;
  } catch(e) {
    console.log(e.message);
    return -1;
  }
}

/** 성공미션 리스트 조회
 * 
 * @returns 성공시 Promise | 실패시 -1
 */
const getMisListSuccess = async () => {
  try {
    const user = auth().currentUser;
    const data = await usersCollection.doc(user.uid).collection('misListSuccess').get();
    const ret = data.docs.map(doc => ({ ...doc.data(), id: doc.id }))
    return ret;
  } catch(e) {
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
    const userSimpleData = await getCurUserSimpleData();
    const successNum = userSimpleData.successNum;
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
    const latestMis = await usersCollection.doc(user.uid).collection('misListSuccess').orderBy('successDate', 'desc').limit(limitNum).get();
    return latestMis.docs.map(doc => ({ ...doc.data(), id: doc.id }));
  } catch (e) {
    console.log(e.message);
    return -1;
  }
}

/**  성공미션 수정
 * misData = {
 *   misTitle: 'fakeTitle'
 * }
 * 위와 같은 형식으로 misData에는 수정할 정보만 넣어서 호출
 * @param {*} misID 수정하고자 하는 미션의 ID
 * @param {*} misData 수정할 내용
 * @returns 성공시 Promise | 실패시 -1
 */
const updateMisSuccess = (misID, misData) => {
  try {
    const user = auth().currentUser;
    return usersCollection.doc(user.uid).collection('misListSuccess').doc(misID).update(misData);
  } catch(e) {
    console.log(e.message);
    return -1;
  }
}

/** 성공미션 삭제
 * misID에 해당하는 성공미션을 삭제.
 * @param {*} misID 삭제하고자 하는 미션의 ID
 * @returns 성공시 Promise<void> | 실패시 -1
 */
const deleteMisSuccess = async (misID) => {
  try {
    const user = auth().currentUser;
    const ret = usersCollection.doc(user.uid).collection('misListSuccess').doc(misID).delete();
    const userSimpleData = await getCurUserSimpleData();
    let successNum = userSimpleData.successNum;
    successNum = successNum - 1;
    updateUser({'successNum': successNum});
    return ret;
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

  createMis,
  getMisById,
  getMisList,
  updateMis,
  deleteMis,

  createMisSuccess,
  getMisSuccessById,
  getMisListSuccess,
  getLatestSuccessMis,
  updateMisSuccess,
  deleteMisSuccess
}
