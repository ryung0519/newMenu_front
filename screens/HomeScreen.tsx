import React from 'react';
import { View, ScrollView,Dimensions } from 'react-native';
import SearchBar from '../components/SearchBar';
import Banner from '../components/Banner';
import CategoryTabs from '../components/CategoryTabs';
import ListItem from '../components/ListItem';

const { width,height } = Dimensions.get("window");

const HomeScreen = () => {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#F8F8F8', paddingTop: height * 0.05 }}>
      <SearchBar />
      <Banner />
      <CategoryTabs />
      <View>
        {[1, 2, 3, 4].map((_, index) => (
          <ListItem key={index} />
        ))}
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
