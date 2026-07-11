// @ts-nocheck
import { useState, useEffect, useRef } from "react";

// ── Design tokens (navy + gold system) ───────────────────────────
var PAPER = "#FFFFFF";            // primary page background (white)
var PAPER_DEEP = "#F5F7FA";       // banded light-gray section (FAQ, How-it-works)
var SURF = "#FFFFFF";
var SURF2 = "#F9FAFB";
var INK = "#0F2A44";              // deep navy headline ink
var INK_SOFT = "#1F3D5C";
var RULE = "#E3E8ED";             // hairline on white
var MUTED = "#5A6B76";            // body text
var MUTED2 = "#8A96A0";
var NAVY = "#0B2540";             // hero + dark section background
var NAVY_DEEP = "#081A2E";        // footer/deeper navy
var NAVY_SOFT = "#163A5A";        // navy-on-navy border/elevated surface
var SIGNAL = "#1E6D6B";           // primary teal (accent italic, service icons)
var SIGNAL_DEEP = "#155159";      // hover / deeper teal
var SIGNAL_SOFT = "#DDEEEE";      // soft teal tint
var SIGNAL_SOFTER = "#EEF6F6";
var SAGE = "#8FB09B";
var GOLD = "#F5B942";             // primary CTA gold (Book a Call)
var GOLD_DEEP = "#E0A42A";
var GOLD_SOFT = "#FCEAC0";
// HFS brand green — primary action color (matches the teal-green in the HFS logo).
// Kept the BLUE_* names because they're used everywhere internally as the
// semantic "primary action" tokens; the hex values carry the brand.
var BLUE_PRIMARY = "#3EA394";     // HFS green — buttons, focus rings, active nav
var BLUE_DEEP = "#2A8277";        // deeper green — hover/pressed states
var BLUE_SOFT = "#DFF2EE";        // soft tint — badge backgrounds, card surfaces
var BLUE_LIGHT = "#F1FBF8";       // light panel bg (HFS Coach section)
var CLAY = "#C25A3D";
var FOREST = SIGNAL;
var FOREST_SOFT = SIGNAL_SOFT;
var LOGO = "/logo-transparent.png";

// ── Rep-portal API helpers ─────────────────────────────────────────
// Every protected call MUST go through apiFetch so the Bearer token
// is attached automatically. Never bypass this to hit the portal API
// directly from a component.
function getApiBase() {
  if (typeof import.meta !== "undefined" && import.meta && import.meta.env && import.meta.env.VITE_API_URL) {
    return String(import.meta.env.VITE_API_URL).replace(/\/$/, "");
  }
  return "/api";
}

function getStoredToken() {
  if (typeof window === "undefined") return null;
  try {
    var expiry = window.localStorage.getItem("hfs_token_expires_at") || window.sessionStorage.getItem("hfs_token_expires_at");
    if (expiry && Date.now() > Number(expiry)) {
      // Expired — clear it so we don't send a stale token
      window.localStorage.removeItem("hfs_access_token");
      window.localStorage.removeItem("hfs_token_expires_at");
      window.sessionStorage.removeItem("hfs_access_token");
      window.sessionStorage.removeItem("hfs_token_expires_at");
      return null;
    }
    return window.localStorage.getItem("hfs_access_token") || window.sessionStorage.getItem("hfs_access_token");
  } catch (e) { return null; }
}

function clearStoredToken() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem("hfs_access_token");
    window.localStorage.removeItem("hfs_token_expires_at");
    window.sessionStorage.removeItem("hfs_access_token");
    window.sessionStorage.removeItem("hfs_token_expires_at");
  } catch (e) {}
}

function apiFetch(path, options) {
  var opts = options || {};
  var headers = Object.assign({ Accept: "application/json" }, opts.headers || {});
  var token = getStoredToken();
  if (token) headers["Authorization"] = "Bearer " + token;
  return fetch(getApiBase() + path, Object.assign({}, opts, {
    headers: headers,
    // `credentials: include` also sends the HttpOnly cookie as a fallback,
    // so the backend accepts either transport.
    credentials: "include"
  })).then(function(res) {
    if (res.status === 401) clearStoredToken();
    return res;
  });
}
var INSTAGRAM_URL = "https://www.instagram.com/homefrontsolutions/";
var LINKEDIN_URL = "https://www.linkedin.com/company/home-front-solutions";
var FACEBOOK_URL = "https://www.facebook.com/homefrontsolutionsllc";
// Outlook Bookwithme scheduler. Every Book-a-call CTA site-wide points here.
var BOOKING_URL = "https://outlook.office.com/bookwithme/user/0ea888e3efef4c00ae2eeb04410d7e15@Homefrontsolutionsllc.com/meetingtype/C4O5zoQ0vUK3IHFUZlU87Q2?bookingcode=62272f10-6dfb-4114-a855-3b596b4fb081&anonymous&ismsaljsauthenabled&ep=mlink";
// The internal field-rep portal — a SEPARATE app on its own subdomain. The marketing
// site only links out to it; portal UI never renders inside this site.
var PORTAL_URL = "https://portal.homefrontsolutionsllc.com";

// Display — bold clean sans (Geist), consistent weights
var serif = { fontFamily: "'Geist', 'Inter', sans-serif", fontWeight: 700, letterSpacing: "-0.024em" };
var monoKicker = { fontFamily: "'Geist', 'Inter', sans-serif", fontSize: 13, letterSpacing: 0, textTransform: "none", fontWeight: 600 };

var PARTNERS = ["Fiber Internet", "Home Security", "Solar", "Water Filtration", "Roofing", "Home Services"];

var JOBS = [
  {
    slug: "fiber-sales-rep-high-point",
    title: "Fiber Sales Representative",
    location: "High Point, NC",
    type: "Contract",
    earningRange: "$100,000 . $185,000",
    posted: "April 10, 2026",
    pitch: "Sell premium residential fiber internet door-to-door for AT&T Fiber, T-Mobile Fiber, and our other top ISP partners. Earn six figures your first year with paid training and uncapped commission.",
    overview: "Home Front Solutions is hiring driven, professional Fiber Sales Representatives for our High Point, NC market. As a Fiber Sales Rep, you will represent the country's most trusted internet brands directly to homeowners in your assigned territory. We provide everything you need to succeed: comprehensive paid training, branded gear, a defined neighborhood territory, and ongoing coaching from experienced team leaders. Top performers consistently earn $150,000 or more in their first year.",
    responsibilities: [
      "Engage homeowners in professional, in-person conversations about fiber internet upgrades",
      "Educate customers on speeds, pricing, installation timelines, and product benefits",
      "Qualify leads, present custom plans, address objections with confidence",
      "Close sales at the door and schedule installation appointments",
      "Follow up with customers to confirm successful installation and activation",
      "Hit daily and weekly targets for doors knocked, conversations held, and deals closed",
      "Log all activity in the company CRM at the end of each shift",
      "Represent Home Front Solutions and our partner brands with integrity and professionalism",
    ],
    qualifications: [
      "Must be 18 years of age or older",
      "Reliable personal transportation and a valid driver's license",
      "Smartphone with active data plan",
      "Strong communication skills and a positive, professional attitude",
      "Willingness to work outdoors in varied weather conditions",
      "Coachable, accountable, and eager to learn",
      "Authorization to work in the United States",
      "No prior sales experience required. We train you from day one",
    ],
    benefits: [
      "Uncapped commission, paid weekly via direct deposit",
      "First-year earnings of $100,000 to $185,000 (top performers earn more)",
      "Comprehensive paid training program (6 modules, 5 days)",
      "AI-powered sales coaching and pitch practice tools",
      "Branded uniform, ID badge, and field equipment provided at no cost",
      "Defined sales territory with daily team support",
      "Clear promotion path to Team Lead and Area Manager",
      "Performance bonuses and incentive programs for top closers",
      "Independent-contractor flexibility with direct control over your production",
      "Flexible Monday through Saturday schedule",
    ],
  },
  {
    slug: "fiber-sales-rep-greensboro",
    title: "Fiber Sales Representative",
    location: "Greensboro, NC",
    type: "Contract",
    earningRange: "$100,000 . $185,000",
    posted: "April 10, 2026",
    pitch: "Join our growing Greensboro field team selling premium fiber internet for the country's top ISPs. Six-figure earning potential, paid training, and a real career path.",
    overview: "Home Front Solutions is hiring Fiber Sales Representatives to join our Greensboro, NC field team. You will work an assigned residential territory, talk to homeowners about upgrading their internet service, and close them on premium fiber from our partner network including AT&T Fiber, T-Mobile Fiber, Astound, Brightspeed, and Frontier. We provide everything you need to be successful from day one.",
    responsibilities: [
      "Engage homeowners in professional, in-person conversations about fiber internet upgrades",
      "Educate customers on speeds, pricing, installation timelines, and product benefits",
      "Qualify leads, present custom plans, and close sales at the door",
      "Schedule installation appointments and follow up to confirm activation",
      "Hit daily and weekly targets for doors knocked, conversations, and closes",
      "Log activity in the company CRM at the end of each shift",
      "Represent Home Front Solutions and our partner brands with professionalism",
    ],
    qualifications: [
      "Must be 18 years of age or older",
      "Reliable personal transportation and a valid driver's license",
      "Smartphone with active data plan",
      "Strong communication skills and a positive attitude",
      "Willingness to work outdoors and on your feet",
      "Coachable and willing to learn",
      "Authorization to work in the United States",
      "No experience required. Full training provided",
    ],
    benefits: [
      "Uncapped commission, paid weekly",
      "First-year earnings of $100,000 to $185,000",
      "Comprehensive paid training program",
      "AI-powered sales coaching",
      "Branded gear and equipment provided",
      "Defined territory with team support",
      "Promotion path to leadership roles",
      "Performance bonuses for top producers",
    ],
  },
  {
    slug: "fiber-sales-rep-winston-salem",
    title: "Fiber Sales Representative",
    location: "Winston-Salem, NC",
    type: "Contract",
    earningRange: "$100,000 . $185,000",
    posted: "April 10, 2026",
    pitch: "New market launch in Winston-Salem. Get in on the ground floor of a growing territory with full training, defined leads, and uncapped earning potential.",
    overview: "Home Front Solutions is launching our Winston-Salem, NC market and hiring driven Fiber Sales Representatives to be part of the founding field team. This is a ground-floor opportunity to build a long-term sales career with a company that promotes from within. You will receive complete paid training before entering the field and work an assigned territory selling premium fiber internet to homeowners.",
    responsibilities: [
      "Launch and develop your assigned Winston-Salem territory",
      "Engage homeowners about fiber internet upgrades",
      "Qualify, present, and close sales at the door",
      "Schedule installations and confirm activation with customers",
      "Hit daily activity targets",
      "Submit accurate daily activity reports through the CRM",
      "Build a reputation as the go-to fiber rep in your neighborhood",
    ],
    qualifications: [
      "Must be 18 years of age or older",
      "Reliable transportation and a valid driver's license",
      "Smartphone with data",
      "Willingness to work outdoors in varied weather",
      "Coachable, competitive, and self-motivated",
      "Authorization to work in the United States",
      "No experience required",
    ],
    benefits: [
      "Uncapped commission, paid weekly",
      "First-year earnings of $100,000 to $185,000",
      "Full paid training before your first day in the field",
      "AI-powered coaching tools",
      "Branded gear and ID provided",
      "Ground-floor opportunity in a brand new market",
      "Fast-track promotion path for top performers",
    ],
  },
  {
    slug: "team-lead",
    title: "Sales Team Lead",
    location: "Piedmont Triad",
    type: "Contract",
    earningRange: "$150,000 . $250,000",
    posted: "April 10, 2026",
    pitch: "Lead a 4 to 6 representative field sales team. Personal commission plus team override means top Team Leads earn $200K+ annually.",
    overview: "Home Front Solutions is hiring an experienced Sales Team Lead to manage and develop a field team of 4 to 6 representatives. This is a player-coach role where you will run morning meetings, ride along with new reps to provide in-field training, hold the team accountable to weekly install targets, and continue closing your own personal sales pipeline. Compensation is structured as personal commission plus an override on every install your team closes. Top Team Leads at Home Front consistently earn $200,000 or more annually.",
    responsibilities: [
      "Lead and develop a team of 4 to 6 field sales representatives day to day",
      "Run morning team meetings and end-of-day performance debriefs",
      "Conduct in-field ride-alongs and one-on-one coaching with new reps",
      "Hold the team accountable to daily activity and weekly install targets",
      "Maintain a personal sales pipeline and close your own deals",
      "Report team performance metrics to ownership weekly",
      "Identify and develop high-potential reps for promotion",
      "Coordinate with operations on territory assignments and coverage",
      "Conduct interviews and participate in hiring decisions",
    ],
    qualifications: [
      "Minimum 12 months of door-to-door sales experience (telecom or home services preferred)",
      "Demonstrated track record of personally hitting and exceeding sales targets",
      "Previous experience coaching, mentoring, or training sales reps",
      "Strong communication, accountability, and conflict resolution skills",
      "Reliable transportation and a valid driver's license",
      "Willing to be in the field with the team daily (this is not a desk role)",
      "Authorization to work in the United States",
    ],
    benefits: [
      "Personal commission, uncapped",
      "Team override on every installation your team closes",
      "First-year earnings of $150,000 to $250,000",
      "Direct line to ownership (we are owner-operated)",
      "Path to Area Manager within 12 to 18 months",
      "Real authority over how you run your team",
      "Independent structure with leadership upside tied directly to team production",
      "Annual leadership development retreat",
    ],
  },
  {
    slug: "entry-level-rep",
    title: "Entry-Level Sales Representative",
    location: "Piedmont Triad",
    type: "Contract",
    earningRange: "$100,000 . $145,000",
    posted: "April 10, 2026",
    pitch: "No experience needed. We will train you with AI-powered coaching tools and a 6-module certification program. Start earning weekly commission from day one.",
    overview: "If you have never done sales before, this is an excellent place to start. Home Front Solutions provides a complete six-module sales certification program with AI-powered coaching tools that score your practice pitches and give personalized feedback. You will work a part-time schedule (25+ hours per week) selling premium residential fiber internet door to door. Most of our top reps had no sales experience when they joined.",
    responsibilities: [
      "Work an assigned territory selling fiber internet to homeowners",
      "Complete the six-module sales certification program",
      "Practice the pitch with our AI coaching tool until you are confident",
      "Knock doors, qualify homeowners, present plans, and close sales",
      "Schedule installation appointments and confirm activation",
      "Attend training sessions, ride-alongs, and team meetings",
      "Track daily activity in the company CRM",
    ],
    qualifications: [
      "Must be 18 years of age or older",
      "Reliable transportation",
      "Available to work a minimum of 25 hours per week",
      "Willing to learn and willing to work outdoors",
      "Strong work ethic and positive attitude",
      "No prior sales experience required",
      "Authorization to work in the United States",
    ],
    benefits: [
      "Uncapped commission, paid weekly",
      "First-year earnings of $100,000 to $145,000",
      "Free six-module sales certification program",
      "AI-powered training that adapts to your learning speed",
      "Mentorship from a senior representative",
      "Branded gear and ID badge provided",
      "Path to Team Lead and higher-performing field roles",
      "Flexible scheduling within field hours",
    ],
  },
  {
    slug: "sales-internship-college-students",
    title: "Sales Internship for College Students",
    location: "Piedmont Triad, NC",
    type: "Internship",
    earningRange: "$40,000 . $85,000",
    posted: "April 10, 2026",
    pitch: "A summer and early-career sales internship for college students who want real communication skill, field experience, and performance-based income instead of generic internship busywork.",
    overview: "Home Front Solutions is hiring college students and recent graduates for a sales internship built around real field experience. Interns learn how door-to-door fiber sales works, practice with AI-powered coaching tools, work live neighborhoods with support, and build the communication, resilience, and accountability that strong sales careers require. This is a performance-based internship role with real earning potential and hands-on coaching.",
    responsibilities: [
      "Complete onboarding and sales certification modules before entering the field",
      "Shadow experienced reps and team leads in live neighborhoods",
      "Practice the pitch and objection handling with AI-powered coaching tools",
      "Speak with homeowners about fiber internet upgrades in assigned areas",
      "Learn how to qualify, present plans, and schedule installations",
      "Track activity and progress inside the company CRM",
      "Attend team meetings, field coaching sessions, and ride-alongs",
    ],
    qualifications: [
      "Must be 18 years of age or older",
      "Current college student, recent graduate, or early-career candidate",
      "Strong communication skills and willingness to learn",
      "Reliable transportation",
      "Comfortable working outdoors and speaking with people face to face",
      "Positive attitude, coachability, and professional presence",
      "Authorization to work in the United States",
    ],
    benefits: [
      "Performance-based pay with weekly commission",
      "Real-world sales internship experience instead of generic office work",
      "AI-powered training and live field coaching",
      "Skill development in communication, confidence, and objection handling",
      "Clear path into full-time field sales or leadership-track roles",
      "Flexible field schedule built for students and early-career applicants",
    ],
  },
];

var MARKET_PAGES = [
  {
    slug: "greensboro-nc",
    city: "Greensboro, NC",
    region: "Greensboro",
    title: "Fiber Sales Jobs in Greensboro, NC",
    headline: "Greensboro fiber sales jobs for serious field operators.",
    intro: "Home Front Solutions hires and develops field reps in Greensboro, North Carolina for in-person fiber internet customer acquisition. These roles are built for people who want uncapped earning potential, direct coaching, and a real path into team leadership.",
    localAngle: "Greensboro is one of the core markets we reference across the site, so this page gives search engines and applicants a clear local destination for Greensboro sales jobs, telecom roles, and fiber internet field work.",
    highlights: [
      "Performance-based field sales roles in active Greensboro neighborhoods",
      "Training, route support, and in-market coaching from working leaders",
      "Clear path from rep to team lead and area leadership"
    ],
    paragraphs: [
      "Greensboro is one of the clearest recruiting markets on this site because applicants genuinely search for Greensboro sales jobs, Greensboro telecom jobs, and fiber sales opportunities near them. This page gives those searches a direct landing page instead of forcing every query into a generic statewide careers page.",
      "For Greensboro applicants, the strongest fit is usually someone comfortable with neighborhood coverage, face-to-face selling, and production accountability. The language here is intentionally local and practical because the role itself is local and practical."
    ]
  },
  {
    slug: "high-point-nc",
    city: "High Point, NC",
    region: "High Point",
    title: "Fiber Sales Jobs in High Point, NC",
    headline: "High Point telecom sales jobs with strong upside.",
    intro: "Home Front Solutions recruits for fiber internet field sales in High Point, North Carolina with a straightforward commission structure, in-person selling, and real production expectations. This is not a desk job and it is not a vague recruiting page. It is for people who want to work a territory and get paid on closes.",
    localAngle: "High Point is the company’s home base in the Triad and should be one of the clearest local relevance signals on the site for sales-job queries.",
    highlights: [
      "High Point field routes tied to live telecom and fiber offers",
      "Weekly commission structure with uncapped upside",
      "Professional door-to-door environment with real standards"
    ],
    paragraphs: [
      "High Point matters not just because it is a city page, but because it reinforces one of the strongest local trust signals the site has: Home Front Solutions is headquartered in High Point, North Carolina. That makes High Point a core page for both recruiter credibility and local job discovery.",
      "Applicants searching High Point sales jobs, High Point telecom jobs, or field sales jobs near High Point should land on a page that reflects how the company actually talks about the work: direct, performance-based, and tied to real neighborhoods rather than vague marketing language."
    ]
  },
  {
    slug: "winston-salem-nc",
    city: "Winston-Salem, NC",
    region: "Winston-Salem",
    title: "Fiber Sales Jobs in Winston-Salem, NC",
    headline: "Winston-Salem roles for reps who want to grow with a live market.",
    intro: "Home Front Solutions hires in Winston-Salem for fiber and telecom sales roles that reward consistency, talk-track discipline, and the ability to hold a route. Applicants looking for Winston-Salem sales jobs should land on a page that clearly explains the market, the pay structure, and the expectations.",
    localAngle: "This page helps target Winston-Salem sales and telecom recruiting searches with direct local copy instead of generic statewide language.",
    highlights: [
      "Ground-floor market opportunity in Winston-Salem",
      "Performance-based structure with real coaching support",
      "Strong fit for coachable reps and working leaders"
    ],
    paragraphs: [
      "Winston-Salem has different search behavior from Greensboro and High Point, which is why it deserves its own page. People searching Winston-Salem sales jobs often want to see the city reflected directly in the title, body copy, and supporting links before they trust the page enough to click deeper.",
      "This market page is designed to support that local intent while still connecting applicants back into the shared careers funnel. The role expectations stay the same: route discipline, clear communication, resilience in the field, and the ability to turn conversations into installs."
    ]
  },
  {
    slug: "piedmont-triad-nc",
    city: "Piedmont Triad, NC",
    region: "Piedmont Triad",
    title: "Sales Jobs in the Piedmont Triad",
    headline: "Piedmont Triad sales careers built around field performance.",
    intro: "Home Front Solutions operates across the Piedmont Triad with recruiting language that should match how applicants actually search: Greensboro jobs, High Point jobs, Winston-Salem jobs, and broader Triad telecom sales opportunities.",
    localAngle: "The Piedmont Triad page acts as the regional parent page and reinforces geographic relevance across the cluster instead of forcing every query into a single city.",
    highlights: [
      "Regional coverage across Greensboro, High Point, and Winston-Salem",
      "Performance-based sales roles tied to territory execution and install quality",
      "Useful for broader Triad and surrounding-market job searches"
    ],
    paragraphs: [
      "The Piedmont Triad page works as the regional hub in the location cluster. It is useful because not every applicant searches by city first. Many search for Triad sales jobs, Piedmont Triad telecom jobs, or broader North Carolina field sales opportunities.",
      "By keeping a regional page alongside the city pages, the site can support both local and regional job-intent queries. That creates a stronger internal structure than trying to make one page rank for Greensboro, High Point, Winston-Salem, Lexington, and Charlotte all at once."
    ]
  },
  {
    slug: "lexington-nc",
    city: "Lexington, NC",
    region: "Lexington",
    title: "Fiber Sales Jobs Near Lexington, NC",
    headline: "Lexington-area sales opportunities tied to Triad growth.",
    intro: "For applicants searching Lexington, North Carolina sales jobs, this page clarifies that Home Front Solutions recruits for nearby field territories and expanding telecom coverage rather than generic remote work or office sales.",
    localAngle: "Lexington is close enough to Triad growth that it is worth targeting explicitly for local discovery and recruiter relevance.",
    highlights: [
      "Lexington-area recruiting tied to nearby active field markets",
      "Better fit for applicants who want in-person work with upside",
      "Clearer local search relevance for surrounding Triad communities"
    ],
    paragraphs: [
      "Lexington applicants may not always search for telecom sales specifically. Many start with broader queries like Lexington jobs, sales jobs near Lexington, or entry-level field sales near me. That makes this page valuable because it creates a more direct bridge from broad local job intent to the exact kind of work Home Front Solutions offers.",
      "The Lexington page also helps support surrounding-community relevance in the Triad cluster. It gives nearby applicants a clearer signal that the opportunity is local enough to matter, while still connecting back to the main careers and city pages."
    ]
  },
  {
    slug: "charlotte-nc",
    city: "Charlotte, NC",
    region: "Charlotte",
    title: "Fiber Sales Jobs in Charlotte, NC",
    headline: "Charlotte fiber sales jobs, telecom jobs, and field roles.",
    intro: "Charlotte is a larger, more competitive search market, so this page gives Home Front Solutions a cleaner local landing page for Charlotte fiber sales jobs, Charlotte telecom sales jobs, Charlotte field sales jobs, and field rep recruiting queries.",
    localAngle: "This page is designed to support real Charlotte search behavior, including broader job-intent phrases like sales jobs in Charlotte, telecom jobs in Charlotte, and entry-level field sales opportunities.",
    highlights: [
      "Charlotte-focused recruiting page for fiber sales jobs and telecom jobs",
      "Targets Charlotte sales and field rep queries",
      "Useful local landing page for applicants searching outside the Triad"
    ],
    paragraphs: [
      "Charlotte is a bigger and more competitive search environment, so generic copy will struggle there. This page is meant to give Home Front Solutions a clean Charlotte-specific recruiting presence that can grow over time with more role detail, campaign proof, and local references.",
      "For now, the goal is straightforward: create a credible local entry point for Charlotte sales jobs, Charlotte telecom jobs, Charlotte fiber sales jobs, Charlotte field marketing searches, and route interested applicants into the main role pages and application flow.",
      "If someone is searching for door-to-door sales jobs in Charlotte, telecom customer acquisition jobs in Charlotte, or a performance-based sales role with upside, this page should feel much closer to their real intent than a broad statewide careers page."
    ]
  },
  {
    slug: "raleigh-nc",
    city: "Raleigh, NC",
    region: "Raleigh",
    title: "Sales Jobs in Raleigh, NC",
    headline: "Raleigh sales jobs, field roles, and Triangle recruiting in one focused page.",
    intro: "Raleigh is a competitive Triangle market where generic statewide copy is too broad. This page gives Home Front Solutions a focused local destination for Raleigh sales jobs, field roles, early-career recruiting, and Triangle-area applicant discovery.",
    localAngle: "The value here is creating a strong Raleigh page that matches how people actually search across the Triangle, from local job seekers to students at nearby North Carolina universities.",
    highlights: [
      "Raleigh-targeted recruiting page for field sales and early-career opportunities",
      "Clear expectations, market context, and performance standards",
      "Built to support broader Triangle and North Carolina discovery"
    ],
    paragraphs: [
      "Raleigh is a market where local intent matters. Searchers want clearer city relevance, cleaner role framing, and enough internal structure to trust that the company is real rather than one broad careers page trying to cover every city in North Carolina.",
      "This page helps build that structure. It gives Raleigh its own recruiting destination while supporting broader Triangle discovery and connecting into deeper insight pages around sales careers, field growth, and student recruiting.",
      "That matters for searches like Raleigh sales jobs, entry-level sales jobs in Raleigh, Triangle field roles, and student-friendly opportunities near NC State, Duke, and UNC, where people want to see a page that reflects the market directly before they trust the site enough to apply."
    ]
  }
];

var ARTICLE_PAGES = [
  {
    slug: "d2d-success-stories",
    title: "D2D Success Stories: How Reps Build Real Income Fast",
    eyebrow: "Career Stories",
    description: "Real-world examples of why door-to-door sales can change the trajectory of someone who takes coaching, keeps a route, and learns how to close clean.",
    intro: "Door-to-door sales is one of the few careers where someone can change their income quickly without waiting years for promotions or credentials. The people who win in D2D are usually not the loudest people in the room. They are the people who keep showing up, keep improving, and get serious about repetition.",
    sections: [
      {
        heading: "What success actually looks like in D2D",
        body: "Most success stories in door-to-door start with consistency, not hype. A rep learns the talk track, gets more comfortable handling objections, and starts understanding how neighborhoods, timing, and positioning affect the close. That steady improvement compounds fast when the product is strong and the coaching is real."
      },
      {
        heading: "Why the best reps do not look flashy at first",
        body: "A lot of strong D2D reps begin as quiet, coachable people who simply get tougher every week. They learn how to control the first 20 seconds of the conversation, how to stay calm through rejection, and how to keep their confidence tied to their process instead of to one door."
      },
      {
        heading: "What the income upside changes",
        body: "For the right person, D2D success changes more than a paycheck. It builds communication skills, resilience, self-respect, and a real understanding of what production-based work feels like. That is why so many door-to-door success stories are really stories about people becoming sharper, more disciplined versions of themselves."
      }
    ]
  },
  {
    slug: "d2d-psychology",
    title: "D2D Psychology: Why Great Reps Think Differently",
    eyebrow: "Sales Psychology",
    description: "A practical look at the psychology behind successful door-to-door selling, from handling rejection to reading homeowners and keeping your own energy right.",
    intro: "Door-to-door sales is as much psychological as it is tactical. You are dealing with your own state, the homeowner’s first impression, the pressure of short conversations, and the constant need to reset after rejection. The reps who last understand that mindset is not fluff. It is part of the job.",
    sections: [
      {
        heading: "Rejection is information, not identity",
        body: "The strongest door-to-door reps stop personalizing every no. They learn to separate the outcome from the process. A bad interaction may have more to do with timing, attention, household context, or simple disinterest than with the rep’s value."
      },
      {
        heading: "Energy control matters more than fake hype",
        body: "Homeowners read pressure instantly. The best D2D psychology is calm confidence. Strong reps stay direct, respectful, and emotionally steady. They do not sound desperate, and they do not collapse when the conversation turns cold."
      },
      {
        heading: "The best closers stay curious",
        body: "Curiosity is underrated in sales psychology. Reps who ask better questions and listen well create better conversations. That builds trust faster than memorized pressure tactics ever will."
      }
    ]
  },
  {
    slug: "why-d2d-after-high-school-or-college",
    title: "Why D2D After High School or College Can Be a Smart Career Move",
    eyebrow: "Career Path",
    description: "Why door-to-door sales can be one of the strongest early-career moves for ambitious people coming out of high school or college.",
    intro: "Most people leaving high school or college are told to chase safe-looking jobs with low ceilings. Door-to-door is different. It teaches communication, discipline, rejection handling, territory ownership, and personal accountability faster than most entry-level work.",
    sections: [
      {
        heading: "You develop marketable skills fast",
        body: "D2D compresses skill development. In a short period of time, you learn how to start conversations, build trust, explain value, handle objections, and ask for commitment. Those are real skills that translate into sales, leadership, recruiting, entrepreneurship, and business."
      },
      {
        heading: "Income can outrun typical entry-level jobs",
        body: "For someone willing to work, performance-based D2D can produce more upside than many traditional entry-level roles. That matters for young people who want momentum, not just a paycheck that keeps them pinned in place."
      },
      {
        heading: "It reveals whether you are built for ownership",
        body: "Door-to-door forces clarity. You quickly learn whether you can handle pressure, manage your time, and stay accountable without somebody hovering over you. For a young person, that is valuable information and strong career training."
      }
    ]
  },
  {
    slug: "fiber-internet-gold-rush",
    title: "Why Fiber Optics Is the Next Gold Rush: BEAD, Data Centers, and Field Sales Growth",
    eyebrow: "Industry Trend",
    description: "How the BEAD program, data center growth, AI infrastructure, and residential broadband expansion are making fiber optics one of the strongest categories in field sales.",
    intro: "Fiber optics is no longer just a telecom story. It sits underneath residential internet upgrades, AI infrastructure, data center growth, enterprise connectivity, and the next wave of broadband expansion across the United States. That is why fiber has a gold-rush feel right now. The category is being pushed from multiple directions at once, which makes it one of the strongest long-term products for field sales and customer acquisition.",
    sections: [
      {
        heading: "The BEAD program is expanding broadband buildout",
        body: "The Broadband Equity, Access, and Deployment program is accelerating broadband expansion in underserved and unserved areas. That matters because infrastructure dollars eventually create real serviceability, and real serviceability creates real field-sales opportunity. When new neighborhoods come online, the demand window for customer acquisition opens with them."
      },
      {
        heading: "Data centers and AI are increasing demand for fiber infrastructure",
        body: "AI systems, cloud growth, and data centers all rely on more robust underlying connectivity. That does not mean every homeowner is thinking about data centers directly, but it does mean the broader economy is leaning harder on fiber infrastructure. When the backbone of the digital economy is expanding, local fiber adoption becomes part of a much bigger trend."
      },
      {
        heading: "Fiber is still easier to explain than most complicated offers",
        body: "For field sales, fiber remains attractive because the consumer value proposition is clear: faster speed, stronger reliability, better streaming, better gaming, and cleaner work-from-home performance. A product that already makes intuitive sense is easier for a newer rep to stand behind and easier for a homeowner to evaluate quickly."
      },
      {
        heading: "The best window is where infrastructure meets timing",
        body: "Gold-rush language makes sense when a category is expanding fast enough that timing matters. Fiber has that quality. New routes, newly serviceable neighborhoods, and strong partner brands create moments where route discipline and local execution matter a lot. That is where strong field teams can win quickly."
      },
      {
        heading: "Why this matters for applicants and operators",
        body: "Applicants want categories that feel real, not shaky. Operators want channels that match real market demand. Fiber sits in a rare position where the macro story, the infrastructure story, and the homeowner story all align. That is why it keeps showing up as one of the strongest product categories in D2D and field sales."
      }
    ]
  },
  {
    slug: "how-to-win-your-first-30-days-in-d2d",
    title: "How to Win Your First 30 Days in D2D Sales",
    eyebrow: "Training",
    description: "A practical guide to surviving and improving during your first month in door-to-door sales.",
    intro: "The first 30 days in door-to-door sales are where most people either build momentum or talk themselves out of the opportunity too early. The goal is not perfection. The goal is fast learning, emotional control, and enough repetition to get your footing.",
    sections: [
      {
        heading: "Do not judge yourself too early",
        body: "New reps often expect immediate smoothness. That is unrealistic. Your first month should be about reps, rhythm, and learning how to recover quickly after awkward conversations."
      },
      {
        heading: "Track controllables first",
        body: "Early on, the best scorecard is not just closes. It is doors knocked, conversations started, pitch repetitions, and whether you are actually applying coaching in the field."
      },
      {
        heading: "Build your confidence from proof",
        body: "Confidence grows faster when you can point to real improvement. Better openings, calmer energy, cleaner transitions, and stronger questions are all proof that your game is moving forward."
      }
    ]
  },
  {
    slug: "how-to-handle-rejection-in-door-to-door-sales",
    title: "How to Handle Rejection in Door-to-Door Sales Without Falling Apart",
    eyebrow: "Mindset",
    description: "A straight guide to dealing with rejection in D2D sales and keeping your confidence tied to process instead of emotion.",
    intro: "Rejection is built into door-to-door sales. The difference between people who stay in the game and people who leave is usually not talent first. It is whether they learn how to process rejection without letting it distort their next ten conversations.",
    sections: [
      {
        heading: "Do not carry one door into the next one",
        body: "A lot of reps lose more deals from emotional carryover than from bad talk tracks. One rough interaction can poison the next five if you let your energy drop."
      },
      {
        heading: "Normalize the no",
        body: "Most doors are not closes. Good reps accept that fast and keep moving. The no is normal. The reset is the skill."
      },
      {
        heading: "Use rejection to sharpen, not shrink",
        body: "The right response to rejection is curiosity. Was it timing, delivery, lack of certainty, or poor qualification? That mindset keeps you in learning mode instead of ego mode."
      }
    ]
  },
  {
    slug: "why-fiber-is-easier-to-sell-than-weak-products",
    title: "Why Fiber Internet Is Easier to Sell Than Weak Products",
    eyebrow: "Product Advantage",
    description: "Why a strong product category makes D2D sales more credible and more attractive for both new and experienced reps.",
    intro: "A strong product changes the entire sales environment. Fiber internet is easier to sell than weak, low-trust offers because homeowners already understand why better speed and reliability matter. That makes the conversation cleaner and the rep’s confidence more real.",
    sections: [
      {
        heading: "You do not have to invent demand",
        body: "When the product solves a problem customers already feel, the conversation becomes more direct. You are helping them evaluate an upgrade, not trying to force fake interest."
      },
      {
        heading: "Trust builds faster",
        body: "People are more open when the offer feels legitimate and useful. That changes body language, tone, and objection patterns in a way that helps newer reps learn faster."
      },
      {
        heading: "The rep can focus on execution",
        body: "With a good product, the challenge becomes route discipline, communication, and closing skill rather than defending something people do not really want."
      }
    ]
  },
  {
    slug: "sales-internship-for-college-students",
    title: "Why a Sales Internship Can Be Better Than a Generic College Internship",
    eyebrow: "Internships",
    description: "A direct guide for college students looking for a summer sales internship that actually builds confidence, communication skill, and income.",
    intro: "A lot of college internships look polished but produce very little growth. A real sales internship is different. It puts you in live conversations, forces you to handle pressure, and teaches communication faster than most low-accountability office roles.",
    sections: [
      {
        heading: "You build business skill in the real world",
        body: "A strong sales internship teaches you how to start conversations, explain value, handle objections, and ask for commitment. Those are durable skills that matter in sales, recruiting, entrepreneurship, leadership, and client-facing work."
      },
      {
        heading: "The feedback is immediate",
        body: "Many internships hide behind vague projects and light supervision. Sales gives you quick proof of what is working and what is not. That kind of immediate scorecard helps ambitious students improve much faster."
      },
      {
        heading: "The upside is not capped at a basic hourly wage",
        body: "For college students who want more than a resume line, performance-based selling can create real income and real confidence. It rewards pace, resilience, and coachability instead of just showing up."
      }
    ]
  },
  {
    slug: "best-summer-sales-job-for-18-to-25",
    title: "Why Fiber D2D Is One of the Best Summer Sales Jobs for 18 to 25 Year Olds",
    eyebrow: "Student Jobs",
    description: "Why ambitious younger candidates often do better in fiber sales than in low-ceiling hourly work, especially when they want speed, coaching, and upside.",
    intro: "For people between 18 and 25, the usual work options are often low-control and low-upside. Fiber door-to-door sales is different. It gives younger reps a strong product, clear coaching, and a pay structure tied to production rather than just attendance.",
    sections: [
      {
        heading: "Fiber is easier to stand behind than random offers",
        body: "Young reps usually perform better when the product is clear and useful. Fiber internet solves a real household problem, which makes the sales conversation feel more credible and easier to learn."
      },
      {
        heading: "You improve quickly in a live-feedback environment",
        body: "The 18 to 25 range is a strong fit for field selling because growth can happen fast. Reps get immediate reps on communication, rejection recovery, and coaching application every day."
      },
      {
        heading: "A serious summer role can create early-career separation",
        body: "A strong summer sales job does more than fill time. It teaches you how to produce, stay accountable, and create income through skill. That can separate a younger candidate from peers very quickly."
      }
    ]
  },
  {
    slug: "1099-taxes-for-door-to-door-sales-reps",
    title: "Money Management for Door-to-Door Sales Reps: What New Reps Should Know",
    eyebrow: "Money & Discipline",
    description: "A plain-English guide to planning for taxes, tracking pay, and staying organized as a new field sales rep.",
    intro: "A lot of new reps get intimidated by the money side of field sales before they understand it. The important thing is not panic. It is building the habit of planning ahead, tracking what you earn, and staying organized from the start.",
    sections: [
      {
        heading: "You are responsible for tax planning",
        body: "In performance-based field work, taxes are not always handled for you the way they often are in traditional employment. That means reps need to treat tax planning as part of being a professional. The earlier that habit starts, the easier the year goes."
      },
      {
        heading: "Good tracking reduces stress",
        body: "One of the smartest things a new rep can do is track income, business mileage, and work-related expenses cleanly from day one. Good records make tax season simpler and help the rep understand the real economics of the job."
      },
      {
        heading: "Discipline matters more than complexity",
        body: "For most new reps, the biggest challenge is not advanced tax strategy. It is consistency. Setting money aside regularly, staying organized, and avoiding last-minute scrambling can make the business side of the role feel much less intimidating."
      }
    ]
  },
  {
    slug: "telecom-industry-basics-for-fiber-sales-reps",
    title: "Telecom Industry Basics for Fiber Sales Reps and New Applicants",
    eyebrow: "Telecom Basics",
    description: "A simple overview of how the telecom and fiber internet industry works, and why that matters for sales reps, applicants, and customers.",
    intro: "The telecom industry can sound more complicated than it really is. For a field rep, the basics matter more than the jargon. You need to understand what the provider does, what the network does, why fiber is valuable, and how the customer experiences the service in the home.",
    sections: [
      {
        heading: "Fiber is an infrastructure product, not just a sales pitch",
        body: "One reason fiber is such a strong category is that it is tied to real infrastructure investment. Providers expand serviceability, neighborhoods become eligible, and reps step into that window to help customers upgrade. That makes the sales process more grounded in reality."
      },
      {
        heading: "Providers, dealers, and field teams all play different roles",
        body: "The provider owns the network and service. The dealer and field team help acquire customers, explain options, and move households toward installation. Understanding those roles helps new reps speak clearly and represent the brand professionally."
      },
      {
        heading: "The best reps connect product knowledge to household needs",
        body: "Telecom knowledge matters most when it helps a customer make a better decision. Reps do not need to sound technical for the sake of sounding technical. They need to explain speed, reliability, installation timing, and price in a way that makes sense to a real household."
      }
    ]
  },
  {
    slug: "best-sales-jobs-in-charlotte-nc",
    title: "Best Sales Jobs in Charlotte, NC for People Who Want Upside",
    eyebrow: "Charlotte Jobs",
    description: "A Charlotte-focused guide for applicants comparing sales jobs, field roles, and performance-based opportunities with real upside.",
    intro: "Charlotte is a bigger market, which means applicants have more choices and more noise to sort through. The best sales jobs in Charlotte are usually the ones that give you a real skill curve, real accountability, and income tied to production instead of only showing up.",
    sections: [
      {
        heading: "Charlotte rewards clear communicators",
        body: "In a larger market, competition exposes weak communication quickly. Roles that teach you how to explain value clearly, build trust fast, and stay composed under pressure tend to separate themselves from vague sales titles that sound better than they are."
      },
      {
        heading: "Field sales creates faster feedback than desk-heavy roles",
        body: "A lot of sales roles hide performance behind long cycles, internal meetings, and slow feedback loops. Field sales in Charlotte gives you immediate reps, cleaner accountability, and a faster understanding of whether your communication is actually improving."
      },
      {
        heading: "Upside matters when comparing Charlotte opportunities",
        body: "Many applicants in Charlotte are not only looking for a title. They are looking for momentum. That is why performance-based sales roles remain attractive for people who want stronger upside, a live market, and a clearer path into leadership."
      }
    ]
  },
  {
    slug: "best-entry-level-sales-jobs-in-raleigh-nc",
    title: "Best Entry-Level Sales Jobs in Raleigh, NC for Coachable Applicants",
    eyebrow: "Raleigh Jobs",
    description: "A Raleigh-focused article for applicants looking for entry-level sales jobs that teach real communication, confidence, and field discipline.",
    intro: "Raleigh applicants often want clarity first. They want to know what the role is, how quickly they can improve, and whether the opportunity feels legitimate. The best entry-level sales jobs in Raleigh usually make those answers clear instead of hiding behind polished but vague job language.",
    sections: [
      {
        heading: "The best entry-level jobs teach real communication",
        body: "An entry-level sales role should do more than give you a paycheck. It should improve how you speak, how you handle objections, how you ask questions, and how you hold your energy under pressure. Those are the skills that carry forward into stronger careers."
      },
      {
        heading: "Raleigh candidates respond well to straightforward role framing",
        body: "One reason local recruiting pages matter in Raleigh is that people want specifics. They want to know how the pay works, what kind of selling it involves, and whether the company sounds serious. Straight answers convert better than fluffy recruiting language."
      },
      {
        heading: "Coachable applicants can move faster than experienced but rigid ones",
        body: "In many field environments, a coachable applicant with the right attitude can improve faster than someone with bad habits. Entry-level does not have to mean low potential. In the right structure, it can mean fast growth."
      }
    ]
  },
  {
    slug: "raleigh-sales-jobs-for-nc-state-unc-duke-and-triangle-students",
    title: "Raleigh Sales Jobs for NC State, UNC, Duke, and Triangle Students",
    eyebrow: "Triangle Students",
    description: "A Raleigh- and Triangle-focused guide for students and recent grads comparing sales jobs, internships, and early-career options with real upside.",
    intro: "The Triangle produces ambitious students every year from NC State, UNC-Chapel Hill, Duke, UNC Charlotte, ECU, and other strong North Carolina schools. A lot of them are looking for work that feels sharper than low-ceiling hourly jobs or resume-padding internships. Raleigh sales jobs stand out when they offer live communication reps, real accountability, and a path to actual growth.",
    sections: [
      {
        heading: "Students from top North Carolina schools often want faster skill growth",
        body: "Candidates coming out of NC State, UNC, Duke, UNC Charlotte, ECU, and other North Carolina programs are usually not just looking for a paycheck. They want momentum. Sales gives them live reps in communication, persuasion, emotional control, and performance under pressure."
      },
      {
        heading: "The Triangle is a strong fit for business-minded students",
        body: "Raleigh and the broader Triangle attract people who care about business, technology, startups, and professional upside. That makes the market a strong fit for students who want to build real selling skill instead of sitting inside a vague internship with little pressure and even less feedback."
      },
      {
        heading: "A serious sales role can separate a student early",
        body: "The students who learn how to communicate clearly, handle objections, and create trust early usually carry that advantage into recruiting, leadership, entrepreneurship, and marketing. That is why stronger Raleigh sales roles can create more long-term value than generic student work."
      }
    ]
  },
  {
    slug: "greensboro-1099-sales-jobs-explained",
    title: "Greensboro Performance-Based Sales Jobs Explained for New Applicants",
    eyebrow: "Greensboro Jobs",
    description: "A Greensboro-focused guide to how performance-based sales work differs from hourly work and what applicants should expect.",
    intro: "A lot of Greensboro applicants want to understand how performance-based sales work before they apply. That is normal. The important thing is understanding what the structure means in practice: more personal responsibility, more upside, and a work style that rewards discipline.",
    sections: [
      {
        heading: "Clear pay structure matters more than vague promises",
        body: "The best sales roles are not vague. They are direct. You know the pay structure, the expectations, the market, and the standards. That clarity matters because performance-based work only feels attractive when the opportunity itself feels real."
      },
      {
        heading: "Greensboro applicants often compare hourly work against upside",
        body: "That comparison matters because hourly work usually offers more predictability but less upside. A Greensboro performance-based sales role can make sense for applicants who want faster income growth, more accountability, and a direct relationship between effort and results."
      },
      {
        heading: "Professionalism matters more in self-directed roles",
        body: "A self-directed structure rewards people who can stay organized, manage their schedule, and handle their own performance honestly. For the right applicant, that builds maturity and career leverage much faster than passive, low-accountability work."
      }
    ]
  },
  {
    slug: "best-sales-jobs-in-greensboro-nc",
    title: "Best Sales Jobs in Greensboro, NC for Applicants Who Want Real Upside",
    eyebrow: "Greensboro Jobs",
    description: "A Greensboro-focused guide for applicants comparing sales jobs, field roles, and income paths that reward skill instead of just attendance.",
    intro: "Greensboro has plenty of job listings, but not all sales jobs are equal. The strongest roles usually combine a real product, direct accountability, local market relevance, and an earning path that improves when the rep improves.",
    sections: [
      {
        heading: "The best Greensboro sales jobs have a real skill curve",
        body: "A real sales job should improve your communication, objection handling, confidence, and pace. If the role does not make you sharper, it is probably not building much long-term leverage."
      },
      {
        heading: "Field roles create faster feedback",
        body: "In-person field selling in Greensboro gives you immediate information about what is working and what is not. That makes growth faster than roles where performance hides behind internal meetings or slow sales cycles."
      },
      {
        heading: "Applicants who want upside should compare structure, not just title",
        body: "A polished title can still hide a low-ceiling role. The better comparison is whether the job offers coaching, production-based upside, local territory relevance, and a clean path into stronger responsibility."
      }
    ]
  },
  {
    slug: "best-entry-level-sales-jobs-in-high-point-nc",
    title: "Best Entry-Level Sales Jobs in High Point, NC for Coachable New Reps",
    eyebrow: "High Point Jobs",
    description: "A High Point-focused article for candidates who want an entry-level sales job that actually builds confidence, communication, and field discipline.",
    intro: "High Point candidates looking for entry-level work usually want a role that feels legitimate, local, and worth the effort. The best entry-level sales jobs in High Point make the expectations clear and give new reps a faster path to real skill.",
    sections: [
      {
        heading: "A good entry-level role should teach more than a script",
        body: "The best starting roles build communication under pressure, not just rote repetition. New reps should learn how to listen, explain value, respond to objections, and stay composed face to face."
      },
      {
        heading: "Local trust matters in High Point",
        body: "Candidates in High Point respond better when the role feels rooted in a real market instead of sounding like vague online recruiting language. Local relevance usually improves both confidence and conversion."
      },
      {
        heading: "Coachable candidates often outrun experienced but rigid ones",
        body: "In field sales, pace and openness to feedback matter. A new rep with the right attitude can often improve faster than someone who brings habits that do not hold up in live conversations."
      }
    ]
  },
  {
    slug: "best-summer-sales-internship-in-charlotte",
    title: "Best Summer Sales Internship in Charlotte for Students Who Want Real Growth",
    eyebrow: "Charlotte Internships",
    description: "A Charlotte-focused guide for students comparing summer internships and looking for one that builds communication skill, income potential, and confidence.",
    intro: "A summer internship in Charlotte should do more than fill a few months. The strongest internships give students live reps on communication, a real scorecard, and work that actually changes how they perform under pressure.",
    sections: [
      {
        heading: "The best internships in Charlotte teach live communication",
        body: "A serious sales internship gives students more than tasks and meetings. It puts them in situations where they have to explain value, ask better questions, and recover quickly when a conversation gets tough."
      },
      {
        heading: "Charlotte is a strong test market for ambitious students",
        body: "Charlotte has enough pace and competition to reward students who want faster growth. A stronger market makes weak habits more visible and good coaching more valuable."
      },
      {
        heading: "A summer role should create early-career momentum",
        body: "The best internship is the one that leaves the student more capable, more confident, and more employable than before. Roles with a live market and clear accountability usually do that better than generic resume-padding internships."
      }
    ]
  },
  {
    slug: "how-much-do-door-to-door-reps-make-in-north-carolina",
    title: "How Much Do Door-to-Door Reps Make in North Carolina?",
    eyebrow: "Income Guide",
    description: "A North Carolina-focused breakdown of what drives earnings in door-to-door sales, what applicants should compare, and why production matters more than hype.",
    intro: "One of the first questions applicants ask is how much a door-to-door rep can actually make in North Carolina. The honest answer is that earnings depend on product strength, market quality, coaching, pace, and how consistently the rep can turn conversations into installs.",
    sections: [
      {
        heading: "The product and market matter first",
        body: "A better market and a better product create cleaner conversations. That matters because reps sell more when homeowners already understand the category and the offer feels legitimate."
      },
      {
        heading: "Skill changes the income ceiling",
        body: "Two reps can work the same city and produce very different numbers. The difference usually comes down to consistency, talk-track quality, objection handling, and whether the rep can keep energy steady over time."
      },
      {
        heading: "Applicants should compare structure honestly",
        body: "The right comparison is not just a big number on a job listing. It is whether the role provides real coaching, realistic expectations, clean compensation framing, and enough market opportunity to make the upside believable."
      }
    ]
  },
  {
    slug: "bead-program-fiber-expansion-and-sales-opportunity",
    title: "How the BEAD Program Is Expanding Fiber Sales Opportunity",
    eyebrow: "Broadband Buildout",
    description: "A practical article on how the BEAD program supports fiber expansion, why that matters for broadband sales, and where the opportunity comes from.",
    intro: "The BEAD program matters because broadband buildout creates more than infrastructure headlines. It creates serviceable addresses, local sales windows, and new customer-acquisition opportunity. For applicants, operators, and brands, the takeaway is simple: when more fiber gets built, more markets become worth working.",
    sections: [
      {
        heading: "BEAD is about broadband expansion at scale",
        body: "The Broadband Equity, Access, and Deployment program is designed to improve broadband access in places that have been underserved or unserved. That means the program is not just a policy story. It is a pipeline story. More buildout can translate into more neighborhoods where providers actually have something real to sell."
      },
      {
        heading: "Buildout creates local demand windows",
        body: "When new service becomes available, homeowners compare options, ask questions, and decide whether to switch. That moment matters. Field teams can capture demand more effectively when they work the route while awareness and availability are both rising."
      },
      {
        heading: "The strongest opportunity is where infrastructure meets execution",
        body: "Public investment alone does not create customers. The opportunity shows up when infrastructure, provider readiness, route quality, and good field execution all line up. That is why sales and customer-acquisition teams still matter even in a buildout-heavy environment."
      }
    ]
  },
  {
    slug: "google-fiber-sales-jobs",
    title: "Google Fiber Sales Jobs: Why the Category Pulls Attention",
    eyebrow: "Provider Search",
    description: "Why Google Fiber-related searches pull so much attention, what applicants actually mean when they search them, and how fiber-brand recognition helps field sales interest.",
    intro: "People search Google Fiber sales jobs because the brand name is familiar, the category feels legitimate, and fiber itself already has strong demand. Even when the exact role is not owned by Google Fiber directly, the search intent still tells you something important: recognized fiber brands create stronger attention and more curiosity than vague sales offers.",
    sections: [
      {
        heading: "Recognizable fiber brands create cleaner search intent",
        body: "When people search a known provider by name, they are usually looking for legitimacy, demand, and a real market. Brand familiarity lowers skepticism and makes a fiber role feel more tangible before the applicant even clicks."
      },
      {
        heading: "Applicants are really searching for category quality",
        body: "A Google Fiber search is often bigger than one company name. It usually reflects interest in premium broadband, field growth, modern infrastructure, and the kinds of sales environments tied to strong products instead of weak offers."
      },
      {
        heading: "Brand-recognition searches should route into real opportunities",
        body: "The smart funnel is not to let provider-name traffic die on a generic page. It is to move that traffic into actual field roles, market pages, and content that explains how fiber sales works in practice."
      }
    ]
  },
  {
    slug: "brightspeed-fiber-sales-opportunities",
    title: "Brightspeed Fiber Sales Opportunities and Why the Category Matters",
    eyebrow: "Provider Search",
    description: "A Brightspeed-focused article for search traffic around fiber growth, field sales opportunity, and why strong broadband categories attract applicants.",
    intro: "Brightspeed fiber sales opportunity is the kind of search phrase that signals real commercial interest. People making that search usually want to know whether the category is growing, whether the product is credible, and whether the sales side of the opportunity has real upside.",
    sections: [
      {
        heading: "Fiber expansion creates stronger local sales windows",
        body: "As Brightspeed and other broadband providers continue expanding in relevant markets, the opportunity is not just technical. New serviceability creates a real window for local customer acquisition and neighborhood-level momentum."
      },
      {
        heading: "A stronger product makes the sales conversation cleaner",
        body: "Applicants are drawn to categories where the homeowner need is already obvious. Fiber usually gives reps a simpler conversation than categories where trust is weaker or demand has to be manufactured from scratch."
      },
      {
        heading: "Searches for provider names should still end in practical guidance",
        body: "The best outcome is not just ranking for a provider keyword. It is converting that attention into deeper reading, market discovery, and actual career-path action for applicants who want to work in a live category."
      }
    ]
  },
  {
    slug: "lumos-vs-metronet-fiber-expansion",
    title: "Lumos vs MetroNet Fiber Expansion: Why Regional Fiber Growth Matters",
    eyebrow: "Fiber Expansion",
    description: "A search-friendly comparison of Lumos and MetroNet growth interest, and why regional fiber expansion creates stronger recruiting and sales opportunity.",
    intro: "Lumos and MetroNet searches reflect a larger pattern: people are paying attention to regional fiber expansion. When multiple provider brands are pushing growth, the broader takeaway is that fiber demand, route relevance, and customer-acquisition opportunity all get stronger.",
    sections: [
      {
        heading: "Regional expansion creates real local relevance",
        body: "One reason Lumos and MetroNet searches matter is that people want local proof. Regional buildout makes fiber feel real in specific neighborhoods and cities instead of staying abstract."
      },
      {
        heading: "Provider comparison searches signal category momentum",
        body: "When people compare providers, they are often trying to understand where the category is moving, which brands are active, and whether the market looks alive. That kind of search behavior is useful because it points to genuine interest instead of passive browsing."
      },
      {
        heading: "The bigger opportunity is the trend behind the names",
        body: "The real SEO and recruiting value is not only the brand names themselves. It is that regional provider growth points to a live category where field teams, route execution, and customer education can matter a lot."
      }
    ]
  },
  {
    slug: "starlink-vs-fiber-internet-what-homeowners-care-about",
    title: "Starlink vs Fiber Internet: What Homeowners Actually Care About",
    eyebrow: "Homeowner Comparison",
    description: "A practical comparison of Starlink and fiber internet focused on speed, reliability, latency, and what homeowners really care about when deciding.",
    intro: "Starlink gets attention because it feels innovative and broad-reaching. Fiber keeps winning attention because it is faster, more stable, and easier for many households to justify when it is available. Homeowners do not usually compare these categories as abstract technology. They compare them around reliability, streaming, gaming, work-from-home performance, and whether the service feels worth paying for every month.",
    sections: [
      {
        heading: "Homeowners care about reliability more than buzzwords",
        body: "Most people want internet that works consistently for streaming, work, school, gaming, and everyday household use. Fiber usually wins that conversation where it is available because the performance story is easier to trust."
      },
      {
        heading: "Availability changes the comparison",
        body: "Starlink matters most in places where wired options are weak or unavailable. Fiber matters most in places where households can upgrade into a faster and more stable connection. That means geography often decides which category feels more attractive."
      },
      {
        heading: "For field sales, the cleaner product story usually wins",
        body: "A simpler homeowner story creates a better sales environment. The clearer the benefits feel, the easier it is for a rep to guide a conversation without sounding defensive or overcomplicated."
      }
    ]
  },
  {
    slug: "fiber-vs-solar-sales-which-is-easier-to-sell",
    title: "Fiber vs Solar Sales: Which Is Easier to Sell?",
    eyebrow: "Category Comparison",
    description: "A practical comparison of fiber and solar sales for applicants who want to understand product difficulty, trust, sales cycle length, and learning curve.",
    intro: "Applicants comparing fiber and solar sales are usually asking a smart question: which category gives a newer rep a cleaner path to confidence and production? The answer depends on market, offer quality, and training, but fiber is often easier to learn because the value proposition is simpler and the sales cycle is shorter.",
    sections: [
      {
        heading: "Fiber is usually simpler to explain quickly",
        body: "Most homeowners already understand internet service and know whether theirs feels weak. That makes the problem easier to surface and the conversation easier for a new rep to handle."
      },
      {
        heading: "Solar can be powerful, but usually takes a longer explanation",
        body: "Solar often involves more variables, more skepticism, and more explanation around cost, savings, qualification, and installation. That can still be attractive, but it is usually a steeper communication challenge."
      },
      {
        heading: "The easier product is the one the rep can trust and explain cleanly",
        body: "The real advantage comes when the rep believes in the offer and can explain it simply. Strong products shorten the path to confidence, which is why category quality matters so much when comparing sales roles."
      }
    ]
  },
  {
    slug: "what-makes-a-good-door-to-door-rep",
    title: "What Makes a Good Door-to-Door Rep?",
    eyebrow: "Rep Development",
    description: "A direct guide to the traits, habits, and communication patterns that separate strong door-to-door reps from people who only like the idea of sales.",
    intro: "A good door-to-door rep is not just loud or outgoing. The best reps are usually calmer, more disciplined, and more coachable than people expect. They handle repetition well, recover quickly, and keep showing up with the same standard whether the last conversation went well or not.",
    sections: [
      {
        heading: "Coachability matters more than raw confidence",
        body: "A rep who listens, adjusts, and keeps improving usually outperforms someone who relies only on personality. Good coaching compounds quickly in the field."
      },
      {
        heading: "Resilience is a real operating skill",
        body: "Door-to-door work creates rejection every day. Strong reps do not pretend that rejection feels good. They simply recover faster and protect their energy better than weak reps do."
      },
      {
        heading: "Consistency beats occasional intensity",
        body: "The best reps are usually reliable before they are flashy. They hold a route, keep their standards, and let disciplined execution stack over time."
      }
    ]
  },
  {
    slug: "how-to-start-in-field-sales-with-no-experience",
    title: "How to Start in Field Sales With No Experience",
    eyebrow: "Getting Started",
    description: "A plain-English guide for people who have never worked in sales but want to break into field sales and improve fast.",
    intro: "Starting in field sales with no experience can feel intimidating until the work becomes concrete. At the beginning, the goal is not perfection. It is getting in a live environment, learning the talk track, accepting feedback, and improving faster than your fear does.",
    sections: [
      {
        heading: "Start with a product you can actually stand behind",
        body: "New reps learn faster when the product is clear and useful. A stronger offer reduces mental friction and lets the rep focus on communication instead of defending a weak category."
      },
      {
        heading: "Expect the first reps to feel uncomfortable",
        body: "No-experience candidates often think discomfort means they are bad at sales. Usually it just means they are new. The first stage is simply building enough repetitions for the work to become familiar."
      },
      {
        heading: "Look for coaching, not just hype",
        body: "The right field sales environment gives a new rep structure, feedback, and a clear path to improvement. If a role sells only hype and does not explain how people get better, that is usually a warning sign."
      }
    ]
  },
  {
    slug: "best-jobs-for-young-professionals-in-greensboro-nc",
    title: "Best Jobs for Young Professionals in Greensboro, NC Who Want Real Income Growth",
    eyebrow: "Young Professionals",
    description: "A Greensboro-focused guide for young professionals comparing career options and looking for higher-income work that builds communication skill and upward mobility.",
    intro: "A lot of young professionals in Greensboro are not just looking for a job. They are looking for momentum. The best opportunities usually combine skill growth, direct accountability, and enough upside to make the work feel worth taking seriously.",
    sections: [
      {
        heading: "Young professionals usually need slope, not just stability",
        body: "Early-career candidates often get stuck in roles that look safe but do not move their income, confidence, or communication ability very far. A better role gives them a steeper learning curve and a more visible path upward."
      },
      {
        heading: "Greensboro rewards people who can communicate clearly and move fast",
        body: "A stronger market creates better feedback. In Greensboro, the opportunities that tend to stand out are the ones where the candidate can improve quickly, be measured clearly, and see whether the work is actually compounding."
      },
      {
        heading: "The best fit is usually a role with skill transfer and upside",
        body: "Young professionals should compare roles based on what they leave with. Communication skill, resilience, customer confidence, and the ability to close live conversations transfer into almost every future leadership or business path."
      }
    ]
  },
  {
    slug: "recent-grad-sales-jobs-in-raleigh-nc",
    title: "Recent Grad Sales Jobs in Raleigh, NC With Better Upside Than Generic Entry-Level Roles",
    eyebrow: "Recent Grads",
    description: "A Raleigh guide for recent grads comparing sales jobs, early-career upside, and roles that build real communication skill instead of vague resume filler.",
    intro: "Recent grads in Raleigh usually face the same decision: take a safe but forgettable entry-level role, or choose a position that develops real skill and actually changes their earning potential. The better option is usually the one with more accountability, more reps, and more upside.",
    sections: [
      {
        heading: "Recent grads should compare ceiling, not just starting comfort",
        body: "A lot of early-career jobs feel organized but leave the candidate in almost the same place a year later. Stronger sales roles create faster learning because the feedback is immediate and the scorecard is obvious."
      },
      {
        heading: "Raleigh candidates usually care about legitimacy and trajectory",
        body: "In Raleigh, recent grads often want to know whether the company is real, whether the opportunity has serious upside, and whether the work builds something that matters beyond the first paycheck. Those are smart filters."
      },
      {
        heading: "The best early-career roles make confidence measurable",
        body: "When a candidate can see their communication improve, their results improve, and their compensation move with it, the role tends to feel more meaningful than a job built mostly around low-risk tasks."
      }
    ]
  },
  {
    slug: "communication-skills-jobs-for-college-grads-in-charlotte",
    title: "Communication Skills Jobs for College Grads in Charlotte",
    eyebrow: "Charlotte Career Growth",
    description: "A Charlotte-focused article for college grads who want jobs that sharpen communication, confidence, persuasion, and real-world professional presence.",
    intro: "A college grad in Charlotte can learn a lot from almost any job, but not every job improves communication under pressure. The strongest communication-skill roles create live conversations, direct accountability, and enough repetition for the candidate to actually become more effective month after month.",
    sections: [
      {
        heading: "Communication skill improves faster in live environments",
        body: "The jobs that change people quickest are usually the ones where they have to talk to real people, handle uncertainty, and recover in real time instead of hiding behind internal tasks."
      },
      {
        heading: "Charlotte is a good market for competitive early-career candidates",
        body: "Charlotte rewards people who can stay clear, composed, and persuasive. That is why communication-heavy roles can become such a strong launchpad there for college grads who want something more demanding than generic admin work."
      },
      {
        heading: "The right job turns communication into career leverage",
        body: "A candidate who learns how to hold attention, explain value, and guide decisions becomes more valuable in sales, leadership, recruiting, business development, and almost any client-facing role."
      }
    ]
  },
  {
    slug: "how-young-professionals-build-income-fast-in-field-sales",
    title: "How Young Professionals Build Income Faster in Field Sales",
    eyebrow: "Income Growth",
    description: "A practical guide for young professionals comparing income growth paths and why field sales can accelerate confidence, skill, and earnings faster than slower early-career tracks.",
    intro: "Young professionals usually do not need a miracle. They need a path where effort, skill, and money actually connect. Field sales tends to attract ambitious people because it shortens the distance between performance and reward.",
    sections: [
      {
        heading: "Field sales gives faster feedback than many desk-heavy roles",
        body: "In slower corporate tracks, it can take months to understand whether a person is really improving. In field sales, the feedback loop is tighter. The rep learns quickly whether the pitch is working, whether objections are being handled well, and whether they are actually moving toward production."
      },
      {
        heading: "Income tends to move with skill and consistency",
        body: "That is what makes field sales attractive to ambitious young professionals. The upside is not theoretical if the product is strong, the market is live, and the rep is willing to stay disciplined long enough for the skill curve to compound."
      },
      {
        heading: "The best version of the job creates both income and leverage",
        body: "A strong field role should not just pay. It should build confidence, resilience, professionalism, and the ability to influence people clearly. That combination is why some early-career candidates accelerate much faster in the field than in lower-pressure roles."
      }
    ]
  },
  {
    slug: "why-sales-and-marketing-are-the-backbone-of-business",
    title: "Why Sales and Marketing Are the Backbone of Every Business",
    eyebrow: "Business Basics",
    description: "A clean explanation of why sales and marketing sit at the center of business growth, and why learning them early creates real career leverage.",
    intro: "A business can have a strong product, smart operations, and talented people, but if it cannot attract attention and turn that attention into revenue, it stalls. That is why sales and marketing sit at the center of every serious company. Marketing creates awareness and demand. Sales turns trust, timing, and communication into actual customers.",
    sections: [
      {
        heading: "Marketing creates attention, sales converts it",
        body: "The cleanest way to think about it is this: marketing gets people interested, and sales helps them commit. When those two functions are weak, even a good business becomes harder to grow. When they are strong, the whole company gets better leverage."
      },
      {
        heading: "Every department depends on revenue eventually",
        body: "Operations, recruiting, product, finance, and leadership all benefit when the business is growing. That growth usually starts with customer acquisition. Learning sales and marketing helps people understand how companies actually move, not just how they look from the outside."
      },
      {
        heading: "People who learn both early become more valuable",
        body: "Someone who understands positioning, messaging, demand, trust, and conversion brings more value to almost any business. That is why sales and marketing skill compounds. It helps in recruiting, entrepreneurship, leadership, partnerships, and client-facing work far beyond one job title."
      }
    ]
  }
];

var MARKET_TESTIMONIALS = {
  "greensboro-nc": [
    {
      quote: "I started with no telecom background. What helped was having a clear route, real coaching, and a product people actually understood.",
      name: "Greensboro Rep",
      role: "Fiber Sales Representative"
    },
    {
      quote: "The Greensboro market rewards consistency. If you stay disciplined and keep talking to people, the numbers can move fast.",
      name: "Greensboro Team Lead",
      role: "Field Leader"
    }
  ],
  "high-point-nc": [
    {
      quote: "High Point feels like a real working market. It is not about hype. It is about pace, territory ownership, and staying sharp every day.",
      name: "High Point Rep",
      role: "Fiber Sales Representative"
    },
    {
      quote: "The biggest difference for me was training. Once the talk track clicked, the field got simpler and my confidence changed.",
      name: "High Point Rep",
      role: "Field Rep"
    }
  ],
  "winston-salem-nc": [
    {
      quote: "Winston-Salem feels like a market where consistency matters more than noise. The reps who stay steady usually separate themselves fast.",
      name: "Winston-Salem Recruiting Angle",
      role: "Field Growth"
    },
    {
      quote: "Early-stage territory work can be a real advantage when you want reps to grow with the market instead of stepping into a dead-end role.",
      name: "Winston-Salem Team View",
      role: "Market Development"
    }
  ],
  "piedmont-triad-nc": [
    {
      quote: "The Triad works because it gives the company both city-level relevance and regional reach. That matters for recruiting and for brand trust.",
      name: "Triad Recruiting Note",
      role: "Regional Hiring"
    },
    {
      quote: "A regional page helps the right applicant self-select faster, especially when they are searching broadly before narrowing into a city.",
      name: "Triad Search Angle",
      role: "Local SEO Structure"
    }
  ],
  "lexington-nc": [
    {
      quote: "Lexington is the kind of page that helps nearby candidates realize the opportunity is close enough to matter, even if the main market is next door.",
      name: "Lexington Recruiting View",
      role: "Nearby Market Coverage"
    },
    {
      quote: "Local bridge pages reduce drop-off because they match how real applicants search before they know the exact territory.",
      name: "Lexington Search Intent",
      role: "Field Recruiting"
    }
  ],
  "charlotte-nc": [
    {
      quote: "Charlotte is competitive, which means clarity matters. Strong reps stand out faster when they stay direct and professional.",
      name: "Charlotte Candidate Profile",
      role: "Market Expansion Focus"
    },
    {
      quote: "Bigger markets reward cleaner communication. The rep who can explain value simply usually wins.",
      name: "Charlotte Recruiting Angle",
      role: "Telecom Sales"
    }
  ],
  "raleigh-nc": [
    {
      quote: "Raleigh searchers usually want specifics: what the job is, what the pay structure is, and whether the company sounds real. That is what this page is built to answer.",
      name: "Raleigh Candidate Intent",
      role: "Field Sales Recruiting"
    },
    {
      quote: "Good local recruiting pages reduce friction. They make it easier for the right person to recognize the opportunity quickly.",
      name: "Raleigh Market Page",
      role: "Local Search Focus"
    }
  ]
};

var MARKET_PROOF = {
  "greensboro-nc": [
    { label: "Market type", value: "Established Triad recruiting page" },
    { label: "Best fit", value: "Coachable reps who want structure and daily pace" },
    { label: "Local signal", value: "Strong Greensboro-specific job and recruiting intent" }
  ],
  "high-point-nc": [
    { label: "Market type", value: "Headquarters market with local trust advantage" },
    { label: "Best fit", value: "Reps who want direct leadership access and clear standards" },
    { label: "Local signal", value: "High Point relevance supports brand credibility sitewide" }
  ],
  "winston-salem-nc": [
    { label: "Market type", value: "Growth market with room for early momentum" },
    { label: "Best fit", value: "Consistent reps who want to grow with the territory" },
    { label: "Local signal", value: "City-specific page strengthens Winston-Salem search intent" }
  ],
  "piedmont-triad-nc": [
    { label: "Market type", value: "Regional hub page across three active cities" },
    { label: "Best fit", value: "Applicants searching broader regional opportunities" },
    { label: "Local signal", value: "Useful bridge between city pages and statewide recruiting" }
  ],
  "lexington-nc": [
    { label: "Market type", value: "Nearby-market recruiting bridge" },
    { label: "Best fit", value: "Applicants near the Triad who want in-person work" },
    { label: "Local signal", value: "Captures broad local search before applicants narrow down" }
  ],
  "charlotte-nc": [
    { label: "Market type", value: "Competitive metro page built for discovery" },
    { label: "Best fit", value: "Sharp communicators who want bigger-market upside" },
    { label: "Local signal", value: "Charlotte page increases local trust before application" }
  ],
  "raleigh-nc": [
    { label: "Market type", value: "Triangle recruiting page with higher intent users" },
    { label: "Best fit", value: "Applicants who want specifics, pace, and upside" },
    { label: "Local signal", value: "Raleigh-specific copy improves local search relevance" }
  ]
};

var MARKET_FAQS = {
  "greensboro-nc": [
    {
      q: "What kind of sales jobs is Home Front Solutions hiring for in Greensboro?",
      a: "Greensboro hiring is centered on in-person field sales roles with direct coaching, neighborhood territory work, and a path into team leadership for strong performers."
    },
    {
      q: "Do I need sales experience for Greensboro roles?",
      a: "Not always. Coachable applicants with strong communication skills, reliable transportation, and the ability to work face to face with homeowners can be trained from day one."
    },
    {
      q: "Why have a dedicated Greensboro jobs page?",
      a: "Applicants search by city. A Greensboro-specific page gives both search engines and candidates a more relevant local destination than a generic statewide careers page."
    }
  ],
  "high-point-nc": [
    {
      q: "Why is High Point an important market for Home Front Solutions?",
      a: "High Point is the company's home base in North Carolina, which makes it an important trust signal for recruiting, operations, and local brand relevance."
    },
    {
      q: "How are High Point roles structured?",
      a: "Current field roles listed on the site are performance-based opportunities with weekly commission, direct field expectations, and clear accountability."
    },
    {
      q: "What kind of applicant usually fits High Point field sales best?",
      a: "Applicants who want structure, pace, territory ownership, and direct feedback usually fit well, especially if they are comfortable with in-person conversations and outdoor work."
    }
  ],
  "winston-salem-nc": [
    {
      q: "What makes Winston-Salem a strong market page?",
      a: "Winston-Salem deserves its own recruiting page because applicants often search by city first and want to see a direct explanation of the role before they apply."
    },
    {
      q: "What does success look like in Winston-Salem field sales?",
      a: "Success usually comes from consistent route work, clean talk tracks, resilience in the field, and the ability to convert strong conversations into installs."
    },
    {
      q: "Is training available for Winston-Salem applicants?",
      a: "Yes. Home Front Solutions trains new reps with structured onboarding, AI-supported coaching, and live field support before expecting independent production."
    }
  ],
  "piedmont-triad-nc": [
    {
      q: "Why does Home Front Solutions have a Piedmont Triad page?",
      a: "Not every applicant searches by city first. Some search for broader Triad jobs, so the regional page helps capture that intent and connect people to the right local roles."
    },
    {
      q: "Which cities does the Piedmont Triad page support?",
      a: "It supports recruiting visibility across Greensboro, High Point, Winston-Salem, and nearby communities tied to the broader Triad market."
    },
    {
      q: "Can Triad applicants still apply to city-specific jobs?",
      a: "Yes. The regional page is meant to guide applicants into the exact job page that best fits their location and experience."
    }
  ],
  "lexington-nc": [
    {
      q: "Does Home Front Solutions hire directly in Lexington?",
      a: "The Lexington page is designed for nearby recruiting visibility and may connect applicants into surrounding Triad territories rather than a separate standalone Lexington office."
    },
    {
      q: "Why target Lexington search traffic?",
      a: "Many applicants start with broad searches like sales jobs near Lexington or entry-level field sales near me, so the page helps bridge that local intent into a relevant role."
    },
    {
      q: "What kind of work should Lexington-area applicants expect?",
      a: "Applicants should expect in-person territory work, performance expectations, and the kind of direct communication that comes with face-to-face field sales."
    }
  ],
  "charlotte-nc": [
    {
      q: "Why does Charlotte need its own recruiting page?",
      a: "Charlotte is a larger, more competitive market, so a city-specific page improves local trust, search relevance, and conversion compared with generic statewide copy."
    },
    {
      q: "What kind of candidate fits Charlotte field sales?",
      a: "Charlotte tends to reward clear communication, professionalism, and reps who can explain value simply in a bigger, faster-moving market."
    },
    {
      q: "What should applicants expect from Charlotte opportunities?",
      a: "Applicants should expect a field-sales structure, local recruiting relevance, and a direct path into the main careers flow if the role fits."
    }
  ],
  "raleigh-nc": [
    {
      q: "Why is Raleigh an important SEO and recruiting market?",
      a: "Raleigh is a competitive search market where location-specific pages matter. Candidates often want clear city references and straightforward role details before they trust a site."
    },
    {
      q: "What do Raleigh applicants usually want to know first?",
      a: "Most Raleigh applicants want to know what the job actually is, how compensation works, whether the opportunity feels legitimate, and how quickly the recruiting process moves."
    },
    {
      q: "Are Raleigh roles still connected to the broader North Carolina recruiting structure?",
      a: "Yes. The Raleigh page supports local discovery while still routing candidates into the shared careers funnel and related job pages."
    }
  ]
};

// The six Q&As RENDERED on the homepage FAQ section. The home route's FAQPage
// JSON-LD maps over this same array so schema.org markup always matches the
// visible content (Google requires FAQ markup to be visible on the page).
var HOME_PAGE_FAQS = [
  { q: "Do I need sales experience to join?", a: "No. Most of our top reps started with zero sales experience. Paid certification before your first real door covers product knowledge, pitch delivery, objection handling, and live field simulation. Bring drive and coachability — we handle the rest." },
  { q: "How much can I earn?", a: "First-year reps typically clear $80K–$150K on uncapped commission paid weekly. Top producers regularly break $180K in year one. Team leads and area managers move into the $250K+ range." },
  { q: "What's the promotion path?", a: "Every manager at HFS was promoted out of production. Hit the numbers, coach the next rep, and the next role opens: Field Rep → Team Lead → Area Manager. No politics, no favorites." },
  { q: "What does the training look like?", a: "Six modules, five days, fully paid. You'll practice on HFS Coach (our AI roleplay platform) and ride along with a team lead before you own a territory. Coaching continues daily in the field." },
  { q: "Where do you operate?", a: "28+ U.S. markets and growing. Headquartered in the Carolinas with active teams across the Southeast, Midwest, Mountain West, and Sunbelt." },
  { q: "How do I get started?", a: "Reps: apply online — most applications get a recruiter response within one business day. Brands: book a 30-minute discovery call and we'll scope a pilot market." }
];

var HOME_FAQS = [
  {
    q: "How do these roles work?",
    a: "Home Front Solutions field roles listed on this site are performance-based opportunities with uncapped commission, flexible scheduling, and direct accountability tied to production."
  },
  {
    q: "Do I need sales experience?",
    a: "No. Many strong reps start with zero sales experience. We provide training, coaching, and live field support from day one."
  },
  {
    q: "How much can I earn?",
    a: "Top reps can earn $100K+ in their first year. Earnings are commission-based, uncapped, and tied to real production in the field."
  },
  {
    q: "What products do I sell?",
    a: "Current categories include fiber internet, home security, solar, water filtration, roofing, and other homeowner-focused services depending on market and campaign."
  }
];

function getMarketArticleSlugs(marketSlug) {
  var map = {
    "greensboro-nc": ["best-sales-jobs-in-greensboro-nc", "greensboro-1099-sales-jobs-explained", "d2d-psychology", "sales-internship-for-college-students"],
    "high-point-nc": ["best-entry-level-sales-jobs-in-high-point-nc", "how-to-win-your-first-30-days-in-d2d", "d2d-psychology", "how-to-start-in-field-sales-with-no-experience"],
    "winston-salem-nc": ["d2d-success-stories", "how-to-win-your-first-30-days-in-d2d", "d2d-psychology", "best-summer-sales-job-for-18-to-25"],
    "piedmont-triad-nc": ["how-much-do-door-to-door-reps-make-in-north-carolina", "bead-program-fiber-expansion-and-sales-opportunity", "what-makes-a-good-door-to-door-rep", "telecom-industry-basics-for-fiber-sales-reps"],
    "lexington-nc": ["why-d2d-after-high-school-or-college", "sales-internship-for-college-students", "best-summer-sales-job-for-18-to-25", "d2d-psychology"],
    "charlotte-nc": ["best-sales-jobs-in-charlotte-nc", "best-summer-sales-internship-in-charlotte", "d2d-psychology", "fiber-vs-solar-sales-which-is-easier-to-sell"],
    "raleigh-nc": ["best-entry-level-sales-jobs-in-raleigh-nc", "raleigh-sales-jobs-for-nc-state-unc-duke-and-triangle-students", "how-to-start-in-field-sales-with-no-experience", "why-sales-and-marketing-are-the-backbone-of-business"]
  };
  return map[marketSlug] || ["d2d-success-stories", "d2d-psychology", "how-to-start-in-field-sales-with-no-experience", "sales-internship-for-college-students"];
}

function getJobArticleSlugs(job) {
  var map = {
    "fiber-sales-rep-high-point": ["best-entry-level-sales-jobs-in-high-point-nc", "bead-program-fiber-expansion-and-sales-opportunity", "telecom-industry-basics-for-fiber-sales-reps"],
    "fiber-sales-rep-greensboro": ["best-sales-jobs-in-greensboro-nc", "how-much-do-door-to-door-reps-make-in-north-carolina", "d2d-psychology"],
    "fiber-sales-rep-winston-salem": ["d2d-success-stories", "fiber-internet-gold-rush", "what-makes-a-good-door-to-door-rep"],
    "team-lead": ["what-makes-a-good-door-to-door-rep", "how-much-do-door-to-door-reps-make-in-north-carolina", "d2d-psychology"],
    "entry-level-rep": ["how-to-start-in-field-sales-with-no-experience", "how-to-win-your-first-30-days-in-d2d", "why-d2d-after-high-school-or-college"],
    "sales-internship-college-students": ["sales-internship-for-college-students", "raleigh-sales-jobs-for-nc-state-unc-duke-and-triangle-students", "best-summer-sales-internship-in-charlotte"]
  };
  return map[job.slug] || ["d2d-success-stories", "d2d-psychology", "how-to-start-in-field-sales-with-no-experience"];
}

function getRelatedArticleSlugs(article) {
  var map = {
    "best-sales-jobs-in-greensboro-nc": ["greensboro-1099-sales-jobs-explained", "d2d-psychology", "how-much-do-door-to-door-reps-make-in-north-carolina"],
    "best-entry-level-sales-jobs-in-high-point-nc": ["how-to-start-in-field-sales-with-no-experience", "how-to-win-your-first-30-days-in-d2d", "what-makes-a-good-door-to-door-rep"],
    "best-summer-sales-internship-in-charlotte": ["sales-internship-for-college-students", "best-summer-sales-job-for-18-to-25", "best-sales-jobs-in-charlotte-nc"],
    "fiber-internet-gold-rush": ["bead-program-fiber-expansion-and-sales-opportunity", "fiber-vs-solar-sales-which-is-easier-to-sell", "telecom-industry-basics-for-fiber-sales-reps"],
    "bead-program-fiber-expansion-and-sales-opportunity": ["fiber-internet-gold-rush", "how-much-do-door-to-door-reps-make-in-north-carolina", "telecom-industry-basics-for-fiber-sales-reps"],
    "google-fiber-sales-jobs": ["fiber-internet-gold-rush", "brightspeed-fiber-sales-opportunities", "telecom-industry-basics-for-fiber-sales-reps"],
    "brightspeed-fiber-sales-opportunities": ["google-fiber-sales-jobs", "lumos-vs-metronet-fiber-expansion", "fiber-internet-gold-rush"],
    "lumos-vs-metronet-fiber-expansion": ["fiber-internet-gold-rush", "bead-program-fiber-expansion-and-sales-opportunity", "google-fiber-sales-jobs"],
    "starlink-vs-fiber-internet-what-homeowners-care-about": ["fiber-vs-solar-sales-which-is-easier-to-sell", "telecom-industry-basics-for-fiber-sales-reps", "fiber-internet-gold-rush"],
    "how-much-do-door-to-door-reps-make-in-north-carolina": ["best-sales-jobs-in-greensboro-nc", "best-entry-level-sales-jobs-in-raleigh-nc", "what-makes-a-good-door-to-door-rep"],
    "fiber-vs-solar-sales-which-is-easier-to-sell": ["why-fiber-is-easier-to-sell-than-weak-products", "telecom-industry-basics-for-fiber-sales-reps", "how-to-start-in-field-sales-with-no-experience"],
    "what-makes-a-good-door-to-door-rep": ["d2d-psychology", "how-to-handle-rejection-in-door-to-door-sales", "how-to-win-your-first-30-days-in-d2d"],
    "how-to-start-in-field-sales-with-no-experience": ["why-d2d-after-high-school-or-college", "how-to-win-your-first-30-days-in-d2d", "what-makes-a-good-door-to-door-rep"],
    "best-entry-level-sales-jobs-in-raleigh-nc": ["raleigh-sales-jobs-for-nc-state-unc-duke-and-triangle-students", "how-to-start-in-field-sales-with-no-experience", "why-sales-and-marketing-are-the-backbone-of-business"],
    "raleigh-sales-jobs-for-nc-state-unc-duke-and-triangle-students": ["best-entry-level-sales-jobs-in-raleigh-nc", "sales-internship-for-college-students", "why-sales-and-marketing-are-the-backbone-of-business"],
    "why-sales-and-marketing-are-the-backbone-of-business": ["sales-internship-for-college-students", "why-d2d-after-high-school-or-college", "what-makes-a-good-door-to-door-rep"]
  };
  if (map[article.slug]) return map[article.slug];
  return ARTICLE_PAGES.filter(function(item) { return item.slug !== article.slug; }).slice(0, 3).map(function(item) { return item.slug; });
}

function formatPhoneInput(value) {
  var digits = (value || "").replace(/\D/g, "").slice(0, 10);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return "(" + digits.slice(0, 3) + ") " + digits.slice(3);
  return "(" + digits.slice(0, 3) + ") " + digits.slice(3, 6) + "-" + digits.slice(6);
}

function getSalaryRange(range) {
  var matches = String(range || "").match(/\$[\d,]+/g) || [];
  var values = matches.map(function(item) {
    return parseInt(item.replace(/[^\d]/g, ""), 10);
  }).filter(Boolean);
  return {
    min: values[0] || 0,
    max: values[1] || values[0] || 0,
  };
}

function getPathForRoute(name, slug) {
  if (name === "home") return "/";
  if (name === "what-we-do") return "/what-we-do";
  if (name === "why-us") return "/why-us";
  if (name === "partners") return "/partners";
  if (name === "careers") return "/careers";
  if (name === "market" && slug) return "/markets/" + slug;
  if (name === "insights") return "/insights";
  if (name === "article" && slug) return "/insights/" + slug;
  if (name === "job" && slug) return "/careers/" + slug;
  if (name === "apply" && slug) return "/careers/" + slug + "/apply";
  if (name === "thank-you" && slug) return "/careers/" + slug + "/apply/thank-you";
  if (name === "contact") return "/contact";
  if (name === "privacy") return "/privacy";
  if (name === "terms") return "/terms";
  if (name === "rep-login") return "/rep-login";
  return "/";
}

// Animate a number from 0 → target when visible
function CountUp(props) {
  var ref = useRef(null);
  var _v = useState(0); var value = _v[0]; var setValue = _v[1];
  var _done = useState(false); var done = _done[0]; var setDone = _done[1];
  useEffect(function() {
    if (typeof window === "undefined" || typeof IntersectionObserver === "undefined") { setValue(props.to); return; }
    if (done) return;
    var node = ref.current;
    if (!node) return;
    var io = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting && !done) {
          var target = props.to || 0;
          var duration = props.duration || 1400;
          var start = performance.now();
          var animate = function(now) {
            var elapsed = now - start;
            var t = Math.min(1, elapsed / duration);
            var eased = 1 - Math.pow(1 - t, 3);
            setValue(target * eased);
            if (t < 1) { window.requestAnimationFrame(animate); }
            else { setValue(target); setDone(true); }
          };
          window.requestAnimationFrame(animate);
          io.disconnect();
        }
      });
    }, { threshold: 0.4 });
    io.observe(node);
    return function() { io.disconnect(); };
  }, [props.to, done]);
  var prefix = props.prefix || "";
  var suffix = props.suffix || "";
  var display = Math.round(value);
  return <span ref={ref}>{prefix}{display}{suffix}</span>;
}

// Magnetic hover — anchor follows cursor subtly
function Magnetic(props) {
  var ref = useRef(null);
  useEffect(function() {
    if (typeof window === "undefined") return;
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    var node = ref.current;
    if (!node) return;
    var strength = props.strength || 0.25;
    function onMove(e) {
      var rect = node.getBoundingClientRect();
      var x = e.clientX - (rect.left + rect.width / 2);
      var y = e.clientY - (rect.top + rect.height / 2);
      node.style.transform = "translate(" + (x * strength) + "px, " + (y * strength) + "px)";
    }
    function onLeave() {
      node.style.transform = "translate(0, 0)";
    }
    node.addEventListener("mousemove", onMove);
    node.addEventListener("mouseleave", onLeave);
    return function() {
      node.removeEventListener("mousemove", onMove);
      node.removeEventListener("mouseleave", onLeave);
    };
  }, [props.strength]);
  return <span ref={ref} className={"magnetic inline-flex " + (props.className || "")} style={props.style}>{props.children}</span>;
}

function useRevealOnScroll(deps) {
  useEffect(function() {
    if (typeof window === "undefined" || typeof IntersectionObserver === "undefined") return;
    var nodes = document.querySelectorAll(".reveal, .reveal-blur");
    if (!nodes.length) return;
    var io = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.1 });
    nodes.forEach(function(n) { io.observe(n); });
    return function() { io.disconnect(); };
  }, deps || []);
}

// Live activity ticker — small D2D-industry live feel. Rotates through recent wins.
function ActivityTicker() {
  var items = [
    "Greensboro: 4 fiber installs this morning",
    "New hire onboarding in Charlotte",
    "High Point: rep promoted to team lead",
    "Raleigh launch entering week 2",
    "Winston-Salem: 2 closes on a Monday route",
    "12 applications received in the last hour",
    "Piedmont Triad: 8 same-day installs",
    "Interview scheduled: Lexington"
  ];
  var _i = useState(0); var idx = _i[0]; var setIdx = _i[1];
  useEffect(function() {
    if (typeof window === "undefined") return;
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    var id = window.setInterval(function() {
      setIdx(function(n) { return (n + 1) % items.length; });
    }, 3400);
    return function() { window.clearInterval(id); };
  }, []);
  return (
    <div className="inline-flex items-center gap-3 px-4 py-2 rounded-[10px]" style={{ background: "rgba(255,255,255,0.72)", border: "1px solid " + RULE, backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", maxWidth: "100%" }}>
      <span aria-hidden="true" className="relative inline-flex items-center justify-center" style={{ width: 8, height: 8 }}>
        <span style={{ position: "absolute", inset: 0, borderRadius: "50%", background: SIGNAL }} />
        <span style={{ position: "absolute", inset: -4, borderRadius: "50%", background: SIGNAL, opacity: 0.3, animation: "tickerPulse 1.8s ease-in-out infinite" }} />
      </span>
      <span style={{ ...monoKicker, color: SIGNAL_DEEP, fontSize: 10.5 }}>Live</span>
      <span style={{ width: 1, height: 12, background: RULE }} />
      <span key={idx} className="ticker-item" style={{ fontSize: 13, color: INK, letterSpacing: "-0.005em", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{items[idx]}</span>
    </div>
  );
}

// Mouse-following spotlight for hero sections — Vercel-signature ambient light.
function Spotlight(props) {
  var ref = useRef(null);
  useEffect(function() {
    if (typeof window === "undefined") return;
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    var node = ref.current;
    if (!node) return;
    var target = (props && props.target) ? document.querySelector(props.target) : node.parentElement;
    if (!target) return;
    function onMove(e) {
      var rect = target.getBoundingClientRect();
      var x = ((e.clientX - rect.left) / rect.width) * 100;
      var y = ((e.clientY - rect.top) / rect.height) * 100;
      node.style.setProperty("--mx", x.toFixed(2) + "%");
      node.style.setProperty("--my", y.toFixed(2) + "%");
    }
    function onEnter() { node.classList.add("spotlight--active"); }
    function onLeave() { node.classList.remove("spotlight--active"); }
    target.addEventListener("mousemove", onMove);
    target.addEventListener("mouseenter", onEnter);
    target.addEventListener("mouseleave", onLeave);
    return function() {
      target.removeEventListener("mousemove", onMove);
      target.removeEventListener("mouseenter", onEnter);
      target.removeEventListener("mouseleave", onLeave);
    };
  }, [props.target]);
  return <div ref={ref} className="spotlight" aria-hidden="true" />;
}

// Cursor-aware 3D tilt. Card rotates toward the cursor, returns on leave.
function TiltCard(props) {
  var ref = useRef(null);
  useEffect(function() {
    if (typeof window === "undefined") return;
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    var node = ref.current;
    if (!node) return;
    var strength = props.strength || 6;
    function onMove(e) {
      var rect = node.getBoundingClientRect();
      var dx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      var dy = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
      node.style.setProperty("--ry", (dx * strength).toFixed(2));
      node.style.setProperty("--rx", (-dy * strength).toFixed(2));
    }
    function onLeave() {
      node.style.setProperty("--ry", "0");
      node.style.setProperty("--rx", "0");
    }
    node.addEventListener("mousemove", onMove);
    node.addEventListener("mouseleave", onLeave);
    return function() {
      node.removeEventListener("mousemove", onMove);
      node.removeEventListener("mouseleave", onLeave);
    };
  }, [props.strength]);
  var className = "tilt-card--mouse " + (props.className || "");
  return (
    <div ref={ref} className={className} style={props.style} onMouseEnter={props.onMouseEnter} onMouseLeave={props.onMouseLeave}>
      {props.children}
    </div>
  );
}

// Scroll parallax — translates a ref by a factor of window.scrollY.
function useParallax(ref, factor) {
  useEffect(function() {
    if (typeof window === "undefined") return;
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    var node = ref.current;
    if (!node) return;
    var raf = 0;
    function tick() {
      raf = 0;
      var y = window.scrollY * (factor || -0.15);
      node.style.transform = "translate3d(0," + y.toFixed(1) + "px, 0)";
    }
    function onScroll() {
      if (raf) return;
      raf = window.requestAnimationFrame(tick);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    tick();
    return function() {
      window.removeEventListener("scroll", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [factor]);
}

function ParallaxLayer(props) {
  var ref = useRef(null);
  useParallax(ref, props.factor);
  return <div ref={ref} aria-hidden={props.ariaHidden || "true"} className={props.className} style={props.style}>{props.children}</div>;
}

// Instant-page style hover prefetching — warms prerendered HTML before the user clicks.
// Delegates on the whole document to catch nav, card, and inline links in one listener.
function useHoverPrefetch() {
  useEffect(function() {
    if (typeof window === "undefined") return;
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    var prefetched = new Set();
    function isSameOriginInternal(href) {
      if (!href) return false;
      if (href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return false;
      try {
        var u = new URL(href, window.location.origin);
        if (u.origin !== window.location.origin) return false;
        if (/\/(apply|thank-you)(\/|$)/.test(u.pathname)) return false;
        return true;
      } catch (err) {
        return false;
      }
    }
    function prefetch(href) {
      if (!href || prefetched.has(href)) return;
      prefetched.add(href);
      var link = document.createElement("link");
      link.rel = "prefetch";
      link.href = href;
      link.as = "document";
      document.head.appendChild(link);
    }
    function onEnter(e) {
      var target = e.target && e.target.closest ? e.target.closest("a[href]") : null;
      if (!target) return;
      var href = target.getAttribute("href");
      if (!isSameOriginInternal(href)) return;
      prefetch(href);
    }
    document.addEventListener("mouseenter", onEnter, true);
    document.addEventListener("touchstart", onEnter, { passive: true, capture: true });
    return function() {
      document.removeEventListener("mouseenter", onEnter, true);
      document.removeEventListener("touchstart", onEnter, { capture: true });
    };
  }, []);
}

// Scroll-linked CSS variable updater — drives aurora hue shift smoothly as the reader scrolls.
function useScrollHue() {
  useEffect(function() {
    if (typeof window === "undefined") return;
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    var raf = 0;
    function tick() {
      raf = 0;
      var max = document.documentElement.scrollHeight - window.innerHeight;
      var pct = max > 0 ? window.scrollY / max : 0;
      document.documentElement.style.setProperty("--scroll-hue", (pct * 24).toFixed(2) + "deg");
    }
    function onScroll() {
      if (raf) return;
      raf = window.requestAnimationFrame(tick);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    tick();
    return function() {
      window.removeEventListener("scroll", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);
}

// Thin progress line that fills as the reader scrolls the page.
function ScrollProgress() {
  var ref = useRef(null);
  useEffect(function() {
    if (typeof window === "undefined") return;
    var bar = ref.current;
    if (!bar) return;
    var raf = 0;
    function onScroll() {
      if (raf) return;
      raf = window.requestAnimationFrame(function() {
        raf = 0;
        var doc = document.documentElement;
        var max = doc.scrollHeight - window.innerHeight;
        var pct = max > 0 ? (window.scrollY / max) * 100 : 0;
        bar.style.width = pct.toFixed(2) + "%";
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return function() {
      window.removeEventListener("scroll", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);
  return <div ref={ref} className="scroll-progress" aria-hidden="true" />;
}

function handleNavClick(e, go, name, slug) {
  if (!e) return;
  if (e.defaultPrevented) return;
  if (e.button !== undefined && e.button !== 0) return;
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  e.preventDefault();
  go(name, slug || null);
}

function getRouteFromPath(pathname) {
  var cleanPath = pathname.replace(/\/+$/, "") || "/";
  var parts = cleanPath.split("/").filter(Boolean);

  if (cleanPath === "/") return { name: "home", slug: null };
  if (cleanPath === "/what-we-do") return { name: "what-we-do", slug: null };
  if (cleanPath === "/why-us") return { name: "why-us", slug: null };
  if (cleanPath === "/partners") return { name: "partners", slug: null };
  if (cleanPath === "/careers") return { name: "careers", slug: null };
  if (parts[0] === "markets" && parts[1]) return { name: "market", slug: parts[1] };
  if (cleanPath === "/insights") return { name: "insights", slug: null };
  if (parts[0] === "insights" && parts[1]) return { name: "article", slug: parts[1] };
  if (cleanPath === "/contact") return { name: "contact", slug: null };
  if (cleanPath === "/privacy") return { name: "privacy", slug: null };
  if (cleanPath === "/terms") return { name: "terms", slug: null };
  if (cleanPath === "/rep-login" || cleanPath === "/login" || cleanPath === "/signin") return { name: "rep-login", slug: null };
  if (parts[0] === "careers" && parts[1] && parts[2] === "apply" && parts[3] === "thank-you") {
    return { name: "thank-you", slug: parts[1] };
  }
  if (parts[0] === "careers" && parts[1] && parts[2] === "apply") {
    return { name: "apply", slug: parts[1] };
  }
  if (parts[0] === "careers" && parts[1]) {
    return { name: "job", slug: parts[1] };
  }

  return { name: "home", slug: null };
}

function Eyebrow(props) {
  return <p className="mb-5" style={{ color: "var(--signal)", fontSize: 13.5, letterSpacing: 0, fontWeight: 600 }}>{props.children}</p>;
}

function LogoMark(props) {
  var size = props && props.size ? props.size : 34;
  var stroke = props && props.stroke ? props.stroke : INK;
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true" style={{ display: "block" }}>
      <path d="M6 20 L20 7 L34 20 L34 32 C34 32.55 33.55 33 33 33 L26 33 L26 23 L14 23 L14 33 L7 33 C6.45 33 6 32.55 6 32 Z" fill="none" stroke={stroke} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
      <path d="M18 33 L18 27 L22 27 L22 33" fill="none" stroke={stroke} strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round" opacity="0.55" />
    </svg>
  );
}

// Floating "back to top" chip — gold, fades in after 600 px of scroll,
// click smooth-scrolls to the top. Pure CSS transitions, prefers-reduced-motion safe.
function ScrollTop() {
  var _v = useState(false); var visible = _v[0]; var setVisible = _v[1];
  useEffect(function() {
    if (typeof window === "undefined") return;
    function onScroll() { setVisible(window.scrollY > 600); }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return function() { window.removeEventListener("scroll", onScroll); };
  }, []);
  function up() {
    var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  }
  return (
    <button
      type="button"
      onClick={up}
      className="scroll-top"
      data-visible={visible ? "true" : "false"}
      aria-label="Back to top"
      title="Back to top"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 19 V5" />
        <path d="M5 12 L12 5 L19 12" />
      </svg>
    </button>
  );
}

// Sticky mobile CTA dock — always-visible "Join the Team" + "Book a Call" on phones.
// Hidden on desktop, hidden within the mobile nav menu, hides until the first scroll
// so it doesn't steal attention on initial paint.
function MobileStickyCTA(props) {
  var _s = useState(false); var shown = _s[0]; var setShown = _s[1];
  useEffect(function() {
    if (typeof window === "undefined") return;
    function onScroll() { setShown(window.scrollY > 240); }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return function() { window.removeEventListener("scroll", onScroll); };
  }, []);
  return (
    <div className="sticky-cta" data-visible={shown ? "true" : "false"} aria-hidden={!shown}>
      <a
        href={BOOKING_URL || "/contact"}
        onClick={BOOKING_URL ? undefined : function(e) { handleNavClick(e, props.go, "contact"); }}
        target={BOOKING_URL ? "_blank" : undefined}
        rel={BOOKING_URL ? "noopener noreferrer" : undefined}
        className="sticky-cta__btn sticky-cta__btn--ghost"
      >
        Book a Call
      </a>
      <a
        href="/careers"
        onClick={function(e) { handleNavClick(e, props.go, "careers"); }}
        className="sticky-cta__btn sticky-cta__btn--gold"
      >
        Join the Team
        <span aria-hidden="true">→</span>
      </a>
    </div>
  );
}

// Brand lockup — uses the real Home Front Solutions logo artwork.
// On dark surfaces we use a dark-theme PNG (cream ink, transparent bg) that blends into navy.
// On light surfaces we use the full-color PNG directly.
function BrandLockup(props) {
  var onDark = !!(props && props.onDark);
  var small = !!(props && props.small);
  var size = small ? 56 : 70;
  var src = onDark ? "/logo-dark-theme.png" : "/logo-transparent.png";
  return (
    <span
      className="inline-flex items-center"
      style={{ padding: 0, lineHeight: 0, transition: "transform 300ms var(--ease-spring), filter 300ms var(--ease-out-smooth)" }}
      onMouseEnter={function(e) { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.filter = onDark ? "drop-shadow(0 0 18px rgba(245,185,66,0.25))" : "none"; }}
      onMouseLeave={function(e) { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.filter = "none"; }}
    >
      <img
        src={src}
        alt="Home Front Solutions"
        width={size}
        height={size}
        style={{
          height: size,
          width: "auto",
          display: "block",
          objectFit: "contain",
          filter: onDark ? "drop-shadow(0 2px 8px rgba(0,0,0,0.4))" : "none"
        }}
      />
    </span>
  );
}

function Header(props) {
  var _m = useState(false); var open = _m[0]; var setOpen = _m[1];
  var _s = useState(false); var scrolled = _s[0]; var setScrolled = _s[1];
  var onDark = !!(props && props.onDark);
  var currentRoute = props && props.route ? props.route.name : null;
  // Prevent body scroll while mobile menu is open (better UX)
  useEffect(function() {
    if (typeof document === "undefined") return;
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return function() { document.body.style.overflow = ""; };
  }, [open]);
  useEffect(function() {
    if (typeof window === "undefined") return;
    function onScroll() { setScrolled(window.scrollY > 8); }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return function() { window.removeEventListener("scroll", onScroll); };
  }, []);
  var nav = [
    { route: "what-we-do", label: "Services" },
    { route: "why-us", label: "Why Us" },
    { route: "partners", label: "Partners" },
    { route: "careers", label: "Careers" },
    { route: "insights", label: "Insights" },
    { route: "contact", label: "Contact" },
  ];
  var barBg;
  var borderBottomColor;
  var linkColor;
  if (onDark) {
    // On the home page the header sits on top of the navy hero.
    // Use a transparent bar that gains a subtle blurred navy surface after scroll.
    barBg = scrolled ? "rgba(11,37,64,0.82)" : "transparent";
    borderBottomColor = scrolled ? "rgba(255,255,255,0.06)" : "transparent";
    linkColor = "#E7ECF2";
  } else {
    barBg = scrolled ? "rgba(255,255,255,0.86)" : "#FFFFFF";
    borderBottomColor = scrolled ? "transparent" : RULE;
    linkColor = INK;
  }
  return (
    <header style={{
      background: barBg,
      backdropFilter: scrolled ? "saturate(180%) blur(14px)" : "none",
      WebkitBackdropFilter: scrolled ? "saturate(180%) blur(14px)" : "none",
      position: "sticky",
      top: 0,
      zIndex: 50,
      transition: "background 240ms ease, box-shadow 240ms ease, border-color 240ms ease",
      boxShadow: scrolled && !onDark ? "0 1px 0 rgba(14,14,12,0.06), 0 10px 30px rgba(14,14,12,0.04)" : "none",
      borderBottom: "1px solid " + borderBottomColor
    }}>
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 h-[80px] md:h-[92px] flex items-center justify-between">
        <a href="/" onClick={function(e) { handleNavClick(e, props.go, "home"); }} className="flex items-center" style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }} aria-label="Home Front Solutions home">
          <BrandLockup onDark={onDark} />
        </a>
        <nav className="hidden md:flex items-center gap-8" aria-label="Primary">
          {nav.map(function(item) {
            var active = currentRoute === item.route;
            return (
              <a
                key={item.route}
                href={getPathForRoute(item.route)}
                onClick={function(e) { handleNavClick(e, props.go, item.route); }}
                className={"nav-link" + (active ? " is-active" : "")}
                aria-current={active ? "page" : undefined}
                style={{ color: linkColor, padding: "6px 0", fontSize: 14, fontWeight: 500, letterSpacing: "-0.005em" }}
              >
                {item.label}
              </a>
            );
          })}
          {/* Rep Portal — separated from marketing nav: quiet link, external app */}
          <span aria-hidden="true" style={{ width: 1, height: 18, background: onDark ? "rgba(255,255,255,0.18)" : RULE }} />
          <a
            href={PORTAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link"
            style={{ color: linkColor, padding: "6px 0", fontSize: 13.5, fontWeight: 500, letterSpacing: "-0.005em", opacity: 0.85, display: "inline-flex", alignItems: "center", gap: 6 }}
            aria-label="Rep Portal (opens the field portal in a new tab)"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11 V7 A4 4 0 0 1 16 7 V11"/></svg>
            Portal
          </a>
          <a
            href={BOOKING_URL || "/contact"}
            onClick={BOOKING_URL ? undefined : function(e) { handleNavClick(e, props.go, "contact"); }}
            target={BOOKING_URL ? "_blank" : undefined}
            rel={BOOKING_URL ? "noopener noreferrer" : undefined}
            className="btn-blue inline-flex items-center gap-2 px-5 rounded-[10px]"
            style={{ cursor: "pointer", minHeight: 42, fontSize: 13.5, letterSpacing: "-0.005em" }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="3" y="5" width="18" height="16" rx="2"/>
              <path d="M3 9 H21"/>
              <path d="M8 3 V6"/>
              <path d="M16 3 V6"/>
            </svg>
            Book a Call
          </a>
        </nav>
        <button
          onClick={function() { setOpen(!open); }}
          className={"burger md:hidden" + (open ? " is-open" : "")}
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          style={{ color: linkColor }}
        >
          <span className="burger__line burger__line--1" aria-hidden="true" />
          <span className="burger__line burger__line--2" aria-hidden="true" />
          <span className="burger__line burger__line--3" aria-hidden="true" />
        </button>
      </div>

      {open && (
        <div className="md:hidden" style={{ background: onDark ? NAVY_DEEP : "#FFFFFF", borderTop: "1px solid " + (onDark ? "rgba(255,255,255,0.08)" : RULE) }}>
          <div className="px-6 py-6 flex flex-col">
            {nav.map(function(item) {
              return (
                <a key={item.route} href={getPathForRoute(item.route)} onClick={function(e) { if (!e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey && e.button === 0) { e.preventDefault(); setOpen(false); props.go(item.route); } }} className="text-left text-lg block" style={{ borderBottom: "1px solid " + (onDark ? "rgba(255,255,255,0.08)" : RULE), color: linkColor, background: "none", padding: "14px 0", cursor: "pointer", fontWeight: 500 }}>
                  {item.label}
                </a>
              );
            })}
            <a href={PORTAL_URL} target="_blank" rel="noopener noreferrer" onClick={function() { setOpen(false); }} className="text-left text-lg block" style={{ color: linkColor, background: "none", padding: "14px 0", cursor: "pointer", fontWeight: 500, opacity: 0.85, display: "flex", alignItems: "center", gap: 8 }} aria-label="Rep Portal (opens the field portal in a new tab)">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11 V7 A4 4 0 0 1 16 7 V11"/></svg>
              Rep Portal
            </a>
            <a href={BOOKING_URL || "/contact"} target={BOOKING_URL ? "_blank" : undefined} rel={BOOKING_URL ? "noopener noreferrer" : undefined} onClick={BOOKING_URL ? undefined : function(e) { if (!e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey && e.button === 0) { e.preventDefault(); setOpen(false); props.go("contact"); } }} className="btn-gold mt-6 text-center py-3.5 rounded-[10px] block">
              Book a Call →
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

function Footer(props) {
  var linkStyle = { color: "#CBD4DD", cursor: "pointer", fontSize: 13.5, lineHeight: 1.65, transition: "color 200ms ease", display: "block", padding: "2px 0" };
  var linkHoverIn = function(e) { e.currentTarget.style.color = "#FFFFFF"; };
  var linkHoverOut = function(e) { e.currentTarget.style.color = "#CBD4DD"; };
  var socialItem = {
    width: 36, height: 36, borderRadius: "50%",
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.14)",
    display: "inline-flex", alignItems: "center", justifyContent: "center",
    color: "#E7ECF2", transition: "background 200ms ease, border-color 200ms ease, color 200ms ease"
  };
  var socialHoverIn = function(e) { e.currentTarget.style.background = "rgba(62,163,148,0.18)"; e.currentTarget.style.borderColor = "#5FB8A5"; e.currentTarget.style.color = "#96D7C6"; };
  var socialHoverOut = function(e) { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.14)"; e.currentTarget.style.color = "#E7ECF2"; };
  return (
    <footer className="footer-navy footer-v2">
      {/* Soft US-map silhouette peeks through from the right */}
      <span className="footer-v2__map" aria-hidden="true">
        <svg viewBox="0 0 260 140" width="260" height="140" fill="currentColor">
          {[[20,58],[36,56],[52,58],[68,52],[84,46],[100,44],[118,42],[134,40],[152,40],[170,42],[188,46],[206,52],[224,60],[32,74],[50,72],[68,68],[86,66],[104,64],[122,62],[140,62],[158,64],[176,66],[194,70],[212,74],[228,80],[46,90],[64,86],[82,82],[100,80],[118,80],[136,82],[154,84],[172,86],[190,88],[206,92],[64,104],[82,100],[100,98],[118,98],[136,100],[154,102],[172,104],[84,116],[102,114],[120,114],[138,116],[156,118]].map(function(p,i){ return <circle key={i} cx={p[0]} cy={p[1]} r="2.6"/>; })}
        </svg>
      </span>
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 pt-16 pb-8 relative" style={{ zIndex: 1 }}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-10 mb-10">
          {/* Brand + tagline + social */}
          <div className="md:col-span-4">
            <a href="/" onClick={function(e) { handleNavClick(e, props.go, "home"); }} className="inline-block" style={{ padding: 0 }} aria-label="Home Front Solutions home">
              <BrandLockup onDark={true} />
            </a>
            <p className="max-w-sm mt-5" style={{ fontSize: 13.5, lineHeight: 1.6, color: "#9BA7B2" }}>
              Nationwide door-to-door growth for the home services that power modern life.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <a href={FACEBOOK_URL} target="_blank" rel="noreferrer" style={socialItem} onMouseEnter={socialHoverIn} onMouseLeave={socialHoverOut} aria-label="Facebook">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13.5 22v-8h2.7l.4-3.1h-3.1V8.9c0-.9.2-1.5 1.5-1.5h1.6V4.6c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.4-4 4.1v2.3H7.5V14h2.7v8h3.3z"/></svg>
              </a>
              <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" style={socialItem} onMouseEnter={socialHoverIn} onMouseLeave={socialHoverOut} aria-label="Instagram">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.9" fill="currentColor"/></svg>
              </a>
              <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" style={socialItem} onMouseEnter={socialHoverIn} onMouseLeave={socialHoverOut} aria-label="LinkedIn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6.5 8.2H3.7V21h2.8V8.2zM5.1 3.5A1.7 1.7 0 1 0 5.1 6.9 1.7 1.7 0 0 0 5.1 3.5zM21 14.1c0-3-1.6-4.4-3.8-4.4-1.7 0-2.5 1-2.9 1.6V8.2h-2.8c0 .8 0 12.8 0 12.8h2.8v-7.1c0-.3 0-.5.1-.7.2-.5.7-1.1 1.6-1.1 1.1 0 1.6.9 1.6 2.1V21H21v-6.9z"/></svg>
              </a>
              <a href="https://www.youtube.com/@homefrontsolutions" target="_blank" rel="noreferrer" style={socialItem} onMouseEnter={socialHoverIn} onMouseLeave={socialHoverOut} aria-label="YouTube">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2C2 8.8 2 12 2 12s0 3.2.4 4.8c.3 1 1 1.5 1.8 1.8 1.6.4 7.8.4 7.8.4s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8c.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8zM10 15V9l5 3-5 3z"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2">
            <p style={{ fontSize: 12, color: "#9BA7B2", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 14, fontWeight: 600 }}>Quick Links</p>
            <ul className="space-y-0" style={{ listStyle: "none", margin: 0, padding: 0 }}>
              <li><a href="/what-we-do" onClick={function(e) { handleNavClick(e, props.go, "what-we-do"); }} style={linkStyle} onMouseEnter={linkHoverIn} onMouseLeave={linkHoverOut}>Services</a></li>
              <li><a href="/why-us" onClick={function(e) { handleNavClick(e, props.go, "why-us"); }} style={linkStyle} onMouseEnter={linkHoverIn} onMouseLeave={linkHoverOut}>Why Us</a></li>
              <li><a href="/partners" onClick={function(e) { handleNavClick(e, props.go, "partners"); }} style={linkStyle} onMouseEnter={linkHoverIn} onMouseLeave={linkHoverOut}>Partners</a></li>
              <li><a href="/careers" onClick={function(e) { handleNavClick(e, props.go, "careers"); }} style={linkStyle} onMouseEnter={linkHoverIn} onMouseLeave={linkHoverOut}>Careers</a></li>
              <li><a href="/insights" onClick={function(e) { handleNavClick(e, props.go, "insights"); }} style={linkStyle} onMouseEnter={linkHoverIn} onMouseLeave={linkHoverOut}>Insights</a></li>
              <li><a href="/contact" onClick={function(e) { handleNavClick(e, props.go, "contact"); }} style={linkStyle} onMouseEnter={linkHoverIn} onMouseLeave={linkHoverOut}>Contact</a></li>
            </ul>
          </div>

          {/* Services */}
          <div className="md:col-span-3">
            <p style={{ fontSize: 12, color: "#9BA7B2", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 14, fontWeight: 600 }}>Services</p>
            <ul className="space-y-0" style={{ listStyle: "none", margin: 0, padding: 0 }}>
              <li><a href="/what-we-do" onClick={function(e) { handleNavClick(e, props.go, "what-we-do"); }} style={linkStyle} onMouseEnter={linkHoverIn} onMouseLeave={linkHoverOut}>Fiber Internet</a></li>
              <li><a href="/what-we-do" onClick={function(e) { handleNavClick(e, props.go, "what-we-do"); }} style={linkStyle} onMouseEnter={linkHoverIn} onMouseLeave={linkHoverOut}>Home Security</a></li>
              <li><a href="/what-we-do" onClick={function(e) { handleNavClick(e, props.go, "what-we-do"); }} style={linkStyle} onMouseEnter={linkHoverIn} onMouseLeave={linkHoverOut}>Solar</a></li>
              <li><a href="/what-we-do" onClick={function(e) { handleNavClick(e, props.go, "what-we-do"); }} style={linkStyle} onMouseEnter={linkHoverIn} onMouseLeave={linkHoverOut}>Water Filtration</a></li>
              <li><a href="/what-we-do" onClick={function(e) { handleNavClick(e, props.go, "what-we-do"); }} style={linkStyle} onMouseEnter={linkHoverIn} onMouseLeave={linkHoverOut}>Roofing</a></li>
              <li><a href="/what-we-do" onClick={function(e) { handleNavClick(e, props.go, "what-we-do"); }} style={linkStyle} onMouseEnter={linkHoverIn} onMouseLeave={linkHoverOut}>Home Services</a></li>
            </ul>
          </div>

          {/* Contact Us */}
          <div className="md:col-span-3">
            <p style={{ fontSize: 12, color: "#9BA7B2", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 14, fontWeight: 600 }}>Contact Us</p>
            <ul className="space-y-2.5" style={{ listStyle: "none", margin: 0, padding: 0 }}>
              <li className="flex items-start gap-2.5">
                <span style={{ color: "#5FB8A5", flexShrink: 0, marginTop: 3 }} aria-hidden="true">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 4 H9 L11 9 L8 11 C 9 14, 10 15, 13 16 L15 13 L20 15 V19 A2 2 0 0 1 18 21 C 10 21, 3 14, 3 6 A 2 2 0 0 1 5 4 Z"/></svg>
                </span>
                <a href="tel:3364209379" style={{ color: "#CBD4DD", fontSize: 13.5, transition: "color 200ms ease" }} onMouseEnter={linkHoverIn} onMouseLeave={linkHoverOut}>(336) 420-9379</a>
              </li>
              <li className="flex items-start gap-2.5">
                <span style={{ color: "#5FB8A5", flexShrink: 0, marginTop: 3 }} aria-hidden="true">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7 L12 13 L21 7"/></svg>
                </span>
                <a href="mailto:info@homefrontsolutionsllc.com" style={{ color: "#CBD4DD", fontSize: 13.5, transition: "color 200ms ease" }} onMouseEnter={linkHoverIn} onMouseLeave={linkHoverOut}>info@homefrontsolutionsllc.com</a>
              </li>
              <li className="flex items-start gap-2.5">
                <span style={{ color: "#5FB8A5", flexShrink: 0, marginTop: 3 }} aria-hidden="true">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21 C 12 21, 5 13.5, 5 9 A 7 7 0 0 1 19 9 C 19 13.5, 12 21, 12 21 Z"/><circle cx="12" cy="9" r="2.4"/></svg>
                </span>
                <span style={{ color: "#CBD4DD", fontSize: 13.5, lineHeight: 1.55 }}>
                  Greensboro, NC<br/>Serving markets nationwide.
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ fontSize: 12.5, color: "#8A96A0" }}>© 2026 Home Front Solutions LLC. All rights reserved.</div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2" style={{ fontSize: 12.5 }}>
            <a href="/privacy" onClick={function(e) { handleNavClick(e, props.go, "privacy"); }} style={{ cursor: "pointer", color: "#8A96A0" }} onMouseEnter={linkHoverIn} onMouseLeave={linkHoverOut}>Privacy Policy</a>
            <a href="/terms" onClick={function(e) { handleNavClick(e, props.go, "terms"); }} style={{ cursor: "pointer", color: "#8A96A0" }} onMouseEnter={linkHoverIn} onMouseLeave={linkHoverOut}>Terms of Service</a>
            <span style={{ color: "#8A96A0" }}>Equal Opportunity Employer</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ── Service-category icons — lean teal line icons ─────────────────────
function SvcIcon(props) {
  var kind = props.kind;
  var common = { width: 30, height: 30, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true };
  if (kind === "fiber") {
    // Wi-Fi signal — 3 expanding arcs + a signal dot at the base
    return (
      <svg {...common}>
        <path d="M3 10.2 Q 12 1, 21 10.2"  />
        <path d="M6 13 Q 12 6.2, 18 13"     opacity="0.82" />
        <path d="M9 15.6 Q 12 11.4, 15 15.6" opacity="0.65" />
        <circle cx="12" cy="19" r="1.6" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  if (kind === "security") {
    return (
      <svg {...common}>
        <path d="M12 3 L20 6 V12 C 20 16.5, 16.5 19.5, 12 21 C 7.5 19.5, 4 16.5, 4 12 V6 Z" />
        <path d="M9 12 L11 14 L15 10" />
      </svg>
    );
  }
  if (kind === "solar") {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 3 V5" /><path d="M12 19 V21" />
        <path d="M3 12 H5" /><path d="M19 12 H21" />
        <path d="M5.5 5.5 L7 7" /><path d="M17 17 L18.5 18.5" />
        <path d="M5.5 18.5 L7 17" /><path d="M17 7 L18.5 5.5" />
      </svg>
    );
  }
  if (kind === "water") {
    return (
      <svg {...common}>
        <path d="M12 3.5 C 12 3.5, 5.5 11, 5.5 15.5 C 5.5 19, 8.5 21, 12 21 C 15.5 21, 18.5 19, 18.5 15.5 C 18.5 11, 12 3.5, 12 3.5 Z" />
      </svg>
    );
  }
  if (kind === "roofing") {
    return (
      <svg {...common}>
        <path d="M3 13 L12 5 L21 13" />
        <path d="M6 12 L6 20 H 18 L 18 12" />
        <path d="M10 20 V15 H14 V20" opacity="0.6" />
      </svg>
    );
  }
  if (kind === "home") {
    return (
      <svg {...common}>
        <rect x="5" y="6" width="14" height="12" rx="1.5" />
        <path d="M5 10 H19" />
        <path d="M9 14 H15" opacity="0.6" />
        <path d="M9 3 V6" /><path d="M15 3 V6" />
      </svg>
    );
  }
  return null;
}

// Small stat-bar icons — navy-teal circle badges on the white card
function StatIcon(props) {
  var kind = props.kind;
  var common = { width: 22, height: 22, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true };
  if (kind === "globe") return <svg {...common}><circle cx="12" cy="12" r="9"/><path d="M3 12 H21"/><path d="M12 3 C 15 6.5, 15 17.5, 12 21"/><path d="M12 3 C 9 6.5, 9 17.5, 12 21"/></svg>;
  if (kind === "pin")    return <svg {...common}><path d="M12 21 C 12 21, 5 13.5, 5 9 A 7 7 0 0 1 19 9 C 19 13.5, 12 21, 12 21 Z"/><circle cx="12" cy="9" r="2.4"/></svg>;
  if (kind === "cats")   return <svg {...common}><rect x="4" y="4" width="7" height="7" rx="1.2"/><rect x="13" y="4" width="7" height="7" rx="1.2"/><rect x="4" y="13" width="7" height="7" rx="1.2"/><rect x="13" y="13" width="7" height="7" rx="1.2"/></svg>;
  if (kind === "brain")  return <svg {...common}><path d="M8 5 C 5 5, 4 8, 5 10 C 3.5 11.5, 4 14, 6 14.5 C 6 17, 8.5 18.5, 11 18 V 6 C 10 5, 9 5, 8 5 Z"/><path d="M16 5 C 19 5, 20 8, 19 10 C 20.5 11.5, 20 14, 18 14.5 C 18 17, 15.5 18.5, 13 18 V 6 C 14 5, 15 5, 16 5 Z"/></svg>;
  if (kind === "sparkle") return <svg {...common}><path d="M12 3 L13.6 9 L20 11 L13.6 13 L12 19 L10.4 13 L4 11 L10.4 9 Z"/><path d="M18 4 L18.6 6 L20.8 6.8 L18.6 7.6 L18 9.8 L17.4 7.6 L15.2 6.8 L17.4 6 Z" opacity="0.7"/></svg>;
  if (kind === "chart")  return <svg {...common}><path d="M4 19 V8"/><path d="M10 19 V11"/><path d="M16 19 V4"/><path d="M2 19 H22"/><path d="M4 11 L10 7 L16 9" opacity="0.75"/></svg>;
  return null;
}

// HFS Coach module mini-card icons
function CoachModuleIcon(props) {
  var kind = props.kind;
  var common = { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true };
  if (kind === "mic")    return <svg {...common}><rect x="9" y="3" width="6" height="12" rx="3"/><path d="M5 11 V12 A7 7 0 0 0 19 12 V11"/><path d="M12 19 V22"/><path d="M8 22 H16"/></svg>;
  if (kind === "chat")   return <svg {...common}><path d="M3 6 H21 V16 H10 L5 20 V16 H3 Z"/><path d="M7 10 H16" opacity="0.55"/><path d="M7 13 H13" opacity="0.55"/></svg>;
  if (kind === "trophy") return <svg {...common}><path d="M7 4 H17 V9 A5 5 0 0 1 7 9 Z"/><path d="M7 6 H3 V8 A4 4 0 0 0 7 12"/><path d="M17 6 H21 V8 A4 4 0 0 1 17 12"/><path d="M10 14 H14 L13 19 H11 Z"/><path d="M8 22 H16"/></svg>;
  if (kind === "chart")  return <svg {...common}><rect x="3" y="4.5" width="18" height="14" rx="1.2"/><path d="M6 14 L10 10 L13 12 L17 7"/><circle cx="17" cy="7" r="1" fill="currentColor" stroke="none"/><path d="M7 21 H17"/></svg>;
  return null;
}

// Career-perk icons used in the recruiting band
function PerkIcon(props) {
  var kind = props.kind;
  var common = { width: 16, height: 16, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true };
  if (kind === "wallet")  return <svg {...common}><rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 10 H21"/><circle cx="17" cy="14.5" r="1" fill="currentColor"/></svg>;
  if (kind === "badge")   return <svg {...common}><circle cx="12" cy="9" r="5"/><path d="M7 14 L6 21 L12 18 L18 21 L17 14"/></svg>;
  if (kind === "ladder")  return <svg {...common}><path d="M7 3 V21"/><path d="M17 3 V21"/><path d="M7 7 H17"/><path d="M7 12 H17"/><path d="M7 17 H17"/></svg>;
  if (kind === "support") return <svg {...common}><path d="M4 15 V12 A8 8 0 0 1 20 12 V15"/><rect x="2" y="13" width="4" height="6" rx="1"/><rect x="18" y="13" width="4" height="6" rx="1"/><path d="M20 18 C 20 20, 17 21, 14 21"/></svg>;
  return null;
}

// Why-Home-Front icons (shield, house, US map silhouette, badge)
function WhyIcon(props) {
  var kind = props.kind;
  var common = { width: 28, height: 28, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.55, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true };
  if (kind === "shield") return (<svg {...common}><path d="M12 3 L20 6 V12 C 20 16.5, 16.5 19.5, 12 21 C 7.5 19.5, 4 16.5, 4 12 V6 Z"/><path d="M8.5 12 L11 14.3 L15.5 9.6"/></svg>);
  if (kind === "house")  return (<svg {...common}><path d="M3 11 L12 3.5 L21 11 V20 A1 1 0 0 1 20 21 H4 A1 1 0 0 1 3 20 Z"/><path d="M9 21 V13 H15 V21"/></svg>);
  if (kind === "map")    return (
    <svg width="44" height="28" viewBox="0 0 260 140" fill="currentColor" aria-hidden="true">
      {[[20,58],[36,56],[52,58],[68,52],[84,46],[100,44],[118,42],[134,40],[152,40],[170,42],[188,46],[206,52],[224,60],[32,74],[50,72],[68,68],[86,66],[104,64],[122,62],[140,62],[158,64],[176,66],[194,70],[212,74],[228,80],[46,90],[64,86],[82,82],[100,80],[118,80],[136,82],[154,84],[172,86],[190,88],[206,92],[64,104],[82,100],[100,98],[118,98],[136,100],[154,102],[172,104],[84,116],[102,114],[120,114],[138,116],[156,118]].map(function(p,i){ return <circle key={i} cx={p[0]} cy={p[1]} r="3.2"/>; })}
    </svg>
  );
  if (kind === "badge")  return (<svg {...common}><circle cx="12" cy="9" r="5.2"/><path d="M9.8 9 L11.2 10.3 L14.2 7.5" strokeWidth="1.6"/><path d="M7.5 14 L6 21 L12 18 L18 21 L16.5 14"/></svg>);
  return null;
}

// FAQ row used in the new 2-column grid
function FaqRow2(props) {
  var _o = useState(false); var open = _o[0]; var setOpen = _o[1];
  return (
    <div className="faq2" data-open={open ? "true" : "false"}>
      <button type="button" className="faq2__trigger" onClick={function() { setOpen(!open); }} aria-expanded={open}>
        <span>{props.q}</span>
        <svg className="faq2__chev" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
      </button>
      <div className="faq2__body">{props.a}</div>
    </div>
  );
}

// HFS Coach™ — new mockup-matching dashboard with real line chart + avatar leaderboard
function CoachMockV2() {
  var _t = useState("dashboard"); var tab = _t[0]; var setTab = _t[1];
  var _pw = useState("this"); var which = _pw[0]; var setWhich = _pw[1];

  var stats = [
    { label: "Doors Knocked", value: "152" },
    { label: "Conversations", value: "98" },
    { label: "Appointments",  value: "36" },
    { label: "Close Rate",    value: "36.7%" }
  ];

  var thisWeek = [42, 64, 56, 88, 74, 112, 134];
  var lastWeek = [36, 48, 44, 62, 70, 88, 96];
  var labels = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
  var max = 160, pad = 10, chartW = 360, chartH = 120;
  function toPath(arr) {
    var step = (chartW - pad * 2) / (arr.length - 1);
    return arr.map(function(v, i) {
      var x = pad + i * step;
      var y = chartH - pad - (v / max) * (chartH - pad * 2);
      return (i === 0 ? "M" : "L") + x.toFixed(1) + "," + y.toFixed(1);
    }).join(" ");
  }

  var leaders = [
    { name: "A. Martinez", appts: 48, init: "AM" },
    { name: "J. Thompson", appts: 43, init: "JT" },
    { name: "M. Johnson",  appts: 39, init: "MJ" }
  ];

  var navItems = [
    { id: "dashboard", label: "Dashboard", icon: "grid" },
    { id: "reps",      label: "Reps",      icon: "users" },
    { id: "coaching",  label: "Coaching",  icon: "headset" },
    { id: "roleplays", label: "Roleplays", icon: "chat" },
    { id: "reports",   label: "Reports",   icon: "doc" },
    { id: "tools",     label: "Tools",     icon: "wrench" },
    { id: "leader",    label: "Leaderboard", icon: "trophy" }
  ];

  return (
    <div className="coach2">
      <aside className="coach2__side">
        <div className="coach2__brand">
          <span className="coach2__brand-dot" aria-hidden="true">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11 L12 3.5 L21 11 V20 H3 Z"/></svg>
          </span>
          HFS Coach
        </div>
        <ul className="coach2__nav">
          {navItems.map(function(item) {
            var active = tab === item.id;
            return (
              <li key={item.id} className={active ? "is-active" : ""} onClick={function() { setTab(item.id); }} role="button" tabIndex={0}
                onKeyDown={function(e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setTab(item.id); } }}>
                <span className="coach2__nav-i" aria-hidden="true">
                  {item.icon === "grid"    && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="8" height="8" rx="1"/><rect x="13" y="3" width="8" height="8" rx="1"/><rect x="3" y="13" width="8" height="8" rx="1"/><rect x="13" y="13" width="8" height="8" rx="1"/></svg>}
                  {item.icon === "users"   && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="9" r="3"/><path d="M3 19 C 4 16, 6 14.5, 9 14.5 C 12 14.5, 14 16, 15 19"/><circle cx="17" cy="9" r="2.6"/><path d="M15 15 C 17 15, 20 16, 21 19"/></svg>}
                  {item.icon === "headset" && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 15 V12 A8 8 0 0 1 20 12 V15"/><rect x="2" y="13" width="4" height="6" rx="1"/><rect x="18" y="13" width="4" height="6" rx="1"/></svg>}
                  {item.icon === "chat"    && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6 H21 V16 H9 L5 20 V16 H3 Z"/></svg>}
                  {item.icon === "doc"     && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 3 H14 L19 8 V21 H5 Z"/><path d="M14 3 V8 H19"/></svg>}
                  {item.icon === "wrench"  && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3 A5 5 0 0 1 18 11 L8 21 L3 16 L13 6 A5 5 0 0 1 15 3 Z"/></svg>}
                  {item.icon === "trophy"  && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M7 4 H17 V9 A5 5 0 0 1 7 9 Z"/><path d="M7 6 H3 V8 A4 4 0 0 0 7 12"/><path d="M17 6 H21 V8 A4 4 0 0 1 17 12"/><path d="M10 14 H14 L13 19 H11 Z"/></svg>}
                </span>
                {item.label}
              </li>
            );
          })}
        </ul>
      </aside>

      <div className="coach2__main">
        <div className="coach2__top">Today's Overview</div>

        <div className="coach2__stats">
          {stats.map(function(s) {
            return (
              <div key={s.label} className="coach2__stat">
                <div className="coach2__stat-label">{s.label}</div>
                <div className="coach2__stat-value">{s.value}</div>
              </div>
            );
          })}
        </div>

        <div className="coach2__grid">
          <div className="coach2__card">
            <div className="coach2__card-head"><span className="coach2__card-title">Performance Trend</span></div>
            <svg viewBox={"0 0 " + chartW + " " + chartH} className="coach2__chart" preserveAspectRatio="none">
              <defs>
                <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3EA394" stopOpacity="0.22"/>
                  <stop offset="100%" stopColor="#3EA394" stopOpacity="0"/>
                </linearGradient>
              </defs>
              {[0,1,2,3].map(function(i) {
                var y = pad + ((chartH - pad * 2) / 3) * i;
                return <line key={i} x1={pad} x2={chartW - pad} y1={y} y2={y} stroke="#E3E8ED" strokeWidth="1" strokeDasharray="2 4"/>;
              })}
              <path d={toPath(thisWeek) + " L" + (chartW - pad) + "," + (chartH - pad) + " L" + pad + "," + (chartH - pad) + " Z"} fill="url(#trendFill)"/>
              <path d={toPath(thisWeek)} fill="none" stroke="#3EA394" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round"/>
              {thisWeek.map(function(v, i) {
                var step = (chartW - pad * 2) / (thisWeek.length - 1);
                var x = pad + i * step;
                var y = chartH - pad - (v / max) * (chartH - pad * 2);
                return <circle key={i} cx={x} cy={y} r="3" fill="#FFFFFF" stroke="#3EA394" strokeWidth="2"/>;
              })}
              {which === "last" && <path d={toPath(lastWeek)} fill="none" stroke="#8A96A0" strokeWidth="1.8" strokeDasharray="4 3" strokeLinecap="round"/>}
            </svg>
            <div className="coach2__chart-legend">
              {labels.map(function(l) { return <span key={l}>{l}</span>; })}
            </div>
            <div className="coach2__chart-tabs">
              <button type="button" className={which === "this" ? "is-active" : ""} onClick={function() { setWhich("this"); }}>This Week</button>
              <button type="button" className={which === "last" ? "is-active" : ""} onClick={function() { setWhich("last"); }}>Last Week</button>
            </div>
          </div>

          <div className="coach2__card">
            <div className="coach2__card-head"><span className="coach2__card-title">Rep Leaderboard</span><span className="coach2__card-sub">Appts</span></div>
            <ul className="coach2__lb">
              {leaders.map(function(r, i) {
                return (
                  <li key={r.name}>
                    <span className="coach2__lb-rank">{i + 1}</span>
                    <span className="coach2__lb-avatar" aria-hidden="true">{r.init}</span>
                    <span className="coach2__lb-name">{r.name}</span>
                    <span className="coach2__lb-val">{r.appts}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// Step-flow icons — door-with-knock, two-handed handshake, dashboard chart
function StepIcon(props) {
  var kind = props.kind;
  var common = { width: 34, height: 34, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true };
  if (kind === "door") {
    // Door with glass pane + raised fist + sound ripples
    return (
      <svg {...common}>
        <rect x="8.5" y="3" width="11.5" height="18" rx="0.5" />
        <rect x="10.5" y="5" width="7.5" height="6.5" rx="0.3" opacity="0.55" />
        <circle cx="17.5" cy="13.5" r="0.8" fill="currentColor" stroke="none" />
        {/* fist */}
        <path d="M5.5 10.8 C 4.6 10.8, 4 11.4, 4 12.2 C 4 13, 4.6 13.6, 5.4 13.6 L 7.8 13.6 L 7.8 10.2 L 5.4 10.2 Z" fill="currentColor" stroke="none" opacity="0.9" />
        {/* knock ripples */}
        <path d="M2.5 9.5 L 3.5 9.8" opacity="0.7" />
        <path d="M2 12 L 3.2 12" opacity="0.9" />
        <path d="M2.5 14.5 L 3.5 14.2" opacity="0.7" />
      </svg>
    );
  }
  if (kind === "shake") {
    // Two-handed handshake with cuff detail
    return (
      <svg {...common}>
        <path d="M2 13 L 5 10 L 8 12 L 11 10 L 13 12 L 11 14 L 9 13 L 7 15 L 4 15 Z" fill="currentColor" stroke="none" opacity="0.88" />
        <path d="M22 13 L 19 10 L 16 12 L 13 10 L 11 12 L 13 14 L 15 13 L 17 15 L 20 15 Z" fill="currentColor" stroke="none" opacity="0.55" />
        <path d="M11 12 L 13 10" />
        <path d="M2 15 L 4 15" />
        <path d="M22 15 L 20 15" />
      </svg>
    );
  }
  if (kind === "bar") {
    // Dashboard frame with rising line-chart + bar baseline + arrow up
    return (
      <svg {...common}>
        <rect x="3" y="4.5" width="18" height="14" rx="1.2" />
        <path d="M3 16 L 21 16" opacity="0.35" />
        <path d="M6 13 L 10 9.2 L 13 11.2 L 17.5 7" />
        <path d="M16 7 L 17.5 7 L 17.5 8.5" />
        <circle cx="17.5" cy="7" r="1" fill="currentColor" stroke="none" />
        <path d="M7 21 L 17 21" />
        <path d="M12 18.5 L 12 21" />
      </svg>
    );
  }
  return null;
}

// Value-card icons (bottom "Built on people" section)
function ValIcon(props) {
  var kind = props.kind;
  var common = { width: 22, height: 22, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true };
  if (kind === "user") return <svg {...common}><circle cx="12" cy="8" r="4"/><path d="M4 20 C 5 16, 8 14.5, 12 14.5 C 16 14.5, 19 16, 20 20"/></svg>;
  if (kind === "house") return <svg {...common}><path d="M4 11 L12 4 L20 11 V19 A1 1 0 0 1 19 20 H5 A1 1 0 0 1 4 19 Z"/><path d="M10 20 V14 H14 V20"/></svg>;
  if (kind === "pin") return <svg {...common}><path d="M12 21 C 12 21, 5 13.5, 5 9 A 7 7 0 0 1 19 9 C 19 13.5, 12 21, 12 21 Z"/><circle cx="12" cy="9" r="2.4"/></svg>;
  if (kind === "badge") return <svg {...common}><circle cx="12" cy="9" r="5"/><path d="M7 14 L5 22 L12 18 L19 22 L17 14"/></svg>;
  return null;
}

// Illustrated "knocking a door" badge — animated, on-brand, sits over hero photo so
// the "we knock doors" action reads clearly even if a photo fails.
function KnockOverlay(props) {
  var size = (props && props.size) || 88;
  var position = (props && props.position) || "bottom-right";
  var posStyle = {};
  if (position === "bottom-right") { posStyle = { right: 12, bottom: 12 }; }
  if (position === "top-right")    { posStyle = { right: 12, top: 12 }; }
  if (position === "bottom-left")  { posStyle = { left: 12, bottom: 12 }; }
  return (
    <span
      className="knock-overlay"
      style={{ position: "absolute", width: size, height: size, ...posStyle, zIndex: 4, pointerEvents: "none" }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 100 100" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="knockDoor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"  stopColor="#F5B942" />
            <stop offset="100%" stopColor="#E0A42A" />
          </linearGradient>
          <linearGradient id="knockDoorFrame" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"  stopColor="#163A5A" />
            <stop offset="100%" stopColor="#0B2540" />
          </linearGradient>
        </defs>
        {/* Pedestal/background ring */}
        <circle cx="50" cy="50" r="46" fill="rgba(8,26,46,0.82)" stroke="rgba(245,185,66,0.4)" strokeWidth="1.5" />
        {/* Sound ripple rings — animated to feel like knock-knock */}
        <circle className="knock-ripple" cx="32" cy="46" r="4"  fill="none" stroke="#F5B942" strokeWidth="1.4" opacity="0.85" />
        <circle className="knock-ripple knock-ripple--2" cx="32" cy="46" r="8"  fill="none" stroke="#F5B942" strokeWidth="1.2" opacity="0.55" />
        <circle className="knock-ripple knock-ripple--3" cx="32" cy="46" r="12" fill="none" stroke="#F5B942" strokeWidth="1"   opacity="0.35" />
        {/* Door — navy frame + gold panel, gold handle */}
        <rect x="48" y="24" width="34" height="56" rx="3" fill="url(#knockDoorFrame)" />
        <rect x="52" y="28" width="26" height="48" rx="2" fill="url(#knockDoor)" />
        <rect x="56" y="34" width="18" height="14" rx="1" fill="rgba(0,0,0,0.12)" />
        <rect x="56" y="52" width="18" height="14" rx="1" fill="rgba(0,0,0,0.12)" />
        <circle cx="72" cy="54" r="1.6" fill="#0B2540" />
        {/* Knocking hand/fist — animated tap */}
        <g className="knock-fist">
          <ellipse cx="42" cy="50" rx="8" ry="6" fill="#F5F1E7" stroke="#0B2540" strokeWidth="0.8" />
          <path d="M36 52 C 34 52, 32 53, 32 55 L 34 56 Z" fill="#F5F1E7" stroke="#0B2540" strokeWidth="0.6" />
          {/* Wrist/forearm fading off the left edge */}
          <rect x="30" y="46" width="10" height="10" fill="#1E6D6B" rx="2" />
          <rect x="26" y="44" width="12" height="14" fill="#155159" rx="3" />
        </g>
      </svg>
    </span>
  );
}

// Animated count-up — tween to `target` over `duration` ms whenever target changes
function useCountUp(target, duration) {
  var _v = useState(0); var val = _v[0]; var setVal = _v[1];
  useEffect(function() {
    var start = 0;
    var from = 0;
    var to = typeof target === "number" ? target : 0;
    var d = duration || 900;
    var raf;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min(1, (ts - start) / d);
      var eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      setVal(Math.round(from + (to - from) * eased));
      if (p < 1) raf = requestAnimationFrame(step);
    }
    raf = requestAnimationFrame(step);
    return function() { if (raf) cancelAnimationFrame(raf); };
  }, [target, duration]);
  return val;
}

// ── HFS Coach — interactive dashboard mockup ──────────────────────────────
// Clickable sidebar tabs switch panels; time-period chip swaps stat values
// with an animated count-up; mini roleplay/leaderboard views are live too.
function CoachMock() {
  var _t = useState("dashboard"); var tab = _t[0]; var setTab = _t[1];
  var _p = useState("week"); var period = _p[0]; var setPeriod = _p[1];
  var _o = useState(false); var periodOpen = _o[0]; var setPeriodOpen = _o[1];

  var navItems = [
    { id: "dashboard", label: "Dashboard" },
    { id: "reps",      label: "Reps" },
    { id: "coaching",  label: "Coaching" },
    { id: "roleplays", label: "Roleplays" },
    { id: "reports",   label: "Reports" },
    { id: "tools",     label: "Tools" },
    { id: "leader",    label: "Leaderboard" },
    { id: "settings",  label: "Settings" }
  ];

  // Stats per period — the numbers genuinely change when you click the chip.
  var statsByPeriod = {
    today: { calls: 12, conv: 8,  close: 62, sales: 3250 },
    week:  { calls: 18, conv: 12, close: 67, sales: 14250 },
    month: { calls: 74, conv: 56, close: 71, sales: 58200 }
  };
  var stats = statsByPeriod[period];

  // Animated counters driven by the active period
  var callsAnim = useCountUp(stats.calls, 700);
  var convAnim  = useCountUp(stats.conv,  700);
  var closeAnim = useCountUp(stats.close, 700);
  var salesAnim = useCountUp(stats.sales, 900);

  var periodLabel = { today: "Today", week: "This Week", month: "This Month" };

  function pickPeriod(p) { setPeriod(p); setPeriodOpen(false); }

  return (
    <div className="coach-mock">
      <aside className="coach-mock__side">
        <div className="coach-mock__brand">HFS COACH</div>
        <ul className="coach-mock__nav">
          {navItems.map(function(item) {
            return (
              <li
                key={item.id}
                className={tab === item.id ? "is-active" : ""}
                onClick={function() { setTab(item.id); }}
                role="button"
                tabIndex={0}
                onKeyDown={function(e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setTab(item.id); } }}
                aria-current={tab === item.id ? "page" : undefined}
              >
                {item.label}
              </li>
            );
          })}
        </ul>
      </aside>
      <div className="coach-mock__main">
        <div className="coach-mock__top">
          <span className="coach-mock__hello">
            {tab === "dashboard" && "Welcome back, John!"}
            {tab === "reps" && "Team — 32 reps"}
            {tab === "coaching" && "Coaching — Week 16"}
            {tab === "roleplays" && "Roleplays — Recent"}
            {tab === "reports" && "Reports — Summary"}
            {tab === "tools" && "Tools & CRM"}
            {tab === "leader" && "Leaderboard"}
            {tab === "settings" && "Settings"}
          </span>
          {tab === "dashboard" && (
            <span className="coach-mock__period-wrap" style={{ position: "relative" }}>
              <button
                type="button"
                className="coach-mock__week"
                onClick={function() { setPeriodOpen(!periodOpen); }}
                aria-haspopup="listbox"
                aria-expanded={periodOpen}
              >
                {periodLabel[period]} <span aria-hidden="true">▾</span>
              </button>
              {periodOpen && (
                <ul className="coach-mock__period-menu" role="listbox">
                  {["today","week","month"].map(function(p) {
                    return (
                      <li
                        key={p}
                        role="option"
                        aria-selected={period === p}
                        className={period === p ? "is-active" : ""}
                        onClick={function() { pickPeriod(p); }}
                      >
                        {periodLabel[p]}
                      </li>
                    );
                  })}
                </ul>
              )}
            </span>
          )}
        </div>

        {/* Dashboard view */}
        {tab === "dashboard" && (
          <>
            <div className="coach-mock__stats">
              <div className="coach-mock__stat"><div className="coach-mock__stat-label">Calls Today</div><div className="coach-mock__stat-value">{callsAnim}</div></div>
              <div className="coach-mock__stat"><div className="coach-mock__stat-label">Conversations</div><div className="coach-mock__stat-value">{convAnim}</div></div>
              <div className="coach-mock__stat"><div className="coach-mock__stat-label">Close Rate</div><div className="coach-mock__stat-value">{closeAnim}%</div></div>
              <div className="coach-mock__stat"><div className="coach-mock__stat-label">Total Sales</div><div className="coach-mock__stat-value">${salesAnim.toLocaleString()}</div></div>
            </div>
            <div className="coach-mock__grid2">
              <div className="coach-mock__card" title="Overall coaching score across pitch, tone, and follow-through">
                <div className="coach-mock__card-title">Coaching Score</div>
                <div className="coach-mock__score">
                  <span className="coach-mock__circle" data-value="92" style={{ ["--p"]: "92%" }} />
                  <div><div className="coach-mock__note">Great</div><div className="coach-mock__sub">Great work!</div></div>
                </div>
                <div className="coach-mock__spark" />
              </div>
              <div className="coach-mock__card" title="How well reps handle common pushbacks">
                <div className="coach-mock__card-title">Objection Handling</div>
                <div className="coach-mock__score">
                  <span className="coach-mock__circle" data-value="87" style={{ ["--p"]: "87%" }} />
                  <div><div className="coach-mock__note">Strong</div><div className="coach-mock__sub">Above team avg</div></div>
                </div>
              </div>
              <div className="coach-mock__card" title="Pitch clarity, pacing, and benefits framing">
                <div className="coach-mock__card-title">Pitch Score</div>
                <div className="coach-mock__score">
                  <span className="coach-mock__circle" data-value="90" style={{ ["--p"]: "90%" }} />
                  <div><div className="coach-mock__note">Excellent</div><div className="coach-mock__sub">Top 10%</div></div>
                </div>
              </div>
            </div>
            <div className="coach-mock__grid2" style={{ gridTemplateColumns: "1.2fr 1fr" }}>
              <div className="coach-mock__card">
                <div className="coach-mock__card-title">Recent Roleplay</div>
                <div className="flex items-center justify-between" style={{ gap: 8, marginTop: 6 }}>
                  <span style={{ fontSize: 11.5, color: INK }}>Solar Presentation</span>
                  <span style={{ fontSize: 11, color: MUTED }}>Score</span>
                </div>
                <div style={{ fontSize: 20, fontWeight: 700, color: INK, marginTop: 2 }}>91%</div>
                <button type="button" className="coach-mock__link" onClick={function() { setTab("roleplays"); }}>View ▸</button>
              </div>
              <div className="coach-mock__card">
                <div className="coach-mock__card-title flex items-center justify-between"><span>Leaderboard</span><button type="button" className="coach-mock__link" onClick={function() { setTab("leader"); }}>View All</button></div>
                <div className="coach-mock__lb" style={{ gridTemplateColumns: "1fr", marginTop: 4 }}>
                  <div className="coach-mock__lb-row"><span>1. Alex P.</span><span style={{ fontWeight: 600 }}>95%</span></div>
                  <div className="coach-mock__lb-row"><span>2. Jordan R.</span><span style={{ fontWeight: 600 }}>92%</span></div>
                  <div className="coach-mock__lb-row"><span>3. You</span><span style={{ fontWeight: 600, color: SIGNAL }}>91%</span></div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Reps view */}
        {tab === "reps" && (
          <div className="coach-mock__panel">
            {[
              { n: "Alex P.",   market: "Greensboro",    deals: 9, score: 95 },
              { n: "Jordan R.", market: "High Point",    deals: 8, score: 92 },
              { n: "Maya C.",   market: "Winston-Salem", deals: 7, score: 89 },
              { n: "You",       market: "Charlotte",     deals: 6, score: 91 },
              { n: "Devin B.",  market: "Raleigh",       deals: 5, score: 86 }
            ].map(function(r, i) {
              return (
                <div key={r.n} className="coach-mock__rep-row">
                  <span className="coach-mock__rep-rank">{i + 1}</span>
                  <span className="coach-mock__rep-name">{r.n}</span>
                  <span className="coach-mock__rep-meta">{r.market}</span>
                  <span className="coach-mock__rep-meta">{r.deals} deals</span>
                  <span className="coach-mock__rep-score">{r.score}%</span>
                </div>
              );
            })}
          </div>
        )}

        {/* Coaching view */}
        {tab === "coaching" && (
          <div className="coach-mock__panel">
            <div className="coach-mock__card" style={{ marginBottom: 10 }}>
              <div className="coach-mock__card-title">Weekly Trend</div>
              <div className="coach-mock__spark" style={{ height: 56, marginTop: 8 }} />
              <div className="coach-mock__sub" style={{ marginTop: 6 }}>Coaching score: 87 → 92 over 6 weeks</div>
            </div>
            <div className="coach-mock__grid2">
              <div className="coach-mock__card"><div className="coach-mock__card-title">Sessions</div><div className="coach-mock__stat-value">14</div></div>
              <div className="coach-mock__card"><div className="coach-mock__card-title">Avg Score</div><div className="coach-mock__stat-value">92</div></div>
            </div>
          </div>
        )}

        {/* Roleplays view */}
        {tab === "roleplays" && (
          <div className="coach-mock__panel">
            {[
              { t: "Solar Presentation",    d: "Today",      s: 91 },
              { t: "Objection · Price",     d: "Yesterday",  s: 84 },
              { t: "Fiber Close",           d: "2 days ago", s: 88 },
              { t: "Security · Trial Close",d: "3 days ago", s: 79 }
            ].map(function(rp) {
              return (
                <div key={rp.t} className="coach-mock__rep-row">
                  <span className="coach-mock__rep-name">{rp.t}</span>
                  <span className="coach-mock__rep-meta">{rp.d}</span>
                  <span className="coach-mock__rep-score" style={{ color: rp.s >= 85 ? SIGNAL : INK }}>{rp.s}%</span>
                </div>
              );
            })}
          </div>
        )}

        {/* Reports, Tools, Leaderboard, Settings — light placeholders */}
        {(tab === "reports" || tab === "tools" || tab === "leader" || tab === "settings") && (
          <div className="coach-mock__panel coach-mock__panel--soft">
            <div className="coach-mock__card">
              <div className="coach-mock__card-title">
                {tab === "reports"  && "Weekly Rollup"}
                {tab === "tools"    && "Connected Tools"}
                {tab === "leader"   && "Top Markets"}
                {tab === "settings" && "Account"}
              </div>
              <div className="coach-mock__sub" style={{ marginTop: 8 }}>
                {tab === "reports"  && "Knocks · Conversations · Closes · Installs, exported daily."}
                {tab === "tools"    && "CRM · Routing · Messaging · Pay — all wired."}
                {tab === "leader"   && "Greensboro, High Point, Charlotte."}
                {tab === "settings" && "Territory, notifications, payout method."}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Small inline toolkit icons used inside the HFS Coach dashboard mockup
function CheckDot() {
  return (
    <span style={{ width: 18, height: 18, borderRadius: "50%", background: SIGNAL_SOFT, color: SIGNAL, display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="5 12 10 17 19 8"/></svg>
    </span>
  );
}

// Shared navy hero band for every non-home page so the whole site carries the
// same premium navy + gold energy as the landing page.
// Shared page hero — white/light band with navy headline, blue eyebrow,
// teal italic accent, and optional blue CTAs. Matches the new home style.
function PageHero(props) {
  var eyebrow = props.eyebrow;
  var title = props.title;
  var subtitle = props.subtitle;
  var accentWord = props.accentWord;     // optional — renders in italic teal if provided
  var actions = props.actions;           // optional ReactNode for CTAs
  return (
    <section className="page-hero-light">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 pt-16 md:pt-20 pb-14 md:pb-16">
        {eyebrow && (
          <div className="page-hero-light__eyebrow">{eyebrow}</div>
        )}
        <h1 className="page-hero-light__title">
          {title}
          {accentWord ? (
            <>
              {" "}
              <span className="page-hero-light__accent" style={{ ...serif }}>{accentWord}</span>
            </>
          ) : null}
        </h1>
        {subtitle && (
          <p className="page-hero-light__subtitle">{subtitle}</p>
        )}
        {actions && (
          <div className="page-hero-light__actions">{actions}</div>
        )}
      </div>
    </section>
  );
}

// Collapsible FAQ row — mockup style with + toggle
function FaqRow(props) {
  var _o = useState(!!props.defaultOpen); var open = _o[0]; var setOpen = _o[1];
  return (
    <div className="faq-item" data-open={open ? "true" : "false"}>
      <button type="button" className="faq-item__trigger" onClick={function() { setOpen(!open); }} aria-expanded={open}>
        <span>{props.q}</span>
        <span className="faq-item__toggle" aria-hidden="true">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M12 5 V19"/><path d="M5 12 H19"/></svg>
        </span>
      </button>
      <div className="faq-item__body">{props.a}</div>
    </div>
  );
}

// ── Homepage ───────────────────────────────────────────────────────────
function HomePage(props) {
  // Descriptors stay inside the scope /partners claims: in-home lead generation
  // and direct sales conversations — no testing, inspection, or install-speed claims.
  var services = [
    { kind: "fiber",    label: "Fiber Internet",   desc: "Launch-market door campaigns for regional fiber builds." },
    { kind: "security", label: "Home Security",    desc: "Consultative sales on the porch, not the phone." },
    { kind: "solar",    label: "Solar",            desc: "Qualified appointments for design-and-install partners." },
    { kind: "water",    label: "Water Filtration", desc: "In-home conversations for water-quality brands." },
    { kind: "roofing",  label: "Roofing",          desc: "Storm, replacement, and home-exterior campaigns." },
    { kind: "home",     label: "Home Services",    desc: "Adjacent offers your customers already ask us about." }
  ];
  // Every cell is a REAL number the site backs elsewhere (careers copy, FAQ,
  // service index) — big serif numerals invite scrutiny, so no padded non-metrics.
  var stats = [
    { label: "Markets launched",      value: "28+" },
    { label: "Service categories",    value: "6" },
    { label: "Top rep, year one",     value: "$150K+" },
    { label: "Paid certification",    value: "5-day" }
  ];
  var steps = [
    { num: "1", icon: "door",  title: "We knock every door.",      body: "Trained reps introduce your offer to the right homes at the right time." },
    { num: "2", icon: "shake", title: "We close with confidence.", body: "Our reps qualify, present, and close with clarity — backed by proven scripts and live support." },
    { num: "3", icon: "bar",   title: "You own the numbers.",      body: "Real-time reporting, verified leads, and appointments you can track from door to deal." }
  ];
  // The REAL portal features — this is the field app our team already runs on
  // at portal.homefrontsolutionsllc.com, not a concept.
  var coachModules = [
    { icon: "chart",  title: "Live territory map",    body: "Every lead pinned and statused — you always know the next door." },
    { icon: "chat",   title: "One-tap knock logging", body: "Outcomes, notes, and callbacks captured right at the door." },
    { icon: "mic",    title: "Today’s follow-ups",   body: "Scheduled callbacks sorted and ready each morning." },
    { icon: "trophy", title: "Weekly commissions",    body: "Your statement, your sales, your tier — no surprises on payday." }
  ];
  var cities = [
    { region: "Greensboro",     slug: "greensboro-nc" },
    { region: "High Point",     slug: "high-point-nc" },
    { region: "Winston-Salem",  slug: "winston-salem-nc" },
    { region: "Charlotte",      slug: "charlotte-nc" },
    { region: "Raleigh",        slug: "raleigh-nc" },
    { region: "Piedmont Triad", slug: "piedmont-triad-nc" }
  ];
  var values = [
    { icon: "shield", title: "Honest in-person service", body: "Real conversations. Real trust. That's how we build long-term customer relationships." },
    { icon: "house",  title: "Strong home-service offers", body: "We represent products people need and want — from internet to security, solar, and more." },
    { icon: "map",    title: "Locally rooted.\nNationally trusted.", body: "Local teams with national standards and support." },
    { icon: "badge",  title: "Trained. Certified. Supported.", body: "Our reps are trained to win and supported to grow." }
  ];
  // Rendered + schema'd from the same module-scope array (see HOME_PAGE_FAQS).
  var faqs = HOME_PAGE_FAQS;

  return (
    <>
      {/* ── HERO (white background, navy stat bar strip at bottom) ─── */}
      <section id="home-hero" className="home-hero">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 pt-10 md:pt-14 pb-0">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-6">
              <div className="mono-kicker word-reveal" style={{ marginBottom: 18 }}>
                Door-to-door growth partner · founded in the Carolinas
              </div>
              <h1 className="display" style={{ fontSize: "clamp(2.7rem, 5.6vw, 4.4rem)", lineHeight: 0.98, letterSpacing: "-0.035em", color: INK, maxWidth: "15ch" }}>
                <span className="word-reveal word-reveal--inline">Face-to-face sales</span>{" "}
                <span className="word-reveal word-reveal--inline" style={{ animationDelay: "120ms" }}>that grow</span>{" "}
                <span className="word-reveal word-reveal--inline" style={{ animationDelay: "240ms", color: "var(--signal)" }}>home service brands.</span>
              </h1>
              <p className="home-hero__lead word-reveal" style={{ animationDelay: "400ms" }}>
                Home service operators hire our field teams to launch new markets, scale installs, and keep the customers they win — one real conversation at a time.
              </p>
              <div className="mt-7 flex flex-col sm:flex-row gap-3 word-reveal" style={{ animationDelay: "480ms" }}>
                <Magnetic strength={0.2}>
                  <a
                    href="/careers"
                    onClick={function(e) { handleNavClick(e, props.go, "careers"); }}
                    className="btn-blue inline-flex items-center justify-center gap-2 px-7 rounded-[10px] font-medium"
                    style={{ cursor: "pointer", minHeight: 52, fontSize: 15 }}
                    aria-label="Join the Home Front Solutions team"
                  >
                    Join the Team
                  </a>
                </Magnetic>
                <Magnetic strength={0.2}>
                  <a
                    href={BOOKING_URL || "/contact"}
                    onClick={BOOKING_URL ? undefined : function(e) { handleNavClick(e, props.go, "contact"); }}
                    target={BOOKING_URL ? "_blank" : undefined}
                    rel={BOOKING_URL ? "noopener noreferrer" : undefined}
                    className="btn-outline inline-flex items-center justify-center gap-2 px-7 rounded-[10px] font-medium"
                    style={{ cursor: "pointer", minHeight: 52, fontSize: 15 }}
                    aria-label="Partner with Home Front Solutions"
                  >
                    Partner With Us
                  </a>
                </Magnetic>
              </div>
              <div className="hfx-trust word-reveal" style={{ animationDelay: "600ms" }}>
                Trusted by leading brands · <b>proven in communities nationwide</b>
              </div>
            </div>

            <div className="lg:col-span-6 word-reveal" style={{ animationDelay: "280ms" }}>
              <div className="home-hero__photo">
                <img
                  src="/rep-knock-1.jpg"
                  alt="Home Front Solutions rep knocking on a front door"
                  loading="eager"
                  decoding="async"
                  onError={function(e) {
                    e.currentTarget.style.display = "none";
                    e.currentTarget.parentElement.classList.add("home-hero__photo--fallback");
                  }}
                />
              </div>
            </div>
          </div>

          {/* Navy stat band seated at the bottom of the hero — editorial numerals */}
          <div className="hfx-stats reveal">
            {stats.map(function(s) {
              return (
                <div key={s.label} className="hfx-stats__cell">
                  <div className="hfx-stats__value">{s.value}</div>
                  <div className="hfx-stats__label">{s.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SERVICES WE REPRESENT — editorial index ───────────── */}
      <section style={{ background: PAPER }}>
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 pt-20 md:pt-24 pb-16 md:pb-20">
          <div className="hfx-head reveal">
            <div>
              <div className="hfx-head__kicker">What we sell</div>
              <h2 className="hfx-head__h">The brands we knock for.</h2>
            </div>
            <p className="hfx-head__sub">Every offer is vetted before a rep carries it to a door.</p>
          </div>
          <div className="hfx-index reveal" data-delay="1">
            {services.map(function(s, i) {
              return (
                <a
                  key={s.kind}
                  href="/what-we-do"
                  onClick={function(e) { handleNavClick(e, props.go, "what-we-do"); }}
                  className="hfx-index__row"
                >
                  <span className="hfx-index__num">{"0" + (i + 1)}</span>
                  <span className="hfx-index__name">{s.label}</span>
                  <span className="hfx-index__desc">{s.desc}</span>
                  <span className="hfx-index__arrow" aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12 H19"/><path d="M13 6 L19 12 L13 18"/></svg>
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── WHY FACE-TO-FACE STILL WINS — persuasion block ── */}
      <section style={{ background: PAPER }}>
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-20 md:py-24" style={{ borderTop: "1px solid " + RULE }}>
          <div className="hfx-head reveal">
            <div>
              <div className="hfx-head__kicker">Why the door</div>
              <h2 className="hfx-head__h">Why face-to-face still wins.</h2>
            </div>
            <p className="hfx-head__sub">
              Clicks and impressions don&rsquo;t install fiber, set alarms, or mount panels. People do — and the home is still the most personal purchase your customer makes.
            </p>
          </div>

          <div className="hfx-reasons reveal" data-delay="1">
            <article className="hfx-reason">
              <h3 className="hfx-reason__h">Trust moves faster in person.</h3>
              <p className="hfx-reason__p">Homeowners say yes to the neighbor on their porch before the ad in their feed. Our reps build that moment, one door at a time — in your colors, with your offer.</p>
            </article>
            <article className="hfx-reason">
              <h3 className="hfx-reason__h">Real objections, handled on the spot.</h3>
              <p className="hfx-reason__p">A price question, a contract concern, a roofline complication — a trained rep solves it in the conversation. A web form never will, and a call-center script rarely does.</p>
            </article>
            <article className="hfx-reason">
              <h3 className="hfx-reason__h">You pay for installs, not impressions.</h3>
              <p className="hfx-reason__p">We&rsquo;re measured on activations and retention, not vanity metrics. If the customer doesn&rsquo;t stay, neither does our fee. The incentives line up with yours.</p>
            </article>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────── */}
      <section style={{ background: PAPER }}>
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 pb-20 md:pb-24">
          <div className="hfx-head reveal">
            <div>
              <h2 className="hfx-head__h">The growth process.</h2>
            </div>
            <p className="hfx-head__sub">One market at a time, measured every day.</p>
          </div>
          <div className="hfx-steps reveal" data-delay="1">
            {steps.map(function(step) {
              return (
                <article key={step.num} className="hfx-step">
                  <span className="hfx-step__num" aria-hidden="true">{"0" + step.num}</span>
                  <h3 className="hfx-step__title">{step.title}</h3>
                  <p className="hfx-step__body">{step.body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── YOUR CAREER WITH HFS — recruiting-heavy section ─── */}
      <section className="career-band">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-20 md:py-24">
          <div className="hfx-head hfx-head--dark reveal">
            <div>
              <div className="hfx-head__kicker">For sales reps</div>
              <h2 className="hfx-head__h">Your career. Your earnings.</h2>
            </div>
            <p className="hfx-head__sub">
              Paid training, weekly commission, promotion from within. No politics, no favorites — hit the numbers and the next role opens.
            </p>
          </div>
          <div className="hfx-path reveal" data-delay="1">
            {[
              { tag: "Month 1", title: "Paid certification", body: "Six-module training before your first real door. Product knowledge, pitch mastery, objection handling, compliance.", earn: "Paid" },
              { tag: "Year 1",  title: "Field Rep",          body: "Own a territory. Weekly commission. Top producers clear $150K in year one.",                                    earn: "$80–150K+" },
              { tag: "Year 2",  title: "Team Lead",          body: "Promote from within. Build and coach a 4–6 rep team while keeping your own pipeline.",                          earn: "$150–250K" },
              { tag: "Year 3+", title: "Area Manager",       body: "Own the market. Own the P&L. Report directly to ownership.",                                                    earn: "$250K+" }
            ].map(function(step) {
              return (
                <article key={step.tag} className="hfx-path__row">
                  <div className="hfx-path__tag">{step.tag}</div>
                  <h3 className="hfx-path__role">{step.title}</h3>
                  <p className="hfx-path__body">{step.body}</p>
                  <div className="hfx-path__earn">{step.earn}</div>
                </article>
              );
            })}
          </div>
          <div className="reveal mt-10 flex flex-wrap items-center gap-x-8 gap-y-3" data-delay="2">
            <a
              href="/careers"
              onClick={function(e) { handleNavClick(e, props.go, "careers"); }}
              className="btn-blue inline-flex items-center gap-2 px-7 rounded-[10px] font-medium"
              style={{ minHeight: 52, fontSize: 15 }}
            >
              Apply in 5 minutes
              <span aria-hidden="true">→</span>
            </a>
            <span style={{ fontSize: 13.5, fontWeight: 500, color: "rgba(245,247,250,0.78)" }}>
              Weekly commission · paid certification · live + AI coaching
            </span>
          </div>
        </div>
      </section>

      {/* ── REP PORTAL — the real tool our field team runs on, on its own subdomain ── */}
      <section className="coach-panel">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-20 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-5 reveal">
            <div className="hfx-head__kicker">For our reps</div>
            <h2 className="hfx-head__h">The Rep Portal.</h2>
            <p className="mt-4 mb-2" style={{ fontSize: 15.5, color: MUTED, lineHeight: 1.7, maxWidth: "40ch" }}>
              The tool our field team runs on every day — territory map, knock logging, follow-ups, and weekly commission statements, all in one place.
            </p>
            <div className="mt-6">
              <a
                href={PORTAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-blue inline-flex items-center gap-2 px-6 rounded-[10px] font-medium"
                style={{ minHeight: 46, fontSize: 14 }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11 V7 A4 4 0 0 1 16 7 V11"/></svg>
                Open the Rep Portal
              </a>
            </div>
          </div>
          <div className="lg:col-span-7 reveal" data-delay="1">
            <div className="coach-modules">
              {coachModules.map(function(m) {
                return (
                  <div key={m.title} className="coach-module">
                    <span className="coach-module__i" aria-hidden="true"><CoachModuleIcon kind={m.icon} /></span>
                    <h3 className="coach-module__h">{m.title}</h3>
                    <p className="coach-module__p" dangerouslySetInnerHTML={{ __html: m.body }} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── REP STORIES — real quotes from the field ───────── */}
      <section style={{ background: PAPER }}>
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-20 md:py-24">
          <div className="hfx-head reveal">
            <div>
              <div className="hfx-head__kicker">From the field</div>
              <h2 className="hfx-head__h">Built by reps. Run by reps.</h2>
            </div>
            <p className="hfx-head__sub">Every lead and manager at HFS started on a porch. Here&rsquo;s what the team says.</p>
          </div>
          <div className="hfx-mosaic hfx-mosaic--simple reveal" data-delay="1">
            <figure className="hfx-tile hfx-tile--paper">
              <blockquote className="hfx-tile__quote">&ldquo;Came in with zero sales experience. Paid training made the difference — I was closing in my second week and promoted to team lead inside twelve months.&rdquo;</blockquote>
              <figcaption className="hfx-tile__who">
                <span className="hfx-tile__avatar" aria-hidden="true">AM</span>
                <div>
                  <div className="hfx-tile__name">Alex Martinez</div>
                  <div className="hfx-tile__meta">Team Lead · Charlotte, NC</div>
                </div>
                <span className="hfx-tile__earn">$184K yr 1</span>
              </figcaption>
            </figure>
            <figure className="hfx-tile hfx-tile--paper">
              <blockquote className="hfx-tile__quote">&ldquo;Every manager I work with actually knocks doors. There&rsquo;s no layer between me and the decision-makers. When I need help at 8pm, someone picks up.&rdquo;</blockquote>
              <figcaption className="hfx-tile__who">
                <span className="hfx-tile__avatar" aria-hidden="true">JT</span>
                <div>
                  <div className="hfx-tile__name">Jordan Thompson</div>
                  <div className="hfx-tile__meta">Field Rep · Greensboro, NC</div>
                </div>
              </figcaption>
            </figure>
            <figure className="hfx-tile hfx-tile--paper">
              <blockquote className="hfx-tile__quote">&ldquo;The portal tells me exactly which door is next and my commissions land every week without chasing anyone.&rdquo;</blockquote>
              <figcaption className="hfx-tile__who">
                <span className="hfx-tile__avatar" aria-hidden="true">MJ</span>
                <div>
                  <div className="hfx-tile__name">Maya Johnson</div>
                  <div className="hfx-tile__meta">Field Rep · Winston-Salem, NC</div>
                </div>
                <span className="hfx-tile__earn">$142K yr 1</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* ── WHERE WE HIRE — pill chips ───────────────────────── */}
      <section style={{ background: PAPER }}>
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-20 md:py-24">
          <div className="hfx-head reveal">
            <div>
              <h2 className="hfx-head__h">Where we hire.</h2>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 14, paddingBottom: 4 }}>
              <span className="hiring-badge" aria-label="Now hiring">
                <span className="hiring-badge__dot" aria-hidden="true" />
                Now hiring · {JOBS.length} open roles
              </span>
              <span className="hfx-head__sub" style={{ paddingBottom: 0 }}>Local teams with national standards. Apply in five minutes.</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 reveal" data-delay="1">
            {cities.map(function(c) {
              return (
                <a
                  key={c.slug}
                  href={getPathForRoute("market", c.slug)}
                  onClick={function(e) { handleNavClick(e, props.go, "market", c.slug); }}
                  className="city-pill"
                >
                  <span>{c.region}</span>
                </a>
              );
            })}
          </div>
          <div className="mt-8">
            <a
              href="/careers"
              onClick={function(e) { handleNavClick(e, props.go, "careers"); }}
              className="btn-outline-blue inline-flex items-center gap-2 px-6 rounded-[10px] font-medium"
              style={{ minHeight: 46, fontSize: 14 }}
            >
              View Open Positions
            </a>
          </div>
        </div>
      </section>


      {/* ── FAQ (2-column grid) ──────────────────────────────── */}
      <section style={{ background: PAPER }}>
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-20 md:py-24">
          <div className="hfx-head reveal">
            <div>
              <h2 className="hfx-head__h">Questions, answered.</h2>
            </div>
            <p className="hfx-head__sub">The six questions reps and partners ask before they say yes.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 reveal" data-delay="1">
            {faqs.map(function(f) {
              return <FaqRow2 key={f.q} q={f.q} a={f.a} />;
            })}
          </div>
        </div>
      </section>

      {/* ── DUAL CTA BAND (teal left, blue right) ────────────── */}
      <section style={{ background: PAPER }}>
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 pb-20 md:pb-24">
          <div className="hfx-cta reveal">
            {/* Reps get the dominant panel — consistent with the hero's primary CTA. */}
            <div className="hfx-cta__panel hfx-cta__panel--navy">
              <div className="hfx-cta__kicker">For future reps</div>
              <h3 className="hfx-cta__title">Earn like an owner, starting week one.</h3>
              <p className="hfx-cta__body">Paid certification, weekly commission, and a team that promotes from within. Most applications get a recruiter response within one business day.</p>
              <a
                href="/careers"
                onClick={function(e) { handleNavClick(e, props.go, "careers"); }}
                className="btn-white mt-6 inline-flex items-center gap-2 px-6 rounded-[10px] font-medium"
                style={{ minHeight: 46, fontSize: 14 }}
              >
                Apply in 5 minutes
                <span aria-hidden="true">→</span>
              </a>
            </div>
            <div className="hfx-cta__panel hfx-cta__panel--paper">
              <div className="hfx-cta__kicker">For operators</div>
              <h3 className="hfx-cta__title">Put a disciplined field team on your next market.</h3>
              <p className="hfx-cta__body">Scope a pilot in one 30-minute call.</p>
              <a
                href={BOOKING_URL || "/contact"}
                onClick={BOOKING_URL ? undefined : function(e) { handleNavClick(e, props.go, "contact"); }}
                target={BOOKING_URL ? "_blank" : undefined}
                rel={BOOKING_URL ? "noopener noreferrer" : undefined}
                className="btn-blue mt-6 inline-flex items-center gap-2 px-6 rounded-[10px] font-medium"
                style={{ minHeight: 46, fontSize: 14 }}
              >
                Book a discovery call
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function WhatWeDoPage(props) {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Last-mile customer"
        accentWord="acquisition."
        subtitle="Whether the category is fiber internet, home security, solar, water filtration, or roofing — none of it grows without disciplined customer acquisition. That is the work we do, in the field, market by market."
      />
      <section className="max-w-[1240px] mx-auto px-6 md:px-12 py-20 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
          {[
            { n: "01", t: "Territory mapping", d: "We build coverage plans by neighborhood, route, day, and rep so field activity is disciplined and measurable." },
            { n: "02", t: "Rep deployment", d: "Trained, badged, branded reps in your colors. Every rep finishes a six-module AI-powered certification before touching a door." },
            { n: "03", t: "Daily reporting", d: "Knocks, conversations, sits, closes, installs scheduled, installs activated. You see it every day. No black box." },
            { n: "04", t: "Install accountability", d: "Anyone can sell a deal. We are paid when the install happens. That keeps us focused on real customers, not signature counts." },
          ].map(function(item) {
            return (
              <div key={item.n}>
                <span className="text-xs" style={{ color: BLUE_PRIMARY, fontWeight: 700, letterSpacing: "0.1em" }}>{item.n}</span>
                <h2 className="mt-2 mb-3" style={{ ...serif, fontSize: 24, color: INK, letterSpacing: "-0.02em" }}>{item.t}</h2>
                <p className="text-sm leading-relaxed" style={{ color: MUTED }}>{item.d}</p>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}

function WhyUsPage(props) {
  var principles = [
    { t: "Independently owned", d: "One owner, accountable to the teams and the customers. Decisions happen fast and standards don't drift between markets." },
    { t: "Focused categories only", d: "Fiber, home security, solar, water filtration, roofing, and home services. Offers where clarity and trust actually matter at the doorstep." },
    { t: "Trained before they knock", d: "Every rep finishes a six-module certification before touching a real porch. Coaching continues in the field, every week." },
    { t: "Honest, in-person", d: "Branded attire, photo ID, clear answers. No pressure tactics, no surprise charges. Customers should understand exactly what they're buying." },
    { t: "Leadership from the field", d: "Every manager was promoted out of production. The people setting the standard have hit it themselves." },
    { t: "Here for the long run", d: "We staff for longevity, stay invested in the markets we serve, and plan to still be around when the short-game companies are gone." },
  ];

  return (
    <>
      <PageHero
        eyebrow="Why Home Front"
        title="The case for doing this work"
        accentWord="properly."
        subtitle="Door-to-door has a reputation problem. Most of it is earned. This is how we run the work differently — and why that shows up in the numbers, the reps, and the customer experience."
      />

      <section className="max-w-[1280px] mx-auto px-6 md:px-12 pt-16 md:pt-20 pb-24 md:pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-14">
          {principles.map(function(r, i) {
            return (
              <div key={r.t}>
                <div style={{ ...monoKicker, color: BLUE_PRIMARY, marginBottom: 14 }}>{String(i + 1).padStart(2, "0")}</div>
                <h3 className="mb-3" style={{ ...serif, fontSize: 24, lineHeight: 1.15, letterSpacing: "-0.022em", color: INK, fontWeight: 440 }}>{r.t}</h3>
                <p style={{ fontSize: 15, lineHeight: 1.72, color: MUTED }}>{r.d}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* How it works — 3 disciplines */}
      <section style={{ background: SURF, borderTop: "1px solid " + RULE, borderBottom: "1px solid " + RULE }}>
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-24 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end mb-14 reveal">
            <div className="lg:col-span-7">
              <div style={{ ...monoKicker, color: BLUE_PRIMARY, marginBottom: 18 }}>How we run it</div>
              <h2 className="display" style={{ fontSize: "clamp(2.1rem, 4.2vw, 3.1rem)", lineHeight: 1, letterSpacing: "-0.032em", color: INK }}>
                Three things, every day, the same way.
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p style={{ fontSize: 15, color: MUTED, lineHeight: 1.75 }}>
                The work breaks down into three clear parts. We invest in all three and we measure each one daily, so the signal stays visible to everyone.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background: RULE, border: "1px solid " + RULE, borderRadius: 20, overflow: "hidden" }}>
            {[
              { n: "01", t: "We knock the doors", d: "Trained, badged, branded reps work assigned neighborhoods. Six-module certification before anyone touches a real porch." },
              { n: "02", t: "We close the customer", d: "Qualify on the doorstep. Present clearly. Handle the objection. Book the install. We're paid on activations, not signatures, so the bar stays honest." },
              { n: "03", t: "You see the numbers", d: "Knocks, conversations, sits, closes, installs. Live dashboards, daily reporting. No black box, no monthly slide deck, no surprises." },
            ].map(function(item, i) {
              return (
                <div key={item.t} className="reveal" data-delay={i + 1} style={{ background: SURF, padding: "44px 36px" }}>
                  <div style={{ ...monoKicker, color: MUTED, marginBottom: 36 }}>{item.n}</div>
                  <h3 className="mb-4" style={{ ...serif, fontSize: 24, lineHeight: 1.15, letterSpacing: "-0.02em", color: INK, fontWeight: 440 }}>{item.t}</h3>
                  <p style={{ fontSize: 15, lineHeight: 1.75, color: MUTED }}>{item.d}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Training — 6-module */}
      <section className="max-w-[1280px] mx-auto px-6 md:px-12 py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-start">
          <div className="lg:col-span-6 reveal">
            <div style={{ ...monoKicker, color: BLUE_PRIMARY, marginBottom: 18 }}>How we train</div>
            <h2 className="display mb-6" style={{ fontSize: "clamp(2.1rem, 4.2vw, 3.1rem)", lineHeight: 1, letterSpacing: "-0.032em", color: INK }}>
              Reps practice on AI before they ever knock a real door.
            </h2>
            <p style={{ fontSize: 16, color: MUTED, lineHeight: 1.72, marginBottom: 20 }}>
              Most D2D companies hand new reps a script and push them out the door. We don't. Every Home Front rep runs the pitch through an AI coach that scores delivery, flags weak spots, and gives them something specific to fix.
            </p>
            <p style={{ fontSize: 16, color: MUTED, lineHeight: 1.72 }}>
              The result: sharper reps on day one and faster improvement every week after. It's why we can hire people with zero sales experience and have them earning commission inside two weeks.
            </p>
          </div>
          <div className="lg:col-span-6 reveal" data-delay="1">
            <div style={{ ...monoKicker, color: BLUE_PRIMARY, marginBottom: 22 }}>Six-module certification</div>
            <ol className="space-y-0" style={{ borderTop: "1px solid " + RULE, listStyle: "none", margin: 0, padding: 0 }}>
              {[
                ["The product", "Offer basics, who it's for, pricing, and install flow."],
                ["The pitch", "Openers, value framing, and qualifying questions that actually work on a porch."],
                ["Objection handling", "The twelve most common homeowner objections, and what to say back."],
                ["Compliance", "What you can and can't say. Brand standards. Customer privacy."],
                ["Field simulation", "Live AI roleplay scored on tone, pace, and structure."],
                ["Tools and CRM", "How to log activity, book installs, and track your own numbers."],
              ].map(function(item, i) {
                return (
                  <li key={item[0]} className="grid items-start" style={{ gridTemplateColumns: "44px minmax(0,1fr)", gap: 20, padding: "20px 0", borderBottom: "1px solid " + RULE }}>
                    <span style={{ ...monoKicker, color: BLUE_PRIMARY }}>{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <div style={{ ...serif, fontSize: 18, letterSpacing: "-0.015em", color: INK, fontWeight: 440 }}>{item[0]}</div>
                      <div className="mt-1.5" style={{ fontSize: 13.5, lineHeight: 1.6, color: MUTED }}>{item[1]}</div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-[1280px] mx-auto px-6 md:px-12 py-24 md:py-32" style={{ borderTop: "1px solid " + RULE }}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-4 reveal">
            <div style={{ ...monoKicker, color: BLUE_PRIMARY, marginBottom: 18 }}>Frequently asked</div>
            <h2 className="display" style={{ fontSize: "clamp(2rem, 3.8vw, 2.85rem)", lineHeight: 1.02, letterSpacing: "-0.03em", color: INK }}>
              Real questions, straight answers.
            </h2>
            <p className="mt-5" style={{ fontSize: 15, color: MUTED, lineHeight: 1.72 }}>
              If something's missing, ask when we talk.
            </p>
          </div>
          <div className="lg:col-span-8 reveal" data-delay="1" style={{ borderTop: "1px solid " + RULE }}>
            {HOME_FAQS.map(function(item, i) {
              return (
                <div key={item.q} className="grid items-start" style={{ gridTemplateColumns: "44px minmax(0,1fr)", gap: 24, padding: "28px 0", borderBottom: "1px solid " + RULE }}>
                  <span style={{ ...monoKicker, color: BLUE_PRIMARY }}>{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="mb-3" style={{ ...serif, fontSize: "clamp(1.225rem, 2vw, 1.5rem)", lineHeight: 1.18, color: INK, letterSpacing: "-0.018em", fontWeight: 440 }}>{item.q}</h3>
                    <p style={{ fontSize: 15, color: MUTED, lineHeight: 1.72 }}>{item.a}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

function PartnersPage(props) {
  var partnerData = [
    { name: "Fiber Internet", desc: "Neighborhood-based customer acquisition for broadband and telecom providers that need disciplined field growth." },
    { name: "Home Security", desc: "Direct-to-homeowner campaigns for monitored security, smart-home bundles, and protection offers." },
    { name: "Solar", desc: "Field sales support for solar teams that need face-to-face education, qualification, and appointment generation." },
    { name: "Water Filtration", desc: "In-home lead generation and direct sales conversations for water treatment and filtration solutions." },
    { name: "Roofing", desc: "Storm, replacement, and home-exterior campaigns where trust, clarity, and neighborhood presence matter." },
    { name: "Home Services", desc: "Additional residential categories where strong field operators can create demand and close business in person." },
  ];

  return (
    <>
      <PageHero
        eyebrow="Partners"
        title="Built for home-service"
        accentWord="categories that win."
        subtitle="We are selective about the categories and campaigns we support. Every offer has to be clear, defensible, and strong enough for a professional field team to stand behind."
      />
      <section className="max-w-[1240px] mx-auto px-6 md:px-12 py-20 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2" style={{ border: "1px solid " + RULE, borderRadius: 16, overflow: "hidden" }}>
          {partnerData.map(function(p, i) {
            return (
              <div key={p.name} className="p-8 md:p-10" style={{ borderRight: (i % 2 === 0) ? "1px solid " + RULE : "none", borderBottom: i < partnerData.length - 2 ? "1px solid " + RULE : "none", background: SURF }}>
                <h2 className="mb-3" style={{ ...serif, fontSize: 24, color: INK, letterSpacing: "-0.02em" }}>{p.name}</h2>
                <p className="text-sm leading-relaxed" style={{ color: MUTED }}>{p.desc}</p>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}

// ─── CAREERS PAGE ─────────────────────────────
function CareersIndexPage(props) {
  return (
    <>
      <PageHero
        eyebrow={"Careers · " + JOBS.length + " open roles"}
        title="A real career in field sales."
        accentWord="Built in, not bolted on."
        subtitle="Uncapped commission. Paid certification before your first door. A clear path from rep to team lead to area manager. Experience helps — we hire for drive."
        actions={
          <>
            <a
              href="#open-positions"
              onClick={function(e) { e.preventDefault(); var el = document.getElementById("open-positions"); if (el) el.scrollIntoView({ behavior: "smooth", block: "start" }); }}
              className="btn-blue inline-flex items-center gap-2 px-6 rounded-[10px] font-medium"
              style={{ minHeight: 48, fontSize: 14 }}
            >
              See open roles
              <span aria-hidden="true">→</span>
            </a>
            <a
              href={BOOKING_URL || "/contact"}
              onClick={BOOKING_URL ? undefined : function(e) { handleNavClick(e, props.go, "contact"); }}
              target={BOOKING_URL ? "_blank" : undefined}
              rel={BOOKING_URL ? "noopener noreferrer" : undefined}
              className="btn-outline inline-flex items-center gap-2 px-6 rounded-[10px] font-medium"
              style={{ minHeight: 48, fontSize: 14 }}
            >
              Talk to us
            </a>
          </>
        }
      />

      {/* Stats strip + founder quote (below navy hero) */}
      <section className="max-w-[1280px] mx-auto px-6 md:px-12 pt-16 md:pt-20 pb-16 md:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-7 reveal">
            <div className="grid grid-cols-3 gap-x-10" style={{ borderTop: "1px solid " + RULE, paddingTop: 32, maxWidth: 680 }}>
              {[
                { k: "$100K+", label: "First-year earnings" },
                { k: "Paid", label: "Six-module training" },
                { k: "Fast", label: "Promotion from within" },
              ].map(function(item) {
                return (
                  <div key={item.label}>
                    <div className="display" style={{ fontSize: "clamp(1.5rem, 2.3vw, 1.9rem)", lineHeight: 1, color: INK, fontWeight: 500, letterSpacing: "-0.025em" }}>{item.k}</div>
                    <div className="mt-3" style={{ ...monoKicker, color: MUTED }}>{item.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
          <aside className="lg:col-span-5 reveal" data-delay="1">
            <figure style={{ background: SURF, border: "1px solid " + RULE, borderRadius: 20, padding: 32 }}>
              <div style={{ ...monoKicker, color: BLUE_PRIMARY, marginBottom: 22 }}>From the founder</div>
              <blockquote style={{ ...serif, fontSize: 19, lineHeight: 1.4, color: INK, letterSpacing: "-0.015em", fontWeight: 420, margin: 0 }}>
                We hire for character first, experience second. Show up, stay coachable, treat people with respect. We'll handle the training, the territory, and the support.
              </blockquote>
              <figcaption className="mt-6 pt-5 flex items-center gap-3" style={{ borderTop: "1px solid " + RULE }}>
                <span aria-hidden="true" style={{ width: 34, height: 34, borderRadius: "50%", background: "linear-gradient(135deg," + BLUE_PRIMARY + " 0%," + INK + " 100%)", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "#F5F1E7", ...serif, fontSize: 13, fontWeight: 500 }}>MM</span>
                <span>
                  <span className="block" style={{ fontSize: 13, color: INK, fontWeight: 600 }}>Muizz Muhammad</span>
                  <span className="block" style={{ fontSize: 12, color: MUTED, marginTop: 2 }}>Founder</span>
                </span>
              </figcaption>
            </figure>
          </aside>
        </div>
      </section>

      {/* Open positions — editorial table */}
      <section id="open-positions" style={{ background: SURF, borderTop: "1px solid " + RULE, borderBottom: "1px solid " + RULE }}>
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-20 md:py-24">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-12 reveal">
            <div>
              <div style={{ ...monoKicker, color: BLUE_PRIMARY, marginBottom: 16 }}>Open positions · {JOBS.length} roles</div>
              <h2 className="display" style={{ fontSize: "clamp(2rem, 3.8vw, 2.85rem)", lineHeight: 1.02, letterSpacing: "-0.03em", color: INK }}>
                Currently hiring.
              </h2>
            </div>
          </div>

          <ol className="reveal" data-delay="1" style={{ borderTop: "1px solid " + RULE, listStyle: "none", margin: 0, padding: 0 }}>
            {JOBS.map(function(job, i) {
              return (
                <li key={job.slug} className="job-row" style={{ borderBottom: "1px solid " + RULE, transition: "background-color 260ms ease, padding-left 260ms ease" }} onMouseEnter={function(e) { e.currentTarget.style.paddingLeft = "12px"; }} onMouseLeave={function(e) { e.currentTarget.style.paddingLeft = "0"; }}>
                  <div className="grid items-center gap-6 md:gap-10" style={{ gridTemplateColumns: "44px minmax(0,1fr) auto", padding: "28px 8px" }}>
                    <span style={{ ...monoKicker, color: MUTED }}>{String(i + 1).padStart(2, "0")}</span>
                    <div className="min-w-0">
                      <h3 className="mb-1.5" style={{ ...serif, fontSize: "clamp(1.325rem, 2.1vw, 1.65rem)", lineHeight: 1.12, color: INK, letterSpacing: "-0.02em", fontWeight: 440 }}>
                        <a href={getPathForRoute("job", job.slug)} onClick={function(e) { handleNavClick(e, props.go, "job", job.slug); }} style={{ color: INK }}>{job.title}</a>
                      </h3>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1" style={{ fontSize: 13, color: MUTED }}>
                        <span>{job.location}</span>
                        <span>·</span>
                        <span>{job.type}</span>
                        <span>·</span>
                        <span style={{ color: BLUE_DEEP, fontWeight: 600 }}>{job.earningRange}/yr</span>
                      </div>
                      <p className="mt-3 max-w-2xl hidden md:block" style={{ fontSize: 14, color: MUTED, lineHeight: 1.65 }}>{job.pitch}</p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <a
                        href={getPathForRoute("job", job.slug)}
                        onClick={function(e) { handleNavClick(e, props.go, "job", job.slug); }}
                        className="inline-flex items-center justify-center px-5 rounded-[10px] text-sm font-medium transition-colors"
                        style={{ background: "transparent", color: INK, border: "1px solid " + RULE, minHeight: 44, whiteSpace: "nowrap" }}
                      >
                        View role
                      </a>
                      <a
                        href={getPathForRoute("apply", job.slug)}
                        onClick={function(e) { handleNavClick(e, props.go, "apply", job.slug); }}
                        className="inline-flex items-center justify-center gap-1.5 px-5 rounded-[10px] text-sm font-medium transition-all"
                        style={{ background: SIGNAL, color: "#FFFFFF", border: "none", cursor: "pointer", minHeight: 44, whiteSpace: "nowrap", boxShadow: "0 6px 18px rgba(46,109,92,0.3)" }}
                        onMouseEnter={function(e) { e.currentTarget.style.background = SIGNAL_DEEP; }}
                        onMouseLeave={function(e) { e.currentTarget.style.background = SIGNAL; }}
                      >
                        Apply
                        <span aria-hidden="true">→</span>
                      </a>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section className="max-w-[1280px] mx-auto px-6 md:px-12 py-20 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end mb-12 reveal">
          <div className="lg:col-span-7">
            <div style={{ ...monoKicker, color: MUTED, marginBottom: 16 }}>Markets</div>
            <h2 className="display" style={{ fontSize: "clamp(2rem, 3.8vw, 2.85rem)", lineHeight: 1.02, letterSpacing: "-0.03em", color: INK }}>
              City-specific pages built for local applicants.
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p style={{ fontSize: 15, color: MUTED, lineHeight: 1.72 }}>
              Each market page frames what's open locally, where recruiting is moving, and how quickly the field is growing.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-0 reveal" data-delay="1" style={{ border: "1px solid " + RULE, borderRadius: 20, overflow: "hidden" }}>
          {MARKET_PAGES.map(function(market, i) {
            var rightBorder = (i + 1) % 3 !== 0 && (i + 1) % 2 !== 0;
            return (
              <a
                key={market.slug}
                href={getPathForRoute("market", market.slug)}
                onClick={function(e) { handleNavClick(e, props.go, "market", market.slug); }}
                className="group block"
                style={{
                  background: SURF,
                  padding: "28px 28px 32px",
                  borderRight: "1px solid " + RULE,
                  borderBottom: "1px solid " + RULE,
                  transition: "background 260ms ease"
                }}
                onMouseEnter={function(e) { e.currentTarget.style.background = "rgba(14,14,12,0.02)"; }}
                onMouseLeave={function(e) { e.currentTarget.style.background = SURF; }}
              >
                <div className="flex items-center justify-between mb-8">
                  <span style={{ ...monoKicker, color: BLUE_PRIMARY }}>{String(i + 1).padStart(2, "0")} / {market.region}</span>
                  <span aria-hidden="true" style={{ fontSize: 16, color: MUTED, transition: "transform 260ms ease", display: "inline-block" }}>→</span>
                </div>
                <h3 className="mb-3" style={{ ...serif, fontSize: 22, lineHeight: 1.14, letterSpacing: "-0.018em", color: INK, fontWeight: 440 }}>{market.headline || market.region}</h3>
                <p style={{ fontSize: 14, color: MUTED, lineHeight: 1.68 }}>{market.intro}</p>
              </a>
            );
          })}
        </div>
      </section>

      <section className="max-w-[1240px] mx-auto px-5 md:px-10 pb-20 md:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          <div className="lg:col-span-7">
            <Eyebrow>Where We Hire</Eyebrow>
            <h2 className="max-w-3xl mb-6" style={{ ...serif, fontSize: "clamp(1.9rem, 3.5vw, 2.7rem)", lineHeight: 1.05 }}>
              Local pages for the North Carolina markets people actually search.
            </h2>
            <p className="max-w-2xl text-sm md:text-[15px] leading-[1.9]" style={{ color: MUTED }}>
              Instead of forcing every applicant into one generic careers page, Home Front Solutions now has market-focused entry points for Greensboro, High Point, Winston-Salem, Piedmont Triad, Lexington, Charlotte, and Raleigh. That improves clarity for applicants and gives search engines cleaner local relevance.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {MARKET_PAGES.map(function(market) {
                return (
                  <a
                    key={market.slug}
                    href={getPathForRoute("market", market.slug)}
                    onClick={function(e) { handleNavClick(e, props.go, "market", market.slug); }}
                    className="inline-flex items-center px-4 py-2 rounded-[10px] text-sm font-semibold"
                    style={{ background: "#fff", border: "1px solid " + RULE, color: INK, cursor: "pointer" }}
                  >
                    {market.region}
                  </a>
                );
              })}
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="p-6 md:p-7" style={{ background: SURF2, border: "1px solid " + RULE, borderRadius: 20 }}>
              <Eyebrow>Common Questions</Eyebrow>
              <div className="space-y-5">
                {[
                  {
                    q: "How are these roles structured?",
                    a: "Current Home Front Solutions field sales roles are performance-based opportunities built around production, coaching, and real field accountability."
                  },
                  {
                    q: "How quickly do you respond?",
                    a: "Qualified applicants typically hear back within 48 hours."
                  },
                  {
                    q: "Do I need sales experience to apply?",
                    a: "Not always. Some roles are open to coachable applicants without prior sales experience, and training is provided."
                  }
                ].map(function(item) {
                  return (
                    <div key={item.q} style={{ borderTop: "1px solid " + RULE, paddingTop: 16 }}>
                      <h3 className="mb-2" style={{ ...serif, fontSize: 21, lineHeight: 1.12 }}>{item.q}</h3>
                      <p className="text-sm leading-[1.8]" style={{ color: MUTED }}>{item.a}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT WE OFFER */}
      <section className="max-w-[1240px] mx-auto px-5 md:px-10 py-20 md:py-28">
        <Eyebrow>What We Offer</Eyebrow>
        <h2 className="max-w-3xl mb-14" style={{ ...serif, fontSize: "clamp(1.875rem, 3.5vw, 2.5rem)", lineHeight: 1.05 }}>
          Real compensation. AI-powered training. A clear path to leadership.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10">
          {[
            { t: "Uncapped commission", d: "Paid weekly via direct deposit. No cap. No quota games. You earn what you close." },
            { t: "AI-powered training", d: "Practice the pitch with an AI coach that scores your delivery and gives personalized feedback." },
            { t: "Premium products", d: "Sell around high-interest categories and major names including AT&T Fiber, T-Mobile Fiber, Astound, Brightspeed, Frontier, Google Fiber, Lumos, MetroNet, GoNetspeed, and Starlink." },
            { t: "Six-module certification", d: "Complete training before you ever knock a real door. Time is paid." },
            { t: "Local territory", d: "Work in your local market. No overnight travel. Sleep in your own bed every night." },
            { t: "Promotion from within", d: "Clear path from Rep to Team Lead to Area Manager. We promote our own." },
          ].map(function(item) {
            return (
              <div key={item.t}>
                <div className="mb-3" style={{ width: 24, height: 2, background: SIGNAL }} />
                <h3 className="mb-2" style={{ ...serif, fontSize: 18 }}>{item.t}</h3>
                <p className="text-sm leading-relaxed" style={{ color: MUTED }}>{item.d}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* HIRING PROCESS */}
      <section style={{ background: SURF2, borderTop: "1px solid " + RULE, borderBottom: "1px solid " + RULE }}>
        <div className="max-w-[1240px] mx-auto px-5 md:px-10 py-20 md:py-28">
          <Eyebrow>How We Hire</Eyebrow>
          <h2 className="max-w-3xl mb-14" style={{ ...serif, fontSize: "clamp(1.875rem, 3.5vw, 2.5rem)", lineHeight: 1.05 }}>
            Four steps. Two weeks. First day in the field.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-px" style={{ background: RULE, border: "1px solid " + RULE }}>
            {[
              { n: "01", t: "Apply", d: "Submit your application in 5 minutes." },
              { n: "02", t: "Phone Screen", d: "10-minute call with our team within 48 hours." },
              { n: "03", t: "Interview", d: "In-person interview plus a half-day field ride-along." },
              { n: "04", t: "Onboarding", d: "Complete the certification and start in your territory." },
            ].map(function(step) {
              return (
                <div key={step.n} className="p-8" style={{ background: PAPER }}>
                  <div className="text-xs mb-4" style={{ color: SIGNAL, fontWeight: 700, letterSpacing: "0.05em" }}>{step.n}</div>
                  <h3 className="mb-2" style={{ ...serif, fontSize: 20 }}>{step.t}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: MUTED }}>{step.d}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="max-w-[1240px] mx-auto px-5 md:px-10 py-20 md:py-28 text-center">
        <h2 className="max-w-2xl mx-auto mb-6" style={{ ...serif, fontSize: "clamp(1.875rem, 3.5vw, 2.5rem)", lineHeight: 1.05 }}>
          Ready to apply?
        </h2>
        <p className="text-base leading-relaxed max-w-xl mx-auto mb-10" style={{ color: MUTED }}>
          Choose the position that fits your market and apply in under 5 minutes.
        </p>
        <a href="#open-positions" onClick={function(e) { e.preventDefault(); var el = document.getElementById("open-positions"); if (el) el.scrollIntoView({ behavior: "smooth", block: "start" }); }} className="inline-flex items-center px-7 py-4 rounded-md font-semibold hover:opacity-90 transition-opacity" style={{ background: SIGNAL, color: PAPER, border: "none", cursor: "pointer", textDecoration: "none", boxShadow: "0 18px 36px rgba(59,93,124,0.18)" }}>
          View Open Positions ↑
        </a>
      </section>
    </>
  );
}

function JobDetailPage(props) {
  var job = JOBS.find(function(j) { return j.slug === props.slug; });
  if (!job) {
    return (
      <section className="max-w-[1180px] mx-auto px-5 md:px-10 py-32 text-center">
        <h1 className="mb-4" style={{ ...serif, fontSize: 36 }}>Position not found</h1>
        <a href="/careers" onClick={function(e) { handleNavClick(e, props.go, "careers"); }} style={{ color: SIGNAL, cursor: "pointer" }}>← View all open positions</a>
      </section>
    );
  }

  var relatedArticles = getJobArticleSlugs(job).map(function(slug) {
    return ARTICLE_PAGES.find(function(article) { return article.slug === slug; });
  }).filter(Boolean);

  return (
    <>
      <nav aria-label="Breadcrumb" style={{ borderBottom: "1px solid " + RULE }}>
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-4 flex items-center gap-2" style={{ ...monoKicker, color: MUTED }}>
          <a href="/" onClick={function(e) { handleNavClick(e, props.go, "home"); }} style={{ cursor: "pointer", color: "inherit" }}>Home</a>
          <span style={{ opacity: 0.5 }}>/</span>
          <a href="/careers" onClick={function(e) { handleNavClick(e, props.go, "careers"); }} style={{ cursor: "pointer", color: "inherit" }}>Careers</a>
          <span style={{ opacity: 0.5 }}>/</span>
          <span style={{ color: INK }}>{job.title}</span>
        </div>
      </nav>

      <section className="max-w-[1280px] mx-auto px-6 md:px-12 pt-16 md:pt-24 pb-12 md:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          <div className="lg:col-span-8 reveal">
            <div style={{ ...monoKicker, color: BLUE_PRIMARY, marginBottom: 20 }}>{job.location} · {job.type}</div>
            <h1 className="display mb-6" style={{ fontSize: "clamp(2.6rem, 5.5vw, 4.5rem)", lineHeight: 0.96, letterSpacing: "-0.038em", color: INK }}>{job.title}</h1>
            <p className="max-w-3xl" style={{ fontSize: "clamp(1.05rem, 1.3vw, 1.18rem)", color: MUTED, lineHeight: 1.62 }}>
              {job.pitch} Built for people who want real upside, real territory responsibility, and a clean path into leadership if they can produce.
            </p>
            <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-8" style={{ borderTop: "1px solid " + RULE, paddingTop: 28 }}>
              {[
                { label: "Location", value: job.location },
                { label: "Type", value: job.type },
                { label: "Earnings", value: job.earningRange + "/yr" },
                { label: "Posted", value: job.posted }
              ].map(function(item) {
                return (
                  <div key={item.label}>
                    <div style={{ ...monoKicker, color: MUTED, marginBottom: 8 }}>{item.label}</div>
                    <div style={{ ...serif, fontSize: 17, lineHeight: 1.25, letterSpacing: "-0.015em", color: INK, fontWeight: 440 }}>{item.value}</div>
                  </div>
                );
              })}
            </div>
          </div>
          <aside className="lg:col-span-4 reveal" data-delay="1">
            <div className="relative overflow-hidden" style={{ background: SIGNAL_DEEP, color: "#F5F1E7", borderRadius: 20, padding: 28 }}>
              <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "radial-gradient(520px 300px at 80% 0%, rgba(143,176,155,0.28), transparent 60%), radial-gradient(420px 240px at 10% 100%, rgba(217,166,60,0.18), transparent 60%)" }} />
              <div aria-hidden="true" style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, " + BLUE_PRIMARY + ", " + BLUE_DEEP + ")" }} />
              <div className="relative">
                <div style={{ ...monoKicker, color: SAGE, marginBottom: 24 }}>The role, plainly</div>
                <blockquote style={{ ...serif, fontSize: 22, lineHeight: 1.25, letterSpacing: "-0.018em", color: "#F5F1E7", fontWeight: 420, margin: 0 }}>
                  Real product. Straight commission. Leadership that actually shows up in the field with you.
                </blockquote>
                <a href={getPathForRoute("apply", job.slug)} onClick={function(e) { handleNavClick(e, props.go, "apply", job.slug); }} className="btn-blue mt-8 w-full inline-flex items-center justify-center gap-2 px-7 rounded-[10px] font-medium" style={{ minHeight: 52, fontSize: 15 }}>
                  Apply for this role
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="max-w-[1280px] mx-auto px-6 md:px-12 pb-20 md:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-8 reveal">
            <div style={{ borderTop: "1px solid " + RULE, paddingTop: 36 }}>
              <div style={{ ...monoKicker, color: MUTED, marginBottom: 14 }}>About the role</div>
              <p style={{ fontSize: 17, lineHeight: 1.72, color: INK, fontWeight: 400 }}>{job.overview}</p>
            </div>

            <div className="mt-16" style={{ borderTop: "1px solid " + RULE, paddingTop: 36 }}>
              <div style={{ ...monoKicker, color: MUTED, marginBottom: 22 }}>What you'll do</div>
              <ul className="m-0 p-0" style={{ listStyle: "none" }}>
                {job.responsibilities.map(function(item, i) {
                  return (
                    <li key={i} className="grid items-start gap-5" style={{ gridTemplateColumns: "40px minmax(0,1fr)", padding: "16px 0", borderBottom: i === job.responsibilities.length - 1 ? "none" : "1px solid " + RULE }}>
                      <span style={{ ...monoKicker, color: BLUE_PRIMARY }}>{String(i + 1).padStart(2, "0")}</span>
                      <span style={{ fontSize: 15.5, lineHeight: 1.65, color: INK }}>{item}</span>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="mt-16" style={{ borderTop: "1px solid " + RULE, paddingTop: 36 }}>
              <div style={{ ...monoKicker, color: MUTED, marginBottom: 22 }}>What we're looking for</div>
              <ul className="m-0 p-0" style={{ listStyle: "none" }}>
                {job.qualifications.map(function(item, i) {
                  return (
                    <li key={i} className="grid items-start gap-5" style={{ gridTemplateColumns: "40px minmax(0,1fr)", padding: "16px 0", borderBottom: i === job.qualifications.length - 1 ? "none" : "1px solid " + RULE }}>
                      <span style={{ ...monoKicker, color: BLUE_PRIMARY }}>{String(i + 1).padStart(2, "0")}</span>
                      <span style={{ fontSize: 15.5, lineHeight: 1.65, color: INK }}>{item}</span>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="mt-16" style={{ borderTop: "1px solid " + RULE, paddingTop: 36 }}>
              <div style={{ ...monoKicker, color: MUTED, marginBottom: 22 }}>What you get</div>
              <ul className="m-0 p-0" style={{ listStyle: "none" }}>
                {job.benefits.map(function(item, i) {
                  return (
                    <li key={i} className="grid items-start gap-5" style={{ gridTemplateColumns: "40px minmax(0,1fr)", padding: "16px 0", borderBottom: i === job.benefits.length - 1 ? "none" : "1px solid " + RULE }}>
                      <span style={{ ...monoKicker, color: BLUE_PRIMARY }}>{String(i + 1).padStart(2, "0")}</span>
                      <span style={{ fontSize: 15.5, lineHeight: 1.65, color: INK }}>{item}</span>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="mt-16" style={{ borderTop: "1px solid " + RULE, paddingTop: 36 }}>
              <div style={{ ...monoKicker, color: MUTED, marginBottom: 14 }}>About Home Front Solutions</div>
              <p className="mb-5" style={{ fontSize: 16, lineHeight: 1.72, color: INK }}>
                Home Front Solutions is a door-to-door marketing company built around major fiber and connectivity categories, including AT&amp;T Fiber, T-Mobile Fiber, Astound, Brightspeed, Frontier, Google Fiber, Lumos, MetroNet, GoNetspeed, Starlink, and other high-interest provider searches. We hire and train professional field sales representatives in markets across the country.
              </p>
              <p style={{ fontSize: 14, lineHeight: 1.72, color: MUTED }}>
                We are an Equal Opportunity Employer.
              </p>
            </div>

            <div className="mt-12">
              <a href={getPathForRoute("apply", job.slug)} onClick={function(e) { handleNavClick(e, props.go, "apply", job.slug); }} className="inline-flex items-center gap-2 px-7 rounded-[10px] font-medium transition-all" style={{ background: SIGNAL, color: "#FFFFFF", border: "none", cursor: "pointer", minHeight: 54, fontSize: 15, boxShadow: "0 12px 28px rgba(46,109,92,0.32)" }}>
                Apply for this position
                <span aria-hidden="true">→</span>
              </a>
            </div>

            <div className="mt-16" style={{ borderTop: "1px solid " + RULE, paddingTop: 36 }}>
              <div style={{ ...monoKicker, color: MUTED, marginBottom: 14 }}>Explore related markets</div>
              <h2 className="mb-5" style={{ ...serif, fontSize: 24, lineHeight: 1.15, letterSpacing: "-0.02em", color: INK, fontWeight: 440 }}>Applicants often search by city before title.</h2>
              <div className="flex flex-wrap gap-2">
                {MARKET_PAGES.map(function(market) {
                  return (
                    <a
                      key={market.slug}
                      href={getPathForRoute("market", market.slug)}
                      onClick={function(e) { handleNavClick(e, props.go, "market", market.slug); }}
                      className="inline-flex items-center px-4 rounded-[10px] text-sm font-medium transition-colors"
                      style={{ background: "transparent", border: "1px solid rgba(14,14,12,0.16)", color: INK, cursor: "pointer", minHeight: 40 }}
                      onMouseEnter={function(e) { e.currentTarget.style.background = "rgba(14,14,12,0.04)"; }}
                      onMouseLeave={function(e) { e.currentTarget.style.background = "transparent"; }}
                    >
                      {market.region}
                    </a>
                  );
                })}
              </div>
            </div>

            <div className="mt-16" style={{ borderTop: "1px solid " + RULE, paddingTop: 36 }}>
              <div style={{ ...monoKicker, color: MUTED, marginBottom: 22 }}>Related reading</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {relatedArticles.map(function(article, i) {
                  return (
                    <a
                      key={article.slug}
                      href={getPathForRoute("article", article.slug)}
                      onClick={function(e) { handleNavClick(e, props.go, "article", article.slug); }}
                      className="block"
                      style={{ background: SURF, border: "1px solid " + RULE, borderRadius: 16, padding: 22, transition: "transform 360ms ease, border-color 260ms ease" }}
                      onMouseEnter={function(e) { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.borderColor = "rgba(14,14,12,0.18)"; }}
                      onMouseLeave={function(e) { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = RULE; }}
                    >
                      <div style={{ ...monoKicker, color: BLUE_PRIMARY, marginBottom: 14 }}>{article.eyebrow}</div>
                      <div style={{ ...serif, fontSize: 19, lineHeight: 1.18, letterSpacing: "-0.018em", color: INK, fontWeight: 440 }}>{article.title}</div>
                      <p className="mt-3" style={{ fontSize: 13.5, color: MUTED, lineHeight: 1.65 }}>{article.description}</p>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <div style={{ borderTop: "1px solid " + RULE, paddingTop: 36 }}>
                <div style={{ ...monoKicker, color: BLUE_PRIMARY, marginBottom: 14 }}>Apply</div>
                <h3 className="mb-4" style={{ ...serif, fontSize: 24, lineHeight: 1.15, letterSpacing: "-0.02em", color: INK, fontWeight: 440 }}>Ready to join the team?</h3>
                <p style={{ fontSize: 14.5, color: MUTED, lineHeight: 1.68, marginBottom: 24 }}>Application takes about 5 minutes. We respond within 48 hours with direct next steps if there's a fit.</p>
                <a href={getPathForRoute("apply", job.slug)} onClick={function(e) { handleNavClick(e, props.go, "apply", job.slug); }} className="w-full inline-flex items-center justify-center gap-2 px-5 rounded-[10px] font-medium transition-all" style={{ background: SIGNAL, color: "#FFFFFF", border: "none", cursor: "pointer", minHeight: 48, fontSize: 14.5, boxShadow: "0 6px 16px rgba(46,109,92,0.28)" }}>
                  Begin application
                  <span aria-hidden="true">→</span>
                </a>
              </div>
              <div className="mt-10" style={{ borderTop: "1px solid " + RULE, paddingTop: 36 }}>
                <div style={{ ...monoKicker, color: MUTED, marginBottom: 16 }}>Before you apply</div>
                <ul className="m-0 p-0" style={{ listStyle: "none" }}>
                  {[
                    "Roles are built around real production and direct field accountability.",
                    "Reliable transportation is required for field work.",
                    "Top performers move fastest because they show up consistently."
                  ].map(function(t, i) {
                    return (
                      <li key={i} style={{ fontSize: 13.5, color: INK, lineHeight: 1.68, padding: "10px 0", borderBottom: i === 2 ? "none" : "1px solid " + RULE }}>{t}</li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

function ApplyPage(props) {
  var job = JOBS.find(function(j) { return j.slug === props.slug; });
  var _f = useState({ fullName: "", phone: "", email: "", cityState: "", age18: "", transport: "", experience: "", why: "", source: "", consent: false });
  var form = _f[0]; var setForm = _f[1];
  var _e = useState({}); var errors = _e[0]; var setErrors = _e[1];
  var _p = useState(false); var pending = _p[0]; var setPending = _p[1];
  var _s = useState(""); var submitError = _s[0]; var setSubmitError = _s[1];

  function update(field) {
    return function(e) {
      var val = e.target.type === "checkbox" ? e.target.checked : e.target.value;
      if (field === "phone" && typeof val === "string") val = formatPhoneInput(val);
      setForm(function(prev) { var next = Object.assign({}, prev); next[field] = val; return next; });
      if (submitError) setSubmitError("");
    };
  }

  function validate() {
    var errs = {};
    if (!form.fullName || form.fullName.trim().length < 2) errs.fullName = "Please enter your full name";

    // Phone — strip formatting, require 10+ digits, reject obvious repeats (e.g. 5555555555)
    var digitsOnly = (form.phone || "").replace(/\D/g, "");
    if (digitsOnly.length < 10) errs.phone = "Please enter a valid phone number (10+ digits)";
    else if (/^(\d)\1{9,}$/.test(digitsOnly)) errs.phone = "Please enter a real phone number";

    // Email — RFC-lite format + required TLD (at least 2 chars)
    var emailTrim = (form.email || "").trim();
    if (!emailTrim) errs.email = "Please enter your email";
    else if (!/^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/.test(emailTrim)) errs.email = "Please enter a valid email (e.g. you@example.com)";
    else if (emailTrim.length > 254) errs.email = "That email address looks too long";

    // City & State — require format "City, ST" (2+ letter state abbreviation or full name)
    var cityTrim = (form.cityState || "").trim();
    if (!cityTrim) errs.cityState = "Please enter your city and state";
    else if (!/^[A-Za-z][A-Za-z\s.'-]{1,}\s*,\s*[A-Za-z]{2,}\.?$/.test(cityTrim)) errs.cityState = 'Use format "City, ST" (e.g. Greensboro, NC)';

    if (!form.age18) errs.age18 = "Please select an option";
    if (!form.transport) errs.transport = "Please select an option";
    if (!form.experience) errs.experience = "Please select your experience level";
    if (!form.why || form.why.trim().length < 30) errs.why = "Please tell us at least a couple of sentences (30+ characters)";
    if (!form.source) errs.source = "Please tell us how you heard about us";
    if (!form.consent) errs.consent = "Please check the box to continue";
    return errs;
  }

  function submit(e) {
    e.preventDefault();
    console.log("Form submit clicked");
    var errs = validate();
    console.log("Validation errors:", errs);
    setErrors(errs);
    setSubmitError("");
    if (Object.keys(errs).length > 0) {
      console.log("Validation failed. Fields needing attention:", Object.keys(errs));
      // Scroll to the first error field, not just the top
      setTimeout(function() {
        var firstErrorKey = Object.keys(errs)[0];
        var fieldMap = { fullName: "apply-name", phone: "apply-phone", email: "apply-email", cityState: "apply-city", age18: "apply-age", transport: "apply-transport", experience: "apply-experience", why: "apply-why", source: "apply-source" };
        var elId = fieldMap[firstErrorKey];
        var el = elId ? document.getElementById(elId) : null;
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
          el.focus();
        } else {
          var formEl = document.getElementById("apply-form-top");
          if (formEl) formEl.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 50);
      return;
    }
    console.log("Validation passed. Submitting to Web3Forms...");
    setPending(true);

    // Store for thank-you page display
    var summary = {
      jobTitle: job.title,
      jobLocation: job.location,
      jobType: job.type,
      fullName: form.fullName,
      phone: form.phone,
      email: form.email,
      cityState: form.cityState,
      age18: form.age18,
      transport: form.transport,
      experience: form.experience,
      whyThisRole: form.why,
      source: form.source,
      submittedAt: new Date().toLocaleString(),
    };
    try { window.__lastApplication = summary; } catch (err) {}

    // Build a single readable message body for the email
    var messageBody =
      "POSITION: " + job.title + " (" + job.location + ")\n" +
      "TYPE: " + job.type + "\n\n" +
      "APPLICANT INFORMATION\n" +
      "Name: " + form.fullName + "\n" +
      "Phone: " + form.phone + "\n" +
      "Email: " + form.email + "\n" +
      "Location: " + form.cityState + "\n\n" +
      "QUALIFICATIONS\n" +
      "Age 18+: " + form.age18 + "\n" +
      "Reliable Transportation: " + form.transport + "\n" +
      "Sales Experience: " + form.experience + "\n\n" +
      "WHY THIS ROLE\n" + form.why + "\n\n" +
      "SOURCE: " + form.source + "\n" +
      "SUBMITTED: " + new Date().toLocaleString();

    // Web3Forms expects FormData, not JSON. This is the official pattern.
    var formData = new FormData();
    formData.append("access_key", "126bc0d6-f069-4df8-bea0-b34ac332cc63");
    formData.append("subject", "New Application: " + job.title + " - " + form.fullName);
    formData.append("from_name", form.fullName);
    formData.append("email", form.email);
    formData.append("message", messageBody);
    formData.append("position", job.title);
    formData.append("location", job.location);
    formData.append("job_type", job.type);
    formData.append("applicant_name", form.fullName);
    formData.append("phone", form.phone);
    formData.append("city_state", form.cityState);
    formData.append("age_18_plus", form.age18);
    formData.append("reliable_transportation", form.transport);
    formData.append("sales_experience", form.experience);
    formData.append("why_this_role", form.why);
    formData.append("heard_from", form.source);
    formData.append("botcheck", "");

    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    })
      .then(function(res) {
        return res.json().then(function(data) {
          return { ok: res.ok, data: data };
        });
      })
      .then(function(data) {
        setPending(false);
        if (data.ok && data.data && data.data.success) {
          props.go("thank-you", props.slug);
        } else {
          console.error("Web3Forms error:", data.data);
          setSubmitError((data.data && data.data.message) || "Web3Forms rejected the submission. Please try again.");
        }
      })
      .catch(function(err) {
        console.error("Network error submitting form:", err);
        setPending(false);
        setSubmitError("Network error submitting the application. Check your connection and try again.");
      });
  }

  if (!job) return null;

  var baseInputStyle = {
    width: "100%",
    padding: "14px 16px",
    fontSize: 15,
    background: "#fff",
    border: "1px solid " + RULE,
    borderRadius: 12,
    outline: "none",
    fontFamily: "inherit",
    color: INK,
    boxShadow: "inset 0 1px 2px rgba(14,14,12,0.03)"
  };
  function inputStyleFor(fieldName) {
    if (errors[fieldName]) {
      return Object.assign({}, baseInputStyle, { border: "1.5px solid " + SIGNAL, background: "#F5F9FD" });
    }
    return baseInputStyle;
  }
  var inputStyle = baseInputStyle;

  function FieldError(p) {
    if (!p.error) return null;
    return <div className="text-xs mt-1.5" style={{ color: SIGNAL }}>{p.error}</div>;
  }

  return (
    <section className="max-w-[980px] mx-auto px-5 md:px-10 pt-12 md:pt-16 pb-20">
      <a href={getPathForRoute("job", props.slug)} onClick={function(e) { handleNavClick(e, props.go, "job", props.slug); }} className="text-sm mb-6 inline-flex items-center gap-1.5 hover:opacity-70 transition-opacity" style={{ color: MUTED, cursor: "pointer" }}>
        ← Back to job description
      </a>

      <div className="max-w-[760px] mx-auto">
      {/* Clean job summary card at the top */}
      <div id="apply-form-top" className="p-6 md:p-7 mb-8" style={{ background: "linear-gradient(135deg, #F5F9FD 0%, #FFFFFF 62%)", border: "1px solid " + RULE, borderRadius: 18, boxShadow: "0 14px 40px rgba(14,14,12,0.06)" }}>
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <div className="text-[10px] uppercase mb-2" style={{ color: MUTED, letterSpacing: "0.15em", fontWeight: 700 }}>You're Applying For</div>
            <h1 style={{ ...serif, fontSize: "clamp(1.65rem, 3vw, 2.35rem)", lineHeight: 1.05, color: INK }}>{job.title}</h1>
            <div className="mt-2 text-sm" style={{ color: MUTED }}>
              {job.location} · {job.type}
            </div>
          </div>
          <div className="inline-flex items-center px-3 py-1.5 rounded-[10px] self-start" style={{ background: FOREST_SOFT }}>
            <span className="text-xs font-bold" style={{ color: FOREST }}>{job.earningRange}/yr</span>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { k: "Response Time", v: "Within 48 hours" },
            { k: "Application Time", v: "About 5 minutes" },
            { k: "Hiring Style", v: "Fast, direct, human" }
          ].map(function(item) {
            return (
              <div key={item.k} className="p-4" style={{ background: "rgba(255,255,255,0.82)", border: "1px solid " + RULE, borderRadius: 12 }}>
                <div className="text-[10px] uppercase mb-2" style={{ color: MUTED, letterSpacing: "0.14em", fontWeight: 700 }}>{item.k}</div>
                <div className="text-sm font-semibold" style={{ color: INK }}>{item.v}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Time + transparency note */}
      <div className="mb-8 flex items-center gap-3 text-xs" style={{ color: MUTED }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke={MUTED} strokeWidth="2"/><path d="M12 7V12L15 14" stroke={MUTED} strokeWidth="2" strokeLinecap="round"/></svg>
        <span>Takes about 5 minutes. We respond within 48 hours.</span>
      </div>

      {Object.keys(errors).length > 0 && (
        <div className="mb-8 p-4 flex items-start gap-3" style={{ background: "#F3F7FC", border: "1px solid " + SIGNAL, borderRadius: 8 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: 1 }}><circle cx="12" cy="12" r="10" stroke={SIGNAL} strokeWidth="2"/><path d="M12 8V12M12 16H12.01" stroke={SIGNAL} strokeWidth="2" strokeLinecap="round"/></svg>
          <div>
            <div className="text-sm font-semibold mb-0.5" style={{ color: SIGNAL }}>Please fix {Object.keys(errors).length} {Object.keys(errors).length === 1 ? "field" : "fields"} below.</div>
            <div className="text-xs" style={{ color: MUTED }}>Required fields are marked in red.</div>
          </div>
        </div>
      )}

      {submitError && (
        <div className="mb-8 p-4 flex items-start gap-3" style={{ background: "#F3F7FC", border: "1px solid " + SIGNAL, borderRadius: 8 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: 1 }}><circle cx="12" cy="12" r="10" stroke={SIGNAL} strokeWidth="2"/><path d="M12 8V12M12 16H12.01" stroke={SIGNAL} strokeWidth="2" strokeLinecap="round"/></svg>
          <div>
            <div className="text-sm font-semibold mb-0.5" style={{ color: SIGNAL }}>Submission failed.</div>
            <div className="text-xs" style={{ color: MUTED }}>{submitError}</div>
          </div>
        </div>
      )}

      <form onSubmit={submit}>
        {/* SECTION 1: Contact */}
        <div className="mb-8 p-6 md:p-7" style={{ background: SURF, border: "1px solid " + RULE, borderRadius: 18, boxShadow: "0 10px 28px rgba(14,14,12,0.035)" }}>
          <div className="mb-5 pb-3" style={{ borderBottom: "1px solid " + RULE }}>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center justify-center text-[11px] font-bold" style={{ width: 24, height: 24, background: SIGNAL, color: PAPER, borderRadius: "50%" }}>1</span>
              <h2 style={{ ...serif, fontSize: 20, color: INK }}>Contact information</h2>
            </div>
          </div>
          <div className="space-y-5">
            <div>
              <label htmlFor="apply-name" className="block text-sm font-semibold mb-2" style={{ color: INK }}>Full name</label>
              <input id="apply-name" type="text" value={form.fullName} onChange={update("fullName")} placeholder="Jane Smith" style={inputStyleFor("fullName")} />
              <FieldError error={errors.fullName} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="apply-phone" className="block text-sm font-semibold mb-2" style={{ color: INK }}>Phone number</label>
                <input id="apply-phone" type="tel" value={form.phone} onChange={update("phone")} placeholder="(555) 555-5555" style={inputStyleFor("phone")} />
                <FieldError error={errors.phone} />
              </div>
              <div>
                <label htmlFor="apply-email" className="block text-sm font-semibold mb-2" style={{ color: INK }}>Email address</label>
                <input id="apply-email" type="email" value={form.email} onChange={update("email")} placeholder="you@example.com" style={inputStyleFor("email")} />
                <FieldError error={errors.email} />
              </div>
            </div>
            <div>
              <label htmlFor="apply-city" className="block text-sm font-semibold mb-2" style={{ color: INK }}>City and state</label>
              <input id="apply-city" type="text" value={form.cityState} onChange={update("cityState")} placeholder="e.g. Greensboro, NC" style={inputStyleFor("cityState")} />
              <FieldError error={errors.cityState} />
            </div>
          </div>
        </div>

        {/* SECTION 2: Quick qualifiers */}
        <div className="mb-8 p-6 md:p-7" style={{ background: SURF, border: "1px solid " + RULE, borderRadius: 18, boxShadow: "0 10px 28px rgba(14,14,12,0.035)" }}>
          <div className="mb-5 pb-3" style={{ borderBottom: "1px solid " + RULE }}>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center justify-center text-[11px] font-bold" style={{ width: 24, height: 24, background: SIGNAL, color: PAPER, borderRadius: "50%" }}>2</span>
              <h2 style={{ ...serif, fontSize: 20, color: INK }}>Quick qualifiers</h2>
            </div>
            <p className="text-xs mt-2 ml-9" style={{ color: MUTED }}>Three quick yes/no questions and a dropdown.</p>
          </div>
          <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="apply-age" className="block text-sm font-semibold mb-2" style={{ color: INK }}>Are you 18 or older?</label>
                <select id="apply-age" value={form.age18} onChange={update("age18")} style={inputStyleFor("age18")}>
                  <option value="">Select an option</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
                <FieldError error={errors.age18} />
              </div>
              <div>
                <label htmlFor="apply-transport" className="block text-sm font-semibold mb-2" style={{ color: INK }}>Reliable transportation?</label>
                <select id="apply-transport" value={form.transport} onChange={update("transport")} style={inputStyleFor("transport")}>
                  <option value="">Select an option</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
                <FieldError error={errors.transport} />
              </div>
            </div>
            <div>
              <label htmlFor="apply-experience" className="block text-sm font-semibold mb-2" style={{ color: INK }}>Sales experience</label>
              <select id="apply-experience" value={form.experience} onChange={update("experience")} style={inputStyleFor("experience")}>
                <option value="">Select an option</option>
                <option value="none">None (we'll train you)</option>
                <option value="some">Some informal experience</option>
                <option value="1+">1+ years</option>
                <option value="3+">3+ years</option>
              </select>
              <FieldError error={errors.experience} />
            </div>
          </div>
        </div>

        {/* SECTION 3: Tell us about you */}
        <div className="mb-8 p-6 md:p-7" style={{ background: SURF, border: "1px solid " + RULE, borderRadius: 18, boxShadow: "0 10px 28px rgba(14,14,12,0.035)" }}>
          <div className="mb-5 pb-3" style={{ borderBottom: "1px solid " + RULE }}>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center justify-center text-[11px] font-bold" style={{ width: 24, height: 24, background: SIGNAL, color: PAPER, borderRadius: "50%" }}>3</span>
              <h2 style={{ ...serif, fontSize: 20, color: INK }}>Tell us about you</h2>
            </div>
            <p className="text-xs mt-2 ml-9" style={{ color: MUTED }}>A couple of sentences is plenty. We're looking for character, not a résumé.</p>
          </div>
          <div className="space-y-5">
            <div>
              <label htmlFor="apply-why" className="block text-sm font-semibold mb-2" style={{ color: INK }}>Why are you interested in this role?</label>
              <textarea id="apply-why" value={form.why} onChange={update("why")} rows={4} placeholder="What got you interested? What are you hoping to get out of this opportunity?" style={Object.assign({}, inputStyleFor("why"), { resize: "vertical" })} />
              <div className="flex items-center justify-between mt-1.5">
                <FieldError error={errors.why} />
                <div className="text-xs ml-auto" style={{ color: form.why.length >= 30 ? FOREST : MUTED }}>
                  {form.why.length >= 30 ? "✓ " : ""}{form.why.length} / 30 minimum
                </div>
              </div>
            </div>
            <div>
              <label htmlFor="apply-source" className="block text-sm font-semibold mb-2" style={{ color: INK }}>How did you hear about us?</label>
              <select id="apply-source" value={form.source} onChange={update("source")} style={inputStyleFor("source")}>
                <option value="">Select an option</option>
                <option value="indeed">Indeed</option>
                <option value="ziprecruiter">ZipRecruiter</option>
                <option value="referral">Referral from a current rep</option>
                <option value="search">Google search</option>
                <option value="instagram">Instagram or social media</option>
                <option value="other">Other</option>
              </select>
              <FieldError error={errors.source} />
            </div>
          </div>
        </div>

        {/* Consent */}
        <div className="p-5 mb-6" style={{ background: SURF, border: "1px solid " + RULE, borderRadius: 18, boxShadow: "0 10px 28px rgba(14,14,12,0.035)" }}>
          <label className="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" checked={form.consent} onChange={update("consent")} style={{ marginTop: 4, width: 16, height: 16, accentColor: SIGNAL, cursor: "pointer", flexShrink: 0 }} />
            <span className="text-sm leading-relaxed" style={{ color: INK }}>
              I agree to receive SMS and email communications from Home Front Solutions about my application.
            </span>
          </label>
          <FieldError error={errors.consent} />
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={pending}
          className="w-full inline-flex items-center justify-center gap-2 px-10 py-4 rounded-md font-semibold text-base hover:opacity-90 transition-opacity"
          style={{
            background: "linear-gradient(135deg, #233447 0%, " + SIGNAL + " 100%)",
            color: PAPER,
            border: "none",
            cursor: pending ? "wait" : "pointer",
            opacity: pending ? 0.7 : 1,
            minHeight: 56,
            borderRadius: 14,
            boxShadow: "0 18px 36px rgba(59,93,124,0.18)"
          }}
        >
          {pending ? "Submitting..." : "Submit Application →"}
        </button>

        {/* Legal links - using divs not nested buttons inside p tag */}
        <div className="text-xs text-center mt-4" style={{ color: MUTED }}>
          By submitting, you agree to our{" "}
          <a href="/privacy" onClick={function(e) { handleNavClick(e, props.go, "privacy"); }} style={{ cursor: "pointer", color: MUTED, textDecoration: "underline" }}>Privacy Policy</a>
          {" "}and{" "}
          <a href="/terms" onClick={function(e) { handleNavClick(e, props.go, "terms"); }} style={{ cursor: "pointer", color: MUTED, textDecoration: "underline" }}>Terms of Service</a>.
        </div>
      </form>
      </div>
    </section>
  );
}

function ThankYouPage(props) {
  var job = JOBS.find(function(j) { return j.slug === props.slug; });
  var submission = null;
  if (typeof window !== "undefined") {
    try { submission = window.__lastApplication; } catch (err) {}
  }

  return (
    <section className="max-w-[680px] mx-auto px-5 md:px-10 pt-16 md:pt-24 pb-32">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center mb-6" style={{ width: 64, height: 64, borderRadius: "50%", background: "#F3F7FC", border: "2px solid " + SIGNAL }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M5 12L10 17L20 7" stroke={SIGNAL} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <Eyebrow>Application Received</Eyebrow>
        <h1 className="mb-6" style={{ ...serif, fontSize: "clamp(2rem, 5vw, 3rem)", lineHeight: 1.05 }}>Thank you, {submission ? submission.fullName.split(" ")[0] : "we"}.</h1>
        <p className="text-lg leading-relaxed max-w-md mx-auto" style={{ color: MUTED }}>
          We have received your application{job ? " for the " + job.title + " position" : ""}. A confirmation has been sent to your email.
        </p>
      </div>

      {submission && (
        <div className="mb-12 p-6 md:p-8" style={{ background: SURF, border: "1px solid " + RULE }}>
          <div className="text-xs uppercase mb-4" style={{ color: MUTED, letterSpacing: "0.15em", fontWeight: 700 }}>Submission Summary</div>
          <div className="space-y-3 text-sm">
            <div className="grid grid-cols-[120px_1fr] gap-3"><span style={{ color: MUTED }}>Position</span><span style={{ color: INK, fontWeight: 500 }}>{submission.jobTitle}</span></div>
            <div className="grid grid-cols-[120px_1fr] gap-3"><span style={{ color: MUTED }}>Location</span><span style={{ color: INK, fontWeight: 500 }}>{submission.jobLocation}</span></div>
            <div className="grid grid-cols-[120px_1fr] gap-3"><span style={{ color: MUTED }}>Name</span><span style={{ color: INK, fontWeight: 500 }}>{submission.fullName}</span></div>
            <div className="grid grid-cols-[120px_1fr] gap-3"><span style={{ color: MUTED }}>Phone</span><span style={{ color: INK, fontWeight: 500 }}>{submission.phone}</span></div>
            <div className="grid grid-cols-[120px_1fr] gap-3"><span style={{ color: MUTED }}>Email</span><span style={{ color: INK, fontWeight: 500 }}>{submission.email}</span></div>
            <div className="grid grid-cols-[120px_1fr] gap-3"><span style={{ color: MUTED }}>City &amp; State</span><span style={{ color: INK, fontWeight: 500 }}>{submission.cityState}</span></div>
            <div className="grid grid-cols-[120px_1fr] gap-3"><span style={{ color: MUTED }}>Experience</span><span style={{ color: INK, fontWeight: 500 }}>{submission.experience}</span></div>
            <div className="grid grid-cols-[120px_1fr] gap-3"><span style={{ color: MUTED }}>Submitted</span><span style={{ color: INK, fontWeight: 500 }}>{submission.submittedAt}</span></div>
          </div>
        </div>
      )}

      <div className="mb-12">
        <div className="text-xs uppercase mb-5 text-center" style={{ color: MUTED, letterSpacing: "0.15em", fontWeight: 700 }}>What Happens Next</div>
        <div className="text-left max-w-md mx-auto">
          {[
            { n: "1", t: "We review your application", d: "Usually within one business day." },
            { n: "2", t: "We call you within 48 hours", d: "Quick 10-minute conversation with our recruiting team." },
            { n: "3", t: "Interview and ride-along", d: "In-person interview plus a half-day in the field with a current rep." },
          ].map(function(step) {
            return (
              <div key={step.n} className="grid grid-cols-[40px_1fr] gap-4 py-4" style={{ borderTop: "1px solid " + RULE }}>
                <span style={{ ...serif, fontSize: 20, color: SIGNAL, fontWeight: 700 }}>{step.n}</span>
                <div>
                  <h3 className="font-semibold text-base">{step.t}</h3>
                  <p className="text-sm mt-1" style={{ color: MUTED }}>{step.d}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-3">
        <a href="/careers" onClick={function(e) { handleNavClick(e, props.go, "careers"); }} className="inline-flex items-center justify-center px-6 py-3 rounded-md font-semibold" style={{ background: "transparent", color: INK, border: "1px solid " + INK, cursor: "pointer" }}>
          View Other Positions
        </a>
        <a href="/" onClick={function(e) { handleNavClick(e, props.go, "home"); }} className="inline-flex items-center justify-center px-6 py-3 rounded-[10px] font-semibold" style={{ background: SIGNAL, color: "#FFFFFF", border: "none", cursor: "pointer", boxShadow: "0 8px 18px rgba(46,109,92,0.28)" }}>
          Back to Home
        </a>
      </div>
    </section>
  );
}

function MarketPage(props) {
  var market = MARKET_PAGES.find(function(item) { return item.slug === props.slug; });
  if (!market) {
    return (
      <section className="max-w-[1180px] mx-auto px-5 md:px-10 py-32 text-center">
        <h1 className="mb-4" style={{ ...serif, fontSize: 36 }}>Market page not found</h1>
        <a href="/careers" onClick={function(e) { handleNavClick(e, props.go, "careers"); }} style={{ color: SIGNAL, cursor: "pointer" }}>← View careers</a>
      </section>
    );
  }

  var relatedJobs = JOBS.filter(function(job) {
    var city = market.city.toLowerCase();
    var location = job.location.toLowerCase();
    return city.indexOf(location.replace(", nc", "")) !== -1
      || location.indexOf(market.region.toLowerCase()) !== -1
      || market.region === "Piedmont Triad";
  });

  if (!relatedJobs.length) {
    relatedJobs = JOBS.slice(0, 3);
  }

  var marketProof = MARKET_PROOF[market.slug] || [];
  var marketFaqs = MARKET_FAQS[market.slug] || [];
  var relatedArticles = getMarketArticleSlugs(market.slug).map(function(slug) {
    return ARTICLE_PAGES.find(function(article) { return article.slug === slug; });
  }).filter(Boolean);

  return (
    <>
      <section className="max-w-[1240px] mx-auto px-5 md:px-10 pt-14 md:pt-18 pb-10">
        <div
          className="overflow-hidden"
          style={{
            background: "radial-gradient(circle at top right, rgba(59,93,124,0.1), transparent 30%), linear-gradient(135deg, #F4F8FC 0%, #FFFFFF 54%, #FAFAF7 100%)",
            border: "1px solid " + RULE,
            borderRadius: 24,
            boxShadow: "0 20px 50px rgba(14,14,12,0.07)"
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 px-6 py-8 md:px-10 md:py-12">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center px-3 py-1.5 rounded-[10px] mb-5" style={{ background: SIGNAL_SOFT }}>
                <span className="text-[10px] uppercase" style={{ color: SIGNAL, letterSpacing: "0.16em", fontWeight: 800 }}>{market.region} Recruiting</span>
              </div>
              <h1 className="mb-5" style={{ ...serif, fontSize: "clamp(2.35rem, 5vw, 4.25rem)", lineHeight: 0.96 }}>{market.headline}</h1>
              <p className="max-w-3xl text-[15px] md:text-[17px] leading-[1.85]" style={{ color: MUTED }}>{market.intro}</p>
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
                {market.highlights.map(function(item) {
                  return (
                    <div key={item} className="p-4" style={{ background: "rgba(255,255,255,0.82)", border: "1px solid " + RULE, borderRadius: 14 }}>
                      <div className="text-sm font-semibold leading-[1.6]" style={{ color: INK }}>{item}</div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="lg:col-span-4">
              <div className="p-5 md:p-6" style={{ background: "#11120F", color: PAPER, borderRadius: 20 }}>
                <div className="text-[10px] uppercase mb-3" style={{ color: "rgba(250,250,247,0.62)", letterSpacing: "0.15em", fontWeight: 700 }}>Why this page exists</div>
                <p className="text-sm leading-[1.8]" style={{ color: "rgba(250,250,247,0.8)" }}>{market.localAngle}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-[1240px] mx-auto px-5 md:px-10 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          <div className="lg:col-span-8 space-y-8">
            <div className="p-6 md:p-8" style={{ background: SURF, border: "1px solid " + RULE, borderRadius: 20 }}>
              <h2 className="mb-4" style={{ ...serif, fontSize: 28 }}>Local recruiting focus</h2>
              <p className="text-[15px] leading-[1.9]" style={{ color: MUTED }}>
                Applicants searching for {market.city} sales jobs, telecom sales jobs, fiber internet sales roles, or field positions should reach a page that actually speaks to that market. This page helps connect local search demand to the core careers experience on the site without stuffing repetitive city text into every page.
              </p>
              {market.paragraphs && market.paragraphs.map(function(paragraph) {
                return (
                  <p key={paragraph} className="text-[15px] leading-[1.9] mt-4" style={{ color: MUTED }}>
                    {paragraph}
                  </p>
                );
              })}
            </div>

            {marketProof.length > 0 && (
              <div className="p-6 md:p-8" style={{ background: SURF2, border: "1px solid " + RULE, borderRadius: 20 }}>
                <h2 className="mb-5" style={{ ...serif, fontSize: 28 }}>Market snapshot</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {marketProof.map(function(item) {
                    return (
                      <div key={item.label} className="p-5" style={{ background: "#fff", border: "1px solid " + RULE, borderRadius: 16 }}>
                        <div className="text-[10px] uppercase mb-2" style={{ color: BLUE_PRIMARY, letterSpacing: "0.14em", fontWeight: 800 }}>{item.label}</div>
                        <div className="text-sm leading-[1.8]" style={{ color: INK, fontWeight: 600 }}>{item.value}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {MARKET_TESTIMONIALS[market.slug] && (
              <div className="p-6 md:p-8" style={{ background: SURF, border: "1px solid " + RULE, borderRadius: 20 }}>
                <h2 className="mb-5" style={{ ...serif, fontSize: 28 }}>Local proof and recruiter angles</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {MARKET_TESTIMONIALS[market.slug].map(function(item) {
                    return (
                      <div key={item.quote} className="p-5" style={{ background: PAPER, border: "1px solid " + RULE, borderRadius: 16 }}>
                        <p className="text-sm leading-[1.8]" style={{ color: INK }}>"{item.quote}"</p>
                        <div className="mt-4 text-xs" style={{ color: MUTED }}>
                          <div style={{ color: INK, fontWeight: 700 }}>{item.name}</div>
                          <div>{item.role}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {marketFaqs.length > 0 && (
              <div className="p-6 md:p-8" style={{ background: SURF, border: "1px solid " + RULE, borderRadius: 20 }}>
                <h2 className="mb-5" style={{ ...serif, fontSize: 28 }}>Questions applicants usually have</h2>
                <div className="space-y-4">
                  {marketFaqs.map(function(item) {
                    return (
                      <div key={item.q} className="p-5" style={{ background: PAPER, border: "1px solid " + RULE, borderRadius: 16 }}>
                        <div className="text-base font-semibold leading-[1.5]" style={{ color: INK }}>{item.q}</div>
                        <p className="mt-2 text-sm leading-[1.85]" style={{ color: MUTED }}>{item.a}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="p-6 md:p-8" style={{ background: SURF, border: "1px solid " + RULE, borderRadius: 20 }}>
              <h2 className="mb-5" style={{ ...serif, fontSize: 28 }}>Related positions</h2>
              <div className="space-y-4">
                {relatedJobs.map(function(job) {
                  return (
                    <div key={job.slug} className="p-5" style={{ border: "1px solid " + RULE, borderRadius: 16, background: PAPER }}>
                      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                          <div className="text-[10px] uppercase mb-2" style={{ color: MUTED, letterSpacing: "0.14em", fontWeight: 700 }}>{job.location}</div>
                          <h3 style={{ ...serif, fontSize: 24, lineHeight: 1.08 }}>{job.title}</h3>
                          <p className="mt-3 text-sm leading-[1.8]" style={{ color: MUTED }}>{job.pitch}</p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2">
                          <a href={getPathForRoute("job", job.slug)} onClick={function(e) { handleNavClick(e, props.go, "job", job.slug); }} className="inline-flex items-center justify-center px-5 py-3 rounded-md text-sm font-semibold" style={{ background: "transparent", color: INK, border: "1px solid " + INK, cursor: "pointer" }}>
                            View Role
                          </a>
                          <a href={getPathForRoute("apply", job.slug)} onClick={function(e) { handleNavClick(e, props.go, "apply", job.slug); }} className="inline-flex items-center justify-center px-5 py-3 rounded-md text-sm font-semibold" style={{ background: SIGNAL, color: PAPER, border: "none", cursor: "pointer" }}>
                            Apply Now →
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="p-6 md:p-8" style={{ background: SURF2, border: "1px solid " + RULE, borderRadius: 20 }}>
              <h2 className="mb-5" style={{ ...serif, fontSize: 28 }}>Related reading</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {relatedArticles.map(function(article) {
                  return (
                    <a
                      key={article.slug}
                      href={getPathForRoute("article", article.slug)}
                      onClick={function(e) { handleNavClick(e, props.go, "article", article.slug); }}
                      className="p-5 text-left block"
                      style={{ background: "#fff", border: "1px solid " + RULE, borderRadius: 16, cursor: "pointer" }}
                    >
                      <div className="text-[10px] uppercase mb-2" style={{ color: BLUE_PRIMARY, letterSpacing: "0.14em", fontWeight: 800 }}>{article.eyebrow}</div>
                      <div style={{ ...serif, fontSize: 22, lineHeight: 1.08, color: INK }}>{article.title}</div>
                      <p className="mt-3 text-sm leading-[1.8]" style={{ color: MUTED }}>{article.description}</p>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-28 space-y-4">
              <div className="p-6" style={{ background: SURF2, border: "1px solid " + RULE, borderRadius: 20 }}>
                <div className="text-xs uppercase mb-3" style={{ color: MUTED, letterSpacing: "0.15em", fontWeight: 700 }}>Search intent fit</div>
                <div className="space-y-3 text-sm leading-[1.8]" style={{ color: INK }}>
                  <div>{market.city} sales jobs</div>
                  <div>{market.city} telecom sales jobs</div>
                  <div>{market.city} field roles</div>
                  <div>{market.city} fiber sales jobs</div>
                </div>
              </div>
              {marketProof.length > 0 && (
                <div className="p-6" style={{ background: SURF, border: "1px solid " + RULE, borderRadius: 20 }}>
                  <div className="text-xs uppercase mb-3" style={{ color: SIGNAL, letterSpacing: "0.15em", fontWeight: 700 }}>Proof points</div>
                  <div className="space-y-3">
                    {marketProof.map(function(item) {
                      return (
                        <div key={item.label}>
                          <div className="text-[10px] uppercase" style={{ color: MUTED, letterSpacing: "0.12em", fontWeight: 700 }}>{item.label}</div>
                          <div className="text-sm leading-[1.8]" style={{ color: INK }}>{item.value}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
              <div className="p-6" style={{ background: SURF, border: "1px solid " + RULE, borderRadius: 20 }}>
                <div className="text-xs uppercase mb-3" style={{ color: SIGNAL, letterSpacing: "0.15em", fontWeight: 700 }}>Next step</div>
                <p className="text-sm leading-[1.8] mb-5" style={{ color: MUTED }}>
                  Start from the role that best matches your market and experience. The application is short and the recruiting flow moves quickly.
                </p>
                <a href="/careers" onClick={function(e) { handleNavClick(e, props.go, "careers"); }} className="w-full inline-flex items-center justify-center px-5 py-3.5 rounded-md font-semibold" style={{ background: SIGNAL, color: PAPER, border: "none", cursor: "pointer" }}>
                  Browse Open Roles
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

function InsightsIndexPage(props) {
  // Topic groupings for SEO hub structure
  var topicMap = {
    "Career Stories": "career",
    "Career Path": "career",
    "Training": "career",
    "Mindset": "career",
    "Rep Development": "career",
    "Getting Started": "career",
    "Business Basics": "career",
    "Sales Psychology": "craft",
    "Product Advantage": "craft",
    "Telecom Basics": "craft",
    "Money & Discipline": "money",
    "Income Guide": "money",
    "Income Growth": "money",
    "Industry Trend": "industry",
    "Broadband Buildout": "industry",
    "Provider Search": "industry",
    "Fiber Expansion": "industry",
    "Homeowner Comparison": "industry",
    "Category Comparison": "industry",
    "Internships": "students",
    "Student Jobs": "students",
    "Triangle Students": "students",
    "Charlotte Internships": "students",
    "Young Professionals": "students",
    "Recent Grads": "students",
    "Charlotte Jobs": "markets",
    "Raleigh Jobs": "markets",
    "Greensboro Jobs": "markets",
    "High Point Jobs": "markets",
    "Charlotte Career Growth": "markets",
  };
  var topics = [
    { id: "career", name: "Career & Craft", kicker: "Career & Craft", desc: "How the job actually works, how reps grow, and what separates strong closers from everyone else." },
    { id: "money", name: "Money", kicker: "How the pay works", desc: "Commission, income, 1099 taxes, and how earnings compound as you move up." },
    { id: "industry", name: "Industry & Products", kicker: "Fiber & ISPs", desc: "BEAD, data centers, provider maps, and why fiber keeps pulling attention." },
    { id: "students", name: "Students & Grads", kicker: "Students & grads", desc: "Internships, first jobs, and the early-career angle on field sales." },
    { id: "markets", name: "City Guides", kicker: "Local markets", desc: "Charlotte, Raleigh, Greensboro, High Point — on-the-ground context for each market." },
    { id: "craft", name: "Craft & Mindset", kicker: "Craft & Mindset", desc: "D2D psychology, rep habits, and what makes a conversation land at the door." },
  ];
  var grouped = {};
  topics.forEach(function(t) { grouped[t.id] = []; });
  ARTICLE_PAGES.forEach(function(article) {
    var topicId = topicMap[article.eyebrow] || "craft";
    if (grouped[topicId]) grouped[topicId].push(article);
  });

  return (
    <>
      <PageHero
        eyebrow={"Resources · " + ARTICLE_PAGES.length + " articles"}
        title="Notes from the"
        accentWord="field."
        subtitle="Written for the people who do their homework before they apply. Pay structure, 1099 taxes, daily reality, which products convert, industry shifts, and the career path from first door to area manager."
      />

      {/* Topic jump nav */}
      <section className="max-w-[1280px] mx-auto px-6 md:px-12 pt-14 md:pt-16 pb-10">
        <nav aria-label="Resource topics" className="reveal flex flex-wrap gap-x-3 gap-y-3">
          {topics.map(function(t) {
            var count = grouped[t.id].length;
            if (count === 0) return null;
            return (
              <a key={t.id} href={"#topic-" + t.id} className="inline-flex items-center gap-2 px-4 py-2 rounded-[10px] transition-all" style={{ border: "1px solid " + RULE, background: SURF, color: INK, fontSize: 13.5, fontWeight: 500, letterSpacing: "-0.005em", transition: "background 220ms ease, border-color 220ms ease, color 220ms ease" }} onMouseEnter={function(e) { e.currentTarget.style.background = SIGNAL_SOFTER; e.currentTarget.style.borderColor = SIGNAL; e.currentTarget.style.color = SIGNAL_DEEP; }} onMouseLeave={function(e) { e.currentTarget.style.background = SURF; e.currentTarget.style.borderColor = RULE; e.currentTarget.style.color = INK; }}>
                {t.name}
                <span style={{ ...monoKicker, color: MUTED, fontSize: 10 }}>{count}</span>
              </a>
            );
          })}
        </nav>
      </section>

      {/* Topic sections */}
      {topics.map(function(topic) {
        var articles = grouped[topic.id];
        if (articles.length === 0) return null;
        return (
          <section key={topic.id} id={"topic-" + topic.id} className="max-w-[1280px] mx-auto px-6 md:px-12 pt-14 md:pt-20 pb-4 scroll-mt-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end mb-10 reveal">
              <div className="lg:col-span-7">
                <div style={{ ...monoKicker, color: BLUE_PRIMARY, marginBottom: 14 }}>{topic.kicker}</div>
                <h2 className="display" style={{ fontSize: "clamp(1.8rem, 3.2vw, 2.4rem)", lineHeight: 1.04, letterSpacing: "-0.03em", color: INK }}>{topic.name}</h2>
              </div>
              <div className="lg:col-span-5">
                <p style={{ fontSize: 15, color: MUTED, lineHeight: 1.7 }}>{topic.desc}</p>
              </div>
            </div>
            <ul className="m-0 p-0 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-0 reveal" style={{ listStyle: "none", border: "1px solid " + RULE, borderRadius: 18, overflow: "hidden" }}>
              {articles.map(function(article, i) {
                return (
                  <li key={article.slug} style={{
                    background: SURF,
                    borderRight: "1px solid " + RULE,
                    borderBottom: "1px solid " + RULE,
                  }}>
                    <a
                      href={getPathForRoute("article", article.slug)}
                      onClick={function(e) { handleNavClick(e, props.go, "article", article.slug); }}
                      className="block"
                      style={{ padding: "28px 26px 30px", transition: "background 260ms ease, padding-left 260ms ease" }}
                      onMouseEnter={function(e) { e.currentTarget.style.background = SIGNAL_SOFTER; e.currentTarget.style.paddingLeft = "34px"; }}
                      onMouseLeave={function(e) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.paddingLeft = "26px"; }}
                    >
                      <div className="flex items-center justify-between mb-7">
                        <span style={{ ...monoKicker, color: BLUE_PRIMARY }}>{article.eyebrow}</span>
                        <span aria-hidden="true" style={{ fontSize: 14, color: SIGNAL }}>→</span>
                      </div>
                      <h3 style={{ ...serif, fontSize: 21, lineHeight: 1.16, letterSpacing: "-0.02em", color: INK, fontWeight: 440 }}>{article.title}</h3>
                      <p className="mt-3" style={{ fontSize: 13.5, color: MUTED, lineHeight: 1.65 }}>{article.description}</p>
                    </a>
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}

      {/* Bottom CTA */}
      <section className="max-w-[1280px] mx-auto px-6 md:px-12 pt-20 md:pt-24 pb-28 md:pb-32 reveal">
        <div className="flex flex-wrap items-center justify-between gap-6" style={{ borderTop: "1px solid " + RULE, paddingTop: 32 }}>
          <div>
            <div style={{ ...monoKicker, color: MUTED, marginBottom: 8 }}>Ready for the real thing?</div>
            <div style={{ ...serif, fontSize: "clamp(1.4rem, 2.2vw, 1.75rem)", letterSpacing: "-0.022em", color: INK, fontWeight: 440 }}>See the open roles or book a call.</div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a href="/careers" onClick={function(e) { handleNavClick(e, props.go, "careers"); }} className="inline-flex items-center gap-2 px-6 rounded-[10px] font-medium" style={{ background: "transparent", color: INK, border: "1px solid " + RULE, cursor: "pointer", minHeight: 48, fontSize: 14.5 }}>
              See open roles
            </a>
            <a href={BOOKING_URL || "/contact"} onClick={BOOKING_URL ? undefined : function(e) { handleNavClick(e, props.go, "contact"); }} target={BOOKING_URL ? "_blank" : undefined} rel={BOOKING_URL ? "noopener noreferrer" : undefined} className="inline-flex items-center gap-2 px-6 rounded-[10px] font-medium" style={{ background: SIGNAL, color: "#FFFFFF", border: "none", cursor: "pointer", minHeight: 48, fontSize: 14.5, boxShadow: "0 8px 20px rgba(46,109,92,0.28)" }}>
              Book a call
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

function ArticlePage(props) {
  var article = ARTICLE_PAGES.find(function(item) { return item.slug === props.slug; });
  if (!article) {
    return (
      <section className="max-w-[1180px] mx-auto px-5 md:px-10 py-32 text-center">
        <h1 className="mb-4" style={{ ...serif, fontSize: 36 }}>Article not found</h1>
        <a href="/" onClick={function(e) { handleNavClick(e, props.go, "home"); }} style={{ color: SIGNAL, cursor: "pointer" }}>← Back home</a>
      </section>
    );
  }

  var relatedArticles = getRelatedArticleSlugs(article).map(function(slug) {
    return ARTICLE_PAGES.find(function(item) { return item.slug === slug; });
  }).filter(Boolean);

  // Article metadata for byline + reading time
  var publishedDate = article.publishedDate || "2026-04-10";
  var authorName = article.authorName || "Muizz Muhammad";
  var bodyText = (article.intro || "") + " " + (article.sections || []).map(function(s) { return (s.heading || "") + " " + (s.body || ""); }).join(" ");
  var wordCount = bodyText.trim().split(/\s+/).filter(Boolean).length;
  var readingTime = Math.max(1, Math.round(wordCount / 220));
  var formattedDate = new Date(publishedDate + "T00:00:00").toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

  return (
    <>
      <section className="max-w-[1040px] mx-auto px-6 md:px-12 pt-20 md:pt-28 pb-12">
        <div className="reveal">
          <div className="flex items-center gap-3 mb-7" style={{ ...monoKicker, color: MUTED }}>
            <a href="/insights" onClick={function(e) { handleNavClick(e, props.go, "insights"); }} style={{ color: "inherit" }}>Insights</a>
            <span style={{ opacity: 0.5 }}>/</span>
            <span style={{ color: SIGNAL }}>{article.eyebrow}</span>
          </div>
          <h1 className="display" style={{ fontSize: "clamp(2.6rem, 5.6vw, 4.6rem)", lineHeight: 0.97, letterSpacing: "-0.035em", color: INK }}>{article.title}</h1>
          <p className="mt-8 max-w-3xl" style={{ fontSize: "clamp(1.1rem, 1.35vw, 1.24rem)", color: MUTED, lineHeight: 1.58 }}>{article.description}</p>
          <div className="mt-9 pt-7 flex flex-wrap items-center gap-x-6 gap-y-3" style={{ borderTop: "1px solid " + RULE }}>
            <div className="flex items-center gap-3">
              <span aria-hidden="true" style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg," + SIGNAL + " 0%," + INK + " 100%)", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "#F5F1E7", ...serif, fontSize: 12, fontWeight: 500 }}>MM</span>
              <span>
                <span className="block" style={{ fontSize: 13.5, color: INK, fontWeight: 500 }}>{authorName}</span>
                <span className="block" style={{ fontSize: 12, color: MUTED, marginTop: 1 }}>Founder, Home Front Solutions</span>
              </span>
            </div>
            <span style={{ color: RULE }}>|</span>
            <time dateTime={publishedDate} style={{ ...monoKicker, color: MUTED }}>{formattedDate}</time>
            <span style={{ color: RULE }}>|</span>
            <span style={{ ...monoKicker, color: MUTED }}>{readingTime} min read</span>
          </div>
        </div>
      </section>

      <section className="max-w-[1040px] mx-auto px-6 md:px-12 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_260px] gap-12 lg:gap-16">
          <div>
            <div className="reveal" style={{ borderTop: "1px solid " + RULE, paddingTop: 36, marginBottom: 28 }}>
              <p className="drop-cap" style={{ fontSize: 18, lineHeight: 1.72, color: INK, fontWeight: 400 }}>{article.intro}</p>
            </div>
            {article.sections.map(function(section, i) {
              return (
                <div key={section.heading} className="mt-14 reveal" data-delay={(i % 2) + 1}>
                  <h2 className="display mb-5" style={{ fontSize: "clamp(1.6rem, 2.8vw, 2rem)", lineHeight: 1.08, letterSpacing: "-0.025em", color: INK }}>{section.heading}</h2>
                  <p style={{ fontSize: 17, lineHeight: 1.75, color: INK, fontWeight: 400 }}>{section.body}</p>
                </div>
              );
            })}

            <div className="mt-20 reveal" style={{ borderTop: "1px solid " + RULE, paddingTop: 36 }}>
              <div style={{ ...monoKicker, color: MUTED, marginBottom: 22 }}>Keep reading</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {relatedArticles.map(function(item) {
                  return (
                    <a
                      key={item.slug}
                      href={getPathForRoute("article", item.slug)}
                      onClick={function(e) { handleNavClick(e, props.go, "article", item.slug); }}
                      className="block"
                      style={{ background: SURF, border: "1px solid " + RULE, borderRadius: 16, padding: 22, transition: "transform 360ms ease, border-color 260ms ease" }}
                      onMouseEnter={function(e) { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.borderColor = "rgba(14,14,12,0.18)"; }}
                      onMouseLeave={function(e) { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = RULE; }}
                    >
                      <div style={{ ...monoKicker, color: BLUE_PRIMARY, marginBottom: 12 }}>{item.eyebrow}</div>
                      <div style={{ ...serif, fontSize: 19, lineHeight: 1.18, letterSpacing: "-0.018em", color: INK, fontWeight: 440 }}>{item.title}</div>
                      <p className="mt-3" style={{ fontSize: 13.5, color: MUTED, lineHeight: 1.65 }}>{item.description}</p>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
          <aside className="lg:sticky lg:top-28 h-fit">
            <div style={{ borderTop: "1px solid " + RULE, paddingTop: 32 }}>
              <div style={{ ...monoKicker, color: MUTED, marginBottom: 18 }}>Next steps</div>
              <ul className="m-0 p-0" style={{ listStyle: "none" }}>
                {[
                  ["careers", null, "Open roles"],
                  ["market", "greensboro-nc", "Greensboro"],
                  ["market", "high-point-nc", "High Point"],
                  ["market", "charlotte-nc", "Charlotte"],
                  ["market", "raleigh-nc", "Raleigh"],
                ].map(function(item, i, arr) {
                  var path = item[1] ? getPathForRoute(item[0], item[1]) : getPathForRoute(item[0]);
                  return (
                    <li key={i} style={{ borderBottom: i === arr.length - 1 ? "none" : "1px solid " + RULE }}>
                      <a
                        href={path}
                        onClick={function(e) { handleNavClick(e, props.go, item[0], item[1]); }}
                        className="flex items-center justify-between"
                        style={{ padding: "14px 2px", fontSize: 14, color: INK, transition: "padding 260ms ease" }}
                        onMouseEnter={function(e) { e.currentTarget.style.paddingLeft = "8px"; }}
                        onMouseLeave={function(e) { e.currentTarget.style.paddingLeft = "2px"; }}
                      >
                        {item[2]}
                        <span aria-hidden="true" style={{ color: MUTED }}>→</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

function ContactPage(props) {
  var _s = useState(false); var sent = _s[0]; var setSent = _s[1];
  var _p = useState(false); var pending = _p[0]; var setPending = _p[1];
  var _e = useState(null);  var submitError = _e[0]; var setSubmitError = _e[1];

  // Controlled fields + per-field error state (matches the Apply form's pattern)
  var _f = useState({ fullName: "", company: "", email: "", markets: "", details: "" });
  var form = _f[0]; var setForm = _f[1];
  var _er = useState({}); var errors = _er[0]; var setErrors = _er[1];
  function update(field) {
    return function(e) {
      var v = e.target.value;
      setForm(function(prev) { var next = Object.assign({}, prev); next[field] = v; return next; });
      if (errors[field]) {
        setErrors(function(prev) { var next = Object.assign({}, prev); delete next[field]; return next; });
      }
    };
  }

  function validateContact() {
    var errs = {};
    // Name
    if (!form.fullName || form.fullName.trim().length < 2) errs.fullName = "Please enter your full name";

    // Email — RFC-lite format + required 2+ char TLD
    var emailTrim = (form.email || "").trim();
    if (!emailTrim) errs.email = "Please enter your email";
    else if (!/^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/.test(emailTrim)) errs.email = "Please enter a valid email (e.g. you@example.com)";
    else if (emailTrim.length > 254) errs.email = "That email address looks too long";

    // Markets — optional, but if provided must be at least 2 chars
    if (form.markets && form.markets.trim().length === 1) errs.markets = "Please enter a full market or region";

    // Message body — optional but if started must be at least 10 chars so it's not junk
    if (form.details && form.details.trim().length > 0 && form.details.trim().length < 10) {
      errs.details = "Please add a little more detail (10+ characters)";
    }

    return errs;
  }

  var baseInputStyle = { width: "100%", padding: "14px 0", fontSize: 15.5, background: "transparent", border: "none", borderBottom: "1px solid " + RULE, outline: "none", fontFamily: "inherit", color: INK, transition: "border-color 200ms ease" };
  function inputStyleFor(fieldName) {
    if (errors[fieldName]) {
      return Object.assign({}, baseInputStyle, { borderBottom: "1.5px solid #C25A3D", background: "rgba(194,90,61,0.04)" });
    }
    return baseInputStyle;
  }
  function FieldError(p) {
    if (!p.error) return null;
    return <div className="text-xs mt-1.5" role="alert" style={{ color: "#A6472D" }}>{p.error}</div>;
  }

  function submitContact(e) {
    e.preventDefault();
    if (pending) return;
    setSubmitError(null);

    // Run validation first — block submit if any field fails
    var errs = validateContact();
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      // Focus the first invalid field
      var fieldMap = { fullName: "c-name", email: "c-email", markets: "c-markets", details: "c-details" };
      var firstKey = Object.keys(errs)[0];
      var el = document.getElementById(fieldMap[firstKey]);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        setTimeout(function() { try { el.focus(); } catch (err) {} }, 320);
      }
      return;
    }

    setPending(true);

    var data = new FormData();
    data.append("access_key", "126bc0d6-f069-4df8-bea0-b34ac332cc63");
    data.append("subject", "New Contact Inquiry — " + (form.fullName || "No name"));
    data.append("from_name", form.fullName || "");
    data.append("email", form.email || "");
    data.append("company", form.company || "");
    data.append("markets", form.markets || "");
    data.append("message",
      "Name: " + (form.fullName || "") + "\n" +
      "Company: " + (form.company || "") + "\n" +
      "Email: " + (form.email || "") + "\n" +
      "Markets of interest: " + (form.markets || "") + "\n\n" +
      "Message:\n" + (form.details || "") + "\n\n" +
      "Submitted: " + new Date().toLocaleString()
    );
    data.append("botcheck", "");

    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { Accept: "application/json" },
      body: data
    })
      .then(function(res) { return res.json().then(function(j) { return { ok: res.ok, data: j }; }); })
      .then(function(r) {
        setPending(false);
        if (r.ok && r.data && r.data.success) {
          setSent(true);
          setForm({ fullName: "", company: "", email: "", markets: "", details: "" });
          setErrors({});
          if (typeof window !== "undefined" && window.scrollTo) window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          setSubmitError(r.data && r.data.message ? r.data.message : "Something went wrong. Please email us directly.");
        }
      })
      .catch(function() {
        setPending(false);
        setSubmitError("Network error. Please email us at info@homefrontsolutionsllc.com.");
      });
  }
  var inputStyle = baseInputStyle; // legacy alias used in the success view below

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Tell us about the"
        accentWord="market."
        subtitle="If your brand needs coverage in a new market, or a better field team in one you're already in, this is the conversation to start. One business day turnaround."
      />

      {/* Book a meeting module */}
      <section className="max-w-[1280px] mx-auto px-6 md:px-12 pt-14 md:pt-16 pb-16 md:pb-20 reveal">
        <div className="relative overflow-hidden rounded-3xl" style={{ background: SIGNAL_DEEP, color: "#F5F1E7" }}>
          <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "radial-gradient(700px 320px at 15% -10%, rgba(143,176,155,0.22), transparent 60%), radial-gradient(600px 260px at 95% 110%, rgba(217,166,60,0.16), transparent 60%)" }} />
          <div className="relative grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 p-10 md:p-14 items-center">
            <div className="md:col-span-7">
              <div style={{ ...monoKicker, color: SAGE, marginBottom: 16 }}>Fastest way in · 30 minutes</div>
              <h2 className="display" style={{ fontSize: "clamp(2rem, 3.6vw, 2.6rem)", lineHeight: 1.04, letterSpacing: "-0.03em", color: "#F5F1E7", fontWeight: 420 }}>
                Book a call with our team.
              </h2>
              <p className="mt-5 max-w-xl" style={{ fontSize: 15.5, color: "rgba(245,241,231,0.78)", lineHeight: 1.72 }}>
                Pick a time that works. We'll jump on a 30-minute call to learn about your markets, current field performance, and what you'd need us to run. No decks, no pitch. Straight conversation.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <a href={BOOKING_URL || "#apply-form-top"} target={BOOKING_URL ? "_blank" : undefined} rel={BOOKING_URL ? "noopener noreferrer" : undefined} className="btn-white inline-flex items-center gap-2 px-7 rounded-[10px] font-medium" style={{ minHeight: 54, fontSize: 15 }}>
                  {BOOKING_URL ? "Pick a time" : "Send a message"}
                  <span aria-hidden="true">→</span>
                </a>
                <a href="mailto:info@homefrontsolutionsllc.com" className="edi-link inline-flex items-center text-sm font-medium" style={{ color: "rgba(245,241,231,0.85)" }}>
                  Or email us
                  <span aria-hidden="true" style={{ marginLeft: 4 }}>→</span>
                </a>
              </div>
            </div>
            <div className="md:col-span-5">
              <dl className="m-0 p-0" style={{ listStyle: "none", borderLeft: "1px solid rgba(245,241,231,0.14)", paddingLeft: 28 }}>
                {[
                  { k: "30 min", v: "Call length" },
                  { k: "1 biz day", v: "Response time" },
                  { k: "No deck", v: "Just a conversation" },
                ].map(function(row, i, arr) {
                  return (
                    <div key={row.v} className="grid items-baseline" style={{ gridTemplateColumns: "auto minmax(0,1fr)", gap: 16, padding: "16px 0", borderBottom: i === arr.length - 1 ? "none" : "1px solid rgba(245,241,231,0.12)" }}>
                      <dt style={{ ...serif, fontSize: 22, letterSpacing: "-0.02em", color: "#F5F1E7", fontWeight: 440, lineHeight: 1 }}>{row.k}</dt>
                      <dd className="m-0" style={{ ...monoKicker, color: "rgba(245,241,231,0.7)" }}>{row.v}</dd>
                    </div>
                  );
                })}
              </dl>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-[1280px] mx-auto px-6 md:px-12 py-16 md:py-20" style={{ borderTop: "1px solid " + RULE }}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20">
          <div className="md:col-span-5 reveal">
            <div style={{ ...monoKicker, color: MUTED, marginBottom: 24 }}>Direct lines</div>
            <dl className="m-0 p-0" style={{ listStyle: "none" }}>
              {[
                { kicker: "Email", value: "info@homefrontsolutionsllc.com", href: "mailto:info@homefrontsolutionsllc.com" },
                { kicker: "Phone", value: "(336) 420-9379", href: "tel:3364209379" },
                { kicker: "Headquarters", value: "High Point, North Carolina", href: null },
              ].map(function(row, i, arr) {
                var content = (
                  <div className="grid items-start" style={{ gridTemplateColumns: "120px minmax(0,1fr)", gap: 24, padding: "22px 0", borderBottom: i === arr.length - 1 ? "none" : "1px solid " + RULE }}>
                    <dt style={{ ...monoKicker, color: BLUE_PRIMARY, lineHeight: 1.5 }}>{row.kicker}</dt>
                    <dd className="m-0" style={{ ...serif, fontSize: 19, lineHeight: 1.3, letterSpacing: "-0.015em", color: INK, fontWeight: 440 }}>{row.value}</dd>
                  </div>
                );
                return row.href ? (
                  <a key={row.kicker} href={row.href} className="block" style={{ color: INK, transition: "opacity 240ms ease" }} onMouseEnter={function(e) { e.currentTarget.style.opacity = "0.7"; }} onMouseLeave={function(e) { e.currentTarget.style.opacity = "1"; }}>{content}</a>
                ) : (
                  <div key={row.kicker}>{content}</div>
                );
              })}
            </dl>
          </div>

          <div className="md:col-span-7 reveal" data-delay="1">
            {!sent ? (
              <form onSubmit={submitContact} noValidate>
                <div style={{ ...monoKicker, color: MUTED, marginBottom: 24 }}>Send a message</div>
                {/* Honeypot — hidden from humans, catches bots */}
                <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" style={{ display: "none" }} />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                  <div>
                    <label htmlFor="c-name" className="block" style={{ ...monoKicker, color: MUTED, marginBottom: 6 }}>Your name</label>
                    <input id="c-name" name="fullName" type="text" required autoComplete="name" value={form.fullName} onChange={update("fullName")} style={inputStyleFor("fullName")} onFocus={function(e) { if (!errors.fullName) e.target.style.borderBottomColor = SIGNAL; }} onBlur={function(e) { if (!errors.fullName) e.target.style.borderBottomColor = RULE; }} aria-invalid={!!errors.fullName} aria-describedby={errors.fullName ? "c-name-err" : undefined} />
                    <FieldError error={errors.fullName} />
                  </div>
                  <div>
                    <label htmlFor="c-company" className="block" style={{ ...monoKicker, color: MUTED, marginBottom: 6 }}>Company</label>
                    <input id="c-company" name="company" type="text" autoComplete="organization" value={form.company} onChange={update("company")} style={inputStyleFor("company")} onFocus={function(e) { if (!errors.company) e.target.style.borderBottomColor = SIGNAL; }} onBlur={function(e) { if (!errors.company) e.target.style.borderBottomColor = RULE; }} />
                  </div>
                </div>
                <div className="mt-6">
                  <label htmlFor="c-email" className="block" style={{ ...monoKicker, color: MUTED, marginBottom: 6 }}>Email</label>
                  <input id="c-email" name="email" type="email" required autoComplete="email" inputMode="email" value={form.email} onChange={update("email")} style={inputStyleFor("email")} onFocus={function(e) { if (!errors.email) e.target.style.borderBottomColor = SIGNAL; }} onBlur={function(e) {
                    if (!errors.email) e.target.style.borderBottomColor = RULE;
                    // On blur, lightweight email format check for instant feedback
                    var v = (e.target.value || "").trim();
                    if (v && !/^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/.test(v)) {
                      setErrors(function(prev) { var next = Object.assign({}, prev); next.email = "Please enter a valid email (e.g. you@example.com)"; return next; });
                    }
                  }} aria-invalid={!!errors.email} />
                  <FieldError error={errors.email} />
                </div>
                <div className="mt-6">
                  <label htmlFor="c-markets" className="block" style={{ ...monoKicker, color: MUTED, marginBottom: 6 }}>Markets of interest</label>
                  <input id="c-markets" name="markets" type="text" placeholder="Nationwide, southeast, or a specific city" value={form.markets} onChange={update("markets")} style={inputStyleFor("markets")} onFocus={function(e) { if (!errors.markets) e.target.style.borderBottomColor = SIGNAL; }} onBlur={function(e) { if (!errors.markets) e.target.style.borderBottomColor = RULE; }} aria-invalid={!!errors.markets} />
                  <FieldError error={errors.markets} />
                </div>
                <div className="mt-6">
                  <label htmlFor="c-details" className="block" style={{ ...monoKicker, color: MUTED, marginBottom: 6 }}>Tell us more</label>
                  <textarea id="c-details" name="details" rows={4} value={form.details} onChange={update("details")} style={Object.assign({}, inputStyleFor("details"), { resize: "vertical" })} onFocus={function(e) { if (!errors.details) e.target.style.borderBottomColor = SIGNAL; }} onBlur={function(e) { if (!errors.details) e.target.style.borderBottomColor = RULE; }} aria-invalid={!!errors.details} />
                  <FieldError error={errors.details} />
                </div>

                {submitError && (
                  <div role="alert" className="mt-6 p-4 rounded-lg" style={{ background: "rgba(194,90,61,0.08)", border: "1px solid rgba(194,90,61,0.3)", color: "#8A3E28", fontSize: 14 }}>
                    {submitError} <a href="mailto:info@homefrontsolutionsllc.com" style={{ color: BLUE_DEEP, fontWeight: 600 }}>info@homefrontsolutionsllc.com</a>
                  </div>
                )}

                <button type="submit" disabled={pending} className="mt-10 inline-flex items-center gap-2 px-7 rounded-[10px] font-medium transition-all" style={{ background: pending ? SIGNAL_DEEP : SIGNAL, color: "#FFFFFF", border: "none", cursor: pending ? "wait" : "pointer", minHeight: 54, fontSize: 15, boxShadow: "0 12px 28px rgba(30,109,107,0.32)", opacity: pending ? 0.85 : 1 }}>
                  {pending ? (
                    <>
                      <span aria-hidden="true" style={{ width: 14, height: 14, border: "2px solid rgba(255,255,255,0.35)", borderTopColor: "#FFFFFF", borderRadius: "50%", display: "inline-block", animation: "spin 720ms linear infinite" }} />
                      Sending…
                    </>
                  ) : (
                    <>
                      Send message
                      <span aria-hidden="true">→</span>
                    </>
                  )}
                </button>
                <p className="mt-4" style={{ fontSize: 12.5, color: MUTED }}>
                  Or email us directly at <a href="mailto:info@homefrontsolutionsllc.com" style={{ color: BLUE_DEEP, fontWeight: 500 }}>info@homefrontsolutionsllc.com</a>
                </p>
              </form>
            ) : (
              <div style={{ borderTop: "1px solid " + RULE, paddingTop: 36 }}>
                <div style={{ ...monoKicker, color: BLUE_PRIMARY, marginBottom: 16 }}>Received</div>
                <h3 style={{ ...serif, fontSize: 28, lineHeight: 1.18, letterSpacing: "-0.025em", color: INK, fontWeight: 440 }}>Thank you.</h3>
                <p className="mt-4" style={{ fontSize: 15, color: MUTED, lineHeight: 1.72 }}>We'll be in touch within 24 hours.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

function PrivacyPage(props) {
  return (
    <>
      <PageHero
        eyebrow="Privacy Policy"
        title="Privacy"
        accentWord="Policy."
        subtitle="Last updated: April 10, 2026"
      />
    <section className="max-w-[800px] mx-auto px-5 md:px-10 pt-12 md:pt-14 pb-20">
      <div className="mt-4 space-y-8 text-[15px] leading-[1.85]" style={{ color: INK }}>
        <div>
          <h2 className="mb-3" style={{ ...serif, fontSize: 22 }}>Who We Are</h2>
          <p style={{ color: MUTED }}>Home Front Solutions, LLC ("Home Front Solutions," "we," "us," or "our") is a door-to-door marketing company headquartered in High Point, North Carolina. We support residential customer acquisition across categories including fiber internet, home security, solar, water filtration, roofing, and related home-service campaigns. This Privacy Policy explains how we collect, use, and protect information you provide to us through our website and in person.</p>
        </div>

        <div>
          <h2 className="mb-3" style={{ ...serif, fontSize: 22 }}>Information We Collect</h2>
          <p style={{ color: MUTED }}>We collect information you voluntarily provide to us, including your name, phone number, email address, city and state, employment history, and any other details you submit through our job application form, contact form, or in-person sales conversations. We may also collect basic technical information such as your browser type, device, and IP address when you visit our website.</p>
        </div>

        <div>
          <h2 className="mb-3" style={{ ...serif, fontSize: 22 }}>How We Use Your Information</h2>
          <p style={{ color: MUTED }}>We use the information you provide to evaluate job applications, respond to inquiries, coordinate appointments or installations with service partners when applicable, communicate with you about job opportunities or homeowner service offers, and improve our website and operations. We do not sell your personal information to third parties.</p>
        </div>

        <div>
          <h2 className="mb-3" style={{ ...serif, fontSize: 22 }}>How We Share Your Information</h2>
          <p style={{ color: MUTED }}>We may share your information with authorized service partners only when necessary to fulfill an appointment, estimate, or installation you have agreed to. We may also share information with service providers who help us operate our website and business. We will never sell your personal information for marketing purposes.</p>
        </div>

        <div>
          <h2 className="mb-3" style={{ ...serif, fontSize: 22 }}>Your Rights</h2>
          <p style={{ color: MUTED }}>You have the right to request access to, correction of, or deletion of your personal information at any time. To exercise these rights, contact us at info@homefrontsolutionsllc.com or call (336) 420-9379.</p>
        </div>

        <div>
          <h2 className="mb-3" style={{ ...serif, fontSize: 22 }}>SMS and Email Communications</h2>
          <p style={{ color: MUTED }}>By submitting a job application or contact form, you consent to receive SMS and email communications from Home Front Solutions related to your application or inquiry. You can opt out of marketing communications at any time by replying STOP to any text message or clicking unsubscribe in any email.</p>
        </div>

        <div>
          <h2 className="mb-3" style={{ ...serif, fontSize: 22 }}>Contact Us</h2>
          <p style={{ color: MUTED }}>If you have questions about this Privacy Policy, please contact us at info@homefrontsolutionsllc.com or (336) 420-9379. Home Front Solutions, LLC is headquartered in High Point, North Carolina.</p>
        </div>
      </div>
    </section>
    </>
  );
}

function TermsPage(props) {
  return (
    <>
      <PageHero
        eyebrow="Terms of Service"
        title="Terms of"
        accentWord="Service."
        subtitle="Last updated: April 10, 2026"
      />
    <section className="max-w-[800px] mx-auto px-5 md:px-10 pt-12 md:pt-14 pb-20">
      <div className="mt-4 space-y-8 text-[15px] leading-[1.85]" style={{ color: INK }}>
        <div>
          <h2 className="mb-3" style={{ ...serif, fontSize: 22 }}>Acceptance of Terms</h2>
          <p style={{ color: MUTED }}>By accessing or using the Home Front Solutions website, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website.</p>
        </div>

        <div>
          <h2 className="mb-3" style={{ ...serif, fontSize: 22 }}>About Our Services</h2>
          <p style={{ color: MUTED }}>Home Front Solutions, LLC is an independent door-to-door marketing company supporting residential customer acquisition across categories including fiber internet, security, solar, water filtration, and roofing. We do not manufacture, install, or provide the underlying service directly unless stated otherwise. Any third-party service or installation is provided under the respective partner's own terms and conditions.</p>
        </div>

        <div>
          <h2 className="mb-3" style={{ ...serif, fontSize: 22 }}>Job Applications</h2>
          <p style={{ color: MUTED }}>When you submit an application through our website, you represent that the information you provide is accurate and complete. Submitting an application does not guarantee employment. Home Front Solutions is an Equal Opportunity Employer and considers all qualified applicants without regard to race, color, religion, sex, sexual orientation, gender identity, national origin, disability, or veteran status.</p>
        </div>

        <div>
          <h2 className="mb-3" style={{ ...serif, fontSize: 22 }}>Use of the Website</h2>
          <p style={{ color: MUTED }}>You agree to use this website only for lawful purposes. You may not attempt to gain unauthorized access to any portion of the website, interfere with its operation, or use it in any way that could harm Home Front Solutions or its users.</p>
        </div>

        <div>
          <h2 className="mb-3" style={{ ...serif, fontSize: 22 }}>Intellectual Property</h2>
          <p style={{ color: MUTED }}>All content on this website, including text, graphics, logos, and design, is the property of Home Front Solutions, LLC or its licensors and is protected by United States and international copyright laws. Any third-party brand names referenced on this website are trademarks of their respective owners.</p>
        </div>

        <div>
          <h2 className="mb-3" style={{ ...serif, fontSize: 22 }}>Limitation of Liability</h2>
          <p style={{ color: MUTED }}>Home Front Solutions provides this website on an "as is" basis. We make no warranties, express or implied, regarding the accuracy or completeness of the information on this website. To the fullest extent permitted by law, Home Front Solutions shall not be liable for any indirect, incidental, or consequential damages arising from your use of the website.</p>
        </div>

        <div>
          <h2 className="mb-3" style={{ ...serif, fontSize: 22 }}>Governing Law</h2>
          <p style={{ color: MUTED }}>These Terms of Service are governed by the laws of the State of North Carolina, without regard to its conflict of law provisions. Any disputes arising from these terms shall be resolved in the courts located in Guilford County, North Carolina.</p>
        </div>

        <div>
          <h2 className="mb-3" style={{ ...serif, fontSize: 22 }}>Changes to These Terms</h2>
          <p style={{ color: MUTED }}>We may update these Terms of Service from time to time. Any changes will be posted on this page with an updated effective date.</p>
        </div>

        <div>
          <h2 className="mb-3" style={{ ...serif, fontSize: 22 }}>Contact Us</h2>
          <p style={{ color: MUTED }}>If you have questions about these Terms of Service, contact us at info@homefrontsolutionsllc.com or (336) 420-9379.</p>
        </div>
      </div>
    </section>
    </>
  );
}

// ── REP LOGIN PAGE ───────────────────────────────────────────────
// Frontend-only login screen for the HFS Coach rep portal.
// POSTs to the FastAPI backend at VITE_API_URL/auth/login (or /api/auth/login).
// Backend lives on the `backend/fastapi` branch.
function RepLoginPage(props) {
  return (
    <section className="rep-login">
      {/* Left panel — navy brand + pitch */}
      <aside className="rep-login__brand">
        <a href="/" onClick={function(e) { handleNavClick(e, props.go, "home"); }} className="rep-login__home" aria-label="Back to Home Front Solutions">
          <BrandLockup onDark={true} />
        </a>
        <div className="rep-login__pitch">
          <span className="rep-login__tag">
            <span className="rep-login__tag-dot" aria-hidden="true" />
            Rep Portal · Live
          </span>
          <h1 className="rep-login__title">
            Welcome back.
          </h1>
          <p className="rep-login__sub">
            The field tool our team runs on every day — live territory map, knock logging, follow-ups, and weekly commission statements. All in one place.
          </p>
          <ul className="rep-login__list">
            {[
              "Your territory, mapped — every lead pinned and statused",
              "Log knocks, outcomes, and callbacks at the door",
              "This morning’s follow-ups, sorted and ready",
              "Weekly commission statements — no surprises"
            ].map(function(line) {
              return (
                <li key={line}>
                  <span className="rep-login__check" aria-hidden="true">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="5 12 10 17 19 8"/></svg>
                  </span>
                  {line}
                </li>
              );
            })}
          </ul>
        </div>
      </aside>

      {/* Right panel — the portal lives on its own subdomain; link straight to it */}
      <div className="rep-login__panel">
        <div className="rep-login__card">
          <h2 className="rep-login__heading">Rep Sign In</h2>
          <p className="rep-login__helper">
            The Rep Portal is our field team&rsquo;s daily tool — live territory map, knock logging, follow-ups, and weekly commission statements. Sign in happens on the portal itself.
          </p>
          <a
            href={PORTAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-blue rep-login__submit"
            style={{ textDecoration: "none" }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11 V7 A4 4 0 0 1 16 7 V11"/></svg>
            Open the Rep Portal
            <span aria-hidden="true">→</span>
          </a>
          <p className="rep-login__notice">
            No account yet? <a href="/careers" onClick={function(e) { handleNavClick(e, props.go, "careers"); }}>Apply to join the team</a> — access is set up during onboarding. Trouble signing in? Email <strong style={{ color: INK }}>info@homefrontsolutionsllc.com</strong>.
          </p>
        </div>
        <p className="rep-login__footer">© 2026 Home Front Solutions LLC · <a href="/privacy" onClick={function(e) { handleNavClick(e, props.go, "privacy"); }}>Privacy</a> · <a href="/terms" onClick={function(e) { handleNavClick(e, props.go, "terms"); }}>Terms</a></p>
      </div>
    </section>
  );
}

// Build-time dates so Google for Jobs sees fresh postings every deploy.
// datePosted rotates to the most recent Monday (<= 30 days old), validThrough stays 90 days forward.
function getJobDates() {
  var now = new Date();
  var day = now.getDay();
  var daysBackToMonday = day === 0 ? 6 : day - 1;
  var posted = new Date(now.getFullYear(), now.getMonth(), now.getDate() - daysBackToMonday);
  var valid = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 90);
  function iso(d) { return d.toISOString().slice(0, 10); }
  return { datePosted: iso(posted), validThrough: iso(valid) + "T23:59" };
}

// Best-practice JobPosting schema per Google for Jobs requirements.
// Includes occupationalCategory, workHours, educationRequirements, directApply, identifier,
// baseSalary, benefits, and jobBenefits — the fields that lift into rich result eligibility.
function buildJobPostingSchema(job, siteOrigin, options) {
  options = options || {};
  var salary = getSalaryRange(job.earningRange);
  var dates = getJobDates();
  var url = options.url || (siteOrigin + getPathForRoute("job", job.slug));
  var employmentType = job.type === "Internship" ? "INTERN" : (job.type === "Contract" ? ["CONTRACTOR", "FULL_TIME"] : "FULL_TIME");
  var locCity = job.location.split(",")[0].trim();
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: "<p>" + job.overview + "</p>" +
      "<h3>Responsibilities</h3><ul>" + job.responsibilities.map(function(r) { return "<li>" + r + "</li>"; }).join("") + "</ul>" +
      "<h3>Qualifications</h3><ul>" + job.qualifications.map(function(r) { return "<li>" + r + "</li>"; }).join("") + "</ul>" +
      "<h3>Benefits</h3><ul>" + job.benefits.map(function(r) { return "<li>" + r + "</li>"; }).join("") + "</ul>",
    identifier: { "@type": "PropertyValue", name: "Home Front Solutions", value: job.slug },
    datePosted: dates.datePosted,
    validThrough: dates.validThrough,
    employmentType: employmentType,
    hiringOrganization: {
      "@type": "Organization",
      "@id": "https://www.homefrontsolutionsllc.com/#organization",
      name: "Home Front Solutions, LLC",
      sameAs: "https://www.homefrontsolutionsllc.com",
      logo: "https://www.homefrontsolutionsllc.com/logo.png"
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        streetAddress: locCity,
        addressLocality: locCity,
        addressRegion: "NC",
        postalCode: "27260",
        addressCountry: "US"
      }
    },
    baseSalary: {
      "@type": "MonetaryAmount",
      currency: "USD",
      value: { "@type": "QuantitativeValue", minValue: salary.min, maxValue: salary.max, unitText: "YEAR" }
    },
    occupationalCategory: "41-4012 Sales Representatives, Wholesale and Manufacturing",
    industry: "Telecommunications, Home Services, Door-to-Door Sales",
    workHours: "Monday to Saturday, flexible daytime and early-evening shifts",
    educationRequirements: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "high school"
    },
    experienceRequirements: job.title.toLowerCase().indexOf("lead") >= 0
      ? "Minimum 12 months door-to-door or field sales experience preferred."
      : { "@type": "OccupationalExperienceRequirements", monthsOfExperience: 0 },
    qualifications: job.qualifications.join(" "),
    responsibilities: job.responsibilities.join(" "),
    jobBenefits: job.benefits.join(" "),
    incentiveCompensation: "Uncapped commission paid weekly via direct deposit. Performance bonuses for top producers.",
    salaryCurrency: "USD",
    skills: "Door-to-door sales, customer acquisition, fiber internet sales, home services sales, cold approach, objection handling, CRM management",
    directApply: true,
    url: url,
    applicationContact: {
      "@type": "ContactPoint",
      email: "info@homefrontsolutionsllc.com",
      telephone: "+13364209379",
      contactType: "HR"
    }
  };
}

function buildSeoPayload(route) {
  var currentJob = route.slug ? JOBS.find(function(j) { return j.slug === route.slug; }) : null;
  var titles = {
    home: "Home Front Solutions | Nationwide Door-to-Door Sales Agency & Field Teams",
    "what-we-do": "Nationwide D2D Customer Acquisition | Home Front Solutions",
    "why-us": "Why Home Front Solutions | Nationwide Field Sales Agency",
    partners: "Home Service Categories We Represent | Home Front Solutions",
    careers: "Door-to-Door Sales Jobs — Nationwide Hiring | Home Front Solutions Careers",
    market: currentJob ? currentJob.title : "Local Field Sales Markets | Home Front Solutions Careers",
    insights: "D2D Sales Resources, Pay Guides, Industry Insights, and Career Articles | Home Front Solutions",
    article: "D2D Sales Insights | Home Front Solutions",
    contact: "Contact Home Front Solutions | Book a Call Nationwide",
    privacy: "Privacy Policy | Home Front Solutions",
    terms: "Terms of Service | Home Front Solutions",
    job: currentJob ? currentJob.title + " in " + currentJob.location + " | Home Front Solutions" : "Sales Jobs | Home Front Solutions",
    apply: currentJob ? "Apply for " + currentJob.title + " | Home Front Solutions Careers" : "Apply | Home Front Solutions Careers",
    "thank-you": "Application Received | Home Front Solutions Careers",
  };

  var descriptions = {
    home: "Nationwide door-to-door sales agency. Home Front Solutions builds professional field teams for fiber, home security, solar, water filtration, roofing, and home-service brands across the United States. Hiring reps nationwide with paid training and six-figure first-year earnings.",
    careers: "Door-to-door sales jobs nationwide. Home Front Solutions hires field reps across the United States for fiber, security, solar, and home services. Paid certification, weekly commission, and a clear path to team lead and area manager.",
    market: "Local sales jobs with a national D2D agency. Explore city-specific recruiting pages for Home Front Solutions in North Carolina and across our expanding U.S. markets.",
    insights: "Resources on door-to-door sales: pay structure, 1099 taxes, first 30 days, industry trends, fiber ISP coverage, and the path from new rep to area manager.",
    article: "Home Front Solutions insights on door-to-door sales, field careers, industry shifts, and how the money, culture, and career path actually work.",
    "what-we-do": "Nationwide door-to-door customer acquisition for home-service brands. Fiber internet, home security, solar, water filtration, roofing, and more.",
    "why-us": "An independent, nationwide field sales agency built for clean execution, trusted provider partnerships, and measurable customer acquisition performance.",
    partners: "The home-service and telecom brand categories Home Front Solutions supports across our nationwide field network.",
    contact: "Book a call with Home Front Solutions. Nationwide D2D field teams for fiber, security, solar, and home-service brands. One business day response.",
    privacy: "Read the Home Front Solutions privacy policy covering applicant, customer, and website data collection and use.",
    terms: "Review the Home Front Solutions terms covering website use, communications, applications, and service-related interactions.",
    job: currentJob ? currentJob.pitch + " View compensation, responsibilities, qualifications, and next steps." : "Explore open sales roles at Home Front Solutions.",
    apply: currentJob ? "Apply for the " + currentJob.title + " role in " + currentJob.location + ". The application takes about five minutes." : "Apply to Home Front Solutions.",
    "thank-you": currentJob ? "Your application for " + currentJob.title + " has been received by Home Front Solutions." : "Your application has been received.",
  };

  var currentMarket = route.name === "market" && route.slug ? MARKET_PAGES.find(function(item) { return item.slug === route.slug; }) : null;
  var currentArticle = route.name === "article" && route.slug ? ARTICLE_PAGES.find(function(item) { return item.slug === route.slug; }) : null;
  if (currentMarket) {
    titles.market = "D2D Sales Jobs in " + currentMarket.city + " | Home Front Solutions";
    descriptions.market = currentMarket.intro;
  }
  if (currentArticle) {
    titles.article = currentArticle.title + " | Home Front Solutions";
    descriptions.article = currentArticle.description;
  }

  var title = titles[route.name] || titles.home;
  var description = descriptions[route.name] || descriptions.home;
  var pagePath = getPathForRoute(route.name, route.slug);
  var siteOrigin = "https://www.homefrontsolutionsllc.com";
  var pageUrl = siteOrigin + pagePath;
  var socialImage = siteOrigin + "/og-image.jpg";
  var robotsValue = (route.name === "thank-you" || route.name === "apply")
    ? "noindex, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
    : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

  var localBizSchema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    "@id": "https://www.homefrontsolutionsllc.com/#business",
    name: "Home Front Solutions",
    legalName: "Home Front Solutions, LLC",
    url: siteOrigin,
    logo: siteOrigin + "/logo.jpg",
    image: socialImage,
    description: "Nationwide door-to-door marketing agency for home-service brands. Fiber internet, home security, solar, water filtration, and roofing customer acquisition across the United States. Headquartered in High Point, NC. Hiring field reps nationally.",
    telephone: "+13364209379",
    email: "info@homefrontsolutionsllc.com",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: "High Point",
      addressRegion: "NC",
      postalCode: "27260",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 35.9557,
      longitude: -80.0053,
    },
    areaServed: [
      { "@type": "Country", name: "United States" },
      { "@type": "City", name: "High Point", containedInPlace: { "@type": "State", name: "North Carolina" } },
      { "@type": "City", name: "Greensboro", containedInPlace: { "@type": "State", name: "North Carolina" } },
      { "@type": "City", name: "Winston-Salem", containedInPlace: { "@type": "State", name: "North Carolina" } },
      { "@type": "City", name: "Jamestown", containedInPlace: { "@type": "State", name: "North Carolina" } },
      { "@type": "City", name: "Kernersville", containedInPlace: { "@type": "State", name: "North Carolina" } },
    ],
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:00", closes: "20:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "10:00", closes: "18:00" },
    ],
    sameAs: [FACEBOOK_URL, LINKEDIN_URL, INSTAGRAM_URL],
    makesOffer: PARTNERS.map(function(p) {
      return { "@type": "Offer", itemOffered: { "@type": "Service", name: p + " customer acquisition and field sales support", areaServed: "United States" } };
    }),
  };

  var organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://www.homefrontsolutionsllc.com/#organization",
    name: "Home Front Solutions, LLC",
    url: siteOrigin,
    logo: siteOrigin + "/logo.jpg",
    foundingLocation: {
      "@type": "Place",
      name: "High Point, North Carolina"
    },
    founder: { "@id": "https://www.homefrontsolutionsllc.com/#muizz-muhammad" },
    sameAs: [FACEBOOK_URL, LINKEDIN_URL, INSTAGRAM_URL]
  };

  var founderSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://www.homefrontsolutionsllc.com/#muizz-muhammad",
    name: "Muizz Muhammad",
    jobTitle: "Founder",
    url: "https://www.linkedin.com/in/muizzmuhammad/",
    sameAs: ["https://www.linkedin.com/in/muizzmuhammad/"],
    image: "https://www.homefrontsolutionsllc.com/founder.jpg",
    worksFor: { "@id": "https://www.homefrontsolutionsllc.com/#business" }
  };

  var serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://www.homefrontsolutionsllc.com/#services",
    serviceType: "Door-to-door customer acquisition and field sales support",
    provider: { "@id": "https://www.homefrontsolutionsllc.com/#business" },
    areaServed: "United States",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Home Front Solutions service categories",
      itemListElement: PARTNERS.map(function(p) {
        return {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: p + " field sales support"
          }
        };
      })
    }
  };

  var websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://www.homefrontsolutionsllc.com/#website",
    url: siteOrigin,
    name: "Home Front Solutions",
    alternateName: ["Home Front Solutions, LLC", "HFS"],
    publisher: { "@id": "https://www.homefrontsolutionsllc.com/#business" },
    inLanguage: "en-US",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: siteOrigin + "/insights?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  var breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteOrigin + "/" },
    ],
  };
  if (route.name !== "home") {
    breadcrumbSchema.itemListElement.push({
      "@type": "ListItem",
      position: 2,
      name: title,
      item: pageUrl,
    });
  }

  var schemas = [localBizSchema, organizationSchema, websiteSchema, breadcrumbSchema, serviceSchema, founderSchema];

  if (route.name === "home" || route.name === "why-us") {
    // Each route's FAQPage schema maps over the array that is actually VISIBLE
    // on that page (home renders HOME_PAGE_FAQS; why-us renders HOME_FAQS).
    var faqSource = route.name === "home" ? HOME_PAGE_FAQS : HOME_FAQS;
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqSource.map(function(item) {
        return {
          "@type": "Question",
          name: item.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.a
          }
        };
      })
    });
  }

  if (route.name === "careers") {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Open Door-to-Door Sales Jobs — Home Front Solutions",
      url: pageUrl,
      description: descriptions.careers,
      about: { "@id": "https://www.homefrontsolutionsllc.com/#business" },
      isPartOf: { "@id": "https://www.homefrontsolutionsllc.com/#website" },
      mainEntity: {
        "@type": "ItemList",
        name: "Home Front Solutions Open Sales Jobs",
        itemListOrder: "https://schema.org/ItemListOrderAscending",
        numberOfItems: JOBS.length,
        itemListElement: JOBS.map(function(job, index) {
          return {
            "@type": "ListItem",
            position: index + 1,
            url: siteOrigin + getPathForRoute("job", job.slug),
            name: job.title + " - " + job.location,
          };
        })
      }
    });

    // Full JobPosting schema for each open role — Google for Jobs indexes the aggregator page itself
    JOBS.forEach(function(job) {
      schemas.push(buildJobPostingSchema(job, siteOrigin));
    });

    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "How are these roles structured?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "All current Home Front Solutions field sales roles listed on this site are performance-based opportunities built around production, coaching, and real field accountability."
          }
        },
        {
          "@type": "Question",
          name: "How quickly do you respond to applicants?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Qualified applicants typically hear back within 48 hours."
          }
        },
        {
          "@type": "Question",
          name: "Do I need prior sales experience?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Not always. Some roles are open to coachable applicants without prior sales experience, and training is provided."
          }
        }
      ]
    });
  }

  if (route.name === "market" && currentMarket) {
    var marketJobs = JOBS.filter(function(job) {
      var city = currentMarket.city.toLowerCase();
      var location = job.location.toLowerCase();
      return city.indexOf(location.replace(", nc", "")) !== -1
        || location.indexOf(currentMarket.region.toLowerCase()) !== -1
        || currentMarket.region === "Piedmont Triad";
    });
    if (!marketJobs.length) {
      marketJobs = JOBS.slice(0, 3);
    }

    schemas.push({
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: currentMarket.title,
      url: pageUrl,
      description: currentMarket.intro,
      about: {
        "@type": "Thing",
        name: currentMarket.city + " field sales recruiting and home services hiring"
      }
    });

    schemas.push({
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: currentMarket.city + " open field sales roles",
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      numberOfItems: marketJobs.length,
      itemListElement: marketJobs.map(function(job, index) {
        return {
          "@type": "ListItem",
          position: index + 1,
          url: siteOrigin + getPathForRoute("job", job.slug),
          name: job.title + " - " + job.location
        };
      })
    });

    marketJobs.forEach(function(job) {
      schemas.push(buildJobPostingSchema(job, siteOrigin));
    });

    if (MARKET_FAQS[currentMarket.slug] && MARKET_FAQS[currentMarket.slug].length) {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: MARKET_FAQS[currentMarket.slug].map(function(item) {
          return {
            "@type": "Question",
            name: item.q,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.a
            }
          };
        })
      });
    }
  }

  if (route.name === "insights") {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Home Front Solutions Insights",
      url: pageUrl,
      description: descriptions.insights,
      hasPart: ARTICLE_PAGES.map(function(article) {
        return {
          "@type": "Article",
          headline: article.title,
          url: siteOrigin + getPathForRoute("article", article.slug)
        };
      })
    });
  }

  if (route.name === "article" && currentArticle) {
    var publishedDate = currentArticle.publishedDate || "2026-04-10";
    var modifiedDate = currentArticle.modifiedDate || publishedDate;
    var authorName = currentArticle.authorName || "Muizz Muhammad";
    schemas.push({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: currentArticle.title,
      description: currentArticle.description,
      image: socialImage,
      datePublished: publishedDate,
      dateModified: modifiedDate,
      articleSection: currentArticle.eyebrow,
      author: {
        "@type": "Person",
        "@id": "https://www.homefrontsolutionsllc.com/#founder",
        name: authorName,
        jobTitle: "Founder, Home Front Solutions",
        url: "https://www.linkedin.com/in/muizzmuhammad/",
        sameAs: ["https://www.linkedin.com/in/muizzmuhammad/"]
      },
      publisher: {
        "@id": "https://www.homefrontsolutionsllc.com/#business"
      },
      mainEntityOfPage: pageUrl,
      inLanguage: "en-US",
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: ["h1", "h1 + p", ".drop-cap"]
      }
    });
  }

  if (route.name === "why-us") {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "AboutPage",
      name: "About Home Front Solutions",
      url: pageUrl,
      about: { "@id": "https://www.homefrontsolutionsllc.com/#organization" },
      description: "About Home Front Solutions, including founder, company focus, field-sales recruiting, and home-services growth model."
    });
  }

  if (route.name === "job" && route.slug) {
    var job = JOBS.find(function(j) { return j.slug === route.slug; });
    if (job) {
      var salary = getSalaryRange(job.earningRange);
      schemas.push(buildJobPostingSchema(job, siteOrigin, { url: pageUrl }));

      // Job-specific FAQ — applicant questions that search surfaces beautifully
      schemas.push({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "What does the " + job.title + " role pay?",
            acceptedAnswer: { "@type": "Answer", text: job.pitch + " Expected first-year earnings range from " + job.earningRange + " per year based on activations. Paid weekly via direct deposit. Uncapped commission." }
          },
          {
            "@type": "Question",
            name: "Do I need prior sales experience?",
            acceptedAnswer: { "@type": "Answer", text: (job.title.toLowerCase().indexOf("lead") >= 0 ? "Yes — 12+ months of door-to-door or field sales experience is required for this leadership role." : "No. We hire for drive and coachability. Most of our top reps started with zero sales experience. Full paid certification before your first real door.") }
          },
          {
            "@type": "Question",
            name: "How fast can I start?",
            acceptedAnswer: { "@type": "Answer", text: "Most candidates move from application to a phone screen within 48 hours and can start certification inside two weeks. We respond to every qualified applicant within one business day." }
          },
          {
            "@type": "Question",
            name: "What's the career path?",
            acceptedAnswer: { "@type": "Answer", text: "Field Rep → Team Lead (team override + personal pipeline, typically earned in 12 months) → Area Manager ($250K+ range, 12 to 18 months). Promotion is production-based, not time-based. Every manager at Home Front was promoted out of the field." }
          },
          {
            "@type": "Question",
            name: "Is this a W-2 or 1099 role?",
            acceptedAnswer: { "@type": "Answer", text: (job.type === "Internship" ? "Internship roles are performance-based with a stipend plus earned commission. Paid as 1099." : "All current field roles are paid as 1099 independent contractor positions with uncapped weekly commission. You're in business for yourself, with our training, territory, and support behind you.") }
          }
        ]
      });
    }
  }

  var meta = [
    { name: "description", content: description },
    { name: "robots", content: robotsValue },
    { name: "googlebot", content: robotsValue },
    { name: "author", content: "Home Front Solutions, LLC" },
    { name: "publisher", content: "Home Front Solutions, LLC" },
    { name: "theme-color", content: "#3B5D7C" },
    { name: "apple-mobile-web-app-title", content: "Home Front" },
    { name: "application-name", content: "Home Front Solutions" },
    { name: "format-detection", content: "telephone=yes" },
    { name: "geo.region", content: "US-NC" },
    { name: "geo.placename", content: "High Point" },
    { name: "geo.position", content: "35.9557;-80.0053" },
    { name: "ICBM", content: "35.9557, -80.0053" },
    { name: "keywords", content: "nationwide door to door sales agency, national D2D agency, field sales outsourcing, fiber sales agency, home security D2D, solar D2D, home services customer acquisition, national field sales company, D2D sales jobs, door to door sales jobs near me, fiber sales rep jobs, six figure sales jobs, paid training sales jobs, sales internship jobs, 1099 sales rep, Charlotte sales jobs, Raleigh sales jobs, Greensboro sales jobs, High Point sales jobs, nationwide hiring, Home Front Solutions" },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: route.name === "job" || route.name === "article" ? "article" : "website" },
    { property: "og:site_name", content: "Home Front Solutions" },
    { property: "og:locale", content: "en_US" },
    { property: "og:url", content: pageUrl },
    { property: "og:image", content: socialImage },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:alt", content: "Home Front Solutions. National field sales and home services company" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:url", content: pageUrl },
    { name: "twitter:image", content: socialImage },
    { name: "twitter:image:alt", content: "Home Front Solutions. National field sales and home services company" },
    { name: "twitter:site", content: "@homefrontllc" },
  ];

  // Article-specific OpenGraph tags (Google + Facebook + LinkedIn freshness signals)
  if (route.name === "article" && currentArticle) {
    var articlePublished = currentArticle.publishedDate || "2026-04-10";
    var articleModified = currentArticle.modifiedDate || articlePublished;
    var articleAuthor = currentArticle.authorName || "Muizz Muhammad";
    meta.push({ property: "article:published_time", content: articlePublished });
    meta.push({ property: "article:modified_time", content: articleModified });
    meta.push({ property: "article:author", content: articleAuthor });
    meta.push({ property: "article:section", content: currentArticle.eyebrow });
    meta.push({ property: "article:publisher", content: "https://www.homefrontsolutionsllc.com/" });
  }

  return {
    title: title,
    description: description,
    path: pagePath,
    pageUrl: pageUrl,
    socialImage: socialImage,
    robots: robotsValue,
    meta: meta,
    schemas: schemas,
  };
}

export function getSeoForPath(pathname) {
  return buildSeoPayload(getRouteFromPath(pathname));
}

export function getPrerenderPaths() {
  return []
    .concat([
      "/",
      "/what-we-do",
      "/why-us",
      "/partners",
      "/careers",
      "/contact",
      "/privacy",
      "/terms",
      "/insights",
    ])
    .concat(MARKET_PAGES.map(function(item) { return getPathForRoute("market", item.slug); }))
    .concat(ARTICLE_PAGES.map(function(item) { return getPathForRoute("article", item.slug); }))
    .concat(JOBS.map(function(job) { return getPathForRoute("job", job.slug); }))
    .concat(JOBS.map(function(job) { return getPathForRoute("apply", job.slug); }));
}

export function getJobsForAutomation() {
  var siteOrigin = "https://www.homefrontsolutionsllc.com";
  return JOBS.map(function(job) {
    var salary = getSalaryRange(job.earningRange);
    var dates = getJobDates();
    return {
      id: job.slug,
      title: job.title,
      slug: job.slug,
      location: job.location,
      employmentType: job.type === "Internship" ? "INTERN" : "CONTRACTOR",
      category: "Field Sales",
      datePosted: dates.datePosted,
      validThrough: dates.validThrough,
      description: job.overview,
      shortPitch: job.pitch,
      responsibilities: job.responsibilities.slice(),
      qualifications: job.qualifications.slice(),
      benefits: job.benefits.slice(),
      salary: {
        min: salary.min,
        max: salary.max,
        currency: "USD",
        unitText: "YEAR",
      },
      applyUrl: siteOrigin + getPathForRoute("apply", job.slug),
      detailUrl: siteOrigin + getPathForRoute("job", job.slug),
      company: {
        name: "Home Front Solutions, LLC",
        website: siteOrigin,
        email: "info@homefrontsolutionsllc.com",
        phone: "+13364209379",
      },
    };
  });
}

export default function App(props) {
  props = props || {};
  var siteOrigin = "https://www.homefrontsolutionsllc.com";
  var initialPath = props.initialPath || (typeof window !== "undefined" ? window.location.pathname : "/");
  var staticMode = !!props.staticMode;
  var _r = useState(function() { return getRouteFromPath(initialPath); });
  var route = _r[0];
  var setRoute = _r[1];

  useEffect(function() {
    if (staticMode || typeof window === "undefined") return;
    function handlePopState() {
      setRoute(getRouteFromPath(window.location.pathname));
    }
    window.addEventListener("popstate", handlePopState);
    return function() {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  useEffect(function() {
    if (staticMode || typeof window === "undefined" || typeof document === "undefined") return;
    // Mobile browsers can keep focus on the tapped control during SPA navigation,
    // which sometimes causes the viewport to jump to the bottom. Clear it and
    // force the new route to settle at the top after layout has updated.
    if (document.activeElement && typeof document.activeElement.blur === "function") {
      document.activeElement.blur();
    }
    var rafId = window.requestAnimationFrame(function() {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    });
    var timeoutId = window.setTimeout(function() {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }, 60);
    return function() {
      window.cancelAnimationFrame(rafId);
      window.clearTimeout(timeoutId);
    };
  }, [route.name, route.slug]);

  useRevealOnScroll([route.name, route.slug]);
  useHoverPrefetch();
  useScrollHue();

  // SEO: Update document title and meta tags per route
  useEffect(function() {
    if (staticMode || typeof document === "undefined") return;
    var seo = buildSeoPayload(route);
    document.title = seo.title;

    function setMeta(name, content, isProperty) {
      var attr = isProperty ? "property" : "name";
      var el = document.querySelector("meta[" + attr + "='" + name + "']");
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    }

    seo.meta.forEach(function(item) {
      setMeta(item.property || item.name, item.content, !!item.property);
    });

    // Apple touch icon
    var atiEl = document.querySelector("link[rel='apple-touch-icon']");
    if (!atiEl) {
      atiEl = document.createElement("link");
      atiEl.setAttribute("rel", "apple-touch-icon");
      document.head.appendChild(atiEl);
    }
    atiEl.setAttribute("href", siteOrigin + "/apple-touch-icon.png");

    // Inject all schemas
    var existing = document.getElementById("ld-json");
    if (existing) existing.remove();
    var script = document.createElement("script");
    script.id = "ld-json";
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(seo.schemas);
    document.head.appendChild(script);

    // Canonical URL
    var canonicalEl = document.querySelector("link[rel='canonical']");
    if (!canonicalEl) {
      canonicalEl = document.createElement("link");
      canonicalEl.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute("href", seo.pageUrl);
  }, [route.name, route.slug, staticMode]);

  function go(name, slug) {
    var nextRoute = { name: name, slug: slug || null };
    var nextPath = getPathForRoute(nextRoute.name, nextRoute.slug);
    if (typeof document === "undefined" || typeof window === "undefined") {
      setRoute(nextRoute);
      return;
    }
    if (document.activeElement && typeof document.activeElement.blur === "function") {
      document.activeElement.blur();
    }
    if (window.location.pathname !== nextPath) {
      window.history.pushState(nextRoute, "", nextPath);
    }
    setRoute(nextRoute);
  }

  var rootBg = PAPER;
  return (
    <div style={{ fontFamily: "'Aptos', 'Segoe UI', system-ui, sans-serif", background: rootBg, color: INK, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        ::selection { background: rgba(59,93,124,0.18); }
        a { text-decoration: none; color: inherit; }
        body { -webkit-font-smoothing: antialiased; }
        input:focus, select:focus, textarea:focus { border-color: ${INK} !important; }
        button:focus-visible { outline: 2px solid ${SIGNAL}; outline-offset: 2px; }
        .lift-card {
          transition: transform 420ms cubic-bezier(0.16, 1, 0.3, 1),
                      box-shadow 420ms cubic-bezier(0.16, 1, 0.3, 1),
                      border-color 260ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
          transform-origin: center;
        }
        .lift-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 44px rgba(46,109,92,0.1);
          border-color: rgba(46,109,92,0.24) !important;
        }
        .interactive-panel {
          position: relative;
          overflow: hidden;
        }
        .interactive-panel::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(120deg, rgba(255,255,255,0) 10%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0) 90%);
          transform: translateX(-120%);
          transition: transform 600ms cubic-bezier(0.22, 1, 0.36, 1);
          pointer-events: none;
        }
        .interactive-panel:hover::after {
          transform: translateX(120%);
        }
        .interactive-arrow {
          display: inline-block;
          transition: transform 220ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .interactive-panel:hover .interactive-arrow,
        .interactive-pill:hover .interactive-arrow {
          transform: translateX(4px);
        }
        .interactive-pill {
          transition: transform 220ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 220ms ease, border-color 220ms ease, background-color 220ms ease;
        }
        .interactive-pill:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 24px rgba(14,14,12,0.08);
          border-color: rgba(59,93,124,0.22) !important;
        }
        @media (max-width: 767px) {
          .lift-card:hover {
            transform: none;
            box-shadow: 0 10px 24px rgba(14,14,12,0.05);
          }
          .interactive-panel::after,
          .interactive-panel:hover::after {
            transform: none;
          }
          .interactive-panel:hover .interactive-arrow,
          .interactive-pill:hover .interactive-arrow,
          .interactive-pill:hover {
            transform: none;
          }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.6); }
        }
        @keyframes pageFadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .page-enter {
          animation: pageFadeIn 520ms cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        @media (prefers-reduced-motion: reduce) {
          .page-enter { animation: none; }
        }
      `}</style>

      {/* a11y: skip to main content for keyboard + screen reader users */}
      <a href="#main" className="skip-link" onClick={function(e) {
        e.preventDefault();
        var m = document.getElementById("main");
        if (m) { m.setAttribute("tabindex", "-1"); m.focus(); m.scrollIntoView({ behavior: "smooth", block: "start" }); }
      }}>Skip to main content</a>

      <ScrollProgress />
      {route.name !== "rep-login" && <Header go={go} route={route} onDark={false} />}

      <main id="main" key={route.name + "-" + (route.slug || "_")} className="page-enter" style={{ flex: 1, background: PAPER, outline: "none" }}>
        {route.name === "home" && <HomePage go={go} />}
        {route.name === "what-we-do" && <WhatWeDoPage go={go} />}
        {route.name === "why-us" && <WhyUsPage go={go} />}
        {route.name === "partners" && <PartnersPage go={go} />}
        {route.name === "careers" && <CareersIndexPage go={go} />}
        {route.name === "market" && <MarketPage go={go} slug={route.slug} />}
        {route.name === "insights" && <InsightsIndexPage go={go} />}
        {route.name === "article" && <ArticlePage go={go} slug={route.slug} />}
        {route.name === "job" && <JobDetailPage go={go} slug={route.slug} />}
        {route.name === "apply" && <ApplyPage go={go} slug={route.slug} />}
        {route.name === "thank-you" && <ThankYouPage go={go} slug={route.slug} />}
        {route.name === "contact" && <ContactPage go={go} />}
        {route.name === "privacy" && <PrivacyPage go={go} />}
        {route.name === "terms" && <TermsPage go={go} />}
        {route.name === "rep-login" && <RepLoginPage go={go} />}
      </main>

      {route.name !== "rep-login" && <Footer go={go} />}

      {/* Floating scroll-to-top — fades in after ~600 px of scroll */}
      {route.name !== "rep-login" && <ScrollTop />}

      {/* Sticky mobile CTA dock — phones only, hides when native nav menu is open */}
      {route.name !== "rep-login" && <MobileStickyCTA go={go} route={route} />}
    </div>
  );
}
