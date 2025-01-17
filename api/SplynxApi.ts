import { AxiosResponse } from "axios";
import axiosInstance from "./axiosInstance";
import { TInvoices } from "@/models/apiModels";

export const fetchInvoices = async () => {
  try {
    const res: AxiosResponse<TInvoices[]> = await axiosInstance.get(
      "/admin/finance/invoices"
    );

    return res.data;
  } catch (error) {
    console.error("Error fetching invoices", error);
    throw new Error("Failed to fetch invoices");
  }
};
