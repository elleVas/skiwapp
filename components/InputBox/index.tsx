
import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Button, Modal } from "react-native";
import styles from "./styles";
import { MaterialCommunityIcons, FontAwesome5, Entypo, Fontisto } from "@expo/vector-icons";
import { API, graphqlOperation } from "@aws-amplify/api";
import { Auth } from '@aws-amplify/auth';
import { createMessage, updateChatRoom } from "../../src/graphql/mutations";
import { useEffect } from "react";
import EmojiSelector from 'react-native-emoji-selector';



const InputBox = (props: { chatRoomID: string; }) => {
    const { chatRoomID } = props;
    const [message, setMessage] = useState('');
    const [myUserId, setMyUserId] = useState(null);
    let emoji = '';

    const [showEmoji, setShowEmoji] = useState(false);

    //useEffect emoji
    useEffect(() => {
    });


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
    const onPressEmoji = () => {
        if (showEmoji == false) {
            setShowEmoji(true);
        } else {
            setShowEmoji(false);
        }


    }
    //set emojii in chat input
    const setEmoji = (value: any, message: string) => {
        emoji = emoji + value;
        setMessage(message + emoji);
    }

    //update chat room with last message
    const updateChatRoomLastMessage = async (messageID: string) => {
        try {
            await API.graphql(
                graphqlOperation
                    (updateChatRoom, {
                        input: {
                            id: chatRoomID,
                            lastMessageId: messageID,
                        }
                    }
                    )
            );
        } catch (error) {
            console.log(error);
        }
    }

    //onpress send button message
    const onSendPress = async () => {
        // console.warn(`Sending: ${message}`);
        //send message to backend
        try {
            const newMessageData = await API.graphql(
                graphqlOperation(
                    createMessage, {
                    input: {
                        content: message,
                        userID: myUserId,
                        chatRoomID: chatRoomID,
                        read: false
                    }
                }
                )
            )

            await updateChatRoomLastMessage(newMessageData.data.createMessage.id);
        } catch (error) {
            console.log(error);
        }
        setMessage('');
    }


    const onPress = () => {
        if (!message) {
            onMicrophomePress();
        } else {
            //if showEmoji is open close emoji view
            if (showEmoji == true) {
                console.log("SEI QUI");
                setShowEmoji(false);
            }
            onSendPress();
        }
    }
    return (

        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={100}
            style={{ width: '100%' }}
        >

            {showEmoji ? <View style={styles.emojiContainer}>
                <EmojiSelector showSearchBar={false} onEmojiSelected={emoji => setEmoji(emoji, message)} />
            </View> : null}

            <View style={styles.container}>
                <View style={styles.mainContainer}>
                    <FontAwesome5 name="laugh-beam" size={24} color="grey" onPress={onPressEmoji} />
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
        </KeyboardAvoidingView>
    )
}

export default InputBox;

function renderIf(status: any) {
    throw new Error("Function not implemented.");
}
