import React, { useCallback } from "react";
import{Alert, Button, Linking, StyleSheet,Text} from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler";
interface ButtonUrlProps {
    url:string
}
const ButtonUrl = ({url}:ButtonUrlProps)=>{



const handlePress =async  ()=>{
    const ableToOPenURL = await Linking.canOpenURL(url)
    if(ableToOPenURL){
       await Linking.openURL(url)
    }else{
        Alert.alert("unable to open the Policies URL : "+url)
    }
}
return (
    <>
          <Button onPress={()=>handlePress()} title="Policies"/>

    </>
)
}
export default ButtonUrl;

const styles = StyleSheet.create({
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
      }}
)