import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import GlobalStyles from "../styles/GlobalStyles"
import categoryColors from "../styles/categoryColors";

// 캘린더 페이지에서 쓰일 제품들의 카테고리데 따른 색상과 이름을 표시하는 컴포넌트
const CalendarItem = ({ item, style, ...touchableOpacityProps }) => {
    const category = categoryColors[item.category] || categoryColors['기본'];
  
    return (
      <TouchableOpacity
        {...touchableOpacityProps}
        style={[{
          backgroundColor: category.backgroundColor,
          paddingHorizontal: 4,
          paddingVertical: 2,
          borderRadius: 4,
          margin: 1,
          flex: 1,
        },
        style, // 외부 스타일도 반영
    ]}
      >
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{
            color: category.textColor,
            fontSize: 11,
            fontWeight: 'bold',
          }}
        >
          {item.title}
        </Text>
      </TouchableOpacity>
    );
};

export default CalendarItem;