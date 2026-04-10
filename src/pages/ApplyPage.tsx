import { FormEvent, useMemo, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { getJobBySlug } from "../lib/jobs";
import { SEOHead } from "../components/SEOHead";

type FormState = {
  fullName: string;
  phone: string;
  email: string;
  cityState: string;
  age18OrOlder: string;
  reliableTransportation: string;
  salesExperience: string;
  whyThisRole: string;
  heardAboutUs: string;
  consent: boolean;
};

const initialState: FormState = {
  fullName: "",
  phone: "",
  email: "",
  cityState: "",
  age18OrOlder: "yes",
  reliableTransportation: "yes",
  salesExperience: "None",
  whyThisRole: "",
  heardAboutUs: "Indeed",
  consent: false
};

const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY?.trim();

export function ApplyPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const job = useMemo(() => (slug ? getJobBySlug(slug) : undefined), [slug]);
  const [form, setForm] = useState<FormState>(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!job || !slug) {
    return <Navigate to="/careers" replace />;
  }

  const update = (key: keyof FormState, value: string | boolean) => {
    setForm((current) => ({ ...current, [key]: value }));
    if (error) {
      setError(null);
    }
  };

  const inputClassName =
    "w-full rounded-[2px] border border-[#E5E5E5] bg-white px-4 py-3.5 text-[15px] text-[#1D1D1F] outline-none transition-colors placeholder:text-slate-400 focus:border-[#1F3D2C]";

  const labelClassName = "text-sm font-medium text-[#1D1D1F]";

  const validate = () => {
    if (!form.fullName.trim()) return "Enter your full name.";
    if (!form.phone.trim()) return "Enter your phone number.";
    if (!form.email.trim() || !form.email.includes("@")) return "Enter a valid email.";
    if (!form.cityState.trim()) return "Enter your city and state.";
    if (form.whyThisRole.trim().length < 30) return "Tell us why you want the role in at least 30 characters.";
    if (!form.consent) return "Consent is required before submitting.";
    return null;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationError = validate();

    if (validationError) {
      setError(validationError);
      return;
    }

    if (!WEB3FORMS_ACCESS_KEY) {
      setError("Web3Forms is not configured yet. Add VITE_WEB3FORMS_ACCESS_KEY to .env.local.");
      return;
    }

    setError(null);
    setIsSubmitting(true);

    const message = [
      `Role: ${job.title}`,
      `Location: ${job.location}`,
      `Job slug: ${slug}`,
      "",
      `Full name: ${form.fullName}`,
      `Phone: ${form.phone}`,
      `Email: ${form.email}`,
      `City and state: ${form.cityState}`,
      `18 or older: ${form.age18OrOlder}`,
      `Reliable transportation: ${form.reliableTransportation}`,
      `Sales experience: ${form.salesExperience}`,
      `Heard about us: ${form.heardAboutUs}`,
      `Consent to contact: ${form.consent ? "yes" : "no"}`,
      "",
      "Why this role:",
      form.whyThisRole
    ].join("\n");

    const payload = {
      access_key: WEB3FORMS_ACCESS_KEY,
      subject: `Home Front Solutions Application - ${job.title} - ${job.location}`,
      from_name: "Home Front Solutions Careers",
      email: form.email,
      name: form.fullName,
      phone: form.phone,
      message,
      job_slug: slug,
      role: job.title,
      location: job.location,
      city_state: form.cityState,
      age_18_or_older: form.age18OrOlder,
      reliable_transportation: form.reliableTransportation,
      sales_experience: form.salesExperience,
      why_this_role: form.whyThisRole,
      heard_about_us: form.heardAboutUs,
      consent_to_contact: form.consent ? "yes" : "no",
      botcheck: false
    };

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Submission failed.");
      }

      navigate(`/careers/${slug}/apply/thank-you`);
    } catch (submissionError) {
      const message =
        submissionError instanceof Error && submissionError.message
          ? submissionError.message
          : "Could not submit the application right now. Try again.";
      setError(message);
      console.error(submissionError);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEOHead
        title={`Apply for ${job.title}`}
        description={`Apply for the ${job.title} role in Greensboro, North Carolina at Home Front Solutions LLC.`}
        path={`/careers/${slug}/apply`}
      />

      <section className="bg-[#FAFAF7]">
        <div className="mx-auto max-w-4xl px-5 py-14 sm:px-6 lg:px-8 lg:py-16">
          <div className="rounded-[2px] border border-[#E5E5E5] bg-white">
            <div className="border-b border-[#E5E5E5] px-5 py-6 sm:px-8">
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-500">
                Apply
              </p>
              <h1 className="mt-4 text-3xl font-extrabold leading-[0.95] tracking-[-0.05em] text-[#1D1D1F] sm:text-4xl lg:text-5xl">
                {job.title}
              </h1>
              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-600">
                <span>{job.location}</span>
                <span className="hidden text-slate-300 sm:inline">/</span>
                <span>1099</span>
                <span className="hidden text-slate-300 sm:inline">/</span>
                <span>{job.compensation}</span>
              </div>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-700">
                Training is provided. Sales support is provided. Fill this out and we will review it directly.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="px-5 py-6 sm:px-8 sm:py-8" noValidate>
              <div className="grid gap-6">
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="grid gap-2">
                    <span className={labelClassName}>Full name</span>
                    <input
                      value={form.fullName}
                      onChange={(event) => update("fullName", event.target.value)}
                      className={inputClassName}
                      placeholder="Your full name"
                    />
                  </label>

                  <label className="grid gap-2">
                    <span className={labelClassName}>Phone</span>
                    <input
                      value={form.phone}
                      onChange={(event) => update("phone", event.target.value)}
                      className={inputClassName}
                      placeholder="(555) 555-5555"
                    />
                  </label>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="grid gap-2">
                    <span className={labelClassName}>Email</span>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(event) => update("email", event.target.value)}
                      className={inputClassName}
                      placeholder="name@example.com"
                    />
                  </label>

                  <label className="grid gap-2">
                    <span className={labelClassName}>City & State</span>
                    <input
                      value={form.cityState}
                      onChange={(event) => update("cityState", event.target.value)}
                      className={inputClassName}
                      placeholder="Greensboro, NC"
                    />
                  </label>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="grid gap-2">
                    <span className={labelClassName}>18 or older?</span>
                    <select
                      value={form.age18OrOlder}
                      onChange={(event) => update("age18OrOlder", event.target.value)}
                      className={inputClassName}
                    >
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </label>

                  <label className="grid gap-2">
                    <span className={labelClassName}>Reliable transportation?</span>
                    <select
                      value={form.reliableTransportation}
                      onChange={(event) => update("reliableTransportation", event.target.value)}
                      className={inputClassName}
                    >
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </label>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="grid gap-2">
                    <span className={labelClassName}>Sales experience</span>
                    <select
                      value={form.salesExperience}
                      onChange={(event) => update("salesExperience", event.target.value)}
                      className={inputClassName}
                    >
                      <option value="None">None</option>
                      <option value="Some">Some</option>
                      <option value="1+ years">1+ years</option>
                      <option value="3+ years">3+ years</option>
                    </select>
                  </label>

                  <label className="grid gap-2">
                    <span className={labelClassName}>How did you hear about us?</span>
                    <select
                      value={form.heardAboutUs}
                      onChange={(event) => update("heardAboutUs", event.target.value)}
                      className={inputClassName}
                    >
                      <option value="Indeed">Indeed</option>
                      <option value="Referral">Referral</option>
                      <option value="Instagram">Instagram</option>
                      <option value="Facebook">Facebook</option>
                      <option value="In the field">In the field</option>
                      <option value="Other">Other</option>
                    </select>
                  </label>
                </div>

                <label className="grid gap-2">
                  <span className={labelClassName}>Why this role?</span>
                  <textarea
                    rows={6}
                    value={form.whyThisRole}
                    onChange={(event) => update("whyThisRole", event.target.value)}
                    className={inputClassName}
                    placeholder="Tell us why you want the role and what kind of work ethic you bring."
                  />
                </label>

                <label className="flex items-start gap-3 rounded-[2px] border border-[#E5E5E5] bg-[#FAFAF7] p-4">
                  <input
                    type="checkbox"
                    checked={form.consent}
                    onChange={(event) => update("consent", event.target.checked)}
                    className="mt-1 h-4 w-4 rounded-[2px] border border-[#E5E5E5]"
                  />
                  <span className="text-sm leading-6 text-slate-700">
                    I agree to be contacted by SMS or email about this application.
                  </span>
                </label>

                {error ? (
                  <div className="rounded-[2px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                  </div>
                ) : null}

                <div className="flex flex-col gap-3 border-t border-[#E5E5E5] pt-6 sm:flex-row sm:items-center sm:justify-between">
                  <p className="max-w-md text-xs leading-5 text-slate-500">
                    Your application is sent directly to muizz@homefrontsolutionsllc.com.
                  </p>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Link
                      to={`/careers/${slug}`}
                      className="inline-flex items-center justify-center rounded-[2px] border border-[#E5E5E5] bg-white px-5 py-3 text-sm font-semibold text-[#1D1D1F] transition-colors hover:border-[#1F3D2C] hover:text-[#1F3D2C]"
                    >
                      Back to job post
                    </Link>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center justify-center rounded-[2px] border border-[#1F3D2C] bg-[#1F3D2C] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#173223] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isSubmitting ? "Submitting..." : "Submit application"}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
