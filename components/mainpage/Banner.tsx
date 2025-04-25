import React, {useEffect, useState} from 'react';
import {View, Text, Dimensions, Image, FlatList} from 'react-native';
import GlobalStyles from '../../styles/GlobalStyles';
import {API_URL} from '@env';
import * as Location from 'expo-location';
import ImageColors from 'react-native-image-colors';

const {width, height} = Dimensions.get('window');

const Banner = ({item, menuName}) => {
  const [bannerItems, setBannerItems] = useState([]);
  const [bgColor, setBgColor] = useState('#ffffff');

  //위치기반 메뉴 불러오기
  useEffect(() => {
    const fetchBannerMenu = async () => {
      const {status} = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;

      const loc = await Location.getCurrentPositionAsync({});
      const cityInfo = await Location.reverseGeocodeAsync(loc.coords);
      const city = cityInfo?.[0]?.city;
      console.log(city);
      if (city) {
        const res = await fetch(
          `${API_URL}/api/menus/by-location?keyword=${encodeURIComponent(
            city,
          )}`,
        );
        const data = await res.json();
        const bannerData = data.map(menu => ({
          ...menu,
          city,
        }));
        console.log(bannerData);

        setBannerItems(bannerData); //여러 개 설정
      }
    };

    fetchBannerMenu();
  }, []);

  useEffect(() => {
    fetch(`${API_URL}/banner`)
      .then(res => res.json())
      .then(data => setBannerItems(data))
      .catch(err => console.error('베너 데이터 불러오기 실패:', err));
  }, []);

  //제품 색상에 따라 배경색 변경
  useEffect(() => {
    const fetchColors = async () => {
      const result = await ImageColors.getColors(item.imageUrl, {
        fallback: '#ffffff',
        cache: true,
        key: item.menuId?.toString(),
      });

      //어울리는 색상이 없을 경우를 대비해 기본값정의
      let color = '#ffffff';

      switch (result.platform) {
        case 'android':
          color = result.dominant ?? '#fce1e1';
          break;
        case 'ios':
          color = result.background ?? '#fce1e1';
          break;
        case 'web':
          color = result.vibrant ?? '#fce1e1';
          break;
        default:
          color = '#fce1e1';
      }
      setBgColor(color);
    };

    fetchColors();
  }, [item.imageUrl]);

  return (
    <FlatList
      data={bannerItems}
      keyExtractor={(item, index) => `banner-${item.menuId ?? index}`}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      // GPS기반 해당 메뉴 메인 베너
      renderItem={({item}) => (
        <View style={GlobalStyles.bannerContainer}>
          <View style={GlobalStyles.modalTextContainer}>
            <Text style={GlobalStyles.bannerTitle}>
              '{item.city}'에서만 먹을 수 있는 메뉴!
            </Text>
            <Text style={GlobalStyles.bannerSubtitle}>
              지금 {item.city}에 계신 김에 {item.menuName}는 어떠신가요?
            </Text>
          </View>
        </View>
      )}
    />
  );
};

export default Banner;
