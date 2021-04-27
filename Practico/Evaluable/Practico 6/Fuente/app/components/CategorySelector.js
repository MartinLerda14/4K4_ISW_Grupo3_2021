import React from "react";
import { View, StyleSheet, ScrollView, Text, FlatList } from "react-native";
import CategoryItem from "../components/CategoryItem";
import colors from "../config/colors";

function CategorySelector({navigation}) {
  const getCategoryItems = () => [
    <View
      key={1}
      style={{
        height: 300,
        backgroundColor: colors.transparent,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CategoryItem
        title="Lo que sea"
        image={require("../assets/icons8-doughnut-48.png")}    
        onPress={() => navigation.navigate("LoQueSea")}
      />
    </View>,
    <View
      key={2}
      style={{
        height: 300,
        backgroundColor: colors.transparent,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CategoryItem
        title="Burgers"
        active
        image={require("../assets/icons8-hamburger-48.png")}
      />
    </View>,
    <View
      key={3}
      style={{
        height: 300,
        backgroundColor: colors.transparent,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CategoryItem
        title="Pizza"
        image={require("../assets/icons8-pizza-48.png")}
      />
    </View>,
    <View
      key={4}
      style={{
        height: 300,
        backgroundColor: colors.transparent,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CategoryItem
        title="Ensaladas"
        image={require("../assets/icons8-green-salad-48.png")}
      />
    </View>,
    <View
      key={5}
      style={{
        height: 300,
        backgroundColor: colors.transparent,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CategoryItem
        title="Bebidas"
        image={require("../assets/icons8-milkshake-48.png")}
      />
    </View>,
  ];

  return (
    <View style={styles.container}>
      <View style={styles.aux}>
        <FlatList
          data={getCategoryItems()}
          keyExtractor={(item) => item.key}
          renderItem={({ item, index }) => item}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 150,
    width: "100%",
    backgroundColor: colors.transparent,
    flexDirection: "row",
    alignItems: "center",
    // shadows clip workaround
    elevation: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  aux: {
    backgroundColor: colors.transparent,
    height: 300,
    //borderWidth: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CategorySelector;
