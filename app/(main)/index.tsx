// Main.js
import { queryClient } from "@/api/queryClients";
import { fetchInvoices } from "@/api/SplynxApi";
import { TableCell } from "@/components/TableCell";
import { getNewAccessToken } from "@/utils/getNewToken";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import {
  Text,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

export default function Main() {
  const router = useRouter();
  const { bottom } = useSafeAreaInsets();
  const { data, error, isLoading, isFetching } = useQuery({
    queryKey: ["invoices"],
    queryFn: fetchInvoices,
  });

  useEffect(() => {
    if (error) {
      (async () => {
        await getNewAccessToken({ router });
      })();
    }
  }, [error]);

  if (isLoading || error) {
    return (
      <SafeAreaView edges={["bottom"]}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.safeArea}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ flexGrow: 1, gap: 30 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TableCell
            number={item.number}
            docDate={item.date_created}
            dueDate={item.date_till}
            status={item.status}
            details={item}
          />
        )}
        ListFooterComponent={() => (
          <View style={{ paddingBottom: bottom + 5 }} />
        )}
        refreshing={isFetching}
        onRefresh={() => {
          queryClient.invalidateQueries({ queryKey: ["invoices"] });
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#fff" },
  centered: {
    justifyContent: "center",
    alignItems: "center",
  },
});
