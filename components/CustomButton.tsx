import { SubmitHandler } from "react-hook-form";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  GestureResponderEvent,
} from "react-native";

type FormData = {
  login: string;
  password: string;
};

type CustomButtonProps = {
  handleSubmit: (
    param: SubmitHandler<FormData>
  ) => (event: GestureResponderEvent) => void;
  onSubmit: SubmitHandler<FormData>;
  text?: string;
};

export const CustomButton = ({
  handleSubmit,
  onSubmit,
  text = "Submit",
}: CustomButtonProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={handleSubmit(onSubmit)}
        style={styles.buttonContainer}
      >
        <Text style={styles.buttonText}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  buttonContainer: {
    backgroundColor: "#000",
    paddingVertical: 10,
    borderRadius: 12,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
  },
});
