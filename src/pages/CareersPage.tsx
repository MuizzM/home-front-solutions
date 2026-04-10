import { Link } from "react-router-dom";
import { ArrowRight, BriefcaseBusiness, GraduationCap, MapPinned, TrendingUp } from "lucide-react";
import { jobs } from "../lib/jobs";
import { SEOHead } from "../components/SEOHead";

const growthSteps = [
  {
    step: "01",
    title: "Field Representative",
    copy: "Learn the route, the pitch, the close, and the pace required to make real money in the field."
  },
  {
    step: "02",
    title: "Team Leader",
    copy: "Coach reps in market, protect standards, and help keep neighborhood coverage and close quality tight."
  },
  {
    step: "03",
    title: "Area Manager",
    copy: "Own market performance, recruiting rhythm, and leadership development across the territory."
  }
];

const contractorPerks = [
  "1099 flexibility. Your schedule can move around the field, not an office clock.",
  "You own your output. More closes means more money.",
  "Unlimited upside. There is no cap if you can produce.",
  "Training is provided. Sales support is provided. You do not get dropped in blind."
];

export function CareersPage() {
  return (
    <>
      <SEOHead
        title="Careers in Greensboro, NC"
        description="1099 door-to-door fiber sales jobs in Greensboro, North Carolina. Uncapped commission. Paid every deal. Real field sales roles at Home Front Solutions LLC."
        path="/careers"
      />
      <section className="bg-[#F5F5F7]">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-8 rounded-[2px] border border-[#E5E5E5] bg-white p-6 sm:p-8">
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-500">
              Careers at Home Front
            </p>
            <h1 className="mt-4 max-w-5xl text-4xl font-extrabold leading-[0.92] tracking-[-0.05em] text-[#1D1D1F] sm:text-5xl lg:text-[4.9rem]">
              Door-to-door telecom careers with a real product, real support, and room to lead.
            </h1>
            <div className="mt-6 grid gap-4 border-t border-[#E5E5E5] pt-6 sm:grid-cols-2">
              <p className="max-w-xl text-base leading-7 text-slate-700 sm:text-lg sm:leading-8">
                We help telecommunication companies win neighborhoods door by door. If you can work a route, talk to people, and stay accountable, this is a serious field role with uncapped commission and a leadership path.
              </p>
              <div className="grid gap-2 text-sm leading-6 text-slate-700 sm:pl-6">
                <p>Paid on every deal.</p>
                <p>Fiber is a strong product customers already understand.</p>
                <p>Every current opening is 1099 in Greensboro, North Carolina.</p>
                <p>Training and sales support are provided from day one.</p>
              </div>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="#open-roles"
                className="inline-flex items-center justify-center gap-2 rounded-[2px] border border-[#1F3D2C] bg-[#1F3D2C] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#173223]"
              >
                View open roles
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-[2px] border border-[#E5E5E5] bg-[#FAFAF7] px-5 py-3 text-sm font-semibold text-[#1D1D1F] transition-colors hover:border-[#1F3D2C] hover:text-[#1F3D2C]"
              >
                Ask a question
              </Link>
            </div>
          </div>

            <div className="grid gap-4 lg:col-span-4">
              <div className="rounded-[2px] border border-[#E5E5E5] bg-white p-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-500">
                Last-mile customer acquisition
              </p>
              <p className="mt-4 text-base leading-7 text-slate-700">
                We are a door-to-door sales company built for telecommunication companies that need neighborhoods covered, conversations held, and customers closed in person.
              </p>
            </div>
              <div className="rounded-[2px] border border-[#E5E5E5] bg-white p-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-500">
                Market
              </p>
              <p className="mt-4 text-2xl font-extrabold tracking-[-0.05em] text-[#1D1D1F]">
                Greensboro, North Carolina
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                All current openings are posted for Greensboro and structured as 1099 field roles.
              </p>
            </div>
          </div>
        </div>

          <div className="mt-8 rounded-[2px] border border-[#E5E5E5] bg-white px-5 py-6 sm:px-8">
          <div className="grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-500">
                Why people join
              </p>
            </div>
              <div className="grid gap-4 lg:col-span-9 md:grid-cols-3">
                <div className="border-t border-[#E5E5E5] pt-4">
                <p className="text-xl font-extrabold tracking-[-0.05em] text-[#1D1D1F]">
                  Real product
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-700">
                  Fiber internet is a strong offer. You are not pushing a gimmick.
                </p>
              </div>
                <div className="border-t border-[#E5E5E5] pt-4">
                <p className="text-xl font-extrabold tracking-[-0.05em] text-[#1D1D1F]">
                  Paid every deal
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-700">
                  No ceiling, no cap, and no quota games buried in the fine print.
                </p>
              </div>
                <div className="border-t border-[#E5E5E5] pt-4">
                <p className="text-xl font-extrabold tracking-[-0.05em] text-[#1D1D1F]">
                  Management path
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-700">
                  Strong reps can move into team leadership and territory management.
                </p>
              </div>
            </div>
          </div>
        </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-12">
            <div className="rounded-[2px] border border-[#E5E5E5] bg-white p-5 sm:p-6 lg:col-span-7">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-[#1F3D2C]" strokeWidth={1.75} />
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-500">
                Growth to leadership
              </p>
            </div>
            <div className="mt-5 grid gap-5 md:grid-cols-3">
              {growthSteps.map((item) => (
                <article key={item.step} className="border-t border-[#E5E5E5] pt-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-500">
                    {item.step}
                  </p>
                  <h2 className="mt-3 text-xl font-extrabold tracking-[-0.05em] text-[#1D1D1F]">
                    {item.title}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-slate-700">{item.copy}</p>
                </article>
              ))}
            </div>
            <p className="mt-6 border-t border-[#E5E5E5] pt-5 text-sm leading-6 text-slate-600">
              The path is simple: produce first, earn trust, then step into leadership with responsibility for people, pace, and territory expansion.
            </p>
          </div>

            <div className="rounded-[2px] border border-[#E5E5E5] bg-[#1D1D1F] p-5 sm:p-6 text-white lg:col-span-5">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4 text-white" strokeWidth={1.75} />
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/60">
                Why 1099 works here
              </p>
            </div>
            <div className="mt-5 space-y-4">
              {contractorPerks.map((item) => (
                <p key={item} className="border-t border-white/10 pt-4 text-sm leading-6 text-white/84 first:border-t-0 first:pt-0">
                  {item}
                </p>
              ))}
            </div>
            <p className="mt-6 border-t border-white/10 pt-4 text-sm leading-6 text-white/70">
              This is independent-contractor work for people who want control, upside, and a marketable sales skill they can build on.
            </p>
          </div>
        </div>

          <div className="mt-8 flex items-end justify-between gap-4 border-b border-[#E5E5E5] pb-4">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-500">
                Open roles
              </p>
              <h2 className="mt-2 text-3xl font-extrabold tracking-[-0.05em] text-[#1D1D1F] sm:text-4xl">
                Current Greensboro openings
              </h2>
            </div>
            <p className="hidden max-w-md text-sm leading-6 text-slate-600 md:block">
              Clean role summaries. Straight compensation language. Every position is 1099 and built around field performance.
            </p>
          </div>

          <div id="open-roles" className="mt-5 grid gap-3">
          {jobs.map((job) => (
            <Link
              key={job.slug}
              to={`/careers/${job.slug}`}
              className="rounded-[2px] border border-[#E5E5E5] bg-white p-5 transition-colors hover:border-[#1F3D2C] sm:p-6"
            >
              <div className="grid gap-5 lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-500">
                    {job.location}
                  </p>
                  <h2 className="mt-2 text-2xl font-extrabold leading-tight tracking-[-0.05em] text-[#1D1D1F] sm:text-3xl">
                    {job.title}
                  </h2>
                </div>

                <div className="lg:col-span-6">
                  <div className="flex flex-col gap-3 text-sm leading-6 text-slate-600 sm:flex-row sm:flex-wrap sm:gap-6">
                    <div className="inline-flex items-center gap-2">
                      <BriefcaseBusiness className="h-4 w-4 text-[#1F3D2C]" strokeWidth={1.75} />
                      <span>{job.type}</span>
                    </div>
                    <div className="inline-flex items-center gap-2">
                      <MapPinned className="h-4 w-4 text-[#1F3D2C]" strokeWidth={1.75} />
                      <span>{job.compensation}</span>
                    </div>
                  </div>
                  <p className="mt-3 text-base leading-7 text-slate-700">{job.shortPitch}</p>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                    Training provided. Sales support provided. Professional door-to-door telecom sales in {job.location}, with room to grow into leadership.
                  </p>
                </div>

                <div className="flex items-center lg:col-span-2 lg:justify-end">
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#1F3D2C]">
                    View role
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        </div>
      </section>
    </>
  );
}
