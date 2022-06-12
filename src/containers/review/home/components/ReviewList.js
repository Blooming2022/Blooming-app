import React, {useState} from 'react';
import {StyleSheet, FlatList, View, Text} from 'react-native';
import ReviewItem from './ReviewItem';

const ReviewList = ({reviewList}) => {
  const [containerWidth, setContainerWidth] = useState(0);
  const margins = 20 * 2;
  const numColumns = 2;

  return (
    <>
      {reviewList.length !== 0 ? (
        <FlatList
          data={reviewList}
          numColumns={numColumns}
          columnWrapperStyle={styles.container}
          onLayout={e => setContainerWidth(e.nativeEvent.layout.width)}
          renderItem={({item}) => (
            <ReviewItem review={item} width={(containerWidth - margins) / numColumns} />
          )}
          keyExtractor={item => item.id}></FlatList>
      ) : (
        <View style={styles.noItem}>
          <Text style={styles.noItemText}>아직 피워낸 꽃이</Text>
          <Text style={styles.noItemText}>없습니다</Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  noItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noItemText: {
    fontSize: 16,
    color: '#242424',
  },
});

export default ReviewList;
