import * as React from 'react';
import {FlatList, StyleSheet } from 'react-native';
import { View } from '../components/Themed';
import ChatListItem from '../components/ChatListItem'; 

import NewMessageButton from '../components/NewMessageButton';
import { useEffect } from 'react';
import { API, graphqlOperation } from "@aws-amplify/api";
import { Auth } from '@aws-amplify/auth';
import { getUser } from './queries/queries';
import { useState } from 'react';

//static data for exampe chat
//import ChatRooms from '../constants/data/ChatRooms';

export default function ChatsScreen() {
  
  const [chatRooms, setChatRooms] = useState([]);

  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        const userInfo = await Auth.currentAuthenticatedUser();
        const userData = await API.graphql(
          graphqlOperation(
            getUser, {
              id: userInfo.attributes.sub,
            }
          )
        )
        console.log("HEHEHEHEHEHEEHEHEHEHEHEHEHEHEHEH");
        setChatRooms(userData.data.getUser.chatRoomUser.items);
        console.log(userData.data.getUser.chatRoomUser.items);
      } catch (error) {
        console.log(error);
      }
    }
    fetchChatRooms();
  }, [])
  return (
    <View style={styles.container}>
      <FlatList 
      style={{width:'100%'}}
      data={chatRooms} 
      renderItem={({item}) => <ChatListItem chatRoom={item.chatRoom} />}
      keyExtractor={(item) => item.id}
      />
      <NewMessageButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

});
