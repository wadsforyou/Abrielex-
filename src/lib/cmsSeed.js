// ---------------------------------------------------------------------------
// CMS SEED DATA — generated from the live Abrielex Base44 app.
//
// This mirrors the authoritative content that already exists in the Base44
// database. It is used only to initialise a fresh/empty database; the seed is
// idempotent (matching records are skipped) so re-running it never duplicates
// or overwrites content an administrator has edited.
//
// Source of truth: the Base44 app (id 6a9fd795389d6b82f37cd432).
// Regenerate with the app's API key if the live content changes.
// ---------------------------------------------------------------------------

export const cmsSeed = {
  ServiceCategory: [
  {
    "slug": "company-secretarial",
    "title": "Company Secretarial Services",
    "short": "Company registrations, director changes, annual returns & document retrieval.",
    "description": null,
    "icon": "Building2",
    "intro": "We handle the full lifecycle of your company's statutory records — from first registration to ongoing compliance — so your business stays legally recognised, up to date, and ready for any transaction.",
    "what_it_is": "Company secretarial services cover the formal registration, maintenance and retrieval of a company's legal identity and statutory records with the relevant companies registry.",
    "used_for": "Used to legally establish a business entity, keep its records current, reflect changes in ownership or management, and retrieve or verify official documents for banking, tendering and compliance purposes.",
    "who_for": "Entrepreneurs starting a new business, existing companies updating their structure, and organisations needing to verify or retrieve company records.",
    "how_it_helps": "We remove the administrative burden of statutory compliance, reduce the risk of penalties for late or incorrect filings, and ensure your company documents are always ready when opportunities arise.",
    "benefits": "Legally recognised business entity\nUp-to-date statutory records\nFaster access to banking and tenders\nReduced risk of compliance penalties\nProfessional handling of all registry filings",
    "requirements": "Proposed company name (with alternatives)\nDirectors' national IDs and proof of residence\nRegistered office address\nShare structure and subscriber details\nMemorandum & Articles of Association (drafted for you)",
    "process": "Name search and reservation\nPreparation of incorporation documents\nSubmission to the companies registry\nCollection and delivery of registration certificate\nOngoing statutory maintenance",
    "documents": "Certificate of Incorporation\nCR6 / Registered Office form\nCR5 / Directors form\nMemorandum & Articles of Association",
    "processing_time": "Typically 5–10 working days for new registrations (subject to registry turnaround).",
    "faqs": "Can I register a company without visiting your office?\nYes. We offer remote/online services across all our coverage areas and can process your registration with documents shared digitally.\n\nWhat if I need to change my directors?\nWe prepare and file the required change-of-directors forms with the registry and update your statutory records accordingly.\n\nDo you handle annual returns for existing companies?\nYes. We prepare and submit annual returns to keep your company active and compliant.",
    "sub_services": "Company registrations & re-registration :: New company incorporation and re-registration under current laws.\nChange of Directors :: Filing updates to your company's directorship.\nPreparation of annual returns :: Keeping your company active with timely annual filings.\nCompany documents retrieval :: Obtaining certified copies of company records.\nCompany documents verification :: Verifying the authenticity and status of company documents.\nOther related company secretarial services :: Bespoke statutory support tailored to your needs.",
    "related": "zimra-tax-customs,praz-vendor-numbers",
    "country_code": "ZW",
    "sort_order": 1,
    "active": true
  },
  {
    "slug": "zimra-tax-customs",
    "title": "ZIMRA Tax & Customs Services",
    "short": "Tax registration, returns filing, health checkups, assessments & customs.",
    "description": null,
    "icon": "Receipt",
    "intro": "We manage your tax obligations end-to-end — registration, filing, health checkups and representations — so you stay compliant, avoid penalties, and keep your tax affairs in good order.",
    "what_it_is": "Comprehensive tax and customs services covering registration, returns, account management, assessments and customs activation with the revenue authority.",
    "used_for": "Used to register for and remain compliant with tax obligations, file returns accurately, resolve tax queries, and activate customs operations for importers and exporters.",
    "who_for": "Individuals, SMEs, companies, traders and NGOs that need to register, file, or resolve tax and customs matters.",
    "how_it_helps": "We ensure accurate, on-time filings, identify and correct compliance gaps before they become penalties, and represent you in tax assessments — saving you time, money and stress.",
    "benefits": "Full tax compliance with the revenue authority\nAccurate, on-time returns\nEarly detection of compliance gaps\nProfessional representation in assessments\nSmooth customs activation for trade",
    "requirements": "National ID / passport\nProof of residence\nBusiness registration documents (where applicable)\nBank account details\nPrevious tax records (for existing clients)",
    "process": "Review of your current tax position\nRegistration or account update with the revenue authority\nPreparation and filing of returns\nTax health checkup and recommendations\nOngoing compliance management",
    "documents": "Tax registration certificate (BP/F)\nTax clearance certificate\nFiled returns\nAssessment notices",
    "processing_time": "Registration typically 3–7 working days; returns filed per statutory deadlines.",
    "faqs": "What is a tax health checkup?\nA review of your tax account to identify outstanding returns, errors, or penalties and recommend corrective action before they escalate.\n\nCan you update my TaRMS account credentials?\nYes. We assist with updating and managing your tax account credentials and profile.\n\nDo you handle tax assessment representations?\nYes. We represent clients in tax assessments and disputes with the revenue authority.",
    "sub_services": "ZIMRA tax registration & renewal :: New tax registration and renewal of tax clearance.\nTax returns filing :: Accurate, on-time filing of all required returns.\nTax health checkups :: Proactive review of your tax compliance status.\nUpdating TaRMS account credentials :: Managing your online tax account access.\nTax assessment representations :: Professional representation in assessments and disputes.\nCustoms activation :: Activating customs operations for importers and exporters.\nOther related tax and customs services :: Bespoke tax support tailored to your needs.",
    "related": "company-secretarial,bookkeeping-financial",
    "country_code": "ZW",
    "sort_order": 2,
    "active": true
  },
  {
    "slug": "praz-vendor-numbers",
    "title": "PRAZ & Vendor Number Services",
    "short": "PRAZ registration, vendor numbers, tender bidding & account activations.",
    "description": null,
    "icon": "FileCheck",
    "intro": "We get you procurement-ready — registering your business with the procurement authority, securing vendor numbers, and preparing tender documentation so you can compete for public contracts.",
    "what_it_is": "Services covering registration with the procurement authority, vendor number acquisition, tender bidding documentation and account activation for public procurement platforms.",
    "used_for": "Used to qualify your business to bid for government and public-sector tenders and to maintain an active, compliant vendor profile.",
    "who_for": "Businesses intending to supply goods or services to government, parastatals and public institutions.",
    "how_it_helps": "We navigate the procurement registration process on your behalf, ensure your vendor profile is active and compliant, and prepare professional tender documentation to improve your chances of winning.",
    "benefits": "Eligibility to bid for public tenders\nActive, compliant vendor profile\nProfessional tender documentation\nFaster account activations\nGuidance on procurement requirements",
    "requirements": "Company registration documents\nTax clearance certificate\nBank confirmation letter\nDirector IDs and proof of address\nRelevant trade/professional certificates",
    "process": "Eligibility and document review\nRegistration with the procurement authority\nVendor number application and activation\nTender documentation preparation\nAccount maintenance and renewals",
    "documents": "Procurement authority registration certificate\nVendor number\nTender bid dossier",
    "processing_time": "Registration typically 7–14 working days, subject to authority turnaround.",
    "faqs": "What is a vendor number?\nA unique identifier that qualifies your business to receive payments and participate in public procurement once registered with the procurement authority.\n\nDo you prepare full tender bidding documentation?\nYes. We prepare and assemble tender bidding documentation in line with the requirements of each procurement opportunity.\n\nCan you activate an existing procurement account?\nYes. We assist with account activations and resolving issues with existing profiles.",
    "sub_services": "PRAZ registration & renewals :: Registering and renewing your procurement authority profile.\nVendor number services :: Acquiring and managing vendor numbers.\nTender bidding documentation :: Professional preparation of tender submissions.\nAccount activations :: Activating and resolving procurement platform accounts.\nOther related PRAZ/vendor services :: Bespoke procurement support tailored to your needs.",
    "related": "company-secretarial,zimra-tax-customs",
    "country_code": "ZW",
    "sort_order": 3,
    "active": true
  },
  {
    "slug": "bookkeeping-financial",
    "title": "Bookkeeping & Financial Services",
    "short": "Accounting, reporting, auditing, reconciliations & financial planning.",
    "description": null,
    "icon": "Calculator",
    "intro": "We keep your financial records accurate, organised and compliant — from day-to-day bookkeeping to management accounts, reporting and reconciliations — giving you clarity and control over your finances.",
    "what_it_is": "A full range of financial services including bookkeeping, management and financial accounting, reporting, auditing support, stock management and reconciliations.",
    "used_for": "Used to maintain accurate financial records, produce management and statutory reports, support audits, reconcile accounts, and plan financially.",
    "who_for": "SMEs, companies, NGOs and individuals who need reliable financial records and reporting.",
    "how_it_helps": "We give you timely, accurate financial information to make better decisions, stay audit-ready, and meet reporting obligations with confidence.",
    "benefits": "Accurate, up-to-date financial records\nClear management and financial reports\nAudit-ready documentation\nImproved cash flow visibility\nInformed financial planning",
    "requirements": "Source documents (invoices, receipts, bank statements)\nExisting books (if any)\nBusiness registration documents\nAccess to accounting systems (where applicable)",
    "process": "Initial review of your financial records\nSetup or cleanup of your bookkeeping system\nOngoing recording and reconciliation\nPreparation of management and financial reports\nPeriodic review and planning",
    "documents": "Management accounts\nFinancial statements\nReconciliation reports\nAudit working papers",
    "processing_time": "Monthly/quarterly cycles; ad-hoc engagements as required.",
    "faqs": "Do you work with our existing accounting software?\nYes. We can work with your existing system or set up a suitable bookkeeping process for you.\n\nCan you assist with stock takes?\nYes. We conduct and support stock takes and provide stock management guidelines.\n\nDo you prepare financial reports for management?\nYes. We produce regular management accounts and financial reports tailored to your needs.",
    "sub_services": "Financial & management accounting :: Recording and reporting for management decision-making.\nFinancial planning :: Budgeting and forward financial planning.\nFinancial reporting :: Accurate statutory and management reports.\nAuditing and stock takes :: Audit support and physical stock takes.\nStock management guidelines :: Policies and procedures for stock control.\nAccounts reconciliations :: Bank, supplier and customer reconciliations.\nOther related bookkeeping and financial services :: Bespoke financial support tailored to your needs.",
    "related": "zimra-tax-customs,company-secretarial",
    "country_code": "ZW",
    "sort_order": 4,
    "active": true
  },
  {
    "slug": "general-services",
    "title": "General Business Services",
    "short": "Liquor & shop licenses, agreements, labour relations & more.",
    "description": null,
    "icon": "Briefcase",
    "intro": "We support the everyday legal and operational needs of your business — licenses, agreements and labour relations — so you can operate lawfully and manage relationships with confidence.",
    "what_it_is": "General business support services covering licensing, drafting of agreements, and labour relations matters.",
    "used_for": "Used to obtain or renew operating licenses, formalise agreements, and manage labour relations in line with the law.",
    "who_for": "Businesses requiring licenses, formal agreements, or support with employment and labour matters.",
    "how_it_helps": "We keep your business licensed and compliant, ensure your agreements are properly drafted, and help you navigate labour relations professionally.",
    "benefits": "Lawful operation with valid licenses\nProperly drafted agreements\nProfessional labour relations support\nReduced legal and operational risk",
    "requirements": "Business registration documents\nPremises details (for licenses)\nRelevant identification documents\nDetails of the agreement or labour matter",
    "process": "Review of your requirements\nPreparation and submission of applications/documents\nLiaison with relevant authorities\nDelivery of licenses or drafted agreements\nFollow-up and renewals",
    "documents": "Liquor/shop license\nAgreement of sale\nLabour correspondence",
    "processing_time": "Varies by service and authority; typically 5–14 working days.",
    "faqs": "Can you renew an expired liquor license?\nYes. We handle both new applications and renewals of liquor licenses.\n\nDo you draft agreements of sale?\nYes. We draft agreements of sale and related business agreements tailored to your transaction.\n\nDo you assist with labour relations?\nYes. We provide support with labour relations matters, including correspondence and guidance.",
    "sub_services": "Liquor licenses and renewals :: New applications and renewals of liquor licenses.\nShop licenses :: Obtaining and renewing shop operating licenses.\nDrafting of agreements of sale :: Professional drafting of sale agreements.\nLabour relations :: Support with employment and labour matters.\nOther general business services :: Bespoke general support tailored to your needs.",
    "related": "company-secretarial,zimra-tax-customs",
    "country_code": "ZW",
    "sort_order": 5,
    "active": true
  }
],
  FAQItem: [
  {
    "question": "Do you prepare tender documentation?",
    "answer": "Yes. We prepare full tender bidding documentation and manage your procurement authority registration and vendor numbers.",
    "scope": "general",
    "country_code": "ZW",
    "sort_order": 7,
    "published": true
  },
  {
    "question": "What is PRAZ and do I need it?",
    "answer": "PRAZ is the Procurement Regulatory Authority of Zimbabwe. You need PRAZ registration to bid for public-sector tenders in Zimbabwe.",
    "scope": "country",
    "country_code": "ZW",
    "sort_order": 100,
    "published": true
  },
  {
    "question": "What is ZIMRA tax clearance?",
    "answer": "A tax clearance certificate from ZIMRA confirms your tax affairs are up to date and is often required for tenders and banking.",
    "scope": "country",
    "country_code": "ZW",
    "sort_order": 101,
    "published": true
  },
  {
    "question": "Which cities do you serve in Zimbabwe?",
    "answer": "We serve clients across Bulawayo, Harare, Gwanda, Hwange, Lupane, Victoria Falls, Masvingo, Mutare, Kwekwe, Chitungwiza, Marondera and Kadoma, with remote and online services available wherever you are.",
    "scope": "country",
    "country_code": "ZW",
    "sort_order": 102,
    "published": true
  },
  {
    "question": "Where is Abrielex Business Consultancy located?",
    "answer": "Our office is at Office No. 116, Lutheran House, corner L/Takawira & Herbert Chitepo, Bulawayo, Zimbabwe. We also offer remote/online services across all our coverage areas.",
    "scope": "general",
    "country_code": "ZW",
    "sort_order": 0,
    "published": true
  },
  {
    "question": "Which areas do you cover?",
    "answer": "We provide business consultancy and support services across multiple cities in Zimbabwe, including Bulawayo, Harare, Gwanda, Hwange, Lupane, Victoria Falls, Masvingo, Mutare, Kwekwe, Chitungwiza, Marondera and Kadoma. Most services can also be delivered remotely or online.",
    "scope": "general",
    "country_code": "ZW",
    "sort_order": 1,
    "published": true
  },
  {
    "question": "Do you offer remote or online services?",
    "answer": "Yes. We provide remote/online services so you can engage us from anywhere in our coverage areas without visiting our office.",
    "scope": "general",
    "country_code": "ZW",
    "sort_order": 2,
    "published": true
  },
  {
    "question": "How do I request a service?",
    "answer": "You can request a service through the 'Request This Service' button on any service page, by getting a quote, booking a consultation, contacting the agency, or messaging us on WhatsApp.",
    "scope": "general",
    "country_code": "ZW",
    "sort_order": 3,
    "published": true
  },
  {
    "question": "Do you handle payments online?",
    "answer": "We do not process online checkout payments. Service fees are discussed and arranged through 'Contact the Agency' or 'Request This Service'.",
    "scope": "general",
    "country_code": "ZW",
    "sort_order": 4,
    "published": true
  },
  {
    "question": "How long does a company registration take?",
    "answer": "New company registrations typically take 5–10 working days, subject to registry turnaround times.",
    "scope": "general",
    "country_code": "ZW",
    "sort_order": 5,
    "published": true
  },
  {
    "question": "Can you help with tax compliance if I'm already registered?",
    "answer": "Yes. We offer tax health checkups, returns filing, account updates and assessment representations for existing taxpayers.",
    "scope": "general",
    "country_code": "ZW",
    "sort_order": 6,
    "published": true
  }
],
  Resource: [
  {
    "title": "Starting a Business in Zimbabwe: A Step-by-Step Guide",
    "slug": null,
    "summary": "Everything you need to know to register and launch a compliant business in Zimbabwe.",
    "category": "Business Guides",
    "country": "Zimbabwe",
    "country_code": "ZW",
    "type": "guide",
    "date": "2026-08-15",
    "content": "Registering a business in Zimbabwe involves several statutory steps. First, conduct a name search and reservation with the Deeds, Companies & Intellectual Property Registry (DCIP) to confirm your proposed company name is available.\n\nOnce the name is reserved, prepare your Memorandum & Articles of Association, CR5 (directors form) and CR6 (registered office form). You will need the national IDs and proof of residence for each director, plus a registered office address.\n\nSubmit the incorporation documents to the Companies Registry. After processing (typically 5–10 working days), you receive your Certificate of Incorporation. You can then open a company bank account and register with ZIMRA for a tax registration number (BP/F).\n\nIf you intend to bid for government tenders, register with PRAZ and obtain a vendor number. Depending on your trade, you may also need a shop or liquor license from your local municipality.\n\nAbrielex handles every step on your behalf — from name search through to post-registration compliance — so you can launch your business with confidence.",
    "published": true,
    "sort_order": 0
  },
  {
    "title": "Company Registration Document Checklist",
    "slug": null,
    "summary": "A complete checklist of documents required for company registration.",
    "category": "Document Checklists",
    "country": "Zimbabwe",
    "country_code": "ZW",
    "type": "checklist",
    "date": "2026-08-10",
    "content": "Proposed company name (provide at least two alternatives in case your first choice is taken).\n\nNational ID or passport copy for each director and shareholder.\n\nProof of residence for each director (e.g. utility bill, lease agreement or affidavit).\n\nRegistered office address (physical address where company records are kept).\n\nShare structure — number of shares, value per share, and allocation among subscribers.\n\nSubscriber and director details — full names, addresses and occupations.\n\nMemorandum & Articles of Association (drafted for you by Abrielex).\n\nCR5 (directors form) and CR6 (registered office form).\n\nPayment for registry fees and professional service.",
    "published": true,
    "sort_order": 0
  },
  {
    "title": "Understanding ZIMRA Tax Obligations",
    "slug": null,
    "summary": "An overview of common tax obligations for small businesses in Zimbabwe.",
    "category": "Tax & Business Education",
    "country": "Zimbabwe",
    "country_code": "ZW",
    "type": "article",
    "date": "2026-07-28",
    "content": "Every registered business in Zimbabwe is required to register with the Zimbabwe Revenue Authority (ZIMRA) and obtain a Business Partner Number (BP/F). This is your tax account identifier for all interactions with ZIMRA.\n\nCommon tax obligations include Pay As You Earn (PAYE) if you have employees, Value Added Tax (VAT) if your turnover exceeds the threshold, and Corporate Income Tax or presumptive tax depending on your business structure.\n\nReturns must be filed by statutory deadlines. Late filing attracts penalties and interest. A tax clearance certificate confirms your tax affairs are up to date and is often required for tenders, banking and government transactions.\n\nWe recommend a periodic tax health checkup to identify outstanding returns or errors before they become penalties. Abrielex offers registration, returns filing, health checkups and assessment representation.",
    "published": true,
    "sort_order": 0
  },
  {
    "title": "PRAZ Registration: What You Need to Know",
    "slug": null,
    "summary": "A plain-language guide to registering with PRAZ and securing your vendor number.",
    "category": "Compliance Information",
    "country": "Zimbabwe",
    "country_code": "ZW",
    "type": "guide",
    "date": "2026-07-20",
    "content": "PRAZ (Procurement Regulatory Authority of Zimbabwe) regulates public procurement. To supply goods or services to government, parastatals and public institutions, your business must be registered with PRAZ.\n\nRegistration requires your company registration documents, a valid ZIMRA tax clearance certificate, a bank confirmation letter, director IDs and proof of address, and any relevant trade or professional certificates.\n\nOnce registered, you receive a vendor number — a unique identifier that qualifies your business to receive payments and participate in public procurement.\n\nAbrielex manages the full PRAZ registration process, vendor number application, tender documentation preparation and account maintenance so you remain eligible to bid for public contracts.",
    "published": true,
    "sort_order": 0
  },
  {
    "title": "Bookkeeping Basics for SMEs",
    "slug": null,
    "summary": "Foundational bookkeeping practices every small business should follow.",
    "category": "Tax & Business Education",
    "country": "All",
    "country_code": "",
    "type": "article",
    "date": "2026-07-05",
    "content": "Bookkeeping is the systematic recording of your business's financial transactions. Accurate books are the foundation of compliance, tax filing and informed decision-making.\n\nStart by separating personal and business finances — open a dedicated business bank account. Record every transaction (income and expenses) and retain source documents such as invoices, receipts and bank statements.\n\nReconcile your bank accounts regularly to ensure your records match your bank statements. This catches errors, missing entries and potential fraud early.\n\nProduce regular management accounts (at minimum monthly or quarterly) so you understand your cash flow, profitability and tax position. Abrielex provides bookkeeping setup, ongoing recording, reconciliations and management reporting.",
    "published": true,
    "sort_order": 0
  },
  {
    "title": "Liquor License Application Checklist",
    "slug": null,
    "summary": "Documents and steps required to apply for or renew a liquor license.",
    "category": "Document Checklists",
    "country": "Zimbabwe",
    "country_code": "ZW",
    "type": "checklist",
    "date": "2026-06-22",
    "content": "Completed liquor license application form (obtained from your local Liquor Licensing Board).\n\nCompany registration documents (Certificate of Incorporation, CR5, CR6).\n\nZIMRA tax clearance certificate.\n\nProof of premises — lease agreement or title deeds for the licensed premises.\n\nSite plan and photographs of the premises.\n\nDirector IDs and proof of address.\n\nRelevant local authority approvals and zoning clearance.\n\nPayment of the prescribed licence fee.\n\nAbrielex handles both new applications and renewals, liaising with the Liquor Licensing Board and local authority on your behalf.",
    "published": true,
    "sort_order": 0
  },
  {
    "title": "Tender Bidding: Preparing Your Documentation",
    "slug": null,
    "summary": "How to assemble a strong, compliant tender bid dossier.",
    "category": "Business Guides",
    "country": "All",
    "country_code": "",
    "type": "guide",
    "date": "2026-06-10",
    "content": "A compliant tender bid starts with reading the tender notice carefully and understanding the eligibility, technical and financial requirements before the closing date.\n\nAssemble your dossier in the order specified: company registration documents, tax clearance, vendor/procurement registration, bank confirmation letter, director IDs, and any requested technical or professional certificates.\n\nPrepare your technical and financial proposal clearly, addressing every evaluation criterion. Missing or incomplete documents are a common cause of disqualification.\n\nSubmit before the deadline and keep proof of submission. Abrielex prepares and assembles full tender bidding documentation in line with each opportunity's requirements, improving your chances of a compliant, competitive bid.",
    "published": true,
    "sort_order": 0
  },
  {
    "title": "Annual Returns: Why They Matter",
    "slug": null,
    "summary": "The importance of filing annual returns and the risks of non-compliance.",
    "category": "Compliance Information",
    "country": "Zimbabwe",
    "country_code": "ZW",
    "type": "article",
    "date": "2026-05-30",
    "content": "Annual returns are a statutory filing that updates the Companies Registry on your company's current directors, shareholders, registered office and share structure. Filing on time keeps your company active and in good standing.\n\nFailure to file annual returns can result in the company being struck off the register, director penalties, and difficulty transacting with banks, government and tendering authorities.\n\nAbrielex prepares and submits annual returns on your behalf and maintains a compliance calendar so you never miss a statutory deadline.",
    "published": true,
    "sort_order": 0
  }
],
  Location: [
  {
    "country_code": "ZW",
    "country_name": "Zimbabwe",
    "state": "Bulawayo",
    "city": "Bulawayo",
    "active": true
  },
  {
    "country_code": "ZW",
    "country_name": "Zimbabwe",
    "state": "Harare",
    "city": "Harare",
    "active": true
  },
  {
    "country_code": "ZW",
    "country_name": "Zimbabwe",
    "state": "Gwanda",
    "city": "Gwanda",
    "active": true
  },
  {
    "country_code": "ZW",
    "country_name": "Zimbabwe",
    "state": "Hwange",
    "city": "Hwange",
    "active": true
  },
  {
    "country_code": "ZW",
    "country_name": "Zimbabwe",
    "state": "Lupane",
    "city": "Lupane",
    "active": true
  },
  {
    "country_code": "ZW",
    "country_name": "Zimbabwe",
    "state": "Victoria Falls",
    "city": "Victoria Falls",
    "active": true
  },
  {
    "country_code": "ZW",
    "country_name": "Zimbabwe",
    "state": "Masvingo",
    "city": "Masvingo",
    "active": true
  },
  {
    "country_code": "ZW",
    "country_name": "Zimbabwe",
    "state": "Mutare",
    "city": "Mutare",
    "active": true
  },
  {
    "country_code": "ZW",
    "country_name": "Zimbabwe",
    "state": "Kwekwe",
    "city": "Kwekwe",
    "active": true
  },
  {
    "country_code": "ZW",
    "country_name": "Zimbabwe",
    "state": "Chitungwiza",
    "city": "Chitungwiza",
    "active": true
  },
  {
    "country_code": "ZW",
    "country_name": "Zimbabwe",
    "state": "Marondera",
    "city": "Marondera",
    "active": true
  },
  {
    "country_code": "ZW",
    "country_name": "Zimbabwe",
    "state": "Kadoma",
    "city": "Kadoma",
    "active": true
  }
],
  SiteContent: [
  {
    "section": "company",
    "key": "company.name",
    "label": "Company name",
    "value": "Abrielex Business Consultancy"
  },
  {
    "section": "company",
    "key": "company.tagline",
    "label": "Tagline",
    "value": "Secure Your Business With Us"
  },
  {
    "section": "company",
    "key": "company.phone",
    "label": "Phone",
    "value": "029 226 3415"
  },
  {
    "section": "company",
    "key": "company.phoneIntl",
    "label": "Phone (international)",
    "value": "+263292263415"
  },
  {
    "section": "company",
    "key": "company.whatsapp",
    "label": "WhatsApp",
    "value": "071 834 6001"
  },
  {
    "section": "company",
    "key": "company.whatsappIntl",
    "label": "WhatsApp (international)",
    "value": "263718346001"
  },
  {
    "section": "company",
    "key": "company.email",
    "label": "Email",
    "value": "abrielexconsultancy@gmail.com"
  },
  {
    "section": "contact",
    "key": "office.line1",
    "label": "Office line 1",
    "value": "Office No. 116, Lutheran House"
  },
  {
    "section": "contact",
    "key": "office.line2",
    "label": "Office line 2",
    "value": "L/Takawira & Herbert Chitepo"
  },
  {
    "section": "contact",
    "key": "office.city",
    "label": "Office city",
    "value": "Bulawayo"
  },
  {
    "section": "contact",
    "key": "office.country",
    "label": "Office country",
    "value": "Zimbabwe"
  },
  {
    "section": "social",
    "key": "social.tiktok",
    "label": "TikTok handle",
    "value": "@abrielexconsultancy"
  },
  {
    "section": "social",
    "key": "social.tiktokUrl",
    "label": "TikTok URL",
    "value": "https://www.tiktok.com/@abrielexconsultancy"
  },
  {
    "section": "social",
    "key": "social.facebook",
    "label": "Facebook name",
    "value": "Abrielex Business Consultants"
  },
  {
    "section": "social",
    "key": "social.facebookUrl",
    "label": "Facebook URL",
    "value": "https://www.facebook.com/profile.php?id=AbrielexBusinessConsultants"
  },
  {
    "section": "home",
    "key": "home.hero_heading",
    "label": "Hero heading",
    "value": "Secure Your Business With Us"
  },
  {
    "section": "home",
    "key": "home.hero_description",
    "label": "Hero description",
    "value": "Professional business registration, tax, procurement, bookkeeping and compliance services across Zimbabwe."
  },
  {
    "section": "home",
    "key": "home.intro_title",
    "label": "Home intro title",
    "value": "Your partner for business registration & compliance"
  },
  {
    "section": "home",
    "key": "home.intro_description",
    "label": "Home intro description",
    "value": "Abrielex Business Consultancy is a professional consultancy based in Bulawayo, Zimbabwe, offering a complete range of business registration, compliance, tax, financial and general business services. We help individuals and businesses get registered, stay compliant, and grow — with the convenience of remote and online service delivery."
  },
  {
    "section": "about",
    "key": "about.mission",
    "label": "Mission",
    "value": "To provide accessible, professional business solutions that help individuals and organisations register, comply and grow with confidence."
  },
  {
    "section": "about",
    "key": "about.vision",
    "label": "Vision",
    "value": "To be a trusted multi-country business consultancy, recognised for making compliance simple and professional services accessible to all."
  },
  {
    "section": "about",
    "key": "about.story",
    "label": "Our story",
    "value": "Abrielex was founded to provide professional business solutions to entrepreneurs and organisations who need professional help with registration, tax, procurement and financial matters. We recognised that many businesses struggle with the complexity of regulatory compliance, and we set out to make the process straightforward, affordable and accessible — both in person and online."
  },
  {
    "section": "about",
    "key": "about.intro",
    "label": "About intro",
    "value": "We help individuals and businesses navigate the regulatory and administrative demands of running a compliant operation — from first registration through to ongoing tax, financial and general business needs."
  }
],
  NotificationTemplate: [
  {
    "event": "contact_message",
    "channel": "email",
    "subject": "New Contact Enquiry — Abrielex Business Consultancy",
    "body": "A new contact enquiry was received from {{client_name}}.\n\nSubject: {{subject}}\nService: {{service_category}}\nEmail: {{email}}\nPhone: {{phone}}\nMessage: {{message}}\n\nView in the admin dashboard: {{link}}",
    "active": true
  },
  {
    "event": "quote_request",
    "channel": "email",
    "subject": "New Quote Request — Abrielex Business Consultancy",
    "body": "A new quote request was received from {{client_name}}.\n\nService: {{service_category}}\nSpecific service: {{specific_service}}\nClient type: {{client_type}}\nEmail: {{email}}\nPhone: {{phone}}\nDescription: {{description}}\n\nView in the admin dashboard: {{link}}",
    "active": true
  },
  {
    "event": "consultation_booking",
    "channel": "email",
    "subject": "New Consultation Booking — Abrielex Business Consultancy",
    "body": "A new consultation booking was received from {{client_name}}.\n\nType: {{consultation_type}}\nPreferred date: {{preferred_date}}\nPreferred time: {{preferred_time}}\nEmail: {{email}}\nPhone: {{phone}}\nReason: {{reason}}\n\nView in the admin dashboard: {{link}}",
    "active": true
  },
  {
    "event": "contact_message",
    "channel": "inapp",
    "subject": "New Contact Enquiry: {{client_name}}",
    "body": "{{subject}} — {{service_category}}",
    "active": true
  },
  {
    "event": "quote_request",
    "channel": "inapp",
    "subject": "New Quote Request: {{client_name}}",
    "body": "{{service_category}} — {{specific_service}}",
    "active": true
  },
  {
    "event": "consultation_booking",
    "channel": "inapp",
    "subject": "New Consultation Booking: {{client_name}}",
    "body": "{{consultation_type}} — {{preferred_date}} {{preferred_time}}",
    "active": true
  }
],
};

export function buildCmsSeed() {
  return cmsSeed;
}
