import React from "react";
import { ImageBackground, SafeAreaView, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import { FlatList } from "react-native-gesture-handler";

import ChatRoomData from "../constants/data/Chats";
import ChatMessage from "../components/ChatMessage";

import InputBox from "../components/InputBox";
// @ts-ignore
import backgroundImg from "../assets/images/backgroundImg.png";

const ChatRoomScreen = () => {
    const route = useRoute();




    return (
        <ImageBackground
            style={{ width: '100%', height: '100%' }}
            source={backgroundImg}>
                    <FlatList
                        data={ChatRoomData.messages}
                        renderItem={({ item }) => <ChatMessage message={item} />}
                        inverted
                    />

                    <InputBox></InputBox>
           
        </ImageBackground >

    )
}

export default ChatRoomScreen;