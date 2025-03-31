import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';

const SearchResultScreen = () => {
  const route = useRoute();
  const { results } = route.params;

  return (
    <ScrollView style={{ padding: 16 }}>
      {Array.isArray(results) && results.length > 0 ? (
        results.map((menu, idx) => (
          <View
            key={menu.menuId || idx}
            style={{
              marginBottom: 15,
              backgroundColor: '#fff',
              padding: 12,
              borderRadius: 8,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 12,
              shadowColor: '#ccc',
              shadowOpacity: 0.3,
              shadowOffset: { width: 0, height: 1 },
            }}
          >
            {/* ✅ 썸네일 자리 (임시 박스) */}
            <View style={{ width: 70, height: 70, backgroundColor: '#e0e0e0', borderRadius: 6 }} />

            {/* ✅ 텍스트 정보 */}
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{menu.menuName}</Text>
              <Text style={{ color: '#333', marginTop: 4 }}>{menu.price.toLocaleString()}원</Text>
            </View>
          </View>
        ))
      ) : (
        <Text>검색 결과가 없습니다.</Text>
      )}
    </ScrollView>
  );
};

export default SearchResultScreen;
