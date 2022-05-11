import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { updateUser } from './authServices';

const usersCollection = firestore().collection('users');

export const selfMaxWeek = 2;
export const randMaxWeek = 2;
export const selfMaxMonth = 1;
export const randMaxMonth = 1;
export const selfMaxSeason = 1;
export const randMaxSeason = 1;

// 미션 생성
const createMis = async (misRef, misData) => {
  try {
    return await misRef.doc().set(misData);
  } catch (e) {
    alert("정상적으로 처리되지 않았습니다. 다시 시도해주세요.");
    return -1;
  }
}
// 미션 조회
const readMis = async (misRef) => {
  try {
    const data = await misRef.get();
    const ret = data.docs.map(doc => ({ ...doc.data(), id: doc.id }))
    console.log(ret);
    return ret;
  } catch (error) {
    console.log(error.message);
    alert("정상적으로 처리되지 않았습니다. 다시 시도해주세요.");
    return -1;
  }
}
// 미션 수정
const updateMis = async (misRef, misID, misData) => {
  try {
    return await misRef.doc(misID).update(misData);
  } catch (e) {
    alert("정상적으로 처리되지 않았습니다. 다시 시도해주세요.");
    return -1;
  }
}
// 미션 삭제
const deleteMis = async (misRef, misID) => {
  try {
    return await misRef.doc(misID).delete();
  } catch (e) {
    alert("정상적으로 처리되지 않았습니다. 다시 시도해주세요.");
    return -1;
  }
}

// 한주미션 생성
export const createMisWeek = async (misData) => {
  const user = auth().currentUser;
  return createMis(usersCollection.doc(user.uid).collection('misListWeek'), misData);
}
// 한주미션 조회
export const readMisWeek = async () => {
  const user = auth().currentUser;
  return readMis(usersCollection.doc(user.uid).collection('misListWeek'));
}
// 한주미션 수정
export const updateMisWeek = async (misID, misData) => {
  const user = auth().currentUser;
  return updateMis(usersCollection.doc(user.uid).collection('misListWeek'), misID, misData);
}
// 한주미션 삭제
export const deleteMisWeek = async (misID) => {
  const user = auth().currentUser;
  return deleteMis(usersCollection.doc(user.uid).collection('misListWeek'), misID);
}

// 한달미션 생성
export const createMisMonth = async (misData) => {
  const user = auth().currentUser;
  return createMis(usersCollection.doc(user.uid).collection('misListMonth'), misData);
}
// 한달미션 조회
export const readMisMonth = async () => {
  const user = auth().currentUser;
  return readMis(usersCollection.doc(user.uid).collection('misListMonth'));
}
// 한달미션 수정
export const updateMisMonth = async (misID, misData) => {
  const user = auth().currentUser;
  return updateMis(usersCollection.doc(user.uid).collection('misListMonth'), misID, misData);
}
// 한달미션 삭제
export const deleteMisMonth = async (misID) => {
  const user = auth().currentUser;
  return deleteMis(usersCollection.doc(user.uid).collection('misListMonth'), misID);
}

// 계절미션 생성
export const createMisSeason = async (misData) => {
  const user = auth().currentUser;
  return createMis(usersCollection.doc(user.uid).collection('misListSeason'), misData);
}
// 계절미션 조회
export const readMisSeason = async () => {
  const user = auth().currentUser;
  return readMis(usersCollection.doc(user.uid).collection('misListSeason'));
}
// 계절미션 수정
export const updateMisSeason = async (misID, misData) => {
  const user = auth().currentUser;
  return updateMis(usersCollection.doc(user.uid).collection('misListSeason'), misID, misData);
}
// 계절미션 삭제
export const deleteMisSeason = async (misID) => {
  const user = auth().currentUser;
  return deleteMis(usersCollection.doc(user.uid).collection('misListSeason'), misID);
}

// 성공미션 생성(미션이 성공상태가 되었을 때 호출되어야 할 함수)
export const createMisSuccess = async (misData) => {
  try {
    const user = auth().currentUser;
    var count = await usersCollection.doc(user.uid).get()
    .then((docs) => docs.data()["successNum"] );
    count = count + 1;
    updateUser({'successNum': count});
    return createMis(usersCollection.doc(user.uid).collection('misListSuccess'), misData);
  } catch (e) {
    alert("정상적으로 처리되지 않았습니다. 다시 시도해주세요.");
    return -1;
  }
}
// 성공미션 조회
export const readMisSuccess = async () => {
  const user = auth().currentUser;
  return readMis(usersCollection.doc(user.uid).collection('misListSuccess'));
}
// 성공미션 수정
export const updateMisSuccess = async (misID, misData) => {
  const user = auth().currentUser;
  return updateMis(usersCollection.doc(user.uid).collection('misListSuccess'), misID, misData);
}
// 성공미션 삭제
export const deleteMisSuccess = async (misID) => {
  try {
    const user = auth().currentUser;
    var count = await usersCollection.doc(user.uid).get()
    .then((docs) => docs.data()["successNum"] );
    count = count - 1;
    updateUser({'successNum': count});
    return deleteMis(usersCollection.doc(user.uid).collection('misListSuccess'), misID);
  } catch (e) {
    alert("정상적으로 처리되지 않았습니다. 다시 시도해주세요.");
    return -1;
  }
}
