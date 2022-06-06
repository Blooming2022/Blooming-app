import { firebase } from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { updateCurrentMis } from './missionServices';
import { getCurrentUser, usersCollection } from './authServices';

const WEEK = 0;
const MONTH = 1;
const SEASON = 2;

/** 
 * 후기 생성
 * @param {
 *  misTitle: str
 *  misID: str
 *  misPeriod: int      // 0은 한주, 1은 한달, 2는 계절미션
 *  misSuccessDate: Date
 *  isOutdated: boolean   // currentMisList 내의 isSuccess:ture인 미션에 대해 후기를 생성하면 false, prevSuccessMission에 대해 후기 생성하면 true
 *  revContent: str
 *  revImg: str        // 후기 이미지의 URI정보. 후기 이미지가 없을 경우 ''를 넣어 호출
 * } createRevInfo 
 * @returns 성공시 Promise<void> | 실패시 -1
 */
const createRev = async (createRevInfo) => {
  try {
    const imgRef = storage().ref(`/revImg/${getCurrentUser().uid}/${createRevInfo.misID}.jpg`);
    
    if ( createRevInfo.revImg != '' ) {
      const task = imgRef.putFile(createRevInfo.revImg);
      task.on('state_changed', taskSnapshot => {
        console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
      });
      task.then(() => {
        console.log('img uploaded to the bucket!');
      });
    }
    if ( createRevInfo.isOutdated ) {
      await usersCollection.doc(getCurrentUser().uid).collection('prevSuccessMisList').doc(createRevInfo.misID).update({hasReview: true});
    } else {
      const updateMisInfo = {
        misID: createRevInfo.misID,
        updateInfo: {hasReview: true}
      };
      updateCurrentMis(updateMisInfo);
    }

    return await usersCollection.doc(getCurrentUser().uid).collection('revList').doc(createRevInfo.misID).set(createRevInfo);
  } catch (e) {
    console.log(e.message);
    return -1;
  }
}

/** 
 * 후기 한 개 조회
 * misID를 파라미터로 받아 해당 미션의 후기를 조회합니다.
 * `getRevById(misID).revContent`
 * 와 같은 방식으로 후기 내용을 참조할 수 있습니다.
 * 
 * @param {str} misID 어떤 미션에 대한 후기를 조회하고자 하는지 misID로 식별
 * @returns 성공시 Promise<void> | 실패시 -1
 */
const getRevById = async (misID) => {
  try {
    const revRef = usersCollection.doc(getCurrentUser().uid).collection('revList');
    const docRef = revRef.where(firebase.firestore.FieldPath.documentId(), '==', misID);
    const data = await docRef.get();
    const ret = data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    return ret[0];
  } catch (e) {
    console.log(e.message);
    return -1;
  }
}

/** 
 * 후기 리스트 조회
 * 현재 유저가 작성한 후기를 조회합니다.
 * @param {int} period 조회할 후기의 period. 0이면 한주, 1이면 한달, 2이면 계절. 그 외는 전체
 * @returns 성공시 Promise<[]> | 실패시 -1
 */
const getRevList = async (period) => {
  try {
    let revRef = usersCollection.doc(getCurrentUser().uid).collection('revList');
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

/** 
 * 후기 수정
 * @param {
 *  misID: str
 *  isImgUpdated: boolean    // 이미지도 함께 수정하는 경우에 true
 *  revData: {object}        // 수정할 정보만 담아서 호출
 * } updateRevInfo 
 * @returns 성공시 Promise<void> | 실패시 -1
 */
const updateRev = async (updateRevInfo) => {
  try {
    if(updateRevInfo.isImgUpdated) {
      const imgRef = storage().ref(`/revImg/${getCurrentUser().uid}/${updateRevInfo.misID}.jpg`);
      const revImg = updateRevInfo.revData.revImg;
      // 이미지 수정 - storage
      const task = imgRef.putFile(revImg);
      task.on('state_changed', taskSnapshot => {
        console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
      });
      task.then(() => {
        console.log('img uploaded to the bucket!');
      });
    }
    return await usersCollection.doc(getCurrentUser().uid).collection('revList').doc(updateRevInfo.misID).update(updateRevInfo.revData);
  } catch (e) {
    console.log(e.message);
    return -1;
  }
}

/**
 * 후기 삭제
 * @param {
 *  misID: str
 *  revImg: str
 *  isOutdated: boolean
 * } delRevInfo 삭제할 후기 관련 정보
 * @returns 성공시 Promise<void> | 실패시 -1
 */
const deleteRev = async (delRevInfo) => {
  try {

    if ( delRevInfo.revImg ) { // revImg가 있을 때 실행돼야 함
      const imgRef = storage().ref(`/revImg/${getCurrentUser().uid}/${delRevInfo.misID}.jpg`);
      imgRef.delete().then().catch((e)=>console.log(e.message));
    }
    
    if ( delRevInfo.isOutdated ) {
      await usersCollection.doc(getCurrentUser().uid).collection('prevSuccessMisList').doc(delRevInfo.misID).update({hasReview: false});
    } else {
      const updateMisInfo = {
        misID: delRevInfo.misID,
        updateInfo: {hasReview: false}
      };
      updateCurrentMis(updateMisInfo);
    }
    return await usersCollection.doc(getCurrentUser().uid).collection('revList').doc(delRevInfo.misID).delete();
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
