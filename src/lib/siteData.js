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
    "Chiredzi",
    "Mutare",
    "Kwekwe",
    "Chitungwiza",
    "Marondera",
    "Kadoma",
  ],
  regions: [
    "Bulawayo", "Harare", "Matabeleland North", "Matabeleland South",
    "Midlands", "Masvingo", "Manicaland", "Mashonaland East", "Mashonaland West",
  ],
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
      { name: "Harare", cities: ["Harare CBD", "Borrowdale", "Avondale", "Mt Pleasant", "Belvedere", "Chitungwiza"] },
      { name: "Matabeleland North", cities: ["Lupane", "Hwange", "Victoria Falls", "Tsholotsho"] },
      { name: "Matabeleland South", cities: ["Gwanda", "Beitbridge", "Plumtree"] },
      { name: "Midlands", cities: ["Gweru", "Kwekwe", "Zvishavane", "Kadoma"] },
      { name: "Masvingo", cities: ["Masvingo", "Chiredzi", "Triangle"] },
      { name: "Manicaland", cities: ["Mutare", "Nyanga"] },
      { name: "Mashonaland East", cities: ["Marondera", "Murewa"] },
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

// ---------------------------------------------------------------------------
// COUNTRY-SPECIFIC SERVICE CATEGORIES
// Each country shows its own service names, descriptions & regulatory terms.
// Slugs stay consistent so detail pages & request context remain stable.
// ---------------------------------------------------------------------------
export const countryServiceCategories = {
  ZW: [
    { slug: "company-secretarial", title: "Company Secretarial Services", short: "Company registrations, director changes, annual returns & document retrieval." },
    { slug: "zimra-tax-customs", title: "ZIMRA Tax & Customs Services", short: "Tax registration, returns filing, health checkups, assessments & customs." },
    { slug: "praz-vendor-numbers", title: "PRAZ & Vendor Services", short: "PRAZ registration, vendor numbers, tender bidding & account activations." },
    { slug: "bookkeeping-financial", title: "Bookkeeping & Financial Services", short: "Accounting, reporting, auditing, reconciliations & financial planning." },
    { slug: "general-services", title: "General Services", short: "Liquor & shop licenses, agreements, labour relations & more." },
  ],
};

// Single fixed service catalogue (Zimbabwe).
export function getCountryServices() {
  return serviceCategories;
}

// Resolve a service title by slug (single catalogue).
export function getCountryServiceTitle(code, slug) {
  return serviceCategories.find((s) => s.slug === slug)?.title || slug;
}

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
    q: "What is business consultancy and how can it help my business?",
    a: "Business consultancy provides professional guidance and practical support with the processes a business needs to operate — registration, compliance, financial records, licensing, procurement and administration. Abrielex Business Consultancy helps you navigate these processes so you can focus on growing your business.",
  },
  {
    q: "What does company registration involve?",
    a: "Company registration establishes your business as a recognised legal entity. We assist with the name search, preparation and submission of registration documents, and provide support with business registration, re-registration, changes of directors and business documentation.",
  },
  {
    q: "Why do I need bookkeeping services?",
    a: "Accurate financial records are essential for making informed business decisions. Bookkeeping helps you monitor performance, improve financial control, stay organised for tax purposes and better understand your financial position.",
  },
  {
    q: "What ZIMRA services do you provide?",
    a: "We assist with ZIMRA-related requirements including PAYE, QPDS, CGTs, tax assessments, tax compliance support and general ZIMRA services, helping you keep your tax documentation organised and your obligations managed.",
  },
  {
    q: "What NSSA services do you assist with?",
    a: "We assist clients with NSSA-related services and claim procedures, helping them understand and navigate the relevant processes and documentation.",
  },
  {
    q: "What is PRAZ registration and do I need it?",
    a: "PRAZ is the Procurement Regulatory Authority of Zimbabwe. Businesses seeking to participate in public procurement generally need to meet PRAZ registration and compliance requirements. We support businesses through the registration process.",
  },
  {
    q: "What is a vendor number and how do I get one?",
    a: "A vendor number identifies your business for procurement and payment purposes. We assist with vendor number applications, helping you understand the requirements, organise your documentation and move through the application process efficiently.",
  },
  {
    q: "Can you help with liquor and shop licences?",
    a: "Yes. We provide support with liquor licence and shop licence services, helping clients navigate the relevant application and administrative processes so they can operate within regulated requirements.",
  },
  {
    q: "What procurement services do you offer?",
    a: "We provide procurement-related support designed to help businesses manage procurement processes more effectively, including assistance with procurement documentation, processes and general business support.",
  },
  {
    q: "How do you help with tender and bidding documentation?",
    a: "We assist with tender and bidding documentation, helping businesses prepare their required paperwork in a structured and professional manner, with a focus on quality, organisation and completeness.",
  },
  {
    q: "What is customs account activation?",
    a: "Businesses involved in importing or exporting may require appropriate customs-related accounts. We assist with customs account activation and related administrative requirements.",
  },
  {
    q: "Why does business compliance matter?",
    a: "Keeping registrations, licences, tax requirements, financial records and other documentation properly managed helps businesses operate with greater confidence and reduces avoidable regulatory challenges. We help clients understand and manage these requirements.",
  },
  {
    q: "How do I request a quote?",
    a: "Use the 'Get a Quote / Book a Consultation' section to tell us about the service you require and provide a few details about your business or organisation. We will review your enquiry and provide appropriate guidance regarding your requirements.",
  },
  {
    q: "How do I book a consultation?",
    a: "You can book a consultation through the 'Get a Quote / Book a Consultation' section or contact us directly. Consultations give you the opportunity to discuss your business requirements, challenges or planned activities with us.",
  },
  {
    q: "What documentation do I need to provide?",
    a: "Required documentation depends on the service. As a general guide, business registration documents, identification and relevant records relating to your enquiry are helpful. We will confirm exactly what is needed for your specific requirement.",
  },
  {
    q: "Which areas do you serve?",
    a: "We provide business consultancy and support services across multiple cities in Zimbabwe, including Bulawayo, Harare, Gwanda, Hwange, Lupane, Victoria Falls, Masvingo, Chiredzi, Mutare, Kwekwe, Chitungwiza, Marondera and Kadoma.",
  },
];

export const countryFaqs = {
  ZW: [
    { q: "What is PRAZ and do I need it?", a: "PRAZ is the Procurement Regulatory Authority of Zimbabwe. You need PRAZ registration to bid for public-sector tenders in Zimbabwe." },
    { q: "What is ZIMRA tax clearance?", a: "A tax clearance certificate from ZIMRA confirms your tax affairs are up to date and is often required for tenders and banking." },
    { q: "Which cities do you serve in Zimbabwe?", a: "We provide business consultancy and support services across multiple cities in Zimbabwe, including Bulawayo, Harare, Gwanda, Hwange, Lupane, Victoria Falls, Masvingo, Chiredzi, Mutare, Kwekwe, Chitungwiza, Marondera and Kadoma." },
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
    title: "Business Registration Guide",
    category: "Business Guides",
    country: "Zimbabwe",
    type: "Guide",
    summary: "How to register and establish your business on a proper foundation.",
    date: "2026-08-15",
    content: [
      "Registering a business in Zimbabwe involves several statutory steps. First, conduct a name search and reservation with the Deeds, Companies & Intellectual Property Registry (DCIP) to confirm your proposed company name is available.",
      "Once the name is reserved, prepare your Memorandum & Articles of Association, CR5 (directors form) and CR6 (registered office form). You will need the national IDs and proof of residence for each director, plus a registered office address.",
      "Submit the incorporation documents to the Companies Registry. After processing (typically 5–10 working days), you receive your Certificate of Incorporation. You can then open a company bank account and register with ZIMRA for a tax registration number (BP/F).",
      "If you intend to bid for government tenders, register with PRAZ and obtain a vendor number. Depending on your trade, you may also need a shop or liquor license from your local municipality.",
      "Abrielex handles every step on your behalf — from name search through to post-registration compliance — so you can launch your business with confidence.",
    ],
  },
  {
    title: "Business Documentation Checklist",
    category: "Document Checklists",
    country: "Zimbabwe",
    type: "Checklist",
    summary: "The documentation every business should keep organised and current.",
    date: "2026-08-10",
    content: [
      "Keep the foundational records of your business in one organised file: Certificate of Incorporation or business registration documents, CR5 (directors form), CR6 (registered office form) and your Memorandum & Articles of Association.",
      "Maintain current director and shareholder records. When directors change, update your registry filings promptly so your documents always reflect the true ownership and management of the business.",
      "Keep your tax documentation current: ZIMRA registration (BP/F), tax clearance certificate and copies of filed returns. These are commonly requested by banks, tender authorities and business partners.",
      "Retain your operational documents: lease agreements, supplier contracts, licences and permits, employee records and insurance documents where applicable.",
      "Keep financial records separately organised: invoices, receipts, bank statements and reconciliation reports. Well-organised documentation makes tax filing, audits and applications significantly easier.",
      "Review your file periodically. Outdated documents are one of the most common causes of delays in registrations, tenders and licence applications.",
      "Abrielex Business Consultancy can help you organise, retrieve and update your business documentation.",
    ],
  },
  {
    title: "Tax Compliance Guide",
    category: "Tax & Business Education",
    country: "Zimbabwe",
    type: "Guide",
    summary: "Understanding and staying on top of your tax obligations in Zimbabwe.",
    date: "2026-07-28",
    content: [
      "Every registered business in Zimbabwe is required to register with the Zimbabwe Revenue Authority (ZIMRA) and obtain a Business Partner Number (BP/F). This is your tax account identifier for all interactions with ZIMRA.",
      "Common tax obligations include Pay As You Earn (PAYE) if you have employees, Value Added Tax (VAT) if your turnover exceeds the threshold, and Corporate Income Tax or presumptive tax depending on your business structure.",
      "Returns must be filed by statutory deadlines. Late filing attracts penalties and interest. A tax clearance certificate confirms your tax affairs are up to date and is often required for tenders, banking and government transactions.",
      "We recommend a periodic tax health checkup to identify outstanding returns or errors before they become penalties. Abrielex offers registration, returns filing, health checkups and assessment representation.",
    ],
  },
  {
    title: "Company Compliance Checklist",
    category: "Compliance Information",
    country: "Zimbabwe",
    type: "Checklist",
    summary: "Keep your company's registrations, filings and licences in good standing.",
    date: "2026-07-20",
    content: [
      "Confirm your company registration is current. If any details — directors, share structure or registered office — have changed, update the registry records so your documents reflect the true position of the business.",
      "File annual returns on time. Failure to file can result in the company being struck off the register and difficulty transacting with banks, tendering authorities and other institutions.",
      "Keep your tax compliance current: ZIMRA registration active, returns filed by statutory deadlines and your tax clearance certificate up to date.",
      "Review your licences and permits for your type of operation, including shop licences, liquor licences and any sector-specific permits, and diarise their renewal dates.",
      "Where you participate in public procurement, keep your PRAZ registration and vendor number current and active.",
      "Keep statutory records organised in one place so that compliance reviews, applications and audits are straightforward.",
      "Abrielex Business Consultancy can help you review, organise and maintain these compliance requirements.",
    ],
  },
  {
    title: "Bookkeeping Checklist",
    category: "Tax & Business Education",
    country: "All",
    type: "Checklist",
    summary: "A practical routine for keeping your business records organised.",
    date: "2026-07-05",
    content: [
      "Separate personal and business finances — operate a dedicated business bank account.",
      "Record every transaction, income and expenses, and retain source documents: invoices, receipts and bank statements.",
      "Reconcile your bank accounts regularly to confirm your records match your bank statements and to catch errors early.",
      "Keep your filing organised by month and by category so any transaction can be found quickly.",
      "Produce regular management reports — at minimum monthly or quarterly — so you understand your cash flow, profitability and tax position.",
      "Keep tax-related records separate and complete so filing deadlines are straightforward.",
      "Review your records periodically and address discrepancies immediately rather than letting them accumulate.",
      "Abrielex Business Consultancy can assist with bookkeeping, financial record management and financial information organisation.",
    ],
  },
  {
    title: "Business Licence Checklist",
    category: "Document Checklists",
    country: "Zimbabwe",
    type: "Checklist",
    summary: "Licences and permits commonly required to operate a business.",
    date: "2026-06-22",
    content: [
      "Operating within regulated industries requires the appropriate licences. Use this checklist to identify which may apply to your business.",
      "Shop licence: most trading premises require a shop licence from the local authority. Confirm the correct category for your business activity.",
      "Liquor licence: if you sell alcohol, a liquor licence is required before trading. Applications go through the Liquor Licensing Board — allow time for the application and inspection process.",
      "Sector permits: food handling, health, transport and other regulated activities often require additional permits.",
      "Local authority requirements: confirm rates, zoning and premises requirements with your city or rural district council.",
      "Supporting documents: certificate of incorporation, ZIMRA tax clearance, proof of premises (lease or title deed), site plan, director IDs and the prescribed fees.",
      "Renewal dates: record each licence's expiry date and renew early to avoid trading interruptions.",
      "Abrielex provides support with liquor licence and shop licence services and related administrative processes.",
    ],
  },
  {
    title: "Tender Preparation Checklist",
    category: "Business Guides",
    country: "All",
    type: "Checklist",
    summary: "Get your documentation tender-ready before you bid.",
    date: "2026-06-10",
    content: [
      "Tender opportunities can provide valuable opportunities for businesses to grow — but only complete, well-organised submissions are considered.",
      "Registration documents: current certificate of incorporation and company registration records reflecting the present directors and shareholders.",
      "Tax compliance: a valid ZIMRA tax clearance is typically mandatory — confirm it will remain valid through the contract period.",
      "Procurement registration: valid PRAZ registration certificate and, where required, vendor number and category.",
      "Financials: bank confirmation letter, financial statements or records as specified in the advert.",
      "Capacity: past experience references, equipment or stock lists, and details of key personnel where requested.",
      "Statutory registrations: NSSA clearance and any sector-specific certificates named in the tender document.",
      "Submission: complete every required form, sign where indicated, meet the closing date and time, and keep copies of everything submitted.",
      "Abrielex assists with tender and bidding documentation, helping businesses prepare paperwork in a structured and professional manner.",
    ],
  },
  {
    title: "Business Start-Up Guide",
    category: "Business Guides",
    country: "Zimbabwe",
    type: "Guide",
    summary: "Key steps to take when starting a new business.",
    date: "2026-05-30",
    content: [
      "Starting a business is an important step, and having the correct registration and documentation provides a strong foundation for future growth.",
      "Step 1 — Decide on a structure: a registered company offers limited liability and is generally expected for contracting, procurement and banking purposes.",
      "Step 2 — Register the business: reserve a name and complete company registration so your business is formally established in accordance with applicable requirements.",
      "Step 3 — Register with ZIMRA: obtain a tax identification (BP number) and, where you will contract with others, a tax clearance certificate.",
      "Step 4 — Licence the premises: confirm shop licence, liquor licence or sector permit requirements with your local authority before trading.",
      "Step 5 — Set up records: open a business bank account and put bookkeeping in place from day one so your financial position is always clear.",
      "Step 6 — Compliance: keep registrations, filings and statutory obligations up to date to avoid penalties and interruptions.",
      "Abrielex assists with company and business registration, ZIMRA registration, licensing and documentation — helping entrepreneurs establish a stronger foundation for their businesses.",
    ],
  },
  {
    title: "Tax Preparation Checklist",
    category: "Checklists",
    country: "Zimbabwe",
    type: "Checklist",
    summary: "What to have ready for your ZIMRA tax obligations.",
    date: "2026-05-30",
    content: [
      "Tax compliance can be complex and time-consuming. Preparing your information in advance makes filings faster and more accurate.",
      "Business details: BP number, certificate of incorporation and current company registration records.",
      "Financial records: income records, sales records, invoices, receipts and bank statements for the relevant period.",
      "Expense records: purchase invoices, payroll records and proof of allowable business expenses.",
      "Employee obligations: PAYE records, QPDS submissions and schedules for employees registered with ZIMRA.",
      "Asset disposals: details of any assets sold during the year, as capital gains tax (CGT) may apply.",
      "Returns and deadlines: know your filing cycles (e.g. QPDs and annual returns) and file before the statutory deadlines.",
      "Tax clearance: keep your tax clearance certificate current — it is required for many contracts and applications.",
      "Abrielex assists with PAYE, QPDS, CGTs, tax assessments, tax compliance support and general ZIMRA services.",
    ],
  },
  {
    title: "General Business Compliance Guide",
    category: "Compliance Information",
    country: "Zimbabwe",
    type: "Guide",
    summary: "Practical compliance areas every business should review.",
    date: "2026-05-30",
    content: [
      "Business compliance is an important part of responsible business management. Keeping registrations, licences, tax requirements, financial records and other documentation properly managed helps a business operate with greater confidence.",
      "Company records: confirm your registration documents are current and reflect the present directors, shareholders and registered office of the business.",
      "Statutory filings: keep annual returns and required registry filings up to date to remain in good standing.",
      "Tax compliance: keep ZIMRA registration active, file returns by statutory deadlines and maintain a valid tax clearance certificate.",
      "Licences and permits: confirm which licences and permits apply to your operation — for example shop licences, liquor licences and sector-specific permits — and diarise renewals.",
      "Procurement: where you bid for public work, keep PRAZ registration and vendor numbers current.",
      "Documentation: retain contracts, correspondence and business records in an organised system.",
      "Abrielex Business Consultancy assists with permits, documentation and compliance-related processes, helping businesses remain organised and better prepared to meet their obligations.",
    ],
  },
];

// ---------------------------------------------------------------------------
// COVERAGE — for the coverage map (Zimbabwe-focused with international presence)
// ---------------------------------------------------------------------------
export const coveragePoints = [
  { city: "Bulawayo", lat: -20.15, lng: 28.58, primary: true },
  { city: "Harare", lat: -17.83, lng: 31.05, primary: true },
  { city: "Gwanda", lat: -20.93, lng: 29.08 },
  { city: "Hwange", lat: -18.37, lng: 26.66 },
  { city: "Lupane", lat: -18.9, lng: 27.76 },
  { city: "Victoria Falls", lat: -17.93, lng: 25.83 },
  { city: "Masvingo", lat: -20.07, lng: 30.83 },
  { city: "Chiredzi", lat: -21.05, lng: 31.67 },
  { city: "Mutare", lat: -18.97, lng: 32.57 },
  { city: "Kwekwe", lat: -18.92, lng: 29.82 },
  { city: "Chitungwiza", lat: -18.01, lng: 31.1 },
  { city: "Marondera", lat: -18.19, lng: 31.55 },
  { city: "Kadoma", lat: -18.33, lng: 29.92 },
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