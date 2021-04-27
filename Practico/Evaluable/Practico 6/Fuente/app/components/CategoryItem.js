import React from "react";
import { View, StyleSheet, Image } from "react-native";
import Text from "../components/Text";
import colors from "../config/colors";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

function CategoryItem({ title, image, active, onPress }) {
  active = false; // quick fix
  const color_item = active ? colors.orange : colors.white;
  const color_title = active ? colors.white : colors.dark;
  const color_circle = active ? colors.white : colors.circle_grey;

  return (
    <TouchableWithoutFeedback style={[styles.container, { backgroundColor: color_item }]} onPress={onPress}>
      <View style={[styles.circle, { backgroundColor: color_circle }]}>
        <Image style={styles.image} source={image}></Image>
      </View>
      <Text style={[styles.title, { color: color_title }]}>{title}</Text>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 125,
    width: 80,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    // shadow
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
    // shadow
    // temporal
    marginHorizontal: 10,
  },
  circle: {
    height: 60,
    width: 60,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    top: -10,
  },
  title: {
    fontSize: 13,
  },
  image: {
    height: 35,
    width: 35,
  },
});

export default CategoryItem;
