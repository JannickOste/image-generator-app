import React from "react";
import{Alert,Linking, Pressable, StyleSheet,Text} from "react-native"
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
          <Pressable style={styles.touchable} onPress={()=>handlePress()}><Text style={styles.touchableText}>Policies</Text></Pressable>

    </>
)
}
export default ButtonUrl;

const styles = StyleSheet.create({
      touchable:{
        backgroundColor:"rgba(200,0,230,1)",
        borderRadius:7,
        width:120,
        height:30,
        justifyContent:"center",
        alignItems:"center",
        elevation:3
      },
      touchableText:{
        fontSize:20,
        color:"#ffffff"
      }}
)