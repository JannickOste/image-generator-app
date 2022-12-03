import * as React from "react";
import Create from "./Create";
//import EditImage from "./EditImage";
//  EditImage:{uri:string}|undefined;
export type RootStackParamList = {
  editimage:APIImageProps
}
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Home";
import Images from "./Images";
import ImageCreator, { APIImageProps } from "./ImageCreator";
export const CreateNavigator = ()=>{
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
        <Stack.Screen name="chooseimage" component={Create}/>
        <Stack.Screen name="editimage">{() => <ImageCreator width={255} height={255}/>}</Stack.Screen>
    </Stack.Navigator>
    )

}
export const HomeNavigator=()=>{
  const Stack = createNativeStackNavigator();
  return (
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="Create" component={Create}/>
        <Stack.Screen name="Images" component={Images}/>
      </Stack.Navigator>
  )
}
export const ImagesNavigator=()=>{
  const Stack = createNativeStackNavigator();
  return (
        <Stack.Navigator>
          <Stack.Screen name="Images" component={Images}/>
          <Stack.Screen name="Home" component={Home}/>
        </Stack.Navigator>

  )
}