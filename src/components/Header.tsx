import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

type Props = {
  filters: string[];
  toggleFilter: (value: string) => void;
  totalCount: number;
  onNewInvoice: () => void;
};

const Header = ({
  filters,
  toggleFilter,
  totalCount,
  onNewInvoice,
}: Props) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const statuses = ["draft", "pending", "paid"];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="mb-8 flex items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold tracking-[-0.75px] text-[#0C0E16] dark:text-white md:text-[36px] md:leading-[33px]">
          Invoices
        </h1>
        <p className="mt-1 text-sm text-[#888EB0] dark:text-[#DFE3FA]">
          <span className="hidden md:inline">
            There are {totalCount} total invoices
          </span>
          <span className="md:hidden">{totalCount} invoices</span>
        </p>
      </div>

      <div className="flex items-center gap-4 md:gap-10">
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 text-sm font-bold text-[#0C0E16] dark:text-white"
          >
            <span className="hidden md:inline cursor-pointer">Filter by status</span>
            <span className="md:hidden cursor-pointer">Filter</span>
            <ChevronDown
              className={`h-4 w-4 text-[#7C5DFA] cursor-pointer transition ${
                open ? "rotate-180" : ""
              }`}
            />
          </button>

          {open && (
            <div className="absolute right-0 top-full z-20 mt-4 w-48 rounded-lg bg-white p-6 shadow-[0_10px_20px_0_rgba(72,84,159,0.25)] dark:bg-[#1E2139]">
              <div className="space-y-4">
                <label className="flex items-center gap-3 text-sm font-bold text-[#0C0E16] cursor-pointer dark:text-white">
                  <input
                    type="checkbox"
                    checked={filters.length === 0}
                    onChange={() => toggleFilter("clear")} className="cursor-pointer h-4 w-4 accent-[#7C5DFA]"/>
                  All
                </label>

                {statuses.map((status) => (
                  <label
                    key={status}
                    className="flex items-center gap-3 text-sm font-bold capitalize cursor-pointer text-[#0C0E16] dark:text-white"
                  >
                    <input
                      type="checkbox"
                      checked={filters.includes(status)}
                      onChange={() => toggleFilter(status)}
                      className="cursor-pointer h-4 w-4 accent-[#7C5DFA]"
                    />
                    {status}
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

        <button
          onClick={onNewInvoice}
          className="cursor-pointer flex items-center gap-2 rounded-full bg-[#7C5DFA] px-2 py-2 text-sm font-bold text-white transition hover:bg-[#9277FF] md:px-4"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-xl font-bold leading-none text-[#7C5DFA]">
            +
          </span>
          <span className="hidden md:inline cursor-pointer">New Invoice</span>
          <span className="md:hidden cursor-pointer">New</span>
        </button>
      </div>
    </div>
  );
};

export default Header;