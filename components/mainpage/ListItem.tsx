import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {View, Text, Dimensions, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import type {RootStackParamList} from '../../types/navigation';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import GlobalStyles from '../../styles/GlobalStyles';

const {width, height} = Dimensions.get('window');

interface ListItemProps {
  menu: {
    rating: number;
    description: any;
    menuId: number;
    menuName: string;
    price: number;
  } | null; // 메뉴가 없을 경우 null 허용
}

const ListItem: React.FC<ListItemProps> = ({menu}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'Product'>>();

  const [isLiked, setIsLiked] = React.useState(false);
  //  좋아요 요청 보내는 API로 확장 시
  // const toggleLike = async () => {
  //   const next = !isLiked;
  //   setIsLiked(next);
  //   try {
  //     await axios.post(`${API_URL}/menu/${menu.menuId}/like`, {
  //       liked: next,
  //     });
  //   } catch (err) {
  //     console.error('좋아요 토글 실패', err);
  //     setIsLiked(!next); // 실패 시 롤백
  //   }
  // };

  return (
    <View style={GlobalStyles.card}>
      <TouchableOpacity onPress={() => navigation.navigate('Product', {menu})}>
        <View style={GlobalStyles.imageBox}>
          <Image
            source={{uri: 'https://via.placeholder.com/100'}}
            style={GlobalStyles.image}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Product', {menu})}>
        <View style={GlobalStyles.infoBox}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '87%',
            }}>
            {/* 왼쪽: 메뉴 이름 */}
            <Text
              style={GlobalStyles.name}
              numberOfLines={1}
              ellipsizeMode="tail">
              {menu ? `${menu.menuName}` : '메뉴없음'}{' '}
            </Text>
            {/* 오른쪽: 별점 + 하트 */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-end',
                flexShrink: 0, // 오른쪽 아이콘 줄어들지 않게
                marginLeft: 10,
              }}>
              {[...Array(5)].map((_, rating = 3) => (
                <Icon
                  key={rating}
                  name={rating < (menu?.rating ?? 0) ? 'star' : 'star-o'}
                  size={width * 0.038}
                  color="gold"
                  style={{marginLeft: 0}}
                />
              ))}
              <TouchableOpacity onPress={() => setIsLiked(prev => !prev)}>
                <Icon
                  name={isLiked ? 'heart' : 'heart-o'}
                  size={width * 0.05}
                  color={isLiked ? 'red' : '#777'}
                  style={{marginLeft: width * 0.015}}
                />
              </TouchableOpacity>
            </View>
          </View>
          <Text style={GlobalStyles.price}>
            {menu ? `${menu.price}원` : '가격정보 없음'}{' '}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={GlobalStyles.text}>
              {menu ? `${menu.description}` : '설명 없음'}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};
export default ListItem;
