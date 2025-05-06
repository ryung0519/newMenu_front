import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useRoute, useNavigation, RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/MainStack';
import {API_URL} from '@env';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Ionicons} from '@expo/vector-icons';

type ReviewListRouteProp = RouteProp<RootStackParamList, 'ReviewList'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const ReviewListScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<ReviewListRouteProp>();
  const {menuId, menuName, imageUrl, brandName} = route.params;

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch(`${API_URL}/api/reviews/menu/${menuId}`);
        const data = await res.json();
        setReviews(data);
      } catch (error) {
        console.error('리뷰 목록 불러오기 오류:', error);
      }
    };

    fetchReviews();
  }, [menuId]);

  return (
    <SafeAreaView style={styles.container}>
      {/* 상단 영역 */}
      <View style={styles.backHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.header}>
        <Image source={{uri: imageUrl}} style={styles.image} />
        <Text style={styles.title}>{menuName}</Text>
      </View>

      {/* 리뷰 목록 */}
      <FlatList
        data={reviews}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <View style={styles.reviewItem}>
            <View style={styles.topRow}>
              <View style={styles.ratingAndContent}>
                <Text style={styles.rating}>⭐ {item.reviewRating}</Text>
                <Text style={styles.content}>{item.reviewContent}</Text>
              </View>
              {item.imageUrls.length > 0 && (
                <View style={styles.imageGroup}>
                  {item.imageUrls
                    .slice(0, 2)
                    .map((url: string, idx: number) => (
                      <Image
                        key={idx}
                        source={{uri: url}}
                        style={styles.reviewImage}
                        resizeMode="cover"
                      />
                    ))}
                </View>
              )}
            </View>
            <Text style={styles.sub}>
              맛: {item.taste} / 양: {item.amount} / 재방문:{' '}
              {item.wouldVisitAgain}
              {item.pairedMenuName ? ` / 콤보: ${item.pairedMenuName}` : ''}
            </Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>아직 리뷰가 없습니다.</Text>
        }
        style={{flex: 1}}
        contentContainerStyle={{paddingBottom: 80}}
      />

      {/* 리뷰 작성 버튼 */}
      <TouchableOpacity
        style={styles.writeButton}
        onPress={() =>
          navigation.navigate('ReviewWrite', {
            menuId,
            menuName,
            imageUrl,
            brandName,
          })
        }>
        <Text style={styles.writeText}>리뷰 작성하기</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  header: {
    alignItems: 'center',
    padding: 16,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 12,
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  reviewItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  rating: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  content: {
    marginTop: 4,
    fontSize: 14,
  },
  sub: {
    marginTop: 6,
    fontSize: 12,
    color: '#666',
  },
  empty: {
    padding: 20,
    textAlign: 'center',
    color: '#999',
  },
  writeButton: {
    backgroundColor: '#6a4fff',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  writeText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backHeader: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  imageGroup: {
    flexDirection: 'row',
    gap: 6,
  },
  reviewImage: {
    width: 80, // 기존: 60
    height: 80,
    borderRadius: 8,
    marginLeft: 8, // 더 여유 있게
    backgroundColor: '#eee',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', // 기존: flex-start
  },

  ratingAndContent: {
    flex: 1,
    paddingRight: 8,
  },
});

export default ReviewListScreen;
