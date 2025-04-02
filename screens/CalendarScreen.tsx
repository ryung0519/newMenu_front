import { API_URL } from '@env';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-big-calendar';
import dayjs from 'dayjs';
import GlobalStyles from '../styles/GlobalStyles';
import categoryColors from '../styles/categoryColors';
import CalendarMonthSelect from '../components/CalendarMonthSelect';
import CalendarDayModal from '../components/CalendarDayModal';
import CalendarItemModel from '../components/CalendarItemModel';
import CalendarItem from '../components/CalendarItem';

const { width, height } = Dimensions.get('window');


const CalendarScreen = () => {
  const today = new Date();
  const [events, setEvents] = useState([]);
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [monthPickerVisible, setMonthPickerVisible] = useState(false);
  const [selectedDate, setSeletedDate] = useState(null);
  const [selectedEvent, setSeletedEvent] = useState(null);

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
            // color: categoryColors[item.category] || '#9E9E9E',
            description: item.description,
            price: item.price,
            brand: item.brand,
          }
        });
        setEvents(mappedEvents);
      })
      .catch(error => {
        console.error('캘린더 데이터 가져오기 실패:', error);
      });
  }, []);


  const filteredEvents = selectedDate
    ? events.filter(e => dayjs(e.start).isSame(selectedDate, 'day'))
    : [];

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
        onPressCell={(date) => {
          setSeletedDate(date);
          setSeletedEvent(null);
        }}
        onPressEvent={(event) => {
          setSeletedEvent(event);
          setSeletedDate(null);
        }}
        // @ts-ignore : 라이브러리에 타입 정의 누락되어 있어서 무시함
        eventRenderer={(event, touchableOpacityProps) => (
          <CalendarItem item={event} {...touchableOpacityProps} />
        )}
      />
      <CalendarMonthSelect
        visible={monthPickerVisible}
        selectedYear={year}
        selectedMonth={month + 1}
        selectYear={(y) => {
          setYear(y);
          setMonthPickerVisible(false);
        }}
        selectMonth={(m) => {
          setMonth(m - 1);
          setMonthPickerVisible(false);
        }} onClose={undefined} />
      <CalendarDayModal
        visible={!!selectedDate}
        date={selectedDate}
        event={filteredEvents}
        onClose={() => setSeletedDate(null)} />
      <CalendarItemModel
        visible={!!selectedEvent}
        item={selectedEvent}
        // event={selectedEvent}
        onClose={() => setSeletedEvent(null)} />
    </View>
  );
};

export default CalendarScreen;


