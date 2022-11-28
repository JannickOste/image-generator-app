import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { Button, Image, StyleSheet, Touchable, TouchableOpacity, View} from "react-native";
import React, { Fragment, useEffect, useState, } from "react";
import * as ImagePicker from "expo-image-picker";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {useNavigation} from "@react-navigation/native"
import { RootStackParamList } from "./Stack.navigator";
import { SafeAreaView } from "react-navigation";
import Constants from 'expo-constants';
import { PressableOpacity } from "react-native-pressable-opacity";

const Create = () => {
  const [photo, setPhoto] = useState<string | null>(null);
  const [CameraPermission, requestCameraPermission] = Camera.useCameraPermissions();
  const [CameraOn, setCameraOn] = useState(false);
  //navigation won't work with props unless i specify type of navigation prop
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      requestCameraPermission;
      if (status !== "granted")
        alert("Sorry, Camera roll permissions are required.");
    })();
  }, []);
  const cameraRef = React.useRef<Camera>(null);
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
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
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
      {photo && !CameraOn ? (
        <Image source={{ uri: photo }} resizeMode="contain"  style={{ flex: 1 ,resizeMode:"contain" ,justifyContent:"center", width:"70%"}} />
      ) : (
        <></>
      )}
      {CameraOn && CameraPermission ? (
        <Camera style={{ flex: 1 }} type={CameraType.back} ref={cameraRef} />
      ) : (
        <></>
      )}

      <View style={styles.buttonContainer}>
      {!CameraOn ? (
        <TouchableOpacity style={styles.button}>
        <Button
          title="Open camera"
          onPress={() => {
            console.log(CameraOn);
            setCameraOn(true), requestCameraPermission;
          }}
        />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.button}>
        <Button
          title="Take Picture"
          onPress={async () => {
            await takePicture();
            setCameraOn(false);
          }}
        />
        </TouchableOpacity>
      )}
       <PressableOpacity style={styles.button}><Button title="Gallery" onPress={chooseImg} /></PressableOpacity>
      {photo ? (
        <TouchableOpacity style={styles.button}>
        <Button 
          title="Continue!"
          onPress={() => {
            navigation.navigate("EditImage",{uri:photo});
          }}
        />
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
  button:{
    width:300,
    height:50,
    borderRadius:50,
    fontSize:25,
    margin:10
  },
  buttonContainer:{
    padding:10,
    top:1300,
    width:'80%',
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    display:"flex"
  }
}
)
export default Create;
