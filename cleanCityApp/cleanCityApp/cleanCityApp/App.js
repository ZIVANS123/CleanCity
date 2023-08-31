import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import SignUpScreen from "./screens/SignUpScreen";
import SignInScreen from "./screens/SignInScreen";
import StartScreen from "./screens/StartScreen";
import MenuScreen from "./screens/MenuScreen";
import MapScreen from "./screens/MapScreen";
import MyEventScreen from "./screens/MyEventScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//export default function App() {
//return <StartScreen></StartScreen>;
//}
const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="StartScreen" component={StartScreen} />
        <Stack.Screen name="SignInScreen" component={SignInScreen} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        <Stack.Screen name="MenuScreen" component={MenuScreen} />
        <Stack.Screen name="MapScreen" component={MapScreen} />
        <Stack.Screen name="MyEventScreen" component={MyEventScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default MyStack;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
