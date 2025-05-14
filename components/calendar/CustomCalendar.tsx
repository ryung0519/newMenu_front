// ✅ 커스텀 캘린더 컴포넌트
import React from 'react';
import {Calendar} from 'react-native-calendars';
import {Dimensions, Text, TouchableOpacity, View} from 'react-native';
import dayjs from 'dayjs';

const {width, height} = Dimensions.get('window');

// ✅ 이벤트 객체 타입 정의
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

// ✅ 커스텀 캘린더 컴포넌트 props 타입 정의
interface CustomCalendarProps {
  events: EventType[];
  currentDate: Date;
  onDateChange: (newDate: Date) => void;
  onSelectDate: (date: Date) => void;
  onSelectEvent: (event: EventType | null) => void;
  openMonthPicker: () => void;
}

const CustomCalendar: React.FC<CustomCalendarProps> = ({
  events,
  currentDate,
  onDateChange,
  onSelectDate,
  onSelectEvent,
  openMonthPicker,
}) => {
  // ✅ 날짜별 이벤트를 YYYY-MM-DD 키로 그룹화
  const eventMap = events.reduce((acc, event) => {
    const dateKey = dayjs(event.start).format('YYYY-MM-DD');
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(event);
    return acc;
  }, {} as {[key: string]: EventType[]});

  // ✅ 전체 캘린더 높이 설정
  const calendarHeight = height * 0.7;

  // ✅ 현재 달의 시작 요일과 일 수로 행 수 계산 (달의 주 수 계산)
  const startOfMonth = dayjs(currentDate).startOf('month');
  const dayOfWeek = startOfMonth.day(); // // 시작 요일 (0: 일요일 ~ 6: 토요일)
  const daysInMonth = startOfMonth.daysInMonth(); // 해당 달의 총 날짜 수
  const totalCells = dayOfWeek + daysInMonth; // 빈 칸 포함한 셀 수
  const numberOfWeeks = Math.ceil(totalCells / 7); // 필요한 주 수 계산
  // ✅ 한 주의 날짜 셀 높이 계산 (전체 높이를 주 수로 나눔)
  const dayCellHeight = (calendarHeight - height * 0.06) / numberOfWeeks;

  return (
    <View
      style={{
        width: '100%',
        height: calendarHeight,
        backgroundColor: '#fdf5e5',
      }}>
      <Calendar
        style={{
          backgroundColor: '#fdf5e5', //캘린더 배경색(월+요일)
        }}
        // ✅ 현재 날짜 설정
        current={dayjs(currentDate).format('YYYY-MM-DD')}
        // ✅ 날짜 클릭 시 날짜 선택 상태 업데이트
        onDayPress={day => {
          const dateObj = new Date(day.dateString);
          onSelectDate(dateObj);
          onSelectEvent(null);
        }}
        // ✅ 상단 연도/월 표시 헤더
        onMonthChange={month => {
          const newDate = new Date(month.year, month.month - 1, 1);
          onDateChange(newDate);
        }}
        // ✅ 헤더 커스터마이징: 클릭 시 월 선택 모달 오픈
        renderHeader={date => (
          <TouchableOpacity onPress={openMonthPicker}>
            <Text
              style={{
                fontSize: height * 0.022,
                fontWeight: 'bold',
                color: '#333',
                textAlign: 'center',
                paddingVertical: height * 0.01,
              }}>
              {dayjs(date).format('YYYY년 MM월')}
            </Text>
          </TouchableOpacity>
        )}
        // // ✅ 캘린더 전반적인 테마 설정
        theme={{
          calendarBackground: '#fdf5e5', // 💡 핵심 포인트!
          textDayFontSize: height * 0.02,
          textDayFontWeight: 'bold',
          textSectionTitleColor: '#333',
          todayTextColor: '#E91E63',
          selectedDayBackgroundColor: '#5A2EFE',
          selectedDayTextColor: '#faebcd',
        }}
        // ✅ 날짜 셀 커스터마이징
        dayComponent={({date, state}) => {
          const eventsForDate = eventMap[date.dateString] || [];
          const previewEvents = eventsForDate.slice(0, 3);
          const isToday = dayjs().format('YYYY-MM-DD') === date.dateString;

          // ✅ 날짜 배경색 조건 (오늘 강조)
          const getBackgroundColor = () => {
            if (isToday) return '#e89802';
            return 'transparent';
          };
          // ✅ 날짜 텍스트 색상 조건
          const getTextColor = () => {
            if (isToday) return '#fff';
            if (state === 'disabled') return '#ccc';
            return '#000';
          };

          return (
            <TouchableOpacity
              onPress={() => {
                const dateObj = new Date(date.dateString);
                onSelectDate(dateObj);
                onSelectEvent(null);
              }}
              style={{
                width: width / 7, // 요일별 셀 너비
                height: dayCellHeight, // 계산된 셀 높이
                alignItems: 'center',
                justifyContent: 'flex-start',
                backgroundColor: '#fdf5e5', //날짜셀 배경색
              }}>
              {/* ✅ 날짜 텍스트 및 배경 */}
              <View
                style={{
                  backgroundColor: getBackgroundColor(),
                  borderRadius: 999,
                  paddingHorizontal: width * 0.015,
                  paddingVertical: height * 0.004,
                }}>
                <Text
                  style={{
                    fontSize: height * 0.02,
                    fontWeight: 'bold',
                    color: getTextColor(),
                  }}>
                  {date.day}
                </Text>
              </View>
              {/* ✅ 일정 미리보기 최대 3개 표시 */}
              {previewEvents.map((event, idx) => (
                <Text
                  key={idx}
                  numberOfLines={1}
                  style={{
                    backgroundColor: event.color,
                    color: '#fff',
                    fontSize: height * 0.016,
                    paddingHorizontal: width * 0.01,
                    borderRadius: 4,
                    marginTop: height * 0.001,
                    overflow: 'hidden',
                    width: width * 0.125,
                  }}>
                  {event.title}
                </Text>
              ))}
              {/* ✅ 일정이 많을 경우 +N more 표시 */}
              {eventsForDate.length > 3 && (
                <Text style={{fontSize: height * 0.014, color: '#888'}}>
                  +{eventsForDate.length - 3} more
                </Text>
              )}
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default CustomCalendar;
