import { useEffect, useId, useRef } from "react";
import { X } from "lucide-react";

export default function Modal({ title, description, onClose, maxWidth = "max-w-2xl", children }) {
  const titleId = useId();
  const descId = useId();
  const dialogRef = useRef(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  useEffect(() => {
    const previouslyFocused = document.activeElement;
    const dialog = dialogRef.current;
    document.body.style.overflow = "hidden";
    dialog?.focus();

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        closeRef.current();
        return;
      }
      if (e.key !== "Tab" || !dialog) return;

      const items = dialog.querySelectorAll(
        'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];

      if (e.shiftKey && (document.activeElement === first || document.activeElement === dialog)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      previouslyFocused?.focus?.();
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[#0F172A]/60" onClick={onClose} aria-hidden="true" />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descId : undefined}
        tabIndex={-1}
        className={`relative max-h-[90vh] w-full ${maxWidth} overflow-y-auto rounded-2xl border border-[#E5E7EB] bg-[#FFFFFF] p-6 shadow-xl focus:outline-none sm:p-8`}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 rounded-lg p-2 text-[#4B5563] hover:bg-[#FAFAFB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E40AF]"
        >
          <X className="h-5 w-5" />
        </button>
        <h2 id={titleId} className="pr-8 text-xl font-bold text-[#1F2937]">
          {title}
        </h2>
        {description && (
          <p id={descId} className="mt-1 text-sm text-[#4B5563]">
            {description}
          </p>
        )}
        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
}
