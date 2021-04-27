import React, { useState } from "react";
import FontLoader from "./FontLoader";
import Text from "./Text";
import Modal from "react-native-modal";
import Button from "./Button";
import { StyleSheet, View } from "react-native";

function PopUp({ visible, onOk, mensaje }) {
  return (
    <View>
      <Modal isVisible={visible}>
        <FontLoader>
          <View style={styles.modal}>
            <Text style={{color: "white"}}>{mensaje}</Text>          
            <View style={styles.botones}>             
              <Button title="OK" onPress={onOk} buttonStyle={{width: 100, backgroundColor: "#2A9D8F"}}/>
            </View>
          </View>
        </FontLoader>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "#E76F51",
    borderRadius: 10,
    padding: 15,    
  },
  botones: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginTop: 20,
  },
});

export default PopUp;
