import React, {useEffect} from 'react';
import {StyleSheet, View, TextInput} from 'react-native';

//AddSelfMission에서 미션의 타이틀을 입력받는 모듈입니다.
//이 모듈에서는 타이틀값이 입력되었는지의 여부 확인을 통해 저장버튼의 활성화여부를 결정합니다.
//AddSelfMission에서 넘어온 setButtonDisable 값을 타이틀의 길이가 0을 넘는지 안 넘는지의 여부를 통해 true,false를 설정합니다.
//현재 미션 타이틀의 최대 길이는 20으로 설정하였으며, MisMemoInput과 마찬가지로 추후 수정의 용이함을 위해 따로 변수로 설정했습니다.
//피그마에는 고려되어있지 않는 부분이지만, 만약 타이틀이 입력되지 않은 채로 다른 곳을 먼저 클릭하면(focus가 이동하면)
//미션타이틀 하단의 막대가 붉은 색으로 변하며 미션타이틀을 입력하세요라는 안내문구를 적고 싶었으나 구현하지 못하였습니다.
//그래서 우선 주석으로만 남겨두고 지우지는 않았습니다. 후에 미션값 입력여부가 아닌, 유효한 미션타이틀인지 여부를 체크할 때
//활용해도 좋다고 생각했기 때문입니다. 예를 들어, 모음 자음 하나만 적힌 미션타이틀, 혹은 한글자만 입력된 타이틀 등등
const MisTitleInput = ({
  misTitle,
  setMisTitle,
  setButtonDisable,
  isNullTitle,
  setIsNullTitle,
}) => {
  var misTitleLength = misTitle.length;
  const maxLengthOfMisTitle = 20;

  useEffect(() => {
    misTitleLength > 0 ? setButtonDisable(false) : setButtonDisable(true);
    setIsNullTitle(false);
  }, [misTitle]);

  return (
    <>
      {/* <View style={[styles.container, isNullTitle && styles.red]}> */}
      {/* 원래는 위에꺼를 적용해야 하는데 다 fail처리 되어서 우선 주석처리 함 */}
      <View style={[styles.container]}>
        <TextInput
          autoFocus={false} //오토포커스하면 자동으로 키보드가 올라와서 false처리함
          style={styles.textInput}
          onChangeText={setMisTitle}
          placeholder="셀프 미션을 입력해주세요!"
          placeholderTextColor={'#999999'} //#CCCDD0은 닉네임색상, 피그마에 비해 연해서 임의로 바꿈
          maxLength={maxLengthOfMisTitle}></TextInput>
      </View>
      {/* {isNullTitle && (
        <Text style={styles.failText}>* 미션타이틀을 입력해주세요.</Text>
      )} */}
      {/* 미션 타이틀이 입력되지 않은 경우를 처리하고 싶은데 다 fail로 처리되어서 우선 주석처리함 */}
      {/* 저장버튼 활성화 자체가 타이틀이 입력된 여부를 처리하므로 여기서는 유효한 미션타이틀인지를 체크해야 할 듯(한글자 이상 등등) */}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row', // 혹은 'column'
    alignItems: 'center',

    borderBottomColor: '#242424',
    borderBottomWidth: 2,
    marginTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
  buttonContainerRight: {
    alignItems: 'flex-end',
    marginTop: 6,
    marginLeft: 80,
  },
  red: {
    borderBottomColor: '#F54D3F',
    borderBottomWidth: 2,
  },
  textInput: {
    paddingLeft: 5,
    paddingBottom: 5,
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
  failText: {
    marginTop: 5,
    fontSize: 12,
    color: '#F54D3F',
  },
});

export default MisTitleInput;
