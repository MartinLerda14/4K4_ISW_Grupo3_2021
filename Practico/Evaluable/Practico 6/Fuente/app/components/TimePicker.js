import React, { useState } from "react";
import DatePicker from "react-native-modern-datepicker";
import FontLoader from "./FontLoader";
import Modal from "react-native-modal";
import dayjs from "dayjs";

function TimePicker({ visible, onSelect, onBackdropPress }) {
  const now = dayjs().format("HH:MM");

  return (
    <Modal isVisible={visible} onBackdropPress={onBackdropPress}>
      <FontLoader>
        <DatePicker
          mode="time"
          minuteInterval={30}
          options={{
            defaultFont: "Roboto_500Medium",
            headerFont: "Roboto_500Medium",
            mainColor: "#F4A261"
          }}
          onTimeChange={(time) => {
            onSelect(time);
          }}
        />
      </FontLoader>
    </Modal>
  );
}

export default TimePicker;
