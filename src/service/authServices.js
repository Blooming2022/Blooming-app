import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const usersCollection = firestore().collection('users');

/** 게스트(익명) 로그인
 * @returns 성공시 Promise<FirebaseAuthTypes.UserCredential> | 실패시 -1
 */
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

/** 새 유저 디테일 정보 생성하기
 * 따로 값을 입력하는 것이 아니라,
 * 구글 로그인이면 구글 계정 정보, 익명이면 익명 정보를 활용해 서버에서 디테일 정보를 자동생성해 저장합니다.
 * 여기서 디테일 정보는 아래와 같은 형식입니다.
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
 * @returns 성공시 Promise<Void> | 실패시 -1
 */
const createUser = async () => {
  try {
    const user = getCurUserDetailData();
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

/** 현재 유저의 디테일 정보 조회
 * 디테일 정보 예시는 아래와 같습니다.
 * {
 * "displayName": null,
 * "email": null,
 * "emailVerified": false,
 * "isAnonymous": true,
 * "metadata": {"creationTime": 1652517994945, "lastSignInTime": 1652517994945},
 * "phoneNumber": null,
 * "photoURL": null,
 * "providerData": [],
 * "providerId": "firebase",
 * "tenantId": null,
 * "uid": "tzbI6RkRsPeAm94aglsP2e9e990f"
 * }
 * userData = getCurUserDetailData().uid
 * 와 같은 형식으로 uid, displayName, email 등을 조회할 수 있습니다.
 *  */ 
const getCurUserDetailData = () => {
  try {
    return auth().currentUser;
  } catch (e) {
    console.log(e.message);
    return -1;
  }
}

/** 현재 유저의 기본정보 조회
 * 기본정보는 아래와 같은 형식입니다.
 * {
 * "displayName": str | null,
 * "gmailAddr": str | null,
 * "successNum": int
 * }
 * userSimpleData = await getCurUserSimpleData();
 * successNum = userSimpleData.successNum;
 * 와 같은 형식으로 displayName, gmailAddr, successNum 을 조회할 수 있습니다.
 *  */ 
const getCurUserSimpleData = async () => {
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

/** 유저 정보 수정하기
 * data = {
 *   displayName: 'fakeName',
 *   successNum: 3
 * }
 * 위와 같은 형식으로 수정할 정보만 넣어서 호출합니다.
 */
const updateUser = async (data) => {
  try {
    const user = getCurUserDetailData();
    return await usersCollection.doc(user.uid).update(data);
  } catch (e) {
    console.log(e.message);
    return -1;
  }
}

/** 회원 탈퇴
 * 해당 회원의 정보를 모두 삭제하는 함수
 * @returns 성공시 Promise | 실패시 -1
 */
const deleteAccount = async () => {
  try {
    const user = auth().currentUser;
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

/** 닉네임이 null인 경우를 제외하고 현재 존재하는 회원들의 nickname들을 반환하는 함수.
 * @returns 성공시 Promise<string[]> | 실패시 -1
 */
const getNicknameList = async () => {
  try {
    const data = await usersCollection.get();
    const nickList = data.docs.map(doc => ({ ...doc.data().displayName }));
    let ret = [];

    for(i=0, count=0; i<nickList.length; i++ ) {
      if(nickList[i][0]) {
        let result = '';
        for( j=0 ; nickList[i][j] ; j++ ) {
          result = result + nickList[i][j];
        }
        ret[count] = result;
        count++;
      }
    }
    return ret;
  } catch (e) {
    console.log(e.message);
    return -1
  }
}

export {
  guestSignIn,
  signOut,
  getCurUserDetailData,
  getCurUserSimpleData,
  updateUser,
  deleteAccount,
  getNicknameList
}
