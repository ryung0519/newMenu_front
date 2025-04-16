import React from 'react';
import {
  View,
  Modal,
  Text,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import GlobalStyles from '../../styles/GlobalStyles';
import {useNavigation} from '@react-navigation/native';
import type {RootStackParamList} from '../../navigation/MainStack';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

{
  /* 캘린더 제품 클릭 모델 */
}

const CalendarItemModel = ({
  visible,
  onClose,
  menu,
}: {
  visible: boolean;
  onClose: () => void;
  menu: {
    menuId: number;
    menuName: string;
    imageUrl?: string;
    price: number;
    brand: string;
    description: string;
    rating: number;
  } | null;
}) => {
  console.log('넘어온 menu:', menu);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'Product'>>();

  if (!visible || !menu) return null;

  return (
    <Modal visible={visible} transparent>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={GlobalStyles.modalOverlay} pointerEvents="box-none">
          {/* <View style={{flex: 1}} /> */}
          <TouchableWithoutFeedback onPress={() => {}}>
            {/* <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={GlobalStyles.modalContent}> */}
            <View style={GlobalStyles.modalContent} pointerEvents="box-none">
              <Text style={GlobalStyles.modalTitle}>
                메뉴 이름 : {menu.menuName}
              </Text>
              <Image
                source={{uri: menu.imageUrl}}
                style={GlobalStyles.imageBox}
              />
              <Text style={GlobalStyles.modalText}>브랜드 : {menu.brand} </Text>
              <Text style={GlobalStyles.modalText}>가격 : {menu.price}</Text>
              <Text style={GlobalStyles.titleText}>
                설명 : {menu.description}
              </Text>
              <TouchableOpacity
                style={GlobalStyles.button_light}
                onPress={() => {
                  console.log('상세보기 클릭됨', menu.menuId);
                  onClose();
                  navigation.navigate('Product', {menuId: menu.menuId});
                }}>
                <Text style={GlobalStyles.buttonText_dark}>상세보기</Text>
              </TouchableOpacity>
              {/* </KeyboardAvoidingView> */}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default CalendarItemModel;
