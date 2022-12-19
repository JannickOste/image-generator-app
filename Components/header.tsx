import { View, Text, StyleSheet } from "react-native";

interface CustomHeaderProps {
    title:string
    bgColor?:string
}
export default function  CustomHeader({title="hello world.",bgColor="#fff"}:CustomHeaderProps){
  
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
    color:bgColor,
    textAlign:"center",
  },
})
    return (
        <View style={styles.headerContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{title}</Text>
        </View>
      </View>
    )
    
}