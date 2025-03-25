import React from "react"
import { Image, Text, View } from "react-native"
// import { Avatar } from "react-native-paper"
import GlobalStyles from "../styles/GlobalStyles"

const ProductInfo = () => {
    return (
        <View style={GlobalStyles.container}>
            {/* 상품 이미지  */}
            <View style={GlobalStyles.imageContainer}>
                <Image source={{ uri: 'https://via.placeholder.com/150' }} style={GlobalStyles.image} />
            </View>
            
            {/* 상품 정보 */}
            <View style={GlobalStyles.infoContainer}>
                <Text style={GlobalStyles.text}>상품명</Text>
                <Text style={GlobalStyles.text}>회사이름</Text>
                <Text style={GlobalStyles.text}>상품 설명(간단하게, 가격포함)</Text>
            </View>
        </View>
    )
}
export default ProductInfo;