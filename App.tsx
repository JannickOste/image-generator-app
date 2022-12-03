import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { CreateNavigator } from "./Components/Stack.navigator";
import Home from "./Components/Home";
import Images from "./Components/Images";

export default function App() {
  const Tab = createBottomTabNavigator();
  return (
    <>
     <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Create" component={CreateNavigator}  />
          <Tab.Screen name="Images" component={Images} />
        </Tab.Navigator>
  </NavigationContainer>
    </>
  );
}
