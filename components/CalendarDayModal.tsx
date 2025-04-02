import React, { useEffect } from "react"
import { View, Modal, Text, TouchableOpacity, BackHandler, TouchableWithoutFeedback } from "react-native"
import GlobalStyles from "../styles/GlobalStyles"
import dayjs from "dayjs"
import { FlatList } from "react-native-gesture-handler"
import { useNavigation } from "@react-navigation/native"
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/MainStack'; 

{/* 날짜 칸 클릭 모델 */ }
const CalendarDayModal = ({ visible, date, event, onClose }) => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            () => {
                if (visible) {
                    onClose();
                    return true;
                }
                return false;
            }
        );
        return () => backHandler.remove();
    }, [visible]);

    return (
        <Modal style={GlobalStyles.modalContainer} visible={visible} transparent animationType="slide">
            {/* 바깥 터치 감지 */}
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={GlobalStyles.modalOverlay}>
                    {/* 내부 터치 막음 */}
                    <TouchableWithoutFeedback onPress={() => { }}>
                        <View style={GlobalStyles.modalContent}>
                            <Text style={GlobalStyles.modalTitle}> {date && dayjs(date).format('YYYY-MM-DD')}</Text>
                            <FlatList
                                data={event}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item }) => (
                                    <TouchableOpacity onPress={() => navigation.navigate('Product',{item})}activeOpacity={0.8}>
                                    <View style={GlobalStyles.scheduleRow}>
                                        {/* 왼쪽브랜드 */}
                                        <View style={{ width: 80 }}>
                                            <Text style={[GlobalStyles.text, { color: '#888', fontSize: 12 }]}>
                                                {item.brand ?? '브랜드 없음'}   |
                                            </Text>
                                        </View>

                                        {/* 오른쪽: 메뉴명 + 가격 */}
                                        <View style={{ flex: 1 }}>
                                            <Text numberOfLines={1} style={[GlobalStyles.titleText, { fontSize: 15, fontWeight: 'bold' }]}>
                                                {item.title}
                                            </Text>
                                            <Text style={[GlobalStyles.text, { fontSize: 12, color: '#666' }]}>
                                                가격 : {item.price?.toLocaleString() ?? '가격 정보 없음'}
                                            </Text>
                                        </View>
                                    </View>
                                    </TouchableOpacity>
                                )}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}

export default CalendarDayModal;