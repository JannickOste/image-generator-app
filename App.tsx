import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { CreateNavigator } from "./Components/Stack.navigator";
import Home from "./Components/pages/Home";
import Images from "./Components/pages/Images";
import { HomePage, CreatePage, ImagesPage, HistoryPage } from "./Components/Stack.navigator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons } from '@expo/vector-icons';
export default function App() {
  const Tab = createBottomTabNavigator();
  return (
    <>
     <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={Home} options={{ 
            tabBarIcon:()=>(
              <MaterialCommunityIcons 
                name="home" 
                size={26} 
                color="black"/>),}} />
          <Tab.Screen name="Create" component={CreateNavigator} options={{
            tabBarIcon:()=>(
                <MaterialCommunityIcons
                  name="camera"
                  size={26}
                  color="black"/>),
          }} />
          <Tab.Screen name="Images" component={Images} options={{
            tabBarIcon:()=>(
              <MaterialCommunityIcons
                name="image"
                size={26}
                color="black"/>),
            }}/>
        </Tab.Navigator>
  </NavigationContainer>
    </>
  );
}
