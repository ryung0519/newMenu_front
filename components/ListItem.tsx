import { useNavigation } from '@react-navigation/native';
import React, { NamedExoticComponent } from 'react';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import type { RootStackParamList } from '../types/navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const { width, height } = Dimensions.get('window');

interface ListItemProps{
  menu:{
    menuId: number;
    menuName: string;
    price:number;
  } | null; // 메뉴가 없을 경우 null 허용
}

const ListItem : React.FC<ListItemProps> = ({ menu }) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Product'>>();

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Product', { menu })}>
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: width * 0.02, backgroundColor: '#FFF', marginHorizontal: width * 0.03, marginVertical: width * 0.01, borderRadius: 10, elevation: 2 }}>
        <View style={{ width: width * 0.15, height: width * 0.15, backgroundColor: '#D3D3D3', borderRadius: 10, marginRight: width * 0.03 }} />
        <View style={{ flex: 1 }}>
          <Text style={{ fontWeight: 'bold', fontSize: width * 0.045 }}>
            {menu ? menu.menuName : '메뉴없음'} </Text>
          <Text style={{ color: '#777', fontSize: width * 0.035 }}>
            {menu ? `${menu.price}원` : '가격정보 없음'} </Text>
          <Text style={{ color: '#777', fontSize: width * 0.035 }}>
            Supporting line text lorem ipsum...</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {[1, 2, 3, 4, 5].map((_, index) => (
            <Icon key={index} name="star" size={width * 0.04} color="gold" />
          ))}
        </View>
        <Icon name="heart-o" size={width * 0.06} color="#777" style={{ marginLeft: width * 0.02 }} />
      </View>
    </TouchableOpacity>

  );
};
export default ListItem;
