import Constants from "expo-constants";
import { LinearGradient } from "expo-linear-gradient";
import {Text, StyleSheet} from "react-native";
import CustomHeader from "../header";
import WavyHeader from "../wavyHeader";

const svg="M0,128L48,138.7C96,149,192,171,288,197.3C384,224,480,256,576,250.7C672,245,768,203,864,176C960,149,1056,139,1152,165.3C1248,192,1344,256,1392,288L1440,320L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
const styles = StyleSheet.create({
    
  gradient: {
    flex:2,
    justifyContent:"center",
    alignItems:"center",
    paddingTop:Constants.statusBarHeight,
    padding:0,
  }
})
const FeatureDisabled = () => {
    return (
        <>
        <WavyHeader
             svg={svg}
             color="rgb(150,150,230)"/>
         <LinearGradient
           style={styles.gradient}
           colors={["rgba(150,150,230,0.3)","rgba(150,100,230,0.7)"]}
           start={{x:0,y:0.4}}
           end={{x:2,y:1}}>
        <CustomHeader title="Feature under development"/>
     </LinearGradient>
     </>
    )
}

export default FeatureDisabled;