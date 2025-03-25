import { StyleSheet } from "react-native";

const GlobalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5EFFF',
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    subtitle: {
        fontSize: 16,
        color: "#888",
    },
    text: {
        fontSize: 14,
        color: "#333",
    },
    textCenter: {
        textAlign: "center",
    },
    button_dark: {
        marginTop: 10,
        backgroundColor: "#FFC0CB",
        padding: 10,
        borderRadius: 5,
    },
    button_light: {
        marginTop: 10,
        backgroundColor: "#FFC0CB",
        padding: 10,
        borderRadius: 5,
    },
    imageContainer: {
        alignItems: 'center',
        marginVertical: 15,
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 10,
    },
    infoContainer: {
        alignItems: 'center',
    },
    reviewContainer: {
        padding: 20,
    },
    reviewText: {
        fontSize: 20,
        marginTop: 5,
    },
    sectionContainer: {
        padding: 20,
    },
    icon: {
        width: 24,
        height: 24,
    }
});

export default GlobalStyles;
