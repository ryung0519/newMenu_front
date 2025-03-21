import React, { useEffect, useState } from "react";
import { View, Dimensions } from "react-native";
import { Text } from "react-native-paper";
import { API_URL } from '@env';

const { width,height } = Dimensions.get("window");

const CalenderScreen = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`${API_URL}/api/test`)// Spring Boot API 주소
        .then(res => res.json())
        .then(json => setData(json.message)) // 응답 데이터에서 필요한 값 추출
        .catch(err => setError(err.message));

    },[]); //의존성 배열 []을 빈 배열로 설정하면 최초 1회만 실행됨

    return(
        <View style={{ padding: 20, paddingTop: height*0.3}}>
            <Text style = {{fontSize: 20, fontWeight: 'bold'}}>캘린더 화면</Text>
            {data ? (
                <Text>서버 응답 : {JSON.stringify(data)}</Text>):(
                <Text> 데이터 불러오는 중.......</Text>)}
                {/* {error && <Text style={{ color: 'red' }}>비상!!!! 오류발생!! : {error}</Text>} */}
        </View>
    );
};
export default CalenderScreen;