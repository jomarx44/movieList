import React, { FC } from "react";
import { StyleSheet, Text, View } from "react-native";

interface Props {
  text: string;
  style?: object;
  textStyles?: object;
}
const Label: FC<Props> = ({ text, style, textStyles }) => {
  return (
    <View
      style={{
        ...styles.container,
        ...style,
      }}
    >
      <Text style={{ ...textStyles }}>{text}</Text>
    </View>
  );
};

export default Label;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
});
