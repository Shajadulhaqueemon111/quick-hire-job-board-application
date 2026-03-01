export type JobTag = { label: string; color: string };

export type Job = {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  posted: string;
  deadline: string;
  tags: JobTag[];
  about: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  companyDesc: string;
};

// ── Featured Jobs (id 1–8) ──
export const featuredJobsData: Record<number, Job> = {
  1: {
    id: 1,
    title: "Email Marketing Specialist",
    company: "Revolut",
    location: "Madrid, Spain",
    type: "Full Time",
    salary: "$60,000 – $80,000",
    posted: "2 days ago",
    deadline: "March 30, 2025",
    tags: [
      { label: "Marketing", color: "bg-orange-100 text-orange-500" },
      { label: "Design", color: "bg-green-100 text-green-500" },
    ],
    about:
      "Revolut is looking for a talented Email Marketing Specialist to join our growing marketing team in Madrid. You will be responsible for crafting high-converting email campaigns, managing our subscriber lists, and analyzing campaign performance to drive engagement and revenue growth.",
    responsibilities: [
      "Plan and execute end-to-end email marketing campaigns",
      "Segment audiences and personalize content for maximum impact",
      "A/B test subject lines, content, and CTAs to optimize performance",
      "Analyze campaign metrics and generate weekly performance reports",
      "Collaborate with design and content teams to produce compelling emails",
      "Maintain and grow our email subscriber database",
    ],
    requirements: [
      "3+ years of experience in email marketing",
      "Proficiency with tools like Mailchimp, Klaviyo, or HubSpot",
      "Strong copywriting and communication skills",
      "Experience with A/B testing and data-driven decision making",
      "Knowledge of HTML/CSS for email templates is a plus",
      "Fluent in English; Spanish is a bonus",
    ],
    benefits: [
      "Competitive salary + performance bonuses",
      "Flexible remote working options",
      "Health & dental insurance",
      "Annual learning & development budget",
      "Company-wide retreats twice a year",
    ],
    companyDesc:
      "Revolut is a global fintech company offering banking, payments, and financial services to millions of customers worldwide. We move fast, think big, and believe in a world where money works for everyone.",
  },
  2: {
    id: 2,
    title: "Brand Designer",
    company: "Dropbox",
    location: "San Francisco, US",
    type: "Full Time",
    salary: "$90,000 – $120,000",
    posted: "1 day ago",
    deadline: "April 15, 2025",
    tags: [
      { label: "Design", color: "bg-green-100 text-green-500" },
      { label: "Business", color: "bg-indigo-100 text-indigo-600" },
    ],
    about:
      "Dropbox is seeking a Brand Designer to help shape and evolve our visual identity across all touchpoints. You will work closely with our marketing and product teams to produce world-class design work.",
    responsibilities: [
      "Develop and maintain brand guidelines and design systems",
      "Create visual assets for marketing campaigns and product launches",
      "Collaborate with cross-functional teams on brand consistency",
      "Design print and digital materials including decks, ads, and social assets",
      "Conduct design reviews and provide feedback to junior designers",
    ],
    requirements: [
      "4+ years of brand or graphic design experience",
      "Expert-level Figma and Adobe Creative Suite skills",
      "Strong portfolio showcasing brand identity work",
      "Excellent attention to detail and visual aesthetics",
      "Ability to manage multiple projects simultaneously",
    ],
    benefits: [
      "Top-tier compensation and equity",
      "Remote-first culture with flexible hours",
      "Comprehensive health benefits",
      "Home office stipend",
      "401(k) with company match",
    ],
    companyDesc:
      "Dropbox is a smart workspace that helps people focus on the work that matters. With over 700 million registered users across 180 countries, Dropbox is one of the world's leading SaaS companies.",
  },
  3: {
    id: 3,
    title: "Email Marketing Manager",
    company: "Pitch",
    location: "Berlin, Germany",
    type: "Full Time",
    salary: "€55,000 – €75,000",
    posted: "3 days ago",
    deadline: "April 1, 2025",
    tags: [{ label: "Marketing", color: "bg-orange-100 text-orange-500" }],
    about:
      "Pitch is seeking an Email Marketing Manager to own our customer communication strategy and drive product adoption through targeted campaigns.",
    responsibilities: [
      "Own end-to-end email marketing strategy",
      "Build automated drip campaigns and onboarding flows",
      "Monitor deliverability and list health",
      "Collaborate with product and growth teams",
    ],
    requirements: [
      "2+ years email marketing experience",
      "Familiarity with Customer.io or similar",
      "Strong analytical mindset",
      "Experience in SaaS preferred",
    ],
    benefits: [
      "Competitive salary",
      "Stock options",
      "Remote friendly",
      "Home office budget",
    ],
    companyDesc:
      "Pitch is a collaborative presentation software company based in Berlin, empowering teams to create beautiful presentations.",
  },
  4: {
    id: 4,
    title: "Visual Designer",
    company: "Blinklist",
    location: "Granada, Spain",
    type: "Full Time",
    salary: "€50,000 – €65,000",
    posted: "5 days ago",
    deadline: "April 10, 2025",
    tags: [{ label: "Design", color: "bg-green-100 text-green-500" }],
    about:
      "Blinklist is looking for a Visual Designer to create stunning digital experiences for our global audience.",
    responsibilities: [
      "Create UI assets, icons and illustrations",
      "Support product team with design deliverables",
      "Build and maintain component libraries",
    ],
    requirements: [
      "3+ years visual design experience",
      "Proficient in Figma",
      "Motion graphics skills a plus",
    ],
    benefits: ["Flexible hours", "Health insurance", "Annual team retreats"],
    companyDesc:
      "Blinklist is the world's largest book summary platform, helping people learn more in less time.",
  },
  5: {
    id: 5,
    title: "Product Designer",
    company: "ClassPass",
    location: "Manchester, UK",
    type: "Full Time",
    salary: "£65,000 – £85,000",
    posted: "1 week ago",
    deadline: "April 20, 2025",
    tags: [
      { label: "Marketing", color: "bg-orange-100 text-orange-500" },
      { label: "Design", color: "bg-green-100 text-green-500" },
    ],
    about:
      "ClassPass is hiring a Product Designer to shape the future of fitness and wellness through thoughtful, user-centered design.",
    responsibilities: [
      "Lead design for core product features",
      "Conduct user research and usability testing",
      "Create wireframes, prototypes and final designs",
      "Collaborate with engineering to ship high-quality products",
    ],
    requirements: [
      "4+ years product design experience",
      "Strong UX and visual design portfolio",
      "Experience with design systems",
      "Excellent communication skills",
    ],
    benefits: [
      "Competitive salary + bonus",
      "Free ClassPass membership",
      "Flexible remote work",
      "Learning budget",
    ],
    companyDesc:
      "ClassPass is a fitness membership platform connecting users to thousands of gyms, studios and wellness experiences.",
  },
  6: {
    id: 6,
    title: "Lead Designer",
    company: "Canva",
    location: "Ontario, Canada",
    type: "Full Time",
    salary: "CAD $100,000 – $130,000",
    posted: "2 days ago",
    deadline: "May 1, 2025",
    tags: [
      { label: "Design", color: "bg-green-100 text-green-500" },
      { label: "Business", color: "bg-indigo-100 text-indigo-600" },
    ],
    about:
      "Canva is looking for a Lead Designer to drive design excellence across our platform and mentor a team of talented designers.",
    responsibilities: [
      "Lead a team of 5+ designers",
      "Define design vision and strategy",
      "Collaborate with product and engineering leads",
      "Establish and evolve design standards",
    ],
    requirements: [
      "6+ years design experience",
      "2+ years in a design lead role",
      "Strong portfolio with complex product work",
      "Excellent leadership and communication skills",
    ],
    benefits: [
      "Top-tier salary and equity",
      "Fully remote",
      "Generous parental leave",
      "Annual design conference budget",
    ],
    companyDesc:
      "Canva is a graphic design platform empowering everyone to design anything and publish anywhere.",
  },
  7: {
    id: 7,
    title: "Brand Strategist",
    company: "GoDaddy",
    location: "Marseille, France",
    type: "Full Time",
    salary: "€70,000 – €90,000",
    posted: "4 days ago",
    deadline: "April 25, 2025",
    tags: [{ label: "Marketing", color: "bg-orange-100 text-orange-500" }],
    about:
      "GoDaddy is looking for a Brand Strategist to help define and evolve our brand presence across the EMEA region.",
    responsibilities: [
      "Develop brand positioning and messaging frameworks",
      "Lead market research and competitive analysis",
      "Partner with creative teams on campaigns",
      "Measure brand health metrics",
    ],
    requirements: [
      "5+ years brand strategy experience",
      "Strong analytical and presentation skills",
      "Experience in tech or SaaS brands preferred",
    ],
    benefits: [
      "Attractive package",
      "Stock options",
      "International travel opportunities",
      "Flexible work",
    ],
    companyDesc:
      "GoDaddy helps millions of entrepreneurs around the world start, grow, and scale their businesses.",
  },
  8: {
    id: 8,
    title: "Data Analyst",
    company: "Twitter",
    location: "San Diego, US",
    type: "Full Time",
    salary: "$80,000 – $110,000",
    posted: "6 days ago",
    deadline: "April 30, 2025",
    tags: [{ label: "Technology", color: "bg-red-100 text-red-400" }],
    about:
      "Twitter is seeking a Data Analyst to turn complex data into actionable insights that drive product and business decisions.",
    responsibilities: [
      "Analyze large datasets to identify trends and opportunities",
      "Build dashboards and reports for stakeholders",
      "Collaborate with product and engineering teams",
      "Present findings to senior leadership",
    ],
    requirements: [
      "3+ years data analysis experience",
      "Proficiency in SQL, Python or R",
      "Experience with Tableau or Looker",
      "Strong storytelling with data",
    ],
    benefits: [
      "Competitive salary",
      "Equity grants",
      "Health and wellness benefits",
      "Home office allowance",
    ],
    companyDesc:
      "Twitter is a public conversation platform that connects people to what matters most to them.",
  },
};

// ── Latest Jobs (id 9–16) ──
export const latestJobsData: Record<number, Job> = {
  9: {
    id: 9,
    title: "Social Media Assistant",
    company: "Nomad",
    location: "Paris, France",
    type: "Full Time",
    salary: "€45,000 – €60,000",
    posted: "1 day ago",
    deadline: "April 5, 2025",
    tags: [
      { label: "Full-Time", color: "bg-green-100 text-green-500" },
      { label: "Marketing", color: "bg-orange-100 text-orange-400" },
      {
        label: "Design",
        color: "bg-indigo-100 text-indigo-600 border border-indigo-300",
      },
    ],
    about:
      "Nomad is looking for a Social Media Assistant to manage and grow our social media presence across multiple platforms in Paris.",
    responsibilities: [
      "Create and schedule daily social media posts",
      "Engage with followers and respond to comments",
      "Assist in planning social campaigns and content calendars",
      "Track analytics and report on performance",
      "Collaborate with marketing and design teams",
    ],
    requirements: [
      "1+ year social media experience",
      "Familiarity with Instagram, Twitter, LinkedIn",
      "Basic graphic design skills (Canva or similar)",
      "Strong written communication in English and French",
    ],
    benefits: [
      "Flexible remote work",
      "Monthly team lunch budget",
      "Career growth opportunities",
      "Health insurance",
    ],
    companyDesc:
      "Nomad is a remote-first digital agency helping global brands build meaningful online communities.",
  },
  10: {
    id: 10,
    title: "Social Media Assistant",
    company: "Netlify",
    location: "Paris, France",
    type: "Full Time",
    salary: "€50,000 – €65,000",
    posted: "2 days ago",
    deadline: "April 8, 2025",
    tags: [
      { label: "Full-Time", color: "bg-green-100 text-green-500" },
      { label: "Marketing", color: "bg-orange-100 text-orange-400" },
      {
        label: "Design",
        color: "bg-indigo-100 text-indigo-600 border border-indigo-300",
      },
    ],
    about:
      "Netlify is hiring a Social Media Assistant to amplify our developer-focused brand voice and grow our online community.",
    responsibilities: [
      "Manage Netlify's social channels including Twitter and LinkedIn",
      "Create developer-friendly content and tutorials",
      "Monitor brand mentions and industry trends",
      "Run social media ads and track ROI",
      "Coordinate with the content and developer relations teams",
    ],
    requirements: [
      "2+ years social media management experience",
      "Understanding of developer tools and culture",
      "Experience with social media analytics tools",
      "Strong copywriting skills",
    ],
    benefits: [
      "Fully remote work",
      "Stock options",
      "Home office stipend",
      "Generous PTO policy",
    ],
    companyDesc:
      "Netlify is the platform for modern web development, empowering developers to build, deploy, and scale web applications.",
  },
  11: {
    id: 11,
    title: "Brand Designer",
    company: "Dropbox",
    location: "San Francisco, USA",
    type: "Full Time",
    salary: "$90,000 – $120,000",
    posted: "3 days ago",
    deadline: "April 15, 2025",
    tags: [
      { label: "Full-Time", color: "bg-green-100 text-green-500" },
      { label: "Marketing", color: "bg-orange-100 text-orange-400" },
      {
        label: "Design",
        color: "bg-indigo-100 text-indigo-600 border border-indigo-300",
      },
    ],
    about:
      "Dropbox is seeking a Brand Designer to help evolve our visual identity and create compelling brand experiences across all touchpoints.",
    responsibilities: [
      "Develop brand assets for campaigns and launches",
      "Maintain and evolve our design system",
      "Partner with marketing and product teams",
      "Create presentations, social assets, and print materials",
    ],
    requirements: [
      "4+ years brand design experience",
      "Expert-level Figma skills",
      "Strong visual portfolio",
      "Experience with motion design is a plus",
    ],
    benefits: [
      "Competitive salary + equity",
      "Remote-first culture",
      "Comprehensive health benefits",
      "Home office stipend",
      "401(k) with match",
    ],
    companyDesc:
      "Dropbox is a smart workspace platform used by over 700 million people to collaborate and get work done.",
  },
  12: {
    id: 12,
    title: "Brand Designer",
    company: "Maze",
    location: "San Francisco, USA",
    type: "Full Time",
    salary: "$80,000 – $105,000",
    posted: "4 days ago",
    deadline: "April 18, 2025",
    tags: [
      { label: "Full-Time", color: "bg-green-100 text-green-500" },
      { label: "Marketing", color: "bg-orange-100 text-orange-400" },
      {
        label: "Design",
        color: "bg-indigo-100 text-indigo-600 border border-indigo-300",
      },
    ],
    about:
      "Maze is looking for a Brand Designer to shape how the world perceives our product-led growth platform through stunning visual storytelling.",
    responsibilities: [
      "Create visual assets for marketing campaigns",
      "Build and maintain brand guidelines",
      "Design for digital and print across all channels",
      "Work with growth and product teams on brand consistency",
    ],
    requirements: [
      "3+ years brand or visual design experience",
      "Strong portfolio showing brand identity work",
      "Proficiency in Figma and Adobe tools",
      "Eye for detail and typography",
    ],
    benefits: [
      "Competitive pay + options",
      "Flexible remote work",
      "Annual learning budget",
      "Team retreats",
    ],
    companyDesc:
      "Maze is a rapid testing platform that helps product teams collect and analyze user insights at scale.",
  },
  13: {
    id: 13,
    title: "Interactive Developer",
    company: "Terraform",
    location: "Hamburg, Germany",
    type: "Full Time",
    salary: "€75,000 – €95,000",
    posted: "2 days ago",
    deadline: "April 12, 2025",
    tags: [
      { label: "Full-Time", color: "bg-green-100 text-green-500" },
      { label: "Marketing", color: "bg-orange-100 text-orange-400" },
      {
        label: "Design",
        color: "bg-indigo-100 text-indigo-600 border border-indigo-300",
      },
    ],
    about:
      "Terraform is seeking an Interactive Developer to build innovative web experiences that push creative and technical boundaries.",
    responsibilities: [
      "Build interactive web experiences using modern frameworks",
      "Collaborate with designers to bring creative concepts to life",
      "Optimize performance and accessibility of web projects",
      "Prototype rapidly and iterate based on feedback",
    ],
    requirements: [
      "3+ years frontend development experience",
      "Proficiency in React, Three.js or WebGL",
      "Creative portfolio with interactive work",
      "Strong eye for animation and motion",
    ],
    benefits: [
      "Competitive salary",
      "Flexible hours",
      "Remote or hybrid",
      "Annual tech budget",
      "Professional development",
    ],
    companyDesc:
      "Terraform Labs builds next-generation digital products and immersive web experiences for global brands.",
  },
  14: {
    id: 14,
    title: "Interactive Developer",
    company: "Udacity",
    location: "Hamburg, Germany",
    type: "Full Time",
    salary: "€70,000 – €90,000",
    posted: "5 days ago",
    deadline: "April 22, 2025",
    tags: [
      { label: "Full-Time", color: "bg-green-100 text-green-500" },
      { label: "Marketing", color: "bg-orange-100 text-orange-400" },
      {
        label: "Design",
        color: "bg-indigo-100 text-indigo-600 border border-indigo-300",
      },
    ],
    about:
      "Udacity is hiring an Interactive Developer to create engaging learning experiences and tools for our global student community.",
    responsibilities: [
      "Build interactive course content and assessments",
      "Work with instructional designers and educators",
      "Develop and maintain learning management system features",
      "Ensure mobile responsiveness and accessibility",
    ],
    requirements: [
      "3+ years frontend experience",
      "Proficiency in JavaScript/TypeScript and React",
      "Experience building educational or interactive tools preferred",
      "Strong understanding of UX principles",
    ],
    benefits: [
      "Mission-driven culture",
      "Free access to all Nanodegree programs",
      "Remote friendly",
      "Health insurance",
      "Learning stipend",
    ],
    companyDesc:
      "Udacity is an online learning platform offering industry-relevant tech education to learners worldwide.",
  },
  15: {
    id: 15,
    title: "HR Manager",
    company: "Packer",
    location: "Lucern, Switzerland",
    type: "Full Time",
    salary: "CHF 90,000 – 110,000",
    posted: "1 week ago",
    deadline: "April 28, 2025",
    tags: [
      { label: "Full-Time", color: "bg-green-100 text-green-500" },
      { label: "Marketing", color: "bg-orange-100 text-orange-400" },
      {
        label: "Design",
        color: "bg-indigo-100 text-indigo-600 border border-indigo-300",
      },
    ],
    about:
      "Packer is looking for an HR Manager to lead our people operations, culture initiatives, and talent acquisition in Lucern.",
    responsibilities: [
      "Manage full-cycle recruitment and onboarding",
      "Lead HR strategy and people operations",
      "Develop and implement employee engagement programs",
      "Ensure compliance with Swiss labor laws",
      "Manage performance review processes",
    ],
    requirements: [
      "5+ years HR management experience",
      "Deep knowledge of Swiss employment law",
      "Strong interpersonal and communication skills",
      "Experience with HR software like BambooHR or Personio",
    ],
    benefits: [
      "Above-market salary",
      "Pension contributions",
      "Private health insurance",
      "5 weeks vacation",
      "Hybrid work",
    ],
    companyDesc:
      "Packer is a Swiss-based infrastructure and DevOps tooling company helping teams automate and scale cloud environments.",
  },
  16: {
    id: 16,
    title: "HR Manager",
    company: "Webflow",
    location: "Lucern, Switzerland",
    type: "Full Time",
    salary: "CHF 95,000 – 120,000",
    posted: "3 days ago",
    deadline: "May 5, 2025",
    tags: [
      { label: "Full-Time", color: "bg-green-100 text-green-500" },
      { label: "Marketing", color: "bg-orange-100 text-orange-400" },
      {
        label: "Design",
        color: "bg-indigo-100 text-indigo-600 border border-indigo-300",
      },
    ],
    about:
      "Webflow is seeking an experienced HR Manager to build and scale our people team in Europe, based out of Lucern.",
    responsibilities: [
      "Own talent acquisition for the EMEA region",
      "Build scalable HR processes and policies",
      "Drive diversity, equity and inclusion programs",
      "Manage employee relations and conflict resolution",
      "Partner with leadership on org design and workforce planning",
    ],
    requirements: [
      "6+ years HR experience in tech companies",
      "Experience building HR processes from scratch",
      "Strong leadership and strategic thinking",
      "Fluent in English; German or French is a plus",
    ],
    benefits: [
      "Top-tier compensation",
      "Equity package",
      "Fully remote option",
      "Generous parental leave",
      "Annual team offsite",
    ],
    companyDesc:
      "Webflow is a no-code web design platform empowering designers and businesses to build professional websites without writing code.",
  },
};
