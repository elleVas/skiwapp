import React from "react";
import { View, Text, Image, TouchableWithoutFeedback } from "react-native";
import ChatRooms from "../../constants/data/ChatRooms";
import { User } from "../../types";
import styles from "./styles";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";

export type ContactListItemProps = {
    user: User;
}

const ContactListItem = (props: ContactListItemProps) => {
    const { user } = props;

    const navigation = useNavigation();



  
   // const dateCreate = new Date(Date.parse(chatRoom.lastMessage.createdAt));
    const onClick = () => {
        //navigate to chat room whit this user
     /*  navigation.navigate('ChatRoom', {
           id: chatRoom.id, 
           name:user.name,
           img: user.imageUri
        });*/
    }

    return (
        <TouchableWithoutFeedback onPress={onClick}>
              <View style={styles.container}>
            <View style={styles.leftContainer}>
                <Image source={{ uri: user.imageUri }} style={styles.avatar} />
               
                <View style={styles.midContainer}>
                    <Text style={styles.username}>{user.name}</Text>
                    <Text numberOfLines={2} style={styles.status}>{user.status}</Text>
                </View>

            </View>
           {/* <Text style={styles.time}>{dateCreate.toLocaleDateString()}</Text>*/}
        </View>
        </TouchableWithoutFeedback>
  
    )


};

export default ContactListItem;