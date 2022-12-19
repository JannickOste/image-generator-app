import React,{  useRef, useState} from 'react';
import {Button, ImageBackground, TextInput,StyleSheet} from "react-native"
import {Canvas,CanvasRef, PathType,DrawingTool} from '@benjeau/react-native-draw';
import { RouteProp, useRoute } from '@react-navigation/native';
interface EditImageProps {
    uri:string
}
const styles = StyleSheet.create({
    canvas:{
        backgroundColor:'rgba(52, 52, 52, 0.0)'
    }
})
const EditImage  =(()=>{
    const [paths,setPaths] = useState<PathType[]>([]);
    const [prompt, setPrompt] = useState<string>("");
    const addPath =(path:PathType[])=>{
    //setPaths([...paths,...path])
    }
    const clearPaths=()=>{
     setPaths([]);
    }
    const route: RouteProp<any> = useRoute();
    const uri = route.params?.uri;
    const canvasRef = useRef<CanvasRef>(null);
    const handleUndo = ()=>{
        canvasRef.current?.undo();
    }
    const handleClear = ()=>{
        canvasRef.current?.clear();
    }
   return   <>
   <ImageBackground source={{uri:uri}} style={{height:500}}>
   <Canvas
        ref={canvasRef}
        height={500}
        color="green"
        thickness={15}
        tool={DrawingTool.Brush}
        opacity={1}
        style={styles.canvas}
        onPathsChange={(event)=>{addPath(event)}}
        
    />
    </ImageBackground>  
    <Button title="undo" onPress={()=>{handleUndo; console.log(paths)}}/>
    <Button title="clear"onPress={()=>{handleClear; clearPaths;}}/>
    {paths.length >=1 && prompt != "" ? 
        (<Button title="Generate!" onPress={()=>{}}/>):
        (<TextInput placeholder='A room with an blue eliphant in it.' onSubmitEditing={(event)=>setPrompt(event.nativeEvent.text)}/>)
    }
   </>
   //input here in backend to generate AI image or modify image if that is still required.
})
export default EditImage;