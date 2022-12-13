import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { CreateNavigator, GenerateNavigator, HistoryNavigator, HomeNavigator } from "./Components/Stack.navigator";
import Home from "./Components/pages/Home";
import Images from "./Components/pages/Images";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons } from '@expo/vector-icons';
export default function App() {
  const Tab = createBottomTabNavigator();
  return (
    <>
     <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Welcome" component={HomeNavigator} options={{ 
            tabBarIcon:()=>(
              <MaterialCommunityIcons 
                name="home" 
                size={30} 
                color="rgba(0,100,100,0.7)"/>),}} />
          <Tab.Screen name="Create" component={CreateNavigator} options={{
            tabBarIcon:()=>(
                <MaterialCommunityIcons
                  name="camera"
                  size={30}
                  color="rgba(0,100,100,0.7)"/>),
          }} />
          <Tab.Screen name="Generate" component={GenerateNavigator} options={{
            tabBarIcon:()=>(
              <MaterialCommunityIcons
                name="image"
                size={30}
                color="rgba(0,100,100,0.7)"/>),
            }}/>
            
          <Tab.Screen name="History" component={HistoryNavigator} options={{
            tabBarIcon:()=>(
              <MaterialCommunityIcons
                name="image"
                size={30}
                color="rgba(0,100,100,0.7)"/>),
            }}/>
        </Tab.Navigator>
  </NavigationContainer>
    </>
  );
}
