import React from "react";
import { Text, StyleSheet } from "react-native";
import FontLoader from "../components/FontLoader";

export default function App({ children, style, ...otherProps }) {
  return (
    <FontLoader>
      <Text style={[styles.defaultStyle, style]} {...otherProps}>
        {children}
      </Text>
    </FontLoader>
  );
}

const styles = StyleSheet.create({
  defaultStyle: {
    fontSize: 18,
    fontFamily: "Roboto_500Medium",
  },
});
