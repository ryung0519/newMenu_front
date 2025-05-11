import React, {useState} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
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
      {/* ✅ 지역 특별 메뉴 알림창 모델 */}
      <LocalMenuAlert
        visible={alertModalVisible}
        setVisible={setAlertModalVisible}
        onHideToday={() => setAlertModalVisible(false)}
        onNeverShow={() => setAlertModalVisible(false)}
      />

      {/* ✅ 검색 기능 연결 */}
      <SearchBar onSearch={handleSearch} />

      <Banner />
      <CategoryTabs
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
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
