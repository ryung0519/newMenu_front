import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {API_URL} from '@env';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/MainStack';

const {width, height} = Dimensions.get('window');

const SearchBar = ({onSearch, onFocus}) => {
  const [input, setInput] = useState('');
  const inputRef = useRef(null);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'Product'>>();

  //✅현재 입력된 검색어로 검색 실행
  const handleSearch = () => {
    if (onSearch && input.trim() !== '') {
      onSearch(input);
      Keyboard.dismiss();
    }
  };

  return (
    <>
      {/* ✅ 검색창 */}
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
          zIndex: 1000,
          position: 'relative',
        }}>
        <Icon name="menu" size={width * 0.06} color="#333" />

        <TextInput
          ref={inputRef}
          placeholder="메뉴를 검색하세요"
          value={input}
          onChangeText={setInput}
          onSubmitEditing={handleSearch}
          onFocus={() => {
            onFocus?.();
          }}
          style={{
            flex: 1,
            marginLeft: width * 0.02,
            paddingVertical: width * 0.02,
            fontSize: width * 0.04,
          }}
        />

        <TouchableOpacity
          onPress={() => {
            inputRef.current?.focus();
            handleSearch();
          }}>
          <Icon name="search" size={width * 0.06} color="#333" />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default SearchBar;
