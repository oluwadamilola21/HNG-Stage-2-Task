import { useEffect } from "react";

type Props = {
  invoiceId: string;
  onCancel: () => void;
  onConfirm: () => void;
};

const DeleteModal = ({ invoiceId, onCancel, onConfirm }: Props) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onCancel]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4" onClick={onCancel}>
      <div className="w-full max-w-md rounded-lg bg-white p-8 dark:bg-[#1E2139]" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="delete-title">
        <h2 id="delete-title" className="mb-4 text-2xl font-bold text-[#0C0E16] dark:text-white">
          Confirm Deletion
        </h2>

        <p className="mb-6 text-sm leading-6 text-[#888EB0]"> Are you sure you want to delete invoice #{invoiceId}? This action cannot be undone.
        </p>

        <div className="flex justify-end gap-3">
          <button type="button" onClick={onCancel} className="rounded-full bg-[#F9FAFE] px-6 py-4 text-sm font-bold text-[#7E88C3] dark:bg-[#252945] dark:text-[#DFE3FA]">
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="rounded-full bg-[#EC5757] px-6 py-4 text-sm font-bold text-white hover:bg[#FF9797]">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;