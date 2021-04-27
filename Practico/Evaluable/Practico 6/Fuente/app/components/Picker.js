import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import PickerItem from "./PickerItem";
import ScrollView from "./ScrollView";
import Text from "./Text";
import FontLoader from "./FontLoader";
import { FontAwesome5 } from "@expo/vector-icons";
import Button from "./Button";

const Picker = ({
  placeholder,
  items,
  selectedItem,
  onSelectItem,
  viewStyle,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <FontLoader>
      <View style={styles.centeredView}>
        <Modal
          animationType="none"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            console.log("close!");
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              {items && (
                <FlatList
                  data={items}
                  keyExtractor={(item) => item.label}
                  renderItem={({ item }) => (
                    <PickerItem
                      label={item.label}
                      value={item.value}
                      onPress={() => {
                        setModalVisible(false);
                        onSelectItem(item);
                      }}
                    />
                  )}
                ></FlatList>
              )}
              <Button
                title="Cerrar"
                buttonStyle={{backgroundColor: "#2A9D8F"}}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              />
            </View>
          </View>
        </Modal>
        <TouchableOpacity
          style={[styles.selector, viewStyle]}
          onPress={() => {
            setModalVisible(true);
          }}
        >
          <FontAwesome5 name="chevron-down" size={15} color="#8b9199" />
        </TouchableOpacity>
      </View>
    </FontLoader>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  modalView: {
    margin: 20,
    height: 300,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  close: {
    backgroundColor: "#2196F3",
    borderRadius: 30,
    padding: 10,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  selector: {
    backgroundColor: "#F4A26115",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 30,
    height: 30,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  placeholder: {
    color: "#8b9199",
    width: "100%",
  },
});

export default Picker;
