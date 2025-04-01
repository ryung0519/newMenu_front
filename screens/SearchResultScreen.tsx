import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import SearchBar from '../components/SearchBar';
import FilterModal from '../components/FilterModal';
import { API_URL } from '@env';

const { width } = Dimensions.get('window');

const SearchResultScreen = () => {
  const route = useRoute();   // 
  const initialResults = route.params?.results || []; //🔹이전 화면(HomeScreen)에서 검색된 결과 데이터를 받아옴
  const [results, setResults] = useState(initialResults);
  const [modalVisible, setModalVisible] = useState(false); // 🔹 필터 모달 창 열고 닫는 것
  

  // ✅ 검색창에서 키워드 검색 시 실행되는 함수
  const handleSearch = async (keyword: string) => {
    try {
      const response = await fetch(
        `${API_URL}/menu/search?keyword=${encodeURIComponent(keyword)}`
      );
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('검색 중 오류 발생:', error);
    }
  };

  // ✅!!!!!!!!!!!필터 조건에 따라 결과 리스트를 정렬하는 함수!!!!!!!!!
  const handleApplyFilter = (filters: any) => {
    let filtered = [...results]; // 🔹 원래 결과를 복사해서 시작


    // ✅ 1. 재료 키워드 필터링 (ex: '우유' 포함된 메뉴만 보기)
    if (filters.ingredientKeyword) {
      filtered = filtered.filter((item) =>
        item.ingredients?.toLowerCase().includes(filters.ingredientKeyword.toLowerCase())
      );
    }


    // ✅ 2. 재료 제외 키워드 필터링 (ex: '우유' 제외한 메뉴만 보기)
    if (filters.excludeKeyword) {
      filtered = filtered.filter((item) =>
        !item.ingredients?.toLowerCase().includes(filters.excludeKeyword.toLowerCase())
      );
    }


    // ✅ 2. 정렬 옵션 처리
    switch (filters.selectedSort) {
      case '가격 낮은 순':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case '가격 높은 순':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case '인기순':
        filtered.sort((a, b) => (b.clickCount || 0) - (a.clickCount || 0));
        break;
      case '다이어트 순':
        filtered.sort((a, b) => (a.calorie || 0) - (b.calorie || 0));
        break;
      case '신상순':
        filtered.sort(
          (a, b) => new Date(b.regDate).getTime() - new Date(a.regDate).getTime()
        );
      
    }

    setResults(filtered);
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ paddingTop: 45 }}>
        <SearchBar onSearch={handleSearch} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            paddingHorizontal: 20,
            marginBottom: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}
          >
            <Icon name="filter" size={20} color="#333" />
            <Text style={{ fontSize: 14 }}>필터</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ padding: 16 }}>
        {Array.isArray(results) && results.length > 0 ? (
          results.map((menu, idx) => (
            <View
              key={menu.menuId || idx}
              style={{
                marginBottom: 15,
                backgroundColor: '#fff',
                padding: 12,
                borderRadius: 8,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 12,
                shadowColor: '#ccc',
                shadowOpacity: 0.3,
                shadowOffset: { width: 0, height: 1 },
              }}
            >
              <View
                style={{ width: 70, height: 70, backgroundColor: '#e0e0e0', borderRadius: 6 }}
              />
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{menu.menuName}</Text>
                <Text style={{ color: '#333', marginTop: 4 }}>{menu.price.toLocaleString()}원</Text>
              </View>
            </View>
          ))
        ) : (
          <Text style={{ textAlign: 'center', marginTop: 20 }}>검색 결과가 없습니다.</Text>
        )}
      </View>

      {/* ✅ 모달 컴포넌트 */}
      <FilterModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onApply={handleApplyFilter}
      />
    </ScrollView>
  );
};

export default SearchResultScreen;
