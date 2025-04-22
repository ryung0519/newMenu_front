import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Linking,
} from 'react-native';
import {useRoute, RouteProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/MainStack';
import {API_URL} from '@env';
import {Ionicons} from '@expo/vector-icons';
import {SafeAreaView} from 'react-native-safe-area-context';
import MapView, {Marker} from 'react-native-maps';
import * as Location from 'expo-location';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

// ✅ 화면 폭, 블로그 카드 폭 정의
const {width} = Dimensions.get('window');
const ITEM_WIDTH = width * 0.4;
const SPACING = 10;

// ✅ 라우트 및 네비게이션 타입 정의
type ProductRouteProp = RouteProp<RootStackParamList, 'Product'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const ProductDetailScreen = () => {
  const navigation = useNavigation<NavigationProp>(); // ✅ 타입 명확히 지정
  const route = useRoute<ProductRouteProp>();
  const {menuId} = route.params;

  const [menuDetail, setMenuDetail] = useState<any>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [userLocation, setUserLocation] = useState<any>(null);
  const [nearestStores, setNearestStores] = useState<any[]>([]);
  const mapRef = useRef<MapView | null>(null);

  useEffect(() => {
    const fetchMenuDetail = async () => {
      try {
        const response = await fetch(`${API_URL}/menu/${menuId}`);
        const data = await response.json();
        setMenuDetail(data);
      } catch (error) {
        console.error('메뉴 상세 조회 오류:', error);
      }
    };
    fetchMenuDetail();
  }, [menuId]);

  useEffect(() => {
    const fetchNearestStores = async () => {
      try {
        const {status} = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') return;

        const location = await Location.getCurrentPositionAsync({});
        const {latitude, longitude} = location.coords;
        setUserLocation({latitude, longitude});

        const response = await fetch(
          `${API_URL}/pos/nearest?brandName=${encodeURIComponent(
            menuDetail.businessName,
          )}&userLat=${latitude}&userLng=${longitude}`,
        );
        const data = await response.json();
        setNearestStores(data);
      } catch (error) {
        console.error('가까운 매장 조회 오류:', error);
      }
    };

    if (menuDetail?.businessName) {
      fetchNearestStores();
    }
  }, [menuDetail]);

  if (!menuDetail) return <Text style={styles.loading}>로딩중...</Text>;

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.imageWrapper}>
          <Image source={{uri: menuDetail.imageUrl}} style={styles.mainImage} />
          <TouchableOpacity
            style={styles.heartButton}
            onPress={() => setIsLiked(!isLiked)}>
            <Ionicons
              name={isLiked ? 'heart' : 'heart-outline'}
              size={28}
              color={isLiked ? '#e74c3c' : '#aaa'}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate('BrandMenuList', {
              brandName: menuDetail.businessName,
            })
          }>
          <Text style={styles.brandText}>
            {menuDetail.businessName} 브랜드 &gt;
          </Text>
        </TouchableOpacity>

        <View style={styles.nameAndStar}>
          <Text style={styles.menuName}>{menuDetail.menuName}</Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ReviewList', {
                menuId: menuId,
                menuName: menuDetail.menuName,
                imageUrl: menuDetail.imageUrl,
              })
            }>
            <Text style={styles.stars}>
              ⭐ {menuDetail.averageRating?.toFixed(1)}
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.description}>{menuDetail.description}</Text>

        <View style={styles.summaryTable}>
          <View style={styles.tableRow}>
            <Text style={styles.tableHeader}>가격</Text>
            <Text style={styles.tableHeader}>칼로리</Text>
            <Text style={styles.tableHeader}>중량</Text>
            <Text style={styles.tableHeader}>출시일</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>{menuDetail.price}원</Text>
            <Text style={styles.tableCell}>{menuDetail.calorie} kcal</Text>
            <Text style={styles.tableCell}>200g</Text>
            <Text style={styles.tableCell}>2025.05</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>이 브랜드의 인기상품</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.horizontalCards}>
            {[...Array(6)].map((_, idx) => (
              <View key={idx} style={styles.card} />
            ))}
          </View>
        </ScrollView>

        <Text style={styles.sectionTitle}>다른 추천 메뉴</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.horizontalCards}>
            {[...Array(6)].map((_, idx) => (
              <View key={idx} style={styles.card} />
            ))}
          </View>
        </ScrollView>

        <Text style={styles.sectionTitle}>블로그 리뷰</Text>
        {menuDetail.blogPosts?.length > 0 ? (
          <FlatList
            data={menuDetail.blogPosts}
            horizontal
            pagingEnabled
            snapToInterval={ITEM_WIDTH + SPACING}
            decelerationRate="fast"
            keyExtractor={(_, index) => index.toString()}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingHorizontal: 10}}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => Linking.openURL(item.link)}
                style={[
                  styles.blogCard,
                  {width: ITEM_WIDTH, marginRight: SPACING},
                ]}>
                <Text style={styles.blogTitle} numberOfLines={2}>
                  {item.title}
                </Text>
                <Text style={styles.blogDesc} numberOfLines={1}>
                  by {item.bloggerName}
                </Text>
                <Text style={styles.blogDate}>{item.postDate}</Text>
              </TouchableOpacity>
            )}
          />
        ) : (
          <Text style={{color: '#999'}}>블로그 리뷰가 없습니다.</Text>
        )}

        <Text style={styles.sectionTitle}>유튜브 리뷰</Text>
        {menuDetail.youtubeVideos?.length > 0 ? (
          <FlatList
            data={menuDetail.youtubeVideos}
            horizontal
            pagingEnabled
            snapToInterval={width * 0.6 + 11}
            decelerationRate="fast"
            keyExtractor={(_, index) => index.toString()}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingHorizontal: 10}}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.youtubeCard}
                onPress={() =>
                  Linking.openURL(
                    `https://www.youtube.com/watch?v=${item.videoId}`,
                  )
                }>
                <Image
                  source={{uri: item.thumbnailUrl}}
                  style={styles.youtubeThumbnail}
                />
                <Text numberOfLines={2} style={styles.youtubeTitle}>
                  {item.title}
                </Text>
              </TouchableOpacity>
            )}
          />
        ) : (
          <Text style={{color: '#999'}}>유튜브 리뷰가 없습니다.</Text>
        )}

        <Text style={styles.sectionTitle}>가까운 매장 위치</Text>
        {userLocation && nearestStores.length > 0 ? (
          <View>
            <MapView
              ref={mapRef}
              style={{
                width: '100%',
                height: 300,
                marginTop: 10,
                borderRadius: 10,
              }}
              initialRegion={{
                latitude: userLocation.latitude,
                longitude: userLocation.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}>
              <Marker
                coordinate={userLocation}
                title="내 위치"
                pinColor="blue"
              />
              {nearestStores.map((store, idx) => (
                <Marker
                  key={idx}
                  coordinate={{
                    latitude: store.latitude,
                    longitude: store.longitude,
                  }}
                  title={`${store.businessName} ${store.location}`}
                  description="가까운 매장"
                />
              ))}
            </MapView>

            <TouchableOpacity
              onPress={() => {
                if (mapRef.current && userLocation) {
                  mapRef.current.animateToRegion(
                    {
                      latitude: userLocation.latitude,
                      longitude: userLocation.longitude,
                      latitudeDelta: 0.01,
                      longitudeDelta: 0.01,
                    },
                    1000,
                  );
                }
              }}
              style={{
                position: 'absolute',
                bottom: 10,
                right: 10,
                backgroundColor: 'white',
                borderRadius: 30,
                padding: 8,
                elevation: 5,
              }}>
              <Ionicons name="locate" size={36} color="#007aff" />
            </TouchableOpacity>
          </View>
        ) : (
          <Text style={{color: '#999'}}>
            가까운 매장을 불러오는 중입니다...
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {flex: 1, backgroundColor: '#fff'},
  loading: {
    marginTop: 100,
    textAlign: 'center',
    fontSize: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  container: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  imageWrapper: {
    position: 'relative',
    marginBottom: 12,
  },
  mainImage: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    backgroundColor: '#eee',
  },
  heartButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 6,
    backgroundColor: 'white',
    borderRadius: 20,
    elevation: 3,
  },
  brandText: {
    color: '#777',
    marginBottom: 6,
  },
  nameAndStar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  menuName: {
    fontSize: 22,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 10,
  },
  stars: {
    fontSize: 16,
    color: '#f1c40f',
  },
  description: {
    fontSize: 14,
    color: '#444',
    marginBottom: 4,
  },
  summaryTable: {
    marginVertical: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 10,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tableHeader: {
    fontWeight: 'bold',
    fontSize: 14,
    flex: 1,
    textAlign: 'center',
  },
  tableCell: {
    fontSize: 14,
    flex: 1,
    textAlign: 'center',
    paddingVertical: 4,
  },
  reviewBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 10,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#ccc',
  },
  reviewText: {
    fontSize: 14,
  },
  reviewDate: {
    fontSize: 12,
    color: '#aaa',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 8,
  },
  rowCards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    width: 90,
    height: 90,
    backgroundColor: '#ddd',
    borderRadius: 8,
  },
  horizontalCards: {
    flexDirection: 'row',
    gap: 10,
    paddingVertical: 4,
    paddingRight: 10,
    // 가로 스크롤 위해 추가로 넣어준 코드
    flexWrap: 'nowrap',
    alignItems: 'flex-start',
  },
  blogTitle: {
    fontSize: 16, // 제목 크기 (조정 가능)
    fontWeight: 'bold',
    color: '#333',
  },

  blogDesc: {
    fontSize: 14, // 설명 크기 (조정 가능)
    color: '#666',
    lineHeight: 20, // 줄 간격 (옵션)
  },

  blogImage: {
    width: 64, // 이미지 크기 설정
    height: 64, // 이미지 크기 설정
    borderRadius: 8, // 이미지 모서리 둥글게
    backgroundColor: '#ccc', // 이미지 배경색
  },
  blogCard: {
    width: width * 0.4,
    backgroundColor: '#F5EBFF',
    borderRadius: 10,
    padding: 12,
    marginRight: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  blogDate: {
    fontSize: 12,
    color: '#aaa',
    marginTop: 4,
  },
  youtubeCard: {
    width: width * 0.6,
    marginRight: 12,
    backgroundColor: '#FFFCF3',
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  youtubeThumbnail: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: 6,
  },
  youtubeTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  youtubeLink: {
    fontSize: 12,
    color: '#007aff',
    textAlign: 'right',
  },
});

export default ProductDetailScreen;
