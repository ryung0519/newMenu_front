import React from 'react';
import {View, TextInput, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const {width, height} = Dimensions.get('window');

const SearchBar = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        width: width * 0.9,
        height: height * 0.05,
        alignSelf: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: width * 0.03,
        elevation: 2,
        marginVertical: width * 0.03,
      }}>
      <Icon name="menu" size={width * 0.06} color="#333" />
      <TextInput
        placeholder="메뉴를 검색하세요"
        style={{
          flex: 1,
          marginLeft: width * 0.02,
          paddingVertical: width * 0.02,
          fontSize: width * 0.04,
        }}
      />
      <Icon name="search" size={width * 0.06} color="#333" />
    </View>
  );
};

export default SearchBar;
