import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Network, RadioTower, ShieldCheck } from "lucide-react";
import { useRef } from "react";

const serviceSpecs = [
  {
    title: "Door-to-Door Fiber Sales",
    body: "Neighborhood canvassing, address qualification, and household conversion aligned to live FTTH serviceability.",
    icon: RadioTower,
  },
  {
    title: "Customer Acquisition",
    body: "Direct response talk tracks, in-field objection handling, and clean close discipline built for D2D telecom marketing.",
    icon: Network,
  },
  {
    title: "Territory Management",
    body: "Route pacing, rep coverage, and real-time territory visibility across active fiber and smart security neighborhoods.",
    icon: ShieldCheck,
  },
];

export function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const headlineY = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const bodyY = useTransform(scrollYProgress, [0, 1], [24, 0]);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="overflow-x-clip bg-[#F5F5F7] px-5 py-32 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-12 gap-y-16 lg:gap-x-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{ y: headlineY }}
            className="col-span-12 lg:col-span-6"
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-500">
              Door-to-Door Marketing
            </p>
            <h1 className="mt-6 max-w-5xl text-[3.4rem] font-extrabold leading-[0.86] tracking-[-0.05em] text-[#1D1D1F] sm:text-[5rem] lg:text-[6.8rem]">
              The Standard for
              <br />
              Door-to-Door Execution.
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
            style={{ y: bodyY }}
            className="col-span-12 grid grid-cols-12 gap-y-8 lg:col-span-12"
          >
            <div className="col-span-12 border-t border-[#E5E5E5] pt-8 lg:col-span-2 lg:col-start-7">
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-500">
                Core Role
              </p>
            </div>

            <div className="col-span-12 lg:col-span-5">
              <p className="max-w-xl text-[1.05rem] leading-8 tracking-[0.01em] text-slate-600 sm:text-[1.15rem]">
                Home Front Solutions is a door-to-door marketing company built
                for fiber internet and smart home security growth. We put trained
                reps in neighborhoods, manage territory coverage, and turn ISP
                buildouts into real household penetration through disciplined
                direct sales execution.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <a
                  href="#leadership-spec-sheet"
                  className="inline-flex items-center justify-center gap-2 rounded-[2px] border border-[#0066CC] bg-[#0066CC] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#005AB5]"
                >
                  Review Leadership Path
                  <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} />
                </a>
                <a
                  href="#leadership-spec-sheet"
                  className="inline-flex items-center justify-center rounded-[2px] border border-[#E5E5E5] bg-white px-6 py-3.5 text-sm font-semibold text-[#1D1D1F] transition-colors hover:border-[#0066CC] hover:text-[#0066CC]"
                >
                  Open Spec-Sheet
                </a>
              </div>
            </div>

            <div className="col-span-12 lg:col-span-5">
              <div className="border border-[#E5E5E5] bg-white">
                <div className="border-b border-[#E5E5E5] px-6 py-5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-500">
                    Service Specs
                  </p>
                  <h2 className="mt-3 text-[1.55rem] font-extrabold leading-tight tracking-[-0.05em] text-[#1D1D1F]">
                    Door-to-door market view
                  </h2>
                </div>

                <div className="border-b border-[#E5E5E5] p-6">
                  <div className="aspect-[16/10] overflow-hidden rounded-[2px] border border-[#E5E5E5] bg-[#F5F5F7]">
                    <svg
                      viewBox="0 0 720 420"
                      className="h-full w-full"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-label="Field deployment map"
                    >
                      <rect width="720" height="420" fill="#F5F5F7" />
                      <path
                        d="M52 330L156 252L238 268L332 182L430 198L526 112L660 136"
                        stroke="#1D1D1F"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M92 110L198 148L292 128L388 188L500 172L616 236"
                        stroke="#B7BCC5"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M120 352L216 304L308 326L396 280L492 300L620 258"
                        stroke="#B7BCC5"
                        strokeWidth="1.5"
                      />
                      {[156, 332, 526, 660].map((cx, index) => (
                        <circle
                          key={cx}
                          cx={cx}
                          cy={[252, 182, 112, 136][index]}
                          r="7"
                          fill="#0066CC"
                        />
                      ))}
                    </svg>
                  </div>
                </div>

                <div className="grid grid-cols-1 divide-y divide-[#E5E5E5]">
                  {serviceSpecs.map(({ title, body, icon: Icon }) => (
                    <article key={title} className="grid grid-cols-12 gap-4 px-6 py-5">
                      <div className="col-span-2 sm:col-span-1">
                        <Icon className="h-4 w-4 text-[#0066CC]" strokeWidth={1.75} />
                      </div>
                      <div className="col-span-10 sm:col-span-11">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-500">
                          {title}
                        </p>
                        <p className="mt-3 max-w-lg text-sm leading-6 tracking-[0.01em] text-slate-600">
                          {body}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
