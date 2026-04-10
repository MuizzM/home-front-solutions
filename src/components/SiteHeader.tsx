import { NavLink, useLocation } from "react-router-dom";

const links = [
  { to: "/", label: "Home" },
  { to: "/careers", label: "Careers" },
  { to: "/contact", label: "Contact" }
];

export function SiteHeader() {
  const location = useLocation();
  const isApplicationRoute =
    location.pathname.includes("/apply") || location.pathname.includes("/thank-you");

  return (
    <header className="border-b border-[#E5E5E5] bg-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid gap-3 py-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
          <NavLink to="/" className="min-w-0">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-[2px] border border-[#E5E5E5] bg-[#F5F5F7] text-sm font-bold tracking-[-0.05em] text-[#1D1D1F]">
                HF
              </div>
              <div className="min-w-0">
                <p className="truncate text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-500">
                  HOME FRONT SOLUTIONS
                </p>
                <p className="truncate text-sm font-medium tracking-[-0.02em] text-[#1D1D1F]">
                  Last-mile customer acquisition
                </p>
              </div>
            </div>
          </NavLink>

          <div className="flex items-center justify-between gap-4 md:justify-end">
            <nav className="flex flex-wrap items-center gap-x-5 gap-y-2" aria-label="Primary">
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `text-sm font-medium transition-colors ${
                      isActive ? "text-[#1D1D1F]" : "text-slate-500 hover:text-[#1D1D1F]"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            {!isApplicationRoute ? (
              <NavLink
                to="/careers"
                className="inline-flex rounded-[2px] border border-[#1F3D2C] bg-[#1F3D2C] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#173223]"
              >
                Join the field
              </NavLink>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
}
