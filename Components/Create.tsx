import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { Button, Image,} from "react-native";
import React, { Fragment, useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {useNavigation} from "@react-navigation/native"
import { RootStackParamList } from "./Stack.navigator";
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
      {photo && !CameraOn ? (
        <Image source={{ uri: photo }} style={{ flex: 1 ,resizeMode:"contain" ,justifyContent:"center"}} />
      ) : (
        <></>
      )}
      {CameraOn && CameraPermission ? (
        <Camera style={{ flex: 1 }} type={CameraType.back} ref={cameraRef} />
      ) : (
        <></>
      )}
      {!CameraOn ? (
        <Button
          title="Open camera"
          onPress={() => {
            console.log(CameraOn);
            setCameraOn(true), requestCameraPermission;
          }}
        />
      ) : (
        <Button
          title="Take Picture"
          onPress={async () => {
            await takePicture();
            setCameraOn(false);
          }}
        />
      )}
      <Button title="Gallery" onPress={chooseImg} />
      {photo ? (
        <Button
          title="Continue!"
          onPress={() => {
            navigation.navigate("EditImage",{uri:photo});
          }}
        />
      ) : (
        <></>
      )}
    </>
  );
};
export default Create;
