import React, { useMemo } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, Stack } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { CustomInput } from "@/components/CustomInput";
import { ErrorMessage } from "@/components/ErrorMessage";
import { CustomButton } from "@/components/CustomButton";
import axiosInstance from "@/api/axiosInstance";
import * as SecureStore from "expo-secure-store";

export default function Login() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      login: "",
      password: "",
    },
  });

  const { login: loginError, password: passwordError } = errors;

  const onSubmit = async ({
    login,
    password,
  }: {
    login: string;
    password: string;
  }) => {
    try {
      const response = await axiosInstance.post("/admin/auth/tokens", {
        auth_type: "customer",
        login: login,
        password: password,
      });

      if (response.data && response.data.token) {
        await SecureStore.setItemAsync("auth_token", response.data.token);
      }
    } catch (error) {
      // any error handling
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
        </View>

        <View style={styles.button}>
          <CustomButton handleSubmit={handleSubmit} onSubmit={onSubmit} />
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
  },
  viewController: {
    flexGrow: 1,
    alignItems: "center",
    // justifyContent: "center",
    gap: 50,
  },
  button: {
    marginBottom: 20,
  },
});
