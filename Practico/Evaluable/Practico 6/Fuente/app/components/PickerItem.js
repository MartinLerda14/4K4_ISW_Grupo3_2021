import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import FontLoader from "../components/FontLoader";
import Text from "./Text";
function PickerItem({ label, value, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <FontLoader>
          <Text style={styles.item}>{label}</Text>
        </FontLoader>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F4A26115",
    borderRadius: 10,
    alignItems: "center",
    padding: 15,
    marginVertical: 2,
    width: "100%",
  },
  item: {
    fontSize: 17,
    fontFamily: "Roboto_500Medium",
    alignItems: "center",
  },
});

export default PickerItem;
