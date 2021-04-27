import { yupResolver } from "@hookform/resolvers";
import dayjs from "dayjs";
import CustomParseFormat from "dayjs/plugin/customParseFormat";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Yup from "yup";
import Button from "../components/Button";
import DatePicker from "../components/DatePicker";
import ErrorText from "../components/ErrorText";
import FontLoader from "../components/FontLoader";
import Picker from "../components/Picker";
import RadioSelector from "../components/RadioSelector";
import PopUp from "../components/PopUp";
import Resumen from "../components/Resumen";
import Screen from "../components/Screen";
import ScrollView from "../components/ScrollView";
import Text from "../components/Text";
import TextInput from "../components/TextInput";
import TimePicker from "../components/TimePicker";
import TopNav from "../components/TopNav";
import colors from "../config/colors";
import useReverseGeocode from "../hooks/useReverseGeocode";

const ciudades = [
  { label: "Córdoba", value: { latitude: -31.420094, longitude: -64.188488 } },
  {
    label: "Río Ceballos",
    value: { latitude: -31.171148, longitude: -64.315589 },
  },
  {
    label: "Unquillo",
    value: { latitude: -31.234114, longitude: -64.316494 },
  },
];

const formasEntrega = [
  { label: "Lo antes posible", value: 1 },
  { label: "Programar hora", value: 2 },
];

const mediosPago = [
  { label: "Efectivo", value: 1 },
  { label: "Tarjeta", value: 2 },
];

function LoQueSeaScreen({ navigation }) {
  const [imageUri, setImageUri] = useState();
  // direccion 1
  const [coordinate, setCoordinate] = useState();
  const [address, setAddress] = useState({});
  const [selectedItem, setSelectedItem] = useState();
  // direccion 2
  const [coordinate2, setCoordinate2] = useState();
  const [address2, setAddress2] = useState({});
  const [selectedItem2, setSelectedItem2] = useState();
  //
  const [selectedFormaEntrega, setselectedFormaEntrega] = useState(
    formasEntrega[0]
  );
  const [selectedMedioPago, setselectedMedioPago] = useState(mediosPago[0]);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [timePickerVisible, setTimePickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState();
  const [selectedTime, setSelectedTime] = useState();
  const [resumenVisible, setResumenVisible] = useState(false);
  const [resumenData, setResumenData] = useState();
  const [popUpMessage, setPopUpMessage] = useState(null);

  // dirección 1
  let bindAddress = useReverseGeocode(coordinate, (newAddress) => {
    setValue("ciudad", newAddress.city, {
      shouldValidate: true,
    });
    setValue("calle", newAddress.street, {
      shouldValidate: true,
    });
    setValue("nro", newAddress.name, {
      shouldValidate: true,
    });
  });

  // dirección 2
  let bindAddress2 = useReverseGeocode(coordinate2, (newAddress) => {
    setValue("ciudad2", newAddress.city, {
      shouldValidate: true,
    });
    setValue("calle2", newAddress.street, {
      shouldValidate: true,
    });
    setValue("nro2", newAddress.name, {
      shouldValidate: true,
    });
  });

  const entrega =
    selectedFormaEntrega === formasEntrega[1]
      ? {
          fecha: Yup.string()
            .required("requerido")
            .matches(
              /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/,
              "dd/mm/aaaa"
            ),
          hora: Yup.string()
            .required("requerido")
            .matches(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/, "hh:mm"),
          combinada: Yup.boolean()
            .required("debe ser posterior a la actual")
            .oneOf([true], "debe ser posterior a la actual"),
        }
      : {};

  const pago =
    selectedMedioPago === mediosPago[0]
      ? {
          $: Yup.number()
            .required("requerido")
            .min(0, "0 - 999999")
            .max(999999, "0 - 999999")
            .typeError("requerido"),
        }
      : {
          nroTarjeta: Yup.string()
            .required("requerido")
            .matches(/^4[0-9]{12}(?:[0-9]{3})?$/, "solo visa crédito"),
          titular: Yup.string().required("requerido"),
          vencimiento: Yup.string()
            .required("requerido")
            .matches(/(0[1-9]|10|11|12)\/[2-9]{1}[0-9]{1}$/, "mm/aa")
            .test("vencida", "incorrecto", (value) => {
              dayjs.extend(CustomParseFormat);
              return dayjs(value, "MM/YY").isAfter();
            }),
          cvc: Yup.string()
            .required("requerido")
            .matches(/^[0-9]+$/, "número")
            .min(3, "3-4 dígitos")
            .max(4, "3-4 dígitos"),
        };

  const validationSchema = Yup.object().shape({
    descripcion: Yup.string().required("requerido"),
    // dirección 1
    ciudad: Yup.string().required("requerido").typeError("requerido"),
    calle: Yup.string().required("requerido").typeError("requerido"),
    nro: Yup.number().required("requerido").typeError("requerido"),
    // dirección 2
    ciudad2: Yup.string()
      .required("requerido")
      .typeError("requerido")
      .oneOf([Yup.ref("ciudad"), null], "no es la misma del comercio"),
    calle2: Yup.string().required("requerido").typeError("requerido"),
    nro2: Yup.number().required("requerido").typeError("requerido"),
    //
    ...entrega,
    ...pago,
  });

  const {
    register,
    handleSubmit,
    setValue,
    errors,
    trigger,
    getValues,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    console.log("data=", data);
    setResumenData(data);
    setResumenVisible(true);
  };

  const onChangeImage = (uri) => {
    console.log("image change!");
    setImageUri(uri);
    setValue("imagen", uri);
  };

  // dirección 1
  const handleCityChange = (event) => {
    setAddress({ ...address, city: event.nativeEvent.text });
    setValue("ciudad", event.nativeEvent.text, {
      shouldValidate: true,
    });
    trigger("ciudad2");
  };

  const handleStreetChange = (event) => {
    setAddress({ ...address, street: event.nativeEvent.text });
    setValue("calle", event.nativeEvent.text, {
      shouldValidate: true,
    });
  };

  const handleNumberChange = (event) => {
    setAddress({ ...address, name: event.nativeEvent.text });
    setValue("nro", event.nativeEvent.text, {
      shouldValidate: true,
    });
  };

  // dirección 2
  const handleCityChange2 = (event) => {
    setAddress2({ ...address2, city: event.nativeEvent.text });
    setValue("ciudad2", event.nativeEvent.text, {
      shouldValidate: true,
    });
  };

  const handleStreetChange2 = (event) => {
    setAddress2({ ...address2, street: event.nativeEvent.text });
    setValue("calle2", event.nativeEvent.text, {
      shouldValidate: true,
    });
  };

  const handleNumberChange2 = (event) => {
    setAddress2({ ...address2, name: event.nativeEvent.text });
    setValue2("nro2", event.nativeEvent.text, {
      shouldValidate: true,
    });
  };

  // dirección 1
  useEffect(() => {
    setAddress({ ...bindAddress });
    setValue("ciudad", bindAddress.city);
    setValue("calle", bindAddress.street);
    setValue("nro", bindAddress.name);
    if (getValues("ciudad2") !== undefined) trigger("ciudad2");
  }, [bindAddress]);

  // dirección 2
  useEffect(() => {
    setAddress2({ ...bindAddress2 });
    setValue("ciudad2", bindAddress2.city);
    setValue("calle2", bindAddress2.street);
    setValue("nro2", bindAddress2.name);
  }, [bindAddress2]);

  useEffect(() => {
    register("descripcion");
    register("imagen");
    // dirección 1
    register("ciudad");
    register("calle");
    register("nro");
    register("piso-depto");
    register("referencia");
    // dirección 2
    register("ciudad2");
    register("calle2");
    register("nro2");
    register("piso-depto2");
    register("referencia2");
    //
    register("fecha");
    register("hora");
    register("combinada");
    //
    register("$");
    //
    register("nroTarjeta");
    register("titular");
    register("vencimiento");
    register("cvc");
  }, [register]);

  // console.log(getValues());

  return (
    <Screen separate style={styles.screen}>
      <TopNav
        leftIcon="arrow-left"
        title={"Pedí lo que sea"}
        leftAction={() => navigation.goBack()}
      />
      <ScrollView>
        <Text
          style={{
            fontSize: 20,
            lineHeight: 35,
            fontFamily: "Roboto_500Medium",
            marginBottom: 15,
            marginTop: 25,
            color: "#E76F51"
          }}
        >
          ¿Qué necesitás?
        </Text>
        <TextInput
          placeholder="Una descripción y foto opcional"
          textAlignVertical="top"
          allowImageInput
          onChangeImage={onChangeImage}
          imageUri={imageUri}
          multiline
          viewStyle={{ height: 110 }}
          textInputStyle={{ minHeight: 55 }}
          onImageExceed= {() => setPopUpMessage("La imagen no puede superar los 5 mb")}
          onImageNotJpg = {() => setPopUpMessage("Por favor ingrese un archivo con formato .jpg")}
          onChangeText={(text) => {
            setValue("descripcion", text, {
              shouldValidate: true,
            });
          }}
          onBlur={() => trigger("descripcion")}
        />
        {errors.descripcion && (
          <ErrorText>{errors.descripcion.message}</ErrorText>
        )}

        {/* primera dirección inicio */}
        <Text
          style={{
            fontSize: 20,
            lineHeight: 35,
            fontFamily: "Roboto_500Medium",
            marginBottom: 15,
            marginTop: 25,
            color: "#E76F51"
          }}
        >
          ¿Dónde lo conseguimos?
        </Text>
        <View style={styles.mapContainer}>
          <MapView
            style={styles.mapStyle}
            region={
              coordinate
                ? {
                    ...coordinate,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                  }
                : {
                    latitude: -31.42009468290684,
                    longitude: -64.18848842382431,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                  }
            }
            onPress={({ nativeEvent }) => {
              console.log(nativeEvent.coordinate);
              setCoordinate(nativeEvent.coordinate);
            }}
          >
            {coordinate && <Marker coordinate={coordinate} />}
          </MapView>
        </View>

        <View style={{ flexDirection: "row" }}>
          <View style={{ width: "90%" }}>
            <TextInput
              placeholder="Ciudad"
              textInputStyle={{ top: 5 }}
              value={address.city}
              onChange={(event) => {
                handleCityChange(event);
              }}
              onBlur={() => trigger("ciudad")}
            />
          </View>

          <View style={{ width: "5%", marginLeft: 10 }}>
            <Picker
              items={ciudades}
              selectedItem={selectedItem}
              viewStyle={{ height: "85%" }}
              onSelectItem={(item) => {
                console.log("onSelectItem=", item);
                setCoordinate(item.value);
                setSelectedItem(item);
              }}
            />
          </View>
        </View>
        {errors.ciudad && <ErrorText>{errors.ciudad.message}</ErrorText>}
        <TextInput
          placeholder="Calle"
          textInputStyle={{ top: 5 }}
          value={address.street}
          onChange={(event) => handleStreetChange(event)}
          onBlur={() => trigger("calle")}
        />
        {errors.calle && <ErrorText>{errors.calle.message}</ErrorText>}

        <View style={{ flexDirection: "row" }}>
          <View style={{ width: "50%", marginRight: 5 }}>
            <TextInput
              placeholder="Nro"
              textInputStyle={{ top: 5 }}
              value={address.name}
              onChange={(event) => handleNumberChange(event)}
              onBlur={() => trigger("nro")}
              keyboardType="number-pad"
            />
            {errors.nro && <ErrorText>{errors.nro.message}</ErrorText>}
          </View>
          <View style={{ width: "50%" }}>
            <TextInput
              placeholder="Piso/Depto"
              textInputStyle={{ top: 5 }}
              onChangeText={(text) => setValue("piso-depto", text)}
            />
          </View>
        </View>
        <TextInput
          placeholder="Referencia"
          textInputStyle={{ top: 5 }}
          onChangeText={(text) => setValue("referencia", text)}
        />
        {/* primera dirección fin  */}

        {/* segunda direccion inicio */}
        <Text
          style={{
            fontSize: 20,
            lineHeight: 35,
            fontFamily: "Roboto_500Medium",
            marginBottom: 15,
            marginTop: 25,
            color: "#E76F51"
          }}
        >
          ¿A dónde lo llevamos?
        </Text>
        <View style={styles.mapContainer}>
          <MapView
            style={styles.mapStyle}
            region={
              coordinate2
                ? {
                    ...coordinate2,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                  }
                : {
                    latitude: -31.42009468290684,
                    longitude: -64.18848842382431,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                  }
            }
            onPress={({ nativeEvent }) => {
              console.log(nativeEvent.coordinate);
              setCoordinate2(nativeEvent.coordinate);
            }}
          >
            {coordinate2 && <Marker coordinate={coordinate2} />}
          </MapView>
        </View>

        <View style={{ flexDirection: "row" }}>
          <View style={{ width: "90%" }}>
            <TextInput
              placeholder="Ciudad"
              textInputStyle={{ top: 5 }}
              value={address2.city}
              onChange={(event) => {
                handleCityChange2(event);
              }}
              onBlur={() => trigger("ciudad2")}
            />
          </View>

          <View style={{ width: "5%", marginLeft: 10 }}>
            <Picker
              items={ciudades}
              selectedItem={selectedItem2}
              viewStyle={{ height: "85%" }}
              onSelectItem={(item) => {
                console.log("onSelectItem2=", item);
                setCoordinate2(item.value);
                setSelectedItem2(item);
              }}
            />
          </View>
        </View>
        {errors.ciudad2 && <ErrorText>{errors.ciudad2.message}</ErrorText>}
        <TextInput
          placeholder="Calle"
          textInputStyle={{ top: 5 }}
          value={address2.street}
          onChange={(event) => handleStreetChange2(event)}
          onBlur={() => trigger("calle2")}
        />
        {errors.calle2 && <ErrorText>{errors.calle2.message}</ErrorText>}

        <View style={{ flexDirection: "row" }}>
          <View style={{ width: "50%", marginRight: 5 }}>
            <TextInput
              placeholder="Nro"
              textInputStyle={{ top: 5 }}
              value={address2.name}
              onChange={(event) => handleNumberChange2(event)}
              onBlur={() => trigger("nro2")}
              keyboardType="number-pad"
            />
            {errors.nro2 && <ErrorText>{errors.nro2.message}</ErrorText>}
          </View>
          <View style={{ width: "50%" }}>
            <TextInput
              placeholder="Piso/Depto"
              textInputStyle={{ top: 5 }}
              onChangeText={(text) => setValue("piso-depto2", text)}
            />
          </View>
        </View>
        <TextInput
          placeholder="Referencia"
          textInputStyle={{ top: 5 }}
          onChangeText={(text) => setValue("referencia2", text)}
        />
        {/* segunda dirección fin */}

        <Text
          style={{
            fontSize: 20,
            lineHeight: 35,
            fontFamily: "Roboto_500Medium",
            marginBottom: 15,
            marginTop: 25,
            color: "#E76F51"
          }}
        >
          ¿Cuándo lo entregamos?
        </Text>
        <RadioSelector
          items={formasEntrega}
          selectedItem={selectedFormaEntrega}
          onSelectItem={(item) => {
            if (item.value !== selectedFormaEntrega.value) {
              if (item.value === 2) {
                setValue("hora", undefined);
                setValue("fecha", undefined);
                setValue("combinada", undefined);
              }
            }
            setselectedFormaEntrega(item);
          }}
        />
        {selectedFormaEntrega === formasEntrega[1] && (
          <>
            <View style={{ flexDirection: "row" }}>
              <View style={{ width: "55%", marginRight: 10 }}>
                <FontLoader>
                  <TextInput
                    placeholder="Fecha"
                    editable={false}
                    value={selectedDate}
                    maxLength={10}
                    onPress={() => setDatePickerVisible(true)}
                  />
                </FontLoader>
                {errors.fecha && <ErrorText>{errors.fecha.message}</ErrorText>}
              </View>
              <View style={{ width: "40%" }}>
                <TextInput
                  placeholder="Hora"
                  editable={false}
                  value={selectedTime}
                  maxLength={5}
                  onPress={() => setTimePickerVisible(true)}
                />
                {errors.hora && <ErrorText>{errors.hora.message}</ErrorText>}
              </View>
            </View>
            {errors.combinada && (
              <ErrorText>{errors.combinada.message}</ErrorText>
            )}
          </>
        )}

        <Text
          style={{
            fontSize: 20,
            lineHeight: 35,
            fontFamily: "Roboto_500Medium",
            marginBottom: 15,
            marginTop: 25,
            color: "#E76F51"
          }}
        >
          ¿Cómo lo querés pagar?
        </Text>
        <RadioSelector
          items={mediosPago}
          selectedItem={selectedMedioPago}
          onSelectItem={(item) => {
            if (item.value !== selectedMedioPago.value) {
              if (item.value === 1) {
                setValue("$", undefined);
              } else {
                setValue("nroTarjeta", undefined);
                setValue("titular", undefined);
                setValue("vencimiento", undefined);
                setValue("cvc", undefined);
              }
            }
            setselectedMedioPago(item);
          }}
        />
        {selectedMedioPago === mediosPago[0] && (
          <View>
            <TextInput
              placeholder="$"
              keyboardType="decimal-pad"
              onChangeText={(text) =>
                setValue("$", text, { shouldValidate: true, shouldDirty: true })
              }
              onBlur={() => trigger("$")}
            />
            {errors.$ && <ErrorText>{errors.$.message}</ErrorText>}
          </View>
        )}
        {selectedMedioPago === mediosPago[1] && (
          <View>
            <TextInput
              placeholder="Nro Tarjeta"
              keyboardType="number-pad"
              maxLength={16}
              onChangeText={(text) =>
                setValue("nroTarjeta", text, {
                  shouldValidate: true,
                })
              }
              onBlur={() => trigger("nroTarjeta")}
            />
            {errors.nroTarjeta && (
              <ErrorText>{errors.nroTarjeta.message}</ErrorText>
            )}

            <TextInput
              placeholder="Titular"
              maxLength={16}
              onChangeText={(text) =>
                setValue("titular", text, {
                  shouldValidate: true,
                })
              }
              onBlur={() => trigger("titular")}
            />
            {errors.titular && <ErrorText>{errors.titular.message}</ErrorText>}

            <TextInput
              placeholder="Vencimiento"
              maxLength={5}
              onChangeText={(text) =>
                setValue("vencimiento", text, {
                  shouldValidate: true,
                })
              }
              onBlur={() => trigger("vencimiento")}
            />
            {errors.vencimiento && (
              <ErrorText>{errors.vencimiento.message}</ErrorText>
            )}
            <TextInput
              placeholder="CVC"
              keyboardType="number-pad"
              maxLength={4}
              onChangeText={(text) =>
                setValue("cvc", text, {
                  shouldValidate: true,
                })
              }
              onBlur={() => trigger("cvc")}
            />
            {errors.cvc && <ErrorText>{errors.cvc.message}</ErrorText>}
          </View>
        )}
        <View style={styles.botones}>
          <Button
            title="Cancelar"
            onPress={() => {
              navigation.goBack();
            }}
            buttonStyle={{ backgroundColor: "#8d98a1" }}
          />

          <Button title="Continuar" onPress={handleSubmit(onSubmit)}  buttonStyle={{backgroundColor: "#2A9D8F"}}/>
        </View>
      </ScrollView>
      <DatePicker
        visible={datePickerVisible}
        onSelect={(date) => {
          date = dayjs(date).format("DD/MM/YYYY");
          console.log(date);
          setSelectedDate(date);
          setValue("fecha", date, { shouldValidate: true });
          const combinada = date + " " + selectedTime;
          console.log("combinada=", combinada);
          dayjs.extend(CustomParseFormat);
          const ban = dayjs(combinada, "DD/MM/YYYY hh:mm").isAfter();
          setValue("combinada", ban, {
            shouldValidate: true,
          });
          setDatePickerVisible(false);
        }}
        onBackdropPress={() => setDatePickerVisible(false)}
      />
      <TimePicker
        visible={timePickerVisible}
        onSelect={(time) => {
          console.log(time);
        }}
        onBackdropPress={() => setTimePickerVisible(false)}
      />
      <TimePicker
        visible={timePickerVisible}
        onSelect={(time) => {
          console.log(time);
          setSelectedTime(time);
          setValue("hora", time, { shouldValidate: true });
          const combinada = selectedDate + " " + time;
          console.log("combinada=", combinada);
          dayjs.extend(CustomParseFormat);
          const ban = dayjs(combinada, "DD/MM/YYYY hh:mm").isAfter();
          setValue("combinada", ban, {
            shouldValidate: true,
          });
          setTimePickerVisible(false);
        }}
        onBackdropPress={() => setTimePickerVisible(false)}
      />
      <Resumen
        visible={resumenVisible}
        onCancelar={() => setResumenVisible(false)}
        onConfirmar={() => {
          setResumenVisible(false);
          navigation.navigate("OkScreen");
        }}
        data={getValues()}
      />
      <PopUp
        visible={popUpMessage != null}
        mensaje={popUpMessage}
        onOk={() => setPopUpMessage(null)}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingHorizontal: 20,
    backgroundColor: colors.transparent,
  },
  mapContainer: {
    width: "100%",
    height: 150,
    overflow: "hidden",
    borderRadius: 5,
  },
  mapStyle: {
    height: "100%",
    width: "100%",
  },
  botones: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingVertical: 20,
  },
});

export default LoQueSeaScreen;
