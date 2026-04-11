// @ts-nocheck
import { useState, useEffect } from "react";

var PAPER = "#FAFAF7";
var SURF = "#FFFFFF";
var SURF2 = "#F4F0E8";
var INK = "#0E0E0C";
var RULE = "#DFD7CA";
var MUTED = "#6B6960";
var MUTED2 = "#9B9890";
var SIGNAL = "#1F5B63";
var SIGNAL_SOFT = "#E8F3F2";
var BLUE = "#153F46";
var BLUE_SOFT = "#EAF3F1";
var FOREST = "#2E6E69";
var FOREST_SOFT = "#E8F4F0";
var GOLD = "#C48A47";
var GOLD_SOFT = "#F6E8D5";
var LOGO = "/logo-128.png";
var INSTAGRAM_URL = "https://www.instagram.com/homefrontsolutions/";
var LINKEDIN_URL = "https://www.linkedin.com/company/home-front-solutions";
var FACEBOOK_URL = "https://www.facebook.com/homefrontsolutionsllc";

var serif = { fontFamily: "'Iowan Old Style', 'Palatino Linotype', 'Book Antiqua', Georgia, serif", fontWeight: 500, letterSpacing: "-0.025em" };

var PARTNERS = ["Fiber Internet", "Home Security", "Solar", "Water Filtration", "Roofing", "Home Services"];
var FIBER_PROVIDERS = ["AT&T Fiber", "T-Mobile Fiber", "Astound", "Brightspeed", "Frontier", "Google Fiber", "Lumos", "MetroNet", "GoNetspeed", "Starlink"];

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
    title: "Fiber Sales Jobs in Raleigh, NC",
    headline: "Raleigh fiber sales jobs and telecom recruiting in one focused page.",
    intro: "Raleigh is another competitive North Carolina market where generic statewide copy will not rank well. This page gives Home Front Solutions a focused landing page for Raleigh fiber sales jobs, Raleigh telecom sales jobs, Raleigh field sales jobs, and local field recruiting queries.",
    localAngle: "The value here is creating a strong, indexable Raleigh page that matches how people actually search for jobs in the Triangle, rather than relying on one broad careers page to cover every city.",
    highlights: [
      "Raleigh-targeted recruiting page for fiber sales jobs and telecom sales jobs",
      "Clear field-role expectations and performance standards",
      "Built to support broader regional search coverage across North Carolina"
    ],
    paragraphs: [
      "Raleigh is another market where broad statewide copy is too weak on its own. Searchers in Raleigh often expect location-specific pages, clearer market relevance, and internal links that prove the site has a real content structure rather than a single careers page trying to do everything.",
      "This page helps build that structure. It gives Raleigh its own recruiting destination while supporting broader North Carolina coverage and helping crawlers understand that Home Front Solutions is building visibility across multiple local markets.",
      "That matters for searches like Raleigh sales jobs, Raleigh telecom jobs, Raleigh entry-level sales jobs, and Raleigh field positions, where users want to see a page that reflects the city directly before they trust the site enough to apply."
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
    "raleigh-nc": ["best-entry-level-sales-jobs-in-raleigh-nc", "how-to-start-in-field-sales-with-no-experience", "telecom-industry-basics-for-fiber-sales-reps", "why-d2d-after-high-school-or-college"]
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
    "sales-internship-college-students": ["sales-internship-for-college-students", "best-summer-sales-job-for-18-to-25", "best-summer-sales-internship-in-charlotte"]
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
    "how-to-start-in-field-sales-with-no-experience": ["why-d2d-after-high-school-or-college", "how-to-win-your-first-30-days-in-d2d", "what-makes-a-good-door-to-door-rep"]
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
  return "/";
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
  return <p className="text-xs uppercase mb-5" style={{ color: MUTED, letterSpacing: "0.18em", fontWeight: 600 }}>{props.children}</p>;
}

function LogoMark() {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
      <path d="M4 14L16 5L28 14V26H20V18H12V26H4V14Z" stroke={INK} strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

function Header(props) {
  var _m = useState(false); var open = _m[0]; var setOpen = _m[1];
  var nav = [
    { route: "what-we-do", label: "Services" },
    { route: "why-us", label: "Why Us" },
    { route: "partners", label: "Partners" },
    { route: "careers", label: "Careers" },
    { route: "insights", label: "Insights" },
  ];
  return (
    <header style={{ background: PAPER, position: "sticky", top: 0, zIndex: 50 }}>
      <div style={{ borderBottom: "1px solid " + RULE }}>
        <div className="max-w-[1240px] mx-auto px-5 md:px-10 h-[68px] md:h-[72px] flex items-center justify-between">
          <button onClick={function() { props.go("home"); }} className="flex items-center gap-3" style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
            <span style={{ width: 44, height: 44, borderRadius: 12, background: "linear-gradient(180deg, #FFFFFF 0%, " + SIGNAL_SOFT + " 100%)", border: "1px solid rgba(31,91,99,0.14)", display: "inline-flex", alignItems: "center", justifyContent: "center", boxShadow: "0 10px 22px rgba(21,63,70,0.08)" }}>
              <img src={LOGO} alt="Home Front Solutions logo" style={{ width: 34, height: 34, borderRadius: 8, objectFit: "cover" }} />
            </span>
            <span style={{ ...serif, fontSize: 19, color: INK, lineHeight: 1, fontWeight: 600 }}>Home Front Solutions</span>
          </button>
          <nav className="hidden md:flex items-center gap-9">
            {nav.map(function(item) {
              return (
                <button key={item.route} onClick={function() { props.go(item.route); }} className="text-sm hover:opacity-70 transition-opacity" style={{ color: INK, background: "none", border: "none", cursor: "pointer", padding: 0, fontWeight: 500 }}>
                  {item.label}
                </button>
              );
            })}
            <button onClick={function() { props.go("contact"); }} className="text-sm font-semibold px-5 py-2.5 rounded-md hover:opacity-90 transition-opacity" style={{ background: INK, color: PAPER, border: "none", cursor: "pointer" }}>
              Contact Sales
            </button>
          </nav>
          <button onClick={function() { setOpen(!open); }} className="md:hidden p-1" style={{ background: "none", border: "none" }} aria-label={open ? "Close navigation menu" : "Open navigation menu"} aria-expanded={open}>
            {open
              ? <svg width="22" height="22" viewBox="0 0 24 24"><path d="M7 7L17 17M17 7L7 17" stroke={INK} strokeWidth="1.5" strokeLinecap="round" /></svg>
              : <svg width="22" height="22" viewBox="0 0 24 24"><path d="M4 8H20M4 14H14" stroke={INK} strokeWidth="1.5" strokeLinecap="round" /></svg>}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden" style={{ borderTop: "1px solid " + RULE }}>
          <div className="px-6 py-6 flex flex-col">
            {nav.map(function(item) {
              return (
                <button key={item.route} onClick={function() { setOpen(false); props.go(item.route); }} className="text-left text-lg" style={{ borderBottom: "1px solid " + RULE, color: INK, background: "none", padding: "14px 0", cursor: "pointer", fontWeight: 500 }}>
                  {item.label}
                </button>
              );
            })}
            <button onClick={function() { setOpen(false); props.go("contact"); }} className="mt-6 text-center font-semibold py-3.5 rounded-md" style={{ background: INK, color: PAPER, border: "none", cursor: "pointer" }}>
              Contact Sales
            </button>
            <div className="mt-6 flex items-center gap-4 text-sm">
              <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" style={{ color: SIGNAL, fontWeight: 600 }}>Instagram</a>
              <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" style={{ color: SIGNAL, fontWeight: 600 }}>LinkedIn</a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function Footer(props) {
  return (
    <footer style={{ borderTop: "1px solid " + RULE, background: SURF, marginTop: 80 }}>
      <div className="max-w-[1240px] mx-auto px-5 md:px-10 py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-10">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2.5 mb-5">
              <img src={LOGO} alt="Home Front Solutions logo" style={{ width: 46, height: 46, borderRadius: 10, objectFit: "cover", boxShadow: "0 10px 24px rgba(21,63,70,0.12)" }} />
              <span style={{ ...serif, fontSize: 19, fontWeight: 600 }}>Home Front Solutions</span>
            </div>
            <p className="text-sm leading-relaxed max-w-sm" style={{ color: MUTED }}>
              A door-to-door marketing company helping homeowners buy better essential services, from fiber and security to solar, water filtration, and roofing.
            </p>
            <div className="flex flex-wrap items-center gap-3 mt-5">
              {[
                ["Instagram", INSTAGRAM_URL],
                ["LinkedIn", LINKEDIN_URL],
                ["Facebook", FACEBOOK_URL]
              ].map(function(item) {
                return (
                  <a key={item[0]} href={item[1]} target="_blank" rel="noreferrer" className="interactive-pill inline-flex items-center px-3 py-2 rounded-full text-xs font-semibold" style={{ color: SIGNAL, background: SIGNAL_SOFT, border: "1px solid rgba(31,91,99,0.16)" }}>
                    {item[0]}
                  </a>
                );
              })}
            </div>
          </div>

          <div className="md:col-span-2">
            <p className="text-xs uppercase mb-4" style={{ color: INK, letterSpacing: "0.15em", fontWeight: 700 }}>Company</p>
            <ul className="space-y-2.5 text-sm">
              <li><button onClick={function() { props.go("what-we-do"); }} style={{ color: MUTED, background: "none", border: "none", cursor: "pointer", padding: 0 }}>Services</button></li>
              <li><button onClick={function() { props.go("why-us"); }} style={{ color: MUTED, background: "none", border: "none", cursor: "pointer", padding: 0 }}>Why Us</button></li>
              <li><button onClick={function() { props.go("partners"); }} style={{ color: MUTED, background: "none", border: "none", cursor: "pointer", padding: 0 }}>Partners</button></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="text-xs uppercase mb-4" style={{ color: INK, letterSpacing: "0.15em", fontWeight: 700 }}>Careers</p>
            <ul className="space-y-2.5 text-sm">
              <li><button onClick={function() { props.go("careers"); }} style={{ color: MUTED, background: "none", border: "none", cursor: "pointer", padding: 0 }}>Open Positions</button></li>
              <li><button onClick={function() { props.go("careers"); }} style={{ color: MUTED, background: "none", border: "none", cursor: "pointer", padding: 0 }}>How We Hire</button></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="text-xs uppercase mb-4" style={{ color: INK, letterSpacing: "0.15em", fontWeight: 700 }}>Insights</p>
            <ul className="space-y-2.5 text-sm">
              {ARTICLE_PAGES.slice(0, 5).map(function(article) {
                return (
                  <li key={article.slug}>
                    <button onClick={function() { props.go("article", article.slug); }} style={{ color: MUTED, background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                      {article.title}
                    </button>
                  </li>
                );
              })}
              <li><button onClick={function() { props.go("insights"); }} style={{ color: INK, background: "none", border: "none", cursor: "pointer", padding: 0, fontWeight: 600 }}>View All Insights</button></li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="text-xs uppercase mb-4" style={{ color: INK, letterSpacing: "0.15em", fontWeight: 700 }}>Markets</p>
            <ul className="space-y-2.5 text-sm mb-6">
              {MARKET_PAGES.slice(0, 6).map(function(market) {
                return (
                  <li key={market.slug}>
                    <button onClick={function() { props.go("market", market.slug); }} style={{ color: MUTED, background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                      {market.region} Jobs
                    </button>
                  </li>
                );
              })}
            </ul>
            <p className="text-xs uppercase mb-4" style={{ color: INK, letterSpacing: "0.15em", fontWeight: 700 }}>Contact</p>
            <ul className="space-y-2.5 text-sm" style={{ color: MUTED }}>
              <li><a href="mailto:info@homefrontsolutionsllc.com" className="hover:opacity-70 transition-opacity" style={{ color: MUTED }}>info@homefrontsolutionsllc.com</a></li>
              <li><a href="tel:3364209379" className="hover:opacity-70 transition-opacity" style={{ color: MUTED }}>(336) 420-9379</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-2" style={{ borderTop: "1px solid " + RULE }}>
          <div className="text-xs" style={{ color: MUTED }}>© 2026 Home Front Solutions, LLC. All rights reserved.</div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-xs" style={{ color: MUTED }}>
            <button onClick={function() { props.go("privacy"); }} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, color: MUTED }}>Privacy Policy</button>
            <button onClick={function() { props.go("terms"); }} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, color: MUTED }}>Terms of Service</button>
            <span>Equal Opportunity Employer</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function HomePage(props) {
  var learningTracks = [
    {
      slug: "d2d-psychology",
      kicker: "Sales Psychology",
      blurb: "Learn how strong reps manage rejection, keep emotional control, and build trust faster at the door."
    },
    {
      slug: "why-d2d-after-high-school-or-college",
      kicker: "Career Path",
      blurb: "See why D2D can be a stronger early-career move than low-ceiling hourly work or generic internships."
    },
    {
      slug: "1099-taxes-for-door-to-door-sales-reps",
      kicker: "Money & Discipline",
      blurb: "Understand how smart reps plan ahead, track income, and stay organized when the pay is performance-based."
    },
    {
      slug: "telecom-industry-basics-for-fiber-sales-reps",
      kicker: "Industry Basics",
      blurb: "Get the simple version of how providers, field teams, homeowners, and service categories fit together."
    }
  ];
  return (
    <>
      {/* HERO */}
      <section
        className="max-w-[1240px] mx-auto px-5 md:px-10 pt-10 md:pt-18 pb-14 md:pb-22"
        style={{ background: "radial-gradient(circle at top left, rgba(31,91,99,0.14), transparent 30%), radial-gradient(circle at top right, rgba(196,138,71,0.1), transparent 34%), linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(250,250,247,0.5) 58%, rgba(250,250,247,0) 100%)" }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 lg:gap-16">
          <div className="lg:col-span-8">
            <h1 style={{ ...serif, fontSize: "clamp(2.75rem, 6.5vw, 5rem)", lineHeight: 0.98 }}>
              Home services growth, built face to face and scaled market by market.
            </h1>
            <p className="mt-6 md:mt-8 text-lg md:text-xl max-w-2xl leading-relaxed" style={{ color: MUTED }}>
              Home Front Solutions helps brands grow through disciplined field execution and gives ambitious reps a real path to earn, improve, and lead.
            </p>
            <div className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-3">
              <button onClick={function() { props.go("contact"); }} className="inline-flex items-center justify-center px-7 py-4 rounded-md font-semibold hover:opacity-90 transition-opacity" style={{ background: "linear-gradient(135deg, #11120F 0%, #233447 100%)", color: PAPER, border: "none", cursor: "pointer", minHeight: 54, boxShadow: "0 16px 34px rgba(14,14,12,0.18)" }} aria-label="Schedule a discovery call with our sales team">
                Schedule a Discovery Call
              </button>
              <button onClick={function() { props.go("careers"); }} className="inline-flex items-center justify-center px-7 py-4 rounded-md font-semibold transition-colors" style={{ background: "rgba(255,255,255,0.8)", color: INK, border: "1px solid rgba(14,14,12,0.16)", cursor: "pointer", minHeight: 54, boxShadow: "0 10px 24px rgba(14,14,12,0.06)" }} onMouseEnter={function(e) { e.currentTarget.style.background = INK; e.currentTarget.style.color = PAPER; }} onMouseLeave={function(e) { e.currentTarget.style.background = "rgba(255,255,255,0.8)"; e.currentTarget.style.color = INK; }} aria-label="View our open sales positions">
                View Open Positions
              </button>
            </div>
          </div>

          <aside className="lg:col-span-4">
            <div className="p-5 md:p-7 h-full" style={{ background: "linear-gradient(160deg, " + SIGNAL_SOFT + " 0%, #FFFFFF 42%, " + SURF + " 100%)", border: "1px solid rgba(31,91,99,0.12)", borderRadius: 24, boxShadow: "0 24px 52px rgba(14,14,12,0.08)" }}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5" style={{ background: "#FFFFFF", border: "1px solid rgba(59,93,124,0.12)" }}>
                <span className="text-[10px] uppercase" style={{ color: SIGNAL, letterSpacing: "0.16em", fontWeight: 800 }}>From Our Founder</span>
              </div>
              <p className="leading-[1.65] mb-5" style={{ ...serif, fontSize: 20, color: INK }}>
                "Great service starts with a face-to-face conversation. Every customer deserves to understand exactly what they are buying, and every rep we send to a door is trained to make that conversation clear."
              </p>
              <div style={{ width: 40, height: 2, background: "linear-gradient(90deg, " + SIGNAL + " 0%, rgba(59,93,124,0.14) 100%)", borderRadius: 999, marginBottom: 16 }} />
              <p className="text-sm leading-[1.85] mb-4" style={{ color: MUTED }}>
                Founded by <span style={{ color: INK, fontWeight: 700 }}>Muizz Muhammad</span>, Home Front Solutions is built around disciplined field execution, modern recruiting infrastructure, and a belief that homeowner conversations should feel professional, honest, and easy to trust.
              </p>
              <div className="space-y-2.5 mb-4">
                {[
                  ["Campaigns across fiber, security, solar, water filtration, and roofing", SIGNAL_SOFT, SIGNAL],
                  ["Field roles, internships, and leadership-track opportunities", BLUE_SOFT, BLUE]
                ].map(function(item) {
                  return (
                    <div key={item[0]} className="flex items-center gap-3 p-3.5 rounded-2xl" style={{ background: item[1], border: "1px solid rgba(14,14,12,0.06)" }}>
                      <span className="text-sm leading-relaxed" style={{ color: INK, fontWeight: 600 }}>{item[0]}</span>
                    </div>
                  );
                })}
              </div>
              <div className="text-xs leading-relaxed" style={{ color: MUTED }}>
                Built for category expansion, disciplined field execution, and trusted homeowner conversations.
              </div>
            </div>
          </aside>
        </div>

      {/* Category strip */}
      <div className="mt-10 pt-6" style={{ borderTop: "1px solid " + RULE }}>
          <div className="flex items-baseline gap-4 mb-6">
            <div className="text-[10px] uppercase" style={{ color: MUTED, letterSpacing: "0.18em", fontWeight: 700 }}>Service Categories</div>
            <div className="flex-1" style={{ height: 1, background: RULE }} />
            <div className="text-[10px] uppercase" style={{ color: MUTED, letterSpacing: "0.18em", fontWeight: 700 }}>Field Coverage</div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-x-4 gap-y-4 items-center">
            {PARTNERS.map(function(p, i) {
              return (
                <div key={p} className="flex items-center gap-2.5 p-3 rounded-2xl" style={{ background: "rgba(255,255,255,0.72)", border: "1px solid rgba(14,14,12,0.06)" }}>
                  <span style={{ ...serif, fontSize: 17, color: INK, fontWeight: 600 }}>{p}</span>
                </div>
              );
            })}
        </div>
      </div>

      <div className="mt-8 p-6 md:p-8" style={{ background: "linear-gradient(135deg, #FFFFFF 0%, " + SURF + " 100%)", border: "1px solid rgba(30,64,175,0.08)", borderRadius: 24, boxShadow: "0 18px 40px rgba(14,14,12,0.05)" }}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5">
            <Eyebrow>Local Recruiting Pages</Eyebrow>
            <h2 style={{ ...serif, fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", lineHeight: 1.05 }}>
              Explore local recruiting pages by city and region.
            </h2>
            <p className="mt-4 text-sm md:text-[15px] leading-[1.9]" style={{ color: MUTED }}>
              If you are searching for Greensboro sales jobs, High Point field opportunities, Winston-Salem recruiting pages, Lexington entry points, or broader Charlotte and Raleigh hiring pages, start with the market links below.
            </p>
          </div>
          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {MARKET_PAGES.map(function(market) {
                return (
                  <button
                    key={market.slug}
                    onClick={function() { props.go("market", market.slug); }}
                    className="p-4 text-left lift-card interactive-panel"
                    style={{ background: "linear-gradient(180deg, #FFFFFF 0%, " + PAPER + " 100%)", border: "1px solid rgba(14,14,12,0.08)", borderRadius: 18, cursor: "pointer", boxShadow: "0 8px 22px rgba(14,14,12,0.04)" }}
                  >
                    <div className="text-[10px] uppercase mb-2" style={{ color: SIGNAL, letterSpacing: "0.14em", fontWeight: 800 }}>{market.region}</div>
                    <div className="text-sm font-semibold leading-snug" style={{ color: INK }}>{market.title}</div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 p-6 md:p-8" style={{ background: "linear-gradient(180deg, #FFFFFF 0%, " + PAPER + " 100%)", border: "1px solid " + RULE, borderRadius: 24, boxShadow: "0 16px 36px rgba(14,14,12,0.04)" }}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4">
            <Eyebrow>Main Fiber Providers</Eyebrow>
            <h2 style={{ ...serif, fontSize: "clamp(1.7rem, 3vw, 2.25rem)", lineHeight: 1.06 }}>
              Fiber-provider searches should turn into deeper reading and real applications.
            </h2>
            <p className="mt-4 text-sm md:text-[15px] leading-[1.9]" style={{ color: MUTED }}>
              People search brand names like Google Fiber, Brightspeed, Lumos, MetroNet, Astound, and Frontier every day. This section keeps that intent inside the site by sending visitors into role pages, provider-focused articles, and the main careers funnel.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row lg:flex-col gap-3">
              <button onClick={function() { props.go("careers"); }} className="inline-flex items-center justify-center px-5 py-3 rounded-md text-sm font-semibold" style={{ background: SIGNAL, color: PAPER, border: "none", cursor: "pointer" }}>
                See Open Roles
              </button>
              <button onClick={function() { props.go("article", "google-fiber-sales-jobs"); }} className="inline-flex items-center justify-center px-5 py-3 rounded-md text-sm font-semibold" style={{ background: "#fff", color: INK, border: "1px solid " + RULE, cursor: "pointer" }}>
                Explore Provider Articles
              </button>
            </div>
          </div>
          <div className="lg:col-span-8">
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3">
              {FIBER_PROVIDERS.map(function(provider) {
                var providerArticleMap = {
                  "Google Fiber": "google-fiber-sales-jobs",
                  "Brightspeed": "brightspeed-fiber-sales-opportunities",
                  "Lumos": "lumos-vs-metronet-fiber-expansion",
                  "MetroNet": "lumos-vs-metronet-fiber-expansion",
                  "Starlink": "starlink-vs-fiber-internet-what-homeowners-care-about"
                };
                var articleSlug = providerArticleMap[provider];
                return (
                  <div
                    key={provider}
                    className="p-4 lift-card interactive-panel"
                    style={{ background: "#fff", border: "1px solid " + RULE, borderRadius: 18, cursor: "pointer", boxShadow: "0 8px 22px rgba(14,14,12,0.04)" }}
                  >
                    <div className="text-[10px] uppercase mb-2" style={{ color: SIGNAL, letterSpacing: "0.14em", fontWeight: 800 }}>Provider Search</div>
                    <div className="text-sm font-semibold leading-snug" style={{ color: INK }}>{provider}</div>
                    <div className="mt-4 flex flex-col gap-2">
                      {articleSlug && (
                        <button
                          onClick={function() { props.go("article", articleSlug); }}
                          className="text-left text-xs font-semibold"
                          style={{ background: "none", border: "none", padding: 0, color: SIGNAL, cursor: "pointer" }}
                        >
                          Read article →
                        </button>
                      )}
                      <button
                        onClick={function() { props.go("careers"); }}
                        className="text-left text-xs font-semibold"
                        style={{ background: "none", border: "none", padding: 0, color: MUTED, cursor: "pointer" }}
                      >
                        View roles →
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <section className="mt-10">
        <div className="flex items-end justify-between gap-6 mb-8">
          <div>
            <Eyebrow>Learn Before You Apply</Eyebrow>
            <h2 className="max-w-3xl" style={{ ...serif, fontSize: "clamp(1.85rem, 3.5vw, 2.7rem)", lineHeight: 1.05 }}>
              A smoother path for people who want to understand D2D, sales psychology, pay structure, and the home-services field.
            </h2>
            <p className="mt-4 max-w-2xl text-sm md:text-[15px] leading-[1.9]" style={{ color: MUTED }}>
              Smart people usually want to understand the game before they step into it. These guides make the opportunity feel clearer, more practical, and easier to trust.
            </p>
          </div>
          <button onClick={function() { props.go("insights"); }} className="hidden md:inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold interactive-pill" style={{ background: SURF, color: INK, border: "1px solid " + RULE, cursor: "pointer" }}>
            View all insights
            <span className="interactive-arrow" style={{ color: SIGNAL }}>→</span>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {learningTracks.map(function(track) {
            var article = ARTICLE_PAGES.find(function(item) { return item.slug === track.slug; });
            if (!article) return null;
            return (
              <div
                key={track.slug}
                onClick={function() { props.go("article", article.slug); }}
                className="group p-6 cursor-pointer lift-card interactive-panel"
                style={{ background: "linear-gradient(180deg, #FFFFFF 0%, " + PAPER + " 74%, #F4F8FC 100%)", border: "1px solid rgba(14,14,12,0.08)", borderRadius: 20, boxShadow: "0 10px 26px rgba(14,14,12,0.05)" }}
                role="link"
                tabIndex={0}
                onKeyDown={function(e) {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    props.go("article", article.slug);
                  }
                }}
              >
                <div className="text-[10px] uppercase mb-3" style={{ color: SIGNAL, letterSpacing: "0.14em", fontWeight: 800 }}>{track.kicker}</div>
                <h3 className="mb-3" style={{ ...serif, fontSize: 24, lineHeight: 1.08 }}>{article.title}</h3>
                <p className="text-sm leading-[1.8]" style={{ color: MUTED }}>{track.blurb}</p>
                <div className="inline-flex items-center gap-2 mt-5 text-sm font-semibold" style={{ color: INK }}>
                  Learn more
                  <span className="interactive-arrow" style={{ color: SIGNAL }}>→</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mt-8">
        <div className="p-6 md:p-8" style={{ background: "linear-gradient(140deg, #FFFFFF 0%, " + SURF2 + " 55%, #EEF2FF 100%)", border: "1px solid rgba(30,64,175,0.08)", borderRadius: 24, boxShadow: "0 18px 40px rgba(14,14,12,0.05)" }}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-4">
              <Eyebrow>Students And Interns</Eyebrow>
              <h2 style={{ ...serif, fontSize: "clamp(1.7rem, 3.1vw, 2.3rem)", lineHeight: 1.06 }}>
                Content for college students, recent grads, and 18 to 25 year olds looking for a real sales path.
              </h2>
            <p className="mt-4 text-sm md:text-[15px] leading-[1.9]" style={{ color: MUTED }}>
              For people who want more than a generic internship, this is where the path starts to feel practical, ambitious, and real.
            </p>
            </div>
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              {ARTICLE_PAGES.filter(function(article) {
                return article.slug === "sales-internship-for-college-students" || article.slug === "best-summer-sales-job-for-18-to-25" || article.slug === "why-d2d-after-high-school-or-college";
              }).map(function(article) {
                return (
                  <button
                    key={article.slug}
                    onClick={function() { props.go("article", article.slug); }}
                    className="p-5 text-left lift-card interactive-panel"
                    style={{ background: "rgba(255,255,255,0.82)", border: "1px solid rgba(14,14,12,0.08)", borderRadius: 18, cursor: "pointer", boxShadow: "0 8px 22px rgba(14,14,12,0.04)" }}
                  >
                    <div className="text-[10px] uppercase mb-2" style={{ color: SIGNAL, letterSpacing: "0.14em", fontWeight: 800 }}>{article.eyebrow}</div>
                    <div style={{ ...serif, fontSize: 24, lineHeight: 1.08, color: INK }}>{article.title}</div>
                    <p className="mt-3 text-sm leading-[1.8]" style={{ color: MUTED }}>{article.description}</p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      </section>

      {/* WHAT WE DO. numbered like a field manual */}
      <section style={{ background: SURF, borderTop: "1px solid " + RULE, borderBottom: "1px solid " + RULE }}>
        <div className="max-w-[1240px] mx-auto px-5 md:px-10 py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-14">
            <div className="lg:col-span-5">
              <div className="text-[11px] mb-4" style={{ color: MUTED, fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", letterSpacing: "0.04em" }}>SECTION I / HOW THIS WORKS</div>
              <h2 style={{ ...serif, fontSize: "clamp(2rem, 4vw, 2.75rem)", lineHeight: 1.05 }}>
                Three things we do, every day, in every market we work.
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-6">
            {[
              { n: "01", t: "We knock the doors", d: "Trained, badged, branded representatives work neighborhoods with a real script, real standards, and a six-module certification before they touch a single porch.", bg: SIGNAL_SOFT, accent: SIGNAL },
              { n: "02", t: "We close the customer", d: "Qualify on the doorstep. Present the right product. Handle the objection. Set the install. We are paid on activations, not signatures, which keeps us honest.", bg: BLUE_SOFT, accent: BLUE },
              { n: "03", t: "You see every metric", d: "Knocks, conversations, sits, closes, scheduled installs, activated installs. Daily reporting in real time. No black box, no monthly slide deck, no surprises.", bg: FOREST_SOFT, accent: FOREST },
            ].map(function(item) {
              return (
                <div key={item.t} className="p-8 lift-card" style={{ background: item.bg, borderTop: "3px solid " + item.accent, borderRadius: 18 }}>
                  <div className="text-[11px] mb-4" style={{ color: item.accent, fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", letterSpacing: "0.05em", fontWeight: 600 }}>{item.n}</div>
                  <h3 className="mb-3" style={{ ...serif, fontSize: 22, color: INK }}>{item.t}</h3>
                  <p className="text-sm leading-[1.85]" style={{ color: MUTED }}>{item.d}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* AI TRAINING CALLOUT */}
      <section className="max-w-[1240px] mx-auto px-5 md:px-10 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-6">
            <Eyebrow>How We Train</Eyebrow>
            <h2 className="mb-6" style={{ ...serif, fontSize: "clamp(1.875rem, 3.5vw, 2.5rem)", lineHeight: 1.05 }}>
              We teach our reps with AI-powered coaching.
            </h2>
            <p className="text-base leading-[1.85] mb-6" style={{ color: MUTED }}>
              Most door-to-door companies hand new reps a script and send them outside. We do something different. Every Home Front rep practices the pitch with an AI coaching tool that scores their delivery, identifies weaknesses, and gives personalized feedback before they ever knock a real door.
            </p>
            <p className="text-base leading-[1.85]" style={{ color: MUTED }}>
              The result is reps who are sharper on day one and improve faster every week. It is one of the reasons we can hire candidates with no prior sales experience and have them earning commission within their first two weeks.
            </p>
          </div>
          <div className="lg:col-span-6">
            <div className="p-8 md:p-10 lift-card" style={{ background: SURF2, border: "1px solid " + RULE, borderRadius: 22 }}>
              <div className="text-[10px] uppercase mb-4" style={{ color: SIGNAL, letterSpacing: "0.18em", fontWeight: 700 }}>What Reps Learn</div>
              <ul className="space-y-4">
                {[
                  ["The Product", "Offer basics, customer fit, pricing structure, and install flow across active service categories"],
                  ["The Pitch", "Opening lines, value framing, qualifying questions that work at the door"],
                  ["Objection Handling", "How to respond to the 12 most common homeowner objections"],
                  ["Compliance", "What you can and cannot say. Brand standards. Customer privacy."],
                  ["Field Simulation", "Live AI roleplay practice scored on tone, pace, and structure"],
                  ["Tools and CRM", "How to log activity, schedule installs, and track your numbers"],
                ].map(function(item) {
                  return (
                    <li key={item[0]} className="flex items-start gap-3">
                      <span style={{ color: INK, marginTop: 8, width: 4, height: 4, background: INK, borderRadius: "50%", flexShrink: 0 }}></span>
                      <div>
                        <div className="text-sm font-semibold" style={{ color: INK }}>{item[0]}</div>
                        <div className="text-xs mt-0.5" style={{ color: MUTED }}>{item[1]}</div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* WHY HOME FRONT */}
      <section style={{ background: SURF2, borderTop: "1px solid " + RULE, borderBottom: "1px solid " + RULE }}>
        <div className="max-w-[1240px] mx-auto px-5 md:px-10 py-20 md:py-28">
          <Eyebrow>Why Home Front</Eyebrow>
          <h2 className="max-w-3xl mb-6" style={{ ...serif, fontSize: "clamp(2rem, 4vw, 2.75rem)", lineHeight: 1.05 }}>
            A locally owned company built on professionalism and trust.
          </h2>
          <p className="max-w-2xl mb-14 text-base md:text-lg leading-relaxed" style={{ color: MUTED }}>
            Home Front Solutions is an independently owned door-to-door marketing company built for clear offers, disciplined field execution, and respectful homeowner conversations across essential home-service categories.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            {[
              {
                t: "Honest, in-person service",
                d: "Every conversation happens face-to-face on your doorstep with a professional representative wearing branded company attire and a photo ID. No high-pressure tactics, no surprise charges. just clear information so you can make the best decision for your home.",
                accent: SIGNAL,
              },
              {
                t: "Built for strong home-service offers",
                d: "We focus on categories that make sense at the doorstep: fiber internet, home security, solar, water filtration, roofing, and other homeowner offers where clarity and trust matter.",
                accent: BLUE,
              },
              {
                t: "Locally rooted, nationally trusted",
                d: "We are an independently owned company that operates field teams in markets across the country. Our leadership is accessible, our standards are consistent, and our commitment to every customer is the same wherever they live.",
                accent: FOREST,
              },
              {
                t: "Trained, certified representatives",
                d: "Every member of our field team completes a comprehensive certification program before they ever knock a door. Our reps are coached to listen first, explain clearly, and treat every customer the way they would want a salesperson to treat their own family.",
                accent: GOLD,
              },
            ].map(function(item) {
              return (
                <div key={item.t} className="pl-6" style={{ borderLeft: "3px solid " + item.accent }}>
                  <h3 className="mb-3" style={{ ...serif, fontSize: 22, color: INK }}>{item.t}</h3>
                  <p className="text-sm leading-[1.85]" style={{ color: MUTED }}>{item.d}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="max-w-[1240px] mx-auto px-5 md:px-10 py-20 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4">
            <Eyebrow>Common Questions</Eyebrow>
            <h2 style={{ ...serif, fontSize: "clamp(1.9rem, 3.5vw, 2.5rem)", lineHeight: 1.06 }}>
              Straight answers for applicants comparing D2D, pay structure, and field work.
            </h2>
            <p className="mt-4 text-sm md:text-[15px] leading-[1.9]" style={{ color: MUTED }}>
              The strongest recruiting pages answer the real questions up front: structure, pay, training, and what kind of products the role actually covers.
            </p>
          </div>
          <div className="lg:col-span-8 space-y-4">
            {HOME_FAQS.map(function(item) {
              return (
                <div key={item.q} className="p-5 md:p-6 lift-card interactive-panel" style={{ background: "#FFFFFF", border: "1px solid " + RULE, borderRadius: 18, boxShadow: "0 10px 26px rgba(14,14,12,0.04)" }}>
                  <h3 style={{ ...serif, fontSize: 24, lineHeight: 1.1, color: INK }}>{item.q}</h3>
                  <p className="mt-3 text-sm md:text-[15px] leading-[1.85]" style={{ color: MUTED }}>{item.a}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-[1240px] mx-auto px-5 md:px-10 py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-10 md:p-14" style={{ background: BLUE_SOFT, borderTop: "4px solid " + BLUE }}>
            <div className="text-[11px] mb-5" style={{ color: BLUE, fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", letterSpacing: "0.05em", fontWeight: 700 }}>FOR BRANDS THAT NEED FIELD GROWTH</div>
            <h3 className="mb-4" style={{ ...serif, fontSize: "clamp(1.5rem, 2.5vw, 1.875rem)", lineHeight: 1.1, color: INK }}>
              Add a door-to-door channel to your customer acquisition.
            </h3>
            <p className="text-sm leading-relaxed mb-8" style={{ color: MUTED }}>
              Tell us about your markets and timeline. We respond within 24 hours.
            </p>
            <button onClick={function() { props.go("contact"); }} className="inline-flex items-center px-6 py-3 rounded-md font-semibold hover:opacity-90 transition-opacity" style={{ background: BLUE, color: PAPER, border: "none", cursor: "pointer" }}>
              Contact Sales →
            </button>
          </div>
          <div className="p-10 md:p-14" style={{ background: SIGNAL_SOFT, borderTop: "4px solid " + SIGNAL }}>
            <div className="text-[11px] mb-5" style={{ color: SIGNAL, fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", letterSpacing: "0.05em", fontWeight: 700 }}>FOR PEOPLE WHO WANT TO WORK</div>
            <h3 className="mb-4" style={{ ...serif, fontSize: "clamp(1.5rem, 2.5vw, 1.875rem)", lineHeight: 1.1, color: INK }}>
              You bring the hustle. We bring the product, the training, and the territory.
            </h3>
            <p className="text-sm leading-relaxed mb-8" style={{ color: MUTED }}>
              Five open positions. Earn $100K+ in your first year. No experience required.
            </p>
            <button onClick={function() { props.go("careers"); }} className="inline-flex items-center px-6 py-3 rounded-md font-semibold hover:opacity-90 transition-opacity" style={{ background: SIGNAL, color: PAPER, border: "none", cursor: "pointer" }}>
              View Open Positions →
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

function WhatWeDoPage(props) {
  return (
    <section className="max-w-[1240px] mx-auto px-5 md:px-10 pt-20 md:pt-28 pb-20">
      <Eyebrow>Services</Eyebrow>
      <h1 className="max-w-4xl" style={{ ...serif, fontSize: "clamp(2.5rem, 6vw, 4.5rem)", lineHeight: 1 }}>
        Last-mile customer acquisition.
      </h1>
      <p className="mt-8 text-lg md:text-xl max-w-2xl leading-relaxed" style={{ color: MUTED }}>
        Whether the category is fiber internet, home security, solar, water filtration, or roofing, none of it grows without disciplined customer acquisition. That is the work we do, in the field, market by market.
      </p>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
        {[
          { n: "01", t: "Territory mapping", d: "We build coverage plans by neighborhood, route, day, and rep so field activity is disciplined and measurable." },
          { n: "02", t: "Rep deployment", d: "Trained, badged, branded reps in your colors. Every rep finishes a six-module AI-powered certification before touching a door." },
          { n: "03", t: "Daily reporting", d: "Knocks, conversations, sits, closes, installs scheduled, installs activated. You see it every day. No black box." },
          { n: "04", t: "Install accountability", d: "Anyone can sell a deal. We are paid when the install happens. That keeps us focused on real customers, not signature counts." },
        ].map(function(item) {
          return (
            <div key={item.n}>
              <span className="text-xs" style={{ color: SIGNAL, fontWeight: 700 }}>{item.n}</span>
              <h2 className="mt-2 mb-3" style={{ ...serif, fontSize: 24 }}>{item.t}</h2>
              <p className="text-sm leading-relaxed" style={{ color: MUTED }}>{item.d}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function WhyUsPage(props) {
  var reasons = [
    { n: "01", t: "Independently owned and operated", d: "We are an independently owned company with field teams serving customers in markets across the country. Our leadership is accessible, our standards are consistent, and our reputation matters because we plan to be here for the long run." },
    { n: "02", t: "Built for multiple home-service categories", d: "We support campaigns across fiber internet, home security, solar, water filtration, roofing, and other homeowner-focused categories where face-to-face selling still wins." },
    { n: "03", t: "Trained, certified representatives", d: "Every member of our field team completes a six-module certification program before they ever knock a door, covering product knowledge, customer service, and clear, honest communication." },
    { n: "04", t: "Honest, in-person service", d: "Every conversation happens face-to-face on your doorstep with a professional representative wearing branded company attire and a photo ID. No high-pressure tactics, no surprise charges." },
    { n: "05", t: "We take customer experience personally", d: "We schedule the installation, follow up to confirm everything is working, and stand behind every recommendation we make. If something is not right, we make it right." },
    { n: "06", t: "Built for long-term relationships", d: "We are not a pop-up sales team that disappears after the easy customers are signed up. We staff for the long term, support our reps, and stay invested in the markets we serve." },
  ];

  return (
    <section className="max-w-[1240px] mx-auto px-5 md:px-10 pt-20 md:pt-28 pb-20">
      <Eyebrow>Why Home Front</Eyebrow>
      <h1 className="max-w-4xl" style={{ ...serif, fontSize: "clamp(2.5rem, 6vw, 4.5rem)", lineHeight: 1 }}>
        Premium field execution, delivered with professionalism and care.
      </h1>
      <p className="mt-8 text-lg md:text-xl max-w-2xl leading-relaxed" style={{ color: MUTED }}>
        Home Front Solutions is a door-to-door marketing company built for high-demand home-service offers. Here is what sets us apart and why direct field execution still works when the offer is clear, the process is disciplined, and the rep is professional.
      </p>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
        {reasons.map(function(r) {
          return (
            <div key={r.n}>
              <span className="text-xs" style={{ color: SIGNAL, fontWeight: 700 }}>{r.n}</span>
              <h2 className="mt-2 mb-3" style={{ ...serif, fontSize: 22 }}>{r.t}</h2>
              <p className="text-sm leading-[1.85]" style={{ color: MUTED }}>{r.d}</p>
            </div>
          );
        })}
      </div>
    </section>
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
    <section className="max-w-[1240px] mx-auto px-5 md:px-10 pt-20 md:pt-28 pb-20">
      <Eyebrow>Partners</Eyebrow>
      <h1 className="max-w-4xl" style={{ ...serif, fontSize: "clamp(2.5rem, 6vw, 4.5rem)", lineHeight: 1 }}>
        Built for home-service categories that win with trust.
      </h1>
      <p className="mt-8 text-lg md:text-xl max-w-2xl leading-relaxed" style={{ color: MUTED }}>
        We are selective about the categories and campaigns we support. Every offer has to be clear, defensible, and strong enough for a professional field team to stand behind.
      </p>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-2" style={{ border: "1px solid " + RULE }}>
        {partnerData.map(function(p, i) {
          return (
            <div key={p.name} className="p-8 md:p-10" style={{ borderRight: (i % 2 === 0) ? "1px solid " + RULE : "none", borderBottom: i < partnerData.length - 2 ? "1px solid " + RULE : "none" }}>
              <h2 className="mb-3" style={{ ...serif, fontSize: 24 }}>{p.name}</h2>
              <p className="text-sm leading-relaxed" style={{ color: MUTED }}>{p.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ─── CAREERS PAGE ─────────────────────────────
function CareersIndexPage(props) {
  return (
    <>
      {/* HERO */}
      <section className="max-w-[1240px] mx-auto px-5 md:px-10 pt-20 md:pt-28 pb-16">
        <div className="flex items-center gap-3 mb-8">
          <div style={{ width: 24, height: 1, background: SIGNAL }} />
          <span className="text-[11px] uppercase" style={{ color: SIGNAL, letterSpacing: "0.18em", fontWeight: 700 }}>Careers · {JOBS.length} Open Roles</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-8">
            <h1 style={{ ...serif, fontSize: "clamp(2.75rem, 6.5vw, 5rem)", lineHeight: 0.98 }}>
              Join a team where your work is rewarded and your growth is supported.
            </h1>
            <p className="mt-10 text-lg md:text-xl max-w-2xl leading-relaxed" style={{ color: MUTED }}>
              At Home Front Solutions, you have the opportunity to build a real career selling fiber internet for the country's most trusted providers. with <span style={{ color: INK, fontWeight: 600 }}>uncapped earning potential</span>, <span style={{ color: INK, fontWeight: 600 }}>free professional training</span>, and a leadership team that genuinely invests in your success. Whether you have years of sales experience or none at all, we will set you up to thrive.
            </p>

            {/* Three quick value props - colored */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl">
              {[
                { t: "$100K+ earnings", d: "Paid weekly. Uncapped commission.", bg: SIGNAL_SOFT, accent: SIGNAL },
                { t: "Free training", d: "Full certification before day one.", bg: BLUE_SOFT, accent: BLUE },
                { t: "Real career path", d: "Promotion from within. Move up fast.", bg: FOREST_SOFT, accent: FOREST },
              ].map(function(item) {
                return (
                  <div key={item.t} className="p-5" style={{ background: item.bg, borderTop: "3px solid " + item.accent }}>
                    <div className="text-sm font-bold mb-1.5" style={{ color: item.accent }}>{item.t}</div>
                    <div className="text-xs leading-relaxed" style={{ color: INK }}>{item.d}</div>
                  </div>
                );
              })}
            </div>
          </div>
          <aside className="lg:col-span-4 lg:border-l lg:pl-10" style={{ borderColor: RULE }}>
            <div className="text-[10px] uppercase mb-5" style={{ color: MUTED, letterSpacing: "0.18em", fontWeight: 700 }}>A Note From Our Founder</div>
            <p className="leading-[1.7] mb-6" style={{ ...serif, fontSize: 18, color: INK }}>
              "We hire for character first and experience second. If you are willing to learn, show up consistently, and treat people with respect, we will give you everything you need to succeed here. including the training, the territory, and the support."
            </p>
            <p className="text-sm leading-[1.85] mb-6" style={{ color: MUTED }}>
              Muizz Muhammad built Home Front Solutions to combine old-school field discipline with a cleaner, more modern operating style for recruiting, coaching, and market growth.
            </p>
            <div style={{ width: 32, height: 1, background: RULE, marginBottom: 16 }} />
            <div className="text-xs" style={{ color: MUTED }}>Muizz Muhammad · Founder, Home Front Solutions</div>
          </aside>
        </div>
      </section>

      {/* OPEN POSITIONS - PROMINENT */}
      <section id="open-positions" style={{ background: SURF, borderTop: "1px solid " + RULE, borderBottom: "1px solid " + RULE }}>
        <div className="max-w-[1240px] mx-auto px-5 md:px-10 py-16 md:py-20">
          <div className="flex items-end justify-between mb-10">
            <div>
              <Eyebrow>Open Positions</Eyebrow>
              <h2 style={{ ...serif, fontSize: "clamp(1.75rem, 3vw, 2.25rem)", lineHeight: 1.1 }}>
                {JOBS.length} positions currently available
              </h2>
            </div>
          </div>

          <div className="space-y-4">
            {JOBS.map(function(job) {
              return (
                <div
                  key={job.slug}
                  onClick={function() { props.go("job", job.slug); }}
                  className="group w-full p-0 text-left transition-transform duration-200 hover:-translate-y-0.5"
                  style={{ background: "none", border: "none", cursor: "pointer" }}
                  aria-label={"Open " + job.title + " in " + job.location}
                  role="link"
                  tabIndex={0}
                  onKeyDown={function(e) {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      props.go("job", job.slug);
                    }
                  }}
                >
                <div
                  className="p-6 md:p-7"
                  style={{
                    background: "linear-gradient(180deg, " + PAPER + " 0%, #FFFFFF 100%)",
                    border: "1px solid " + RULE,
                    borderRadius: 14,
                    boxShadow: "0 1px 0 rgba(14,14,12,0.03)",
                    transition: "box-shadow 180ms ease, border-color 180ms ease, transform 180ms ease"
                  }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 items-start">
                    <div className="md:col-span-7">
                      <h3 className="mb-2" style={{ ...serif, fontSize: "clamp(1.25rem, 2vw, 1.5rem)", color: INK, lineHeight: 1.2 }}>{job.title}</h3>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs mb-3" style={{ color: MUTED }}>
                        <span style={{ color: INK, fontWeight: 600 }}>{job.location}</span>
                        <span>·</span>
                        <span>{job.type}</span>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <div className="inline-flex items-center px-2.5 py-1 rounded-full" style={{ background: FOREST_SOFT }}>
                          <span className="text-xs font-bold" style={{ color: FOREST }}>{job.earningRange}/yr</span>
                        </div>
                        <div className="inline-flex items-center px-2.5 py-1 rounded-full" style={{ background: SIGNAL_SOFT }}>
                          <span className="text-xs font-bold" style={{ color: SIGNAL }}>{job.type}</span>
                        </div>
                      </div>
                      <p className="text-sm leading-relaxed max-w-xl" style={{ color: MUTED }}>{job.pitch}</p>
                    </div>
                    <div className="md:col-span-5 flex flex-col sm:flex-row md:flex-col lg:flex-row gap-2 md:items-end md:justify-end">
                      <span className="inline-flex items-center justify-center px-5 py-3 rounded-md text-sm font-semibold transition-colors" style={{ background: "transparent", color: INK, border: "1px solid " + INK, minWidth: 142 }}>
                        View Details
                      </span>
                      <span
                        onClick={function(e) { e.stopPropagation(); props.go("apply", job.slug); }}
                        className="inline-flex items-center justify-center px-5 py-3 rounded-md text-sm font-semibold hover:opacity-90 transition-opacity"
                        style={{ background: "linear-gradient(135deg, #233447 0%, " + SIGNAL + " 100%)", color: PAPER, border: "none", cursor: "pointer", minWidth: 142, boxShadow: "0 14px 28px rgba(59,93,124,0.18)" }}
                        role="button"
                        tabIndex={0}
                        onKeyDown={function(e) {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            props.go("apply", job.slug);
                          }
                        }}
                      >
                        Apply Now →
                      </span>
                    </div>
                  </div>
                </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="max-w-[1240px] mx-auto px-5 md:px-10 py-20 md:py-24">
        <div className="flex items-end justify-between mb-10 gap-6">
          <div>
            <Eyebrow>North Carolina Markets</Eyebrow>
            <h2 className="max-w-3xl" style={{ ...serif, fontSize: "clamp(1.85rem, 3.5vw, 2.8rem)", lineHeight: 1.04 }}>
              City-targeted career pages built for local search and local applicants.
            </h2>
          </div>
          <p className="hidden md:block max-w-md text-sm leading-[1.8]" style={{ color: MUTED }}>
            These market pages help applicants and crawlers understand where Home Front Solutions is recruiting now and where we are building visibility next.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {MARKET_PAGES.map(function(market) {
            return (
              <div
                key={market.slug}
                onClick={function() { props.go("market", market.slug); }}
                className="group p-6 cursor-pointer"
                style={{
                  background: "linear-gradient(180deg, #FFFFFF 0%, " + PAPER + " 100%)",
                  border: "1px solid " + RULE,
                  borderRadius: 18,
                  boxShadow: "0 8px 24px rgba(14,14,12,0.04)"
                }}
                role="link"
                tabIndex={0}
                onKeyDown={function(e) {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    props.go("market", market.slug);
                  }
                }}
              >
                <div className="inline-flex items-center px-2.5 py-1 rounded-full mb-4" style={{ background: SIGNAL_SOFT }}>
                  <span className="text-[10px] uppercase" style={{ color: SIGNAL, letterSpacing: "0.14em", fontWeight: 800 }}>{market.region}</span>
                </div>
                <h3 className="mb-3" style={{ ...serif, fontSize: 25, lineHeight: 1.06, color: INK }}>{market.title}</h3>
                <p className="text-sm leading-[1.8] mb-5" style={{ color: MUTED }}>{market.intro}</p>
                <div className="inline-flex items-center gap-2 text-sm font-semibold" style={{ color: INK }}>
                  Explore local page
                  <span style={{ color: SIGNAL }}>→</span>
                </div>
              </div>
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
                  <button
                    key={market.slug}
                    onClick={function() { props.go("market", market.slug); }}
                    className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold"
                    style={{ background: "#fff", border: "1px solid " + RULE, color: INK, cursor: "pointer" }}
                  >
                    {market.region}
                  </button>
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
        <button onClick={function() { props.go("careers"); }} style={{ color: SIGNAL, background: "none", border: "none", cursor: "pointer" }}>← View all open positions</button>
      </section>
    );
  }

  var relatedArticles = getJobArticleSlugs(job).map(function(slug) {
    return ARTICLE_PAGES.find(function(article) { return article.slug === slug; });
  }).filter(Boolean);

  return (
    <>
      <div style={{ background: SURF, borderBottom: "1px solid " + RULE }}>
        <div className="max-w-[1240px] mx-auto px-5 md:px-10 py-3 text-xs flex items-center gap-2" style={{ color: MUTED }}>
          <button onClick={function() { props.go("home"); }} style={{ background: "none", border: "none", cursor: "pointer", color: "inherit", padding: 0 }}>Home</button>
          <span>/</span>
          <button onClick={function() { props.go("careers"); }} style={{ background: "none", border: "none", cursor: "pointer", color: "inherit", padding: 0 }}>Careers</button>
          <span>/</span>
          <span style={{ color: INK }}>{job.title}</span>
        </div>
      </div>

      <section className="max-w-[1240px] mx-auto px-5 md:px-10 pt-10 md:pt-14 pb-10">
        <div
          className="overflow-hidden"
          style={{
            background: "radial-gradient(circle at top right, rgba(59,93,124,0.12), transparent 30%), linear-gradient(135deg, #F4F8FC 0%, #FFFFFF 52%, #FAFAF7 100%)",
            border: "1px solid " + RULE,
            borderRadius: 24,
            boxShadow: "0 24px 60px rgba(14,14,12,0.08)"
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 px-6 py-8 md:px-10 md:py-12 lg:items-end">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5" style={{ background: SIGNAL_SOFT, color: SIGNAL }}>
                <span className="text-[10px] uppercase" style={{ letterSpacing: "0.16em", fontWeight: 800 }}>Field Sales Opportunity</span>
              </div>
              <h1 className="mb-5" style={{ ...serif, fontSize: "clamp(2.4rem, 5vw, 4.5rem)", lineHeight: 0.96 }}>{job.title}</h1>
              <p className="max-w-3xl text-[15px] md:text-[17px] leading-[1.85]" style={{ color: MUTED }}>
                {job.pitch} This role is built for people who want real upside, real territory responsibility, and a clean path into leadership if they can produce.
              </p>

              <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { label: "Location", value: job.location },
                  { label: "Type", value: job.type },
                  { label: "Earnings", value: job.earningRange + "/yr" },
                  { label: "Posted", value: job.posted }
                ].map(function(item) {
                  return (
                    <div key={item.label} className="p-4" style={{ background: "rgba(255,255,255,0.78)", border: "1px solid " + RULE, borderRadius: 16 }}>
                      <div className="text-[10px] uppercase mb-2" style={{ color: MUTED, letterSpacing: "0.15em", fontWeight: 700 }}>{item.label}</div>
                      <div className="text-sm font-semibold leading-snug" style={{ color: INK }}>{item.value}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="p-5 md:p-6" style={{ background: "#11120F", color: PAPER, borderRadius: 20 }}>
                <div className="text-[10px] uppercase mb-3" style={{ color: "rgba(250,250,247,0.62)", letterSpacing: "0.15em", fontWeight: 700 }}>Quick Take</div>
                <h2 className="mb-3" style={{ ...serif, fontSize: 26, lineHeight: 1.02 }}>Strong product. Straight commission. No fluff.</h2>
                <p className="text-sm leading-[1.8] mb-5" style={{ color: "rgba(250,250,247,0.8)" }}>
                  Training is provided, field support is real, and compensation is tied to actual installs and production.
                </p>
                <button onClick={function() { props.go("apply", job.slug); }} className="w-full inline-flex items-center justify-center gap-2 px-7 py-4 rounded-md font-semibold hover:opacity-90 transition-opacity" style={{ background: SIGNAL, color: PAPER, border: "none", cursor: "pointer", boxShadow: "0 16px 36px rgba(59,93,124,0.2)" }}>
                  Apply Now →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-[1240px] mx-auto px-5 md:px-10 pb-16 md:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-8 space-y-12">
            <div className="p-6 md:p-8" style={{ background: SURF, border: "1px solid " + RULE, borderRadius: 20 }}>
              <h2 className="mb-4" style={{ ...serif, fontSize: 26 }}>About the role</h2>
              <p className="leading-[1.85] text-[15px]" style={{ color: MUTED }}>{job.overview}</p>
            </div>

            <div className="p-6 md:p-8" style={{ background: SURF, border: "1px solid " + RULE, borderRadius: 20 }}>
              <h2 className="mb-5" style={{ ...serif, fontSize: 26 }}>What you'll do</h2>
              <ul className="space-y-3">
                {job.responsibilities.map(function(item, i) {
                  return (
                    <li key={i} className="flex items-start gap-3 text-[14px]" style={{ color: MUTED }}>
                      <span style={{ color: INK, marginTop: 8, width: 4, height: 4, background: INK, borderRadius: "50%", flexShrink: 0 }}></span>
                      <span className="leading-[1.7]">{item}</span>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="p-6 md:p-8" style={{ background: SURF, border: "1px solid " + RULE, borderRadius: 20 }}>
              <h2 className="mb-5" style={{ ...serif, fontSize: 26 }}>What we're looking for</h2>
              <ul className="space-y-3">
                {job.qualifications.map(function(item, i) {
                  return (
                    <li key={i} className="flex items-start gap-3 text-[14px]" style={{ color: MUTED }}>
                      <span style={{ color: INK, marginTop: 8, width: 4, height: 4, background: INK, borderRadius: "50%", flexShrink: 0 }}></span>
                      <span className="leading-[1.7]">{item}</span>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="p-6 md:p-8" style={{ background: SURF, border: "1px solid " + RULE, borderRadius: 20 }}>
              <h2 className="mb-5" style={{ ...serif, fontSize: 26 }}>What you get</h2>
              <ul className="space-y-3">
                {job.benefits.map(function(item, i) {
                  return (
                    <li key={i} className="flex items-start gap-3 text-[14px]" style={{ color: MUTED }}>
                      <span style={{ color: SIGNAL, marginTop: 8, width: 4, height: 4, background: SIGNAL, borderRadius: "50%", flexShrink: 0 }}></span>
                      <span className="leading-[1.7]">{item}</span>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="p-6 md:p-8" style={{ background: SURF, border: "1px solid " + RULE, borderRadius: 20 }}>
              <h2 className="mb-4" style={{ ...serif, fontSize: 26 }}>About Home Front Solutions</h2>
              <p className="leading-[1.85] text-[15px] mb-4" style={{ color: MUTED }}>
                Home Front Solutions is a door-to-door marketing company built around major fiber and connectivity categories, including AT&amp;T Fiber, T-Mobile Fiber, Astound, Brightspeed, Frontier, Google Fiber, Lumos, MetroNet, GoNetspeed, Starlink, and other high-interest provider searches that homeowners and applicants already recognize. We hire and train professional field sales representatives in markets across the country.
              </p>
              <p className="leading-[1.85] text-[15px]" style={{ color: MUTED }}>
                We are an Equal Opportunity Employer.
              </p>
            </div>

            <div className="pt-4">
              <button onClick={function() { props.go("apply", job.slug); }} className="inline-flex items-center gap-2 px-7 py-4 rounded-md font-semibold hover:opacity-90 transition-opacity" style={{ background: "linear-gradient(135deg, #233447 0%, " + SIGNAL + " 100%)", color: PAPER, border: "none", cursor: "pointer", boxShadow: "0 18px 36px rgba(59,93,124,0.18)" }}>
                Apply for this Position →
              </button>
            </div>

            <div className="p-6 md:p-8" style={{ background: SURF2, border: "1px solid " + RULE, borderRadius: 20 }}>
              <h2 className="mb-4" style={{ ...serif, fontSize: 26 }}>Explore related markets</h2>
              <p className="text-[15px] leading-[1.85] mb-5" style={{ color: MUTED }}>
                Applicants often search by city before they search by job title. Use the market pages below to explore local recruiting visibility across North Carolina.
              </p>
              <div className="flex flex-wrap gap-2">
                {MARKET_PAGES.map(function(market) {
                  return (
                    <button
                      key={market.slug}
                      onClick={function() { props.go("market", market.slug); }}
                      className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold"
                      style={{ background: "#fff", border: "1px solid " + RULE, color: INK, cursor: "pointer" }}
                    >
                      {market.region}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="p-6 md:p-8" style={{ background: SURF2, border: "1px solid " + RULE, borderRadius: 20 }}>
              <h2 className="mb-4" style={{ ...serif, fontSize: 26 }}>Related reading</h2>
              <p className="text-[15px] leading-[1.85] mb-5" style={{ color: MUTED }}>
                These articles answer the questions applicants usually ask before they commit: how the field works, how the money works, and what separates strong reps from everyone else.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {relatedArticles.map(function(article) {
                  return (
                    <button
                      key={article.slug}
                      onClick={function() { props.go("article", article.slug); }}
                      className="p-5 text-left"
                      style={{ background: "#fff", border: "1px solid " + RULE, borderRadius: 16, cursor: "pointer" }}
                    >
                      <div className="text-[10px] uppercase mb-2" style={{ color: SIGNAL, letterSpacing: "0.14em", fontWeight: 800 }}>{article.eyebrow}</div>
                      <div style={{ ...serif, fontSize: 22, lineHeight: 1.08, color: INK }}>{article.title}</div>
                      <p className="mt-3 text-sm leading-[1.8]" style={{ color: MUTED }}>{article.description}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-32 space-y-4">
              <div className="p-6" style={{ border: "1px solid " + RULE, background: SURF, borderRadius: 20, boxShadow: "0 18px 36px rgba(14,14,12,0.05)" }}>
                <div className="text-xs uppercase mb-2" style={{ color: SIGNAL, letterSpacing: "0.15em", fontWeight: 700 }}>Apply Now</div>
                <h3 className="mb-3 leading-tight" style={{ ...serif, fontSize: 24 }}>Ready to join the team?</h3>
                <p className="text-sm mb-5 leading-relaxed" style={{ color: MUTED }}>Application takes about 5 minutes. We respond within 48 hours with direct next steps if there is a fit.</p>
                <button onClick={function() { props.go("apply", job.slug); }} className="w-full inline-flex items-center justify-center px-5 py-3.5 rounded-md font-semibold hover:opacity-90 transition-opacity" style={{ background: SIGNAL, color: PAPER, border: "none", cursor: "pointer" }}>
                  Apply Now →
                </button>
              </div>
              <div className="p-6" style={{ background: SURF2, border: "1px solid " + RULE, borderRadius: 20 }}>
                <div className="text-xs uppercase mb-3" style={{ color: MUTED, letterSpacing: "0.15em", fontWeight: 700 }}>Before you apply</div>
                <div className="space-y-3 text-sm leading-[1.75]" style={{ color: INK }}>
                  <div>Every current role is built around real production, commission upside, and direct field accountability.</div>
                  <div>Reliable transportation is required for field work.</div>
                  <div>Top performers move fastest because they communicate clearly and show up consistently.</div>
                </div>
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
    if (!form.fullName || !form.fullName.trim()) errs.fullName = "Please enter your full name";
    // Accept any phone with 10+ digits (strip non-digits first)
    var digitsOnly = (form.phone || "").replace(/\D/g, "");
    if (digitsOnly.length < 10) errs.phone = "Please enter a valid phone number (10+ digits)";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email || "")) errs.email = "Please enter a valid email";
    if (!form.cityState || !form.cityState.trim()) errs.cityState = "Please enter your city and state";
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
      <button onClick={function() { props.go("job", props.slug); }} className="text-sm mb-6 inline-flex items-center gap-1.5 hover:opacity-70 transition-opacity" style={{ color: MUTED, background: "none", border: "none", cursor: "pointer", padding: 0 }}>
        ← Back to job description
      </button>

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
          <div className="inline-flex items-center px-3 py-1.5 rounded-full self-start" style={{ background: FOREST_SOFT }}>
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
          <span onClick={function() { props.go("privacy"); }} style={{ cursor: "pointer", color: MUTED, textDecoration: "underline" }}>Privacy Policy</span>
          {" "}and{" "}
          <span onClick={function() { props.go("terms"); }} style={{ cursor: "pointer", color: MUTED, textDecoration: "underline" }}>Terms of Service</span>.
        </div>
      </form>
      </div>
    </section>
  );
}

function ThankYouPage(props) {
  var job = JOBS.find(function(j) { return j.slug === props.slug; });
  var submission = null;
  try { submission = window.__lastApplication; } catch (err) {}

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
        <button onClick={function() { props.go("careers"); }} className="inline-flex items-center justify-center px-6 py-3 rounded-md font-semibold" style={{ background: "transparent", color: INK, border: "1px solid " + INK, cursor: "pointer" }}>
          View Other Positions
        </button>
        <button onClick={function() { props.go("home"); }} className="inline-flex items-center justify-center px-6 py-3 rounded-md font-semibold" style={{ background: INK, color: PAPER, border: "none", cursor: "pointer" }}>
          Back to Home
        </button>
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
        <button onClick={function() { props.go("careers"); }} style={{ color: SIGNAL, background: "none", border: "none", cursor: "pointer" }}>← View careers</button>
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
              <div className="inline-flex items-center px-3 py-1.5 rounded-full mb-5" style={{ background: SIGNAL_SOFT }}>
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
                        <div className="text-[10px] uppercase mb-2" style={{ color: SIGNAL, letterSpacing: "0.14em", fontWeight: 800 }}>{item.label}</div>
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
                          <button onClick={function() { props.go("job", job.slug); }} className="inline-flex items-center justify-center px-5 py-3 rounded-md text-sm font-semibold" style={{ background: "transparent", color: INK, border: "1px solid " + INK, cursor: "pointer" }}>
                            View Role
                          </button>
                          <button onClick={function() { props.go("apply", job.slug); }} className="inline-flex items-center justify-center px-5 py-3 rounded-md text-sm font-semibold" style={{ background: SIGNAL, color: PAPER, border: "none", cursor: "pointer" }}>
                            Apply Now →
                          </button>
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
                    <button
                      key={article.slug}
                      onClick={function() { props.go("article", article.slug); }}
                      className="p-5 text-left"
                      style={{ background: "#fff", border: "1px solid " + RULE, borderRadius: 16, cursor: "pointer" }}
                    >
                      <div className="text-[10px] uppercase mb-2" style={{ color: SIGNAL, letterSpacing: "0.14em", fontWeight: 800 }}>{article.eyebrow}</div>
                      <div style={{ ...serif, fontSize: 22, lineHeight: 1.08, color: INK }}>{article.title}</div>
                      <p className="mt-3 text-sm leading-[1.8]" style={{ color: MUTED }}>{article.description}</p>
                    </button>
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
                <button onClick={function() { props.go("careers"); }} className="w-full inline-flex items-center justify-center px-5 py-3.5 rounded-md font-semibold" style={{ background: SIGNAL, color: PAPER, border: "none", cursor: "pointer" }}>
                  Browse Open Roles
                </button>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

function InsightsIndexPage(props) {
  return (
    <>
      <section className="max-w-[1240px] mx-auto px-5 md:px-10 pt-16 md:pt-22 pb-12">
        <div className="max-w-4xl">
          <Eyebrow>Insights</Eyebrow>
          <h1 style={{ ...serif, fontSize: "clamp(2.5rem, 5vw, 4.6rem)", lineHeight: 0.96 }}>
            D2D sales, field psychology, business basics, and industry know-how.
          </h1>
          <p className="mt-6 max-w-3xl text-[16px] md:text-[18px] leading-[1.9]" style={{ color: MUTED }}>
            This section is the content hub for the Home Front Solutions career and recruiting brand. It exists to answer the questions people actually search before they apply: how D2D works, how to handle rejection, how the money side works, how home-service selling fits together, and why field sales can be a real career move.
          </p>
        </div>
      </section>

      <section className="max-w-[1240px] mx-auto px-5 md:px-10 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            "sales internship jobs for college students",
            "summer sales jobs for 18 to 25 year olds",
            "field sales jobs in Charlotte, Raleigh, Greensboro, and High Point",
            "door-to-door rep income in North Carolina",
            "how to start in field sales with no experience",
            "fiber vs solar sales comparison",
            "BEAD program fiber expansion opportunity",
            "fiber optics data center growth"
          ].map(function(intent) {
            return (
              <div key={intent} className="p-5" style={{ background: SURF, border: "1px solid " + RULE, borderRadius: 18 }}>
                <div className="text-[10px] uppercase mb-2" style={{ color: SIGNAL, letterSpacing: "0.14em", fontWeight: 800 }}>Search Coverage</div>
                <div className="text-sm font-semibold leading-[1.7]" style={{ color: INK }}>{intent}</div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="max-w-[1240px] mx-auto px-5 md:px-10 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {ARTICLE_PAGES.map(function(article) {
            return (
              <div
                key={article.slug}
                onClick={function() { props.go("article", article.slug); }}
                className="group p-6 cursor-pointer"
                style={{ background: "linear-gradient(180deg, #FFFFFF 0%, " + PAPER + " 100%)", border: "1px solid " + RULE, borderRadius: 20, boxShadow: "0 10px 28px rgba(14,14,12,0.04)" }}
                role="link"
                tabIndex={0}
                onKeyDown={function(e) {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    props.go("article", article.slug);
                  }
                }}
              >
                <div className="text-[10px] uppercase mb-3" style={{ color: SIGNAL, letterSpacing: "0.14em", fontWeight: 800 }}>{article.eyebrow}</div>
                <h2 style={{ ...serif, fontSize: 28, lineHeight: 1.06, color: INK }}>{article.title}</h2>
                <p className="mt-4 text-sm leading-[1.85]" style={{ color: MUTED }}>{article.description}</p>
                <div className="inline-flex items-center gap-2 mt-6 text-sm font-semibold" style={{ color: INK }}>
                  Read insight
                  <span style={{ color: SIGNAL }}>→</span>
                </div>
              </div>
            );
          })}
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
        <button onClick={function() { props.go("home"); }} style={{ color: SIGNAL, background: "none", border: "none", cursor: "pointer" }}>← Back home</button>
      </section>
    );
  }

  var relatedArticles = getRelatedArticleSlugs(article).map(function(slug) {
    return ARTICLE_PAGES.find(function(item) { return item.slug === slug; });
  }).filter(Boolean);

  return (
    <>
      <section className="max-w-[980px] mx-auto px-5 md:px-10 pt-14 md:pt-18 pb-10">
        <div className="inline-flex items-center px-3 py-1.5 rounded-full mb-5" style={{ background: SIGNAL_SOFT }}>
          <span className="text-[10px] uppercase" style={{ color: SIGNAL, letterSpacing: "0.15em", fontWeight: 800 }}>{article.eyebrow}</span>
        </div>
        <h1 style={{ ...serif, fontSize: "clamp(2.45rem, 5vw, 4.4rem)", lineHeight: 0.97, color: INK }}>{article.title}</h1>
        <p className="mt-6 max-w-3xl text-[16px] md:text-[18px] leading-[1.85]" style={{ color: MUTED }}>{article.description}</p>
      </section>

      <section className="max-w-[980px] mx-auto px-5 md:px-10 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_280px] gap-10">
          <div className="space-y-8">
            <div className="p-6 md:p-8" style={{ background: SURF, border: "1px solid " + RULE, borderRadius: 20 }}>
              <p className="text-[15px] leading-[1.95]" style={{ color: MUTED }}>{article.intro}</p>
            </div>
            {article.sections.map(function(section) {
              return (
                <div key={section.heading} className="p-6 md:p-8" style={{ background: SURF, border: "1px solid " + RULE, borderRadius: 20 }}>
                  <h2 className="mb-4" style={{ ...serif, fontSize: 28, lineHeight: 1.06 }}>{section.heading}</h2>
                  <p className="text-[15px] leading-[1.95]" style={{ color: MUTED }}>{section.body}</p>
                </div>
              );
            })}

            <div className="p-6 md:p-8" style={{ background: SURF2, border: "1px solid " + RULE, borderRadius: 20 }}>
              <h2 className="mb-5" style={{ ...serif, fontSize: 28 }}>Keep reading</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {relatedArticles.map(function(item) {
                  return (
                    <button
                      key={item.slug}
                      onClick={function() { props.go("article", item.slug); }}
                      className="p-5 text-left"
                      style={{ background: "#fff", border: "1px solid " + RULE, borderRadius: 16, cursor: "pointer" }}
                    >
                      <div className="text-[10px] uppercase mb-2" style={{ color: SIGNAL, letterSpacing: "0.14em", fontWeight: 800 }}>{item.eyebrow}</div>
                      <div style={{ ...serif, fontSize: 22, lineHeight: 1.08, color: INK }}>{item.title}</div>
                      <p className="mt-3 text-sm leading-[1.8]" style={{ color: MUTED }}>{item.description}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          <aside className="lg:sticky lg:top-28 h-fit space-y-4">
            <div className="p-6" style={{ background: SURF2, border: "1px solid " + RULE, borderRadius: 20 }}>
              <div className="text-[10px] uppercase mb-3" style={{ color: MUTED, letterSpacing: "0.15em", fontWeight: 700 }}>Internal paths</div>
              <div className="space-y-2">
                <button onClick={function() { props.go("careers"); }} className="w-full text-left p-3 rounded-md" style={{ background: "#fff", border: "1px solid " + RULE, cursor: "pointer", color: INK }}>Open Roles</button>
                <button onClick={function() { props.go("market", "greensboro-nc"); }} className="w-full text-left p-3 rounded-md" style={{ background: "#fff", border: "1px solid " + RULE, cursor: "pointer", color: INK }}>Greensboro Jobs</button>
                <button onClick={function() { props.go("market", "high-point-nc"); }} className="w-full text-left p-3 rounded-md" style={{ background: "#fff", border: "1px solid " + RULE, cursor: "pointer", color: INK }}>High Point Jobs</button>
                <button onClick={function() { props.go("market", "charlotte-nc"); }} className="w-full text-left p-3 rounded-md" style={{ background: "#fff", border: "1px solid " + RULE, cursor: "pointer", color: INK }}>Charlotte Jobs</button>
                <button onClick={function() { props.go("market", "raleigh-nc"); }} className="w-full text-left p-3 rounded-md" style={{ background: "#fff", border: "1px solid " + RULE, cursor: "pointer", color: INK }}>Raleigh Jobs</button>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

function ContactPage(props) {
  var _s = useState(false); var sent = _s[0]; var setSent = _s[1];
  var inputStyle = { width: "100%", padding: "11px 14px", fontSize: 15, background: "#fff", border: "1px solid " + RULE, borderRadius: 6, outline: "none", fontFamily: "inherit", color: INK };

  return (
    <>
      <section className="max-w-[1240px] mx-auto px-5 md:px-10 pt-20 md:pt-28 pb-16">
        <Eyebrow>Contact Sales</Eyebrow>
        <h1 className="max-w-4xl" style={{ ...serif, fontSize: "clamp(2.5rem, 6vw, 4.5rem)", lineHeight: 1 }}>
          Tell us about your market.
        </h1>
        <p className="mt-8 text-lg md:text-xl max-w-2xl leading-relaxed" style={{ color: MUTED }}>
          For home-service brands looking to add a disciplined door-to-door channel. We respond within 24 hours.
        </p>
      </section>

      <section className="max-w-[1240px] mx-auto px-5 md:px-10 py-16 md:py-20" style={{ borderTop: "1px solid " + RULE }}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
          <div className="md:col-span-5">
            <h2 className="mb-6" style={{ ...serif, fontSize: 24 }}>Get in touch directly</h2>
            <div className="space-y-3">
              <a href="mailto:info@homefrontsolutionsllc.com" className="flex items-center gap-4 p-5 transition-all hover:scale-[1.02]" style={{ background: BLUE_SOFT, borderLeft: "3px solid " + BLUE, textDecoration: "none" }}>
                <div style={{ width: 40, height: 40, background: BLUE, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M3 7L12 13L21 7M5 19H19C20.1 19 21 18.1 21 17V7C21 5.9 20.1 5 19 5H5C3.9 5 3 5.9 3 7V17C3 18.1 3.9 19 5 19Z" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
                <div>
                  <div className="text-[10px] uppercase mb-0.5" style={{ color: BLUE, letterSpacing: "0.15em", fontWeight: 700 }}>Email Us</div>
                  <div className="text-sm font-semibold" style={{ color: INK }}>info@homefrontsolutionsllc.com</div>
                </div>
              </a>
              <a href="tel:3364209379" className="flex items-center gap-4 p-5 transition-all hover:scale-[1.02]" style={{ background: FOREST_SOFT, borderLeft: "3px solid " + FOREST, textDecoration: "none" }}>
                <div style={{ width: 40, height: 40, background: FOREST, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M22 16.92V19.92C22 20.52 21.52 21 20.92 21C9.4 21 0 11.6 0 0.08C0 -0.52 0.48 -1 1.08 -1H4.08C4.68 -1 5.16 -0.52 5.16 0.08C5.16 1.6 5.4 3.08 5.84 4.48C5.96 4.84 5.88 5.24 5.6 5.52L3.72 7.4C5.04 10 7 11.96 9.6 13.28L11.48 11.4C11.76 11.12 12.16 11.04 12.52 11.16C13.92 11.6 15.4 11.84 16.92 11.84C17.52 11.84 18 12.32 18 12.92V15.92" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" transform="translate(2 2)" /></svg>
                </div>
                <div>
                  <div className="text-[10px] uppercase mb-0.5" style={{ color: FOREST, letterSpacing: "0.15em", fontWeight: 700 }}>Call Us</div>
                  <div className="text-sm font-semibold" style={{ color: INK }}>(336) 420-9379</div>
                </div>
              </a>
              <div className="flex items-center gap-4 p-5" style={{ background: SIGNAL_SOFT, borderLeft: "3px solid " + SIGNAL }}>
                <div style={{ width: 40, height: 40, background: SIGNAL, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="#FFFFFF" /></svg>
                </div>
                <div>
                  <div className="text-[10px] uppercase mb-0.5" style={{ color: SIGNAL, letterSpacing: "0.15em", fontWeight: 700 }}>Headquarters</div>
                  <div className="text-sm font-semibold" style={{ color: INK }}>High Point, North Carolina</div>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-7">
            {!sent ? (
              <form onSubmit={function(e) { e.preventDefault(); setSent(true); }} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold mb-1.5">Your name</label>
                    <input type="text" required style={inputStyle} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1.5">Company</label>
                    <input type="text" required style={inputStyle} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1.5">Email</label>
                  <input type="email" required style={inputStyle} />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1.5">Markets of interest</label>
                  <input type="text" placeholder="e.g. nationwide, southeast, your specific city" style={inputStyle} />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1.5">Tell us more</label>
                  <textarea rows={4} style={Object.assign({}, inputStyle, { resize: "vertical" })} />
                </div>
                <button type="submit" className="inline-flex items-center px-7 py-3.5 rounded-md font-semibold hover:opacity-90 transition-opacity" style={{ background: INK, color: PAPER, border: "none", cursor: "pointer" }}>
                  Send Message
                </button>
              </form>
            ) : (
              <div className="p-8" style={{ border: "1px solid " + RULE, background: "#fff" }}>
                <h3 className="mb-2" style={{ ...serif, fontSize: 24 }}>Got it.</h3>
                <p style={{ color: MUTED }}>We will be in touch within 24 hours.</p>
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
    <section className="max-w-[800px] mx-auto px-5 md:px-10 pt-16 md:pt-24 pb-20">
      <Eyebrow>Privacy Policy</Eyebrow>
      <h1 style={{ ...serif, fontSize: "clamp(2.25rem, 5vw, 3.25rem)", lineHeight: 1.05 }}>Privacy Policy</h1>
      <p className="mt-3 text-sm" style={{ color: MUTED }}>Last updated: April 10, 2026</p>

      <div className="mt-12 space-y-8 text-[15px] leading-[1.85]" style={{ color: INK }}>
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
  );
}

function TermsPage(props) {
  return (
    <section className="max-w-[800px] mx-auto px-5 md:px-10 pt-16 md:pt-24 pb-20">
      <Eyebrow>Terms of Service</Eyebrow>
      <h1 style={{ ...serif, fontSize: "clamp(2.25rem, 5vw, 3.25rem)", lineHeight: 1.05 }}>Terms of Service</h1>
      <p className="mt-3 text-sm" style={{ color: MUTED }}>Last updated: April 10, 2026</p>

      <div className="mt-12 space-y-8 text-[15px] leading-[1.85]" style={{ color: INK }}>
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
  );
}

export default function App() {
  var _r = useState(function() { return getRouteFromPath(window.location.pathname); });
  var route = _r[0];
  var setRoute = _r[1];

  useEffect(function() {
    function handlePopState() {
      setRoute(getRouteFromPath(window.location.pathname));
    }
    window.addEventListener("popstate", handlePopState);
    return function() {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  useEffect(function() {
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

  // SEO: Update document title and meta tags per route
  useEffect(function() {
    var currentJob = route.slug ? JOBS.find(function(j) { return j.slug === route.slug; }) : null;
    var titles = {
      home: "Home Front Solutions | D2D Sales Jobs, Internships, and Home Services Recruiting",
      "what-we-do": "Home Services Customer Acquisition | Home Front Solutions",
      "why-us": "Why Home Front Solutions | In-Person Field Growth Team",
      partners: "Home Service Categories | Home Front Solutions",
      careers: "Field Sales Jobs in North Carolina | Home Front Solutions Careers",
      market: currentJob ? currentJob.title : "Local Field Sales Markets | Home Front Solutions Careers",
      insights: "D2D Sales Insights, Money Guides, Industry Basics, and Recruiting Articles | Home Front Solutions",
      article: "D2D Sales Insights | Home Front Solutions",
      contact: "Contact Home Front Solutions | Sales & Recruiting",
      job: currentJob ? currentJob.title + " in " + currentJob.location + " | Home Front Solutions" : "Sales Jobs | Home Front Solutions",
      apply: currentJob ? "Apply for " + currentJob.title + " | Home Front Solutions Careers" : "Apply | Home Front Solutions Careers",
      "thank-you": "Application Received | Home Front Solutions Careers",
    };

    var descriptions = {
      home: "Earn $100K+ in performance-based door-to-door sales. Home Front Solutions recruits for fiber, solar, security, roofing, and home-service sales internships and field roles.",
      careers: "Explore field sales and leadership roles at Home Front Solutions in Greensboro, Winston-Salem, High Point, and the Piedmont Triad.",
      market: "Explore city-specific recruiting pages for Home Front Solutions across Greensboro, High Point, Winston-Salem, Piedmont Triad, Lexington, Charlotte, and Raleigh.",
      insights: "Explore articles on D2D sales psychology, field success, money management, industry basics, recruiting, and why door-to-door can be a strong career path.",
      article: "Articles on door-to-door sales, D2D psychology, recruiting, and why field sales can be a strong career path.",
      "what-we-do": "Door-to-door sales, neighborhood coverage, customer acquisition, and local market expansion for home-service brands.",
      "why-us": "A serious field team built around clean execution, trusted provider partnerships, and measurable customer acquisition performance.",
      partners: "See the home-service categories Home Front Solutions supports across active residential markets.",
      contact: "Talk with Home Front Solutions about field sales coverage, recruiting, partnerships, or open career opportunities.",
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

    document.title = titles[route.name] || titles.home;

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

    var desc = descriptions[route.name] || descriptions.home;
    var pagePath = getPathForRoute(route.name, route.slug);
    setMeta("description", desc);
    setMeta("og:title", titles[route.name] || titles.home, true);
    setMeta("og:description", desc, true);
    setMeta("og:type", route.name === "job" ? "article" : "website", true);
    setMeta("og:site_name", "Home Front Solutions", true);
    setMeta("og:locale", "en_US", true);
    setMeta("og:url", "https://homefrontsolutionsllc.com" + pagePath, true);
    setMeta("og:image", "https://homefrontsolutionsllc.com/og-image.jpg", true);
    setMeta("og:image:width", "1200", true);
    setMeta("og:image:height", "630", true);
    setMeta("og:image:alt", "Home Front Solutions. National field sales and home services company", true);
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", titles[route.name] || titles.home);
    setMeta("twitter:description", desc);
    setMeta("twitter:image", "https://homefrontsolutionsllc.com/og-image.jpg");
    setMeta("twitter:image:alt", "Home Front Solutions. National field sales and home services company");
    setMeta("twitter:site", "@homefrontllc");
    var robotsValue = (route.name === "thank-you" || route.name === "apply")
      ? "noindex, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
      : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";
    setMeta("robots", robotsValue);
    setMeta("googlebot", robotsValue);
    setMeta("author", "Home Front Solutions, LLC");
    setMeta("publisher", "Home Front Solutions, LLC");
    setMeta("theme-color", "#3B5D7C");
    setMeta("apple-mobile-web-app-title", "Home Front");
    setMeta("application-name", "Home Front Solutions");
    setMeta("format-detection", "telephone=yes");
    setMeta("geo.region", "US-NC");
    setMeta("geo.placename", "High Point");
    setMeta("geo.position", "35.9557;-80.0053");
    setMeta("ICBM", "35.9557, -80.0053");
    setMeta("keywords", "home services sales, door to door sales outsourcing, field sales careers, security sales, solar sales, water filtration sales, roofing sales, field marketing company, Charlotte sales jobs, Raleigh sales jobs, Greensboro sales jobs, High Point sales jobs, sales internship jobs, summer sales jobs, college student sales jobs, sales rep tax planning, d2d sales psychology, customer acquisition, Home Front Solutions");

    // Apple touch icon
    var atiEl = document.querySelector("link[rel='apple-touch-icon']");
    if (!atiEl) {
      atiEl = document.createElement("link");
      atiEl.setAttribute("rel", "apple-touch-icon");
      document.head.appendChild(atiEl);
    }
    atiEl.setAttribute("href", "https://homefrontsolutionsllc.com/apple-touch-icon.png");

    // JSON-LD: LocalBusiness schema (the big one for local Google rankings)
    var localBizSchema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": "https://homefrontsolutionsllc.com/#business",
      name: "Home Front Solutions",
      legalName: "Home Front Solutions, LLC",
      url: "https://homefrontsolutionsllc.com",
      logo: "https://homefrontsolutionsllc.com/logo.png",
      image: "https://homefrontsolutionsllc.com/og-image.jpg",
      description: "National door-to-door marketing company for home services including fiber internet, home security, solar, water filtration, and roofing. Headquartered in High Point, NC. Serving customers in markets across the United States.",
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
      sameAs: [
        FACEBOOK_URL,
        LINKEDIN_URL,
        INSTAGRAM_URL,
      ],
      makesOffer: PARTNERS.map(function(p) {
        return { "@type": "Offer", itemOffered: { "@type": "Service", name: p + " customer acquisition and field sales support", areaServed: "United States" } };
      }),
    };

    var organizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": "https://homefrontsolutionsllc.com/#organization",
      name: "Home Front Solutions, LLC",
      url: "https://homefrontsolutionsllc.com",
      logo: "https://homefrontsolutionsllc.com/logo.png",
      foundingLocation: {
        "@type": "Place",
        name: "High Point, North Carolina"
      },
      founder: { "@id": "https://homefrontsolutionsllc.com/#muizz-muhammad" },
      sameAs: [
        FACEBOOK_URL,
        LINKEDIN_URL,
        INSTAGRAM_URL
      ]
    };

    var founderSchema = {
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": "https://homefrontsolutionsllc.com/#muizz-muhammad",
      name: "Muizz Muhammad",
      jobTitle: "Founder",
      worksFor: { "@id": "https://homefrontsolutionsllc.com/#business" }
    };

    var serviceSchema = {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": "https://homefrontsolutionsllc.com/#services",
      serviceType: "Door-to-door customer acquisition and field sales support",
      provider: { "@id": "https://homefrontsolutionsllc.com/#business" },
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

    // Website schema (sitelinks search box eligible)
    var websiteSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": "https://homefrontsolutionsllc.com/#website",
      url: "https://homefrontsolutionsllc.com",
      name: "Home Front Solutions",
      publisher: { "@id": "https://homefrontsolutionsllc.com/#business" },
      inLanguage: "en-US",
    };

    // Breadcrumb schema for inner pages
    var breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://homefrontsolutionsllc.com/" },
      ],
    };
    if (route.name !== "home") {
      breadcrumbSchema.itemListElement.push({
        "@type": "ListItem",
        position: 2,
        name: titles[route.name] || route.name,
        item: "https://homefrontsolutionsllc.com" + pagePath,
      });
    }

    var schemas = [localBizSchema, organizationSchema, websiteSchema, breadcrumbSchema, serviceSchema, founderSchema];

    if (route.name === "home") {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: HOME_FAQS.map(function(item) {
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
        "@type": "ItemList",
        name: "Home Front Solutions Open Sales Jobs",
        itemListOrder: "https://schema.org/ItemListOrderAscending",
        numberOfItems: JOBS.length,
        itemListElement: JOBS.map(function(job, index) {
          return {
            "@type": "ListItem",
            position: index + 1,
            url: "https://homefrontsolutionsllc.com" + getPathForRoute("job", job.slug),
            name: job.title + " - " + job.location,
          };
        }),
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
        url: "https://homefrontsolutionsllc.com" + pagePath,
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
            url: "https://homefrontsolutionsllc.com" + getPathForRoute("job", job.slug),
            name: job.title + " - " + job.location
          };
        })
      });

      marketJobs.forEach(function(job) {
        var salary = getSalaryRange(job.earningRange);
        schemas.push({
          "@context": "https://schema.org",
          "@type": "JobPosting",
          title: job.title,
          description: "<p>" + job.overview + "</p><h3>Responsibilities</h3><ul>" + job.responsibilities.map(function(r) { return "<li>" + r + "</li>"; }).join("") + "</ul><h3>Qualifications</h3><ul>" + job.qualifications.map(function(r) { return "<li>" + r + "</li>"; }).join("") + "</ul>",
          identifier: { "@type": "PropertyValue", name: "Home Front Solutions", value: job.slug + "-market" },
          datePosted: "2026-04-10",
          validThrough: "2026-12-31T23:59",
          employmentType: "CONTRACTOR",
          hiringOrganization: { "@id": "https://homefrontsolutionsllc.com/#organization" },
          jobLocation: {
            "@type": "Place",
            address: {
              "@type": "PostalAddress",
              addressLocality: job.location.split(",")[0].trim(),
              addressRegion: "NC",
              addressCountry: "US"
            }
          },
          baseSalary: {
            "@type": "MonetaryAmount",
            currency: "USD",
            value: { "@type": "QuantitativeValue", minValue: salary.min, maxValue: salary.max, unitText: "YEAR" }
          },
          experienceRequirements: "No prior sales experience required for select roles. Training provided.",
          applicantLocationRequirements: {
            "@type": "Country",
            name: "United States"
          },
          directApply: true,
          url: "https://homefrontsolutionsllc.com" + getPathForRoute("job", job.slug)
        });
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
        url: "https://homefrontsolutionsllc.com" + pagePath,
        description: descriptions.insights,
        hasPart: ARTICLE_PAGES.map(function(article) {
          return {
            "@type": "Article",
            headline: article.title,
            url: "https://homefrontsolutionsllc.com" + getPathForRoute("article", article.slug)
          };
        })
      });
    }

    if (route.name === "article" && currentArticle) {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "Article",
        headline: currentArticle.title,
        description: currentArticle.description,
        author: {
          "@type": "Organization",
          name: "Home Front Solutions"
        },
        publisher: {
          "@id": "https://homefrontsolutionsllc.com/#business"
        },
        mainEntityOfPage: "https://homefrontsolutionsllc.com" + pagePath
      });
    }

    if (route.name === "why-us") {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "AboutPage",
        name: "About Home Front Solutions",
        url: "https://homefrontsolutionsllc.com" + pagePath,
        about: { "@id": "https://homefrontsolutionsllc.com/#organization" },
        description: "About Home Front Solutions, including founder, company focus, field-sales recruiting, and home-services growth model."
      });
    }

    // JobPosting schema for job detail pages (Google Jobs widget)
    if (route.name === "job" && route.slug) {
      var job = JOBS.find(function(j) { return j.slug === route.slug; });
      if (job) {
        var salary = getSalaryRange(job.earningRange);
        schemas.push({
          "@context": "https://schema.org",
          "@type": "JobPosting",
          title: job.title,
          description: "<p>" + job.overview + "</p><h3>Responsibilities</h3><ul>" + job.responsibilities.map(function(r) { return "<li>" + r + "</li>"; }).join("") + "</ul><h3>Qualifications</h3><ul>" + job.qualifications.map(function(r) { return "<li>" + r + "</li>"; }).join("") + "</ul>",
          identifier: { "@type": "PropertyValue", name: "Home Front Solutions", value: job.slug },
          datePosted: "2026-04-10",
          validThrough: "2026-12-31T23:59",
          employmentType: "CONTRACTOR",
          hiringOrganization: { "@id": "https://homefrontsolutionsllc.com/#organization" },
          jobLocation: {
            "@type": "Place",
            address: {
              "@type": "PostalAddress",
              addressLocality: job.location.split(",")[0].trim(),
              addressRegion: "NC",
              addressCountry: "US",
            },
          },
          baseSalary: {
            "@type": "MonetaryAmount",
            currency: "USD",
            value: { "@type": "QuantitativeValue", minValue: salary.min, maxValue: salary.max, unitText: "YEAR" },
          },
          experienceRequirements: "No prior sales experience required for select roles. Training provided.",
          directApply: true,
          url: "https://homefrontsolutionsllc.com" + getPathForRoute("job", job.slug),
          applicantLocationRequirements: {
            "@type": "Country",
            name: "United States",
          },
        });
      }
    }

    // Inject all schemas
    var existing = document.getElementById("ld-json");
    if (existing) existing.remove();
    var script = document.createElement("script");
    script.id = "ld-json";
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(schemas);
    document.head.appendChild(script);

    // Canonical URL
    var canonicalEl = document.querySelector("link[rel='canonical']");
    if (!canonicalEl) {
      canonicalEl = document.createElement("link");
      canonicalEl.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute("href", "https://homefrontsolutionsllc.com" + pagePath);
  }, [route.name, route.slug]);

  function go(name, slug) {
    var nextRoute = { name: name, slug: slug || null };
    var nextPath = getPathForRoute(nextRoute.name, nextRoute.slug);
    if (document.activeElement && typeof document.activeElement.blur === "function") {
      document.activeElement.blur();
    }
    if (window.location.pathname !== nextPath) {
      window.history.pushState(nextRoute, "", nextPath);
    }
    setRoute(nextRoute);
  }

  return (
    <div style={{ fontFamily: "'Aptos', 'Segoe UI', system-ui, sans-serif", background: PAPER, color: INK, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        ::selection { background: rgba(59,93,124,0.18); }
        a { text-decoration: none; color: inherit; }
        body { -webkit-font-smoothing: antialiased; }
        input:focus, select:focus, textarea:focus { border-color: ${INK} !important; }
        button:focus-visible { outline: 2px solid ${SIGNAL}; outline-offset: 2px; }
        .lift-card {
          transition: transform 260ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 260ms cubic-bezier(0.22, 1, 0.36, 1), border-color 260ms ease, background-position 320ms ease;
          transform-origin: center;
        }
        .lift-card:hover {
          transform: translateY(-6px) scale(1.01);
          box-shadow: 0 22px 46px rgba(14,14,12,0.1);
          border-color: rgba(59,93,124,0.26) !important;
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
      `}</style>

      <Header go={go} />

      <main style={{ flex: 1 }}>
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
      </main>

      <Footer go={go} />
    </div>
  );
}
