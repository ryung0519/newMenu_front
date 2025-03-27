import React, { useEffect, useState } from 'react';
import { View, ScrollView, Dimensions } from 'react-native';
import SearchBar from '../components/SearchBar';
import Banner from '../components/Banner';
import CategoryTabs from '../components/CategoryTabs';
import ListItem from '../components/ListItem';
import axios from 'axios';
import GlobalStyles from '../styles/GlobalStyles';
// import { API_URL } from '@env';

const { width, height } = Dimensions.get('window');


const HomeScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('defaultCategory');
  const [menus, setMenus] = useState<{ menuId: number; menuName: string; price: number }[]>([]);



  return (
    <ScrollView style={GlobalStyles.container}>
      <SearchBar />
      <Banner />
      <CategoryTabs selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
    </ScrollView>
  );
};

export default HomeScreen;
