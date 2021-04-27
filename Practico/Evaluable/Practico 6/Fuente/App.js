import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { StyleSheet } from "react-native";
import "react-native-gesture-handler";
import HomeScreen from "./app/screens/HomeScreen";
import LoQueSeaScreen from "./app/screens/LoQueSeaScreen";
import FontTest from "./app/screens/FontTest";
import DatePicker from "./app/components/DatePicker";

import navigationTheme from "./app/navigation/navigationTheme";
import OkScreen from "./app/screens/OkScreen";

export default function App() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="LoQueSea" component={LoQueSeaScreen} />
        <Stack.Screen name="OkScreen" component={OkScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
