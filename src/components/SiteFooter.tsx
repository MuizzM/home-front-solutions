import { Link } from "react-router-dom";

export function SiteFooter() {
  return (
    <footer className="border-t border-[#E5E5E5] bg-white">
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-500">
              HF
            </p>
            <p className="mt-3 text-lg font-semibold tracking-[-0.03em] text-[#1D1D1F]">
              HOME FRONT SOLUTIONS
            </p>
            <p className="mt-4 max-w-xs text-sm leading-6 text-slate-600">
              Last-mile customer acquisition for telecommunication companies that need disciplined door-to-door execution.
            </p>
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-500">
              Navigate
            </p>
            <div className="mt-4 grid gap-3 text-sm text-slate-700">
              <Link to="/">Home</Link>
              <Link to="/careers">Careers</Link>
              <Link to="/contact">Contact</Link>
            </div>
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-500">
              Contact
            </p>
            <div className="mt-4 grid gap-3 text-sm text-slate-700">
              <p>muizz@homefrontsolutionsllc.com</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
