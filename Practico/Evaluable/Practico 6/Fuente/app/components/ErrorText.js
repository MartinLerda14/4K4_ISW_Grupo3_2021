import React from "react";
import { StyleSheet } from "react-native";
import Text from "./Text";

function ErrorText({ children, ...otherProps }) {
  return (
    <Text style={styles.text} {...otherProps}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: { color: "red", fontSize: 15 },
});

export default ErrorText;
