import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import axios from 'axios';
import { API_URL } from "@env";

const { width, height } = Dimensions.get('window');

interface CategoryTabsProps{
   selectedCategory: string;
   setSelectedCategory: (category: string ) => void; 
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({selectedCategory,setSelectedCategory }) => {
    const [categories, setCategories] = useState<string[]>([]);
    const [menus, setMenus] = useState<{menuId: number; menuName: string; price: number }[]>([]);

    //백엔드에서 카테고리 정보(목록) 가져옴
    useEffect(()=>{
        axios.get(`${API_URL}/menu/categories`)
        .then(response => {
            setCategories(response.data);
            if(Array.isArray(response.data) && response.data.length > 0){
                setCategories(response.data); 
                setSelectedCategory(response.data[0]); 
                console.log(`✅ 첫 번째 카테고리 설정됨: ${response.data[0]}`);
                setTimeout(() => {
                    setSelectedCategory(response.data[0]); // ✅ 비동기 상태 업데이트 반영
                }, 100);
            }else{
                console.warn("카테고리 정보가 올바르지 않습니다:", response.data); 
            }
        })
        .catch(error => {
            console.error('/components/CategoryTabs 카테고리 정보 오류:', error);
        });
    }, []);

    // 백엔드에서 해당 카테고리의 메뉴 가져옴
    useEffect(() => {
        if (!selectedCategory || typeof selectedCategory !== "string") {
            console.warn("selectedCategory가 올바르지 않습니다:", selectedCategory);
            return;
        }
        console.log(`📡 Fetching menu for category: ${selectedCategory}`);

        // if ( selectedCategory){
            axios.get(`${API_URL}/menu/${encodeURIComponent(selectedCategory)}`) //encodeURIComponent(selectedCategory): 한글 인코딩 문제 방지
                .then(response => {
                    setMenus(response.data);
                })
                .catch(error => {
                    console.error('/components/CategoryTabs 카테고리 메뉴 오류:', error);
                });
            // }
    }, [selectedCategory]);


    return (
        <View>
            {/*카테고리 탭*/}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingVertical: width * 0.02, paddingLeft: width * 0.02 }}>
                {categories.map((category, index) => (
                    <TouchableRipple
                        key={index}
                        onPress={() => setSelectedCategory(category)}
                        rippleColor="rgba(0, 0, 0, 0.2)"
                        style={{
                            backgroundColor: selectedCategory === category ? '#6200EE' : '#E0E0E0', padding: width * 0.025, borderRadius: 10, marginRight: width * 0.02,
                        }}>
                        <Text style={{ color: selectedCategory === category ? '#FFF' : '#000', fontWeight: 'bold', fontSize: width * 0.04 }}>
                            {category}
                        </Text>
                    </TouchableRipple >
                ))}
            </ScrollView >
            {/*선택된 카테고리 제품 목록*/}
            <View style={{ padding: width * 0.03 }}>
                {menus.length > 0 ? (
                    menus.map(menu => (
                        <Text key={menu.menuId} style={{ fontSize: width * 0.04, marginVertical: width * 0.01 }}>
                            {menu.menuName} 
                            {menu.price}원
                        </Text>
                    ))
                ) : (
                    <Text style={{ fontSize: width * 0.04, color: '#777', marginVertical: width * 0.01 }}>
                        이 카테고리에는 제품이 없습니다.</Text>
                )}
            </View>
        </View >
    );
};

export default CategoryTabs;
