import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/components/useColorScheme";
import { SafeAreaProvider } from "react-native-safe-area-context";
import React from "react";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";
import * as SecureStore from "expo-secure-store";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/api/queryClients";
import { Platform, TouchableOpacity } from "react-native";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const router = useRouter();
  const colorScheme = useColorScheme();

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen
              name="(login)/index"
              options={{ headerShown: false, animation: "ios_from_left" }}
            />
            <Stack.Screen
              name="(main)/details"
              options={{
                headerShown: true,
                headerTitle: "Invoice Details",
                headerTitleStyle: { fontSize: 25, color: "#000" },
                headerStyle: { backgroundColor: "#fff" },
                headerTitleAlign: "center",
                headerLeft(props) {
                  console.log({ props });
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        console.log("Back button pressed!");
                        router.push("/(main)");
                      }}
                      onPressIn={
                        Platform.OS === "android"
                          ? () => {
                              router.push("/(main)");
                            }
                          : undefined
                      }
                      style={{ paddingHorizontal: 5 }}
                    >
                      <FontAwesome
                        name="toggle-left"
                        size={30}
                        color={"#000"}
                        style={{ marginLeft: 5 }}
                      />
                    </TouchableOpacity>
                  );
                },
              }}
            />
            <Stack.Screen
              name="(main)/index"
              options={{
                headerShown: true,
                headerTitle: "Invoices",
                headerTitleAlign: "center",
                headerTitleStyle: { fontSize: 25, color: "#000" },
                headerStyle: { backgroundColor: "#fff" },
                headerLeft(props) {
                  return (
                    <TouchableOpacity
                      onPress={async () => {
                        await SecureStore.deleteItemAsync("auth_token");
                        await SecureStore.deleteItemAsync("refresh_token");
                        await SecureStore.deleteItemAsync(
                          "auth_token_validity"
                        );
                        router.replace("/(login)");
                      }}
                      onPressIn={
                        Platform.OS === "android"
                          ? async () => {
                              await SecureStore.deleteItemAsync("auth_token");
                              await SecureStore.deleteItemAsync(
                                "refresh_token"
                              );
                              await SecureStore.deleteItemAsync(
                                "auth_token_validity"
                              );
                              router.replace("/(login)");
                            }
                          : undefined
                      }
                      style={{ paddingHorizontal: 5 }}
                    >
                      <FontAwesome
                        name="toggle-left"
                        size={30}
                        style={{ padding: 10 }}
                        onPress={async () => {
                          await SecureStore.deleteItemAsync("auth_token");
                          await SecureStore.deleteItemAsync("refresh_token");
                          await SecureStore.deleteItemAsync(
                            "auth_token_validity"
                          );
                          router.replace("/(login)");
                        }}
                        onPressIn={
                          Platform.OS === "android"
                            ? async () => {
                                await SecureStore.deleteItemAsync("auth_token");
                                await SecureStore.deleteItemAsync(
                                  "refresh_token"
                                );
                                await SecureStore.deleteItemAsync(
                                  "auth_token_validity"
                                );
                                router.replace("/(login)");
                              }
                            : undefined
                        }
                      />
                    </TouchableOpacity>
                  );
                },
              }}
            />
          </Stack>
        </ThemeProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
