import { View, Text, StyleSheet } from "react-native";

interface CustomHeaderProps {
    title:string
}
export default function  CustomHeader({title="hello wolrd."}:CustomHeaderProps){
    return (
        <View style={styles.headerContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{title}</Text>
        </View>
      </View>
    )
}
const styles = StyleSheet.create({
    
  headerContainer:{
    marginTop:10,
    marginHorizontal:10,
    marginBottom:50,
  }, 
  header:{
    fontSize:30,
    fontWeight:"bold",
    textAlign:"center",
    marginTop:35,
    },
   headerText:{
    fontSize:30,
    fontWeight:"bold",
    color:"#fff",
    textAlign:"center",
  },

})