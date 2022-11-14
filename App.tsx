import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomePage, CreatePage, ImagesPage } from "./Components/Stack.navigator";
import EditImage from "./Components/EditImage";

export default function App() {
  
  const Tab = createBottomTabNavigator();
  return (
    <>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={HomePage} />
          <Tab.Screen name="Create" component={CreatePage}  />
          <Tab.Screen name="Images" component={ImagesPage} />
          <Tab.Screen name="EditImage" component={EditImage} />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
