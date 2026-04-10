import { ArrowUpRight, Menu } from "lucide-react";
import { motion } from "framer-motion";

const navigationItems = [
  { label: "Overview", href: "#top" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Coverage", href: "#stats" },
  { label: "Recruiting", href: "#talent" },
];

export function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-50 border-b border-[#E5E5E5] bg-[#FAFAFA]/88 backdrop-blur-xl"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-12 items-center gap-4 px-5 py-4 sm:px-6 lg:px-8">
        <a href="/" className="col-span-7 min-w-0 lg:col-span-3">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-[2px] border border-[#E5E5E5] bg-white">
              <span className="text-lg font-bold tracking-[-0.05em] text-[#111111]">
                HF
              </span>
            </div>
            <div className="min-w-0">
              <p className="truncate text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-neutral-500">
                Home Front Solutions
              </p>
              <p className="truncate text-sm tracking-[0.01em] text-neutral-700">
                Fiber deployment sales operations
              </p>
            </div>
          </div>
        </a>

        <nav
          aria-label="Primary"
          className="col-span-6 hidden items-center justify-center gap-8 lg:flex"
        >
          {navigationItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-medium tracking-[0.01em] text-neutral-600 transition-colors hover:text-[#111111]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="col-span-5 flex items-center justify-end gap-3 lg:col-span-3">
          <a
            href="#talent"
            className="hidden rounded-[2px] border border-[#E5E5E5] bg-transparent px-4 py-3 text-sm font-medium tracking-[0.01em] text-[#111111] transition-colors hover:bg-white sm:inline-flex"
          >
            Join the Team
          </a>
          <a
            href="#capabilities"
            className="inline-flex items-center gap-2 rounded-[2px] bg-[#111111] px-4 py-3 text-sm font-medium tracking-[0.01em] text-white transition-colors hover:bg-[#005BC5] sm:px-5"
          >
            Partner with Us
            <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} />
          </a>
          <button
            type="button"
            aria-label="Open navigation"
            className="inline-flex h-11 w-11 items-center justify-center rounded-[2px] border border-[#E5E5E5] bg-white text-[#111111] lg:hidden"
          >
            <Menu className="h-4 w-4" strokeWidth={1.75} />
          </button>
        </div>
      </div>
      <nav aria-label="Mobile" className="border-t border-[#E5E5E5] px-5 py-3 lg:hidden">
        <div className="mx-auto flex max-w-7xl flex-wrap gap-x-5 gap-y-2 text-sm font-medium tracking-[0.01em] text-neutral-600 sm:px-1">
          {navigationItems.map((item) => (
            <a key={item.label} href={item.href} className="transition-colors hover:text-[#111111]">
              {item.label}
            </a>
          ))}
        </div>
      </nav>
    </motion.header>
  );
}
