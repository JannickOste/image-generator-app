
import {View, Text, StyleSheet} from 'react-native';
import * as React from 'react'
import Constants from 'expo-constants';
import ButtonUrl from '../ButtonUrl';
import {LinearGradient} from "expo-linear-gradient"
import WavyHeader from '../wavyHeader';
import CustomHeader from '../header';
const policiesLink:string = "https://beta.openai.com/docs/usage-policies"

   
const Home = () => {

  return (
  <> 
    <WavyHeader color="rgb(150,150,230)"/>
    <LinearGradient
      style={styles.gradient}
      colors={["rgba(150,150,230,0.3)","rgba(150,100,230,0.7)"]}
      start={{x:0,y:0.4}}
      end={{x:2,y:1}}>
      <CustomHeader title="Home"/>
    <View style={styles.container}>
      <Text style={styles.textField}>Welcome to the image-generator-app!</Text>
      <Text style={styles.textField}>Please read the policies from OpenAi first before proceeding.</Text>
      <ButtonUrl url={policiesLink}/>
      </View>
      </LinearGradient>
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
  gradient: {
    flex:2,
    justifyContent:"center",
    alignItems:"center",
    paddingTop:Constants.statusBarHeight,
    padding:0
  },
})
export default Home;
