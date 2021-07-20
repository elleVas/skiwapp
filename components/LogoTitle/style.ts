import { StyleSheet } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.light.tint,
        flexDirection: 'row',
        width: 80,
        justifyContent: 'space-between',
        marginRight: 10,
    },
    avatarSmall: {
        width: 30,
        height: 30,
        borderRadius: 50,
       
    },
    username:{
        fontWeight: "bold",
        fontSize: 16,
        color:'white',
        marginTop: 5,
      
        
    }
});

export default styles;

