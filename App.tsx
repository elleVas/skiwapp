import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

import { Auth, API, graphqlOperation } from 'aws-amplify'
import { getUser } from './src/graphql/queries'
import { createUser } from './src/graphql/mutations'
// @ts-ignore
import { withAuthenticator } from 'aws-amplify-react-native';
import Amplify from 'aws-amplify'
import config from './src/aws-exports'
import { useEffect } from 'react';
// @ts-ignore
import backgroundImg from "./assets/images/shh.png";
Amplify.configure(config)

const randoImages = [
  "./assets/images/shh.png","./assets/images/shh.png"
];



function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const getRandomImage = () => {
    console.log("QUI QUI QUI ",randoImages.length);
    let test = randoImages[Math.floor(Math.random() * randoImages.length)];
    console.log("QUI QUI QUI ",test);
    return test;
  }

  //run this snippet only when app is first mounted
  useEffect(() => {
    const fetchUser = async () => {
      // get Authenticated user from auth
      const userInfo = await Auth.currentAuthenticatedUser({ bypassCache: true });
      console.log(userInfo)
      if (userInfo) {

        // get the user from backend with the user id from Auth
        const userData = await API.graphql(
          graphqlOperation(
            getUser,
            { id: userInfo.attributes.sub }
          )
        );

        if (userData.data.getUser) {
          console.log("User already register in DB");
          return;

        } 
          const newUser = {
            id: userInfo.attributes.sub,
            name: userInfo.username,
            imageUri:getRandomImage(),
            status:'Hey, I am here, Shhh!'
          }

          console.log(newUser)
          // if there is no user in DB with id, then create one
          const createUsr = await API.graphql(
            graphqlOperation(
             createUser,
             {input: newUser}
          )
  
          );
        
      }

    }
    fetchUser();
  }, []);


  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}


export default withAuthenticator(App)
