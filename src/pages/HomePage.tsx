import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, MapPinned, RadioTower, Users } from "lucide-react";
import { SEOHead } from "../components/SEOHead";

const capabilities = [
  {
    title: "Last-mile customer acquisition",
    copy:
      "We help telecommunication companies turn live infrastructure into paying customers, one neighborhood at a time.",
    icon: RadioTower
  },
  {
    title: "Territory coverage",
    copy:
      "Routes are planned, assigned, and tracked so door-to-door activity stays organized and markets do not cool off.",
    icon: MapPinned
  },
  {
    title: "Rep deployment",
    copy:
      "We recruit, coach, and manage field reps who can carry a route, handle objections, and close fiber sales in person.",
    icon: Users
  }
];

const standards = [
  "Live-neighborhood field sales for fiber internet and smart home security",
  "Territory planning built around clean coverage and route discipline",
  "Daily communication with accountability tied to actual field activity",
  "Recruiting, onboarding, and rep support handled by working operators"
];

const differentiators = [
  {
    title: "Operator-led execution",
    copy:
      "We are built around production in the field. The work is route-based, people-facing, and measured by whether the market actually moves."
  },
  {
    title: "Clean market coverage",
    copy:
      "Neighborhoods need consistency. We keep coverage organized so telecom partners are not guessing which streets were worked and which were missed."
  },
  {
    title: "Recruiting with standards",
    copy:
      "We do not just place bodies in territory. We recruit people who can handle direct sales, take coaching, and grow into leadership."
  }
];

export function HomePage() {
  return (
    <>
      <SEOHead
        title="Door-to-Door Telecom Sales"
        description="Home Front Solutions LLC is a last-mile customer acquisition company for telecommunication companies. We handle door-to-door fiber sales, territory coverage, and field execution."
        path="/"
      />

      <section className="bg-[#FAFAF7]">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-7">
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-500">
                Last-Mile Customer Acquisition
              </p>
              <h1 className="mt-4 max-w-5xl text-4xl font-extrabold leading-[0.92] tracking-[-0.05em] text-[#1D1D1F] sm:text-5xl lg:text-[4.8rem]">
                We are the door-to-door sales partner telecommunication companies hire to win neighborhoods.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-700 sm:text-lg sm:leading-8">
                Home Front Solutions LLC handles last-mile customer acquisition for fiber internet providers with disciplined field coverage, strong rep management, and direct sales that convert at the door.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center rounded-[2px] border border-[#1F3D2C] bg-[#1F3D2C] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#173223]"
                >
                  Hire our team
                </Link>
                <Link
                  to="/careers"
                  className="inline-flex items-center justify-center rounded-[2px] border border-[#E5E5E5] bg-white px-6 py-3.5 text-sm font-semibold text-[#1D1D1F] transition-colors hover:border-[#1F3D2C] hover:text-[#1F3D2C]"
                >
                  Join the field
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-[2px] border border-[#E5E5E5] bg-white">
                <div className="border-b border-[#E5E5E5] px-5 py-4 sm:px-6">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-500">
                    Field standard
                  </p>
                </div>
                {standards.map((item) => (
                  <div key={item} className="flex gap-3 border-b border-[#E5E5E5] px-5 py-4 last:border-b-0 sm:px-6">
                    <CheckCircle2 className="mt-1 h-4 w-4 text-[#1F3D2C]" />
                    <p className="text-sm leading-6 text-slate-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-6 rounded-[2px] border border-[#E5E5E5] bg-white px-5 py-6 sm:px-8 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-500">
                Built for telecom operators
              </p>
              <p className="mt-3 max-w-sm text-2xl font-extrabold leading-tight tracking-[-0.05em] text-[#1D1D1F] sm:text-3xl">
                Serious field coverage without fake agency language.
              </p>
            </div>
            <div className="grid gap-5 md:grid-cols-3 lg:col-span-8">
              {differentiators.map((item) => (
                <article key={item.title} className="border-t border-[#E5E5E5] pt-4">
                  <h2 className="text-xl font-extrabold tracking-[-0.05em] text-[#1D1D1F]">
                    {item.title}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-slate-700">{item.copy}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-500">
                What we do
              </p>
              <h2 className="mt-3 max-w-sm text-3xl font-extrabold leading-tight tracking-[-0.05em] text-[#1D1D1F] sm:text-4xl">
                Field sales execution built for fiber and telecom growth.
              </h2>
            </div>
            <div className="lg:col-span-8">
              <div className="grid gap-4 md:grid-cols-3">
                {capabilities.map(({ title, copy, icon: Icon }) => (
                  <article key={title} className="rounded-[2px] border border-[#E5E5E5] bg-white p-5">
                    <Icon className="h-5 w-5 text-[#1F3D2C]" strokeWidth={1.75} />
                    <h3 className="mt-4 text-xl font-extrabold leading-tight tracking-[-0.05em] text-[#1D1D1F]">
                      {title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-slate-700 sm:text-base sm:leading-7">{copy}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10 rounded-[2px] border border-[#E5E5E5] bg-white px-5 py-8 sm:px-8">
            <div className="grid gap-8 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-500">
                  Careers
                </p>
                <h2 className="mt-3 max-w-3xl text-3xl font-extrabold leading-tight tracking-[-0.05em] text-[#1D1D1F] sm:text-4xl">
                  Want a real field sales role in telecom?
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-7 text-slate-700">
                  We hire door-to-door reps, team leaders, and market operators who can work a route, talk to people, and stay accountable to results.
                </p>
              </div>
              <div className="flex items-center lg:col-span-4 lg:col-start-9">
                <Link
                  to="/careers"
                  className="inline-flex items-center gap-2 rounded-[2px] border border-[#1F3D2C] bg-[#1F3D2C] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#173223]"
                >
                  See open roles
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
