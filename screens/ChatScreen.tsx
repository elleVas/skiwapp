import * as React from 'react';
import {FlatList, StyleSheet } from 'react-native';
import { View } from '../components/Themed';
import ChatListItem from '../components/ChatListItem'; 

//static data for exampe chat
import ChatRooms from '../constants/data/ChatRooms';

export default function ChatsScreen() {
  return (
    <View style={styles.container}>
      <FlatList 
      style={{width:'100%'}}
      data={ChatRooms} 
      renderItem={({item}) => <ChatListItem chatRoom={item} />}
      keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

});
