import {Button, TextInput, View, Image, ActivityIndicator, ScrollView} from "react-native";
import {Configuration, OpenAIApi } from "openai";
import {useState} from "react";
import "react-native-url-polyfill/auto"
import React from "react";
import SearchBox from "./SearchBox";
import OpenAPI from "../OpenAPI";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ImageHistoryItemProps } from "./ImageHistory";

export type CreateImageState = {
    text: string; 
    currentImage: string;
    loading: boolean;
}

export type APIImageProps = {
    width: number;
    height?: number;
}
 


export const ImageCreator = (props: APIImageProps) => {
    const [state, setstate] = useState({text: "", currentImage: "none", loading: false});
    return (
        <ScrollView style={{backgroundColor: "black", display:"flex", width: "100%"}}>
            <SearchBox placeholder="What do you wish to generate?"  onSubmit={() => {
                try 
                {
                    setstate({...state, loading: true}); // Trigger load eerst, anders wordt deze pas invoked na image fetch (door callback)
                    OpenAPI.Singleton.fetchImageByText(state.text, async(uri: string) => {
                        setstate({...state, currentImage: uri});
                        
                        const imageData = await AsyncStorage.getItem("history");
                        const images: ImageHistoryItemProps[] = imageData ? JSON.parse(imageData) : [];
                        
                        alert(imageData)
                        await AsyncStorage.setItem("history", JSON.stringify([... images,  {
                            id: images.reduce((prev, current) => current.id > prev ? current.id : prev, 0),
                            searchQuery: state.text, 
                            uri: uri
                        }]))
                    });
                }
                catch(e) 
                {
                    alert((e as Error).message);
                }
            }} />
            
            <Image 
                source={{uri: state.currentImage, width: props.width, height: props.height ? props.height : props.width}}
                style={{display: state.loading ? "none" : "flex"}}
                onLoadEnd={() => setstate({...state, loading: false})}
            />
            <ActivityIndicator size="large" style={{display: !state.loading ? "none" : "flex"}} />
        </ScrollView>
    )
}

export default ImageCreator;
/*

import { View, Image, ActivityIndicator} from "react-native";
import {useState} from "react";
import "react-native-url-polyfill/auto"
import React from "react";
import OpenAPI from "../OpenAPI";
import SearchBox from "./SearchBox";


type APIImageState = {
    text: string; 
    currentImage: string;
    loading: boolean;
}

type APIImageProps = {
    width: number;
    height?: number;
}


const ImageCreator = (props: APIImageProps) => {
    const [state, setstate] = useState<APIImageState>({text: "", currentImage: "none", loading: false});

    return (
        <View style={{backgroundColor: "black", display:"flex", width: "100%"}}>
            <SearchBox placeholder="What do you wish to generate?" onSubmit={() => {
                try 
                {
                    setstate({...state, loading: true}); // Trigger load eerst, anders wordt deze pas invoked na image fetch (door callback)
                    OpenAPI.Singleton.fetchImageByText(state.text, (uri: string) => {
                        setstate({...state, currentImage: uri});
                    });
                }
                catch(e) 
                {
                    alert((e as Error).message);
                }
            }} />

            <Image 
                source={{uri: state.currentImage, width: props.width, height: props.height ? props.height : props.width}}
                style={{display: state.loading ? "none" : "flex"}}
                onLoadEnd={() => setstate({...state, loading: false})}
            />
            
            <ActivityIndicator size="large" style={{display: !state.loading ? "none" : "flex"}} />
        </View>
    )
}

export default ImageCreator;
*/