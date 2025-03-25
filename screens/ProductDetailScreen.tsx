import React from "react";
import { ScrollView, View } from "react-native";
import { Text } from "react-native-paper";
import GlobalStyles from "../styles/GlobalStyles";
import ProductInfo from "../components/ProductInfo";
import Review from "../components/Review";
import RelatedItems from "../components/RelatedItems";

const ProductDetailScreen = () => {
    return (
        <ScrollView style={GlobalStyles.container}>
            <ProductInfo/>
            <Review/>
            <RelatedItems/>
            <View>
                <Text> 상품 상세정보</Text>
            </View>
        </ScrollView>

    );

}
export default ProductDetailScreen;