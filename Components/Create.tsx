import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { Image, StyleSheet, TouchableOpacity, View,Text} from "react-native";
import React, {useEffect, useState,useRef } from "react";
import {launchImageLibraryAsync,MediaTypeOptions, requestMediaLibraryPermissionsAsync} from "expo-image-picker";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {useNavigation} from "@react-navigation/native"
import { RootStackParamList } from "./Stack.navigator";
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
      aspect: [2, 2],
      quality: 0.2,
      allowsEditing: true,
    });
    if (!result.cancelled) {
      setPhoto(result.uri);
    }
  };
  return (
    <>
    <SafeAreaView>
      <View style={styles.ImageContainer}>
      {photo ? (
        <Image source={{ uri: photo }} />
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
          navigation.navigate("EditImage",{uri:photo});
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
    backgroundColor:"blue", 
    marginTop:10
  },
  buttonText:{
    fontSize:16,
    lineHeight:21,
    fontWeight:'bold',
    letterSpacing:0.25,
    color:'white',
    minWidth:80,
  },
  buttonContainer:{
    padding:10,
    top:"250%",
    justifyContent:"center",
    alignItems:"center",
    display:"flex"
  },
  ImageContainer:{
    width:"80%",
    justifyContent:"center",
    alignItems:"center"
    
  },
  imageStyle:{
    flex:1,
    resizeMode:'contain',
    justifyContent:"center",
    width:"70%",
  },
  imageText:{
    marginTop:50,
    color:"rgba(0,0,0,0.5)",
    fontSize:30,
    fontWeight:"bold",
    letterSpacing:0.25,
    lineHeight:50
  }
  
}
)
export default Create;
