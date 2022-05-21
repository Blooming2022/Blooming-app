import React, {useState} from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

// 미션 추가 창에서 미션 타이틀 입력 바로 아래에 있는 한주/한달/계절 선택 버튼의 모듈입니다.
// 세 버튼 모두 동일한 모듈을 사용하되, 실제 선택된 기간을 나타내는 periodSelected 상태값을 통해
// 한주/한달/계정 중에 어떤 미션이  선택되었는지를 나타냅니다.
// 버튼이 클릭된 경우 해당버튼의 id값을 selectedId로 받아옵니다.
// 구현하고자 하는 2가지 중 하나는 버튼 3가지중 하나가 클릭되면 다른 버튼들은 클릭되지 않은 상태로,
// 즉 세 버튼 중 하나의 버튼만 활성화되는 상태를 유지하고 싶었으나 실패했습니다.
// 실패이유를 분석한 결과, 제 코드를 통해서는 그 버튼이 이전에 클릭된 상태인지 아닌지의 여부만 판단할 수 있을 뿐,
// 다른 버튼이 클릭되어있음을 확인 후 자신의 값을 비활성화할 수 없었습니다.
// 두 번째는 버튼이 클릭되면 그 버튼의 id, 즉 selectedId 값을 periodSelected값으로 지정하여
// 해당하는 캘린더를 보여주는 것입니다. 두 번째 기능의 경우는 구현이 되어서
// AddSelfMission에서 periodSelected 값이 0,1,2 냐에 따라서 각각에 해당되는 캘린더인
// MisWeekCalendar, MisMonthCalender, MisSeasonCalender 가 보이도록 했습니다.

const MisPeriodSelectButton = ({
  buttontext,
  selectedId,
  periodSelected,
  setPeriodSelected,
}) => {
  //세 버튼 각각의 활성화 상태 여부를 표현하기 위해 state를 설정했습니다. 기본으로 한주(id=0)을 활성화상태로 구현했습니다.
  //이 활성화 여부 상태값을 토해 활성화여부에 따른 버튼 스타일을 다르게 지정했습니다.
  const [isActive, setIsActive] = useState([true, false, false]); //한주 활성화로 고정

  // 이 부분을 통해서 하나의 버튼만 활성화됨을 구현하고자 했습니다. (실패)
  // 만약 지금 선택된 버튼의 id 값이 이전에 이미 선택되어있던 id(periodSelected)와 다르다면
  // 우선 periodSelected에 해당하는 isActive를 false로 변경하고(이전에는 true일 것이므로 ! 를 사용했습니다.)
  // 그 다음 이번에 선택된 버튼의 id 값, selectedId에 해당하는 isActive를 true로 변경한 후
  // periodSelected 값을 지금 클릭된 버튼의 id 값으로 변경하고자 했습니다.
  const checkIsSelected = () => {
    if (selectedId != periodSelected) {
      setIsActive([
        ...isActive.slice(0, periodSelected),
        !isActive[periodSelected],
        ...isActive.slice(periodSelected + 1),
      ]);
      setIsActive([
        ...isActive.slice(0, selectedId),
        !isActive[selectedId],
        ...isActive.slice(selectedId + 1),
      ]);
      setPeriodSelected(selectedId);
    }
  };

  //문제 해결을 위해 이번에 선택된 id 값(selectedId)과 이전에 선택된 id 값(periodSelected) 값을 클릭될 때마다
  //실제 그 활성화 값과 스타일을 지정하기 위한 값 변경 전후로 어떻게 변경되는 지 파악하기 위해 콘솔창에 출력했습니다.
  //제가 관찰한 바로는, 처음 클릭할 때는 제가 원하던 것처럼 바로 반영되지 않고, 한 버튼당 2번씩은 클릭해야
  //원하던 흐름상의 periodSelected 값의 변화가 일어나는 것을 확인했습니다.
  //selectedId값에 해당하는 isActive 값의 참, 거짓 여부를 통해 버튼의 활성화/비활성화 스타일을 지정했습니다.
  return (
    <TouchableOpacity
      activeOpacity={0.3}
      style={[
        styles.button,
        isActive[selectedId] ? styles.selected : styles.notSelected,
      ]}
      onPress={() => {
        console.log('before pastId: ' + periodSelected);
        console.log('before selectedId: ' + selectedId);
        //클릭되었을 때 그게 선택된 건지 확인한다는 의미의 함수를 불러,
        // 그 함수 내부에서 전에 클릭된 애랑 같은 애인지 다른 애인지 체크한 후
        // 버튼의 활성화 여부를 변경하고 periodSelected 값을 업데이트합니다.
        checkIsSelected();

        console.log('after pastId: ' + periodSelected);
        console.log('after selectedId: ' + selectedId);
      }}>
      <Text
        style={[
          styles.buttontext,
          isActive[selectedId] ? styles.selectedtext : styles.notSelectedtext,
        ]}>
        {buttontext}
      </Text>
    </TouchableOpacity>
  );
};

//활성화/비활성화 여부에 따라 배경색과 폰트색만 변경되는 것이므로 공통으로 공유하는 스타일을 별도로 지정했습니다.
const styles = StyleSheet.create({
  button: {
    width: 55,
    height: 37,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 0,
    padding: 8,
    borderRadius: 20,
  },
  buttontext: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  selected: {
    backgroundColor: '#242424',
  },
  notSelected: {
    backgroundColor: '#C5C5C7',
  },
  selectedtext: {
    color: '#fff',
  },
  notSelectedtext: {
    color: '#000',
  },
});

export default MisPeriodSelectButton;
