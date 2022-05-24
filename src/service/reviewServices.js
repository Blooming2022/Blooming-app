import firestore, { firebase } from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import { getSuccessMisById, updateCurrentMis } from './missionServices';

const usersCollection = firestore().collection('users');

const WEEK = 0;
const MONTH = 1;
const SEASON = 2;

/** 후기 생성
 * 
 * @param {string} misID 성공미션 중 후기를 쓸 미션의 아이디
 * @param {*} revContent 후기 내용
 * @param {string} uri 후기 이미지의 URI정보. 후기 이미지가 없을 경우 ''를 넣어 호출
 * @returns 성공시 Promise<void> | 실패시 -1
 */
const createRev = async (misID, revContent, uri) => {
  try {
    const user = auth().currentUser;
    const imgRef = storage().ref(`/revImg/${user.uid}/${misID}.jpg`);
    
    if ( uri != '' ) {
      const task = imgRef.putFile(uri);
      task.on('state_changed', taskSnapshot => {
        console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
      });
      task.then(() => {
        console.log('img uploaded to the bucket!');
      });
    }
    
    const misData = await getSuccessMisById(misID);
    const revData = {
      misTitle: misData.misTitle,
      misID: misID,
      misPeriod: misData.misPeriod,
      revContent: revContent,
      revDate: firestore.FieldValue.serverTimestamp(),
      uri: uri
    };
    
    if ( misData.isOutdated ) {
      await usersCollection.doc(user.uid).collection('successMisList').doc(misID).update({hasReview: true});
    } else updateCurrentMis(misID, {hasReview: true});

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

/** 후기 리스트 조회
 * 현재 유저가 작성한 후기를 조회합니다.
 * @param {int} period 조회할 후기의 period. 0이면 한주, 1이면 한달, 2이면 계절. 그 외는 전체
 * @returns 성공시 Promise<[]> | 실패시 -1
 */
const getRevList = async (period) => {
  try {
    const user = auth().currentUser;
    let revRef = usersCollection.doc(user.uid).collection('revList');
    if ( period == WEEK ) {
      revRef = revRef.where('misPeriod', '==', 0);
    } else if ( period == MONTH ) {
      revRef = revRef.where('misPeriod', '==', 1);
    } else if ( period == SEASON ) {
      revRef = revRef.where('misPeriod', '==', 2);
    }

    const data = await revRef.get();    
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
      // 이미지 관련 정보 수정 - firestore
      revData.uri = uri;
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
    const curRev = await getRevById(misID);

    if ( curRev.uri ) { // uri가 있을 때 실행돼야 함
      const imgRef = storage().ref(`/revImg/${user.uid}/${misID}.jpg`);
      imgRef.delete().then().catch((e)=>console.log(e.message));
    }
    
    const misData = await getSuccessMisById(misID);
    if ( misData.isOutdated ) {
      await usersCollection.doc(user.uid).collection('successMisList').doc(misID).update({hasReview: false});
    } else updateCurrentMis(misID, {hasReview: false});

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
