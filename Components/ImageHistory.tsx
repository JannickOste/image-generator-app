import AsyncStorage from "@react-native-async-storage/async-storage"
import { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, Button} from "react-native";

export type ImageHistoryItemProps = {
    id:number;
    searchQuery: string; 
    uri:string;
    collectionSetter?: (collection: ImageHistoryItemProps[]) => void
}

const ImageHistoryItem = ({id, searchQuery, uri, collectionSetter}: ImageHistoryItemProps) => {
    return (
        <View style={{display: "flex", flexDirection: "row"}}>
            <View>
                <Text style={{color: "black"}}>Search: {searchQuery}</Text>
                <Button title="Generate similair images"></Button>
                <Button title="Remove from history" onPress={(ev) => {
                    
                }} />
            </View>
            <Image source={{uri: uri, width: 255, height: 255}} style={{marginLeft: "25 %"}} />   
        </View>
    )   
}

type ImageHistoryState = {
    items:ImageHistoryItemProps[];
}

const LoadImages = async(imageSetter: (images:ImageHistoryItemProps[]) => void) => {
    const images:string | null = await AsyncStorage.getItem("history");
    
    imageSetter(images ? JSON.parse(images) : []);
}

const ImageHistory = () => {
    const [state, setState] = useState<ImageHistoryState>({items: []});

    useEffect(() => {
        LoadImages((images) => setState({... state, items: images}));
    }, [state.items]);
    
    return (
        <ScrollView >
            <Text style={{fontSize: 50}}>Image History:</Text>
            {state.items.map(i => <ImageHistoryItem id={i.id} searchQuery={i.searchQuery} uri={i.uri} key={i.id} />)}
        </ScrollView>
    )
}

export default ImageHistory;