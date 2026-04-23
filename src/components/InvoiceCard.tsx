import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

type InvoiceCardData = {
  id: string;
  client: string;
  total: number;
  status: "paid" | "pending" | "draft";
  date: string;
};

type Props = {
  invoice: InvoiceCardData;
};

const InvoiceCard = ({ invoice }: Props) => {
  const statusClasses =
    invoice.status === "paid"
      ? "bg-[rgba(51,214,159,0.06)] text-[#33D69F]"
      : invoice.status === "pending"
      ? "bg-[rgba(255,143,0,0.06)] text-[#FF8F00]"
      : "bg-[rgba(55,59,83,0.06)] text-[#373B53] dark:bg-[rgba(223,227,250,0.06)] dark:text-[#DFE3FA]";

  const dotClasses =
    invoice.status === "paid"
      ? "bg-[#33D69F]"
      : invoice.status === "pending"
      ? "bg-[#FF8F00]"
      : "bg-[#373B53] dark:bg-[#DFE3FA]";

  return (
    <Link to={`/invoice/${invoice.id}`} className="block w-full">
      <article className="w-full rounded-lg border border-transparent bg-white px-2 py-5 shadow-[0_10px_10px_-10px_rgba(72,84,159,0.100397)] transition hover:border-[#7C5DFA] dark:bg-[#1E2139] md:px-6 md:py-6">
     
        <div className="flex flex-col gap-6 md:hidden">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-bold tracking-[-0.25px] text-[#0C0E16] dark:text-white">
              <span className="text-[#7E88C3]">#</span>
              {invoice.id}
            </p>

            <p className="text-right text-sm text-[#858BB2] dark:text-[#DFE3FA]">
              {invoice.client}
            </p>
          </div>

          <div className="flex items-end justify-between gap-3">
            <div className="space-y-2">
              <p className="text-sm text-[#7E88C3] dark:text-[#DFE3FA]">
                Due {invoice.date}
              </p>

              <p className="text-base font-bold tracking-[-0.5px] text-[#0C0E16] dark:text-white">
                £ {Number(invoice.total).toFixed(2)}
              </p>
            </div>

            <span
              className={`flex min-w-[90px] items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-bold capitalize ${statusClasses}`}
            >
              <span className={`h-2 w-2 rounded-full ${dotClasses}`}></span>
              {invoice.status}
            </span>
          </div>
        </div>

        <div className="hidden items-center md:grid md:grid-cols-[90px_1fr_1fr_auto_auto_20px] md:gap-6">
          <p className="text-sm font-bold tracking-[-0.25px] text-[#0C0E16] dark:text-white">
            <span className="text-[#7E88C3]">#</span>
            {invoice.id}
          </p>

          <p className="text-sm text-[#7E88C3] dark:text-[#DFE3FA]">
            Due {invoice.date}
          </p>

          <p className="text-sm text-[#858BB2] dark:text-[#DFE3FA]">
            {invoice.client}
          </p>

          <p className="text-base font-bold tracking-[-0.5px] text-[#0C0E16] dark:text-white md:text-right">
            £ {Number(invoice.total).toFixed(2)}
          </p>

          <span
            className={`flex min-w-[104px] items-center justify-center gap-2 rounded-md px-4 py-3 text-sm font-bold capitalize ${statusClasses}`}
          >
            <span className={`h-2 w-2 rounded-full ${dotClasses}`}></span>
            {invoice.status}
          </span>

          <ChevronRight className="h-4 w-4 text-[#7C5DFA]" />
        </div>
      </article>
    </Link>
  );
};

export default InvoiceCard;