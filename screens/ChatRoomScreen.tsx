import React from "react";
import { ImageBackground } from "react-native";
import { useRoute } from "@react-navigation/native";
import { FlatList } from "react-native-gesture-handler";

import ChatRoomData from "../constants/data/Chats";
import ChatMessage from "../components/ChatMessage";
import backgroundImg from "../assets/images/backgroundImg.png";

const ChatRoomScreen = () => {
    const route = useRoute();
    //console.log(route.params);

    return (
        <ImageBackground
            style={{ width: '100%', height: '100%' }}
            source={backgroundImg}>
            <FlatList
                data={ChatRoomData.messages}
                renderItem={({ item }) => <ChatMessage message={item} />}
                inverted
            />
        </ImageBackground>

    )
}

export default ChatRoomScreen;