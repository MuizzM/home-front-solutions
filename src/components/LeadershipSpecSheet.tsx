import { motion } from "framer-motion";

const hierarchy = [
  {
    tier: "Lead",
    scope: "Regional D2D oversight",
    focus: "Sales strategy, partner reporting, market expansion, compliance governance",
    earnings: "Executive compensation path",
  },
  {
    tier: "Area Manager",
    scope: "Multi-market ownership",
    focus: "Territory management, recruiting support, leader retention, launch pacing",
    earnings: "High six-figure upside tied to production scale",
  },
  {
    tier: "Team Leader",
    scope: "Neighborhood team management",
    focus: "Training cadence, rep accountability, field quality control, close-rate coaching",
    earnings: "Commission plus leadership override",
  },
  {
    tier: "Field Representative",
    scope: "In-neighborhood execution",
    focus: "Door-to-door customer acquisition, route discipline, household penetration",
    earnings: "Uncapped commission structure",
  },
];

const specHighlights = [
  {
    label: "Train & Retain",
    description:
      "Managers are built through repeatable door-to-door coaching, structured handoff, and promotion tied to operating readiness.",
  },
  {
    label: "Industry-leading Training",
    description:
      "Every tier works from the same field language: territory planning, compliance control, objection handling, and close-rate discipline.",
  },
  {
    label: "Performance-based Promotion",
    description:
      "Advancement follows measured production, retention quality, and leadership consistency rather than tenure alone.",
  },
];

export function LeadershipSpecSheet() {
  return (
    <section id="leadership-spec-sheet" className="bg-white px-5 py-32 sm:px-6 lg:px-8">
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
              Door-to-Door Growth Spec-Sheet
            </p>
            <h2 className="mt-5 max-w-sm text-[2.9rem] font-extrabold leading-[0.9] tracking-[-0.05em] text-[#1D1D1F] sm:text-[4.5rem]">
              A management path built for serious door-to-door operators.
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
              Home Front Solutions develops management capacity the same way it
              develops market share: through repeatable door-to-door standards,
              direct sales coaching, and disciplined retention. The hierarchy is
              designed to move productive representatives into territory
              leadership without losing field momentum.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="col-span-12 overflow-hidden rounded-[2px] border border-[#E5E5E5] bg-[#F5F5F7]"
          >
            <div className="grid grid-cols-12 border-b border-[#E5E5E5] bg-white px-5 py-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-500 sm:px-8">
              <div className="col-span-12 md:col-span-3">Growth Tier</div>
              <div className="col-span-12 mt-3 md:col-span-3 md:mt-0">Operating Scope</div>
              <div className="col-span-12 mt-3 md:col-span-4 md:mt-0">Primary Responsibility</div>
              <div className="col-span-12 mt-3 md:col-span-2 md:mt-0">Earnings Potential</div>
            </div>

            {hierarchy.map((row, index) => (
              <div
                key={row.tier}
                className={`grid grid-cols-12 border-b border-[#E5E5E5] px-5 py-6 sm:px-8 ${
                  index === hierarchy.length - 1 ? "border-b-0" : ""
                }`}
              >
                <div className="col-span-12 md:col-span-3">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-500">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 text-2xl font-extrabold leading-none tracking-[-0.05em] text-[#1D1D1F]">
                    {row.tier}
                  </h3>
                </div>

                <div className="col-span-12 mt-5 md:col-span-3 md:mt-0">
                  <p className="text-base leading-7 tracking-[0.01em] text-slate-600">
                    {row.scope}
                  </p>
                </div>

                <div className="col-span-12 mt-5 md:col-span-4 md:mt-0">
                  <p className="max-w-xl text-base leading-7 tracking-[0.01em] text-slate-600">
                    {row.focus}
                  </p>
                </div>

                <div className="col-span-12 mt-5 md:col-span-2 md:mt-0">
                  <p className="text-base leading-7 tracking-[0.01em] text-[#1D1D1F]">
                    {row.earnings}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>

          <div className="col-span-12 grid grid-cols-12 gap-y-8 lg:gap-x-8">
            {specHighlights.map((item, index) => (
              <motion.article
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{
                  duration: 0.5,
                  delay: 0.08 + index * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`col-span-12 border-t border-[#E5E5E5] pt-6 ${
                  index === 0 ? "lg:col-span-6" : "lg:col-span-3"
                }`}
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-500">
                  {item.label}
                </p>
                <p className="mt-4 max-w-xl text-base leading-7 tracking-[0.01em] text-slate-600">
                  {item.description}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
