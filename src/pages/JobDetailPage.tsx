import { Link, Navigate, useParams } from "react-router-dom";
import { getJobBySlug } from "../lib/jobs";
import { SEOHead } from "../components/SEOHead";
import { absoluteUrl } from "../lib/seo";

export function JobDetailPage() {
  const { slug } = useParams();
  const job = slug ? getJobBySlug(slug) : undefined;

  if (!job) {
    return <Navigate to="/careers" replace />;
  }

  const jobJsonLd = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.description,
    datePosted: job.postedAt,
    employmentType: "CONTRACTOR",
    hiringOrganization: {
      "@type": "Organization",
      name: "Home Front Solutions LLC",
      sameAs: absoluteUrl("/")
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Greensboro",
        addressRegion: "NC",
        addressCountry: "US"
      }
    },
    baseSalary: {
      "@type": "MonetaryAmount",
      currency: "USD",
      value: {
        "@type": "QuantitativeValue",
        minValue: 0,
        unitText: "COMMISSION"
      }
    },
    directApply: true,
    url: absoluteUrl(`/careers/${job.slug}`)
  };

  return (
    <>
      <SEOHead
        title={`${job.title} in Greensboro, NC`}
        description={`${job.title} in Greensboro, North Carolina. ${job.compensation}. Door-to-door telecom sales with Home Front Solutions LLC.`}
        path={`/careers/${job.slug}`}
        jsonLd={jobJsonLd}
      />
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-500">
              Job Detail
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-extrabold leading-[0.94] tracking-[-0.05em] text-[#1D1D1F] sm:text-5xl lg:text-6xl">
              {job.title}
            </h1>
            <p className="mt-4 text-base text-slate-700 sm:text-lg">
              {job.location} · 1099
            </p>
            <p className="mt-5 max-w-3xl text-base leading-7 text-slate-700 sm:text-lg sm:leading-8">
              Home Front Solutions is a last-mile customer acquisition company for telecommunication companies. This role is built around door-to-door sales, route discipline, and real production in the field.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to={`/careers/${job.slug}/apply`}
                className="inline-flex items-center justify-center rounded-[2px] border border-[#1F3D2C] bg-[#1F3D2C] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#173223]"
              >
                Apply now
              </Link>
              <Link
                to="/careers"
                className="inline-flex items-center justify-center rounded-[2px] border border-[#E5E5E5] bg-white px-6 py-3.5 text-sm font-semibold text-[#1D1D1F] transition-colors hover:border-[#1F3D2C] hover:text-[#1F3D2C]"
              >
                Back to careers
              </Link>
            </div>
          </div>

          <aside className="lg:col-span-3 lg:col-start-10">
            <div className="rounded-[2px] border border-[#E5E5E5] bg-[#F5F5F7] p-5 sm:p-6">
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-500">
                Compensation
              </p>
              <p className="mt-4 text-2xl font-extrabold tracking-[-0.05em] text-[#1D1D1F]">
                {job.compensation}
              </p>
              <p className="mt-4 text-sm leading-6 text-slate-700">
                Paid every deal. No cap on earnings. The more you close, the more you make.
              </p>
              <div className="mt-6 border-t border-[#E5E5E5] pt-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-500">
                  Market
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-700">{job.location}</p>
              </div>
              <div className="mt-5 border-t border-[#E5E5E5] pt-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-500">
                  Employment type
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-700">1099</p>
              </div>
              <Link
                to={`/careers/${job.slug}/apply`}
                className="mt-6 inline-flex w-full items-center justify-center rounded-[2px] border border-[#1F3D2C] bg-[#1F3D2C] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#173223]"
              >
                Apply now
              </Link>
            </div>
          </aside>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="border-t border-[#E5E5E5] pt-6">
              <h2 className="text-3xl font-extrabold tracking-[-0.05em] text-[#1D1D1F]">
                About the role
              </h2>
              <p className="mt-4 max-w-3xl text-base leading-7 text-slate-700 sm:text-lg sm:leading-8">
                {job.description}
              </p>
            </div>

            <div className="mt-10 border-t border-[#E5E5E5] pt-6">
              <h2 className="text-3xl font-extrabold tracking-[-0.05em] text-[#1D1D1F]">
                What you&apos;ll do
              </h2>
              <ul className="mt-4 space-y-3">
                {job.responsibilities.map((item) => (
                  <li key={item} className="text-base leading-7 text-slate-700">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 border-t border-[#E5E5E5] pt-6">
              <h2 className="text-3xl font-extrabold tracking-[-0.05em] text-[#1D1D1F]">
                What we&apos;re looking for
              </h2>
              <ul className="mt-4 space-y-3">
                {job.requirements.map((item) => (
                  <li key={item} className="text-base leading-7 text-slate-700">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 border-t border-[#E5E5E5] pt-6">
              <h2 className="text-3xl font-extrabold tracking-[-0.05em] text-[#1D1D1F]">
                Compensation & what you get
              </h2>
              <p className="mt-4 text-lg font-semibold text-[#1D1D1F]">
                Uncapped commission. Paid every deal. No cap.
              </p>
              <p className="mt-3 max-w-3xl text-base leading-7 text-slate-700">
                This is 1099 field work built for people who want control over their output. Training is provided, sales support is provided, and strong performance can open a path into team leadership.
              </p>
              <div className="mt-4 space-y-3">
                {job.whatYouGet.map((item) => (
                  <p key={item} className="text-base leading-7 text-slate-700">
                    {item}
                  </p>
                ))}
              </div>
            </div>

            <div className="mt-10 border-t border-[#E5E5E5] pt-6">
              <h2 className="text-3xl font-extrabold tracking-[-0.05em] text-[#1D1D1F]">
                About Home Front Solutions
              </h2>
              <p className="mt-4 max-w-3xl text-base leading-7 text-slate-700">
                We are a professional door-to-door sales agency that telecommunication companies hire when they need neighborhoods covered, customer acquisition handled in person, and last-mile growth taken seriously.
              </p>
            </div>
          </div>

          <div className="lg:col-span-3 lg:col-start-10">
            <div className="sticky top-24 rounded-[2px] border border-[#E5E5E5] bg-white p-6">
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-500">
                Ready
              </p>
              <h2 className="mt-4 text-2xl font-extrabold tracking-[-0.05em] text-[#1D1D1F]">
                Apply for this role
              </h2>
              <p className="mt-4 text-sm leading-6 text-slate-700">
                If you want a field sales role with a real product, direct coaching, and uncapped commission, start here.
              </p>
              <Link
                to={`/careers/${job.slug}/apply`}
                className="mt-6 inline-flex w-full items-center justify-center rounded-[2px] border border-[#1F3D2C] bg-[#1F3D2C] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#173223]"
              >
                Start application
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
