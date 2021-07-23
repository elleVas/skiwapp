import * as React from 'react';
import {FlatList, StyleSheet } from 'react-native';
import { View } from '../components/Themed';
import ContactListItem from '../components/ContactsListItem'; 

//static data for exampe chat
import users from '../constants/data/Users';

import { useEffect, useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { listUsers } from '../src/graphql/queries'

export default function ContactsScreen() {
const [users, setUsers] = useState([]);
  useEffect( () => {
    const fetchUsers = async () => {
      try {
        const usersData = await API.graphql(
          graphqlOperation(
            listUsers 
           )
        )

        setUsers(usersData.data.listUsers.items);
      } catch (error) {
        console.log(error);
      }
    }
    fetchUsers();
  }, [])
  return (
    <View style={styles.container}>
      <FlatList 
      style={{width:'100%'}}
      data={users} 
      renderItem={({item}) => <ContactListItem user={item} />}
      keyExtractor={(item) => item.id}
      />
    
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
