import {Button, TextInput, View, Image, ActivityIndicator, ScrollView} from "react-native";
import {Configuration, OpenAIApi } from "openai";
import {useState} from "react";
import "react-native-url-polyfill/auto"
import React from "react";
import SearchBox from "./Components/SearchBox";
import OpenAPI from "./OpenAPI";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ImageHistoryItemProps } from "./Components/ImageHistory";


const config = new Configuration({
    apiKey: "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"
});

const openai = new OpenAIApi(config);
export type CreateImageState = {
    text: string; 
    currentImage: string;
    loading: boolean;
}

export type APIImageProps = {
    width: number;
    height?: number;
}
 

export const FetchImage = async(text: string, uriSetter: (str: string) => void) => {
    let url: string | undefined = undefined;
    try 
    {

        const response = await openai.createImage({
            prompt: text,
            n: 1,
            size: "512x512",
          });
          
          url = response.data.data[0]?.url as string;
    }
    catch(e)
    {
        alert((e as Error).message);
    }
    finally 
    {
        if(url)
        {
            uriSetter(url);

            const imageData = await AsyncStorage.getItem("history");
            const images: ImageHistoryItemProps[] = imageData ? JSON.parse(imageData) : [];
            
            await AsyncStorage.setItem("history", JSON.stringify([... images,  {
                id: images.reduce((prev, current) => current.id > prev ? current.id : prev, -1)+1,
                searchQuery: text,
                uri: url
            }]))
        }
    }
      
}


export const APIImage = (props: APIImageProps) => {
    const [state, setstate] = useState({text: "", currentImage: "none", loading: false});
    const loadImagePress = (input: string) => {
        setstate({...state, loading: true}); // Trigger load eerst, anders wordt deze pas invoked na image fetch (door callback)
        FetchImage(input, (uri: string) => setstate({...state, currentImage: uri}));
    }

    return (
        <ScrollView style={{backgroundColor: "black", display:"flex", width: "100%"}}>
            <SearchBox placeholder="What do you wish to generate?"  onSubmit={loadImagePress} />
            
            <Image 
                source={{uri: state.currentImage, width: props.width, height: props.height ? props.height : props.width}}
                style={{display: state.loading ? "none" : "flex"}}
                onLoadEnd={() => setstate({...state, loading: false})}
            />
            <ActivityIndicator size="large" style={{display: !state.loading ? "none" : "flex"}} />
        </ScrollView>
    )
}