import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import Text from "./Text";
import RadioButton from "./RadioButton";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

function RadioSelector({ items, selectedItem, onSelectItem }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.label}
        renderItem={({ item }) => (
          <TouchableWithoutFeedback
            onPress={() => {
              onSelectItem(item);
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <RadioButton active={item === selectedItem} />
              <Text>{item.label}</Text>
            </View>
          </TouchableWithoutFeedback>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default RadioSelector;
