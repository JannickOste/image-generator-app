
import {View, Text, StyleSheet, Linking, Button,} from 'react-native';
import { Link } from '@react-navigation/native';
import * as React from 'react'
import Constants from 'expo-constants';
const policiesLink:string = "https://beta.openai.com/docs/usage-policies"

  const handlePress =async ()=>{
    await Linking.openURL(policiesLink);
    }
   
const Home = () => {

  return (
  <>  
    <View style={styles.container}>
      <Text style={styles.textField}>Welcome to the image-generator-app!</Text>
      <Text style={styles.textField}>Please read the usage case policy from OpenAi first before proceeding.</Text>
      <Link to={policiesLink} style={styles.linkfield}>OpenAi Policies</Link>
  
    </View>
  </>
  );
};
const styles = StyleSheet.create({
  container:{
    flex:2, 
    JustifyContent:"center", 
    paddingTop:Constants.statusBarHeight,
    padding:9
  },
  textField:{
    margin:25,
    fontSize:30,
    fontWeight:'bold', 
    textAlign:'center',
    textDecoration:"none"
  },
  linkfield:{
    margin:25,
    fontSize:30,
    fontWeight:'bold', 
    textAlign:'center',
    textDecoration:"none",
    color:"blue"
  }
})
export default Home;
