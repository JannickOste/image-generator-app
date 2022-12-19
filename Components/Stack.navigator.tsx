import * as React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Create from "./pages/Create";
import Home from "./pages/Home";
import Images from "./pages/Images";
import History from "./pages/History";
import ImageGenerator, { APIImageProps } from "./ImageGenerator";
import EditImage from "./EditImage";



export type RootStackParamList = {
  editimage:APIImageProps
}
export const CreateNavigator = ()=>{
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
        <Stack.Screen name="create image" component={Create}/>
        <Stack.Screen name="Images" component={EditImage}/>
    </Stack.Navigator>
    )

  }

export const HomeNavigator=()=>{
  const Stack = createNativeStackNavigator();
  return (
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="Create" component={Create}/>
        <Stack.Screen name="Images" component={History}/>
        <Stack.Screen name="Generate" component={Images}/>
      </Stack.Navigator>
  )
}
export const GenerateNavigator=()=>{
  const Stack = createNativeStackNavigator();
  return (
        <Stack.Navigator>
          <Stack.Screen name="GenerateImage" component={Images}/>
        </Stack.Navigator>

  )
}
export const HistoryNavigator=()=>{
  const Stack = createNativeStackNavigator();
  return (
        <Stack.Navigator>
          <Stack.Screen name="History" component={History}/>
        </Stack.Navigator>

  )
}