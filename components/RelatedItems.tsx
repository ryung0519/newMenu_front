import React from "react"
import { Image, Text, View } from "react-native"
import GlobalStyles from "../styles/GlobalStyles"

const RelatedItems = () => {
    return (
        <View style={GlobalStyles.imageContainer}>
                <Image source={{ uri: 'https://via.placeholder.com/150' }} style={GlobalStyles.image} />
                <Text> 관련 상품</Text>
        </View>
    )
}

export default RelatedItems;