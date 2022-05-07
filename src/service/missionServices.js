import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

// 한주미션 생성
export const createMisWeek = async (misData) => {
  const user = auth().currentUser;
  const misList = firestore().collection('users').doc(user.uid).collection('misListWeek');
  return await misList.doc().set(misData);
}
// 한주미션 조회
export const readMisWeek = async () => {
  const user = auth().currentUser;

  try {
    const data = await firestore().collection('users').doc(user.uid).collection('misListWeek').get();
    const ret = data.docs.map(doc => ({ ...doc.data(), id: doc.id }))
    console.log(ret);
    return ret;
  } catch (error) {
    console.log(error.message);
  }
};
// 한주미션 수정
export const updateMisWeek = async (misID, misData) => {
  const user = auth().currentUser;
  const misList = firestore().collection('users').doc(user.uid).collection('misListWeek');
  return await misList.doc(misID).update(misData);
}
// 한주미션 삭제
export const deleteMisWeek = async (misID) => {
  const user = auth().currentUser;
  const misList = firestore().collection('users').doc(user.uid).collection('misListWeek');
  return await misList.doc(misID).delete();
}

// 한달미션 생성
export const createMisMonth = async (misData) => {
  const user = auth().currentUser;
  const misList = firestore().collection('users').doc(user.uid).collection('misListMonth');
  return await misList.doc().set(misData);
}
// 한달미션 조회
export const readMisMonth = async () => {
  const user = auth().currentUser;

  try {
    const data = await firestore().collection('users').doc(user.uid).collection('misListMonth').get();
    const ret = data.docs.map(doc => ({ ...doc.data(), id: doc.id }))
    console.log(ret);
    return ret;
  } catch (error) {
    console.log(error.message);
  }
};
// 한달미션 수정
export const updateMisMonth = async (misID, misData) => {
  const user = auth().currentUser;
  const misList = firestore().collection('users').doc(user.uid).collection('misListMonth');
  return await misList.doc(misID).update(misData);
}
// 한달미션 삭제
export const deleteMisMonth = async (misID) => {
  const user = auth().currentUser;
  const misList = firestore().collection('users').doc(user.uid).collection('misListMonth');
  return await misList.doc(misID).delete();
}

// 계절미션 생성
export const createMisSeason = async (misData) => {
  const user = auth().currentUser;
  const misList = firestore().collection('users').doc(user.uid).collection('misListSeason');
  return await misList.doc().set(misData);
}
// 계절미션 조회
export const readMisSeason = async () => {
  const user = auth().currentUser;

  try {
    const data = await firestore().collection('users').doc(user.uid).collection('misListSeason').get();
    const ret = data.docs.map(doc => ({ ...doc.data(), id: doc.id }))
    console.log(ret);
    return ret;
  } catch (error) {
    console.log(error.message);
  }
};
// 계절미션 수정
export const updateMisSeason = async (misID, misData) => {
  const user = auth().currentUser;
  const misList = firestore().collection('users').doc(user.uid).collection('misListSeason');
  return await misList.doc(misID).update(misData);
}
// 계절미션 삭제
export const deleteMisSeason = async (misID) => {
  const user = auth().currentUser;
  const misList = firestore().collection('users').doc(user.uid).collection('misListSeason');
  return await misList.doc(misID).delete();
}
