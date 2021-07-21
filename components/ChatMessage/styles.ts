import { StyleSheet } from "react-native";
import { color } from "react-native-reanimated";
import Colors from "../../constants/Colors";


const style = StyleSheet.create({
    container: {
        padding: 10,
      //  backgroundColor: '#e5e5e5',
        
    },
    messageBox: {
        borderRadius: 10,
        padding: 10,

    },
    name: {
        color: Colors.light.tint,
        fontWeight: 'bold',
        marginBottom: 5

    },
    message: {


    },
    time: {
        alignSelf: "flex-end",
        color: "grey"
    }

});

export default style