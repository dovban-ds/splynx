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
import { TLoginResponse } from "@/models/apiModels";
import { useMutation } from "@tanstack/react-query";

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

  const mutation = useMutation({
    mutationFn: async ({
      login,
      password,
    }: {
      login: string;
      password: string;
    }) => {
      const response = await axiosInstance.post<TLoginResponse>(
        "/admin/auth/tokens",
        {
          auth_type: "customer",
          login,
          password,
        }
      );
      return response.data;
    },
    onSuccess: async (data) => {
      const { access_token, refresh_token, access_token_expiration } = data;
      if (access_token) {
        await SecureStore.setItemAsync("auth_token", access_token);
        await SecureStore.setItemAsync(
          "auth_token_validity",
          `${access_token_expiration * 1000}`
        );
        await SecureStore.setItemAsync("refresh_token", refresh_token);
        router.replace("/(main)");
      }
    },
    onError: () => {
      setError("password", {
        type: "validate",
        message: "Invalid login or password provided",
      });
    },
  });

  const onSubmit = (data: { login: string; password: string }) => {
    mutation.mutate(data);
  };

  const { login: loginError, password: passwordError } = errors;

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
          {mutation.isPending && <ActivityIndicator size={"large"} />}
        </View>

        <View style={styles.button}>
          <CustomButton
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            disabled={mutation.isPending}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#fff" },
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
