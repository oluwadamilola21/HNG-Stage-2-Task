import { useState } from "react";
import Header from "../components/Header";
import InvoiceList from "../components/InvoiceList";
import InvoicesForm from "./InvoicesForm";
import { useInvoices } from "../hooks/UseInvoices";

const InvoicesPage = () => {
  const [filters, setFilters] = useState<string[]>([]);
  const [showForm, setShowForm] = useState(false);
  const { invoices } = useInvoices();

  const toggleFilter = (value: string) => {
    if (value === "clear") {
      setFilters([]);
      return;
    }

    setFilters((prev) =>
      prev.includes(value)
        ? prev.filter((f) => f !== value)
        : [...prev, value]
    );
  };

  return (
    <div className="min-h-screen bg-[#F8F8FB] dark:bg-[#141625]">
      <div className="w-full pt-[88px] pb-4 md:pt-[72px]">
        <div className="w-full lg:mx-auto lg:max-w-[780px]">
          <Header
            filters={filters}
            toggleFilter={toggleFilter}
            totalCount={invoices.length}
            onNewInvoice={() => setShowForm(true)}
          />

          <InvoiceList filters={filters} />

          {showForm && (
            <div className="fixed inset-0 z-[100]">
              
              <div
                className="absolute inset-0 hidden bg-black/50 md:block"
                onClick={() => setShowForm(false)}
              />

              
              <div className="absolute inset-0 overflow-y-auto">
                <div className="w-full md:w-[616px]">
                  <InvoicesForm onClose={() => setShowForm(false)} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InvoicesPage;