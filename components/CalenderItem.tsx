import React from "react";
import { View, Text } from "react-native";
import GlobalStyles from "../styles/GlobalStyles"
import categoryColors from "../styles/categoryColors";

const ScheduleItem = ({item}) => {
    return (
    <View style={[GlobalStyles.scheduleItem, {backgroundColor: categoryColors[item.category] || '#E0E0E0' }]}>
        <Text style={GlobalStyles.scheduleText}>{item.name}</Text>
    </View>
    );
};

export default ScheduleItem;