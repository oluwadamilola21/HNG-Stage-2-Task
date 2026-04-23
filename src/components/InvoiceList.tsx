import InvoiceCard from "./InvoiceCard";
import { useInvoices } from "../hooks/UseInvoices";
import Empty from "../assets/images/empty.png";

type Props = {
  filters: string[];
};

const InvoiceList = ({ filters }: Props) => {
  const { invoices } = useInvoices();

  const filteredInvoices =
    filters.length === 0
      ? invoices
      : invoices.filter((inv) => filters.includes(inv.status));

  if (filteredInvoices.length === 0) {
    return (
      <div className="mt-12 flex w-full flex-col items-center justify-center px-4 text-center md:mt-16">
        <img
          src={Empty}
          alt="No invoices"
          className="mb-8 w-[193px] md:mb-10"
        />

        <h2 className="mb-4 text-2xl font-bold text-[#0C0E16] dark:text-white">
          There is nothing here
        </h2>

        <p className="max-w-[260px] text-sm leading-6 text-[#888EB0] dark:text-[#DFE3FA]">
          Create an invoice by clicking the{" "}
          <span className="font-bold">New Invoice</span> button and get started.
        </p>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-4">
      {filteredInvoices.map((invoice) => (
        <div key={invoice.id} className="w-full">
          <InvoiceCard
            invoice={{
              id: invoice.id,
              client: invoice.clientName,
              total: invoice.total,
              status: invoice.status,
              date: invoice.createdAt,
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default InvoiceList;