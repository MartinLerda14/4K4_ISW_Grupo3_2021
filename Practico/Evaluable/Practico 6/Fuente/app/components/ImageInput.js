import { FontAwesome5 } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect } from "react";
import { Alert, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import * as FileSystem from "expo-file-system";

function ImageInput({ imageUri, onChangeImage, onImageNotJpg, onImageExceed }) {
  const requestPermission = async () => {
    try {
      const result = await ImagePicker.requestCameraRollPermissionsAsync();
      if (!result.granted) {
        Alert.alert(
          "Permisos requeridos",
          "Habilitá el permiso para subir una imagen."
        );
      } else {
        return true;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePress = async () => {
    if (await requestPermission())
      if (!imageUri) selectImage();
      else
        Alert.alert("Quitar imagen", "¿Quitar la imagen cargada?", [
          {
            text: "Sí",
            onPress: () => {
              onChangeImage(null);
            },
          },
          { text: "No" },
        ]);
  };

  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
      });
      if (!result.cancelled) {
        try {
          const fileInfo = await FileSystem.getInfoAsync(result.uri);
          console.log("fileInfo=", fileInfo);
          if (fileInfo.size > 5 * 1024 * 1024) {
            onImageExceed();
            return;
          }
          let ext = fileInfo.uri.substr(fileInfo.uri.lastIndexOf(".") + 1);
          if (ext != "jpg") {
            onImageNotJpg();
            return;
          }
        } catch (error) {
          console.log("Error reading file info", error);
        }
        onChangeImage(result.uri);
      }
    } catch (error) {
      console.log("Error reading an image", error);
    }
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.container}>
        {!imageUri && <FontAwesome5 name="camera" size={22} color="#8b9199" />}
        {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "transparent",
    borderRadius: 15,
    justifyContent: "center",
    height: 70,
    width: 100,
    overflow: "hidden",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
});

export default ImageInput;
