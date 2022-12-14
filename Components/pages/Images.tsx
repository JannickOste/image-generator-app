import { LinearGradient } from "expo-linear-gradient";
import CustomHeader from "../header";
import ImageCreator from "../ImageCreator"
import WavyHeader from "../wavyHeader";
import {StyleSheet} from "react-native"
import Constants from "expo-constants";
const Images = () => (
    <>
        <WavyHeader/>
        <LinearGradient
        style={styles.gradient}
        colors={["rgba(0,100,100,0.3)","rgba(0,100,100,0.7)"]}
        start={{x:0,y:0.5}}
        end={{x:1.3,y:1}}>
        <CustomHeader title="Generate"/>
        <ImageCreator width={512} />
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