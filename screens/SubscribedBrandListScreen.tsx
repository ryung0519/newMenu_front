import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Ionicons} from '@expo/vector-icons';
import {AuthContext} from '../contexts/AuthContext';
import {API_URL} from '@env';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/MainStack';

const {width} = Dimensions.get('window');
type Navigation = NativeStackNavigationProp<RootStackParamList>;

const MyFavoritesScreen = () => {
  const [activeTab, setActiveTab] = useState<'menu' | 'brand'>('menu');
  const [brands, setBrands] = useState<any[]>([]);
  const {user} = useContext(AuthContext);
  const navigation = useNavigation<Navigation>();

  useEffect(() => {
    if (activeTab === 'brand') {
      fetchSubscribedBrands();
    }
  }, [activeTab]);

  const fetchSubscribedBrands = async () => {
    try {
      const res = await fetch(
        `${API_URL}/api/subscribe/list?userId=${user.userId}`,
      );
      const data = await res.json();
      setBrands(data);
    } catch (error) {
      console.error('구독 브랜드 목록 불러오기 실패:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 헤더 */}
      <View style={styles.headerRow}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>MY 찜</Text>
      </View>

      {/* 탭 */}
      <View style={styles.tabRow}>
        <TouchableOpacity
          style={[styles.tabItem, activeTab === 'menu' && styles.activeTab]}
          onPress={() => setActiveTab('menu')}>
          <Text style={styles.tabText}>찜한 메뉴</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabItem, activeTab === 'brand' && styles.activeTab]}
          onPress={() => setActiveTab('brand')}>
          <Text style={styles.tabText}>찜한 브랜드</Text>
        </TouchableOpacity>
      </View>

      {/* 콘텐츠 */}
      <View style={styles.contentArea}>
        {activeTab === 'menu' ? (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>
              찜한 메뉴 기능 준비 중입니다.
            </Text>
          </View>
        ) : (
          <FlatList
            data={brands}
            keyExtractor={item => item.businessId.toString()}
            renderItem={({item}) => (
              <View style={styles.brandItem}>
                <Text style={styles.brandText}>{item.brandName}</Text>
              </View>
            )}
            ListEmptyComponent={
              <Text style={styles.empty}>구독한 브랜드가 없습니다.</Text>
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    paddingVertical: 16,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 16,
    padding: 4,
    zIndex: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  tabRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  tabItem: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderColor: '#000',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
  },
  contentArea: {
    flex: 1,
    paddingHorizontal: 16,
  },
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 16,
    color: '#777',
  },
  brandItem: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  brandText: {
    fontSize: 16,
  },
  empty: {
    textAlign: 'center',
    color: '#999',
    marginTop: 50,
  },
});

export default MyFavoritesScreen;
