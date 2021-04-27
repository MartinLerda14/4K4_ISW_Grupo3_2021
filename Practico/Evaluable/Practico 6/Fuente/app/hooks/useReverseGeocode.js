import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

export default useReverseGeocode = (coords, onUpdate) => {
  const [address, setAddress] = useState({});

  const updateAddress = async (coords, onUpdate) => {
    try {
      const newAddress = await Location.reverseGeocodeAsync(coords);
      console.log("newAddress=", newAddress);
      if (onUpdate) onUpdate(newAddress[0]);
      setAddress(newAddress[0]);
    } catch (error) {
      console.log("error=", error);
    }
  };

  const askPermission = async () => {
    // solicitar permiso
    try {
      const result = await Location.requestPermissionsAsync();
      if (!result.granted)
        Alert.alert(
          "Permisos requeridos",
          "Habilitá el permiso para usar el mapa"
        );
    } catch (error) {
      console.log("error=", error);
    }
  };

  useEffect(() => {
    askPermission();
  }, []);

  useEffect(() => {
    if (coords) updateAddress(coords, onUpdate);
  }, [coords]);

  return address;
};
