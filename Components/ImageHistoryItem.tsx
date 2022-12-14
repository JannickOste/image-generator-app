import React from "react";
import { Button, View, Text, Image, StyleSheet } from "react-native";

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
        margin: 5
    },
    imageContainer:{
        marginHorizontal: "auto"
    },
    historyContainer:{
        color: "black", 
        textAlign: "center" 
    }
});

const ImageHistoryItem = ({id, searchQuery, uri, onRemove}: ImageHistoryItemProps) => {
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={{uri: uri, width: 255, height: 255}} /> 
            </View>  
            
            <Text style={styles.historyContainer}>{searchQuery}</Text>
            <Button title="Generate a similair image" />
            <Button title="Remove from history" onPress={() => onRemove ? onRemove(id) : () => {}} />
        </View>
    )   
}

export default ImageHistoryItem;