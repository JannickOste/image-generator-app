import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { ScrollView, Text } from "react-native";
import ImageHistoryItem, { ImageHistoryItemProps } from "../ImageHistoryItem";

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
            <Text style={{fontSize: 50, textAlign: "center"}}>Image History</Text>
            
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
export const History = () => (<ImageHistory />);

export default History;