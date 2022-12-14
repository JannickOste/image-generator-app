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
        <Stack.Screen name="create image" component={Create} options={{headerShown:false}}/>
        <Stack.Screen name="Images" component={Images} options={{headerShown:false}}/>
    </Stack.Navigator>
    )

  }

export const HomeNavigator=()=>{
  const Stack = createNativeStackNavigator();
  return (
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{headerShown:false}}/>
        <Stack.Screen name="Create" component={Create} options={{headerShown:false}}/>
        <Stack.Screen name="Images" component={History} options={{headerShown:false}}/>
        <Stack.Screen name="Generate" component={Images} options={{headerShown:false}}/>
      </Stack.Navigator>
  )
}
export const GenerateNavigator=()=>{
  const Stack = createNativeStackNavigator();
  return (
        <Stack.Navigator>
          <Stack.Screen name="Generate" component={Images} options={{headerShown:false}}/>
        </Stack.Navigator>

  )
}
export const HistoryNavigator=()=>{
  const Stack = createNativeStackNavigator();
  return (
        <Stack.Navigator>
          <Stack.Screen name="History" component={History} options={{headerShown:false}}/>
        </Stack.Navigator>

  )
}