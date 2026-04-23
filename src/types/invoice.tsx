export type InvoiceStatus = "paid" | "pending" | "draft";

export type Address = {
  street: string;
  city: string;
  postCode: string;
  country: string;
};

export type InvoiceItem = {
  name: string;
  qty: number;
  price: number;
};

export type Invoice = {
  id: string;
  createdAt: string;
  paymentTerms: number;
  description: string;
  clientName: string;
  clientEmail: string;
  status: InvoiceStatus;
  senderAddress: Address;
  clientAddress: Address;
  items: InvoiceItem[];
  total: number;
};