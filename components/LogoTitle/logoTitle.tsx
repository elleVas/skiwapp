import React from 'react';
import { Image, View,Text } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import styles from './style';



const LogoTitle = (route: any) => {
  return (
    <View 
    style={styles.container}>
    <Image
      source={{ uri: route.params.img }}
      style={styles.avatarSmall}
    />
    <Text style={styles.username}>{route.params.name}</Text>
    
</View>

  );
}


export default LogoTitle;