import React, { FC } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import Label from "../Label/Label";

interface Props {
  text: string;
  buttonStyle?: object;
  textStyles?: object;
  onPress: () => void;
}

const Button: FC<Props> = ({ text, textStyles, buttonStyle, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ ...styles.button, ...buttonStyle }}
    >
      <Label text={text} textStyles={textStyles} />
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
});
