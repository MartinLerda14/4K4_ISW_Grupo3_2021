import React from "react";
import { View, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Text from "../components/Text";
import FontLoader from "../components/FontLoader";

function OkScreen() {
  return (
    <View style={styles.container}>
      <FontAwesome name="check-circle" size={100} color="green" />
      <FontLoader>
        <Text>¡Tu pedido fue confirmado!</Text>
      </FontLoader>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default OkScreen;
