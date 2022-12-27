import React from "react";
import { Button, View, Text, Image, StyleSheet, Pressable } from "react-native";

export type ImageHistoryItemProps = {
    id:number;
    searchQuery: string; 
    uri:string;
    onRemove?: (id: number) => void
}

const styles = StyleSheet.create({
    container: {
        display: "flex", 
        flexDirection: "column", 
        justifyContent: "space-evenly",
        alignItems:"center",
        margin: 5
    },
    imageContainer:{
        marginHorizontal: "auto",
        alignItems:"center",
        width:"50%",
    },
    image:{
        borderRadius:15, 
        zIndex:1,
    },
    historyContainer:{
        color: "black", 
        textAlign: "center" ,
        backgroundColor:"rgba(0,0,0,0.2)",
        borderBottomLeftRadius:7,
        borderBottomRightRadius:7,
        zIndex:0,
        top:-10,
        paddingTop:11,
        marginBottom:"5%",
        paddingHorizontal:"auto",
        width:"100%"
    },
    button:{
        backgroundColor:"rgba(200,100,200,1)",
        alignItems:"center",
        justifyContent:"center",
        paddingVertical:12,
        paddingHorizontal:0,
        elevation:3,
        width:"50%",
        marginBottom:5
    },
    buttonText:{
        fontSize:13,
        lineHeight:21,
        fontWeight:"bold",
        letterSpacing:0.25,
        color:"white"
    }
});

const ImageHistoryItem = ({id, searchQuery, uri, onRemove}: ImageHistoryItemProps) => {
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={{uri: uri, width: 255, height: 255}} style={styles.image} /> 
                <Text style={styles.historyContainer}>{searchQuery}</Text>
            </View>  
            <Pressable style={styles.button}><Text style={styles.buttonText}>Generate a similair image</Text></Pressable>
            <Pressable style={styles.button} onPress={() => onRemove ? onRemove(id) : () => {}}><Text style={styles.buttonText}>Remove from history</Text></Pressable>
        </View>
    )   
}

export default ImageHistoryItem;