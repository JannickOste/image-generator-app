import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { Button, Image, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
const Create = () => {
  const [photo, setPhoto] = useState<string | null>(null);
  const [CameraPermission, requestCameraPermission] =
    Camera.useCameraPermissions();
  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      requestCameraPermission;
      if (status !== "granted")
        alert("Sorry, Camera roll permissions are required.");
    })();
  }, []);
  const [CameraOn, setCameraOn] = useState(false);
  const cameraRef = React.useRef<Camera>(null);
  const takePicture = async () => {
    if (cameraRef.current) {
      await cameraRef.current
        .takePictureAsync({ quality: 1, exif: false })
        .then(async (photo) => {
          console.log(photo.uri);
          await MediaLibrary.saveToLibraryAsync(photo.uri);
          setPhoto(photo.uri);
          setCameraOn(false);
        });
    }
  };
  const chooseImg = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [3, 3],
      quality: 1,
      allowsEditing: true,
    });
    if (!result.cancelled) {
      setPhoto(result.uri);
    }
  };
  return (
    <>
      {photo && !CameraOn ? (
        <Image source={{ uri: photo }} style={{ flex: 1 }} />
      ) : (
        <Camera style={{ flex: 1 }} type={CameraType.back} ref={cameraRef} />
      )}
      {!CameraOn ? (
        <Button
          title="Open camera"
          onPress={() => {
            setCameraOn(true), requestCameraPermission;
          }}
        />
      ) : (
        <Button
          title="Take Picture"
          onPress={async () => {
            await takePicture();
            setCameraOn(!CameraOn);
          }}
        />
      )}
      <Button title="Gallery" onPress={chooseImg} />
      {photo ? (
        <Button
          title="Make me some Art!"
          onPress={() => {
            console.log("do something with this image");
          }}
        />
      ) : (
        <></>
      )}
    </>
  );
};
export default Create;
