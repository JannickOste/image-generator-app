import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import Constants from 'expo-constants';
import React, { useEffect, useState } from "react";
import { ScrollView,StyleSheet } from "react-native";
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
      
       
        <ScrollView style={{width:"100%"}}>            
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
const svg="M0,128L48,112C96,96,192,64,288,80C384,96,480,160,576,176C672,192,768,160,864,122.7C960,85,1056,43,1152,53.3C1248,64,1344,128,1392,160L1440,192L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
export const History = () => ( 
    <>
   <WavyHeader
        svg={svg}
        color="rgb(150,150,230)"/>
    <LinearGradient
      style={styles.gradient}
      colors={["rgba(150,150,230,0.3)","rgba(150,100,230,0.7)"]}
      start={{x:0,y:0.4}}
      end={{x:2,y:1}}>
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