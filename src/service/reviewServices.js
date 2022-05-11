import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const usersCollection = firestore().collection('users');

// 리뷰 생성
export const createRev = async (revData) => {
  try {
    const user = auth().currentUser;
    return await usersCollection.doc(user.uid).collection('revList').doc().set(revData);
  } catch (e) {
    alert("정상적으로 처리되지 않았습니다. 다시 시도해주세요.");
    return -1;
  }
}

// 리뷰 조회
export const readRev = async () => {
  try {
    const user = auth().currentUser;
    const data = await usersCollection.doc(user.uid).collection('revList').get();
    const ret = data.docs.map(doc => ({ ...doc.data(), id: doc.id }))
    console.log(ret);
    return ret;
  } catch (error) {
    console.log(error.message);
    alert("정상적으로 처리되지 않았습니다. 다시 시도해주세요.");
    return -1;
  }
}

// 리뷰 수정
export const updateRev = async (revID, revData) => {
  try {
    const user = auth().currentUser;
    return await usersCollection.doc(user.uid).collection('revList').doc(revID).update(revData);
  } catch (e) {
    alert("정상적으로 처리되지 않았습니다. 다시 시도해주세요.");
    return -1;
  }
}

// 리뷰 삭제
export const deleteRev = async (revID) => {
  try {
    return await usersCollection.doc(user.uid).collection('revList').doc(revID).delete();
  } catch (e) {
    alert("정상적으로 처리되지 않았습니다. 다시 시도해주세요.");
    return -1;
  }
}
