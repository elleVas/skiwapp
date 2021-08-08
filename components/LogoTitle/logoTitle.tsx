import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Image, View,Text, TouchableOpacity } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import navigation from '../../navigation';
import styles from './style';
import { useNavigation } from "@react-navigation/native";



const LogoTitle = (route: any) => {


  const navigation = useNavigation();
  //navigate back to list chat
  const onPressBack = () => {
    navigation.navigate('Root');
}

  return (
    <View 
    style={styles.container}>
    
    
    <TouchableOpacity onPress={onPressBack}>
                <View>
                  
                <MaterialIcons name="chevron-left" size={50} color={'white'}></MaterialIcons>
                 
                </View>
            </TouchableOpacity>
    <Image
      source={{ uri: route.params.img }}
      style={styles.avatarSmall}
    />
    <Text style={styles.username}>{route.params.name}</Text>
    
</View>

  );
}


export default LogoTitle;