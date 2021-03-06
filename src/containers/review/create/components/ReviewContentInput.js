import React from 'react';
import {TextInput, View, StyleSheet} from 'react-native';

const ReviewContentInput = ({review, setReview}) => {
  const maxLengthOfRevContent = 500;
  const placeholderStr = `후기 (최대 ${maxLengthOfRevContent}자)`;

  const changeReviewContent = text => {
    setReview({...review, ...{revContent: text}});
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textinput}
        multiline={true}
        textAlignVertical="top"
        placeholder={placeholderStr}
        placeholderTextColor="#999999"
        onChangeText={changeReviewContent}
        value={review.revContent}
        maxLength={maxLengthOfRevContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingBottom: 50,
  },
  textinput: {
    minHeight: 350,
    fontSize: 14,
    color: '#242424',
  },
});

export default ReviewContentInput;
