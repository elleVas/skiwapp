/**
 * If you are not familiar with React Navigation, check out the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator, HeaderBackButton, HeaderBackground } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';
import { Octicons, MaterialCommunityIcons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons'

import NotFoundScreen from '../screens/NotFoundScreen';
import ChatRoomScreen from '../screens/ChatRoomScreen';
import { RootStackParamList } from '../types';
import MainTabNavigator from './MainNavigator';
import LinkingConfiguration from './LinkingConfiguration';
import Colors from '../constants/Colors';
import { View } from '../components/Themed';

import LogoTitle from '../components/LogoTitle/logoTitle';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();
function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: Colors.light.tint,
        shadowOpacity: 0,
        elevation: 0

      },
      headerTintColor: Colors.light.background,
      headerTitleAlign: 'left',
      headerTitleStyle: {
        fontWeight: 'bold'
      }
    }}>
      <Stack.Screen
        name="Root"
        component={MainTabNavigator}
        options={{
          title: 'SkiwApp',
          headerRight: () => (
            <View style={{
              backgroundColor: Colors.light.tint,
              flexDirection: 'row',
              width: 60,
              justifyContent: 'space-between',
              marginRight: 10,
            }}>
              <Octicons name="search" size={22} color='white' />
              <MaterialCommunityIcons name="dots-vertical" size={22} color='white' />
            </View>
          )
        }}

      />
      <Stack.Screen
        name="ChatRoom"
        component={ChatRoomScreen}
      /*  options={({ navigation, route }) => ({
          title: route.params.name,
          headerTitle: props => <LogoTitle {...route} />,
          headerTitleAlign: 'center'
        })}*/
        options={({ route }) => ({ 
         // title: route.params.name,
         headerTitle: props => <LogoTitle {...route} />,
         headerTitleAlign: 'center',
         //TODO CUSTOMIZE BTN BACK
        /*  headerLeft: (props) => (
            <HeaderBackButton
              {...props}
              onPress={() => {
                // Do something
              }}
            />
          ),*/
          headerRight: () =>(
            <View style={{
              backgroundColor: Colors.light.tint,
              flexDirection: 'row',
              width: 100,
              justifyContent: 'space-between',
              marginRight: 10,
            }}>
             {/*TODO CREATE ACTIONS FOR BTN*/}
               <FontAwesome5 name="video" size={22} color={'white'}></FontAwesome5>
              <MaterialIcons name="call" size={22} color={'white'}></MaterialIcons>
              <MaterialCommunityIcons name="dots-vertical" size={22} color={'white'}></MaterialCommunityIcons>
            
            </View>
          )
      })}
      />

      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />

    </Stack.Navigator>
  );
}
