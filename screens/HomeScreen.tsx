import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
} from 'react-native';
import SearchBar from '../components/mainpage/SearchBar';
import Banner from '../components/mainpage/Banner';
import CategoryTabs from '../components/mainpage/CategoryTabs';
import GlobalStyles from '../styles/GlobalStyles';
import {API_URL} from '@env';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../types/navigation';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LocalMenuAlert from '../components/local_menu/LocalMenuAlert';

const Stack = createNativeStackNavigator<RootStackParamList>();
const {height} = Dimensions.get('window');

const HomeScreen = () => {
  const [selectedCategory, setSelectedCategory] =
    useState<string>('defaultCategory');
  const navigation = useNavigation();
  const [alertModalVisible, setAlertModalVisible] = useState(true);

  const [isSearchFocused, setIsSearchFocused] = useState(false); // 🔍 검색창 포커스 상태
  const [hotKeywords, setHotKeywords] = useState<string[]>([]); // 🔥 급상승 키워드

  // 🔥 급상승 키워드 백엔드 호출
  const fetchHotKeywords = async () => {
    try {
      const response = await fetch(`${API_URL}/click/hot-keywords`);
      const data = await response.json();
      setHotKeywords(data.map((item: any) => item.menuName));
    } catch (error) {
      console.error('🔥 급상승 키워드 로딩 실패:', error);
    }
  };

  // ✅ 검색 실행 함수
  const handleSearch = async (keyword: string) => {
    try {
      const response = await fetch(
        `${API_URL}/menu/search?keyword=${encodeURIComponent(keyword)}`,
      );
      const data = await response.json();
      //@ts-ignore
      navigation.navigate('SearchResult', {results: data});
    } catch (error) {
      console.error('검색 중 오류 발생:', error);
    }
  };

  return (
    <View style={GlobalStyles.container}>
      {/* ✅ 지역 특별 메뉴 알림창 */}
      <LocalMenuAlert
        visible={alertModalVisible}
        setVisible={setAlertModalVisible}
        onHideToday={() => setAlertModalVisible(false)}
        onNeverShow={() => setAlertModalVisible(false)}
      />

      {/* ✅ 검색창 */}
      <SearchBar
        onSearch={handleSearch}
        onFocus={() => {
          setIsSearchFocused(true);
          fetchHotKeywords();
        }}
      />

      {/* ✅ 배너 + 카테고리 */}
      <Banner />
      <CategoryTabs
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* ✅ 급상승 키워드 오버레이 UI */}
      {isSearchFocused && (
        <TouchableWithoutFeedback
          onPress={() => {
            setIsSearchFocused(false);
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
              zIndex: 999,
              elevation: 5,
              paddingTop: height * 0.12,
              paddingHorizontal: 20,
            }}>
            <KeyboardAvoidingView>
              <Text
                style={{fontWeight: 'bold', fontSize: 16, marginBottom: 10}}>
                🔥 급상승 검색어
              </Text>
              {hotKeywords.map((keyword, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    setIsSearchFocused(false);
                    handleSearch(keyword);
                  }}>
                  <Text style={{fontSize: 15, paddingVertical: 6}}>
                    {index + 1}. {keyword}
                  </Text>
                </TouchableOpacity>
              ))}
            </KeyboardAvoidingView>
          </View>
        </TouchableWithoutFeedback>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  loginButton: {
    backgroundColor: '#8000FF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  loginButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default HomeScreen;
