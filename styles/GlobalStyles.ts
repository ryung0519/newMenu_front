import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get('window');

const GlobalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5EFFF',
        paddingTop: height * 0.05
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
        width: "100%",
        height: "100%",
        borderRadius: width * 0.02,
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
        fontSize: width * 0.05,
        marginLeft: width * 0.02,
        color: "#777",
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        borderRadius: width * 0.025,
        padding: width * 0.035,
        marginHorizontal: width * 0.04,
        marginVertical: height * 0.003,
        alignItems: 'center',
        elevation: 2,
    },
    imageBox: {
        width: width * 0.18,
        height: width * 0.18,
        borderRadius: width * 0.02,
        backgroundColor: "#D3D3D3",
        marginRight: width * 0.04,
    },
    infoBox: {
        flex: 1,
        justifyContent: "center",
    },
    name: {
        fontSize: width * 0.04,
        fontWeight: 'bold',
        marginBottom: height * 0.003,
    },
    price: {
        fontSize: width * 0.04,
        color: "#555",
    },
    rating: {
        flexDirection: "row",
    },
    heartIcon: {
        marginLeft: 8,
    },
    description: {
        fontSize: width * 0.035,
        color: "#777",
        marginBottom: height * 0.005,
    },
    scheduleItem: {
        padding: height * 0.35,
        marginVertical: 4,
        borderRadius: 6,
    },

    scheduleText: {
        fontSize: width * 0.2,
        color: '#000',
    },
    CalenderListSheetContainer: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        flex: 1,
      },
      CalenderListSheetText: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 10,
      },
      header: {
        padding: 16,
        alignItems: 'center',
        backgroundColor: '#fff',
      },
      headerText: {
        fontSize: 20,
        fontWeight: 'bold',
      },
      modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
      },
      pickerBox: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        flexDirection: 'row',
      },
      modalItem: {
        padding: 10,
        fontSize: 18,
      },

});

export default GlobalStyles;
