
import {View, Text, StyleSheet, Linking,} from 'react-native';
import * as React from 'react'
import Constants from 'expo-constants';
import ButtonUrl from '../ButtonUrl';
const policiesLink:string = "https://beta.openai.com/docs/usage-policies"

   
const Home = () => {

  return (
  <>  
    <View style={styles.container}>
      <Text style={styles.textField}>Welcome to the image-generator-app!</Text>
      <Text style={styles.textField}>Please read the policies from OpenAi first before proceeding.</Text>
      <ButtonUrl url={policiesLink}/>
    </View>
  </>
  );
};
const styles = StyleSheet.create({
  container:{
    flex:2, 
    JustifyContent:"center", 
    alignItems:"center",
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
  
})
export default Home;
