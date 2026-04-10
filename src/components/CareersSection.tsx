const productAdvantages = [
  {
    title: "Fiber is a serious product",
    description:
      "When a household needs faster, more stable connectivity, the conversation starts from genuine utility. Fiber is easier to stand behind because the value is clear, practical, and increasingly expected.",
  },
  {
    title: "Security is easy to explain",
    description:
      "Smart home security gives families a product they can understand immediately: better awareness, better control, and more peace of mind. That creates cleaner consultative selling conversations at the door.",
  },
  {
    title: "Premier network partners matter",
    description:
      "Our teams represent high-quality network partners and respected market offerings, including premier fiber programs such as T-Fiber. That changes the tone of the job. Reps are not pushing gimmicks. They are presenting credible services customers already want.",
  },
];

const careerSteps = [
  {
    step: "01",
    role: "Field Representative",
    summary:
      "Build the fundamentals in direct-to-home outreach, consultative selling, and day-to-day territory execution.",
    details: [
      "Learn how to run a disciplined field day with strong talk tracks and follow-through.",
      "Develop confidence presenting fiber internet and smart home security in a way that feels professional and clear.",
      "Earn through performance while building the habits that create long-term advancement.",
    ],
  },
  {
    step: "02",
    role: "Team Lead",
    summary:
      "Move from individual production into leadership development, coaching, and team accountability.",
    details: [
      "Support new reps in the field, reinforce standards, and help maintain culture without losing execution quality.",
      "Contribute to recruiting, onboarding, and performance management as the team grows.",
      "Start thinking like an operator, not just a producer.",
    ],
  },
  {
    step: "03",
    role: "Area Manager",
    summary:
      "Take ownership of territory expansion, regional planning, and leadership across active markets such as North Carolina.",
    details: [
      "Manage larger teams, coordinate leaders, and protect execution standards across multiple areas.",
      "Understand the business side of growth: deployment, coverage planning, market pacing, and partner expectations.",
      "Build real management experience with room to lead expansion into new regions.",
    ],
  },
];

export function CareersSection() {
  return (
    <>
      <section
        id="product-advantage"
        className="border-t border-[#E5E5E5] bg-white px-5 py-16 sm:px-6 lg:px-8 lg:py-24"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-neutral-500">
                The Product Advantage
              </p>
              <h2 className="mt-4 max-w-sm text-4xl font-bold leading-[0.96] tracking-[-0.05em] text-black sm:text-5xl">
                Reps perform better when the product already carries weight.
              </h2>
            </div>

            <div className="lg:col-span-8">
              <div className="grid grid-cols-1 gap-8 border-t border-[#E5E5E5] pt-8 md:grid-cols-2 md:gap-10 lg:grid-cols-8">
                <div className="lg:col-span-5">
                  <p className="max-w-2xl text-lg font-normal leading-8 tracking-[0.01em] text-neutral-800 sm:text-xl">
                    Home Front Solutions recruits for a role that is easier to
                    respect because the underlying offer is strong. Fiber
                    internet is not a novelty purchase. It is a modern utility
                    with speed and reliability customers can feel. Smart home
                    security brings a second category with real everyday value.
                  </p>
                  <p className="mt-6 max-w-2xl text-base font-normal leading-7 tracking-[0.01em] text-neutral-600">
                    That matters in the field. Consultative selling is more
                    credible when the rep is representing premier network
                    partners, speaking to real household needs, and offering a
                    product that improves the customer experience from day one.
                  </p>
                </div>

                <div className="lg:col-span-3">
                  <div className="border-l border-[#E5E5E5] pl-5">
                    <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-neutral-500">
                      Why our reps win
                    </p>
                    <div className="mt-5 space-y-6">
                      {productAdvantages.map((item) => (
                        <div key={item.title}>
                          <h3 className="text-base font-semibold tracking-[-0.02em] text-black">
                            {item.title}
                          </h3>
                          <p className="mt-2 text-sm font-normal leading-6 tracking-[0.01em] text-neutral-600">
                            {item.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="career-trajectory"
        className="border-t border-[#E5E5E5] bg-[#FAFAFA] px-5 py-16 sm:px-6 lg:px-8 lg:py-24"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-neutral-500">
                The Career Trajectory
              </p>
              <h2 className="mt-4 max-w-sm text-4xl font-bold leading-[0.96] tracking-[-0.05em] text-black sm:text-5xl">
                Start in the field. Build toward leadership.
              </h2>
              <p className="mt-6 max-w-sm text-base font-normal leading-7 tracking-[0.01em] text-neutral-600">
                The opportunity is not framed as a short-term gig. It is a
                professional path built around leadership development, territory
                expansion, and business discipline.
              </p>
            </div>

            <div className="lg:col-span-8">
              <div className="grid grid-cols-1 gap-8 border-t border-[#E5E5E5] pt-8 md:grid-cols-6 lg:gap-y-12">
                {careerSteps.map((step, index) => (
                  <article
                    key={step.role}
                    className={`md:col-span-3 ${
                      index === 1 ? "md:mt-14" : ""
                    } ${index === 2 ? "md:col-span-4 lg:ml-14" : ""}`}
                  >
                    <div className="flex items-baseline gap-4">
                      <span className="text-3xl font-bold tracking-[-0.05em] text-neutral-300">
                        {step.step}
                      </span>
                      <div className="h-px flex-1 bg-[#E5E5E5]" />
                    </div>
                    <h3 className="mt-5 text-3xl font-bold leading-tight tracking-[-0.05em] text-black">
                      {step.role}
                    </h3>
                    <p className="mt-3 max-w-xl text-base font-normal leading-7 tracking-[0.01em] text-neutral-800">
                      {step.summary}
                    </p>
                    <div className="mt-6 space-y-4">
                      {step.details.map((detail) => (
                        <div
                          key={detail}
                          className="border-l border-[#E5E5E5] pl-4 text-sm font-normal leading-6 tracking-[0.01em] text-neutral-600"
                        >
                          {detail}
                        </div>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="recruiting-cta"
        className="border-t border-[#E5E5E5] bg-white px-5 py-16 sm:px-6 lg:px-8 lg:py-24"
      >
        <div className="mx-auto max-w-7xl">
          <div
            id="contact"
            className="grid grid-cols-1 gap-8 border border-[#E5E5E5] bg-[#FAFAFA] px-6 py-8 sm:px-8 sm:py-10 lg:grid-cols-12 lg:gap-10 lg:px-10 lg:py-12"
          >
            <div className="lg:col-span-7">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-neutral-500">
                Recruiting
              </p>
              <h2 className="mt-4 max-w-3xl text-4xl font-bold leading-[0.96] tracking-[-0.05em] text-black sm:text-5xl">
                Step into a role that rewards your drive.
              </h2>
              <p className="mt-5 max-w-2xl text-lg font-normal leading-8 tracking-[0.01em] text-neutral-800">
                This is an opportunity to represent premier network partners,
                build consultative selling skills, and grow into leadership with
                uncapped earning potential. The standard is professional, the
                product is credible, and the path forward is real.
              </p>
            </div>

            <div className="lg:col-span-5 lg:pl-8">
              <div className="border-t border-[#E5E5E5] pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
                <p className="text-sm font-normal leading-7 tracking-[0.01em] text-neutral-600">
                  If you want a field-marketing career with structure, support,
                  and room for territory expansion, we should talk.
                </p>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row lg:flex-col">
                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center bg-black px-6 py-3.5 text-sm font-semibold tracking-[0.01em] text-white transition hover:bg-neutral-800"
                  >
                    Apply to join the team
                  </a>
                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center border border-[#E5E5E5] bg-transparent px-6 py-3.5 text-sm font-semibold tracking-[0.01em] text-black transition hover:bg-white"
                  >
                    Talk to a recruiter
                  </a>
                </div>
                <p className="mt-5 text-sm font-normal leading-6 tracking-[0.01em] text-neutral-600">
                  Strong fit for candidates interested in direct sales,
                  leadership development, and long-term performance-based
                  growth.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
