import React, {useState, useEffect, useCallback} from 'react';
import {View, StyleSheet, Linking} from 'react-native';
import CommonHeader from '../../components/Header/CommonHeader';
import SettingsItem from './components/SettingsItem';
import {deleteAccount, getCurrentUser, googleSignIn, signOut} from '../../service/authServices';
import {restartApp} from '../../service/commonServices';

const Settings = () => {
  const [isGuest, setIsGuest] = useState(true);
  let loginInfo = isGuest ? '게스트 로그인' : '소셜 로그인';
  const versionInfo = '1.01 ver';
  // prettier-ignore
  const infoPageUrl = 'https://elemental-resonance-76b.notion.site/INFO-23fbe2b899044e1e93e5bcec1d03be69';

  const linkGoogleAccount = () => {
    googleSignIn().then(() => {
      setIsGuest(false);
    });
  };
  const goInfoPage = useCallback(async () => {
    // Checking if the link is supported for links with URL scheme.
    const supported = await Linking.canOpenURL(infoPageUrl);

    if (supported) {
      await Linking.openURL(infoPageUrl);
    } else {
      console.log(`Don't know how to open this URL: ${infoPageUrl}`);
    }
  }, [infoPageUrl]);
  const signOutGoogle = () => {
    signOut();
    restartApp();
  };
  const deleteUser = () => {
    deleteAccount().then(() => {
      restartApp();
    });
  };
  useEffect(() => {
    const curUser = getCurrentUser();
    if (curUser != null) setIsGuest(curUser.isAnonymous);
  }, [isGuest]);

  return (
    <>
      <CommonHeader title="설정"></CommonHeader>
      <View style={styles.container}>
        <View style={styles.box}>
          <SettingsItem
            title="내 정보"
            text={loginInfo}
            hasImage={false} // if this has arrow image, true
            isButton={false} // if this is a button, true
            isLast={false}></SettingsItem>
          <SettingsItem
            title="버젼 정보"
            text={versionInfo}
            hasImage={false}
            isButton={false}
            isLast={false}></SettingsItem>
          {isGuest && (
            <SettingsItem
              title="연동하기"
              hasImage={true}
              isButton={false}
              isLast={false}
              pressFunc={linkGoogleAccount}></SettingsItem>
          )}
          <SettingsItem
            title="이용약관 및 개인정보 취급 방침"
            hasImage={true}
            isButton={false}
            isLast={false}
            pressFunc={goInfoPage}></SettingsItem>
          {!isGuest && (
            <SettingsItem
              title="로그아웃"
              hasImage={false}
              isButton={true}
              isLast={false}
              pressFunc={signOutGoogle}></SettingsItem>
          )}
          <SettingsItem
            title="계정 삭제"
            hasImage={false}
            isButton={true}
            isLast={true}
            pressFunc={deleteUser}></SettingsItem>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F3F3F3',
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  box: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
  },
});

export default Settings;
