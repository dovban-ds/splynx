import { StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";

type TDataCell = {
  label: string;
  value: string | number;
  containerStyles?: ViewStyle | null;
  valueStyles?: TextStyle | null;
};

export const DataCell = ({
  label,
  value,
  containerStyles = null,
  valueStyles = null,
}: TDataCell) => {
  return (
    <View style={[styles.container, containerStyles && { ...containerStyles }]}>
      <Text style={styles.labelStyles}>{label}</Text>
      <Text style={[styles.valueStyles, valueStyles && { ...valueStyles }]}>
        {value ? value : "-"}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { width: "45%" },
  valueStyles: {
    backgroundColor: "#000",
    color: "#fff",
    fontWeight: 600,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    fontSize: 18,
    paddingVertical: 4,
    borderRadius: 12,
    paddingHorizontal: 4,
  },
  labelStyles: { color: "#6f6f6f", fontWeight: 500, fontSize: 15 },
});
