import React from "react";
import { StyleSheet, View, BackHandler } from "react-native";
import Screen from "../components/Screen";
import Text from "../components/Text";
import CategorySelector from "../components/CategorySelector";
import TopNav from "../components/TopNav";
import FoodList from "../components/FoodList";
import colors from "../config/colors";
import Modal from "react-native-modal";

function HomeScreen({ navigation }) {
  return (
    <Screen separate style={styles.screen}>
      <View style={styles.top}>
        <TopNav leftIcon="map-marker-alt" rightIcon="shopping-cart" location />
      </View>
      <View style={styles.message}>
        <Text
          style={{
            fontSize: 30,
            lineHeight: 35,
            fontFamily: "OpenSans_600SemiBold",
            // temporal
            marginBottom: 15,
            marginTop: 25,
          }}
        >
          ¿Qué querés hoy?
        </Text>
      </View>
      <CategorySelector navigation={navigation} />
      <View style={styles.list}>
        <FoodList />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.transparent,
  },
  message: {
    backgroundColor: colors.transparent,
    paddingHorizontal: 20,
  },
  top: {
    paddingHorizontal: 20,
  },
  list: {
    paddingHorizontal: 20,
    flex: 1,
  },
});

export default HomeScreen;
