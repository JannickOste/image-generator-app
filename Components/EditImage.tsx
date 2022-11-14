import React,{  useRef} from 'react';
import {Button} from "react-native"
import {Canvas,CanvasRef} from '@benjeau/react-native-draw';
const EditImage  =(()=>{
    const canvasRef = useRef<CanvasRef>(null);
    const handleUndo = ()=>{
        canvasRef.current?.undo();
    }
    const handleClear = ()=>{
        canvasRef.current?.clear();
    }
   return   <>
   <Canvas
        ref={canvasRef}
        height={500}
        color="black"
        thickness={15}
        opacity={0.7}
        style={{backgroundColor:'white'}}
    />
    <Button title="undo" onPress={handleUndo}/>
    <Button title="clear" onPress={handleClear}/>
   </>
   
})
export default EditImage;