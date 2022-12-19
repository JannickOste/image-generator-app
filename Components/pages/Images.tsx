import { LinearGradient } from "expo-linear-gradient";
import CustomHeader from "../header";
import ImageGenerator from "../ImageGenerator"
import WavyHeader from "../wavyHeader";
import {StyleSheet} from "react-native"
import Constants from "expo-constants";
const svg="M0,128L48,138.7C96,149,192,171,288,197.3C384,224,480,256,576,266.7C672,277,768,267,864,245.3C960,224,1056,192,1152,197.3C1248,203,1344,245,1392,266.7L1440,288L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
const Images = () => (
    <>
        <WavyHeader
          svg={svg}
          color="rgb(150,150,230)"/>
    <LinearGradient
      style={styles.gradient}
      colors={["rgba(150,150,230,0.3)","rgba(150,100,230,0.7)"]}
      start={{x:0,y:0.4}}
      end={{x:2,y:1}}>
        <CustomHeader title="Generate"/>
        <ImageGenerator width={512} />
        </LinearGradient>
    </>
)
export default Images;

const styles = StyleSheet.create({
    gradient: {
      flex:2,
      justifyContent:"center",
      alignItems:"center",
      paddingTop:Constants.statusBarHeight,
      padding:0
    },
  })