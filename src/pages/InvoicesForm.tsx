import { useMemo, useState } from "react";
import { Trash2 } from "lucide-react";
import { useParams } from "react-router-dom";
import { useInvoices } from "../hooks/UseInvoices";
import type { Invoice, InvoiceItem } from "../types/invoice";
type PaymentTermsSelectProps = {
  value: string;
  onChange: (value: string) => void;
  error?: string;
};

const paymentTermOptions = [
  { value: "1", label: "Net 1 Day" },
  { value: "7", label: "Net 7 Days" },
  { value: "14", label: "Net 14 Days" },
  { value: "30", label: "Net 30 Days" },
];

const PaymentTermsSelect = ({
  value,
  onChange,
  error,
}: PaymentTermsSelectProps) => {
  const [open, setOpen] = useState(false);

  const selected =
    paymentTermOptions.find((option) => option.value === value) ||
    paymentTermOptions[3];

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`flex w-full items-center justify-between rounded-md border bg-white px-4 py-4 text-left text-sm font-bold text-[#0C0E16] outline-none transition hover:border-[#7C5DFA] focus:border-[#7C5DFA] dark:bg-[#1E2139] dark:text-white dark:hover:border-[#9277FF] ${error
          ? "border-[#EC5757] focus:border-[#EC5757]"
          : "border-[#DFE3FA] dark:border-[#252945]"
          }`}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span>{selected.label}</span>

        <svg
          className={`h-3 w-3 shrink-0 text-[#7C5DFA] transition-transform ${open ? "rotate-180" : ""
            }`}
          viewBox="0 0 10 7"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 1.5L5 5.5L9 1.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-10 cursor-default"
            onClick={() => setOpen(false)}
            aria-label="Close payment terms menu"
          />

          <div className="absolute z-20 mt-2 w-full overflow-hidden rounded-lg bg-white shadow-[0px_10px_20px_rgba(72,84,159,0.25)] dark:bg-[#252945]">
            <ul role="listbox" className="divide-y divide-[#DFE3FA] dark:divide-[#1E2139]">
              {paymentTermOptions.map((option) => (
                <li key={option.value}>
                  <button
                    type="button"
                    onClick={() => {
                      onChange(option.value);
                      setOpen(false);
                    }}
                    className={`w-full cursor-pointer px-6 py-4 text-left text-sm font-bold transition hover:text-[#7C5DFA] dark:hover:text-[#9277FF] ${value === option.value
                      ? "text-[#7C5DFA] dark:text-[#9277FF]"
                      : "text-[#0C0E16] dark:text-white"
                      }`}
                    role="option"
                    aria-selected={value === option.value}
                  >
                    {option.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

type Props = {
  onClose: () => void;
};

type Errors = {
  senderStreet?: string;
  senderCity?: string;
  senderPostCode?: string;
  senderCountry?: string;
  clientName?: string;
  clientEmail?: string;
  clientStreet?: string;
  clientCity?: string;
  clientPostCode?: string;
  clientCountry?: string;
  createdAt?: string;
  paymentTerms?: string;
  description?: string;
  items?: string;
};

type ItemErrors = {
  name?: string;
  qty?: string;
  price?: string;
};

type LabelWithErrorProps = {
  label: string;
  error?: string;
  className?: string;
};

const emptyItem: InvoiceItem = {
  name: "",
  qty: 1,
  price: 0,
};

const generateId = () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const randomLetters =
    letters[Math.floor(Math.random() * letters.length)] +
    letters[Math.floor(Math.random() * letters.length)];
  const randomNumbers = Math.floor(1000 + Math.random() * 9000);
  return `${randomLetters}${randomNumbers}`;
};

const InvoicesForm = ({ onClose }: Props) => {
  const { id } = useParams();
  const { invoices, addInvoice, updateInvoice } = useInvoices();

  const existingInvoice = invoices.find((inv) => inv.id === id);
  const isEditMode = Boolean(existingInvoice);

  const [senderStreet, setSenderStreet] = useState(
    existingInvoice?.senderAddress.street || ""
  );
  const [senderCity, setSenderCity] = useState(
    existingInvoice?.senderAddress.city || ""
  );
  const [senderPostCode, setSenderPostCode] = useState(
    existingInvoice?.senderAddress.postCode || ""
  );
  const [senderCountry, setSenderCountry] = useState(
    existingInvoice?.senderAddress.country || ""
  );

  const [clientName, setClientName] = useState(existingInvoice?.clientName || "");
  const [clientEmail, setClientEmail] = useState(
    existingInvoice?.clientEmail || ""
  );
  const [clientStreet, setClientStreet] = useState(
    existingInvoice?.clientAddress.street || ""
  );
  const [clientCity, setClientCity] = useState(
    existingInvoice?.clientAddress.city || ""
  );
  const [clientPostCode, setClientPostCode] = useState(
    existingInvoice?.clientAddress.postCode || ""
  );
  const [clientCountry, setClientCountry] = useState(
    existingInvoice?.clientAddress.country || ""
  );

  const [createdAt, setCreatedAt] = useState(existingInvoice?.createdAt || "");
  const [paymentTerms, setPaymentTerms] = useState(
    String(existingInvoice?.paymentTerms || 30)
  );
  const [description, setDescription] = useState(
    existingInvoice?.description || ""
  );

  const [items, setItems] = useState<InvoiceItem[]>(
    existingInvoice?.items?.length ? existingInvoice.items : [emptyItem]
  );

  const [errors, setErrors] = useState<Errors>({});
  const [itemErrors, setItemErrors] = useState<ItemErrors[]>(
    existingInvoice?.items?.length
      ? existingInvoice.items.map(() => ({}))
      : [{}]
  );

  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.qty * item.price, 0),
    [items]
  );

  const inputBase =
    "w-full rounded-md border border-[#DFE3FA] bg-white px-4 py-4 text-sm font-bold text-[#0C0E16] outline-none transition placeholder:font-medium placeholder:text-[#888EB0] focus:border-[#7C5DFA] dark:border-[#252945] dark:bg-[#1E2139] dark:text-white";
  const labelBase =
    "block text-xs font-medium text-[#7E88C3] dark:text-[#dfe3fa]";
  const errorText = "text-xs font-semibold text-[#EC5757]";
  const errorBorder = "border-[#EC5757] focus:border-[#EC5757]";

  const LabelWithError = ({
    label,
    error,
    className = "",
  }: LabelWithErrorProps) => (
    <div className={`mb-2 flex items-center justify-between gap-4 ${className}`}>
      <label
        className={`${labelBase} ${error ? "text-[#EC5757] dark:text-[#EC5757]" : ""
          }`}
      >
        {label}
      </label>
      {error && <span className={`${errorText} shrink-0`}>{error}</span>}
    </div>
  );

  const addItem = () => {
    setItems((prev) => [...prev, { ...emptyItem }]);
    setItemErrors((prev) => [...prev, {}]);
  };

  const removeItem = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
    setItemErrors((prev) => prev.filter((_, i) => i !== index));
  };

  const updateItem = <K extends keyof InvoiceItem>(
    index: number,
    field: K,
    value: InvoiceItem[K]
  ) => {
    setItems((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );

    setItemErrors((prev) =>
      prev.map((itemError, i) =>
        i === index ? { ...itemError, [field]: undefined } : itemError
      )
    );
  };

  const validate = (mode: "draft" | "pending") => {
    if (mode === "draft") {
      setErrors({});
      setItemErrors(items.map(() => ({})));
      return true;
    }

    const nextErrors: Errors = {};
    const nextItemErrors: ItemErrors[] = items.map(() => ({}));
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!senderStreet.trim()) nextErrors.senderStreet = "can't be empty";
    if (!senderCity.trim()) nextErrors.senderCity = "can't be empty";
    if (!senderPostCode.trim()) nextErrors.senderPostCode = "can't be empty";
    if (!senderCountry.trim()) nextErrors.senderCountry = "can't be empty";

    if (!clientName.trim()) nextErrors.clientName = "can't be empty";
    if (!clientEmail.trim()) nextErrors.clientEmail = "can't be empty";
    else if (!emailOk.test(clientEmail)) nextErrors.clientEmail = "invalid email";

    if (!clientStreet.trim()) nextErrors.clientStreet = "can't be empty";
    if (!clientCity.trim()) nextErrors.clientCity = "can't be empty";
    if (!clientPostCode.trim()) nextErrors.clientPostCode = "can't be empty";
    if (!clientCountry.trim()) nextErrors.clientCountry = "can't be empty";

    if (!createdAt) nextErrors.createdAt = "can't be empty";
    if (!paymentTerms) nextErrors.paymentTerms = "can't be empty";
    if (!description.trim()) nextErrors.description = "can't be empty";

    if (items.length === 0) {
      nextErrors.items = "At least one item is required";
    } else {
      items.forEach((item, index) => {
        if (!item.name.trim()) {
          nextItemErrors[index].name = "required";
        }

        if (
          item.qty === 0 ||
          item.qty < 0 ||
          Number.isNaN(item.qty)
        ) {
          nextItemErrors[index].qty = "invalid qty";
        }

        if (
          item.price === 0 ||
          item.price < 0 ||
          Number.isNaN(item.price)
        ) {
          nextItemErrors[index].price = "invalid price";
        }
      });

      const hasAnyItemError = nextItemErrors.some(
        (itemError) => itemError.name || itemError.qty || itemError.price
      );

      if (hasAnyItemError) {
        nextErrors.items = "Please fix the item errors";
      }
    }

    setErrors(nextErrors);
    setItemErrors(nextItemErrors);

    return (
      Object.keys(nextErrors).length === 0 &&
      nextItemErrors.every(
        (itemError) => !itemError.name && !itemError.qty && !itemError.price
      )
    );
  };

  const saveInvoice = (mode: "draft" | "pending") => {
    if (!validate(mode)) return;

    const invoiceData: Invoice = {
      id: existingInvoice?.id || generateId(),
      createdAt,
      paymentTerms: Number(paymentTerms),
      description,
      clientName,
      clientEmail,
      status: mode,
      senderAddress: {
        street: senderStreet,
        city: senderCity,
        postCode: senderPostCode,
        country: senderCountry,
      },
      clientAddress: {
        street: clientStreet,
        city: clientCity,
        postCode: clientPostCode,
        country: clientCountry,
      },
      items,
      total,
    };

    if (isEditMode && existingInvoice) {
      updateInvoice(existingInvoice.id, invoiceData);
    } else {
      addInvoice(invoiceData);
    }

    onClose();
  };

  return (
    <div className="min-h-screen w-full bg-white dark:bg-[#141625] md:h-screen md:rounded-r-[20px]">
      <div className="h-screen w-full overflow-y-auto bg-white dark:bg-[#141625] md:w-[616px] md:rounded-r-[20px]">
        <div className="flex h-full flex-col">
          <div className="flex-1 overflow-y-auto px-6 pb-28 pt-8 md:px-14 md:pb-32 md:pt-14">
            <button
              type="button"
              onClick={onClose}
              className="mb-8 inline-flex items-center gap-3 text-sm font-bold text-[#0C0E16] transition hover:text-[#7C5DFA] dark:text-white dark:hover:text-[#9277FF] md:hidden"
            >
              <span className="text-[#7C5DFA]">←</span>
              Go back
            </button>

            <h1 className="mb-10 text-2xl font-bold tracking-[-0.5px] text-[#0C0E16] dark:text-white md:mb-12">
              {isEditMode ? (
                <>
                  Edit <span className="text-[#7E88C3] ">#</span>
                  {existingInvoice?.id}
                </>
              ) : (
                "New Invoice"
              )}
            </h1>

            <div className="space-y-8 md:space-y-12">
              <section>
                <h2 className="mb-6 text-sm font-bold text-[#7C5DFA]">Bill From</h2>

                <div className="mb-6">
                  <LabelWithError
                    label="Street Address"
                    error={errors.senderStreet}
                  />
                  <input
                    className={` cursor-pointer ${inputBase} ${errors.senderStreet ? errorBorder : ""
                      }`}
                    value={senderStreet}
                    onChange={(e) => setSenderStreet(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
                  <div>
                    <LabelWithError label="City" error={errors.senderCity} />
                    <input
                      className={` cursor-pointer ${inputBase} ${errors.senderCity ? errorBorder : ""
                        }`}
                      value={senderCity}
                      onChange={(e) => setSenderCity(e.target.value)}
                    />
                  </div>

                  <div>
                    <LabelWithError
                      label="Post Code"
                      error={errors.senderPostCode}
                    />
                    <input
                      className={`cursor-pointer ${inputBase} ${errors.senderPostCode ? errorBorder : ""
                        }`}
                      value={senderPostCode}
                      onChange={(e) => setSenderPostCode(e.target.value)}
                    />
                  </div>

                  <div className="col-span-2 md:col-span-1">
                    <LabelWithError
                      label="Country"
                      error={errors.senderCountry}
                    />
                    <input
                      className={`cursor-pointer ${inputBase} ${errors.senderCountry ? errorBorder : ""
                        }`}
                      value={senderCountry}
                      onChange={(e) => setSenderCountry(e.target.value)}
                    />
                  </div>
                </div>
              </section>

              <section>
                <h2 className="mb-6 text-sm font-bold text-[#7C5DFA]">Bill To</h2>

                <div className="mb-6">
                  <LabelWithError
                    label="Client's Name"
                    error={errors.clientName}
                  />
                  <input
                    className={`cursor-pointer ${inputBase} ${errors.clientName ? errorBorder : ""
                      }`}
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                  />
                </div>

                <div className="mb-6">
                  <LabelWithError
                    label="Client's Email"
                    error={errors.clientEmail}
                  />
                  <input
                    className={`cursor-pointer ${inputBase} ${errors.clientEmail ? errorBorder : ""
                      }`}
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="e.g. email@example.com"
                  />
                </div>

                <div className="mb-6">
                  <LabelWithError
                    label="Street Address"
                    error={errors.clientStreet}
                  />
                  <input
                    className={`cursor-pointer ${inputBase} ${errors.clientStreet ? errorBorder : ""
                      }`}
                    value={clientStreet}
                    onChange={(e) => setClientStreet(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
                  <div>
                    <LabelWithError label="City" error={errors.clientCity} />
                    <input
                      className={`cursor-pointer ${inputBase} ${errors.clientCity ? errorBorder : ""
                        }`}
                      value={clientCity}
                      onChange={(e) => setClientCity(e.target.value)}
                    />
                  </div>

                  <div>
                    <LabelWithError
                      label="Post Code"
                      error={errors.clientPostCode}
                    />
                    <input
                      className={`cursor-pointer ${inputBase} ${errors.clientPostCode ? errorBorder : ""
                        }`}
                      value={clientPostCode}
                      onChange={(e) => setClientPostCode(e.target.value)}
                    />
                  </div>

                  <div className="col-span-2 md:col-span-1">
                    <LabelWithError
                      label="Country"
                      error={errors.clientCountry}
                    />
                    <input
                      className={`cursor-pointer ${inputBase} ${errors.clientCountry ? errorBorder : ""
                        }`}
                      value={clientCountry}
                      onChange={(e) => setClientCountry(e.target.value)}
                    />
                  </div>
                </div>

                <div className="mt-6 grid gap-6 md:grid-cols-2">
                  <div>
                    <LabelWithError
                      label="Invoice Date"
                      error={errors.createdAt}
                    />
                    <input
                      type="date"
                      className={`cursor-pointer ${inputBase} ${errors.createdAt ? errorBorder : ""
                        }`}
                      value={createdAt}
                      onChange={(e) => setCreatedAt(e.target.value)}
                    />
                  </div>

                  <div>
                    <div>
                      <LabelWithError
                        label="Payment Terms"
                        error={errors.paymentTerms}
                      />
                      <PaymentTermsSelect
                        value={paymentTerms} onChange={setPaymentTerms} error={errors.paymentTerms}/>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <LabelWithError
                    label="Project Description"
                    error={errors.description}
                  />
                  <input
                    className={`cursor-pointer ${inputBase} ${errors.description ? errorBorder : ""
                      }`}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="e.g. Graphic Design Service"
                  />
                </div>
              </section>

              <section>
                <h2 className="mb-6 text-lg font-bold text-[#777F98]">Item List</h2>

                <div className="hidden grid-cols-12 gap-4 text-xs font-medium text-[#7E88C3] dark:text-[#dfe3fa] md:grid">
                  <p className="col-span-5">Item Name</p>
                  <p className="col-span-2">Qty.</p>
                  <p className="col-span-2">Price</p>
                  <p className="col-span-2">Total</p>
                  <p className="col-span-1"></p>
                </div>

                <div className="space-y-6">
                  {items.map((item, index) => (
                    <div key={index} className="space-y-4">
                      <div className="md:hidden">
                        <LabelWithError
                          label="Item Name"
                          error={itemErrors[index]?.name}
                        />
                        <input
                          className={`cursor-pointer ${inputBase} ${itemErrors[index]?.name ? errorBorder : ""
                            }`}
                          value={item.name}
                          onChange={(e) =>
                            updateItem(index, "name", e.target.value)
                          }
                        />
                      </div>

                      <div className="grid grid-cols-[64px_100px_1fr_auto] items-end gap-4 md:hidden">
                        <div>
                          <LabelWithError
                            label="Qty."
                            error={itemErrors[index]?.qty}
                          />
                          <input
                            type="number"
                            className={`cursor-pointer ${inputBase} ${itemErrors[index]?.qty ? errorBorder : ""
                              }`}
                            value={item.qty || ""}
                            onChange={(e) =>
                              updateItem(index, "qty", Number(e.target.value) || 0)
                            }
                          />
                        </div>

                        <div>
                          <LabelWithError
                            label="Price"
                            error={itemErrors[index]?.price}
                          />
                          <input
                            type="number"
                            className={`cursor-pointer ${inputBase} ${itemErrors[index]?.price ? errorBorder : ""
                              }`}
                            value={item.price || ""}
                            onChange={(e) =>
                              updateItem(index, "price", Number(e.target.value) || 0)
                            }
                          />
                        </div>

                        <div>
                          <label className="mb-2 block text-xs text-[#7E88C3] dark:text-[#dfe3fa]">
                            Total
                          </label>
                          <p className="py-4 text-sm font-bold text-[#888EB0]">
                            £ {(item.qty * item.price).toFixed(2)}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeItem(index)}
                          className="cursor-pointer pb-4 text-[#888EB0] transition hover:text-[#EC5757]"
                          aria-label={`Remove item ${index + 1}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="hidden md:grid md:grid-cols-12 md:items-start md:gap-4">
                        <div className="md:col-span-5">

                          <input
                            className={`cursor-pointer ${inputBase} ${itemErrors[index]?.name ? errorBorder : ""
                              }`}
                            value={item.name}
                            onChange={(e) =>
                              updateItem(index, "name", e.target.value)
                            }
                          />
                        </div>

                        <div className="md:col-span-2">

                          <input
                            type="number"
                            className={`cursor-pointer ${inputBase} ${itemErrors[index]?.qty ? errorBorder : ""
                              }`}
                            value={item.qty || ""}
                            onChange={(e) =>
                              updateItem(index, "qty", Number(e.target.value) || 0)
                            }
                          />
                        </div>

                        <div className="md:col-span-2">

                          <input
                            type="number"
                            className={`cursor-pointer ${inputBase} ${itemErrors[index]?.price ? errorBorder : ""
                              }`}
                            value={item.price || ""}
                            onChange={(e) =>
                              updateItem(index, "price", Number(e.target.value) || 0)
                            }
                          />
                        </div>

                        <div className="md:col-span-2">

                          <p className="py-4 text-right text-sm font-bold text-[#888EB0]">
                            £ {(item.qty * item.price).toFixed(2)}
                          </p>
                        </div>

                        <div className="flex justify-end pt-7 md:col-span-1">
                          <button
                            type="button"
                            onClick={() => removeItem(index)}
                            className="cursor-pointer text-[#888EB0] transition hover:text-[#EC5757]"
                            aria-label={`Remove item ${index + 1}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {errors.items && (
                  <p className={`${errorText} mt-2`}>{errors.items}</p>
                )}

                <button
                  type="button"
                  onClick={addItem}
                  className="cursor-pointer mt-6 w-full rounded-full bg-[#F9FAFE] py-4 text-sm font-bold text-[#7E88C3] transition hover:bg-[#DFE3FA] dark:bg-[#252945] dark:text-[#DFE3FA] dark:hover:bg-[#1E2139]"
                >
                  + Add New Item
                </button>
              </section>
            </div>
          </div>

          <div className="border-t border-[rgba(73,78,110,0.08)] bg-white px-4 py-4 dark:border-[rgba(223,227,250,0.08)] dark:bg-[#141625] md:px-14 md:py-6">
            {isEditMode ? (
              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-full bg-[#F9FAFE] px-4 py-2.5 text-xs font-bold text-[#7E88C3] transition hover:bg-[#DFE3FA] dark:bg-[#252945] dark:text-[#DFE3FA] dark:hover:bg-[#1E2139] md:px-6 md:py-3 md:text-sm"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={() => saveInvoice("pending")}
                  className="rounded-full bg-[#7C5DFA] px-4 py-2.5 text-xs font-bold text-white transition hover:bg-[#9277FF] md:px-6 md:py-3 md:text-sm"
                >
                  Save Changes
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className=" cursor-pointer rounded-full bg-[#F9FAFE] px-4 py-2.5 text-xs font-bold text-[#7E88C3] transition hover:bg-[#DFE3FA] dark:bg-[#252945] dark:text-[#DFE3FA] dark:hover:bg-[#1E2139] md:px-6 md:py-3 md:text-sm"
                >
                  Discard
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => saveInvoice("draft")}
                    className="cursor-pointer rounded-full bg-[#373B53] px-3 py-2.5 text-xs font-bold text-[#888EB0] transition hover:bg-[#0C0E16] md:px-6 md:py-3 md:text-sm"
                  >
                    Save as Draft
                  </button>

                  <button
                    type="button"
                    onClick={() => saveInvoice("pending")}
                    className="cursor-pointer rounded-full bg-[#7C5DFA] px-3 py-2.5 text-xs font-bold text-white transition hover:bg-[#9277FF] md:px-6 md:py-3 md:text-sm"
                  >
                    Save & Send
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoicesForm;