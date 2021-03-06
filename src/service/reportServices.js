import { getCurrentUser, usersCollection } from './authServices';
import { getKSTTime } from './commonServices';

const HOUR = 60 * 60 * 1000;
const DAY = 24 * HOUR;

// timeStamp가 해당 달의 몇번째 주인지 알려줌. 1~4이나 1~5, 또는 1~6의 범위
const getWeek = (timeStamp) => {
  const selectedDate = new Date(timeStamp);
  const getDateOfSelectedDate = selectedDate.getDate();
  let firstDate = new Date(selectedDate.getFullYear() + '/' + (selectedDate.getMonth()+1) + '/01');
  firstDate = new Date(firstDate.getTime() + 9*HOUR);
  const firstDayOfMonth = firstDate.getDay();
  return Math.ceil((getDateOfSelectedDate + firstDayOfMonth - 1) / 7);
}

/**
 * 각 주기별 성공한 미션의 개수를 array형태로 반환하는 함수.
 * 분석 탭 - 그래프에 사용하며
 * week: [월, 화, 수, ... , 일]
 * month: [1주, 2주, ... , 4주(or 5, 6주)] // 이번달이 5주까지 있다면 1~5주까지 반환
 * season: [1월, 2월, ... , 12월] 의 형태로 반환한다.
 * 
 * const monthSuccessNum = await getNumOfSuccessMis(1);
 * 위와 같이 await를 이용해 호출해주세요.
 * 
 * @param {int} period 0: week, 1: month, 2: season
 * @returns 성공시 Promise<int[]> | 실패시 -1
 */
const getNumOfSuccessMis = async (period) => {
  try {
    const uid = getCurrentUser().uid;
    let curMisRef = usersCollection.doc(uid).collection('currentMisList');
    curMisRef = curMisRef.where('isSuccess', '==', true);
    const curMisdata = await curMisRef.get();
    const curMisList = curMisdata.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    
    let num = Array();
  
    if (period == 0) {
      // 한주: 길이 7, 값 모두 0으로 초기화
      num = [0,0,0,0,0,0,0];
      curMisList.forEach((doc) => {
        const successDate = new Date(doc.misSuccessDate);
        let day = successDate.getDay()-1; // 0: mon, 1: tue, ... , 6: sun
        if (day == -1) day = 6;
        num[day]++;
      });
    } else if (period == 1) {
      // 한달: 길이 6(한달은 최대 6주), 값 모두 0으로 초기화
      num = [0, 0, 0, 0, 0, 0];
      const prevMisRef = usersCollection.doc(uid).collection('prevSuccessMisList');
      
      const now = new Date(getKSTTime());
      let first = new Date(now.getFullYear() + '/' + (now.getMonth()+1) + '/01');
      first = new Date(first.getTime() + 9 * HOUR);
      let firstDayOfMonth = first.getDay();
      let thisMonthPrevMisRef = prevMisRef.where('misSuccessDate', '>=', first.getTime());
  
      const prevMisdata = await thisMonthPrevMisRef.get();
      const prevMis = prevMisdata.docs.map(doc => ({ misSuccessDate: doc.data().misSuccessDate, id: doc.id }));
      prevMis.forEach((doc) => {
        const successDate = new Date(doc.misSuccessDate);
        const weekNo = getWeek(successDate)-1;
        num[weekNo]++;
      });
  
      if (firstDayOfMonth != 1) {
        // 첫 주의 시작이 월요일이 아니면 이전 달의 마지막주 데이터도 가져옴(주의 시작을 월요일로 설정하기 위해서)
        const lastWeekMonday = first.getTime() - (firstDayOfMonth-1) * DAY;
        const lastMonthprevMisRef = prevMisRef.where('misSuccessDate', '<', first.getTime()).where('misSuccessDate', '>=', lastWeekMonday);
        const lastMonthPrevMisdata = await lastMonthprevMisRef.get();
        const lastMonthprevMis = lastMonthPrevMisdata.docs.map(doc => ({ misSuccessDate: doc.data().misSuccessDate, id: doc.id }));
        num[0] += lastMonthprevMis.length;
      }
  
      // 현재 주의 데이터 넣기(위에서 curMisList중 isSuccess=true인 미션만 쿼리해왔으므로 리스트의 길이가 곧 미션의 개수)
      const curWeekNo = getWeek(now);
      num[curWeekNo-1] = curMisList.length;

      // 이번달이 몇 주까지 있는지 확인하고, Array 길이 설정해주기
      let last = new Date(now.getFullYear() + '/' + (now.getMonth()+2) + '/00');
      let weekOfLastDay = getWeek(last.getTime() + 9 * HOUR);
      num.length = weekOfLastDay;

    } else if (period == 2) {
      // 계절: 길이 12, 값 모두 0으로 초기화
      num = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      
      const now = new Date(getKSTTime());
      let firstDayOfYear = new Date(now.getFullYear() + '/01' + '/01');
      firstDayOfYear = new Date(firstDayOfYear.getTime() + 9 * HOUR);

      const prevMisRef = usersCollection.doc(uid).collection('prevSuccessMisList').where('misSuccessDate', '>=', firstDayOfYear.getTime());
      const PrevMisdata = await prevMisRef.get();
      const prevMisList = PrevMisdata.docs.map(doc => ({ misSuccessDate: doc.data().misSuccessDate, id: doc.id }))
      prevMisList.forEach((doc) => {
        const successDate = new Date(doc.misSuccessDate);
        num[successDate.getMonth()]++;
      });

      // curMisList에서 가져오기
      const month = now.getMonth() + 1;
      let firstDayOfMonth = new Date(now.getFullYear() + '/' + month + '/01');
      firstDayOfMonth = new Date(firstDayOfMonth.getTime() + 9 * HOUR);

      curMisList.forEach((doc) => {
        if (doc.misSuccessDate >= firstDayOfMonth.getTime()) {
          num[month - 1] ++;
        } else num[month - 2] ++;
      });
    }
    return num;
  } catch (e) {
    console.log(e.message);
    return -1;
  }
}

export {getNumOfSuccessMis}
