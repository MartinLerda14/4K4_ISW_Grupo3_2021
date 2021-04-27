import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import FoodItem from "../components/FoodItem";
import colors from "../config/colors";

function FoodList(props) {
  const foodItems = [
    <FoodItem
      arrival="25-30 min"
      image={require("../assets/hamburguesas.jpg")}
      key={1}
    />,
    <FoodItem
      arrival="20-25 min"
      image={require("../assets/pizza.jpg")}
      key={2}
    />,
    <FoodItem
      arrival="15 min"
      image={require("../assets/empanadas.jpg")}
      key={3}
    />,
    <FoodItem
      arrival="35-45 min"
      image={require("../assets/sushi.jpg")}
      key={4}
    />,
    <FoodItem
      arrival="35 min"
      image={require("../assets/pizzas.jpg")}
      key={5}
    />,
  ];

  const getFoodItems = () =>
    Array.from({ length: 5 }, (v, i) => {
      const url = "https://picsum.photos/536/354/?q=" + Math.random();
      return (
        <FoodItem
          arrival="25-30 min"
          imageUrl={url}
          thumbnailUrl={url}
          key={i}
        />
      );
    });

  return (
    <View style={styles.container}>
      <FlatList
        data={foodItems}
        keyExtractor={(item) => item.key}
        renderItem={({ item, index }) => item}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
    backgroundColor: colors.transparent,
  },
});
export default FoodList;
