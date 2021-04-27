import React from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

function ScrollView({ children }) {
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      {children}
    </KeyboardAwareScrollView>
  );
}

export default ScrollView;
