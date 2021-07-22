import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";


const style = StyleSheet.create({
    container: {
        padding: 10,
        //revoce eccessive space to top not sure is better solutions
        marginBottom:12
        
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