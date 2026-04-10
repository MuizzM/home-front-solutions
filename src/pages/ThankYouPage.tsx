import { Link, Navigate, useParams } from "react-router-dom";
import { getJobBySlug } from "../lib/jobs";
import { SEOHead } from "../components/SEOHead";

export function ThankYouPage() {
  const { slug } = useParams();
  const job = slug ? getJobBySlug(slug) : undefined;

  if (!job) {
    return <Navigate to="/careers" replace />;
  }

  return (
    <>
      <SEOHead
        title="Application Received"
        description={`Thank you for applying to ${job.title} with Home Front Solutions LLC.`}
        path={`/careers/${job.slug}/apply/thank-you`}
      />
      <section className="bg-[#FAFAF7]">
        <div className="mx-auto max-w-5xl px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-500">
          Application received
        </p>
        <h1 className="mt-5 max-w-4xl text-4xl font-extrabold leading-[0.92] tracking-[-0.05em] text-[#1D1D1F] sm:text-5xl lg:text-6xl">
          Thanks. We got your application.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700">
          Your application for {job.title} was submitted. Our recruiting team will review it and follow up if there is a fit.
        </p>

        <div className="mt-10 rounded-[2px] border border-[#E5E5E5] bg-white p-6 sm:p-8">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              "We review your application.",
              "We call qualified candidates within 48 hours.",
              "We run a short intro interview."
            ].map((item, index) => (
              <div key={item} className="border-t border-[#E5E5E5] pt-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-500">
                  Step 0{index + 1}
                </p>
                <p className="mt-3 text-base leading-7 text-slate-700">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <Link
            to="/careers"
            className="inline-flex items-center justify-center rounded-[2px] border border-[#1F3D2C] bg-[#1F3D2C] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#173223]"
          >
            Back to careers
          </Link>
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-[2px] border border-[#E5E5E5] bg-white px-6 py-3.5 text-sm font-semibold text-[#1D1D1F] transition-colors hover:border-[#1F3D2C] hover:text-[#1F3D2C]"
          >
            Back home
          </Link>
        </div>
        </div>
      </section>
    </>
  );
}
