import React from "react";
import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Image,
} from "react-native";
import colors from "../config/colors";
import Text from "./Text";

function FoodItem({ title, subtitle, arrival, image, onPress }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={image} resizeMode="cover" />
          <View style={styles.arrival}>
            <Text style={styles.arrivalText}>{arrival}</Text>
          </View>
        </View>

        <View style={styles.infoContainer}>
          <Text style={{ fontSize: 20 }}>Burgers Story</Text>
          <Text style={{ fontSize: 15, fontFamily: "OpenSans_400Regular" }}>
            4.7 Burgers . Snacks . $$$
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  infoContainer: {
    height: 80,
    //backgroundColor: "red",
  },
  imageContainer: {
    backgroundColor: "lightblue",
    width: "100%",
    height: 165,
    borderRadius: 40,
    marginBottom: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
  },
  container: {
    //backgroundColor: 'yellow'
  },
  detailsContainer: {
    padding: 20,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  subtitle: {
    color: colors.secondary,
    fontWeight: "bold",
  },
  title: {
    marginBottom: 7,
  },
  arrival: {
    height: 50,
    width: 135,
    backgroundColor: "white",
    position: "absolute",
    bottom: -5,
    left: 0,
    alignItems: "center",
    justifyContent: "center",
    borderTopRightRadius: 30,
  },
  arrivalText: {
    fontSize: 15,
    fontFamily: "Roboto_500Medium",
  },
});

export default FoodItem;
