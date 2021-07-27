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
import { messagesByChatRoom } from '../src/graphql/queries'
import { useState } from "react";
import { Auth } from "aws-amplify";

const ChatRoomScreen = () => {

    const route = useRoute();
    console.log(route.params.id);
    //get userinfo
    const [myId, setMyId] = useState(null);
   
    //get message of chatroom
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        const fetchMessages = async () => {
          const messagesData = await API.graphql(
            graphqlOperation(
                messagesByChatRoom, {
                    chatRoomID: route.params.id,
                    sortDirection: "DESC",
                }
            )
          )
          setMessages(messagesData.data.messagesByChatRoom.items);
        }
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