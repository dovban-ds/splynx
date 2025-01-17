import { formatDate } from "@/utils/formatDate";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { DataCell } from "./DataCell";
import { useMemo } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { TInvoices } from "@/models/apiModels";

export type TTableCell = {
  number: string;
  docDate: string;
  dueDate: string;
  status: "paid" | "not_paid";
  details: TInvoices;
};

export enum InvoiceStatus {
  paid = "Paid",
  not_paid = "Not paid",
}

export const TableCell = ({
  number,
  docDate,
  dueDate,
  status,
  details,
}: TTableCell) => {
  const router = useRouter();
  const formattedDocDate = formatDate(docDate);
  const formattedDueDate = formatDate(dueDate);

  const defineChipsColor = useMemo(() => {
    if (InvoiceStatus[status] === "Paid") return "#b3ff9e";
    return "#ff9e9e";
  }, [status]);

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        router.push({
          pathname: "/(main)/details",
          params: { details: JSON.stringify(details) },
        });
      }}
    >
      <View style={styles.container}>
        <View style={styles.row}>
          <DataCell value={formattedDocDate} label="Document date" />
          <DataCell value={formattedDueDate} label="Due date" />
        </View>
        <View style={[styles.row, styles.icon]}>
          <FontAwesome name="toggle-right" size={25} />
        </View>
        <View style={styles.row}>
          <DataCell value={number} label="Document number" />
          <DataCell
            value={InvoiceStatus[status]}
            label="Status"
            valueStyles={{ color: defineChipsColor }}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e7e7e7",
    // paddingHorizontal: 20,
    paddingVertical: 15,
    // gap: 30,
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
