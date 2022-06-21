import RNRestart from 'react-native-restart';
import SplashScreen from 'react-native-splash-screen';

/**
 * Get KST Time
 * @returns {number} KST Time (time value in milliseconds)
 */
function getKSTTime() {
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60 * 1000;
  const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
  return utc + KR_TIME_DIFF;
}

/**
 * Convert milliseconds to YYYY.MM.DD format date
 * @param {number} timeStamp (time value in milliseconds)
 * @returns {string} YYYY.MM.DD
 */
function formatDate(timeStamp) {
  let date = new Date(timeStamp);
  let year = date.getFullYear().toString();
  let month = ('0' + (1 + date.getMonth())).slice(-2);
  let day = date.getDate();
  let formattedday = `${year}.${month}.${day}`; // ex. 2022.05.17
  return formattedday;
}

function restartApp() {
  RNRestart.Restart();
  SplashScreen.show();
}

export {getKSTTime, formatDate, restartApp};
