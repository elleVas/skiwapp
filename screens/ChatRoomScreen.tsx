import React from "react";
import { ImageBackground, SafeAreaView, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import { FlatList } from "react-native-gesture-handler";



import ChatMessage from "../components/ChatMessage";
import InputBox from "../components/InputBox";
// @ts-ignore
import backgroundImg from "../assets/images/backgroundImg.png";
import { useEffect } from "react";

import { API, graphqlOperation } from "@aws-amplify/api";
import { messagesByChatRoom } from '../src/graphql/queries';
import { onCreateMessage } from '../src/graphql/subscriptions';
import { useState } from "react";
import { Auth } from "aws-amplify";



const ChatRoomScreen = () => {

    const route = useRoute();
    //get userinfo
    const [myId, setMyId] = useState(null);
    //get message of chatroom
    const [messages, setMessages] = useState([]);
    
    const fetchMessages = async () => {
        const messagesData = await API.graphql(
          graphqlOperation(
            messagesByChatRoom, {
              chatRoomID: route.params.id,
              sortDirection: "DESC",
            }
          )
        )
    
        console.log("FETCH MESSAGES")
        setMessages(messagesData.data.messagesByChatRoom.items);
      }
    
      useEffect(() => {
        fetchMessages();
      }, [])

    //
    useEffect(() => {
        const getMyId = async () => {
          const userInfo = await Auth.currentAuthenticatedUser();
          setMyId(userInfo.attributes.sub);
        }
        getMyId();
    }, [])

    useEffect(() => {
       const subscription = API.graphql(
        graphqlOperation(onCreateMessage)  
       ).subscribe({
         next: (data) => {
             const newMessage = data.value.data.onCreateMessage
           
             //if message !for us
           if (newMessage.chatRoomID !== route.params.id) {
                console.log("Message is in another room!")
                 return;
             }
             fetchMessages();
             
         }
       });
       return  () => subscription.unsubscribe();
    }, [])


    return (
        <ImageBackground
            style={{ width: '100%', height: '100%' }}
            source={backgroundImg}>
            <FlatList
                data={messages}
                renderItem={({ item }) => <ChatMessage myId={myId} message={item} />}
                inverted
            />

            <InputBox chatRoomID={route.params.id} ></InputBox>

        </ImageBackground >

    )
}

export default ChatRoomScreen;