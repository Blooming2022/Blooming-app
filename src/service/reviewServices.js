import firestore, { firebase } from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import { getMisSuccessById } from './missionServices';

const usersCollection = firestore().collection('users');

/** 후기 생성
 * 
 * @param {string} misID 성공미션 중 현재 후기를 쓰기로 결정한 미션의 아이디
 * @param {*} revContent 후기 내용
 * @param {string} uri 후기 이미지의 URI정보.
 * @returns 성공시 Promise<void> | 실패시 -1
 */
const createRev = async (misID, revContent, uri) => {
  try {
    const user = auth().currentUser;
    const imgRef = storage().ref(`/revImg/${user.uid}/${misID}.jpg`);
    const task = imgRef.putFile(uri);
    task.on('state_changed', taskSnapshot => {
      console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
    });
    task.then(() => {
      console.log('img uploaded to the bucket!');
    });
    const url = await imgRef.getDownloadURL();
    
    const misData = await getMisSuccessById(misID);
    const revData = {
      misTitle: misData.misTitle,
      misID: misID,
      revDate: firestore.FieldValue.serverTimestamp(),
      revContent: revContent,
      revImg: url,
      uri: uri
    };
    return await usersCollection.doc(user.uid).collection('revList').doc(misID).set(revData);
  } catch (e) {
    console.log(e.message);
    return -1;
  }
}

/** 후기 한 개 조회
 * misID를 파라미터로 받아 해당 미션의 후기를 조회합니다.
 * `getRevById(misID).revContent`
 * 와 같은 방식으로 후기 내용을 참조할 수 있습니다.
 * 
 * @param {string} misID 어떤 미션에 대한 후기를 조회하고자 하는지 misID로 식별
 * @returns 성공시 Promise<void> | 실패시 -1
 */
const getRevById = async (misID) => {
  try {
    const user = auth().currentUser;
    const revRef = usersCollection.doc(user.uid).collection('revList');
    const docRef = revRef.where(firebase.firestore.FieldPath.documentId(), '==', misID);
    const data = await docRef.get();
    const ret = data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    return ret[0];
  } catch (e) {
    console.log(e.message);
    return -1;
  }
}

/**  후기 리스트 조회
 * 현재 유저가 작성한 후기 전체를 조회합니다.
 * @returns 성공시 Promise<[]> | 실패시 -1
 */
const getRevList = async () => {
  try {
    const user = auth().currentUser;
    const data = await usersCollection.doc(user.uid).collection('revList').get();
    const ret = data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    return ret;
  } catch (e) {
    console.log(e.message);
    return -1;
  }
}

/** 후기 수정
 * 
 * @param {string} misID 어떤 미션의 후기를 수정하고자 하는지 misID를 통해 식별
 * @param {*} revData 수정하고자 하는 내용만 담아서 호출
 * @param {boolean} isImgUpdated 이미지도 함께 수정하는 경우에는 true, 이미지는 그대로이면서 다른 정보가 수정될 때에는 false를 넣어 호출
 * @returns 성공시 Promise<void> | 실패시 -1
 */
const updateRev = async (misID, revData, isImgUpdated) => {
  try {
    const user = auth().currentUser;
    if(isImgUpdated) {
      const imgRef = storage().ref(`/revImg/${user.uid}/${misID}.jpg`);
      const uri = revData.uri;
      // 이미지 수정 - storage
      const task = imgRef.putFile(uri);
      task.on('state_changed', taskSnapshot => {
        console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
      });
      task.then(() => {
        console.log('img uploaded to the bucket!');
      });
      const url = await imgRef.getDownloadURL();
      // 이미지 관련 정보 수정 - firestore
      revData.uri = uri;
      revData.revImg = url;
    }
    return await usersCollection.doc(user.uid).collection('revList').doc(misID).update(revData);
  } catch (e) {
    console.log(e.message);
    return -1;
  }
}

/** 후기 삭제
 * 
 * @param {string} misID
 * @returns 성공시 Promise<void> | 실패시 -1
 */
const deleteRev = async (misID) => {
  try {
    const user = auth().currentUser;
    const imgRef = storage().ref(`/revImg/${user.uid}/${misID}.jpg`);
    imgRef.delete().then().catch((e)=>console.log(e.message));
    return await usersCollection.doc(user.uid).collection('revList').doc(misID).delete();
  } catch (e) {
    console.log(e.message);
    return -1;
  }
}

export {
  createRev,
  getRevById,
  getRevList,
  updateRev,
  deleteRev
}
