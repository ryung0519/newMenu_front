// import React from 'react';
// import {Text, TouchableOpacity} from 'react-native';
// import GlobalStyles from '../../styles/GlobalStyles';
// import categoryColors from '../../styles/categoryColors';

// // 캘린더 페이지에서 쓰일 제품들의 카테고리데 따른 색상과 이름을 표시하는 컴포넌트
// const CalendarItem = ({item, menu, style, ...touchableOpacityProps}) => {
//   ////// 카테고리 색상 처리 (카테고리에 따른 색상 지정 로직)
//   const category = categoryColors[menu.category] || categoryColors['기본'];

//   return (
//     // 캘린더에 보일 박스 UI
//     <TouchableOpacity
//       {...touchableOpacityProps}
//       style={GlobalStyles.modalTitle}>
//       <Text
//         // 이벤트 텍스트 너무 길면 자름 (ellipsizeMode까지지)
//         numberOfLines={1}
//         ellipsizeMode="clip">
//         style={{overflow: 'hidden'}}
//         {item.menuName || item.title}
//       </Text>
//     </TouchableOpacity>
//   );
// };

// export default CalendarItem;

import React from 'react';
import {Dimensions, Text, TouchableOpacity} from 'react-native';
import GlobalStyles from '../../styles/GlobalStyles';
import categoryColors from '../../styles/categoryColors';

const {width, height} = Dimensions.get('window');

const CalendarItem = ({item, menu, style, ...touchableOpacityProps}) => {
  const category = categoryColors[menu.category] || categoryColors['기본'];

  return (
    <TouchableOpacity
      {...touchableOpacityProps}
      // 캘린더에 보일 박스 UI
      style={[
        {
          backgroundColor: menu.color,
          borderRadius: width * 0.017,
          paddingVertical: height * 0.004,
          paddingHorizontal: width * 0.007,
          // marginVertical: 0, // ✅ 간격 줄이기 (기존보다 더 작게)
          minHeight: 0,
          justifyContent: 'center',
        },
        style,
      ]}>
      <Text
        numberOfLines={1}
        ellipsizeMode="clip"
        style={{
          fontSize: 11.5,
          fontWeight: '500',
          color: '#fff',
        }}>
        {item.menuName || item.title}
      </Text>
    </TouchableOpacity>
  );
};

export default CalendarItem;
