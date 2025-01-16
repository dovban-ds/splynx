import { StyleSheet, Text, TextInput, View } from "react-native";

type PropsTypes = {
  placeholder?: string;
  onBlur: () => void;
  onChangeText: () => void;
  value: string;
  title: string;
};

export const CustomInput = (props: PropsTypes) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.title}</Text>
      <TextInput {...props} style={styles.inputStyles} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  inputStyles: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#e4e4e4",
    borderRadius: 12,
    fontSize: 20,
  },
  title: {
    paddingLeft: 15,
    fontSize: 16,
    marginBottom: 5,
  },
});
