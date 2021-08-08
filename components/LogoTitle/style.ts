import { StyleSheet } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.light.tint,
        flexDirection: 'row',
        width: 80,
        justifyContent: 'space-between',
       // marginRight: 30,
        alignContent: "center"
    },
    avatarSmall: {
        width: 40,
        height: 40,
        borderRadius: 50,
       
    },
    username:{
        fontWeight: "bold",
        fontSize: 18,
        color:'white',
        marginTop: 10,
        marginLeft: 5,
        flexDirection: 'row',
      
        
    }
});

export default styles;

