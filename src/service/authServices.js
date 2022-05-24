import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { googleConfigure } from './authService_security';

const usersCollection = firestore().collection('users');

/** 구글 계정 로그인
 * 
 * @returns 성공시 Promise <FirebaseAuthTypes.UserCredential> | 실패시 -1
 */
const googleSignIn = async () => {
  try {
    googleConfigure();

    const { idToken } = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    const ret = await auth().signInWithCredential(googleCredential);
    const user = getCurrentUser();
    await usersCollection.doc(user.uid)
    .set({
      displayName: user.displayName,
      gmailAddr: user.email,
      successNum: 0
    });
    return ret;
  } catch (e) {
    console.log(e.message);
    return -1;
  }
}

/** 게스트(익명) 로그인
 * @returns 성공시 Promise<FirebaseAuthTypes.UserCredential> | 실패시 -1
 */
const guestSignIn = async () => {
  try {
    const ret = await auth().signInAnonymously();
    const user = getCurrentUser();
    await usersCollection.doc(user.uid)
    .set({
      displayName: user.displayName,
      gmailAddr: user.email,
      successNum: 0
    });
    return ret;
  } catch (e) {
    console.log(e.message);
    return -1;
  }
}

/** 현재 유저를 로그아웃시키는 함수
 * @returns 성공시 Promise<Void> | 실패시 -1
 */
const signOut = () => {
  try {
    return ret = auth().signOut();
  } catch (e) {
    console.log(e.message);
    return -1;
  }
}

/** 현재 유저의 인증 정보 조회
 * 인증 정보는 아래와 같은 형식입니다.
 * {
 * "displayName": str | null,
 * "email": str | null,
 * "emailVerified": boolean,
 * "isAnonymous": boolean,
 * "metadata": {"creationTime": str, "lastSignInTime": str},
 * "phoneNumber": str | null,
 * "photoURL": str | null,
 * "providerData": UserInfo[], 
 * "providerId": str,
 * "tenantId": str | null,
 * "uid": str
 * }
 * userData = getCurrentUser().uid
 * 와 같은 형식으로 uid, displayName, email 등을 조회할 수 있습니다.
 * 
 * @returns 성공시 FirebaseAuthTypes.User | 실패시 -1
 */
const getCurrentUser = () => {
  try {
    return auth().currentUser;
  } catch (e) {
    console.log(e.message);
    return -1;
  }
}

/** 현재 유저의 프로필 정보 조회
 * 프로필 정보는 아래와 같은 형식입니다.
 * {
 * "displayName": str | null,
 * "gmailAddr": str | null,
 * "successNum": int
 * }
 * userSimpleData = await getUserProfile();
 * successNum = userSimpleData.successNum;
 * 와 같은 형식으로 displayName, gmailAddr, successNum 을 조회할 수 있습니다.
 *
 * @returns 성공시 Promise<number> | 실패시 -1
 */
const getUserProfile = async () => {
  try {
    const user = auth().currentUser;
    let data;
    await usersCollection.doc(user.uid).get()
    .then((docs) => {
      data = docs.data();
    });
    return data;
  } catch (e) {
    console.log(e.message);
    return -1;
  }
}

/** 유저 프로필 정보 수정하기
 * data = {
 *   displayName: 'fakeName',
 *   successNum: 3
 * }
 * 위와 같은 형식으로 수정할 정보만 넣어서 호출합니다.
 * 
 * @param {*} data 수정하고자 하는 유저의 정보
 * @returns 성공시 Promise<void> | 실패시 -1
 */
const updateUserProfile = async (data) => {
  try {
    const user = getCurrentUser();
    return await usersCollection.doc(user.uid).update(data);
  } catch (e) {
    console.log(e.message);
    return -1;
  }
}

/** 회원 탈퇴
 * 해당 회원의 정보를 모두 삭제하는 함수
 * @returns 성공시 Promise<void> | 실패시 -1
 */
const deleteAccount = async () => {
  try {
    const user = auth().currentUser;
    const docPath = usersCollection.doc(user.uid);
    
    await docPath.collection('currentMisList').get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        docPath.collection('currentMisList').doc(doc.id).delete();
      });
    });
    await docPath.collection('successMisList').get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        docPath.collection('successMisList').doc(doc.id).delete();
      });
    });
    await docPath.collection('revList').get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        docPath.collection('revList').doc(doc.id).delete();
      });
    });

    docPath.delete();
    return await user.delete();
  } catch (e) {
    console.log(e.message);
    return -1;
  } 
}

/** 닉네임 중복 검사 함수
 * 닉네임 중복 검사를 실시해 이미 있는 닉네임이면 true를, 생성 가능한 닉네임이면 false를 반환하는 함수.
 * 
 * const result = await isExistNickname(nickName);
 * 위와 같은 형태로 사용하시면 결과값을 받을 수 있습니다.
 * @param {string} curNickname 중복 검사하고자 하는 닉네임
 * @returns 성공시 boolean | 실패시 -1
 */
const isExistNickname = async (curNickname) => {
  try {
    const data = await usersCollection.get();
    const nickList = data.docs.map(doc => ({ ...doc.data().displayName }));
    let ret = [];

    for(let i=0; i<nickList.length; i++ ) {
      if(nickList[i][0]) {
        let result = '';
        for( j=0 ; nickList[i][j] ; j++ ) {
          result = result + nickList[i][j];
        }
        ret.push(result);
      }
    }

    for(let i=0; i<ret.length; i++) {
      if (ret[i] == curNickname) return true;
    }
    return false;
  } catch (e) {
    console.log(e.message);
    return -1;
  }
}

export {
  googleSignIn,
  guestSignIn,
  signOut,
  getCurrentUser,
  getUserProfile,
  updateUserProfile,
  deleteAccount,
  isExistNickname
}
