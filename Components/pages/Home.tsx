
import {View, Text, StyleSheet, Linking,} from 'react-native';
import * as React from 'react'
import Constants from 'expo-constants';
import { TouchableOpacity } from 'react-native-gesture-handler';
const policiesLink:string = "https://beta.openai.com/docs/usage-policies"

   
const Home = () => {

  return (
  <>  
    <View style={styles.container}>
      <Text style={styles.textField}>Welcome to the image-generator-app!</Text>
      <Text style={styles.textField}>Please read the policies from OpenAi first before proceeding.</Text>
      <TouchableOpacity style={styles.touchable} onPress={() => Linking.openURL('https://google.com')}><Text style={styles.touchableText}>Policies</Text></TouchableOpacity>
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
  linkfield:{
    margin:25,
    fontSize:30,
    fontWeight:'bold', 
    textAlign:'center',
    textDecoration:"none",
    color:"blue"
  },
  touchable:{
    backgroundColor:"rgba(0,100,100,0.7)",
    borderRadius:7,
    width:120,
    height:30,
    justifyContent:"center",
    alignItems:"center"
  },
  touchableText:{
    fontSize:20,
    color:"#ffffff"
  }
})
export default Home;
