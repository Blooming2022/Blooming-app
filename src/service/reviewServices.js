import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const usersCollection = firestore().collection('users');

// 후기 생성
const createRev = async (revData) => {
  try {
    const user = auth().currentUser;
    return await usersCollection.doc(user.uid).collection('revList').doc().set(revData);
  } catch (e) {
    console.log(e.message);
    return -1;
  }
}

// 후기 조회
const readRev = async () => {
  try {
    const user = auth().currentUser;
    const data = await usersCollection.doc(user.uid).collection('revList').get();
    const ret = data.docs.map(doc => ({ ...doc.data(), id: doc.id }))
    console.log(ret);
    return ret;
  } catch (error) {
    console.log(error.message);
    return -1;
  }
}

// 후기 수정
const updateRev = async (revID, revData) => {
  try {
    const user = auth().currentUser;
    return await usersCollection.doc(user.uid).collection('revList').doc(revID).update(revData);
  } catch (e) {
    console.log(e.message);
    return -1;
  }
}

// 후기 삭제
const deleteRev = async (revID) => {
  try {
    const user = auth().currentUser;
    return await usersCollection.doc(user.uid).collection('revList').doc(revID).delete();
  } catch (e) {
    console.log(e.message);
    return -1;
  }
}

export {
  createRev,
  readRev,
  updateRev,
  deleteRev
}
