import React,{  useRef} from 'react';
import {Button, ImageBackground, TextInput} from "react-native"
import {Canvas,CanvasRef} from '@benjeau/react-native-draw';
import { RouteProp, useRoute } from '@react-navigation/native';
interface EditImageProps {
    uri:string
}
const EditImage  =(()=>{
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
        color="black"
        thickness={15}
        opacity={0.7}
        style={{backgroundColor:'white',}}
        
    />
    </ImageBackground>  
    <Button title="undo" onPress={handleUndo}/>
    <Button title="clear" onPress={handleClear}/>
   </>
   
})
export default EditImage;