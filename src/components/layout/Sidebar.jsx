import { X } from "lucide-react";

function NavList({ items, active, onSelect }) {
  return (
    <nav aria-label="Primary" className="flex flex-col gap-1 p-4">
      {items.map(({ label, icon: Icon }) => {
        const isActive = label === active;
        return (
          <button
            key={label}
            type="button"
            onClick={() => onSelect(label)}
            aria-current={isActive ? "page" : undefined}
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E40AF] ${
              isActive
                ? "bg-[#EFF6FF] text-[#1E40AF]"
                : "text-[#4B5563] hover:bg-[#FAFAFB] hover:text-[#1F2937]"
            }`}
          >
            <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
            {label}
          </button>
        );
      })}
    </nav>
  );
}

export default function Sidebar({ items, active, onSelect, open, onClose }) {
  return (
    <>
      {/* Desktop */}
      <aside className="hidden w-64 shrink-0 border-r border-[#E5E7EB] bg-[#FFFFFF] lg:block">
        <NavList items={items} active={active} onSelect={onSelect} />
      </aside>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-40 lg:hidden" role="dialog" aria-modal="true" aria-label="Navigation menu">
          <div className="absolute inset-0 bg-[#0F172A]/50" onClick={onClose} aria-hidden="true" />
          <aside className="relative h-full w-64 bg-[#FFFFFF] shadow-xl">
            <div className="flex h-16 items-center justify-between border-b border-[#E5E7EB] px-4">
              <span className="text-lg font-bold text-[#1E40AF]">Co-solve</span>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close navigation menu"
                className="rounded-lg p-2 text-[#4B5563] hover:bg-[#FAFAFB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E40AF]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <NavList
              items={items}
              active={active}
              onSelect={(label) => {
                onSelect(label);
                onClose();
              }}
            />
          </aside>
        </div>
      )}
    </>
  );
}
