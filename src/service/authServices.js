import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const usersCollection = firestore().collection('users');

// guestSignIn(): 게스트 로그인(익명)
const guestSignIn = async () => {
  try {
    const ret = await auth().signInAnonymously();
    await createUser();
    return ret;
  } catch (e) {
    console.log(e.message);
    return -1;
  }
}

// signOut(): 로그아웃
const signOut = () => {
  try {
    return ret = auth().signOut();
  } catch (e) {
    console.log(e.message);
    return -1;
  }
}

// deleteAccount(): 회원 탈퇴
const deleteAccount = async () => {
  try {
    const user = getCurUser();
    const docPath = usersCollection.doc(user.uid);
    
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
        docPath.collection('misListSuccess').doc(doc.id).delete();
      });
    });
    await docPath.collection('reviews').get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        docPath.collection('revList').doc(doc.id).delete();
      });
    });

    docPath.delete();
    return user.delete();
  } catch (e) {
    console.log(e.message);
    return -1;
  } 
}

// createUser(): 새 유저 기본정보 생성하기
const createUser = async () => {
  try {
    const user = getCurUser();
    return await usersCollection.doc(user.uid)
    .set({
      displayName: user.displayName,
      gmailAddr: user.email,
      successNum: 0
    });
  } catch {
    console.log(e.message);
    return -1;
  }
}

// 현재 유저 정보 조회
/**
 * userData = getCurUser().uid
 * 와 같은 형식으로 uid, displayName, email 등 조회 가능
 *  */ 
const getCurUser = () => {
  try {
    // console.log(auth().currentUser);
    return auth().currentUser;
  } catch (e) {
    console.log(e.message);
    return -1;
  }
}

const getExtraUserData = async () => {
  try {
    const user = auth().currentUser;
    await usersCollection.doc(user.uid).get()
    .then((docs) => {
      var data = [];
      if(docs.exists) {
        data = [...data, {id: docs.id, ...docs.data()}];
      }
      // console.log(docs.data());
      console.log(data);
      return data;
    });
  } catch (e) {
    console.log(e.message);
    return -1;
  }
}

// updateUser(data): 유저 정보 수정하기
/**
 * data = {
 *   displayName: 'fakeName',
 *   successNum: 3
 * }
 * 위와 같은 형식으로 수정할 정보만 넣어서 호출
 */
const updateUser = async (data) => {
  try {
    const user = getCurUser();
    return await usersCollection.doc(user.uid)
    .update(data);
  } catch (e) {
    console.log(e.message);
    return -1;
  }
}

export {
  guestSignIn,
  signOut,
  deleteAccount,
  getCurUser,
  getExtraUserData,
  updateUser
}
