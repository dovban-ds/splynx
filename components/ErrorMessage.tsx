import { FontAwesome } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

type ErrorProps = {
  text: string;
  color?: string;
};

export const ErrorMessage = (props: ErrorProps) => {
  const { text, color } = props;
  return (
    <View style={styles.container}>
      <FontAwesome name="exclamation" color="red" size={18} />
      <Text {...props} style={[styles.textStyles, color && { color: color }]}>
        {text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 7,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffd7d7",
    paddingHorizontal: 20,
    paddingVertical: 7,
    borderRadius: 12,
    gap: 10,
  },
  textStyles: {
    fontSize: 18,
    color: "red",
  },
});
