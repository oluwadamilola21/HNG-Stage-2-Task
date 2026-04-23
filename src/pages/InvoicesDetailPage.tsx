import { Link, useParams, useNavigate } from "react-router-dom";
import { useInvoices } from "../hooks/UseInvoices";
import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import DeleteModal from "../components/DeleteModal";
import InvoicesForm from "./InvoicesForm";

const InvoicesDetailPage = () => {
  const { id } = useParams();
  const { invoices, deleteInvoice, markAsPaid } = useInvoices();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const navigate = useNavigate();

  const invoice = invoices.find((inv) => inv.id === id);

  if (!invoice) {
    return (
      <div className="min-h-screen bg-[#F8F8FB] px-6 py-16 text-center dark:bg-[#141625] md:ml-[80px]">
        <p className="text-sm font-medium text-[#7E88C3] dark:text-[#DFE3FA]">
          Invoice not found
        </p>
      </div>
    );
  }

  const handleDelete = () => {
    deleteInvoice(invoice.id);
    navigate("/");
  };

  const statusClasses =
    invoice.status === "paid"
      ? "bg-[rgba(51,214,159,0.06)] text-[#33D69F]"
      : invoice.status === "pending"
        ? "bg-[rgba(255,143,0,0.06)] text-[#FF8F00]"
        : "bg-[rgba(55,59,83,0.06)] text-[#373B53] dark:bg-[rgba(223,227,250,0.06)] dark:text-[#DFE3FA]";

  return (
    <div className="min-h-screen bg-[#F8F8FB] dark:bg-[#141625] md:ml-[80px]">
      <div className="w-full pt-[88px] pb-14 md:px-8 md:pt-[72px]">
        <div className="w-full md:mx-auto md:max-w-[730px]">
          <div className="space-y-6 px-6 md:px-0">
            <Link
              to="/"
              className="inline-flex items-center gap-6 text-sm font-bold text-[#0C0E16] transition hover:text-[#7C5DFA] dark:text-white dark:hover:text-[#9277FF]"
            >
              <ChevronLeft className="h-4 w-4 text-[#7C5DFA]" />
              Go back
            </Link>

            <div className="flex flex-col gap-4 rounded-lg bg-white px-6 py-6 shadow-[0_10px_10px_-10px_rgba(72,84,159,0.100397)] dark:bg-[#1E2139] md:flex-row md:items-center md:justify-between">
              <div className="flex items-center justify-between md:justify-start md:gap-5">
                <span className="text-sm text-[#858BB2] dark:text-[#DFE3FA]">
                  Status
                </span>

                <span
                  className={`flex min-w-[104px] items-center justify-center gap-2 rounded-md px-4 py-3 text-sm font-bold capitalize ${statusClasses}`}
                >
                  <span className="h-2 w-2 rounded-full bg-current" />
                  {invoice.status}
                </span>
              </div>

              <div className="hidden items-center gap-2 md:flex md:gap-3">
                <button
                  onClick={() => setShowEditForm(true)}
                  className="rounded-full bg-[#F9FAFE] px-6 py-4 text-sm font-bold text-[#7E88C3] transition cursor-pointer hover:bg-[#DFE3FA] dark:bg-[#252945] dark:text-[#DFE3FA] dark:hover:text-[#7e88c3] dark:hover:bg-[#ffffff]"
                >
                  Edit
                </button>

                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="rounded-full bg-[#EC5757] px-6 py-4 text-sm font-bold text-white cursor-pointer transition hover:bg-[#FF9797]"
                >
                  Delete
                </button>

                {invoice.status === "pending" && (
                  <button
                    onClick={() => markAsPaid(invoice.id)}
                    className="rounded-full bg-[#7C5DFA] px-6 py-4 text-sm font-bold text-white cursor-pointer transition hover:bg-[#9277FF]"
                  >
                    Mark as Paid
                  </button>
                )}
              </div>
            </div>

            <div className="space-y-8 rounded-lg bg-white px-6 py-6 shadow-[0_10px_10px_-10px_rgba(72,84,159,0.100397)] dark:bg-[#1E2139] md:space-y-10 md:px-8 md:py-8">
              <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-base font-bold text-[#0C0E16] dark:text-white">
                    <span className="text-[#7E88C3]">#</span>
                    {invoice.id}
                  </p>
                  <p className="mt-1 text-sm text-[#7E88C3] dark:text-white">
                    {invoice.description}
                  </p>
                </div>

                <div className="space-y-1 text-sm text-[#7E88C3] md:text-right dark:text-white">
                  <p>{invoice.senderAddress.street}</p>
                  <p>{invoice.senderAddress.city}</p>
                  <p>{invoice.senderAddress.postCode}</p>
                  <p>{invoice.senderAddress.country}</p>
                </div>
              </div>
              
              <div className="grid gap-y-8 gap-x-6 text-sm text-[#7E88C3] grid-cols-2 md:grid-cols-[1fr_1fr_1fr]">
                <div className="space-y-8">
                  <div>
                    <p>Invoice Date</p>
                    <p className="mt-3 text-[15px] font-bold text-[#0C0E16] dark:text-white">
                      {invoice.createdAt}
                    </p>
                  </div>

                  <div>
                    <p>Payment Due</p>
                    <p className="mt-3 text-[15px] font-bold text-[#0C0E16] dark:text-white">
                      Net {invoice.paymentTerms} Days
                    </p>
                  </div>
                </div>

                <div>
                  <p>Bill To</p>
                  <p className="mt-3 text-[15px] font-bold text-[#0C0E16] dark:text-white">
                    {invoice.clientName}
                  </p>
                  <div className="mt-2 space-y-1 text-sm text-[#7E88C3]">
                    <p>{invoice.clientAddress.street}</p>
                    <p>{invoice.clientAddress.city}</p>
                    <p>{invoice.clientAddress.postCode}</p>
                    <p>{invoice.clientAddress.country}</p>
                  </div>
                </div>

                <div className="col-span-2 md:col-span-1">
                  <p>Sent to</p>
                  <p className="mt-3 break-all text-[15px] font-bold text-[#0C0E16] dark:text-white">
                    {invoice.clientEmail}
                  </p>
                </div>
              </div>

              <div className="overflow-hidden rounded-lg bg-[#F9FAFE] dark:bg-[#252945]">
                <div className="px-6 py-6 md:px-8 md:py-8">
                  <div className="mb-8 hidden grid-cols-12 text-xs font-medium text-[#7E88C3] dark:text-white md:grid">
                    <p className="col-span-5">Item Name</p>
                    <p className="col-span-2 text-center">QTY.</p>
                    <p className="col-span-2 text-center">Price</p>
                    <p className="col-span-3 text-right">Total</p>
                  </div>

                  <div className="space-y-6">
                    {invoice.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-start justify-between gap-4 md:grid md:grid-cols-12 md:items-center"
                      >
                        <div className="space-y-2 md:col-span-5">
                          <p className="text-sm font-bold text-[#0C0E16] dark:text-white">
                            {item.name}
                          </p>

                          <p className="text-sm font-bold text-[#7E88C3] md:hidden">
                            {item.qty} x £ {item.price.toFixed(2)}
                          </p>
                        </div>

                        <p className="hidden text-sm font-bold text-[#7E88C3] md:col-span-2 md:block md:text-center">
                          {item.qty}
                        </p>

                        <p className="hidden text-sm font-bold text-[#7E88C3] md:col-span-2 md:block md:text-center">
                          £ {item.price.toFixed(2)}
                        </p>

                        <p className="text-sm font-bold text-[#0C0E16] dark:text-white md:col-span-3 md:text-right">
                          £ {(item.qty * item.price).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between bg-[#373B53] px-6 py-6 dark:bg-[#0C0E16] md:px-8">
                  <p className="text-sm text-white">Amount Due</p>
                  <p className="text-2xl font-bold tracking-[-0.5px] text-white">
                    £ {invoice.total.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-[rgba(73,78,110,0.08)] bg-white px-6 py-5 dark:border-[rgba(223,227,250,0.08)] dark:bg-[#141625] md:hidden">
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => setShowEditForm(true)}
              className="rounded-full bg-[#F9FAFE] px-6 py-4 text-sm font-bold text-[#7E88C3] transition hover:bg-[#DFE3FA] dark:bg-[#252945] dark:text-[#DFE3FA] dark:hover:bg-[#1E2139]"
            >
              Edit
            </button>

            <button
              onClick={() => setShowDeleteModal(true)}
              className="rounded-full bg-[#EC5757] px-6 py-4 text-sm font-bold text-white transition hover:bg-[#FF9797]"
            >
              Delete
            </button>

            {invoice.status === "pending" && (
              <button
                onClick={() => markAsPaid(invoice.id)}
                className="rounded-full bg-[#7C5DFA] px-6 py-4 text-sm font-bold text-white transition hover:bg-[#9277FF]"
              >
                Mark as Paid
              </button>
            )}
          </div>
        </div>

        <div className="h-[110px] md:hidden" />
      </div>

      {showDeleteModal && (
        <DeleteModal
          invoiceId={invoice.id}
          onCancel={() => setShowDeleteModal(false)}
          onConfirm={handleDelete}
        />
      )}

      {showEditForm && (
        <div className="fixed inset-0 z-[999]">
          <div
            className="absolute inset-0 hidden bg-black/50 md:block"
            onClick={() => setShowEditForm(false)}
          />
          <div className="absolute inset-0 overflow-hidden">
            <div className="h-full w-full md:w-[616px]">
              <InvoicesForm onClose={() => setShowEditForm(false)} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvoicesDetailPage;