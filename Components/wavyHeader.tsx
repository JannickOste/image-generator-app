import React from "react"
import { StyleSheet, View,Dimensions } from "react-native"
import Svg,{Path} from "react-native-svg"
const defaultcolor= "rgb(60,100,100)"
const defaultviewbox ='0 0 1440 320'
const defaultd="M0,96L60,133.3C120,171,240,245,360,245.3C480,245,600,171,720,133.3C840,96,960,96,1080,128C1200,160,1320,224,1380,256L1440,288L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
interface WavyHeaderProps {
    svg?:string,
    color?:string,
    viewbox?:string
}

export default function WavyHeader({svg=defaultd,color=defaultcolor,viewbox=defaultviewbox}:WavyHeaderProps){
return (
    <View style={styles.svgCurve}>
        <View style={{backgroundColor:color, height:100}}>
            <Svg
                height="100%"
                width="100%"
                viewBox={viewbox}
                style={{position:"absolute",top:95, }}>
                    <Path
                        fill={color}
                        d={svg}/>
            </Svg>
        </View>
    </View>
)
}
const styles = StyleSheet.create({
    svgCurve:{
        position:"absolute",
        width:Dimensions.get("window").width+5,
        
      },
    })