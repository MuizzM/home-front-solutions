import { motion } from "framer-motion";
import { ArrowRight, BriefcaseBusiness, MapPinned, Target } from "lucide-react";
import { useMemo, useRef, useState } from "react";

const roles = [
  {
    title: "Field Representative",
    location: "North Carolina and expansion markets",
    type: "Full-time",
    summary:
      "Door-to-door customer acquisition for fiber internet and smart home security in live serviceable neighborhoods.",
    bullets: [
      "Run daily neighborhood coverage with clean route discipline and direct response talk tracks.",
      "Present fiber and security offers clearly, handle objections, and close qualified households.",
      "Report field activity accurately and maintain compliance in every conversation.",
    ],
  },
  {
    title: "Team Leader",
    location: "Regional field markets",
    type: "Full-time",
    summary:
      "Lead a producing team in the field while reinforcing standards, coaching reps, and protecting close-rate quality.",
    bullets: [
      "Support recruiting, onboarding, and in-field rep development.",
      "Manage team accountability, production rhythm, and neighborhood execution quality.",
      "Coordinate with Area Managers on territory pacing and performance improvement.",
    ],
  },
  {
    title: "Area Manager",
    location: "North Carolina / multi-market",
    type: "Full-time",
    summary:
      "Own territory management, market expansion, and leader development across active fiber deployment zones.",
    bullets: [
      "Oversee team leaders, field performance, and deployment pacing across multiple areas.",
      "Maintain partner-ready reporting, retention stability, and production consistency.",
      "Build management depth through structured coaching and promotion readiness.",
    ],
  },
];

export function CareersApplication() {
  const [selectedRole, setSelectedRole] = useState(roles[0].title);
  const formRef = useRef<HTMLDivElement | null>(null);

  const selectedRoleSummary = useMemo(
    () => roles.find((role) => role.title === selectedRole) ?? roles[0],
    [selectedRole],
  );

  const handleApply = (roleTitle: string) => {
    setSelectedRole(roleTitle);
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="careers" className="bg-[#F5F5F7] px-5 py-32 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-12 gap-y-14 lg:gap-x-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="col-span-12 lg:col-span-4"
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-500">
              Careers
            </p>
            <h2 className="mt-5 max-w-sm text-[2.9rem] font-extrabold leading-[0.9] tracking-[-0.05em] text-[#1D1D1F] sm:text-[4.5rem]">
              Open roles for serious door-to-door operators.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.5, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="col-span-12 border-t border-[#E5E5E5] pt-8 lg:col-span-5 lg:col-start-7"
          >
            <p className="max-w-2xl text-[1.05rem] leading-8 tracking-[0.01em] text-slate-600">
              Home Front Solutions hires for direct sales discipline, production
              consistency, and leadership upside. These are field roles tied to
              real telecom products, real neighborhoods, and real advancement.
            </p>
          </motion.div>

          <div className="col-span-12 grid grid-cols-12 gap-y-10 lg:gap-x-8">
            <div className="col-span-12 lg:col-span-6">
              <div className="space-y-5">
                {roles.map((role, index) => (
                  <motion.article
                    key={role.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.08 + index * 0.06,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="rounded-[2px] border border-[#E5E5E5] bg-white"
                  >
                    <div className="border-b border-[#E5E5E5] px-6 py-5">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-500">
                            Job Post
                          </p>
                          <h3 className="mt-3 text-[1.75rem] font-extrabold leading-none tracking-[-0.05em] text-[#1D1D1F]">
                            {role.title}
                          </h3>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleApply(role.title)}
                          className="inline-flex items-center gap-2 rounded-[2px] border border-[#0066CC] bg-[#0066CC] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#005AB5]"
                        >
                          Apply
                          <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-12 gap-y-6 px-6 py-6">
                      <div className="col-span-12 flex flex-col gap-3 text-sm leading-6 text-slate-600 sm:flex-row sm:gap-6">
                        <div className="inline-flex items-center gap-2">
                          <BriefcaseBusiness className="h-4 w-4 text-[#0066CC]" strokeWidth={1.75} />
                          <span>{role.type}</span>
                        </div>
                        <div className="inline-flex items-center gap-2">
                          <MapPinned className="h-4 w-4 text-[#0066CC]" strokeWidth={1.75} />
                          <span>{role.location}</span>
                        </div>
                      </div>

                      <div className="col-span-12">
                        <p className="max-w-2xl text-base leading-7 tracking-[0.01em] text-slate-600">
                          {role.summary}
                        </p>
                      </div>

                      <div className="col-span-12 border-t border-[#E5E5E5] pt-5">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-500">
                          Responsibilities
                        </p>
                        <div className="mt-4 space-y-4">
                          {role.bullets.map((bullet) => (
                            <div key={bullet} className="flex gap-3">
                              <Target className="mt-1 h-4 w-4 shrink-0 text-[#0066CC]" strokeWidth={1.75} />
                              <p className="text-sm leading-6 tracking-[0.01em] text-slate-600">
                                {bullet}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>

            <motion.div
              ref={formRef}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="col-span-12 self-start rounded-[2px] border border-[#E5E5E5] bg-white lg:col-span-5 lg:col-start-8"
            >
              <div className="border-b border-[#E5E5E5] px-6 py-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-500">
                  Apply Now
                </p>
                <h3 className="mt-3 text-[1.75rem] font-extrabold leading-none tracking-[-0.05em] text-[#1D1D1F]">
                  Submit your application
                </h3>
                <p className="mt-4 max-w-xl text-sm leading-6 tracking-[0.01em] text-slate-600">
                  Selected role: <span className="font-semibold text-[#1D1D1F]">{selectedRoleSummary.title}</span>
                </p>
              </div>

              <form
                action="https://formsubmit.co/muizz@homefrontsolutionsllc.com"
                method="POST"
                className="grid grid-cols-1 gap-5 px-6 py-6"
              >
                <input type="hidden" name="_subject" value={`Home Front Solutions Application - ${selectedRole}`} />
                <input type="hidden" name="_template" value="table" />
                <input type="hidden" name="_captcha" value="false" />
                <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" />

                <label className="grid gap-2">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-500">
                    Role
                  </span>
                  <select
                    name="role"
                    value={selectedRole}
                    onChange={(event) => setSelectedRole(event.target.value)}
                    className="rounded-[2px] border border-[#E5E5E5] bg-white px-4 py-3 text-sm text-[#1D1D1F] outline-none transition-colors focus:border-[#0066CC]"
                  >
                    {roles.map((role) => (
                      <option key={role.title} value={role.title}>
                        {role.title}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="grid gap-2">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-500">
                    Full Name
                  </span>
                  <input
                    required
                    type="text"
                    name="full_name"
                    className="rounded-[2px] border border-[#E5E5E5] px-4 py-3 text-sm text-[#1D1D1F] outline-none transition-colors focus:border-[#0066CC]"
                    placeholder="Your full name"
                  />
                </label>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <label className="grid gap-2">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-500">
                      Email
                    </span>
                    <input
                      required
                      type="email"
                      name="email"
                      className="rounded-[2px] border border-[#E5E5E5] px-4 py-3 text-sm text-[#1D1D1F] outline-none transition-colors focus:border-[#0066CC]"
                      placeholder="name@example.com"
                    />
                  </label>

                  <label className="grid gap-2">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-500">
                      Phone
                    </span>
                    <input
                      required
                      type="tel"
                      name="phone"
                      className="rounded-[2px] border border-[#E5E5E5] px-4 py-3 text-sm text-[#1D1D1F] outline-none transition-colors focus:border-[#0066CC]"
                      placeholder="Best contact number"
                    />
                  </label>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <label className="grid gap-2">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-500">
                      Location
                    </span>
                    <input
                      type="text"
                      name="location"
                      className="rounded-[2px] border border-[#E5E5E5] px-4 py-3 text-sm text-[#1D1D1F] outline-none transition-colors focus:border-[#0066CC]"
                      placeholder="City, State"
                    />
                  </label>

                  <label className="grid gap-2">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-500">
                      Availability
                    </span>
                    <input
                      type="text"
                      name="availability"
                      className="rounded-[2px] border border-[#E5E5E5] px-4 py-3 text-sm text-[#1D1D1F] outline-none transition-colors focus:border-[#0066CC]"
                      placeholder="Immediate / two weeks / etc."
                    />
                  </label>
                </div>

                <label className="grid gap-2">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-500">
                    Sales Experience
                  </span>
                  <textarea
                    required
                    name="sales_experience"
                    rows={4}
                    className="rounded-[2px] border border-[#E5E5E5] px-4 py-3 text-sm text-[#1D1D1F] outline-none transition-colors focus:border-[#0066CC]"
                    placeholder="Briefly describe your door-to-door, telecom, retail, or customer acquisition experience."
                  />
                </label>

                <label className="grid gap-2">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-500">
                    Resume Link
                  </span>
                  <input
                    type="url"
                    name="resume_link"
                    className="rounded-[2px] border border-[#E5E5E5] px-4 py-3 text-sm text-[#1D1D1F] outline-none transition-colors focus:border-[#0066CC]"
                    placeholder="Google Drive, Dropbox, or LinkedIn URL"
                  />
                </label>

                <label className="grid gap-2">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-500">
                    Notes
                  </span>
                  <textarea
                    name="notes"
                    rows={4}
                    className="rounded-[2px] border border-[#E5E5E5] px-4 py-3 text-sm text-[#1D1D1F] outline-none transition-colors focus:border-[#0066CC]"
                    placeholder="Anything else you want the recruiting team to know."
                  />
                </label>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-[2px] border border-[#0066CC] bg-[#0066CC] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#005AB5]"
                >
                  Apply for {selectedRole}
                  <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
                </button>

                <p className="text-xs leading-5 tracking-[0.01em] text-slate-500">
                  Form submissions are routed to <span className="font-medium text-[#1D1D1F]">muizz@homefrontsolutionsllc.com</span>.
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
