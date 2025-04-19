// components/ReviewForm.tsx
import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import StarTapRating from './StarDragRating';
import {Image} from 'react-native';

interface Props {
  menuName: string;
  imageUrl: string;
  rating: number;
  setRating: (val: number) => void;
  content: string;
  setContent: (val: string) => void;
  taste: string;
  setTaste: (val: string) => void;
  amount: string;
  setAmount: (val: string) => void;
  wouldVisitAgain: string;
  setWouldVisitAgain: (val: string) => void;
  onSubmit: () => void;
}

const ReviewForm = ({
  menuName,
  imageUrl,
  rating,
  setRating,
  content,
  setContent,
  taste,
  setTaste,
  amount,
  setAmount,
  wouldVisitAgain,
  setWouldVisitAgain,
  onSubmit,
}: Props) => {
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
    <View>
      <Text style={styles.title}>📝 {menuName} 리뷰 작성</Text>
      <Image
        source={{uri: imageUrl}}
        style={{
          width: '100%',
          aspectRatio: 1.5, // ✅ 비율 유지 (가로:세로 = 3:2)
          borderRadius: 10,
          backgroundColor: '#eee',
          marginBottom: 20,
        }}
        resizeMode="contain" // ✅ 이미지가 잘리지 않고 내부에 맞게
      />
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

      <TouchableOpacity style={styles.button} onPress={onSubmit}>
        <Text style={styles.buttonText}>리뷰 등록</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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

export default ReviewForm;
