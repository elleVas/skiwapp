
import React, { useState } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import styles from "./styles";

import { MaterialCommunityIcons, FontAwesome5, Entypo, Fontisto } from "@expo/vector-icons";
import { TouchableOpacityComponent } from "react-native";


const InputBox = () => {
    const [message, setMessage] = useState('');
    const onMicrophomePress = () => {
        //open microphone for message and record
        //after send vocal to backend
        console.warn('Microphone');
    }
    const onSendPress = () => {
        console.warn(`Sending: ${message}`);
        //send message to backend
        setMessage('');
    }
    const onPress = () => {
        if (!message) {
            onMicrophomePress();
        } else {
            onSendPress();
        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.mainContainer}>
                <FontAwesome5 name="laugh-beam" size={24} color="grey" />
                <TextInput
                    placeholder={'Type a message'}
                    style={styles.textInput}
                    multiline
                    numberOfLines={6}
                    value={message}
                    //save the state of message in set state for backend
                    onChangeText={setMessage} />
                <Entypo name="attachment" size={24} color="grey" style={styles.icons} />
                {!message && <Fontisto name="camera" size={24} color="grey" style={styles.icons} />}
            </View>
            <TouchableOpacity onPress={onPress}>
                <View style={styles.buttonContainer}>
                    {!message
                        ? <MaterialCommunityIcons name="microphone" size={28} color="white" />
                        : <MaterialCommunityIcons name="send" size={28} color="white" />}
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default InputBox;