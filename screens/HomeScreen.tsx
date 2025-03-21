import React, { useEffect, useState } from 'react';
import { View, ScrollView, Dimensions } from 'react-native';
import SearchBar from '../components/SearchBar';
import Banner from '../components/Banner';
import CategoryTabs from '../components/CategoryTabs';
import ListItem from '../components/ListItem';
import axios from 'axios';
// import { API_URL } from '@env';

const { width, height } = Dimensions.get('window');


const HomeScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('defaultCategory');
  const [menus, setMenus] = useState<{ menuId: number; menuName: string; price: number }[]>([]);

  // //백엔드에서 카테고리 정보(목록) 가져옴
  // useEffect(() => {
  //   axios.get(`${API_URL}/menu/categories`)
  //     .then(response => {
  //       if (response.data.length > 0) {
  //         //첫번째 카테고리 기본 선택
  //         setSelectedCategory(response.data[0].name);
  //       }
  //     })
  //     .catch(error => {
  //       console.error('/components/CategoryTabs 카테고리 정보 오류:', error);
  //     });
  // }, []);

  // // 백엔드에서 해당 카테고리의 메뉴 가져옴
  // useEffect(() => {
  //   if (selectedCategory) {
  //     axios.get(`${API_URL}/menu/${selectedCategory}`)
  //       .then(response => {
  //         setMenus(response.data);
  //       })
  //       .catch(error => {
  //         console.error('/components/CategoryTabs 카테고리 메뉴 오류:', error);
  //       });
  //   }
  // }, [selectedCategory]);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#F8F8F8', paddingTop: height * 0.05 }}>
      <SearchBar />
      <Banner />
      <CategoryTabs selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
      <View>
        {menus.length > 0 ? (
          menus.map((menu) => (
          <ListItem key={menu.menuId} menu = {menu} />
        ))
      ):(
          <ListItem key="메뉴가 없습니다." menu={null} /> 
        )}
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
