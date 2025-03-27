import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import SearchBar from '../components/SearchBar';
import Banner from '../components/Banner';
import CategoryTabs from '../components/CategoryTabs';
import GlobalStyles from '../styles/GlobalStyles';
// import { API_URL } from '@env';


const HomeScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('defaultCategory');
  // const [menus, setMenus] = useState<{ menuId: number; menuName: string; price: number }[]>([]);

  return (
    <ScrollView style={GlobalStyles.container}>
      <SearchBar />
      <Banner />
      <CategoryTabs selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
    </ScrollView>
  );
};

export default HomeScreen;
