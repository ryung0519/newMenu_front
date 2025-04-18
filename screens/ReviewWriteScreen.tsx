import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/MainStack';
import {API_URL} from '@env';
import {getStoredUserData} from '../services/auth';
import {SafeAreaView} from 'react-native-safe-area-context';
import StarTapRating from '../components/StarDragRating';

type ReviewWriteRouteProp = RouteProp<RootStackParamList, 'ReviewWrite'>;

const ReviewWriteScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<ReviewWriteRouteProp>();
  const {menuId, menuName} = route.params;

  const [rating, setRating] = useState(5);
  const [content, setContent] = useState('');
  const [taste, setTaste] = useState(''); // 선택지 1
  const [amount, setAmount] = useState(''); // 선택지 2
  const [wouldVisitAgain, setWouldVisitAgain] = useState(''); // 선택지 3

  const handleSubmit = async () => {
    const userData = await getStoredUserData();

    if (!userData) {
      Alert.alert('로그인이 필요합니다.');
      return;
    }

    console.log('📦 리뷰 등록 요청 데이터:', {
      menuId,
      menuName,
      userId: userData.userId,
      reviewContent: content,
      reviewRating: rating,
      taste,
      amount,
      wouldVisitAgain,
    });

    try {
      const response = await fetch(`${API_URL}/api/reviews`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          menuId,
          userId: userData.userId,
          reviewContent: content,
          reviewRating: rating,
          taste,
          amount,
          wouldVisitAgain,
        }),
      });

      if (response.ok) {
        Alert.alert('리뷰가 등록되었습니다!');
        navigation.goBack();
      } else {
        throw new Error('리뷰 등록 실패');
      }
    } catch (error) {
      console.error('❌ 리뷰 등록 오류:', error);
      Alert.alert('리뷰 등록 중 오류 발생');
    }
  };

  const renderChoiceGroup = (
    label: string,
    value: string,
    setValue: (val: string) => void,
  ) => (
    <View style={styles.choiceGroup}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.choiceRow}>
        {['별로', '보통', '좋음'].map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.choiceButton,
              value === option && styles.choiceSelected,
            ]}
            onPress={() => setValue(option)}>
            <Text style={styles.choiceText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>📝 {menuName} 리뷰 작성</Text>

      <StarTapRating rating={rating} setRating={setRating} />

      {renderChoiceGroup('맛은 어땠나요?', taste, setTaste)}
      {renderChoiceGroup('양은 만족스러웠나요?', amount, setAmount)}
      {renderChoiceGroup('재구매 의사', wouldVisitAgain, setWouldVisitAgain)}

      <Text style={styles.label}>리뷰 내용:</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={content}
        onChangeText={setContent}
        multiline
        numberOfLines={5}
        placeholder="리뷰를 작성해 주세요"
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>리뷰 등록</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 20, backgroundColor: '#fff'},
  title: {fontSize: 24, fontWeight: 'bold', marginBottom: 24},
  label: {fontSize: 16, marginTop: 12, marginBottom: 8},
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 8,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    marginTop: 24,
    backgroundColor: '#6C5CE7',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {color: '#fff', fontWeight: 'bold', fontSize: 16},
  choiceGroup: {marginTop: 12},
  choiceRow: {flexDirection: 'row', gap: 8},
  choiceButton: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  choiceSelected: {
    backgroundColor: '#6C5CE7',
    borderColor: '#6C5CE7',
  },
  choiceText: {
    color: '#000',
    fontWeight: 'bold',
  },
});

export default ReviewWriteScreen;
