import { API_URL } from '@env';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import { Calendar, isToday } from 'react-native-big-calendar';
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
  const [currentDate, setCurrentDate] = useState(today);
  // const [year, setYear] = useState(today.getFullYear());
  // const [month, setMonth] = useState(today.getMonth());
  const [monthPickerVisible, setMonthPickerVisible] = useState(false);
  const [selectedDate, setSeletedDate] = useState(null);
  const [selectedEvent, setSeletedEvent] = useState(null);
 
  ///// 캘린더에 표시되는 년과 월이 바뀌는 부분(currentDate 상태를 기준으로 year와 month를 계산하는 부분)
  const year = dayjs(currentDate).year();
  const month = dayjs(currentDate).month();

  //백엔드에서 받아온 일정 데이터를 날짜별로 그룹화해서 캘린더에 표시 (API호출)
  useEffect(() => {
    axios.get(`${API_URL}/calendar/menus`)
      .then(res => {
        const rawData = res.data;
        const mappedEvents = rawData.map(item => {
          const date = dayjs(item.regDate).format('YYYY-MM-DD');
          const category = item.category;
          const color = categoryColors[category] ?.backgroundColor || '#9E9E9E';
        
          return {
            title: item.menuName,
            start: new Date(`${date}T10:00:00`),
            end: new Date(`${date}T11:00:00`),
            category: item.category,
            color,
            description: item.description,
            price: item.price,
            brand: item.brand,
          };
        });
        setEvents(mappedEvents);
      })
      .catch(error => {
        console.error('캘린더 데이터 가져오기 실패:', error);
      });
  }, []);

  // 날짜 필터링(선택한 날짜 이벤트만 표시)
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
      {/* 캘린더 UI /////*/}
      <Calendar
        events={events}
        height={height * 0.8}
        mode="month"
        weekStartsOn={0}
        date = {currentDate}
        onChangeDate={(date) => {
          if(Array.isArray(date) && date.length >0) {
            const newDate = new Date(date[0]);
              if(!dayjs(currentDate).isSame(newDate, 'month')) {
                setCurrentDate(newDate);
              }
          }
        }}
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
        dateContentStyle ={(date) => {
          const isToday = dayjs(date).isSame(dayjs(), 'day');
          const isSunday = dayjs(date).day() === 0;
          // const isHoliday = isToday || isCustomHoliday(date); //휴일 설정 시 사용 -> 아래에 이 코드도 추가 {/*: isHoliday ? 'red'*/}

          return {
            color: isToday ? 'purple' : isSunday ? 'red' : 'black',
          };
        }}
      />
      {/* 연/월 선택 */}
      {/* selectYear={(y), selectMonth={(m): CalendarScreen에서 currentDate 설정 */}
      <CalendarMonthSelect
        visible={monthPickerVisible}
        selectedYear={year}
        selectedMonth={month + 1}
        selectYear={(y) => {
          const newDate = dayjs(currentDate).year(y).toDate();
          setCurrentDate(newDate);
          setMonthPickerVisible(false);
        }}
        selectMonth={(m) => {
          const newDate = dayjs(currentDate).month(m - 1).toDate();
          setCurrentDate(newDate);
          setMonthPickerVisible(false);
        }} onClose={() => setMonthPickerVisible(false)} />
        {/* 날짜 클릭 시 상세일정 */}
      <CalendarDayModal
        visible={!!selectedDate}
        date={selectedDate}
        event={filteredEvents}
        onClose={() => setSeletedDate(null)} />
        {/* 이벤트(신메뉴 출시) 클릭 시 상세일정 */}
      <CalendarItemModel
        visible={!!selectedEvent}
        item={selectedEvent}
        onClose={() => setSeletedEvent(null)} />
    </View>
  );
};

export default CalendarScreen;


