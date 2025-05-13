import {API_URL} from '@env';
import React, {useEffect, useState} from 'react';
import {View, Text, Dimensions, TouchableOpacity} from 'react-native';
import {Calendar} from 'react-native-calendars';
import dayjs from 'dayjs';
import GlobalStyles from '../styles/GlobalStyles';
import categoryColors from '../styles/categoryColors';
import CalendarMonthSelect from '../components/calendar/CalendarMonthSelect';
import CalendarDayModal from '../components/calendar/CalendarDayModal';
import CalendarItemModel from '../components/calendar/CalendarItemModel';
import CalendarItem from '../components/calendar/CalendarItem';

const {width, height} = Dimensions.get('window');

interface EventType {
  menuId: number;
  menuName: string;
  title: string;
  start: Date;
  end: Date;
  category: string;
  color: string;
  description: string;
  price: number;
  brand: string;
  imageUrl: string;
  rating: number;
}

const CalendarScreen = () => {
  const today = new Date();

  const [events, setEvents] = useState<EventType[]>([]);
  const [currentDate, setCurrentDate] = useState(today);
  const [currentYear, setCurrentYear] = useState(dayjs(today).year());
  const [currentMonth, setCurrentMonth] = useState(dayjs(today).month());
  const [isMonthPickerVisible, setIsMonthPickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);

  const updateCurrentDate = (newDate: Date) => {
    setCurrentDate(newDate);
    setCurrentYear(dayjs(newDate).year());
    setCurrentMonth(dayjs(newDate).month());
  };
  useEffect(() => {
    console.log('📅 currentDate changed:', currentDate);
  }, []);
  useEffect(() => {
    const fetchEvents = async () => {
      console.log('Fetching events from API:', API_URL);
      try {
        const response = await fetch(`${API_URL}/calendar/menus`);
        const data = await response.json();
        // console.log('Received response:', data);
        const mappedEvents = data.map(menu => ({
          menuId: menu.menuId,
          menuName: menu.menuName,
          title: menu.menuName,
          start: new Date(
            `${dayjs(menu.regDate).format('YYYY-MM-DD')}T10:00:00`,
          ),
          end: new Date(`${dayjs(menu.regDate).format('YYYY-MM-DD')}T11:00:00`),
          category: menu.category,
          color: categoryColors[menu.category]?.backgroundColor || '#9E9E9E',
          description: menu.description,
          price: menu.price,
          brand: menu.brand,
          imageUrl: menu.imageUrl,
          rating: menu.rating ?? 0,
        }));
        // console.log('Mapped events:', mappedEvents);
        setEvents(mappedEvents);
      } catch (error) {
        console.error('Failed to fetch calendar data:', error);
      }
    };

    fetchEvents();
  }, []);

  const filteredEvents = selectedDate
    ? events.filter(event => dayjs(event.start).isSame(selectedDate, 'day'))
    : [];

  // 📦 날짜별 이벤트를 YYYY-MM-DD 형식으로 그룹화한 객체 생성
  const eventMap = events.reduce((acc, event) => {
    const dateKey = dayjs(event.start).format('YYYY-MM-DD');
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(event);
    return acc;
  }, {});

  return (
    <View style={GlobalStyles.container}>
      {/* 📅 상단 연도/월 표시 헤더 */}
      {/* <View style={GlobalStyles.header}>
        <TouchableOpacity onPress={() => setIsMonthPickerVisible(true)}>
          <Text style={GlobalStyles.title}>
            {currentYear}년 {currentMonth + 1}월
          </Text>
        </TouchableOpacity>
      </View> */}
      {/*   ✅ react-native-bigcalendars로 구성한 캘린더  */}
      {/* <Calendar
        events={events}
        height={height * 0.8}
        mode="month"
        weekStartsOn={0}
        date={currentDate}
        // renderEvent={renderCustomEvent} // ✅ 캘린더 디자인 적용
        renderEvent={event => (
          <CalendarItem item={event} menu={event} style={undefined} />
        )}
        onChangeDate={([startDate]) => {
          if (startDate && !dayjs(startDate).isSame(currentDate, 'day')) {
            updateCurrentDate(startDate);
          }
        }}
        onPressCell={date => {
          setSelectedDate(date);
          setSelectedEvent(null);
        }}
        onPressEvent={(event: EventType) => {
          setSelectedDate(event.start);
          setSelectedEvent(null);
          // setSelectedDate(null);
        }}
        eventCellStyle={event => ({
          backgroundColor: event.color || '#9E9E9E',
          borderRadius: 6,
          padding: height * 0.0,
        })}
      /> */}

      {/* ✅ react-native-calendars로 구성한 캘린더 */}
      <Calendar
        // 📍 현재 선택된 날짜 설정 (초기 날짜 또는 월 변경 시 반영)
        current={dayjs(currentDate).format('YYYY-MM-DD')}
        // 📌 날짜 클릭 시 호출되는 함수 → 날짜 선택 상태 업데이트
        onDayPress={day => {
          const dateObj = new Date(day.dateString);
          setSelectedDate(dateObj);
          setSelectedEvent(null);
        }}
        // 🎨 캘린더 전체 테마 스타일 설정
        theme={{
          textDayFontSize: 16,
          textDayFontWeight: 'bold',
          textSectionTitleColor: '#333',
          todayTextColor: '#E91E63', // 오늘 날짜 강조 색상
          selectedDayBackgroundColor: '#5A2EFE', // 선택된 날짜 배경
          selectedDayTextColor: '#fff',
        }}
        // 🔧 날짜 셀(day)을 완전히 커스터마이징하는 함수
        dayComponent={({date, state}) => {
          const eventsForDate = eventMap[date.dateString] || [];
          const previewEvents = eventsForDate.slice(0, 3);
          const isToday = dayjs().format('YYYY-MM-DD') === date.dateString;

          // ✅ 배경색 조건 설정
          const getBackgroundColor = () => {
            if (isToday) return '#e89802'; // 오늘 날짜 배경
            return 'transparent'; // 일반 날짜 배경 없음
          };
          // ✅ 텍스트 색상 조건 설정
          const getTextColor = () => {
            if (isToday) return '#fff'; // 오늘 날짜 배경이 진하니까 글자는 흰색
            if (state === 'disabled') return '#ccc';
            return '#000';
          };
          return (
            <TouchableOpacity
              onPress={() => {
                const dateObj = new Date(date.dateString);
                setSelectedDate(dateObj);
                setSelectedEvent(null);
              }}
              style={{
                width: width / 7,
                height: height * 0.14,
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}>
              {/* 🔘 날짜 숫자 (배경 강조 포함) */}
              <View
                style={{
                  backgroundColor: getBackgroundColor(),
                  borderRadius: 999,
                  paddingHorizontal: 6,
                  paddingVertical: 3,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: getTextColor(),
                  }}>
                  {date.day}
                </Text>
              </View>

              {/* 이벤트 미리보기 */}
              {previewEvents.map((event, idx) => (
                <Text
                  key={idx}
                  numberOfLines={1}
                  style={{
                    backgroundColor: event.color,
                    color: '#fff',
                    fontSize: 13,
                    paddingHorizontal: 1.7,
                    borderRadius: 4,
                    marginTop: 1,
                    overflow: 'hidden',
                    width: width * 0.125,
                  }}>
                  {event.title}
                </Text>
              ))}

              {/* +N more */}
              {eventsForDate.length > 3 && (
                <Text style={{fontSize: 11, color: '#888'}}>
                  +{eventsForDate.length - 3} more
                </Text>
              )}
            </TouchableOpacity>
          );
        }}
      />
      <CalendarMonthSelect
        visible={isMonthPickerVisible}
        selectedYear={currentYear}
        selectedMonth={currentMonth + 1}
        selectYear={year => {
          const newDate = dayjs(currentDate).year(year).toDate();

          updateCurrentDate(newDate);

          setIsMonthPickerVisible(false);
        }}
        selectMonth={month => {
          const newDate = dayjs(currentDate)
            .month(month - 1)
            .toDate();
          updateCurrentDate(newDate);
          setIsMonthPickerVisible(false);
        }}
        onClose={() => setIsMonthPickerVisible(false)}
      />

      <CalendarDayModal
        visible={!!selectedDate}
        date={selectedDate}
        event={filteredEvents}
        onClose={() => setSelectedDate(null)}
        onItemSelect={menu => {
          setSelectedEvent(menu);
          setSelectedDate(null);
        }}
      />
      <CalendarItemModel
        visible={!!selectedEvent}
        menu={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />
    </View>
  );
};

export default CalendarScreen;
