import React, { useEffect, useRef } from "react";
import { Modal, View, Text, Pressable } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import GlobalStyles from "../styles/GlobalStyles";

{/* 월 선택을 위한 모달 */ }
const CalendarMonthSelect = ({ visible, onClose, selectYear, selectMonth, selectedYear, selectedMonth }) => {
  const yearListRef = useRef(null);
  const monthListRef = useRef(null);

  const allYear = Array.from({ length: 200 }, (_, i) => 1900 + i);
  const allMonth = Array.from({ length: 12 }, (_, i) => i + 1);

  useEffect(() => {
    setTimeout(() => {
      if (yearListRef.current && selectedYear) {
        const index = allYear.indexOf(selectedYear);
        if (index >= 0) {
          yearListRef.current.scrollToIndex({ index, animated: false });
        }
      }
      if (monthListRef.current && selectedMonth) {
        const index = allMonth.indexOf(selectedMonth);
        if (index >= 0) {
          monthListRef.current.scrollToIndex({ index, animated: false });
        }
      }
    }, 10);
  }, [visible]);
  return (
    <Modal visible={visible} transparent animationType="fade">
      <Pressable onPress={onClose} style={[GlobalStyles.modalContainer, { flex: 1 }]}>
        <Pressable onPress={() => {}} style={[GlobalStyles.pickerBox, { height: '60%' }]}>
          <FlatList
            ref={yearListRef}
            data={allYear}
            getItemLayout={(_, index) => ({
              length: 50,
              offset: 50 * index,
              index
            })}
            initialScrollIndex={allYear.indexOf(selectedYear)}
            showsVerticalScrollIndicator={false}
            renderItem={({ item: year }) => (
              <TouchableOpacity onPress={() => selectYear(year)}>
                <Text style={[
                  GlobalStyles.modalItem,
                  year === selectedYear && { color: '#4A0072', fontWeight: 'bold' },]}>
                  {year}년
                </Text>
              </TouchableOpacity>
            )}
            keyExtractor={(year) => `y-${year}`}
          />
          <FlatList
            data={allMonth}
            showsVerticalScrollIndicator={false}
            renderItem={({ item: month }) => (
              <TouchableOpacity onPress={() => {
                selectMonth(month);
                onClose();
              }}>
                <Text style={[
                  GlobalStyles.modalItem,
                  month === selectedMonth && { color: '#4A0072', fontWeight: 'bold' },]}>
                  {month}월
                </Text>
              </TouchableOpacity>
            )}
            keyExtractor={(month) => `m-${month}`}
          />
      </Pressable>
    </Pressable>
    </Modal >
  );
};

export default CalendarMonthSelect;
