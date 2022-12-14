import {Button, TextInput, View, Image, ActivityIndicator, ScrollView} from "react-native";
import {useState} from "react";
import "react-native-url-polyfill/auto"
import React from "react";
import SearchBox from "./SearchBox";
import OpenAPI from "../OpenAPI";
import ImageHistoryItem, { ImageHistoryItemProps } from "./ImageHistoryItem";
import { LoadHistoryImages, UpdateHistoryImages } from "./pages/History";

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
    const [state, setstate] = useState({currentImage: "none", loading: false});
     
    const OnSubmitEvent = async(searchQuery:string) => {
        try 
        {
            setstate({...state, loading: true}); // Trigger load eerst, anders wordt deze pas invoked na image fetch (door callback)
            try
            {
                OpenAPI.Singleton.fetchImageByText(searchQuery, async(uri: string) => {
                    setstate({...state, currentImage: uri});
                    
                    await LoadHistoryImages((set: ImageHistoryItemProps[]) => {
                        set.push({
                            id: set.reduce((prev, current) => current.id > prev ? current.id : prev, 0)+1,
                            searchQuery: searchQuery, 
                            uri: uri
                        });
    
                        UpdateHistoryImages(set);
                    })
                });
            } catch(e)
            {
                alert((e as Error).message);
            }

        }
        catch(e) 
        {
            alert((e as Error).message);
        }
    }

    return (
        <ScrollView style={{display:"flex", width: "100%",marginTop:60}}>
            <SearchBox placeholder="What do you wish to generate?"  onSubmit={OnSubmitEvent} />
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
