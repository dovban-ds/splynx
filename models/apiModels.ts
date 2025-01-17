export type TLoginResponse = {
  access_token: string;
  access_token_expiration: number;
  refresh_token: string;
  refresh_token_expiration: number;
  permissions: Record<string, Record<string, "allow" | "deny">>;
};

export type TRefreshTokenResponse = Omit<TLoginResponse, "perrmissions">;

export type TInvoicesTypes = {
  description: string;
  quantity: number;
  unit: number;
  price: string;
  tax: string;
  period_from: string;
  period_to: string;
  categoryIdForTransaction: number;
};

export type TInvoices = {
  customer_id: number;
  date_created: string;
  date_updated: string;
  date_till: string;
  date_payment: string;
  status: "paid" | "not_paid";
  number: string;
  payment_id: number;
  payd_from_deposit: number;
  items: TInvoicesTypes[];
  id: number;
};
