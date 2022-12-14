import 'react-native-gesture-handler';
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { CreateNavigator, GenerateNavigator, HistoryNavigator, HomeNavigator } from "./Components/Stack.navigator";
import Home from "./Components/pages/Home";
import Images from "./Components/pages/Images";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StatusBar, View ,Text, Dimensions} from 'react-native';
import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';
export default function App() {
  const Tab = createBottomTabNavigator();
  const theme = {
    ...DefaultTheme,
    colors:{
      ...DefaultTheme.colors,
      background:"rgba(0,0,0,0.0)",
      
    },
  };
  return (
    <>
      <StatusBar hidden={false}/>
     <NavigationContainer theme={theme}>
        <Tab.Navigator
         
                      >
          <Tab.Screen name="Welcome" component={HomeNavigator} options={{ 
            tabBarIcon:()=>(
              <MaterialCommunityIcons 
                name="home" 
                size={30} 
                color="rgba(0,100,100,0.7)"/>),
                headerShown:false}} />
          <Tab.Screen name="Create" component={CreateNavigator} options={{
            tabBarIcon:()=>(
                <MaterialCommunityIcons
                  name="camera"
                  size={30}
                  color="rgba(0,100,100,0.7)"/>),
                  headerShown:false
          }} />
          <Tab.Screen name="Generate" component={GenerateNavigator} options={{
            tabBarIcon:()=>(
              <MaterialCommunityIcons
                name="image"
                size={30}
                color="rgba(0,100,100,0.7)"/>),
                headerShown:false
            }}/>
            
          <Tab.Screen name="History" component={HistoryNavigator} options={{
            tabBarIcon:()=>(
              <MaterialCommunityIcons
                name="image"
                size={30}
                color="rgba(0,100,100,0.7)"/>),
                headerShown:false
            }}/>
        </Tab.Navigator>
  </NavigationContainer>

    </>
  );
}