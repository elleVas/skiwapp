
import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
import styles from "./styles";
import { MaterialCommunityIcons, FontAwesome5, Entypo, Fontisto } from "@expo/vector-icons";
import { API, graphqlOperation } from "@aws-amplify/api";
import { Auth } from '@aws-amplify/auth';
import { createMessage, updateChatRoom } from "../../src/graphql/mutations";
import { useEffect } from "react";


const InputBox = (props: { chatRoomID: string; }) => {
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
    const onPressEmoji = () => {
        //open emoji, and set message text box with emoji
        console.warn('Emoji');
       
    }
    //update chat room with last message
    const updateChatRoomLastMessage = async (messageID: string) => {
      try {
          await API.graphql(
              graphqlOperation
              (updateChatRoom, {
                  input: {
                      id:chatRoomID,
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
         const newMessageData =   await API.graphql(
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
            onSendPress();
        }
    }
    return (
        <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={100}
        style={{ width: '100%'}}
      >
          
        <View style={styles.container}>
            <View style={styles.mainContainer}>
                <FontAwesome5 name="laugh-beam" size={24} color="grey"  onPress={onPressEmoji}/>
               
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