import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width, height } = Dimensions.get('window');

const ListItem = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity>
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: width * 0.02, backgroundColor: '#FFF', marginHorizontal: width * 0.03, marginVertical: width * 0.01, borderRadius: 10, elevation: 2 }}>
        <View style={{ width: width * 0.15, height: width * 0.15, backgroundColor: '#D3D3D3', borderRadius: 10, marginRight: width * 0.03 }} />
        <View style={{ flex: 1 }}>
          <Text style={{ fontWeight: 'bold', fontSize: width * 0.045 }}>List item</Text>
          <Text style={{ color: '#777', fontSize: width * 0.035 }}>Category • $$ • 1.2 miles away</Text>
          <Text style={{ color: '#777', fontSize: width * 0.035 }}>Supporting line text lorem ipsum...</Text>
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
