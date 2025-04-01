import { API_URL } from '@env';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Dimensions, TouchableOpacity, Modal } from 'react-native';
import ScheduleItem from '../components/CalenderItem';
import { Calendar } from 'react-native-big-calendar';
import dayjs from 'dayjs';
import GlobalStyles from '../styles/GlobalStyles';
import categoryColors from '../styles/categoryColors';

const { width, height } = Dimensions.get('window');


const CalenderScreen = () => {
  const today = new Date();
  const [events, setEvents] = useState([]);
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [monthPickerVisible, setMonthPickerVisible] = useState(false);


  //백엔드에서 받아온 일정 데이터를 날짜별로 그룹화해서 캘린더에 표시
  useEffect(() => {
    axios.get(`${API_URL}/calendar/menus`)
      .then(res => {
        const rawData = res.data;
        const mappedEvents = rawData.map(item => {
          const date = dayjs(item.regDate).format('YYYY-MM-DD');
          return {
            title: item.menuName,
            start: new Date(`${date}T10:00:00`),
            end: new Date(`${date}T11:00:00`),
            category: item.category,
            color: categoryColors[item.category] || '#9E9E9E'

          }
        });
        setEvents(mappedEvents);
      })
      .catch(error => {
        console.error('캘린더 데이터 가져오기 실패:', error);
      });
  }, []);


  const selectYear = (y) => {
    setYear(y);
  };
  const selectMonth = (m) => {
    setMonth(m - 1); // JavaScript month: 0-11
    setMonthPickerVisible(false);
  };

  return (
    <View style={GlobalStyles.container}>
      <View style={GlobalStyles.header}>
        <TouchableOpacity onPress={() => setMonthPickerVisible(true)}>
          <Text style={GlobalStyles.title}>{year}년 {month + 1}월</Text>
        </TouchableOpacity>
      </View>
      <Calendar
        events={events}
        height={height * 0.8}
        mode="month"
        weekStartsOn={0}
        date={new Date(year, month, dayjs().date())}
        eventCellStyle={(event) => ({
          backgroundColor: event.color,
          padding: 2,
          borderRadius: 4,
          height: 30,
        })}
        // @ts-ignore : 라이브러리에 타입 정의 누락되어 있어서 무시함
        eventRenderer={(event, touchableOpacityProps) => (
          <TouchableOpacity {...touchableOpacityProps}>
            <Text numberOfLines={1} ellipsizeMode="tail" style={{ color: 'white', fontSize: 11 }}>
              {event.title}
            </Text>
          </TouchableOpacity>
        )}
      />
      <Modal visible={monthPickerVisible} transparent animationType="fade">
        <View style={GlobalStyles.modalContainer}>
          <View style={GlobalStyles.pickerBox}>
            <FlatList
              data={Array.from({ length: 10 }, (_, i) => 2020 + i)}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => selectYear(item)}>
                  <Text style={GlobalStyles.modalItem}>{item}년</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => `y-${item}`}
            />
            <FlatList
              data={Array.from({ length: 12 }, (_, i) => i + 1)}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => selectMonth(item)}>
                  <Text style={GlobalStyles.modalItem}>{item}월</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => `m-${item}`}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CalenderScreen;


