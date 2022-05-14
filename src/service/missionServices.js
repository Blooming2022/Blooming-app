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

// 내부적으로 사용하는 함수
// getMisData(misID, period): readMisById() 내부에서 호출
const getMisData = async (misID, period) => {
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
    const docRef = misRef.where(firebase.firestore.FieldPath.documentId(), '==', misID);
    let data = await docRef.get();
    const ret = data.docs.map(doc => ({ ...doc.data(), id: doc.id }))
    return ret;
  } catch (error) {
    console.log(error.message);
    return -1;
  }
}
// readMisList(period): 미션 리스트 조회 함수 내부에서 호출
const readMisList = async (period) => {
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
    console.log(ret);
    return ret;
  } catch (e) {
    console.log(e.message);
    return -1;
  }
}


// export한 함수

/** 새로운 미션을 생성하기 위해 호출하는 함수.
 * misData는 아래와 같은 형식입니다.
 * {
 *  misTitle: str,
 *  misPeriod: int,
 *  picNum: int,
 *  isChecked: boolean,
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
 * @param {*} misData 
 * @returns 성공시 Promise<misData> | 실패시 -1
 */
const createMis = async (misData) => {
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
    return await misRef.doc().set(misData);
  } catch (e) {
    console.log(e.message);
    return -1;
  }
}

/** misID를 이용해 해당 미션 한 개를 조회하는 함수.
 * @param {str} misID 
 * @returns
 */
const readMisById = async (misID) => {
  let period;
  let ret;

  for(period=WEEK; period<=SEASON; period++) {
    ret = await getMisData(misID, period);
    if(ret[0]) break;
  }
  
  return ret;
}

/** 한주 미션 리스트 조회
 * @returns 
 */
const readMisListWeek = async () => {
  return readMisList(WEEK);
}
/** 한달 미션 리스트 조회
 * @returns 
 */
const readMisListMonth = async () => {
  return readMisList(MONTH);
}
/** 계절 미션 리스트 조회
 * @returns 
 */
const readMisListSeason = async () => {
  return readMisList(SEASON);
}

/** misID와 misData를 받아 misID에 해당하는 미션을 수정하는 함수
 * misData = {
 *   misTitle: 'fakeTItle',
 *   misMemo: 'newMemo'
 * }
 * 위와 같은 형식으로 misData에는 수정할 정보만 넣어서 호출
 * @param {*} misID 
 * @param {*} misData 
 * @returns 성공시 Promise | 실패시 -1
 */
const updateMis = async (misID, misData) => {
  const user = auth().currentUser;
  let misRef = usersCollection.doc(user.uid);

  // misID로 미션 조회 후 해당 미션의 misPeriod를 읽어옴
  let data = await readMisById(misID);
  const period = data[0].misPeriod;
  console.log(period);
  
  // misData 안의 misPeriod==0이면 한주, 1이면 한달, 2이면 계절미션 리스트에서 찾아서 수정
  if ( period == WEEK ) {
    misRef = misRef.collection('misListWeek');
  } else if ( period == MONTH ) {
    misRef = misRef.collection('misListMonth');
  } else if ( period == SEASON ) {
    misRef = misRef.collection('misListSeason');
  }

  try {
    return await misRef.doc(misID).update(misData);
  } catch (e) {
    console.log(e.message);
    return -1;
  }
}

/** misID에 해당하는 미션을 삭제하는 함수
 * @param {*} misID 
 * @returns 성공시 Promise | 실패시 -1
 */
const deleteMis = async (misID) => {
  const user = auth().currentUser;
  let misRef = usersCollection.doc(user.uid);

  // misID로 미션 조회 후 해당 미션의 misPeriod를 읽어옴
  let data = await readMisById(misID);
  const period = data[0].misPeriod;
  console.log(period);

  if ( period == WEEK ) {
    misRef = misRef.collection('misListWeek');
  } else if ( period == MONTH ) {
    misRef = misRef.collection('misListMonth');
  } else if ( period == SEASON ) {
    misRef = misRef.collection('misListSeason');
  }

  try {
    return await misRef.doc(misID).delete();
  } catch (e) {
    console.log(e.message);
    return -1;
  }
}


/** 성공미션 생성(미션이 성공상태가 되었을 때 호출되어야 할 함수)
 * 
 * @param {*} misData
 * @returns 성공시 Promise | 실패시 -1
 */
const createMisSuccess = async (misData) => {
  try {
    const user = auth().currentUser;
    var count = await usersCollection.doc(user.uid).get()
    .then((docs) => docs.data()["successNum"] );
    count = count + 1;
    updateUser({'successNum': count});
    return await usersCollection.doc(user.uid).collection('misListSuccess').doc().set(misData);
  } catch (e) {
    console.log(e.message);
    return -1;
  }
}

/** misID에 해당하는 성공 미션 한 개 조회
 * 
 * @param {*} misID
 * @returns 성공시 Promise | 실패시 -1
 */
const readMisSuccessById = async (misID) => {
  try {
    const user = auth().currentUser;
    const misRef = usersCollection.doc(user.uid).collection('misListSuccess');
    const docRef = misRef.where(firebase.firestore.FieldPath.documentId(), '==', misID);
    const data = await docRef.get();

    const ret = data.docs.map(doc => ({ ...doc.data(), id: doc.id }))
    console.log(ret);
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
const readMisListSuccess = async () => {
  try {
    const user = auth().currentUser;
    const data = await usersCollection.doc(user.uid).collection('misListSuccess').get();
    const ret = data.docs.map(doc => ({ ...doc.data(), id: doc.id }))
    console.log(ret);
    return ret;
  } catch(e) {
    console.log(e.message);
    return -1;
  }
}

/**  성공미션 수정
 * misData = {
 *   misTitle: 'fakeTItle',
 *   misMemo: 'newMemo'
 * }
 * 위와 같은 형식으로 misData에는 수정할 정보만 넣어서 호출
 * @param {*} misID 
 * @param {*} misData 
 * @returns 성공시 Promise | 실패시 -1
 */
const updateMisSuccess = async (misID, misData) => {
  try {
    const user = auth().currentUser;
    return await usersCollection.doc(user.uid).collection('misListSuccess').doc(misID).update(misData);
  } catch(e) {
    console.log(e.message);
    return -1;
  }
}

/** 성공미션 삭제
 * misID에 해당하는 성공미션을 삭제.
 * @param {*} misID 
 * @returns 
 */
const deleteMisSuccess = async (misID) => {
  try {
    const user = auth().currentUser;
    var count = await usersCollection.doc(user.uid).get()
    .then((docs) => docs.data()["successNum"] );
    count = count - 1;
    updateUser({'successNum': count});
    return await usersCollection.doc(user.uid).collection('misListSuccess').doc(misID).delete();
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
  readMisById,
  // readMisList,
  readMisListWeek,
  readMisListMonth,
  readMisListSeason,
  updateMis,
  deleteMis,

  createMisSuccess,
  readMisSuccessById,
  readMisListSuccess,
  updateMisSuccess,
  deleteMisSuccess
}
