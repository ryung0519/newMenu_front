import React, {useState} from 'react';
import {
  Alert,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {getStoredUserData} from '../services/auth';
import {submitReview} from '../services/review';
import ReviewForm from '../components/review/ReviewForm';
import {RootStackParamList} from '../navigation/MainStack';
import * as ImagePicker from 'expo-image-picker';
import {analyzeReceiptOCR, extractDaisoReceiptInfo} from '../utils/ocr';

const uploadToCloudinary = async (fileUri: string) => {
  const data = new FormData();
  data.append('file', {
    uri: fileUri,
    type: 'image/jpeg',
    name: 'receipt.jpg',
  } as any);
  data.append('upload_preset', 'menu_image');

  const res = await fetch(
    'https://api.cloudinary.com/v1_1/dfb4meubq/image/upload',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: data,
    },
  );

  return await res.json();
};

type ReviewWriteRouteProp = RouteProp<RootStackParamList, 'ReviewWrite'>;

const ReviewWriteScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<ReviewWriteRouteProp>();
  const {menuId, menuName, imageUrl} = route.params;

  const [rating, setRating] = useState(5);
  const [content, setContent] = useState('');
  const [taste, setTaste] = useState('');
  const [amount, setAmount] = useState('');
  const [wouldVisitAgain, setWouldVisitAgain] = useState('');
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      const localUri = result.assets[0].uri;

      // OCR 수행
      const ocrTexts = await analyzeReceiptOCR(localUri);
      const info = extractDaisoReceiptInfo(ocrTexts);

      if (info) {
        console.log('✅ 매장:', info.storeName);
        console.log('🛒 상품 목록:', info.products);
      }

      // 이미지 업로드
      const cloudinaryRes = await uploadToCloudinary(localUri);
      const uploadedUrl = cloudinaryRes.secure_url;
      setImageUrls(prev => [...prev, uploadedUrl]);
    }
  };

  const handleSubmit = async () => {
    const userData = await getStoredUserData();
    if (!userData) {
      Alert.alert('로그인이 필요합니다.');
      return;
    }

    try {
      await submitReview({
        menuId,
        userId: userData.userId,
        reviewContent: content,
        reviewRating: rating,
        taste,
        amount,
        wouldVisitAgain,
        imageUrls,
      });

      Alert.alert('리뷰가 등록되었습니다!');
      navigation.goBack();
    } catch (error) {
      console.error('❌ 리뷰 등록 오류:', error);
      Alert.alert('리뷰 등록 중 오류 발생');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <ReviewForm
            menuName={menuName}
            imageUrl={imageUrl}
            rating={rating}
            setRating={setRating}
            content={content}
            setContent={setContent}
            taste={taste}
            setTaste={setTaste}
            amount={amount}
            setAmount={setAmount}
            wouldVisitAgain={wouldVisitAgain}
            setWouldVisitAgain={setWouldVisitAgain}
            imageUrls={imageUrls}
            setImageUrls={setImageUrls}
            onSubmit={handleSubmit}
            onPickImage={pickImage}
          />
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  scrollContent: {padding: 20, paddingBottom: 40},
});

export default ReviewWriteScreen;
