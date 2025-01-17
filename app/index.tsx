import {
  Redirect,
  Slot,
  Stack,
  useRootNavigationState,
  useRouter,
} from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

import { ActivityIndicator, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getNewAccessToken } from "@/utils/getNewToken";
export const unstable_settings = {
  initialRouteName: "(test)",
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const router = useRouter();
  const navigation = useRootNavigationState();
  const [isReady, setIsReady] = useState(false);
  const [initialRouteName, setInitialRouteName] = useState<
    "/(main)" | "/(login)" | null
  >(null);

  const asyncCheck = async () => {
    const token = await SecureStore.getItemAsync("auth_token");
    const tokenValidity = await SecureStore.getItemAsync("auth_token_validity");
    if (token && tokenValidity && Date.now() <= parseInt(tokenValidity)) {
      setInitialRouteName("/(main)");
    } else {
      await getNewAccessToken({ router });
    }
    setIsReady(true);
  };

  useEffect(() => {
    if (!navigation?.key) return;
    asyncCheck();
    SplashScreen.hideAsync();
  }, [navigation?.key]);

  if (!isReady || !initialRouteName) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  return <Redirect href={initialRouteName} />;
}
