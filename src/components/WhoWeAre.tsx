const servicePillars = [
  {
    title: "Direct sales execution",
    copy:
      "We support customer acquisition programs where field presence, message control, and consistent rep activity matter.",
  },
  {
    title: "Rep development",
    copy:
      "Growth is sustained through coaching, leadership support, and clear performance expectations across the team.",
  },
  {
    title: "Operational partnership",
    copy:
      "We work like an extension of the program, staying focused on execution quality, team support, and accountability.",
  },
];

export function WhoWeAre() {
  return (
    <section
      id="who-we-are"
      className="border-t border-[#E5E5E5] bg-[#FAFAFA] px-5 py-16 sm:px-6 lg:px-8 lg:py-24"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-neutral-500">
              Who we are
            </p>
            <h2 className="mt-4 max-w-sm text-4xl font-bold leading-[0.96] tracking-[-0.05em] text-black sm:text-5xl">
              Built for execution, not agency theater.
            </h2>
          </div>

          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 gap-8 border-t border-[#E5E5E5] pt-8 md:grid-cols-2 md:gap-10 lg:grid-cols-[1.25fr_0.75fr]">
              <div>
                <p className="max-w-2xl text-lg font-normal leading-8 tracking-[0.01em] text-neutral-800 sm:text-xl">
                  Home Front Solutions supports telecom growth where rollout
                  strategy meets real neighborhoods, real reps, and real
                  execution pressure. Our work is centered on field deployment,
                  team structure, and the day-to-day operating rhythm required
                  to build penetration.
                </p>
                <p className="mt-6 max-w-2xl text-base font-normal leading-7 tracking-[0.01em] text-neutral-600">
                  The model is operational by design. We focus on boots-on-the-ground
                  execution, recruiting continuity, leadership support, and
                  market penetration logistics that can hold up under regional
                  expansion.
                </p>
              </div>

              <div className="border border-[#E5E5E5] bg-white p-6">
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-neutral-500">
                  What defines us
                </p>
                <ul className="mt-5 space-y-4">
                  {servicePillars.map((pillar) => (
                    <li key={pillar.title} className="border-t border-[#E5E5E5] pt-4 first:border-t-0 first:pt-0">
                      <h3 className="text-base font-semibold tracking-[-0.02em] text-black">
                        {pillar.title}
                      </h3>
                      <p className="mt-2 text-sm font-normal leading-6 tracking-[0.01em] text-neutral-600">
                        {pillar.copy}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
