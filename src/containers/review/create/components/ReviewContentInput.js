import React from 'react';
import {TextInput, View, StyleSheet} from 'react-native';

const ReviewContentInput = ({review, setReview}) => {
  const changeReviewContent = text => {
    setReview({...review, ...{revContent: text}});
    console.log(review);
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textinput}
        multiline={true}
        textAlignVertical="top"
        placeholder="후기를 입력하세요"
        placeholderTextColor="#999999"
        onChangeText={changeReviewContent}
        value={review.revContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  textinput: {
    minHeight: 350,
    fontSize: 16,
  },
});

export default ReviewContentInput;
