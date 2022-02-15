import React from "react";
import { ImageBackground, KeyboardAvoidingView, Platform, SafeAreaView, View } from "react-native";
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
    
    const [nextToken, setNextToken] = useState(undefined);
    const [nextNextToken, setNextNextToken] = useState();
    const [previousTokens, setPreviousTokens] = useState([]);

/*
    useEffect(() => {
      const fetch = async () => {
        const variables = {
          nextToken,
          owner,
          limit,
          sortDirection,
        }
        const result = await API.graphql(graphqlOperation(listTodosByDate, variables))
        setNextNextToken(result.data.listTodosByDate.nextToken)
        setTodos(result.data.listTodosByDate.items)
      }
    
      fetch()
    }, [nextToken, owner, sortDirection])*/


    const fetchMessages = async () => {
        const messagesData = await API.graphql(
          graphqlOperation(
            messagesByChatRoom, {
             limit: 10,
             nextToken: nextToken,
              chatRoomID: route.params?.id,
              sortDirection: "DESC",
            }
          )
        )
        console.log("==========================================================")
       // nextToken = messagesData.data.messagesByChatRoom.nextToken;
        console.log("FETCH MESSAGES", messagesData.data.messagesByChatRoom.nextToken)
        console.log("==========================================================")
        setNextNextToken(messagesData.data.messagesByChatRoom.nextToken)
        setMessages(messagesData.data.messagesByChatRoom.items);
      }
    
      useEffect(() => {
        fetchMessages();
      }, [nextToken])

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
         next: (data: any) => {
          // console.log(data.value);
             const newMessage = data.value.data.onCreateMessage
              console.log(newMessage);
             //if message !for us
           if (newMessage.chatRoomID !== route.params?.id) {
                console.log("Message is in another room!")
                 return;
             }
             fetchMessages();
             
         }
       });
       return  () => subscription.unsubscribe();
    }, [])

    let keyExtractor = (nextToken: any) => nextToken;
    return (

        <ImageBackground
            style={{ width: '100%', height: '100%' }}
            source={backgroundImg}>
            <FlatList
                data={messages}
                renderItem={({ item }) => <ChatMessage myId={myId} message={item} />}
                keyExtractor={item => item.id}
                onEndReached={() => {
                 if (messages.nextToken === null) return;
                 /* setIsLoading(true);
                  // When the end is reached we fetch the next batch of messages if they exist
                  getChannelMessages(channelId, messages.nextToken).then(
                    ({ messages }) => {
                      setIsLoading(false);
                      dispatch({
                        type: "append-messages",
                        payload: { channelId, messages }
                      });
                    }
                  );*/
                }}
                inverted
                onScroll={({ nativeEvent }) => {
                 // fetchMessages()
                }}
                scrollEventThrottle={10000}
            />

            <InputBox chatRoomID={route.params?.id} ></InputBox>

        </ImageBackground >
     

    )
}

export default ChatRoomScreen;