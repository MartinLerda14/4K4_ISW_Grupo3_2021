import Constants from "expo-constants";
import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";

function Screen({ children, separate, color, style }) {
  const extra = {
    paddingTop: separate ? Constants.statusBarHeight : null,
    backgroundColor: separate ? color : null,
  };
  return (
    <SafeAreaView style={[{ flex: 1 }, extra]}>
      <View style={[{ flex: 1 }, style]}>{children}</View>
    </SafeAreaView>
  );
}
export default Screen;
