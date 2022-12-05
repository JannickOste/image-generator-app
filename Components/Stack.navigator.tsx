import * as React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Create from "./pages/Create";
import Home from "./pages/Home";
import Images from "./pages/Images";
import History from "./pages/History";
import ImageCreator, { APIImageProps } from "./ImageCreator";



export type RootStackParamList = {
  editimage:APIImageProps
}
export const CreateNavigator = ()=>{
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
        <Stack.Screen name="Images" component={Images}/>
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
          <Stack.Screen name="History" component={History}/>
          <Stack.Screen name="Home" component={Home}/>
        </Stack.Navigator>

  )
}