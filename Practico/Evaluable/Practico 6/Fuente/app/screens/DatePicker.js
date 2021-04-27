import React, { useState } from "react";
import DatePicker from "react-native-modern-datepicker";
import FontLoader from "./FontLoader";
import Modal from "react-native-modal";
import dayjs from "dayjs";

function DatePickerTest({ visible, onSelect, onBackdropPress }) {
  const now = dayjs().format("YYYY-MM-DD");

  return (
    <Modal isVisible={visible} onBackdropPress={onBackdropPress}>
      <FontLoader>
        <DatePicker
          mode="calendar"
          minimumDate={now.toString()}
          options={{
            defaultFont: "Roboto_500Medium",
            headerFont: "Roboto_500Medium",
          }}
          onSelectedChange={(date) => {
            onSelect(date);
          }}
        />
      </FontLoader>
    </Modal>
  );
}

export default DatePickerTest;
