export type Job = {
  slug: string;
  title: string;
  location: string;
  type: "Full-time" | "Part-time" | "1099";
  compensation: string;
  shortPitch: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  whatYouGet: string[];
  postedAt: string;
};

export const jobs: Job[] = [
  {
    slug: "fiber-sales-rep-greensboro-nc",
    title: "Fiber Sales Rep",
    location: "Greensboro, NC",
    type: "1099",
    compensation: "Uncapped commission",
    shortPitch: "Sell fiber in live neighborhoods. Paid every deal. No cap.",
    description:
      "This role is straight door-to-door sales in active Greensboro fiber markets. You work assigned neighborhoods, speak with homeowners, explain the offer clearly, and close the sale. We care about coverage, conversations, and installs that stick.",
    responsibilities: [
      "Work assigned routes in live serviceable neighborhoods.",
      "Sell fiber internet and smart home security door to door.",
      "Handle objections, qualify homeowners, and close clean deals.",
      "Track activity and report what happened in the field."
    ],
    requirements: [
      "18 or older.",
      "Reliable transportation.",
      "Comfortable talking to people in person.",
      "Able to hold a route and keep working when it gets hot."
    ],
    whatYouGet: [
      "Uncapped commission.",
      "Paid every deal.",
      "Field coaching from working sales leaders.",
      "A product people already want."
    ],
    postedAt: "2025-01-10"
  },
  {
    slug: "field-sales-rep-greensboro-nc",
    title: "Field Sales Rep",
    location: "Greensboro, NC",
    type: "1099",
    compensation: "Uncapped commission",
    shortPitch: "Strong market. Easy product. No ceiling on what you can make.",
    description:
      "This is a producing field role in Greensboro for someone who wants a real income path. You cover a neighborhood, control the conversation at the door, and get paid for every clean close.",
    responsibilities: [
      "Run daily route coverage with pace and consistency.",
      "Present fiber offers in plain language.",
      "Set follow-up when needed and close qualified households.",
      "Stay accountable to installs, not just paperwork."
    ],
    requirements: [
      "Strong work ethic.",
      "Reliable transportation.",
      "Coachability.",
      "Prior D2D or retail sales helps but is not required."
    ],
    whatYouGet: [
      "Uncapped commission.",
      "Paid every deal.",
      "Clear promotion path.",
      "Day-to-day field support."
    ],
    postedAt: "2025-01-10"
  },
  {
    slug: "team-lead-greensboro-nc",
    title: "Team Lead",
    location: "Greensboro, NC",
    type: "1099",
    compensation: "Uncapped commission + override",
    shortPitch: "Lead from the front. Coach reps. Keep the Greensboro market tight.",
    description:
      "You produce, coach, and keep standards in place. This role is for a working leader who can help reps improve, hold route quality, and keep the Greensboro market moving.",
    responsibilities: [
      "Lead a producing team in the field.",
      "Coach reps on talk tracks, route discipline, and closing.",
      "Support recruiting and onboarding.",
      "Report pace, quality, and field issues clearly."
    ],
    requirements: [
      "Strong production track record.",
      "Able to coach without babysitting.",
      "Comfortable leading in the field.",
      "Reliable transportation."
    ],
    whatYouGet: [
      "Commission plus leadership override.",
      "Promotion path into Area Manager.",
      "Direct input on team growth.",
      "A market you can actually influence."
    ],
    postedAt: "2025-01-10"
  },
  {
    slug: "entry-level-d2d-rep-greensboro-nc",
    title: "Entry-Level D2D Rep",
    location: "Greensboro, NC",
    type: "1099",
    compensation: "Uncapped commission",
    shortPitch: "No ceiling. Learn fast. Get paid when you close.",
    description:
      "This is an entry point for someone in Greensboro who wants to learn door-to-door sales the right way. You do not need years of experience. You need consistency, grit, and the ability to keep moving through a route.",
    responsibilities: [
      "Learn the pitch and run assigned neighborhoods.",
      "Speak with homeowners and build basic product confidence.",
      "Take coaching and apply it fast.",
      "Keep your route organized and your notes clean."
    ],
    requirements: [
      "18 or older.",
      "Reliable transportation.",
      "Willing to learn direct sales.",
      "Comfortable hearing no and moving to the next door."
    ],
    whatYouGet: [
      "Uncapped commission.",
      "Paid every deal.",
      "Industry-leading training.",
      "A straight path into full-time production."
    ],
    postedAt: "2025-01-10"
  }
];

export function getJobBySlug(slug: string) {
  return jobs.find((job) => job.slug === slug);
}
