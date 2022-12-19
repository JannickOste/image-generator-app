import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import Constants from 'expo-constants';
import React, { useEffect, useState } from "react";
import { ScrollView, Text,StyleSheet } from "react-native";
import CustomHeader from "../header";
import ImageHistoryItem, { ImageHistoryItemProps } from "../ImageHistoryItem";
import WavyHeader from "../wavyHeader";

type ImageHistoryState = {
    items:ImageHistoryItemProps[];
}

export const LoadHistoryImages = async(imageSetter: (images:ImageHistoryItemProps[]) => void) => {
    const images:string | null = await AsyncStorage.getItem("history");
    
    imageSetter(images ? JSON.parse(images) : []);
}

export const UpdateHistoryImages = async(images: ImageHistoryItemProps[], imageSetter?: (images: ImageHistoryItemProps[]) => void) => {
    await AsyncStorage.setItem("history", JSON.stringify(images));

    if(imageSetter)
        imageSetter(images);
}

const ImageHistory = () => {
    const [state, setState] = useState<ImageHistoryState>({items: []});

    useEffect(() => {
        LoadHistoryImages((images) => setState({... state, items: images}));
    }, [state.items]);

    return (
      
       
        <ScrollView>            
            {state.items.map(i => 
                <ImageHistoryItem 
                    id={i.id} 
                    searchQuery={i.searchQuery} 
                    uri={i.uri} key={i.id} 
                    onRemove={(id) => UpdateHistoryImages(state.items.filter((v) => v.id != id), (images) => setState({...state, items: images}))} 
                />
            )}
        </ScrollView>
    )
}
export const History = () => ( 
    <>
<WavyHeader/>
<LinearGradient
    style={styles.gradient}
    colors={["rgba(0,100,100,0.3)","rgba(0,100,100,0.7)"]}
    start={{x:0,y:0.5}}
    end={{x:1.3,y:1}}>
<CustomHeader title="Image History"/>
<ImageHistory /> 
</LinearGradient>
</>
);

export default History;



const styles = StyleSheet.create({
    gradient: {
      flex:2,
      justifyContent:"center",
      alignItems:"center",
      paddingTop: Constants.statusBarHeight,
      padding:0
    }}
)