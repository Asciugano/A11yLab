"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface Props<T extends string> {
  value: T;
  onChange: (value: T) => void;
  options: T[];
  placeholder?: string;
  icon?: React.ReactNode;
}

export default function EnumDropdown<T extends string>({
  value,
  onChange,
  options,
  placeholder = "Seleziona...",
  icon,
}: Props<T>) {
  const [open, setOpen] = useState(false);
  const dropDownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClinkOutside = (e: MouseEvent) => {
      if (
        dropDownRef.current &&
        !dropDownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClinkOutside);
    return () => document.removeEventListener("mousedown", handleClinkOutside);
  }, []);

  return (
    <div
      ref={dropDownRef}
      className="relative rounded-lg px-3 py-2 bg-white dark:bg-neutral-900 cursor-pointer focus-within:ring-amber-400"
    >
      {/* Header */}
      <div
        className="flex items-center justify-between"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-3 text-neutral-800 dark:text-neutral-100">
          {icon}
          <span
            className={`bg-transparent ${
              value
                ? "text-neutral-800 dark:text-neutral-100"
                : "text-neutral-500 dark:text-neutral-500"
            }`}
          >
            {value ?? placeholder}
          </span>
        </div>
        {!open ? (
          <ChevronDown
            size={18}
            className="text-neutral-500 dark:text-neutral-400 transition-transform "
          />
        ) : (
          <ChevronUp
            size={18}
            className="text-neutral-500 dark:text-neutral-400 transition-transform "
          />
        )}
      </div>

      {open && (
        <ul className="absolute z-10 mt-1 left-0 bg-white dark:bg-neutral-900 rounded-lg shadow-lg max-h-40 overflow-auto min-w-[150px] max-w-[220px]">
          {options.map((opt: T) => (
            <li
              key={opt}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className="px-3 py-2 rounded-lg hover:bg-hover-primary text-neutral-800 dark:text-neutral-100 transition cursor-pointer truncate"
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
