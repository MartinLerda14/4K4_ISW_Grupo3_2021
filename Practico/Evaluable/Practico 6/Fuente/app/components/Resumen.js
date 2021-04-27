import React, { useState } from "react";
import FontLoader from "./FontLoader";
import Text from "./Text";
import Modal from "react-native-modal";
import Button from "./Button";
import { StyleSheet, View } from "react-native";

function Resumen({ visible, onConfirmar, onCancelar, data }) {
  return (
    <View>
      <Modal isVisible={visible}>
        <FontLoader>
          <View style={styles.modal}>
            <Text>¿Confirmar Pedido?</Text>
            <Text>Buscar en:</Text>
            <Text>
              {data.ciudad},{data.calle},{data.nro}
            </Text>
            <Text>Entregar en:</Text>
            <Text>
              {data.ciudad2},{data.calle2},{data.nro2}
            </Text>

            <Text>Fecha entrega:</Text>
            <Text>
              {data.fecha ? data.fecha + " " + data.hora : "Lo antes posible"}
            </Text>
            <Text>Método pago:</Text>
            <Text>
              {data.nroTarjeta
                ? "Tarjeta:\n" + data.nroTarjeta + "\nTitular:\n" + data.titular
                : "Efectivo\n" +
                  (Number.parseFloat(data.$) + 100) +
                  " (incluye envío)"}
            </Text>
            <View style={styles.botones}>
              <Button
                title="Cancelar"
                onPress={onCancelar}
                buttonStyle={{ backgroundColor: "#8d98a1" }}
              />
              <Button title="Confirmar" onPress={onConfirmar} buttonStyle={{backgroundColor: "#2A9D8F"}}/>
            </View>
          </View>
        </FontLoader>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
  },
  botones: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
});

export default Resumen;
