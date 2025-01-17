import { queryClient } from "@/api/queryClients";
import { TRefreshTokenResponse } from "@/models/apiModels";
import axios, { AxiosResponse } from "axios";
import { Router } from "expo-router";
import * as SecureStore from "expo-secure-store";

export const getNewAccessToken = async ({ router }: { router: Router }) => {
  const oldRefreshToken = await SecureStore.getItemAsync("refresh_token");
  if (oldRefreshToken) {
    try {
      const response: AxiosResponse<TRefreshTokenResponse> = await axios.get(
        `https://demo.splynx.com/api/2.0/admin/auth/tokens/${oldRefreshToken}`
      );
      const { access_token, access_token_expiration, refresh_token } =
        response.data;
      console.log("Token updated: ", response.data);
      if (access_token && refresh_token && access_token_expiration) {
        await SecureStore.setItemAsync("auth_token", access_token);
        await SecureStore.setItemAsync("refresh_token", refresh_token);
        await SecureStore.setItemAsync(
          "auth_token_validity",
          `${access_token_expiration * 1000}`
        );
        queryClient.invalidateQueries({ queryKey: ["invoices"] });
      }
      router.replace("/(main)");
      return;
    } catch (error) {
      console.error("Error refreshing token", error);
      router.replace("/(login)");
      return null;
    }
  }
  router.replace("/(login)");
  return null;
};
