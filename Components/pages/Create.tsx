import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { Image, StyleSheet, TouchableOpacity, View,Text} from "react-native";
import React, {useEffect, useState,useRef,  } from "react";
import {launchImageLibraryAsync,MediaTypeOptions, requestMediaLibraryPermissionsAsync} from "expo-image-picker";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {useNavigation} from "@react-navigation/native"
import { RootStackParamList } from "../Stack.navigator";
import { SafeAreaView } from "react-navigation";

const Create = () => {
  const [photo, setPhoto] = useState<string | null>(null);
  const [CameraPermission, requestCameraPermission] = Camera.useCameraPermissions();
  const [CameraOn, setCameraOn] = useState(false);
  //navigation won't work with props unless i specify type of navigation prop
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  useEffect(() => {
    (async () => {
      const { status } =
        await requestMediaLibraryPermissionsAsync();
      requestCameraPermission;
      if (status !== "granted")
        alert("Sorry, Camera roll permissions are required.");
    })();
  }, []);
  const cameraRef = useRef<Camera>(null);
  const takePicture = async () => {
    if (cameraRef.current) {
      await cameraRef.current
        .takePictureAsync({ quality: 1, exif: false })
        .then(async (photo) => {
          await MediaLibrary.saveToLibraryAsync(photo.uri);
          setPhoto(photo.uri);
          setCameraOn(false);
        });
    }
  };
  const chooseImg = async () => {
    let result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      quality: 0.5,
      allowsEditing: true,
    });
    if (!result.cancelled) {
      setPhoto(result.uri);
      console.log(photo)
    }
  };
  return (
    <>
    <SafeAreaView style={styles.viewArea}>
      <View style={styles.ImageContainer}>
      {photo ? (
        <Image source={{ uri: photo }}  style={styles.imageStyle}/>
      ) : (
        <Text style={styles.imageText}>No image selected</Text>
      )}
      {CameraOn && CameraPermission ? (
        <Camera style={styles.camera} type={CameraType.back} ref={cameraRef} />
      ) : (
        <></>
      )}
      </View>
      <View style={styles.buttonContainer}>
      {!CameraOn ? (
        <TouchableOpacity style={styles.button}onPress={() => {
          console.log(CameraOn);
          setCameraOn(true), requestCameraPermission;
        }}>
        <Text style={styles.buttonText}>Open camera</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.button} onPress={async () => {
          await takePicture();
          setCameraOn(false);
        }}>
        <Text style={styles.buttonText}>"Take Picture"</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity style={styles.button} onPress={chooseImg}>
      <Text style={styles.buttonText}>Gallery</Text>
      </TouchableOpacity>
      {photo ? (
        <TouchableOpacity style={styles.button} onPress={() => {
          navigation.navigate("editimage",{width:255,height:255});
        }}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      ) : (
        <></>
      )}
      </View>
      </SafeAreaView>
      
    </>
  );
};

const styles = StyleSheet.create({
  camera:{
flex:1
  },
  button:{
    alignItems:"center",
    justifyContent:"center",
    paddingVertical:12,
    paddingHorizontal:32,
    borderRadius:4,
    elevation:3,
    backgroundColor:"rgba(0,100,100,0.7)", 
    marginTop:10
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
    top:"70%",
    justifyContent:"center",
    alignItems:"center",
    display:"flex"
  },
  ImageContainer:{
    marginTop:"20%",
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
    alignContent:"center",
    alignItems:"center",
  }
  
}
)
export default Create;
