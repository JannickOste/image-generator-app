import {Button, TextInput, View, Image, ActivityIndicator} from "react-native";
import {Configuration, OpenAIApi } from "openai";
import {useState} from "react";
import "react-native-url-polyfill/auto"
import React from "react";


const config = new Configuration({
    apiKey: require("./env.json")["API_KEY"]
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
    const response = await openai.createImage({
        prompt: text,
        n: 1,
        size: "512x512",
      });
      
      uriSetter(response.data.data[0]?.url as string)
}


export const APIImage = (props: APIImageProps) => {
    const [state, setstate] = useState({text: "", currentImage: "none", loading: false});
    const loadImagePress = () => {
        setstate({...state, loading: true}); // Trigger load eerst, anders wordt deze pas invoked na image fetch (door callback)
        FetchImage(state.text, (uri: string) => setstate({...state, currentImage: uri}));
    }

    return (
        <View style={{backgroundColor: "black", display:"flex", width: "100%"}}>
            <TextInput style={{borderColor: "black", color: "white", width: "50%"}} onChangeText={(txt) => setstate({... state, text: txt})}></TextInput>
            <Button title="Search" onPress={loadImagePress}></Button>
            <Image 
                source={{uri: state.currentImage, width: props.width, height: props.height ? props.height : props.width}}
                style={{display: state.loading ? "none" : "flex"}}
                onLoadEnd={() => setstate({...state, loading: false})}
            />
            <ActivityIndicator size="large" style={{display: !state.loading ? "none" : "flex"}} />
        </View>
    )
}