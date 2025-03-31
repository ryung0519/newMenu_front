import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import SearchBar from '../components/SearchBar';
import Banner from '../components/Banner';
import CategoryTabs from '../components/CategoryTabs';
import GlobalStyles from '../styles/GlobalStyles';
import { useNavigation } from '@react-navigation/native'; 
import { API_URL } from '@env';

const HomeScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('defaultCategory');
  const navigation = useNavigation(); // ✅ 페이지 이동용 navigation

  // ✅ 홈화면 검색창에서 검색하고, 검색 결과 페이지로 이동
  // SearchBar에서 받은 키워드로 API 호출
  // 서버에서 DB 조회 후, 결과를 data로 받음
  const handleSearch = async (keyword: string) => {
    try {
      const response = await fetch(`${API_URL}/menu/search?keyword=${encodeURIComponent(keyword)}`);
      const data = await response.json();
      console.log('받아온 메뉴 데이터:', data);
      navigation.navigate('SearchResult', { results: data }); // ✅ 검색결과 페이지로 이동
    } catch (error) {
      console.error('검색 중 오류 발생:', error);
    }
  };

  return (
    <ScrollView style={GlobalStyles.container}>
      {/* ✅ 검색 기능 연결 */}
      <SearchBar onSearch={handleSearch} />
      <Banner />
      <CategoryTabs selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
    </ScrollView>
  );
};

export default HomeScreen;
