import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { Image, StyleSheet, TouchableOpacity, View,Text, Dimensions} from "react-native";
import React, {useEffect, useState,useRef,  } from "react";
import {launchImageLibraryAsync,MediaTypeOptions, requestMediaLibraryPermissionsAsync} from "expo-image-picker";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {useIsFocused, useNavigation} from "@react-navigation/native"
import { RootStackParamList } from "../Stack.navigator";
import { SafeAreaView } from "react-navigation";
import Constants from "expo-constants";
import WavyHeader from "../wavyHeader";
import { LinearGradient } from "expo-linear-gradient";
import CustomHeader from "../header";
const svg="M0,128L48,138.7C96,149,192,171,288,197.3C384,224,480,256,576,250.7C672,245,768,203,864,176C960,149,1056,139,1152,165.3C1248,192,1344,256,1392,288L1440,320L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"

const chooseImageFromLibrary = (assignmentCallback: (uri:string) => void) => async () => {
  let result = await launchImageLibraryAsync({
    mediaTypes: MediaTypeOptions.Images,
    quality: 0.5,
    allowsEditing: true,
  });
  if (!result.cancelled) {
    assignmentCallback(result.uri)
  }
};

const takeCameraPicture = async (cameraInstance: Camera, assignmentCallback: (uri:string) => void) => {
  if (cameraInstance) {
    const photo = await cameraInstance.takePictureAsync({ quality: 1, exif: false })

    await MediaLibrary.saveToLibraryAsync(photo.uri);
    assignmentCallback(photo.uri)
  } 
};

type CreateState = {
  photo?:string;
  cameraEnabled?:boolean;
  cameraReference:React.RefObject<Camera>
}

const Create = () => {
  const [state, setState] = useState<CreateState>({
    cameraReference: useRef<Camera>(null)
  });
  
  const [CameraPermission, requestCameraPermission] = Camera.useCameraPermissions();
  //navigation won't work with props unless i specify type of navigation prop
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const setCameraState = (cameraState:boolean) => setState({...state, cameraEnabled: cameraState});


  useEffect(() => {
    (async () => {
      if ((await requestMediaLibraryPermissionsAsync()).status !== "granted")
        alert("Sorry, Camera roll permissions are required.");
      else if((await requestCameraPermission()).granted)
        alert("Sorry, Storage permissions are required.");
    })();
  }, []);


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
        <CustomHeader title="Select Image" />
    <SafeAreaView style={styles.viewArea}>
      <View style={styles.ImageContainer}>
        <>
        {state.photo 
          ? (<Image source={{ uri: state.photo }}  style={styles.imageStyle}/>) 
          : (<>
            {state.cameraEnabled && CameraPermission 
              ? (<Camera style={styles.camera} type={CameraType.back} ref={state.cameraReference} />)
              : (<Text style={styles.imageText}>No image selected</Text>)
            }
            </>)
        }

        </>
      </View>

      <View style={styles.buttonContainer}>
      {!state.cameraEnabled ? (
        <TouchableOpacity style={styles.button}onPress={() => {
          setCameraState(true), requestCameraPermission();
        }}>
        <Text style={styles.buttonText}>Open camera</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.button} onPress={async () => {
          if(state.cameraReference.current)
          {

            setCameraState(true);
            await takeCameraPicture(state.cameraReference.current, (uri) =>  setState({...state, photo: uri, cameraEnabled: false}));
          }
          else alert("No camera permissions...");
        }}>
        <Text style={styles.buttonText}>"Take Picture"</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity style={styles.button} onPress={chooseImageFromLibrary((uri) => setState({...state, photo: uri}))}>
      <Text style={styles.buttonText}>Gallery</Text>
      </TouchableOpacity>
      {state.photo ? (
        <TouchableOpacity style={styles.button} onPress={() => {
          navigation.navigate("Images", {uri: "https://i0.wp.com/marketbusinessnews.com/wp-content/uploads/2018/04/Ullage.jpg?fit=776%2C659&ssl=1"});
        }}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      ) : (
        <></>
      )}
      </View>
      </SafeAreaView>
      </LinearGradient>
    </>
  );
};

const styles = StyleSheet.create({
  camera:{
    flex:1,
    width: Dimensions.get("window").width*.5,
    height: Dimensions.get("window").width*.5
  },
  button:{
    alignItems:"center",
    justifyContent:"center",
    paddingVertical:12,
    paddingHorizontal:32,
    borderRadius:4,
    elevation:3,
    backgroundColor:"rgba(0,100,100,0.7)", 
    marginTop:8
  },
  buttonText:{
    fontSize:16,
    lineHeight:21,
    fontWeight:'bold',
    letterSpacing:0.25,
    color:'white',
    minWidth:"20%",
    maxWidth:"30%",
    textAlign:"center"
  },
  buttonContainer:{
    top:"20%",
    justifyContent:"center",
    alignItems:"center",
    display:"flex"
  },
  ImageContainer:{
    marginTop:"25%",
    maxWidth:"90%",
    minWidth:"60%",
    minHeight:"20%",
    maxHeight:"40%",
    justifyContent:"center",
    alignItems:"center",
    alignContent:"center",
  },
  imageStyle:{
    borderColor:"rgba(0,0,0,0.4)",
    borderWidth:7,
    borderRadius:14,
    backgroundColor:"black",
    borderStyle:"solid",
    resizeMode:"contain",
    minHeight:"70%",
    minWidth:"90%",
    maxHeight:"100%",
    maxWidth:"80%",
    paddingTop:"60%",

  },
  imageText:{
    marginTop:50,
    color:"rgba(0,0,0,0.5)",
    fontSize:30,
    fontWeight:"bold",
    letterSpacing:0.25,
    lineHeight:50,
    textAlign:"center",
    display:"flex",
  },
  viewArea:{
    marginTop:100,
    flex:1,
    alignContent:"center",
    alignItems:"center",
  },
  gradient: {
    flex:2,
    justifyContent:"center",
    alignItems:"center",
    paddingTop:Constants.statusBarHeight,
    padding:0,
  },
  
}
)
export default Create;
