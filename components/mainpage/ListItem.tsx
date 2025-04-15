import {useNavigation} from '@react-navigation/native';
import React, {NamedExoticComponent} from 'react';
import {View, Text, Dimensions, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import type {RootStackParamList} from '../../types/navigation';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import GlobalStyles from '../../styles/GlobalStyles';

const {width, height} = Dimensions.get('window');

interface ListItemProps {
  menu: {
    description: any;
    menuId: number;
    menuName: string;
    price: number;
  } | null; // 메뉴가 없을 경우 null 허용
}

const ListItem: React.FC<ListItemProps> = ({menu}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'Product'>>();

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
                  name="star"
                  size={width * 0.035}
                  color="gold"
                  style={{marginLeft: 0}}
                />
              ))}
              <TouchableOpacity>
                <Icon
                  name="heart-o"
                  size={width * 0.05}
                  color="#777"
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
