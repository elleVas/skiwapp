import React from "react";
import { View, Text, Image } from "react-native";
import ChatRooms from "../../constants/data/ChatRooms";
import { ChatRoom } from "../../types";
import styles from "./style";
import moment from "moment";

export type ChatListItemProps = {
    chatRoom: ChatRoom;
}

const ChatListItem = (props: ChatListItemProps) => {
    const { chatRoom } = props;
    const user = chatRoom.users[1];

    console.log(chatRoom.users[1]);
    const dateCreate = new Date(Date.parse(chatRoom.lastMessage.createdAt));
    return (
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                <Image source={{ uri: user.imageUri }} style={styles.avatar} />
               
                <View style={styles.midContainer}>
                    <Text style={styles.username}>{user.name}</Text>
                    <Text numberOfLines={2} style={styles.lastMessage}>{chatRoom.lastMessage.content}</Text>
                </View>

            </View>
            <Text style={styles.time}>
                {moment(chatRoom.lastMessage.createdAt).format("DD/MM/YYYY")}
                </Text>
           {/* <Text style={styles.time}>{dateCreate.toLocaleDateString()}</Text>*/}
        </View>
    )


};

export default ChatListItem;