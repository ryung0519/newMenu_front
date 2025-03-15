import React, {useState} from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import {TouchableRipple } from 'react-native-paper'

const { width, height } = Dimensions.get('window');
const categories = [
    { name: '카페', screen: 'Cafe' },
    { name: '편의점', screen: 'Store' }
];

const CategoryTabs = () => {
    const [selected, setSelected] = useState(0);

    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingVertical: width * 0.02, paddingLeft: width*0.02 }}>
            {categories.map((category, index) => (
                <TouchableRipple
                    key={index}
                    onPress={() => setSelected(index)}
                    rippleColor="rgba(0, 0, 0, 0.2)"
                    style={{
                        backgroundColor: selected === index ? '#6200EE' : '#E0E0E0', padding: width * 0.025, borderRadius: 10,marginRight: width * 0.02, }}>
                        <Text style={{color: selected ===index ? '#FFF' : '#000', fontWeight: 'bold',fontSize: width * 0.04 }}>
                            {category.name}
                        </Text>
                </TouchableRipple>
            ))}
        </ScrollView>
    );
};

export default CategoryTabs;
