
import React, { useState } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import styles from "./styles";

import { MaterialCommunityIcons, FontAwesome5, Entypo, Fontisto } from "@expo/vector-icons";
import { TouchableOpacityComponent } from "react-native";

import { API, graphqlOperation } from "@aws-amplify/api";
import { Auth } from '@aws-amplify/auth';
import { createMessage } from "../../src/graphql/mutations";
import { useEffect } from "react";

const InputBox = (props) => {
    const { chatRoomID } = props;
    const [message, setMessage] = useState('');
    const [myUserId, setMyUserId] = useState(null);


    useEffect(() => {
        const fetchUser = async () => {
            const userInfo = await Auth.currentAuthenticatedUser();
            setMyUserId(userInfo.attributes.sub)
        }
        fetchUser();
    }, [])



    const onMicrophomePress = () => {
        //open microphone for message and record
        //after send vocal to backend
        console.warn('Microphone');
    }
    const onSendPress = async () => {
        console.warn(`Sending: ${message}`);
        //send message to backend
        try {
            await API.graphql(
                graphqlOperation(
                    createMessage, {
                    input: {
                        content: message,
                        userID: myUserId,
                        chatRoomID: chatRoomID
                    }
                }
                )
            )
        } catch (error) {
            console.log(error);
        }
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