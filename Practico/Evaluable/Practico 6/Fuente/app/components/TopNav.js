import React from "react";
import { View, StyleSheet } from "react-native";
import colors from "../config/colors";
import { FontAwesome5 } from "@expo/vector-icons";
import Text from "./Text";

function Nav({
  leftIcon,
  rightIcon,
  leftAction,
  rightAction,
  location,
  title,
}) {
  return (
    <View style={styles.container}>
      <FontAwesome5
        name={leftIcon}
        size={22}
        color="black"
        style={{ position: "absolute", left: 10 }}
        onPress={leftAction}
      />
      {location && (
        <View style={styles.location}>
          <Text
            style={{
              paddingHorizontal: 31,
              fontSize: 14,
              top: 3,
              maxWidth: 250,
            }}
            numberOfLines={1}
          >
            Calle Av. Unión 48
          </Text>
        </View>
      )}
      {title && (
        <Text
          style={{ paddingHorizontal: 10, fontSize: 20, top: 3, maxWidth: 300 }}
          numberOfLines={1}
        >
          {title}
        </Text>
      )}
      <FontAwesome5
        name={rightIcon}
        size={21}
        color="black"
        style={{ position: "absolute", right: 10 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  location: {
    backgroundColor: colors.light,
    height: 43,
    borderRadius: 25,
    justifyContent: "center",
  },
  title: {
    
  },
});

export default Nav;
