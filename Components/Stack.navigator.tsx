import * as React from "react";
import Create from "./Create";
import EditImage from "./EditImage";
export type RootStackParamList = {
  EditImage:{uri:string}|undefined;
}
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Home";
import Images from "./Images";


export const CreateNavigator = ()=>{
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
        <Stack.Screen name="CreateImage" component={Create}/>
        <Stack.Screen name="EditImage" component={EditImage}/>
    </Stack.Navigator>)
}
export const HomeNavigator=()=>{
  const Stack = createNativeStackNavigator();
  return (
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="Create"component={Create}/>
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