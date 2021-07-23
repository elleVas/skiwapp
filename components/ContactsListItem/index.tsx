import React from "react";
import { View, Text, Image, TouchableWithoutFeedback } from "react-native";
import ChatRooms from "../../constants/data/ChatRooms";
import { User } from "../../types";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import { API, graphqlOperation } from "@aws-amplify/api";
import { Auth } from '@aws-amplify/auth';
import { createChatRoom, createChatRoomUser } from "../../src/graphql/mutations";

export type ContactListItemProps = {
    user: User;
}

const ContactListItem = (props: ContactListItemProps) => {
    const { user } = props;

    const navigation = useNavigation();

    const onClick = async () => {
        try {
            //create or navigate to the chat room if exist
            // 1 create new chat room
            const newChatRoomData = await API.graphql(
                graphqlOperation(
                    createChatRoom, {
                    input: {}
                }
                )
            )
            if (!newChatRoomData.data) {
                console.log("createChatRoom fail");
                return;
            }

            const newChatRoom = newChatRoomData.data.createChatRoom;
            //2 add user to chat room
            const newUserChatRoom = await API.graphql(
                graphqlOperation(
                    createChatRoomUser, {
                    input: {
                        userID: user.id,
                        chatRoomID: newChatRoom.id
                    }


                }
                )
            )
            const userInfo = await Auth.currentAuthenticatedUser();
            // 3. add authenticated user to the chat room
            const addAuthUserToChatRoom = await API.graphql(
                graphqlOperation(
                    createChatRoomUser, {
                    input: {
                        userID: userInfo.attributes.sub,
                        chatRoomID: newChatRoom.id
                    }


                }
                )
            )
            navigation.navigate('ChatRoom',{
                id: newChatRoom.id,
                name:"Hardcoded name"
            })
        } catch (error) {
            console.log(error);
        }

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