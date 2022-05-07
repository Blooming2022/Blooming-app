import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

// guestSignIn(): 게스트 로그인(익명)
export const guestSignIn = async () => {
  const ret = await auth().signInAnonymously();
  await createUser();
  return ret;
}

// signOut(): 로그아웃
export const signOut = () => {
  return auth().signOut();
}

// deleteAccount(): 회원 탈퇴
export const deleteAccount = async () => {
  const curUser = auth().currentUser;
  const docPath = firestore().collection('users').doc(curUser.uid);

  await docPath.collection('misListWeek').get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      docPath.collection('misListWeek').doc(doc.id).delete();
    });
  });
  await docPath.collection('misListSeason').get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      docPath.collection('misListSeason').doc(doc.id).delete();
    });
  });
  await docPath.collection('misListMonth').get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      docPath.collection('misListMonth').doc(doc.id).delete();
    });
  });
  await docPath.collection('misSuccess').get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      docPath.collection('misSuccess').doc(doc.id).delete();
    });
  });
  await docPath.collection('reviews').get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      docPath.collection('reviews').doc(doc.id).delete();
    });
  });

  docPath.delete();
  return curUser.delete();
}

// 미션 초기정보 생성(createUser 함수 내부에서 호출하는 함수)
const createMisList = async (userDataRef) => {
  await userDataRef.collection('misListMonth').doc('maxNumOfMis').set({ randMax:1, selfMax:1 });
  await userDataRef.collection('misListSeason').doc('maxNumOfMis').set({ randMax:1, selfMax:1 });
  await userDataRef.collection('misListWeek').doc('maxNumOfMis').set({ randMax:2, selfMax:2 });
}

// createUser(): 새 유저 기본정보 생성하기
const createUser = async () => {
  const usersCollection = firestore().collection('users');
  const curUser = auth().currentUser;
  await createMisList(usersCollection.doc(curUser.uid));
  return await usersCollection.doc(curUser.uid)
  .set({
    displayName: curUser.displayName,
    gmailAddr: curUser.email,
    successNum: 0
  });
}

// updateUser(data): 유저 정보 수정하기
/**
 * data = {
 *   displayName: 'fakeName',
 *   successNum: 3
 * }
 * 위와 같은 형식으로 수정할 정보만 넣어서 호출
 */
export const updateUser = async (data) => {
  const usersCollection = firestore().collection('users');
  const user = auth().currentUser;
  
  return await usersCollection.doc(user.uid)
  .update(data);
}

// 현재 유저 정보 조회
/**
 * userData = getCurUser().uid
 * 와 같은 형식으로 uid, displayName, email 등 조회 가능
 *  */ 
export const getCurUser = () => {
  return auth().currentUser;
}
