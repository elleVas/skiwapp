import moment from "moment";
import React from "react";
import { View, Text, Image } from "react-native";
import { Message } from '../../types';
import styles from "../ChatMessage/styles";

export type ChatMessageProps = {
    message: Message;
}

const ChatMessage = (props: ChatMessageProps) => {
    const { message } = props;
    const isMyMessage = () => {
        return message.user.id === 'u1';
    }

    return (
        <View style={styles.container}>
            <View style={[styles.messageBox, {
                backgroundColor: isMyMessage() ? '#DCF8C5' : '#fff',
                marginLeft: isMyMessage() ? 50 : 0, 
                marginRight: isMyMessage() ? 0 : 50, 
            }

            ]}>  
                {/*if is not my message not display my name*/}
                {!isMyMessage() && <Text style={styles.name}>{message.user.name}</Text>}
                <Text style={styles.message}>{message.content}</Text>
                <Text style={styles.time}>{moment(message.createdAt).fromNow()}</Text>
            </View>
        </View>

    );
}

export default ChatMessage;