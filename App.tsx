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
import { AmplifyTheme } from 'aws-amplify-react-native';
// @ts-ignore
import { Authenticator, withAuthenticator } from 'aws-amplify-react-native';
import Amplify from 'aws-amplify'
import config from './src/aws-exports'
import { useEffect } from 'react';

const MySectionHeader = Object.assign({}, AmplifyTheme.sectionHeader, { background: 'blue' });
const MyTheme = Object.assign({}, AmplifyTheme, { sectionHeader: MySectionHeader });


Amplify.configure(config)

const randomImages = [
  'https://images-eu.ssl-images-amazon.com/images/I/41ue1o6EfWL.png',
  'https://images-eu.ssl-images-amazon.com/images/I/01oKowc90VL.png',
  'https://is2-ssl.mzstatic.com/image/thumb/Purple30/v4/e1/27/30/e127305d-97be-eb78-f9c7-a3dc9ac061a9/source/60x60bb.jpg',
]



function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const getRandomImage = () => {
    return  randomImages[Math.floor(Math.random() * randomImages.length)];
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


export default withAuthenticator(App, 
  {
   // TODO CREATE custom componet for login
    // Render a sign out button once logged in
   // includeGreetings: true, 
    // Show only certain components
   // authenticatorComponents: [MyComponents],
    // display federation/social provider buttons 
   // federated: {myFederatedConfig}, 
    // customize the UI/styling
    //theme: {MyTheme}
});
