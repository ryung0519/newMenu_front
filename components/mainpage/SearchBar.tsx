import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {API_URL} from '@env';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/MainStack';

const {width, height} = Dimensions.get('window');

const SearchBar = ({onSearch}) => {
  const [input, setInput] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [keywords, setKeywords] = useState<string[]>([]);
  const inputRef = useRef(null);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'Product'>>();

  //✅검색창 onFocus 됐을때, 백엔드에서 API 가져옴
  const fetchHotKeywords = async () => {
    try {
      const response = await fetch(`${API_URL}/click/hot-keywords`);
      const data = await response.json();
      setKeywords(data.map((item: any) => item.menuName));
    } catch (error) {
      console.error('🔥 급상승 키워드 로딩 실패:', error);
    }
  };

  //✅현재 입력된 검색어로 검색 실행
  const handleSearch = () => {
    if (onSearch && input.trim() !== '') {
      onSearch(input);
      Keyboard.dismiss();
      setIsFocused(false);
    }
  };

  //✅ 급상승 키워드에서 제품 누르면 해당 제품으로 이동
  const handleKeywordPress = async (keyword: string) => {
    try {
      const response = await fetch(
        `${API_URL}/menu/search?keyword=${encodeURIComponent(keyword)}`,
      );
      const data = await response.json();

      if (data && data.length > 0) {
        // ✅ 정확히 일치하는 메뉴 찾기
        const exactMatch = data.find(menu => menu.menuName === keyword);

        if (exactMatch) {
          navigation.navigate('Product', {
            menuId: exactMatch.menuId,
          });
        } else {
          alert('정확히 일치하는 메뉴가 없습니다.');
        }
      } else {
        alert('해당 메뉴를 찾을 수 없습니다.');
      }
    } catch (error) {
      console.error('🔴 메뉴 상세 이동 실패:', error);
    }

    Keyboard.dismiss();
    setIsFocused(false);
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
          zIndex: 100,
        }}>
        <Icon name="menu" size={width * 0.06} color="#333" />

        <TextInput
          ref={inputRef}
          placeholder="메뉴를 검색하세요"
          value={input}
          onChangeText={setInput}
          onSubmitEditing={handleSearch}
          onFocus={() => {
            setIsFocused(true);
            fetchHotKeywords();
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

      {/* ✅ 급상승 검색어 영역 */}
      {isFocused && (
        <TouchableWithoutFeedback
          onPress={() => {
            setIsFocused(false);
            Keyboard.dismiss();
          }}>
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: '#fff',
              zIndex: 99,
              justifyContent: 'flex-start',
              paddingTop: height * 0.12, // 검색창 아래로 밀기
              paddingHorizontal: width * 0.05,
            }}>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
              <Text
                style={{fontWeight: 'bold', fontSize: 16, marginBottom: 10}}>
                🔥 급상승 검색어
              </Text>
              {keywords.map((keyword, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleKeywordPress(keyword)}>
                  <Text style={{fontSize: 15, paddingVertical: 6}}>
                    {index + 1}. {keyword}
                  </Text>
                </TouchableOpacity>
              ))}
            </KeyboardAvoidingView>
          </View>
        </TouchableWithoutFeedback>
      )}
    </>
  );
};

export default SearchBar;
