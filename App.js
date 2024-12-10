import { StatusBar } from 'expo-status-bar';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import DBController from './model/DBController';

export default function App() {
  const [sessionId, setSessionId] = useState(null);
  const [lastScreen, setLastScreen] = useState(null);
  const [disabled, setDisabled] = useState(true);
  //const [image, setImage] = useState(null);
  //const imageConPrefix = "data:image/jpeg;base64," + image;

  let dbController = null;

  useEffect(() => {  
    /*CommunicationController.getImage()
    .then((res) => { 
      setImage(res.base64);
    })
    .catch((error) => console.log('Error getting image: ' + error) );
    //Sul return -> <Image source={{uri: imageConPrefix}} style={styles.image}></Image>*/
    dbController = new DBController();
    
    dbController.openDB()
    .then(() => { 
      setDisabled(false);
    })
    .catch((error) => { setDisabled(true); console.log('Error opening DB: ' + error); });
    
  }, []);

  //Dovrei fare che i bottoni non siano cliccabili finchè non è stato creato e aperto il db
  //dopo l'apertura del db, i bottoni diventano cliccabili grazie ad una variabile di stato
  const hanldeSave = async () => {
    console.log('App: save');
    await dbController.saveUser("Andrea"); 
    console.log('User saved: ');
  }

  const handleGetFirst = async () => {
    console.log('App: get first');
    let first = await dbController.getFirstUser();
    console.log('First user: ', first);
  }

  const handleGetAll = async () => {
    console.log('App: get all');
    let all = await dbController.getAllUsers();
    console.log('All users: ', all);
  }

  return (
    <View style={styles.container}>
      <Button title="Save" onPress={hanldeSave} disabled={disabled} />
      <Button title="Get first" onPress={handleGetFirst} disabled={disabled} />
      <Button title="Get all" onPress={handleGetAll} disabled={disabled}/>
      <Text className="text-base text-gray-100 font-p-medium"></Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
  }
});
