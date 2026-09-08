// Abrielex Business Consultancy — central site data.
// Structured to mirror future admin-managed entities (countries, services, resources, etc.)

export const companyInfo = {
  name: "Abrielex Business Consultancy",
  tagline: "Secure Your Business With Us",
  phone: "029 226 3415",
  phoneIntl: "+263292263415",
  whatsapp: "071 834 6001",
  whatsappIntl: "263718346001",
  email: "abrielexconsultancy@gmail.com",
  office: {
    line1: "Office No. 116, Lutheran House",
    line2: "L/Takawira & Herbert Chitepo",
    city: "Bulawayo",
    country: "Zimbabwe",
  },
  social: {
    tiktok: "@abrielexconsultancy",
    tiktokUrl: "https://www.tiktok.com/@abrielexconsultancy",
    facebook: "Abrielex Business Consultants",
    facebookUrl: "https://www.facebook.com/profile.php?id=AbrielexBusinessConsultants",
  },
  logoUrl:
    "https://media.base44.com/images/public/user_6a87c5f2c8a0dd45c2e8e73b/8a0351310_Abrielex_logo.svg",
  coverage: [
    "Bulawayo",
    "Harare",
    "Gwanda",
    "Hwange",
    "Lupane",
    "Victoria Falls",
    "Masvingo",
  ],
  regions: ["Matabeleland North", "Matabeleland South", "Midlands", "Masvingo", "Mashonaland"],
  remoteServices: true,
};

export const whatsappLink = `https://wa.me/${companyInfo.whatsappIntl}`;
export const telLink = `tel:${companyInfo.phoneIntl}`;
export const mailLink = `mailto:${companyInfo.email}`;

// ---------------------------------------------------------------------------
// COUNTRIES — regulatory DNA per jurisdiction
// ---------------------------------------------------------------------------
export const countries = [
  {
    code: "ZW",
    name: "Zimbabwe",
    currency: "USD / ZiG",
    confirmed: true,
    flag: "🇿🇼",
    regulatoryBodies: {
      tax: "ZIMRA — Zimbabwe Revenue Authority",
      companies: "Deeds, Companies & Intellectual Property Registry (DCIP)",
      procurement: "PRAZ — Procurement Regulatory Authority of Zimbabwe",
      local: "Local Municipality / City Council",
      liquor: "Local Liquor Licensing Board",
    },
    states: [
      { name: "Bulawayo", cities: ["Bulawayo CBD", "Burnside", "Hillside", "Suburbs", "Belmont"] },
      { name: "Harare", cities: ["Harare CBD", "Borrowdale", "Avondale", "Mt Pleasant", "Belvedere"] },
      { name: "Matabeleland North", cities: ["Lupane", "Hwange", "Victoria Falls", "Tsholotsho"] },
      { name: "Matabeleland South", cities: ["Gwanda", "Beitbridge", "Plumtree"] },
      { name: "Midlands", cities: ["Gweru", "Kwekwe", "Zvishavane"] },
      { name: "Masvingo", cities: ["Masvingo", "Chiredzi", "Triangle"] },
    ],
  },
  {
    code: "ZA",
    name: "South Africa",
    currency: "ZAR",
    confirmed: false,
    flag: "🇿🇦",
    regulatoryBodies: {
      tax: "SARS — South African Revenue Service (to be confirmed)",
      companies: "CIPC — Companies and Intellectual Property Commission (to be confirmed)",
      procurement: "National Treasury eTenders (to be confirmed)",
      local: "Local Municipality (to be confirmed)",
      liquor: "Provincial Liquor Board (to be confirmed)",
    },
    states: [
      { name: "Gauteng", cities: ["Johannesburg", "Pretoria", "Sandton"] },
      { name: "Western Cape", cities: ["Cape Town", "Stellenbosch"] },
      { name: "KwaZulu-Natal", cities: ["Durban", "Pietermaritzburg"] },
    ],
  },
  {
    code: "ZM",
    name: "Zambia",
    currency: "ZMW",
    confirmed: false,
    flag: "🇿🇲",
    regulatoryBodies: {
      tax: "ZRA — Zambia Revenue Authority (to be confirmed)",
      companies: "PACRA — Patents and Companies Registration Agency (to be confirmed)",
      procurement: "ZPPA — Zambia Public Procurement Authority (to be confirmed)",
      local: "Local Municipality (to be confirmed)",
      liquor: "Provincial Liquor Authority (to be confirmed)",
    },
    states: [
      { name: "Lusaka", cities: ["Lusaka", "Kafue"] },
      { name: "Copperbelt", cities: ["Ndola", "Kitwe"] },
      { name: "Southern", cities: ["Livingstone", "Choma"] },
    ],
  },
  {
    code: "MZ",
    name: "Mozambique",
    currency: "MZN",
    confirmed: false,
    flag: "🇲🇿",
    regulatoryBodies: {
      tax: "AT — Autoridade Tributária (to be confirmed)",
      companies: "Conservatória do Registo Comercial (to be confirmed)",
      procurement: "Mozambique Public Procurement (to be confirmed)",
      local: "Local Municipality (to be confirmed)",
      liquor: "Provincial Authority (to be confirmed)",
    },
    states: [
      { name: "Maputo", cities: ["Maputo", "Matola"] },
      { name: "Sofala", cities: ["Beira"] },
      { name: "Nampula", cities: ["Nampula"] },
    ],
  },
  {
    code: "AU",
    name: "Australia",
    currency: "AUD",
    confirmed: false,
    flag: "🇦🇺",
    regulatoryBodies: {
      tax: "ATO — Australian Taxation Office (to be confirmed)",
      companies: "ASIC — Australian Securities & Investments Commission (to be confirmed)",
      procurement: "State Procurement Boards (to be confirmed)",
      local: "Local Council (to be confirmed)",
      liquor: "State Liquor Authority (to be confirmed)",
    },
    states: [
      { name: "New South Wales", cities: ["Sydney", "Newcastle"] },
      { name: "Victoria", cities: ["Melbourne", "Geelong"] },
      { name: "Queensland", cities: ["Brisbane", "Gold Coast"] },
      { name: "Western Australia", cities: ["Perth"] },
    ],
  },
];

// ---------------------------------------------------------------------------
// SERVICE CATEGORIES — the 5 main dossiers
// ---------------------------------------------------------------------------
export const serviceCategories = [
  {
    slug: "company-secretarial",
    title: "Company Secretarial Services",
    short: "Company registrations, director changes, annual returns & document retrieval.",
    icon: "Building2",
  },
  {
    slug: "zimra-tax-customs",
    title: "ZIMRA Tax & Customs Services",
    short: "Tax registration, returns filing, health checkups, assessments & customs.",
    icon: "Receipt",
  },
  {
    slug: "praz-vendor-numbers",
    title: "PRAZ & Vendor Number Services",
    short: "PRAZ registration, vendor numbers, tender bidding & account activations.",
    icon: "FileCheck",
  },
  {
    slug: "bookkeeping-financial",
    title: "Bookkeeping & Financial Services",
    short: "Accounting, reporting, auditing, reconciliations & financial planning.",
    icon: "Calculator",
  },
  {
    slug: "general-services",
    title: "General Business Services",
    short: "Liquor & shop licenses, agreements, labour relations & more.",
    icon: "Briefcase",
  },
];

// Full detail per category
export const serviceDetails = {
  "company-secretarial": {
    title: "Company Secretarial Services",
    intro:
      "We handle the full lifecycle of your company's statutory records — from first registration to ongoing compliance — so your business stays legally recognised, up to date, and ready for any transaction.",
    whatItIs:
      "Company secretarial services cover the formal registration, maintenance and retrieval of a company's legal identity and statutory records with the relevant companies registry.",
    usedFor:
      "Used to legally establish a business entity, keep its records current, reflect changes in ownership or management, and retrieve or verify official documents for banking, tendering and compliance purposes.",
    whoFor:
      "Entrepreneurs starting a new business, existing companies updating their structure, and organisations needing to verify or retrieve company records.",
    howItHelps:
      "We remove the administrative burden of statutory compliance, reduce the risk of penalties for late or incorrect filings, and ensure your company documents are always ready when opportunities arise.",
    benefits: [
      "Legally recognised business entity",
      "Up-to-date statutory records",
      "Faster access to banking and tenders",
      "Reduced risk of compliance penalties",
      "Professional handling of all registry filings",
    ],
    requirements: [
      "Proposed company name (with alternatives)",
      "Directors' national IDs and proof of residence",
      "Registered office address",
      "Share structure and subscriber details",
      "Memorandum & Articles of Association (drafted for you)",
    ],
    process: [
      "Name search and reservation",
      "Preparation of incorporation documents",
      "Submission to the companies registry",
      "Collection and delivery of registration certificate",
      "Ongoing statutory maintenance",
    ],
    documents: [
      "Certificate of Incorporation",
      "CR6 / Registered Office form",
      "CR5 / Directors form",
      "Memorandum & Articles of Association",
    ],
    processingTime: "Typically 5–10 working days for new registrations (subject to registry turnaround).",
    faqs: [
      {
        q: "Can I register a company without visiting your office?",
        a: "Yes. We offer remote/online services across all our coverage areas and can process your registration with documents shared digitally.",
      },
      {
        q: "What if I need to change my directors?",
        a: "We prepare and file the required change-of-directors forms with the registry and update your statutory records accordingly.",
      },
      {
        q: "Do you handle annual returns for existing companies?",
        a: "Yes. We prepare and submit annual returns to keep your company active and compliant.",
      },
    ],
    related: ["zimra-tax-customs", "praz-vendor-numbers"],
    subServices: [
      { name: "Company registrations & re-registration", description: "New company incorporation and re-registration under current laws." },
      { name: "Change of Directors", description: "Filing updates to your company's directorship." },
      { name: "Preparation of annual returns", description: "Keeping your company active with timely annual filings." },
      { name: "Company documents retrieval", description: "Obtaining certified copies of company records." },
      { name: "Company documents verification", description: "Verifying the authenticity and status of company documents." },
      { name: "Other related company secretarial services", description: "Bespoke statutory support tailored to your needs." },
    ],
  },
  "zimra-tax-customs": {
    title: "ZIMRA Tax & Customs Services",
    intro:
      "We manage your tax obligations end-to-end — registration, filing, health checkups and representations — so you stay compliant, avoid penalties, and keep your tax affairs in good order.",
    whatItIs:
      "Comprehensive tax and customs services covering registration, returns, account management, assessments and customs activation with the revenue authority.",
    usedFor:
      "Used to register for and remain compliant with tax obligations, file returns accurately, resolve tax queries, and activate customs operations for importers and exporters.",
    whoFor:
      "Individuals, SMEs, companies, traders and NGOs that need to register, file, or resolve tax and customs matters.",
    howItHelps:
      "We ensure accurate, on-time filings, identify and correct compliance gaps before they become penalties, and represent you in tax assessments — saving you time, money and stress.",
    benefits: [
      "Full tax compliance with the revenue authority",
      "Accurate, on-time returns",
      "Early detection of compliance gaps",
      "Professional representation in assessments",
      "Smooth customs activation for trade",
    ],
    requirements: [
      "National ID / passport",
      "Proof of residence",
      "Business registration documents (where applicable)",
      "Bank account details",
      "Previous tax records (for existing clients)",
    ],
    process: [
      "Review of your current tax position",
      "Registration or account update with the revenue authority",
      "Preparation and filing of returns",
      "Tax health checkup and recommendations",
      "Ongoing compliance management",
    ],
    documents: ["Tax registration certificate (BP/F)", "Tax clearance certificate", "Filed returns", "Assessment notices"],
    processingTime: "Registration typically 3–7 working days; returns filed per statutory deadlines.",
    faqs: [
      {
        q: "What is a tax health checkup?",
        a: "A review of your tax account to identify outstanding returns, errors, or penalties and recommend corrective action before they escalate.",
      },
      {
        q: "Can you update my TaRMS account credentials?",
        a: "Yes. We assist with updating and managing your tax account credentials and profile.",
      },
      {
        q: "Do you handle tax assessment representations?",
        a: "Yes. We represent clients in tax assessments and disputes with the revenue authority.",
      },
    ],
    related: ["company-secretarial", "bookkeeping-financial"],
    subServices: [
      { name: "ZIMRA tax registration & renewal", description: "New tax registration and renewal of tax clearance." },
      { name: "Tax returns filing", description: "Accurate, on-time filing of all required returns." },
      { name: "Tax health checkups", description: "Proactive review of your tax compliance status." },
      { name: "Updating TaRMS account credentials", description: "Managing your online tax account access." },
      { name: "Tax assessment representations", description: "Professional representation in assessments and disputes." },
      { name: "Customs activation", description: "Activating customs operations for importers and exporters." },
      { name: "Other related tax and customs services", description: "Bespoke tax support tailored to your needs." },
    ],
  },
  "praz-vendor-numbers": {
    title: "PRAZ & Vendor Number Services",
    titleByCountry: {
      ZW: "PRAZ & Vendor Number Services",
      ZA: "Procurement Registration & Vendor Numbers",
      ZM: "ZPPA & Vendor Number Services",
      MZ: "Public Procurement & Vendor Numbers",
      AU: "Procurement Registration & Vendor Numbers",
    },
    intro:
      "We get you procurement-ready — registering your business with the procurement authority, securing vendor numbers, and preparing tender documentation so you can compete for public contracts.",
    whatItIs:
      "Services covering registration with the procurement authority, vendor number acquisition, tender bidding documentation and account activation for public procurement platforms.",
    usedFor:
      "Used to qualify your business to bid for government and public-sector tenders and to maintain an active, compliant vendor profile.",
    whoFor:
      "Businesses intending to supply goods or services to government, parastatals and public institutions.",
    howItHelps:
      "We navigate the procurement registration process on your behalf, ensure your vendor profile is active and compliant, and prepare professional tender documentation to improve your chances of winning.",
    benefits: [
      "Eligibility to bid for public tenders",
      "Active, compliant vendor profile",
      "Professional tender documentation",
      "Faster account activations",
      "Guidance on procurement requirements",
    ],
    requirements: [
      "Company registration documents",
      "Tax clearance certificate",
      "Bank confirmation letter",
      "Director IDs and proof of address",
      "Relevant trade/professional certificates",
    ],
    process: [
      "Eligibility and document review",
      "Registration with the procurement authority",
      "Vendor number application and activation",
      "Tender documentation preparation",
      "Account maintenance and renewals",
    ],
    documents: ["Procurement authority registration certificate", "Vendor number", "Tender bid dossier"],
    processingTime: "Registration typically 7–14 working days, subject to authority turnaround.",
    faqs: [
      {
        q: "What is a vendor number?",
        a: "A unique identifier that qualifies your business to receive payments and participate in public procurement once registered with the procurement authority.",
      },
      {
        q: "Do you prepare full tender bidding documentation?",
        a: "Yes. We prepare and assemble tender bidding documentation in line with the requirements of each procurement opportunity.",
      },
      {
        q: "Can you activate an existing procurement account?",
        a: "Yes. We assist with account activations and resolving issues with existing profiles.",
      },
    ],
    related: ["company-secretarial", "zimra-tax-customs"],
    subServices: [
      { name: "PRAZ registration & renewals", description: "Registering and renewing your procurement authority profile." },
      { name: "Vendor number services", description: "Acquiring and managing vendor numbers." },
      { name: "Tender bidding documentation", description: "Professional preparation of tender submissions." },
      { name: "Account activations", description: "Activating and resolving procurement platform accounts." },
      { name: "Other related PRAZ/vendor services", description: "Bespoke procurement support tailored to your needs." },
    ],
  },
  "bookkeeping-financial": {
    title: "Bookkeeping & Financial Services",
    intro:
      "We keep your financial records accurate, organised and compliant — from day-to-day bookkeeping to management accounts, reporting and reconciliations — giving you clarity and control over your finances.",
    whatItIs:
      "A full range of financial services including bookkeeping, management and financial accounting, reporting, auditing support, stock management and reconciliations.",
    usedFor:
      "Used to maintain accurate financial records, produce management and statutory reports, support audits, reconcile accounts, and plan financially.",
    whoFor:
      "SMEs, companies, NGOs and individuals who need reliable financial records and reporting.",
    howItHelps:
      "We give you timely, accurate financial information to make better decisions, stay audit-ready, and meet reporting obligations with confidence.",
    benefits: [
      "Accurate, up-to-date financial records",
      "Clear management and financial reports",
      "Audit-ready documentation",
      "Improved cash flow visibility",
      "Informed financial planning",
    ],
    requirements: [
      "Source documents (invoices, receipts, bank statements)",
      "Existing books (if any)",
      "Business registration documents",
      "Access to accounting systems (where applicable)",
    ],
    process: [
      "Initial review of your financial records",
      "Setup or cleanup of your bookkeeping system",
      "Ongoing recording and reconciliation",
      "Preparation of management and financial reports",
      "Periodic review and planning",
    ],
    documents: ["Management accounts", "Financial statements", "Reconciliation reports", "Audit working papers"],
    processingTime: "Monthly/quarterly cycles; ad-hoc engagements as required.",
    faqs: [
      {
        q: "Do you work with our existing accounting software?",
        a: "Yes. We can work with your existing system or set up a suitable bookkeeping process for you.",
      },
      {
        q: "Can you assist with stock takes?",
        a: "Yes. We conduct and support stock takes and provide stock management guidelines.",
      },
      {
        q: "Do you prepare financial reports for management?",
        a: "Yes. We produce regular management accounts and financial reports tailored to your needs.",
      },
    ],
    related: ["zimra-tax-customs", "company-secretarial"],
    subServices: [
      { name: "Financial & management accounting", description: "Recording and reporting for management decision-making." },
      { name: "Financial planning", description: "Budgeting and forward financial planning." },
      { name: "Financial reporting", description: "Accurate statutory and management reports." },
      { name: "Auditing and stock takes", description: "Audit support and physical stock takes." },
      { name: "Stock management guidelines", description: "Policies and procedures for stock control." },
      { name: "Accounts reconciliations", description: "Bank, supplier and customer reconciliations." },
      { name: "Other related bookkeeping and financial services", description: "Bespoke financial support tailored to your needs." },
    ],
  },
  "general-services": {
    title: "General Business Services",
    intro:
      "We support the everyday legal and operational needs of your business — licenses, agreements and labour relations — so you can operate lawfully and manage relationships with confidence.",
    whatItIs:
      "General business support services covering licensing, drafting of agreements, and labour relations matters.",
    usedFor:
      "Used to obtain or renew operating licenses, formalise agreements, and manage labour relations in line with the law.",
    whoFor:
      "Businesses requiring licenses, formal agreements, or support with employment and labour matters.",
    howItHelps:
      "We keep your business licensed and compliant, ensure your agreements are properly drafted, and help you navigate labour relations professionally.",
    benefits: [
      "Lawful operation with valid licenses",
      "Properly drafted agreements",
      "Professional labour relations support",
      "Reduced legal and operational risk",
    ],
    requirements: [
      "Business registration documents",
      "Premises details (for licenses)",
      "Relevant identification documents",
      "Details of the agreement or labour matter",
    ],
    process: [
      "Review of your requirements",
      "Preparation and submission of applications/documents",
      "Liaison with relevant authorities",
      "Delivery of licenses or drafted agreements",
      "Follow-up and renewals",
    ],
    documents: ["Liquor/shop license", "Agreement of sale", "Labour correspondence"],
    processingTime: "Varies by service and authority; typically 5–14 working days.",
    faqs: [
      {
        q: "Can you renew an expired liquor license?",
        a: "Yes. We handle both new applications and renewals of liquor licenses.",
      },
      {
        q: "Do you draft agreements of sale?",
        a: "Yes. We draft agreements of sale and related business agreements tailored to your transaction.",
      },
      {
        q: "Do you assist with labour relations?",
        a: "Yes. We provide support with labour relations matters, including correspondence and guidance.",
      },
    ],
    related: ["company-secretarial", "zimra-tax-customs"],
    subServices: [
      { name: "Liquor licenses and renewals", description: "New applications and renewals of liquor licenses." },
      { name: "Shop licenses", description: "Obtaining and renewing shop operating licenses." },
      { name: "Drafting of agreements of sale", description: "Professional drafting of sale agreements." },
      { name: "Labour relations", description: "Support with employment and labour matters." },
      { name: "Other general business services", description: "Bespoke general support tailored to your needs." },
    ],
  },
};

// ---------------------------------------------------------------------------
// FAQ — general + country-specific
// ---------------------------------------------------------------------------
export const generalFaqs = [
  {
    q: "Where is Abrielex Business Consultancy located?",
    a: "Our office is at Office No. 116, Lutheran House, corner L/Takawira & Herbert Chitepo, Bulawayo, Zimbabwe. We also offer remote/online services across all our coverage areas.",
  },
  {
    q: "Which areas do you cover?",
    a: "We cover Bulawayo, Harare, Gwanda, Hwange, Lupane, Victoria Falls, Masvingo and surrounding regions, with remote services available across Zimbabwe, South Africa, Zambia, Mozambique and Australia.",
  },
  {
    q: "Do you offer remote or online services?",
    a: "Yes. We provide remote/online services so you can engage us from anywhere in our coverage areas without visiting our office.",
  },
  {
    q: "How do I request a service?",
    a: "You can request a service through the 'Request This Service' button on any service page, by getting a quote, booking a consultation, contacting the agency, or messaging us on WhatsApp.",
  },
  {
    q: "Do you handle payments online?",
    a: "We do not process online checkout payments. Service fees are discussed and arranged through 'Contact the Agency' or 'Request This Service'.",
  },
  {
    q: "How long does a company registration take?",
    a: "New company registrations typically take 5–10 working days, subject to registry turnaround times.",
  },
  {
    q: "Can you help with tax compliance if I'm already registered?",
    a: "Yes. We offer tax health checkups, returns filing, account updates and assessment representations for existing taxpayers.",
  },
  {
    q: "Do you prepare tender documentation?",
    a: "Yes. We prepare full tender bidding documentation and manage your procurement authority registration and vendor numbers.",
  },
];

export const countryFaqs = {
  ZW: [
    { q: "What is PRAZ and do I need it?", a: "PRAZ is the Procurement Regulatory Authority of Zimbabwe. You need PRAZ registration to bid for public-sector tenders in Zimbabwe." },
    { q: "What is ZIMRA tax clearance?", a: "A tax clearance certificate from ZIMRA confirms your tax affairs are up to date and is often required for tenders and banking." },
  ],
  ZA: [
    { q: "Which body handles company registration in South Africa?", a: "Company registration is handled by CIPC (Companies and Intellectual Property Commission). This information is to be confirmed." },
  ],
  ZM: [
    { q: "Which body handles company registration in Zambia?", a: "Company registration is handled by PACRA (Patents and Companies Registration Agency). This information is to be confirmed." },
  ],
  MZ: [
    { q: "Which body handles tax in Mozambique?", a: "Tax matters are handled by the Autoridade Tributária (AT). This information is to be confirmed." },
  ],
  AU: [
    { q: "Which body handles company registration in Australia?", a: "Company registration is handled by ASIC (Australian Securities & Investments Commission). This information is to be confirmed." },
  ],
};

// ---------------------------------------------------------------------------
// RESOURCES — Knowledge Centre
// ---------------------------------------------------------------------------
export const resourceCategories = [
  "Business Guides",
  "Compliance Information",
  "Document Checklists",
  "Tax & Business Education",
  "Regulatory Updates",
  "Articles",
];

export const resources = [
  {
    title: "Starting a Business in Zimbabwe: A Step-by-Step Guide",
    category: "Business Guides",
    country: "Zimbabwe",
    type: "Guide",
    summary: "Everything you need to know to register and launch a compliant business in Zimbabwe.",
    date: "2026-08-15",
  },
  {
    title: "Company Registration Document Checklist",
    category: "Document Checklists",
    country: "Zimbabwe",
    type: "Checklist",
    summary: "A complete checklist of documents required for company registration.",
    date: "2026-08-10",
  },
  {
    title: "Understanding ZIMRA Tax Obligations",
    category: "Tax & Business Education",
    country: "Zimbabwe",
    type: "Article",
    summary: "An overview of common tax obligations for small businesses in Zimbabwe.",
    date: "2026-07-28",
  },
  {
    title: "PRAZ Registration: What You Need to Know",
    category: "Compliance Information",
    country: "Zimbabwe",
    type: "Guide",
    summary: "A plain-language guide to registering with PRAZ and securing your vendor number.",
    date: "2026-07-20",
  },
  {
    title: "Bookkeeping Basics for SMEs",
    category: "Tax & Business Education",
    country: "All",
    type: "Article",
    summary: "Foundational bookkeeping practices every small business should follow.",
    date: "2026-07-05",
  },
  {
    title: "Liquor License Application Checklist",
    category: "Document Checklists",
    country: "Zimbabwe",
    type: "Checklist",
    summary: "Documents and steps required to apply for or renew a liquor license.",
    date: "2026-06-22",
  },
  {
    title: "Tender Bidding: Preparing Your Documentation",
    category: "Business Guides",
    country: "All",
    type: "Guide",
    summary: "How to assemble a strong, compliant tender bid dossier.",
    date: "2026-06-10",
  },
  {
    title: "Annual Returns: Why They Matter",
    category: "Compliance Information",
    country: "Zimbabwe",
    type: "Article",
    summary: "The importance of filing annual returns and the risks of non-compliance.",
    date: "2026-05-30",
  },
];

// ---------------------------------------------------------------------------
// COVERAGE — for the coverage map (Zimbabwe-focused with international presence)
// ---------------------------------------------------------------------------
export const coveragePoints = [
  { city: "Bulawayo", country: "Zimbabwe", primary: true, x: 32, y: 58 },
  { city: "Harare", country: "Zimbabwe", primary: true, x: 55, y: 40 },
  { city: "Gwanda", country: "Zimbabwe", x: 30, y: 66 },
  { city: "Hwange", country: "Zimbabwe", x: 24, y: 50 },
  { city: "Lupane", country: "Zimbabwe", x: 30, y: 50 },
  { city: "Victoria Falls", country: "Zimbabwe", x: 18, y: 44 },
  { city: "Masvingo", country: "Zimbabwe", x: 52, y: 62 },
  { city: "Gweru", country: "Zimbabwe", x: 48, y: 50 },
  { city: "Johannesburg", country: "South Africa", x: 33, y: 84 },
  { city: "Lusaka", country: "Zambia", x: 50, y: 30 },
  { city: "Maputo", country: "Mozambique", x: 62, y: 78 },
  { city: "Sydney", country: "Australia", x: 88, y: 88 },
];

// ---------------------------------------------------------------------------
// CONSULTATION TYPES (admin-managed later)
// ---------------------------------------------------------------------------
export const consultationTypes = [
  "In-Person (Bulawayo Office)",
  "Phone Consultation",
  "WhatsApp Video Call",
  "Online Video Meeting",
];

export const consultationTimeSlots = [
  "08:00 – 09:00",
  "09:00 – 10:00",
  "10:00 – 11:00",
  "11:00 – 12:00",
  "13:00 – 14:00",
  "14:00 – 15:00",
  "15:00 – 16:00",
];

// ---------------------------------------------------------------------------
// CMS-READY (empty until admin populates)
// ---------------------------------------------------------------------------
export const testimonials = [];
export const careers = [];