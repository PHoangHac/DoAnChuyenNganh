import React from 'react';
import {FlatList, View, Text, StyleSheet, Image} from 'react-native';
import {FListData} from '../../constants/dataDummy';

const Test3 = () => {
  return (
    <View style={{flex: 1}}>
      <FlatList
        data={FListData}
        renderItem={({item, index}) => {
          // console.log(`Item = ${JSON.stringify(item)}, index = ${index}`);
          return <FlatListItem item={item} index={index}></FlatListItem>;
        }}></FlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  flatlistItem: {
    color: 'white',
    padding: 10,
    fontSize: 16,
  },
});

const FlatListItem = ({item, index}) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
      }}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          backgroundColor: index % 2 == 0 ? 'mediumseagreen' : 'tomato',
        }}>
        <Image
          source={item.imageUrl}
          style={{width: 100, height: 100, margin: 5}}
        />
        <View style={{flex: 1, flexDirection: 'column'}}>
          <Text style={styles.flatlistItem}>{item.name}</Text>
          <Text style={styles.flatlistItem}>{item.fooddesc}</Text>
        </View>
      </View>
      <View style={{height: 2, backgroundColor: 'white'}}></View>
    </View>
  );
};

export default Test3;
