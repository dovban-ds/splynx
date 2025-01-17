import { DataCell } from "@/components/DataCell";
import { InvoiceStatus } from "@/components/TableCell";
import { TInvoices, TInvoicesTypes } from "@/models/apiModels";
import { formatDate } from "@/utils/formatDate";
import { FontAwesome } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useMemo } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

export default function Details() {
  const { bottom } = useSafeAreaInsets();
  const { details } = useLocalSearchParams();
  const {
    customer_id,
    number,
    payment_id,
    payd_from_deposit,
    items,
    status,
    date_created,
    date_till,
  }: TInvoices = JSON.parse(details as string);
  const {
    description,
    quantity,
    unit,
    price,
    period_from,
    period_to,
    categoryIdForTransaction,
    tax,
  }: TInvoicesTypes = items?.[0];

  const formattedDocDate = formatDate(date_created);
  const formattedDueDate = formatDate(date_till);
  const formattedPrice = parseFloat(price).toFixed(2);
  const formattedTax = parseFloat(tax).toFixed(2);
  const formattedFrom = formatDate(period_from);
  const formattedTo = formatDate(period_to);
  const defineChipsColor = useMemo(() => {
    if (InvoiceStatus[status] === "Paid") return "#b3ff9e";
    return "#ff9e9e";
  }, [status]);

  return (
    <View style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.row}>
          <DataCell value={customer_id} label="Customer ID" />
          <DataCell value={number} label="Document number" />
        </View>
        <View style={styles.row}>
          <DataCell value={payment_id} label="Payment ID" />
          <DataCell value={payd_from_deposit} label="Paid from deposit" />
        </View>
        <View style={styles.row}>
          <DataCell
            value={description}
            label="Description"
            containerStyles={{ width: "100%" }}
            valueStyles={{ wordWrap: "break-word", textOverflow: "break-word" }}
          />
        </View>
        <View style={styles.row}>
          <DataCell value={quantity} label="Quantity" />
          <DataCell value={unit} label="Unit" />
        </View>
        <View style={styles.row}>
          <DataCell value={formattedPrice} label="Price" />
          <DataCell value={formattedTax} label="Tax" />
        </View>
        <View style={styles.row}>
          <DataCell value={formattedDocDate} label="Document date" />
          <DataCell value={formattedDueDate} label="Due date" />
        </View>
        <View style={styles.row}>
          <DataCell value={formattedFrom} label="Period from" />
          <DataCell value={formattedTo} label="Period to" />
        </View>
        <View style={[styles.row, { paddingBottom: bottom }]}>
          <DataCell value={categoryIdForTransaction} label="Category ID" />
          <DataCell
            value={InvoiceStatus[status]}
            label="Status"
            valueStyles={{ color: defineChipsColor }}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#fff" },
  contentContainer: {
    flexGrow: 1,
    backgroundColor: "#fff",
    paddingVertical: 15,
    gap: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  icon: {
    height: 45,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingHorizontal: 0,
    paddingRight: 15,
  },
});
