import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Text from "./Text";

function Button({ title, onPress, buttonStyle, textStyle }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.button, buttonStyle]}>
        <Text style={[styles.text, textStyle]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#2196F3",
    borderRadius: 30,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
  },
});

export default Button;
