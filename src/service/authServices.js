import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const usersCollection = firestore().collection('users');

// guestSignIn(): 게스트 로그인(익명)
export const guestSignIn = async () => {
  try {
    const ret = await auth().signInAnonymously();
    await createUser();
    return ret;
  } catch (e) {
    alert("정상적으로 처리되지 않았습니다. 다시 시도해주세요.");
    return -1;
  }
}

// signOut(): 로그아웃
export const signOut = () => {
  try {
    return ret = auth().signOut();
  } catch (e) {
    alert("정상적으로 처리되지 않았습니다. 다시 시도해주세요.");
    return -1;
  }
}

// deleteAccount(): 회원 탈퇴
export const deleteAccount = async () => {
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
        docPath.collection('misSuccess').doc(doc.id).delete();
      });
    });
    await docPath.collection('reviews').get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        docPath.collection('reviews').doc(doc.id).delete();
      });
    });

    docPath.delete();
    return user.delete();
  } catch (e) {
    alert("정상적으로 처리되지 않았습니다. 다시 시도해주세요.");
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
    alert("정상적으로 처리되지 않았습니다. 다시 시도해주세요.");
    return -1;
  }
}

// 현재 유저 정보 조회
/**
 * userData = getCurUser().uid
 * 와 같은 형식으로 uid, displayName, email 등 조회 가능
 *  */ 
 export const getCurUser = () => {
  try {
    // console.log(auth().currentUser);
    return auth().currentUser;
  } catch (e) {
    alert("정상적으로 처리되지 않았습니다. 다시 시도해주세요.");
    return -1;
  }
}

export const getExtraUserData = async () => {
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
    alert("정상적으로 처리되지 않았습니다. 다시 시도해주세요.");
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
export const updateUser = async (data) => {
  try {
    const user = getCurUser();
    return await usersCollection.doc(user.uid)
    .update(data);
  } catch (e) {
    alert("정상적으로 처리되지 않았습니다. 다시 시도해주세요.");
    return -1;
  }
}
