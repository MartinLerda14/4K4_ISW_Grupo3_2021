import * as Location from "expo-location";
import { useEffect, useState } from "react";

export default useLocation = () => {
  const [location, setLocation] = useState();

  const getLocation = async () => {
    try {
      const result = await Location.requestPermissionsAsync();
      if (!result.granted) return;
      const {
        coords: { latitude, longitude },
      } = await Location.getLastKnownPositionAsync();
      setLocation({ latitude, longitude });
    } catch (error) {
      console.log("error=", error);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return location;
};