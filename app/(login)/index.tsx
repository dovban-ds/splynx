import React, { useMemo, useState } from "react";
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { CustomInput } from "@/components/CustomInput";
import { ErrorMessage } from "@/components/ErrorMessage";
import { CustomButton } from "@/components/CustomButton";
import axiosInstance from "@/api/axiosInstance";
import * as SecureStore from "expo-secure-store";
import { AxiosResponse } from "axios";
import { TLoginResponse } from "@/models/apiModels";

export default function Login() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: {
      login: "",
      password: "",
    },
  });
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { login: loginError, password: passwordError } = errors;

  const onSubmit = async ({
    login,
    password,
  }: {
    login: string;
    password: string;
  }) => {
    setIsLoading(true);
    try {
      const response: AxiosResponse<TLoginResponse> = await axiosInstance.post(
        "/admin/auth/tokens",
        {
          auth_type: "customer",
          login: login,
          password: password,
        }
      );

      const { access_token, refresh_token, access_token_expiration } =
        response?.data;

      if (access_token) {
        await SecureStore.setItemAsync("auth_token", access_token);
        await SecureStore.setItemAsync(
          "auth_token_validity",
          `${access_token_expiration * 1000}`
        );
        await SecureStore.setItemAsync("refresh_token", refresh_token);
        router.replace("/(main)");
      }
    } catch (error) {
      setError("password", {
        type: "validate",
        message: "Invalid login or password provided",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.loginTitle}>Welcome!</Text>
        <View style={styles.viewController}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomInput
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                title={"Login"}
              />
            )}
            name={"login"}
          />

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomInput
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                title={"Password"}
              />
            )}
            name={"password"}
          />
          {(loginError || passwordError) && (
            <ErrorMessage text="Invalid login or password provided" />
          )}
          {isLoading && <ActivityIndicator size={"large"} />}
        </View>

        <View style={styles.button}>
          <CustomButton
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            disabled={isLoading}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: "space-between",
  },
  loginTitle: {
    color: "#000",
    fontSize: 36,
    marginTop: 35,
    marginBottom: 40,
    fontWeight: 700,
  },
  viewController: {
    flexGrow: 1,
    alignItems: "center",
    gap: 50,
  },
  button: {
    marginBottom: 20,
  },
});
