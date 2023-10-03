import React, { FC, ReactNode } from "react";
import { StyleSheet, View } from "react-native";

interface Props {
  style?: object;
  children: ReactNode;
}
const Wrapper: FC<Props> = ({ style, children }) => {
  return <View style={{ ...styles.container, ...style }}>{children}</View>;
};

export default Wrapper;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 12 },
});
