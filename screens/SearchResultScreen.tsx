import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {useRoute, useNavigation, RouteProp} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/MainStack';
import Icon from 'react-native-vector-icons/Ionicons';
import SearchBar from '../components/mainpage/SearchBar';
import FilterModal from '../components/FilterModal';
import BrandFilterModal from '../components/BrandFilterModal';
import {Image} from 'react-native';
import {API_URL} from '@env';

const {width} = Dimensions.get('window');

// ✅ 제품선택시 상세페이지로 넘어가는 함수
const SearchResultScreen = () => {
  type SearchResultRouteProp = RouteProp<RootStackParamList, 'SearchResult'>;
  // ✅ 타입 명시
  const route = useRoute<SearchResultRouteProp>();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const initialResults = route.params.results; //🔹이전 화면(HomeScreen)에서 받은 검색 결과
  const [originResults, setOriginResults] = useState(initialResults); //초기 데이터값 저장
  const [results, setResults] = useState(initialResults);
  const [modalVisible, setModalVisible] = useState(false); //🔹필터 모달 창 여닫기
  const [brandModalVisible, setBrandModalVisible] = useState(false); //🔹브랜드 모달 상태 추가
  const [allSearchResults, setAllSearchResults] = useState(initialResults); //🔹전체 검색 결과 저장
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [searchKeyword, setSearchKeyword] = useState(''); //🔹현재 검색어 상태

  // ✅ 검색창에서 키워드검색시 실행되는 함수
  const handleSearch = async (keyword: string) => {
    try {
      setSearchKeyword(keyword); // 현재 검색어 상태 저장
      setSelectedBrand(null); // 검색 시 기존 브랜드 선택 해제
      setModalVisible(false);
      setBrandModalVisible(false);

      const response = await fetch(
        `${API_URL}/menu/search?keyword=${encodeURIComponent(keyword)}`,
      );
      let data = await response.json();
      setOriginResults(data); // 🔥 초기 전체 결과도 갱신
      setAllSearchResults(data); // 검색어 전체 저장
      setResults(data); // 검색 시 기존 필터 적용 없이 리셋
    } catch (error) {
      console.error('검색 중 오류:', error);
    }
  };

  // ✅ 필터 조건에 따라 결과 목록 정렬하는 함수
  const handleApplyFilter = async (filters: any) => {
    let filtered = [...originResults]; //originResults(초기 검색 결과)  기준으로 필터링 시작

    // ✅ 1. 재료 키워드 필터링 (ex: '우유' 포함된 메뉴만 보기)
    if (filters.ingredientKeyword) {
      filtered = filtered.filter(item =>
        item.ingredients
          ?.toLowerCase()
          .includes(filters.ingredientKeyword.toLowerCase()),
      );
    }

    // ✅ 2. 재료 제외 키워드 필터링 (ex: '우유' 제외한 메뉴만 보기)
    if (filters.excludeKeyword) {
      filtered = filtered.filter(
        item =>
          !item.ingredients
            ?.toLowerCase()
            .includes(filters.excludeKeyword.toLowerCase()),
      );
    }

    // 브랜드 필터링도 함께 적용 (브랜드 선택된 경우)
    if (selectedBrand) {
      filtered = filtered.filter(item => item.brand === selectedBrand);
    }

    // ✅ 3. 정렬 필터링 ( ex: 인기순, 신상순, 다이어트 순)
    console.log('✅ 선택된 정렬 옵션:', filters.selectedSort);
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
          (a, b) =>
            new Date(b.regDate).getTime() - new Date(a.regDate).getTime(),
        );
    }

    setResults(filtered);
  };

  // ✅ 4. 브랜드 선택 시 메뉴 필터링 ( ex: 메가커피, 빽다방, CU)
  const handleBrandSelect = async (brandName: string) => {
    try {
      setSelectedBrand(brandName); // 🔹 선택한 브랜드 저장
      setBrandModalVisible(false); // 🔹 모달 닫기

      // ✅ 브랜드 이름으로 백엔드에 요청 보내기
      const response = await fetch(
        `${API_URL}/menu/brand?brandName=${encodeURIComponent(brandName)}`,
      );
      let data = await response.json();

      // 🔥 [1] 브랜드 메뉴 받아온 다음
      // 🔥 [2] 현재 검색어(searchKeyword)가 존재하면 그걸로 추가 필터링
      if (searchKeyword.trim() !== '') {
        data = data.filter(item => {
          const keyword = searchKeyword.toLowerCase();
          const menuNameMatch = item.menuName?.toLowerCase().includes(keyword);
          const ingredientMatch = item.ingredients
            ?.toLowerCase()
            .includes(keyword);
          const descriptionMatch = item.description
            ?.toLowerCase()
            .includes(keyword);

          return menuNameMatch || ingredientMatch || descriptionMatch; // ✅ 하나라도 맞으면 통과
        });
      }
      setAllSearchResults(data); // 🔹 받아온 결과를 전체 검색 결과로 저장
      setResults(data); // 🔹 현재 검색 결과에도 반영
    } catch (error) {
      console.error('브랜드별 메뉴 가져오기 실패:', error);
    }
  };

  return (
    <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{paddingTop: 45}}>
        <SearchBar onSearch={handleSearch} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
            marginBottom: 10,
          }}>
          {/*✅ 브랜드필터 버튼 ui*/}
          <TouchableOpacity
            onPress={() => setBrandModalVisible(true)}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#f0f0f0', // 배경색
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderRadius: 20, // 타원형 만들기
            }}>
            <Icon name="storefront-outline" size={20} color="#333" />
            <Text style={{fontSize: 14, marginLeft: 4}}>브랜드</Text>
          </TouchableOpacity>

          {/*✅ 일반필터 버튼 ui*/}
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={{flexDirection: 'row', alignItems: 'center', gap: 4}}>
            <Icon name="filter" size={20} color="#333" />
            <Text style={{fontSize: 14}}>필터</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/*✅ 상세페이지 이동 추가 */}
      <View style={{padding: 16}}>
        {Array.isArray(results) && results.length > 0 ? (
          results.map((menu, idx) => (
            <TouchableOpacity
              key={menu.menuId || idx}
              onPress={() =>
                navigation.navigate('Product', {
                  menuId: menu.menuId,
                })
              }
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
                shadowOffset: {width: 0, height: 1},
              }}>
              {/* ✅ 이미지 보여주기 */}
              {menu.imageUrl ? (
                <Image
                  source={{uri: menu.imageUrl}}
                  style={{width: 70, height: 70, borderRadius: 6}}
                  resizeMode="cover"
                />
              ) : (
                <View
                  style={{
                    width: 70,
                    height: 70,
                    backgroundColor: '#e0e0e0',
                    borderRadius: 6,
                  }}
                />
              )}
              <View style={{flex: 1}}>
                <Text style={{fontWeight: 'bold', fontSize: 16}}>
                  {menu.menuName}
                </Text>
                <Text style={{color: '#333', marginTop: 4}}>
                  {menu.price.toLocaleString()}원
                </Text>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={{textAlign: 'center', marginTop: 20}}>
            검색 결과가 없습니다.
          </Text>
        )}
      </View>

      {/* ✅ 모달 컴포넌트 */}
      <FilterModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onApply={handleApplyFilter}
      />

      {/* ✅ 브랜드 모달 컴포넌트 */}
      <BrandFilterModal
        visible={brandModalVisible}
        onClose={() => setBrandModalVisible(false)}
        onSelectBrand={handleBrandSelect}
      />
    </ScrollView>
  );
};

export default SearchResultScreen;
