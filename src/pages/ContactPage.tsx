import { SEOHead } from "../components/SEOHead";

export function ContactPage() {
  return (
    <>
      <SEOHead
        title="Contact"
        description="Contact Home Front Solutions LLC if you need a professional door-to-door telecom sales team in market."
        path="/contact"
      />
    <section className="bg-[#F5F5F7]">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-500">
              Contact
            </p>
            <h1 className="mt-5 text-5xl font-extrabold leading-[0.92] tracking-[-0.05em] text-[#1D1D1F] sm:text-6xl">
              Need a field team in market?
            </h1>
            <p className="mt-6 text-base leading-7 text-slate-700">
              Email us directly at muizz@homefrontsolutionsllc.com.
            </p>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <form
              action="https://formsubmit.co/muizz@homefrontsolutionsllc.com"
              method="POST"
              className="rounded-[2px] border border-[#E5E5E5] bg-white p-6 sm:p-8"
            >
              <input type="hidden" name="_subject" value="Home Front Solutions Contact Inquiry" />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_captcha" value="false" />

              <div className="grid gap-6">
                <label className="grid gap-2">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-500">
                    Name
                  </span>
                  <input
                    required
                    name="name"
                    className="rounded-[2px] border border-[#E5E5E5] px-4 py-3 text-sm text-[#1D1D1F]"
                  />
                </label>

                <label className="grid gap-2">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-500">
                    Company
                  </span>
                  <input
                    required
                    name="company"
                    className="rounded-[2px] border border-[#E5E5E5] px-4 py-3 text-sm text-[#1D1D1F]"
                  />
                </label>

                <label className="grid gap-2">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-500">
                    Market
                  </span>
                  <input
                    name="market"
                    className="rounded-[2px] border border-[#E5E5E5] px-4 py-3 text-sm text-[#1D1D1F]"
                  />
                </label>

                <label className="grid gap-2">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-500">
                    Message
                  </span>
                  <textarea
                    required
                    name="message"
                    rows={6}
                    className="rounded-[2px] border border-[#E5E5E5] px-4 py-3 text-sm text-[#1D1D1F]"
                  />
                </label>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-[2px] border border-[#1F3D2C] bg-[#1F3D2C] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#173223]"
                >
                  Send inquiry
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
