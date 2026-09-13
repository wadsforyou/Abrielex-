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
    "question": "What is business consultancy and how can it help my business?",
    "answer": "Business consultancy provides professional guidance and practical support with the processes a business needs to operate — registration, compliance, financial records, licensing, procurement and administration. Abrielex Business Consultancy helps you navigate these processes so you can focus on growing your business.",
    "scope": "general",
    "country_code": "ZW",
    "sort_order": 8,
    "published": true
  },
  {
    "question": "What does company registration involve?",
    "answer": "Company registration establishes your business as a recognised legal entity. We assist with the name search, preparation and submission of registration documents, and provide support with business registration, re-registration, changes of directors and business documentation.",
    "scope": "general",
    "country_code": "ZW",
    "sort_order": 9,
    "published": true
  },
  {
    "question": "Why do I need bookkeeping services?",
    "answer": "Accurate financial records are essential for making informed business decisions. Bookkeeping helps you monitor performance, improve financial control, stay organised for tax purposes and better understand your financial position.",
    "scope": "general",
    "country_code": "ZW",
    "sort_order": 10,
    "published": true
  },
  {
    "question": "What ZIMRA services do you provide?",
    "answer": "We assist with ZIMRA-related requirements including ZIMRA registration and tax clearance, VAT, PAYE and PAYE returns, QPDS and QPDS returns, ITF12C returns, CGTs, tax assessments, customs account activation, tax compliance support and general ZIMRA services, helping you keep your tax documentation organised and your obligations managed.",
    "scope": "general",
    "country_code": "ZW",
    "sort_order": 11,
    "published": true
  },
  {
    "question": "What NSSA services do you assist with?",
    "answer": "We assist clients with NSSA-related services and claim procedures, helping them understand and navigate the relevant processes and documentation.",
    "scope": "general",
    "country_code": "ZW",
    "sort_order": 12,
    "published": true
  },
  {
    "question": "What is PRAZ registration and do I need it?",
    "answer": "PRAZ is the Procurement Regulatory Authority of Zimbabwe. Businesses seeking to participate in public procurement generally need to meet PRAZ registration and compliance requirements. We support businesses through the registration process.",
    "scope": "general",
    "country_code": "ZW",
    "sort_order": 13,
    "published": true
  },
  {
    "question": "What is a vendor number and how do I get one?",
    "answer": "A vendor number identifies your business for procurement and payment purposes. We assist with vendor number applications, helping you understand the requirements, organise your documentation and move through the application process efficiently.",
    "scope": "general",
    "country_code": "ZW",
    "sort_order": 14,
    "published": true
  },
  {
    "question": "Can you help with liquor and shop licences?",
    "answer": "Yes. We provide support with liquor licence and shop licence services, helping clients navigate the relevant application and administrative processes so they can operate within regulated requirements.",
    "scope": "general",
    "country_code": "ZW",
    "sort_order": 15,
    "published": true
  },
  {
    "question": "What procurement services do you offer?",
    "answer": "We provide procurement-related support designed to help businesses manage procurement processes more effectively, including assistance with procurement documentation, processes and general business support.",
    "scope": "general",
    "country_code": "ZW",
    "sort_order": 16,
    "published": true
  },
  {
    "question": "What is customs account activation?",
    "answer": "Businesses involved in importing or exporting may require appropriate customs-related accounts. We assist with customs account activation and related administrative requirements.",
    "scope": "general",
    "country_code": "ZW",
    "sort_order": 17,
    "published": true
  },
  {
    "question": "Why does business compliance matter?",
    "answer": "Keeping registrations, licences, tax requirements, financial records and other documentation properly managed helps businesses operate with greater confidence and reduces avoidable regulatory challenges. We help clients understand and manage these requirements.",
    "scope": "general",
    "country_code": "ZW",
    "sort_order": 18,
    "published": true
  },
  {
    "question": "How do I request a quote?",
    "answer": "Use the 'Get a Quote / Book a Consultation' section to tell us about the service you require and provide a few details about your business or organisation. We will review your enquiry and provide appropriate guidance regarding your requirements.",
    "scope": "general",
    "country_code": "ZW",
    "sort_order": 19,
    "published": true
  },
  {
    "question": "How do I book a consultation?",
    "answer": "You can book a consultation through the 'Get a Quote / Book a Consultation' section or contact us directly. Consultations give you the opportunity to discuss your business requirements, challenges or planned activities with us.",
    "scope": "general",
    "country_code": "ZW",
    "sort_order": 20,
    "published": true
  },
  {
    "question": "What documentation do I need to provide?",
    "answer": "Required documentation depends on the service. As a general guide, business registration documents, identification and relevant records relating to your enquiry are helpful. We will confirm exactly what is needed for your specific requirement.",
    "scope": "general",
    "country_code": "ZW",
    "sort_order": 21,
    "published": true
  },
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
    "lat": -20.15,
    "lng": 28.58,
    "primary": true,
    "sort_order": 1,
    "active": true
  },
  {
    "country_code": "ZW",
    "country_name": "Zimbabwe",
    "state": "Harare",
    "city": "Harare",
    "lat": -17.83,
    "lng": 31.05,
    "primary": true,
    "sort_order": 2,
    "active": true
  },
  {
    "country_code": "ZW",
    "country_name": "Zimbabwe",
    "state": "Matabeleland South",
    "city": "Gwanda",
    "lat": -20.93,
    "lng": 29.08,
    "sort_order": 3,
    "active": true
  },
  {
    "country_code": "ZW",
    "country_name": "Zimbabwe",
    "state": "Matabeleland North",
    "city": "Hwange",
    "lat": -18.37,
    "lng": 26.66,
    "sort_order": 4,
    "active": true
  },
  {
    "country_code": "ZW",
    "country_name": "Zimbabwe",
    "state": "Matabeleland North",
    "city": "Lupane",
    "lat": -18.9,
    "lng": 27.76,
    "sort_order": 5,
    "active": true
  },
  {
    "country_code": "ZW",
    "country_name": "Zimbabwe",
    "state": "Matabeleland North",
    "city": "Victoria Falls",
    "lat": -17.93,
    "lng": 25.83,
    "sort_order": 6,
    "active": true
  },
  {
    "country_code": "ZW",
    "country_name": "Zimbabwe",
    "state": "Masvingo",
    "city": "Masvingo",
    "lat": -20.07,
    "lng": 30.83,
    "sort_order": 7,
    "active": true
  },
  {
    "country_code": "ZW",
    "country_name": "Zimbabwe",
    "state": "Masvingo",
    "city": "Chiredzi",
    "lat": -21.05,
    "lng": 31.67,
    "sort_order": 8,
    "active": true
  },
  {
    "country_code": "ZW",
    "country_name": "Zimbabwe",
    "state": "Manicaland",
    "city": "Mutare",
    "lat": -18.97,
    "lng": 32.57,
    "sort_order": 9,
    "active": true
  },
  {
    "country_code": "ZW",
    "country_name": "Zimbabwe",
    "state": "Midlands",
    "city": "Kwekwe",
    "lat": -18.92,
    "lng": 29.82,
    "sort_order": 10,
    "active": true
  },
  {
    "country_code": "ZW",
    "country_name": "Zimbabwe",
    "state": "Harare",
    "city": "Chitungwiza",
    "lat": -18.01,
    "lng": 31.1,
    "sort_order": 11,
    "active": true
  },
  {
    "country_code": "ZW",
    "country_name": "Zimbabwe",
    "state": "Mashonaland East",
    "city": "Marondera",
    "lat": -18.19,
    "lng": 31.55,
    "sort_order": 12,
    "active": true
  },
  {
    "country_code": "ZW",
    "country_name": "Zimbabwe",
    "state": "Mashonaland West",
    "city": "Kadoma",
    "lat": -18.33,
    "lng": 29.92,
    "sort_order": 13,
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
  },
  {
    "section": "about",
    "key": "about.hero_title",
    "label": "About hero title",
    "value": "Secure your business with us"
  },
  {
    "section": "about",
    "key": "about.hero_description",
    "label": "About hero description",
    "value": "Professional business support. Practical solutions. Sustainable growth. We provide reliable business advisory, financial, compliance, registration, procurement and administrative support services designed to help businesses operate efficiently and achieve their objectives."
  },
  {
    "section": "about",
    "key": "about.intro_eyebrow",
    "label": "About intro eyebrow",
    "value": "Who we are"
  },
  {
    "section": "about",
    "key": "about.intro_title",
    "label": "About intro title",
    "value": "Registered in 2020 with a commitment to quality, integrity and efficiency"
  },
  {
    "section": "about",
    "key": "about.intro_description",
    "label": "About intro description",
    "value": "Abrielex Business Consultancy was registered in 2020 with a commitment to quality, integrity, efficiency and intelligent business support. The consultancy was established with the objective of assisting upcoming and established business owners to reach their desired goals and improve their business operations."
  },
  {
    "section": "about",
    "key": "about.intro_extra",
    "label": "About intro (coverage note)",
    "value": "Over time, Abrielex has built a reputation for providing business support across locations including Bulawayo, Victoria Falls, Harare, Masvingo and Chiredzi, while also serving clients beyond Zimbabwe. The consultancy has served clients in Zimbabwe, Botswana and Australia, with an ongoing ambition to build relationships and connect businesses across additional countries and regions."
  },
  {
    "section": "about",
    "key": "about.story_eyebrow",
    "label": "About story eyebrow",
    "value": "What we do"
  },
  {
    "section": "about",
    "key": "about.story_title",
    "label": "About story title",
    "value": "A broad range of business and administrative services"
  },
  {
    "section": "about",
    "key": "about.story_body",
    "label": "About story body",
    "value": "Our work covers company and business registration; financial and bookkeeping services; procurement services; ZIMRA services; permits services; customs account activation; liquor licence services; vendor number applications; tender and bidding documentation; NSSA services and claim procedures; PRAZ registrations; stocktakes and stock planning; internal audits; and business compliance support. We aim to become a trusted business-support partner for entrepreneurs, established enterprises and organizations seeking reliable assistance with their business requirements."
  },
  {
    "section": "about",
    "key": "about.mission_title",
    "label": "Mission title",
    "value": "Our Mission"
  },
  {
    "section": "about",
    "key": "about.mission_tagline",
    "label": "Mission tagline",
    "value": "Supporting Businesses. Encouraging Compliance. Improving Performance."
  },
  {
    "section": "about",
    "key": "about.mission_body",
    "label": "Mission body",
    "value": "Our mission is to support business development across small, medium and larger enterprises. We seek to promote compliance among business owners, help businesses achieve their targeted objectives, improve business performance, support businesses in realizing greater profitability, provide practical guidance and solutions that help fuel business performance, and help entrepreneurs and organizations make better-informed business decisions."
  },
  {
    "section": "about",
    "key": "about.vision_title",
    "label": "Vision title",
    "value": "Our Vision"
  },
  {
    "section": "about",
    "key": "about.vision_tagline",
    "label": "Vision tagline",
    "value": "Building a Recognized Business Advisory Firm"
  },
  {
    "section": "about",
    "key": "about.vision_body",
    "label": "Vision body",
    "value": "Our vision is to become a leading and growing firm in business advisory services, to reach businesses and clients across Zimbabwe and internationally, to connect businesses with opportunities and relationships across different countries, to become well recognized internationally, to create strong and meaningful relationships between businesses across different regions, and to contribute to sustainable business development and growth."
  },
  {
    "section": "about",
    "key": "about.values_intro",
    "label": "Values intro",
    "value": "What we stand for — the values that guide how we work with every client."
  },
  {
    "section": "about",
    "key": "about.target_clients",
    "label": "Target clients",
    "value": "Abrielex Business Consultancy works with a diverse range of clients, including business owners, individuals, entrepreneurs, young entrepreneurs, farmers, grocery suppliers, investors, businesses, organizations, NGOs, government-related clients and other enterprises and professionals."
  },
  {
    "section": "home",
    "key": "home.hero_eyebrow",
    "label": "Hero eyebrow",
    "value": "Secure Your Business With Us"
  },
  {
    "section": "home",
    "key": "home.intro_eyebrow",
    "label": "Home intro eyebrow",
    "value": "Introduction"
  },
  {
    "section": "home",
    "key": "home.categories_eyebrow",
    "label": "Categories eyebrow",
    "value": "What we do"
  },
  {
    "section": "home",
    "key": "home.categories_title",
    "label": "Categories title",
    "value": "Main service categories"
  },
  {
    "section": "home",
    "key": "home.categories_description",
    "label": "Categories description",
    "value": "Five core service dossiers covering the full lifecycle of your business — from registration to ongoing compliance and growth."
  },
  {
    "section": "home",
    "key": "home.why_eyebrow",
    "label": "Why choose eyebrow",
    "value": "Why Abrielex"
  },
  {
    "section": "home",
    "key": "home.why_title",
    "label": "Why choose title",
    "value": "Why choose Abrielex"
  },
  {
    "section": "home",
    "key": "home.why_description",
    "label": "Why choose description",
    "value": "Professional, reliable and accessible — built around the real needs of businesses and individuals."
  },
  {
    "section": "home",
    "key": "home.why_compliance_title",
    "label": "Why — compliance title",
    "value": "Compliance you can trust"
  },
  {
    "section": "home",
    "key": "home.why_compliance_desc",
    "label": "Why — compliance description",
    "value": "We keep your business legally compliant with the relevant registries and authorities in Zimbabwe."
  },
  {
    "section": "home",
    "key": "home.why_coverage_title",
    "label": "Why — coverage title",
    "value": "Multi-city coverage"
  },
  {
    "section": "home",
    "key": "home.why_coverage_desc",
    "label": "Why — coverage description",
    "value": "Services delivered across Bulawayo, Harare and many more cities throughout Zimbabwe."
  },
  {
    "section": "home",
    "key": "home.why_remote_title",
    "label": "Why — remote title",
    "value": "Remote & online"
  },
  {
    "section": "home",
    "key": "home.why_remote_desc",
    "label": "Why — remote description",
    "value": "Engage us from anywhere — no office visit required across our coverage areas."
  },
  {
    "section": "home",
    "key": "home.why_personal_title",
    "label": "Why — personal title",
    "value": "Personal service"
  },
  {
    "section": "home",
    "key": "home.why_personal_desc",
    "label": "Why — personal description",
    "value": "Direct, professional support tailored to your business or individual needs."
  },
  {
    "section": "home",
    "key": "home.why_endtoend_title",
    "label": "Why — end-to-end title",
    "value": "End-to-end handling"
  },
  {
    "section": "home",
    "key": "home.why_endtoend_desc",
    "label": "Why — end-to-end description",
    "value": "From registration to ongoing maintenance — we manage the full process."
  },
  {
    "section": "home",
    "key": "home.why_secure_title",
    "label": "Why — secure title",
    "value": "Secure & reliable"
  },
  {
    "section": "home",
    "key": "home.why_secure_desc",
    "label": "Why — secure description",
    "value": "Professional solutions that protect and grow your business with confidence."
  },
  {
    "section": "home",
    "key": "home.how_eyebrow",
    "label": "How it works eyebrow",
    "value": "Process"
  },
  {
    "section": "home",
    "key": "home.how_title",
    "label": "How it works title",
    "value": "How it works"
  },
  {
    "section": "home",
    "key": "home.how_description",
    "label": "How it works description",
    "value": "A clear, four-step process from first contact to completed service."
  },
  {
    "section": "home",
    "key": "home.how_step1_title",
    "label": "Step 1 title",
    "value": "Tell us your need"
  },
  {
    "section": "home",
    "key": "home.how_step1_desc",
    "label": "Step 1 description",
    "value": "Request a service, get a quote, or book a consultation through the site or WhatsApp."
  },
  {
    "section": "home",
    "key": "home.how_step2_title",
    "label": "Step 2 title",
    "value": "We review & advise"
  },
  {
    "section": "home",
    "key": "home.how_step2_desc",
    "label": "Step 2 description",
    "value": "We assess your requirements and confirm the process, documents and timeline."
  },
  {
    "section": "home",
    "key": "home.how_step3_title",
    "label": "Step 3 title",
    "value": "We handle the process"
  },
  {
    "section": "home",
    "key": "home.how_step3_desc",
    "label": "Step 3 description",
    "value": "We prepare, submit and manage everything with the relevant authorities on your behalf."
  },
  {
    "section": "home",
    "key": "home.how_step4_title",
    "label": "Step 4 title",
    "value": "You stay compliant"
  },
  {
    "section": "home",
    "key": "home.how_step4_desc",
    "label": "Step 4 description",
    "value": "You receive your documents and ongoing support to remain compliant."
  },
  {
    "section": "home",
    "key": "home.coverage_eyebrow",
    "label": "Coverage eyebrow",
    "value": "Multi-city coverage"
  },
  {
    "section": "home",
    "key": "home.coverage_title",
    "label": "Coverage title",
    "value": "Serving businesses across Zimbabwe"
  },
  {
    "section": "home",
    "key": "home.coverage_description",
    "label": "Coverage description",
    "value": "From our base in Bulawayo, we provide business consultancy and support services across multiple cities in Zimbabwe, including Bulawayo, Harare, Gwanda, Hwange, Lupane, Victoria Falls, Masvingo, Chiredzi, Mutare, Kwekwe, Chitungwiza, Marondera and Kadoma. Most services can also be delivered remotely or online — you don't need to visit our office."
  },
  {
    "section": "home",
    "key": "home.resources_eyebrow",
    "label": "Resources eyebrow",
    "value": "Knowledge centre"
  },
  {
    "section": "home",
    "key": "home.resources_title",
    "label": "Resources title",
    "value": "Resources"
  },
  {
    "section": "home",
    "key": "home.resources_description",
    "label": "Resources description",
    "value": "Guides, checklists and articles to help you understand compliance."
  },
  {
    "section": "home",
    "key": "home.cta_title",
    "label": "Home CTA title",
    "value": "Ready to secure your business?"
  },
  {
    "section": "home",
    "key": "home.cta_description",
    "label": "Home CTA description",
    "value": "Get a quote, book a consultation, or contact us today. Secure Your Business With Us."
  },
  {
    "section": "services",
    "key": "services.hero_title",
    "label": "Services hero title",
    "value": "Our services"
  },
  {
    "section": "services",
    "key": "services.hero_description",
    "label": "Services hero description",
    "value": "Professional business solutions for Zimbabwean businesses and individuals — company secretarial, ZIMRA tax & customs, PRAZ & vendor numbers, bookkeeping & financial, and general business services. Open any dossier for full details — what it is, who it's for, requirements, process and how to request it."
  },
  {
    "section": "services",
    "key": "services.cta_title",
    "label": "Services CTA title",
    "value": "Ready to secure your business?"
  },
  {
    "section": "services",
    "key": "services.cta_description",
    "label": "Services CTA description",
    "value": "Get a quote, book a consultation, or contact us today. Secure Your Business With Us."
  },
  {
    "section": "faq",
    "key": "faq.intro",
    "label": "FAQ intro",
    "value": "Answers to common questions about our business consultancy services — registration, tax, procurement, bookkeeping, compliance and how we work."
  },
  {
    "section": "faq",
    "key": "faq.cta_title",
    "label": "FAQ CTA title",
    "value": "Still have questions?"
  },
  {
    "section": "faq",
    "key": "faq.cta_description",
    "label": "FAQ CTA description",
    "value": "Contact the agency and we'll be happy to help."
  },
  {
    "section": "resources",
    "key": "resources.intro",
    "label": "Resources intro",
    "value": "Business guides, compliance information, document checklists and articles — filter by country and category. Open any resource to read the full content."
  },
  {
    "section": "quote",
    "key": "quote.title",
    "label": "Quote page title",
    "value": "Get a Quote / Book a Consultation"
  },
  {
    "section": "quote",
    "key": "quote.intro",
    "label": "Quote page intro",
    "value": "Tell us about the service you require and provide a few details about your business or organization. We will review your enquiry and provide appropriate guidance regarding your requirements. You can also arrange a consultation to discuss your business requirements, challenges or planned activities with Abrielex Business Consultancy."
  },
  {
    "section": "consultation",
    "key": "consultation.title",
    "label": "Consultation title",
    "value": "Book a Consultation"
  },
  {
    "section": "consultation",
    "key": "consultation.intro",
    "label": "Consultation intro",
    "value": "Arrange a consultation to discuss your business requirements, challenges or planned activities with Abrielex Business Consultancy. Consultations are available in person at our Bulawayo office, by phone, WhatsApp video call or online video meeting."
  },
  {
    "section": "contact",
    "key": "contact.intro",
    "label": "Contact intro",
    "value": "Reach us by phone, email, or visit our office in Bulawayo. We also deliver services remotely across our coverage areas in Zimbabwe."
  },
  {
    "section": "contact",
    "key": "contact.office_eyebrow",
    "label": "Office eyebrow",
    "value": "Our office"
  },
  {
    "section": "contact",
    "key": "contact.office_title",
    "label": "Office title",
    "value": "Visit us in Bulawayo"
  },
  {
    "section": "contact",
    "key": "contact.coverage_note",
    "label": "Coverage note",
    "value": "We provide business consultancy and support services across multiple cities in Zimbabwe, including Bulawayo, Harare, Gwanda, Hwange, Lupane, Victoria Falls, Masvingo, Chiredzi, Mutare, Kwekwe, Chitungwiza, Marondera and Kadoma. Most services can also be delivered remotely or online."
  },
  {
    "section": "footer",
    "key": "footer.tagline",
    "label": "Footer tagline",
    "value": "Secure Your Business With Us"
  },
  {
    "section": "footer",
    "key": "footer.description",
    "label": "Footer description",
    "value": "Professional business registration, compliance, tax, financial and general business consultancy services — delivered in person and online."
  },
  {
    "section": "footer",
    "key": "footer.coverage",
    "label": "Footer coverage note",
    "value": "Multi-city coverage across Zimbabwe: Bulawayo, Harare, Gwanda, Hwange, Lupane, Victoria Falls, Masvingo, Chiredzi, Mutare, Kwekwe, Chitungwiza, Marondera and Kadoma."
  },
  {
    "section": "privacy",
    "key": "privacy.0.title",
    "label": "Privacy 1 — title",
    "value": "1. Introduction"
  },
  {
    "section": "privacy",
    "key": "privacy.0.body.0",
    "label": "Privacy 1 — paragraph 1",
    "value": "Abrielex Business Consultancy (\"Abrielex\", \"we\", \"us\" or \"our\") is a business consultancy based in Bulawayo, Zimbabwe. We respect your privacy and are committed to protecting the personal information you share with us through this website."
  },
  {
    "section": "privacy",
    "key": "privacy.0.body.1",
    "label": "Privacy 1 — paragraph 2",
    "value": "This Privacy Policy explains what information we collect, how we use it, how it is stored and protected, and the rights you have over your personal information. It applies to visitors and enquirers who use this website or submit a quote request, consultation booking, service request or contact enquiry to us."
  },
  {
    "section": "privacy",
    "key": "privacy.1.title",
    "label": "Privacy 2 — title",
    "value": "2. Information we collect"
  },
  {
    "section": "privacy",
    "key": "privacy.1.body.0",
    "label": "Privacy 2 — paragraph 1",
    "value": "We collect information in two broad ways: information you voluntarily provide through our forms, and limited technical information collected automatically when you visit the website."
  },
  {
    "section": "privacy",
    "key": "privacy.2.title",
    "label": "Privacy 2.1 — title",
    "value": "2.1 Personal information submitted through forms"
  },
  {
    "section": "privacy",
    "key": "privacy.2.body.0",
    "label": "Privacy 2.1 — paragraph 1",
    "value": "When you submit a quote request, consultation booking, service request or contact enquiry, we collect the details you enter. This typically includes:"
  },
  {
    "section": "privacy",
    "key": "privacy.2.body.1",
    "label": "Privacy 2.1 — paragraph 2",
    "value": "• Your name; • Your email address; • Your phone number and/or WhatsApp number; • The service category and specific service you are enquiring about; • The city or area you are located in, where you provide it; • The details of your enquiry or message; • Any documents you choose to upload."
  },
  {
    "section": "privacy",
    "key": "privacy.2.body.2",
    "label": "Privacy 2.1 — paragraph 3",
    "value": "We use this information to understand your requirements, prepare a response or quotation, and contact you about the service you have requested."
  },
  {
    "section": "privacy",
    "key": "privacy.3.title",
    "label": "Privacy 2.2 — title",
    "value": "2.2 Automatically collected technical information"
  },
  {
    "section": "privacy",
    "key": "privacy.3.body.0",
    "label": "Privacy 2.2 — paragraph 1",
    "value": "When you visit the website, our hosting platform may automatically collect certain technical information, such as your browser type, device type, approximate region, the pages you visit and the times of your visits. This information is used in aggregate to maintain and improve the website and is not used to identify you personally."
  },
  {
    "section": "privacy",
    "key": "privacy.4.title",
    "label": "Privacy 3 — title",
    "value": "3. Cookies and similar technologies"
  },
  {
    "section": "privacy",
    "key": "privacy.4.body.0",
    "label": "Privacy 3 — paragraph 1",
    "value": "The website may use cookies or similar technologies to remember your preferences and keep the site working correctly. You can set your browser to refuse cookies, though some features of the website may not function as intended if cookies are disabled."
  },
  {
    "section": "privacy",
    "key": "privacy.5.title",
    "label": "Privacy 4 — title",
    "value": "4. How we use your information"
  },
  {
    "section": "privacy",
    "key": "privacy.5.body.0",
    "label": "Privacy 4 — paragraph 1",
    "value": "We use the information you submit to: respond to your enquiry; prepare a quote or consultation; identify the service you are interested in; contact you about your request; and maintain records of enquiries for the purpose of providing our services."
  },
  {
    "section": "privacy",
    "key": "privacy.5.body.1",
    "label": "Privacy 4 — paragraph 2",
    "value": "We do not sell your personal information to third parties."
  },
  {
    "section": "privacy",
    "key": "privacy.6.title",
    "label": "Privacy 5 — title",
    "value": "5. How information is stored"
  },
  {
    "section": "privacy",
    "key": "privacy.6.body.0",
    "label": "Privacy 5 — paragraph 1",
    "value": "Enquiry information you submit is stored securely within our consultancy management system so that our team can review and respond to your request. Documents you upload are stored for the purpose of assessing and progressing your enquiry."
  },
  {
    "section": "privacy",
    "key": "privacy.7.title",
    "label": "Privacy 6 — title",
    "value": "6. Data security"
  },
  {
    "section": "privacy",
    "key": "privacy.7.body.0",
    "label": "Privacy 6 — paragraph 1",
    "value": "We take reasonable steps to protect the information you provide against unauthorised access, alteration or disclosure. However, no method of transmission or electronic storage is completely secure, and we cannot guarantee absolute security."
  },
  {
    "section": "privacy",
    "key": "privacy.8.title",
    "label": "Privacy 7 — title",
    "value": "7. Data retention"
  },
  {
    "section": "privacy",
    "key": "privacy.8.body.0",
    "label": "Privacy 7 — paragraph 1",
    "value": "We retain enquiry information for as long as is necessary to respond to your request and for a reasonable period thereafter for record-keeping purposes. Where an enquiry does not progress to an engagement, we may retain the information for a limited period and then delete or anonymise it."
  },
  {
    "section": "privacy",
    "key": "privacy.9.title",
    "label": "Privacy 8 — title",
    "value": "8. Sharing and disclosure of information"
  },
  {
    "section": "privacy",
    "key": "privacy.9.body.0",
    "label": "Privacy 8 — paragraph 1",
    "value": "We do not share your personal information with third parties for marketing purposes. We may disclose information where necessary to respond to your enquiry, to comply with a legal obligation, or where required by a regulator or law enforcement authority in accordance with applicable law."
  },
  {
    "section": "privacy",
    "key": "privacy.10.title",
    "label": "Privacy 8.1 — title",
    "value": "8.1 Service providers"
  },
  {
    "section": "privacy",
    "key": "privacy.10.body.0",
    "label": "Privacy 8.1 — paragraph 1",
    "value": "We may use trusted service providers (such as our hosting and communications providers) to operate the website and deliver our services. These providers process information on our behalf and are expected to handle it confidentially and securely."
  },
  {
    "section": "privacy",
    "key": "privacy.11.title",
    "label": "Privacy 8.2 — title",
    "value": "8.2 Legal and regulatory disclosures"
  },
  {
    "section": "privacy",
    "key": "privacy.11.body.0",
    "label": "Privacy 8.2 — paragraph 1",
    "value": "We may disclose your information where required to do so by law, court order, or by a regulator with lawful authority, to the extent permitted or required by applicable Zimbabwean law."
  },
  {
    "section": "privacy",
    "key": "privacy.12.title",
    "label": "Privacy 9 — title",
    "value": "9. Third-party links"
  },
  {
    "section": "privacy",
    "key": "privacy.12.body.0",
    "label": "Privacy 9 — paragraph 1",
    "value": "This website may contain links to third-party websites (such as social media pages). We are not responsible for the privacy practices of those websites and encourage you to review their privacy policies."
  },
  {
    "section": "privacy",
    "key": "privacy.13.title",
    "label": "Privacy 10 — title",
    "value": "10. Website analytics"
  },
  {
    "section": "privacy",
    "key": "privacy.13.body.0",
    "label": "Privacy 10 — paragraph 1",
    "value": "We may use analytics tools to understand how visitors use the website in aggregate. Where used, these tools help us improve site content and performance and do not identify individual visitors."
  },
  {
    "section": "privacy",
    "key": "privacy.14.title",
    "label": "Privacy 11 — title",
    "value": "11. Children's privacy"
  },
  {
    "section": "privacy",
    "key": "privacy.14.body.0",
    "label": "Privacy 11 — paragraph 1",
    "value": "Our services are intended for businesses and individuals seeking professional business consultancy. We do not knowingly collect personal information from children. If you believe a child has provided us with personal information, please contact us so we can remove it."
  },
  {
    "section": "privacy",
    "key": "privacy.15.title",
    "label": "Privacy 12 — title",
    "value": "12. Your rights"
  },
  {
    "section": "privacy",
    "key": "privacy.15.body.0",
    "label": "Privacy 12 — paragraph 1",
    "value": "You may request access to, correction of, or deletion of the personal information you have provided to us. You may also ask us to stop contacting you. To exercise any of these rights, contact us using the details below."
  },
  {
    "section": "privacy",
    "key": "privacy.16.title",
    "label": "Privacy 12.1 — title",
    "value": "12.1 Access and correction"
  },
  {
    "section": "privacy",
    "key": "privacy.16.body.0",
    "label": "Privacy 12.1 — paragraph 1",
    "value": "You may request a copy of the personal information we hold about you and ask us to correct anything that is inaccurate or incomplete."
  },
  {
    "section": "privacy",
    "key": "privacy.17.title",
    "label": "Privacy 12.2 — title",
    "value": "12.2 Communication preferences"
  },
  {
    "section": "privacy",
    "key": "privacy.17.body.0",
    "label": "Privacy 12.2 — paragraph 1",
    "value": "You can opt out of receiving communications from us at any time by replying to any message we send or by contacting us using the details below."
  },
  {
    "section": "privacy",
    "key": "privacy.18.title",
    "label": "Privacy 13 — title",
    "value": "13. Changes to this Privacy Policy"
  },
  {
    "section": "privacy",
    "key": "privacy.18.body.0",
    "label": "Privacy 13 — paragraph 1",
    "value": "We may update this Privacy Policy from time to time. The updated version will be published on this page with a revised date. We encourage you to review it periodically."
  },
  {
    "section": "privacy",
    "key": "privacy.19.title",
    "label": "Privacy 14 — title",
    "value": "14. Contact for privacy enquiries"
  },
  {
    "section": "privacy",
    "key": "privacy.19.body.0",
    "label": "Privacy 14 — paragraph 1",
    "value": "If you have any questions about this Privacy Policy or how we handle your information, please contact us at abrielexconsultancy@gmail.com, telephone 029 226 3415, or WhatsApp 071 834 6001. Our office is at Office No. 116, Lutheran House, L/Takawira & Herbert Chitepo, Bulawayo, Zimbabwe."
  },
  {
    "section": "terms",
    "key": "terms.0.title",
    "label": "Terms 1 — title",
    "value": "1. Introduction"
  },
  {
    "section": "terms",
    "key": "terms.0.body.0",
    "label": "Terms 1 — paragraph 1",
    "value": "These Terms and Conditions (\"Terms\") govern your use of the Abrielex Business Consultancy (\"Abrielex\", \"we\", \"us\" or \"our\") website and any enquiry you submit to us through it. By accessing this website or submitting an enquiry, you agree to these Terms."
  },
  {
    "section": "terms",
    "key": "terms.1.title",
    "label": "Terms 2 — title",
    "value": "2. Definitions"
  },
  {
    "section": "terms",
    "key": "terms.1.body.0",
    "label": "Terms 2 — paragraph 1",
    "value": "“Website” means this Abrielex Business Consultancy website. “Enquiry” means any quote request, consultation booking, service request or contact message you submit. “Services” means the business consultancy services we offer. “Regulatory authorities” means bodies such as ZIMRA, the companies registry (DCIP), PRAZ, local authorities and licensing boards."
  },
  {
    "section": "terms",
    "key": "terms.2.title",
    "label": "Terms 3 — title",
    "value": "3. Website use"
  },
  {
    "section": "terms",
    "key": "terms.2.body.0",
    "label": "Terms 3 — paragraph 1",
    "value": "You agree to use this website lawfully and only for the purpose of learning about our services and submitting genuine enquiries. You must not misuse the website, submit false or misleading information, or attempt to disrupt its operation."
  },
  {
    "section": "terms",
    "key": "terms.3.title",
    "label": "Terms 4 — title",
    "value": "4. Acceptable use"
  },
  {
    "section": "terms",
    "key": "terms.3.body.0",
    "label": "Terms 4 — paragraph 1",
    "value": "You must not use the website to submit abusive, fraudulent or unlawful content, or to send unsolicited communications. We may decline to respond to or act on any enquiry that we reasonably believe is unlawful, abusive or made in bad faith."
  },
  {
    "section": "terms",
    "key": "terms.4.title",
    "label": "Terms 5 — title",
    "value": "5. Consultancy and service enquiries"
  },
  {
    "section": "terms",
    "key": "terms.4.body.0",
    "label": "Terms 5 — paragraph 1",
    "value": "Through this website you may submit a quote request, book a consultation, request a specific service, or send a contact message. Submitting an enquiry is a request for information or assistance — it is not a binding contract for services."
  },
  {
    "section": "terms",
    "key": "terms.5.title",
    "label": "Terms 5.1 — title",
    "value": "5.1 Quote requests"
  },
  {
    "section": "terms",
    "key": "terms.5.body.0",
    "label": "Terms 5.1 — paragraph 1",
    "value": "A quote request asks us to prepare a quotation for a service. We will review your requirements and, where we are able to assist, provide a quote. A quote is an offer and does not become an engagement until you and Abrielex agree in writing."
  },
  {
    "section": "terms",
    "key": "terms.6.title",
    "label": "Terms 5.2 — title",
    "value": "5.2 Consultation requests"
  },
  {
    "section": "terms",
    "key": "terms.6.body.0",
    "label": "Terms 5.2 — paragraph 1",
    "value": "A consultation booking is a request to schedule a consultation. Consultations are confirmed by us and may be subject to availability. Submitting a booking request does not guarantee a specific date or time until we confirm it with you."
  },
  {
    "section": "terms",
    "key": "terms.7.title",
    "label": "Terms 5.3 — title",
    "value": "5.3 Service requests"
  },
  {
    "section": "terms",
    "key": "terms.7.body.0",
    "label": "Terms 5.3 — paragraph 1",
    "value": "A service request identifies a specific service you are interested in. We will contact you to discuss the requirements, documents and process. We are not obliged to accept or undertake any work until an engagement is agreed."
  },
  {
    "section": "terms",
    "key": "terms.8.title",
    "label": "Terms 6 — title",
    "value": "6. Accuracy of information provided by users"
  },
  {
    "section": "terms",
    "key": "terms.8.body.0",
    "label": "Terms 6 — paragraph 1",
    "value": "You are responsible for the accuracy of the information and documents you provide. We rely on the information you give us to advise and act for you. We are not liable for consequences arising from inaccurate, incomplete or misleading information you provide."
  },
  {
    "section": "terms",
    "key": "terms.9.title",
    "label": "Terms 7 — title",
    "value": "7. No automatic client relationship"
  },
  {
    "section": "terms",
    "key": "terms.9.body.0",
    "label": "Terms 7 — paragraph 1",
    "value": "Submitting a quote, consultation, contact or service request does not automatically create a client relationship, and does not guarantee that Abrielex will accept or undertake the work. A formal engagement arises only when we and you agree to proceed, typically in writing."
  },
  {
    "section": "terms",
    "key": "terms.10.title",
    "label": "Terms 8 — title",
    "value": "8. Service availability"
  },
  {
    "section": "terms",
    "key": "terms.10.body.0",
    "label": "Terms 8 — paragraph 1",
    "value": "Our services are subject to availability and to the requirements of the relevant regulatory authorities. Timelines are estimates only and may be affected by factors outside our control, including authority turnaround times."
  },
  {
    "section": "terms",
    "key": "terms.11.title",
    "label": "Terms 9 — title",
    "value": "9. Third-party authorities and regulatory bodies"
  },
  {
    "section": "terms",
    "key": "terms.11.body.0",
    "label": "Terms 9 — paragraph 1",
    "value": "Many of our services involve dealings with regulatory authorities such as ZIMRA, the companies registry, PRAZ, local authorities and licensing boards. These bodies operate independently of Abrielex, and their processes, requirements and timelines are outside our control."
  },
  {
    "section": "terms",
    "key": "terms.12.title",
    "label": "Terms 10 — title",
    "value": "10. Information for general and business support purposes"
  },
  {
    "section": "terms",
    "key": "terms.12.body.0",
    "label": "Terms 10 — paragraph 1",
    "value": "Information provided on this website and in our resources is for general business support and educational purposes. It is not a substitute for tailored professional advice. You should confirm current requirements with us or the relevant authority before acting."
  },
  {
    "section": "terms",
    "key": "terms.13.title",
    "label": "Terms 11 — title",
    "value": "11. Fees and quotations"
  },
  {
    "section": "terms",
    "key": "terms.13.body.0",
    "label": "Terms 11 — paragraph 1",
    "value": "Service fees are discussed and agreed with you before work commences. Any quote we provide is valid for the period stated in the quote (or, if none, for a reasonable period) and may be withdrawn or revised if circumstances change."
  },
  {
    "section": "terms",
    "key": "terms.14.title",
    "label": "Terms 12 — title",
    "value": "12. Payment terms"
  },
  {
    "section": "terms",
    "key": "terms.14.body.0",
    "label": "Terms 12 — paragraph 1",
    "value": "Where an engagement is agreed, payment terms will be set out in that agreement. This website does not process online checkout payments. Fees are arranged directly with the agency."
  },
  {
    "section": "terms",
    "key": "terms.15.title",
    "label": "Terms 13 — title",
    "value": "13. Cancellation and rescheduling of consultations"
  },
  {
    "section": "terms",
    "key": "terms.15.body.0",
    "label": "Terms 13 — paragraph 1",
    "value": "If you need to cancel or reschedule a confirmed consultation, please contact us as early as possible. We will use reasonable efforts to accommodate rescheduling. We may apply our standard rescheduling or cancellation terms where an engagement has been agreed."
  },
  {
    "section": "terms",
    "key": "terms.16.title",
    "label": "Terms 14 — title",
    "value": "14. Intellectual property"
  },
  {
    "section": "terms",
    "key": "terms.16.body.0",
    "label": "Terms 14 — paragraph 1",
    "value": "The content of this website, including text, logos, graphics and resources, is owned by or licensed to Abrielex and is protected by intellectual property laws. You may view and download content for your personal, non-commercial use. You must not reproduce or redistribute our content without our permission."
  },
  {
    "section": "terms",
    "key": "terms.17.title",
    "label": "Terms 15 — title",
    "value": "15. Website content"
  },
  {
    "section": "terms",
    "key": "terms.17.body.0",
    "label": "Terms 15 — paragraph 1",
    "value": "We take care to keep website content accurate and current, but regulatory requirements change. We do not warrant that all information is complete or up to date at all times and recommend confirming current requirements with us."
  },
  {
    "section": "terms",
    "key": "terms.18.title",
    "label": "Terms 16 — title",
    "value": "16. Third-party links"
  },
  {
    "section": "terms",
    "key": "terms.18.body.0",
    "label": "Terms 16 — paragraph 1",
    "value": "This website may link to third-party websites we do not control. We are not responsible for their content or availability and do not endorse them."
  },
  {
    "section": "terms",
    "key": "terms.19.title",
    "label": "Terms 17 — title",
    "value": "17. Privacy and data handling"
  },
  {
    "section": "terms",
    "key": "terms.19.body.0",
    "label": "Terms 17 — paragraph 1",
    "value": "How we handle information you submit is described in our Privacy Policy, which is incorporated into these Terms by reference."
  },
  {
    "section": "terms",
    "key": "terms.20.title",
    "label": "Terms 18 — title",
 "value": "18. Limitation of liability"
  },
  {
    "section": "terms",
    "key": "terms.20.body.0",
    "label": "Terms 18 — paragraph 1",
    "value": "To the fullest extent permitted by law, Abrielex shall not be liable for any indirect, incidental or consequential loss or damage arising from your use of this website or reliance on information provided through it. Our liability for any agreed engagement is as set out in the engagement agreement."
  },
  {
    "section": "terms",
    "key": "terms.21.title",
    "label": "Terms 19 — title",
    "value": "19. No guarantee of regulatory approval or outcome"
  },
  {
    "section": "terms",
    "key": "terms.21.body.0",
    "label": "Terms 19 — paragraph 1",
    "value": "We do not guarantee that any application, registration, filing or submission will be approved by ZIMRA, PRAZ, the companies registry, any licensing authority, or any other regulator. Approval decisions rest with the relevant authorities. We provide professional assistance to prepare and submit matters correctly, but outcomes depend on factors outside our control."
  },
  {
    "section": "terms",
    "key": "terms.22.title",
    "label": "Terms 20 — title",
    "value": "20. User responsibilities"
  },
  {
    "section": "terms",
    "key": "terms.22.body.0",
    "label": "Terms 20 — paragraph 1",
    "value": "You are responsible for providing accurate information and required documents in a timely manner, responding to our communications, and complying with your own legal and regulatory obligations."
  },
  {
    "section": "terms",
    "key": "terms.23.title",
    "label": "Terms 21 — title",
    "value": "21. Website availability"
  },
  {
    "section": "terms",
    "key": "terms.23.body.0",
    "label": "Terms 21 — paragraph 1",
    "value": "We aim to keep the website available but do not guarantee uninterrupted access. We may update, suspend or restrict access to the website for maintenance or operational reasons without notice."
  },
  {
    "section": "terms",
    "key": "terms.24.title",
    "label": "Terms 22 — title",
    "value": "22. Changes to services"
  },
  {
    "section": "terms",
    "key": "terms.24.body.0",
    "label": "Terms 22 — paragraph 1",
    "value": "We may add, change or withdraw services from time to time. Any change to a service that is the subject of an agreed engagement will be communicated to you."
  },
  {
    "section": "terms",
    "key": "terms.25.title",
    "label": "Terms 23 — title",
    "value": "23. Changes to these Terms"
  },
  {
    "section": "terms",
    "key": "terms.25.body.0",
    "label": "Terms 23 — paragraph 1",
    "value": "We may update these Terms from time to time. The current version will be published on this page with a revised date. Your continued use of the website after changes constitutes acceptance of the updated Terms."
  },
  {
    "section": "terms",
    "key": "terms.26.title",
    "label": "Terms 24 — title",
    "value": "24. Governing law and jurisdiction"
  },
  {
    "section": "terms",
    "key": "terms.26.body.0",
    "label": "Terms 24 — paragraph 1",
    "value": "These Terms are governed by the laws of Zimbabwe. Any dispute arising in connection with these Terms or your use of this website shall be subject to the jurisdiction of the Zimbabwean courts, unless otherwise required by applicable law or agreed in writing."
  },
  {
    "section": "terms",
    "key": "terms.27.title",
    "label": "Terms 25 — title",
    "value": "25. Contact information"
  },
  {
    "section": "terms",
    "key": "terms.27.body.0",
    "label": "Terms 25 — paragraph 1",
    "value": "If you have any questions about these Terms, please contact us at abrielexconsultancy@gmail.com, telephone 029 226 3415, or WhatsApp 071 834 6001. Our office is at Office No. 116, Lutheran House, L/Takawira & Herbert Chitepo, Bulawayo, Zimbabwe."
  }
],
  SeoPage: [
  {
    "path": "/",
    "page_title": "Home",
    "seo_title": "Abrielex Business Consultancy | Zimbabwe Business Services",
    "meta_description": "Abrielex Business Consultancy offers company registration, ZIMRA tax, PRAZ, bookkeeping and compliance services in Bulawayo, Harare and across Zimbabwe.",
    "primary_keyword": "business consultancy Zimbabwe",
    "focus_keyword": "business consultancy Zimbabwe",
    "secondary_keywords": "business consultants Zimbabwe, company registration Zimbabwe, business registration Zimbabwe, tax clearance Zimbabwe, bookkeeping Zimbabwe",
    "search_phrases": "business consultancy Zimbabwe\nbusiness consultants Zimbabwe\ncompany registration Zimbabwe\nsecure your business with us",
    "slug": "/",
    "canonical_url": "https://abrielexconsultancy.co.zw/",
    "robots": "index,follow",
    "og_title": "Abrielex Business Consultancy — Secure Your Business With Us",
    "og_description": "Professional business registration, tax, procurement, bookkeeping and compliance services across multiple cities in Zimbabwe.",
    "og_image": "https://media.base44.com/images/public/user_6a87c5f2c8a0dd45c2e8e73b/8a0351310_Abrielex_logo.svg",
    "social_image": "https://media.base44.com/images/public/user_6a87c5f2c8a0dd45c2e8e73b/8a0351310_Abrielex_logo.svg",
    "image_alt_text": "Abrielex Business Consultancy logo",
    "related_keywords": "business services Bulawayo, business services Harare, ZIMRA registration Zimbabwe, PRAZ registration Zimbabwe",
    "schema_type": "ProfessionalService",
    "breadcrumb_label": "Home",
    "published": true
  },
  {
    "path": "/about",
    "page_title": "About Us",
    "seo_title": "About Abrielex Business Consultancy | Zimbabwe",
    "meta_description": "Registered in 2020, Abrielex Business Consultancy supports businesses across Zimbabwe with registration, compliance, tax, bookkeeping and procurement services.",
    "primary_keyword": "business consultants Zimbabwe",
    "focus_keyword": "about Abrielex Business Consultancy",
    "secondary_keywords": "business consultancy Bulawayo, business support services Zimbabwe, registered 2020 consultancy, business advisory Zimbabwe",
    "search_phrases": "about Abrielex Business Consultancy\nbusiness consultants Bulawayo\nbusiness advisory firm Zimbabwe",
    "slug": "/about",
    "canonical_url": "https://abrielexconsultancy.co.zw/about",
    "robots": "index,follow",
    "og_title": "About Abrielex Business Consultancy",
    "og_description": "Registered in 2020 with a commitment to quality, integrity, efficiency and intelligent business support for businesses in Zimbabwe.",
    "og_image": "https://media.base44.com/images/public/user_6a87c5f2c8a0dd45c2e8e73b/8a0351310_Abrielex_logo.svg",
    "social_image": "https://media.base44.com/images/public/user_6a87c5f2c8a0dd45c2e8e73b/8a0351310_Abrielex_logo.svg",
    "image_alt_text": "Abrielex Business Consultancy about our firm",
    "related_keywords": "business services Bulawayo, business services Victoria Falls, business services Masvingo, business services Chiredzi",
    "schema_type": "AboutPage",
    "breadcrumb_label": "About Us",
    "published": true
  },
  {
    "path": "/services",
    "page_title": "Services",
    "seo_title": "Our Services | Company Registration & Tax | Zimbabwe",
    "meta_description": "Explore Abrielex services in Zimbabwe: company registration, ZIMRA tax and customs, PRAZ and vendor numbers, bookkeeping and general business services.",
    "primary_keyword": "business registration Zimbabwe",
    "focus_keyword": "company registration services Zimbabwe",
    "secondary_keywords": "company secretarial services, ZIMRA services Zimbabwe, PRAZ registration Zimbabwe, bookkeeping Zimbabwe, business permits Zimbabwe",
    "search_phrases": "company registration services Zimbabwe\nbusiness registration Zimbabwe\nZIMRA services Zimbabwe\nbookkeeping Zimbabwe",
    "slug": "/services",
    "canonical_url": "https://abrielexconsultancy.co.zw/services",
    "robots": "index,follow",
    "og_title": "Our Services — Abrielex Business Consultancy",
    "og_description": "Company secretarial, ZIMRA tax & customs, PRAZ & vendor numbers, bookkeeping & financial, and general business services for Zimbabwean businesses and individuals.",
    "og_image": "https://media.base44.com/images/public/user_6a87c5f2c8a0dd45c2e8e73b/8a0351310_Abrielex_logo.svg",
    "social_image": "https://media.base44.com/images/public/user_6a87c5f2c8a0dd45c2e8e73b/8a0351310_Abrielex_logo.svg",
    "image_alt_text": "Services offered by Abrielex Business Consultancy",
    "related_keywords": "internal audit Zimbabwe, stocktaking Zimbabwe, NSSA services Zimbabwe, liquor licence Zimbabwe",
    "schema_type": "CollectionPage",
    "breadcrumb_label": "Services",
    "published": true
  },
  {
    "path": "/services/company-secretarial",
    "page_title": "Company Secretarial Services",
    "seo_title": "Company Registration Services Zimbabwe | Abrielex",
    "meta_description": "Company registration, director changes, annual returns and document retrieval in Zimbabwe. Abrielex handles your full statutory records lifecycle.",
    "primary_keyword": "company registration Zimbabwe",
    "focus_keyword": "company registration services Zimbabwe",
    "secondary_keywords": "business registration Zimbabwe, company secretarial services Zimbabwe, annual returns Zimbabwe, change of directors Zimbabwe",
    "search_phrases": "company registration Zimbabwe\nhow to register a company in Zimbabwe\ncompany registration Bulawayo\ncompany registration Harare",
    "slug": "/services/company-secretarial",
    "canonical_url": "https://abrielexconsultancy.co.zw/services/company-secretarial",
    "robots": "index,follow",
    "og_title": "Company Registration Services Zimbabwe | Abrielex",
    "og_description": "Register your company in Zimbabwe — name search, incorporation documents, certificate of incorporation and ongoing statutory maintenance.",
    "og_image": "https://media.base44.com/images/public/user_6a87c5f2c8a0dd45c2e8e73b/8a0351310_Abrielex_logo.svg",
    "social_image": "https://media.base44.com/images/public/user_6a87c5f2c8a0dd45c2e8e73b/8a0351310_Abrielex_logo.svg",
    "image_alt_text": "Company registration services in Zimbabwe",
    "related_keywords": "company secretarial services Bulawayo, annual returns Zimbabwe, ZIMRA registration Zimbabwe",
    "schema_type": "Service",
    "breadcrumb_label": "Company Secretarial Services",
    "published": true
  },
  {
    "path": "/services/zimra-tax-customs",
    "page_title": "ZIMRA Tax & Customs Services",
    "seo_title": "ZIMRA Registration & Tax Clearance Zimbabwe | Abrielex",
    "meta_description": "ZIMRA registration, VAT, PAYE, QPDS, ITF12C returns, tax clearance, assessments and customs account activation in Zimbabwe with Abrielex.",
    "primary_keyword": "ZIMRA registration Zimbabwe",
    "focus_keyword": "tax clearance Zimbabwe",
    "secondary_keywords": "VAT registration Zimbabwe, PAYE services Zimbabwe, ZIMRA tax clearance Zimbabwe, customs account activation Zimbabwe, tax assessments Zimbabwe",
    "search_phrases": "ZIMRA registration Zimbabwe\nZIMRA tax clearance Zimbabwe\nVAT registration Zimbabwe\nPAYE services Zimbabwe\nhow to get tax clearance in Zimbabwe",
    "slug": "/services/zimra-tax-customs",
    "canonical_url": "https://abrielexconsultancy.co.zw/services/zimra-tax-customs",
    "robots": "index,follow",
    "og_title": "ZIMRA Tax & Customs Services — Abrielex Business Consultancy",
    "og_description": "Tax registration, returns filing, tax health checkups, assessments and customs activation with the Zimbabwe Revenue Authority.",
    "og_image": "https://media.base44.com/images/public/user_6a87c5f2c8a0dd45c2e8e73b/8a0351310_Abrielex_logo.svg",
    "social_image": "https://media.base44.com/images/public/user_6a87c5f2c8a0dd45c2e8e73b/8a0351310_Abrielex_logo.svg",
    "image_alt_text": "ZIMRA tax and customs services in Zimbabwe",
    "related_keywords": "PAYE returns Zimbabwe, QPDS returns Zimbabwe, ITF12C returns Zimbabwe, tax clearance Bulawayo",
    "schema_type": "Service",
    "breadcrumb_label": "ZIMRA Tax & Customs Services",
    "published": true
  },
  {
    "path": "/services/praz-vendor-numbers",
    "page_title": "PRAZ & Vendor Number Services",
    "seo_title": "PRAZ Registration & Vendor Numbers Zimbabwe | Abrielex",
    "meta_description": "PRAZ registration, vendor numbers, tender bidding documentation and procurement account activations in Zimbabwe. Get procurement-ready with Abrielex.",
    "primary_keyword": "PRAZ registration Zimbabwe",
    "focus_keyword": "PRAZ registration Zimbabwe",
    "secondary_keywords": "vendor numbers Zimbabwe, tender assistance Zimbabwe, procurement services Zimbabwe, PRAZ vendor number, tender bidding documentation Zimbabwe",
    "search_phrases": "PRAZ registration Zimbabwe\nvendor number Zimbabwe\ntender assistance Zimbabwe\nprocurement services Zimbabwe\nhow to register with PRAZ",
    "slug": "/services/praz-vendor-numbers",
    "canonical_url": "https://abrielexconsultancy.co.zw/services/praz-vendor-numbers",
    "robots": "index,follow",
    "og_title": "PRAZ & Vendor Number Services — Abrielex Business Consultancy",
    "og_description": "PRAZ registration, vendor numbers and professional tender bidding documentation so your business can compete for public contracts.",
    "og_image": "https://media.base44.com/images/public/user_6a87c5f2c8a0dd45c2e8e73b/8a0351310_Abrielex_logo.svg",
    "social_image": "https://media.base44.com/images/public/user_6a87c5f2c8a0dd45c2e8e73b/8a0351310_Abrielex_logo.svg",
    "image_alt_text": "PRAZ registration and vendor number services in Zimbabwe",
    "related_keywords": "tender assistance Zimbabwe, procurement services Bulawayo, vendor number application",
    "schema_type": "Service",
    "breadcrumb_label": "PRAZ & Vendor Number Services",
    "published": true
  },
  {
    "path": "/services/bookkeeping-financial",
    "page_title": "Bookkeeping & Financial Services",
    "seo_title": "Bookkeeping, Accounting & Internal Audit Zimbabwe | Abrielex",
    "meta_description": "Bookkeeping, management accounts, financial reporting, internal audits, stocktakes and reconciliations for Zimbabwean businesses, NGOs and individuals.",
    "primary_keyword": "bookkeeping Zimbabwe",
    "focus_keyword": "bookkeeping Zimbabwe",
    "secondary_keywords": "internal audit Zimbabwe, stocktaking Zimbabwe, financial reporting Zimbabwe, accounts reconciliations Zimbabwe, financial planning Zimbabwe",
    "search_phrases": "bookkeeping Zimbabwe\ninternal audit Zimbabwe\nstocktaking Zimbabwe\naccounting services Bulawayo\nstock planning Zimbabwe",
    "slug": "/services/bookkeeping-financial",
    "canonical_url": "https://abrielexconsultancy.co.zw/services/bookkeeping-financial",
    "robots": "index,follow",
    "og_title": "Bookkeeping & Financial Services — Abrielex Business Consultancy",
    "og_description": "Accurate bookkeeping, management accounts, financial reporting, internal audits, stocktakes and reconciliations for your business.",
    "og_image": "https://media.base44.com/images/public/user_6a87c5f2c8a0dd45c2e8e73b/8a0351310_Abrielex_logo.svg",
    "social_image": "https://media.base44.com/images/public/user_6a87c5f2c8a0dd45c2e8e73b/8a0351310_Abrielex_logo.svg",
    "image_alt_text": "Bookkeeping and financial services in Zimbabwe",
    "related_keywords": "internal audit Zimbabwe, stocktaking Zimbabwe, accounting services Harare, stock planning Zimbabwe",
    "schema_type": "Service",
    "breadcrumb_label": "Bookkeeping & Financial Services",
    "published": true
  },
  {
    "path": "/services/general-services",
    "page_title": "General Business Services",
    "seo_title": "Liquor & Shop Licences Zimbabwe | Abrielex Consultancy",
    "meta_description": "Liquor licences, shop licences, permits, agreements of sale and labour relations support in Zimbabwe, handled by Abrielex Business Consultancy.",
    "primary_keyword": "liquor licence Zimbabwe",
    "focus_keyword": "liquor licence Zimbabwe",
    "secondary_keywords": "shop licence Zimbabwe, business permits Zimbabwe, permits services Zimbabwe, labour relations Zimbabwe, agreements of sale Zimbabwe",
    "search_phrases": "liquor licence Zimbabwe\nshop licence Zimbabwe\nbusiness permits Zimbabwe\nhow to get a liquor licence in Zimbabwe",
    "slug": "/services/general-services",
    "canonical_url": "https://abrielexconsultancy.co.zw/services/general-services",
    "robots": "index,follow",
    "og_title": "General Business Services — Abrielex Business Consultancy",
    "og_description": "Liquor and shop licences, permits, agreements of sale and labour relations support so your business can operate lawfully.",
    "og_image": "https://media.base44.com/images/public/user_6a87c5f2c8a0dd45c2e8e73b/8a0351310_Abrielex_logo.svg",
    "social_image": "https://media.base44.com/images/public/user_6a87c5f2c8a0dd45c2e8e73b/8a0351310_Abrielex_logo.svg",
    "image_alt_text": "General business services including liquor and shop licences in Zimbabwe",
    "related_keywords": "shop licence Zimbabwe, permits services Zimbabwe, liquor licence Bulawayo",
    "schema_type": "Service",
    "breadcrumb_label": "General Business Services",
    "published": true
  },
  {
    "path": "/resources",
    "page_title": "Resources",
    "seo_title": "Business Guides & Compliance Resources Zimbabwe | Abrielex",
    "meta_description": "Business guides, compliance information, checklists and articles to help Zimbabwean businesses understand registration, tax, procurement and compliance.",
    "primary_keyword": "business guides Zimbabwe",
    "focus_keyword": "business compliance guide Zimbabwe",
    "secondary_keywords": "company registration checklist Zimbabwe, tax compliance Zimbabwe, business documentation checklist, tender preparation checklist Zimbabwe",
    "search_phrases": "business guides Zimbabwe\ncompany registration checklist Zimbabwe\ntax compliance Zimbabwe\nhow to start a business in Zimbabwe",
    "slug": "/resources",
    "canonical_url": "https://abrielexconsultancy.co.zw/resources",
    "robots": "index,follow",
    "og_title": "Resources & Business Guides — Abrielex Business Consultancy",
    "og_description": "Guides, checklists and articles on business registration, tax, procurement and compliance in Zimbabwe.",
    "og_image": "https://media.base44.com/images/public/user_6a87c5f2c8a0dd45c2e8e73b/8a0351310_Abrielex_logo.svg",
    "social_image": "https://media.base44.com/images/public/user_6a87c5f2c8a0dd45c2e8e73b/8a0351310_Abrielex_logo.svg",
    "image_alt_text": "Business resources and compliance guides from Abrielex",
    "related_keywords": "business documentation checklist, tender preparation checklist Zimbabwe",
    "schema_type": "CollectionPage",
    "breadcrumb_label": "Resources",
    "published": true
  },
  {
    "path": "/faq",
    "page_title": "Frequently Asked Questions",
    "seo_title": "FAQs | Registration, Tax & PRAZ Questions — Abrielex",
    "meta_description": "Answers to common questions about business registration, ZIMRA tax clearance, PAYE, VAT, PRAZ, NSSA, bookkeeping, audits, licences and tenders in Zimbabwe.",
    "primary_keyword": "business consultancy FAQ Zimbabwe",
    "focus_keyword": "business registration FAQ Zimbabwe",
    "secondary_keywords": "ZIMRA tax clearance FAQ, PRAZ registration FAQ, NSSA services Zimbabwe, bookkeeping FAQ Zimbabwe, tender assistance FAQ",
    "search_phrases": "business consultancy FAQ Zimbabwe\nZIMRA tax clearance questions\nPRAZ registration questions\nhow long does company registration take in Zimbabwe",
    "slug": "/faq",
    "canonical_url": "https://abrielexconsultancy.co.zw/faq",
    "robots": "index,follow",
    "og_title": "FAQs — Abrielex Business Consultancy",
    "og_description": "Answers to common questions about our services — registration, tax, procurement, bookkeeping, compliance and how we work.",
    "og_image": "https://media.base44.com/images/public/user_6a87c5f2c8a0dd45c2e8e73b/8a0351310_Abrielex_logo.svg",
    "social_image": "https://media.base44.com/images/public/user_6a87c5f2c8a0dd45c2e8e73b/8a0351310_Abrielex_logo.svg",
    "image_alt_text": "Frequently asked questions about Abrielex Business Consultancy",
    "related_keywords": "ZIMRA services Zimbabwe, PRAZ registration Zimbabwe, bookkeeping Zimbabwe",
    "schema_type": "FAQPage",
    "breadcrumb_label": "FAQ",
    "published": true
  },
  {
    "path": "/contact",
    "page_title": "Contact Us",
    "seo_title": "Contact Abrielex Business Consultancy | Bulawayo, Zimbabwe",
    "meta_description": "Contact Abrielex by phone, WhatsApp or email. Visit our office at Office No. 116, Lutheran House, Bulawayo, or use our remote services across Zimbabwe.",
    "primary_keyword": "business consultants Bulawayo",
    "focus_keyword": "business consultants Bulawayo",
    "secondary_keywords": "business services Bulawayo, business consultancy contact Zimbabwe, business services Harare, business services Victoria Falls",
    "search_phrases": "business consultants Bulawayo\nAbrielex contact\nbusiness consultancy Zimbabwe phone number",
    "slug": "/contact",
    "canonical_url": "https://abrielexconsultancy.co.zw/contact",
    "robots": "index,follow",
    "og_title": "Contact Abrielex Business Consultancy",
    "og_description": "Reach us by phone, WhatsApp, email, or visit our office in Bulawayo, Zimbabwe.",
    "og_image": "https://media.base44.com/images/public/user_6a87c5f2c8a0dd45c2e8e73b/8a0351310_Abrielex_logo.svg",
    "social_image": "https://media.base44.com/images/public/user_6a87c5f2c8a0dd45c2e8e73b/8a0351310_Abrielex_logo.svg",
    "image_alt_text": "Contact Abrielex Business Consultancy in Bulawayo",
    "related_keywords": "business services Bulawayo, business services Masvingo, business services Chiredzi",
    "schema_type": "ContactPage",
    "breadcrumb_label": "Contact Us",
    "published": true
  },
  {
    "path": "/get-a-quote",
    "page_title": "Get a Quote / Book a Consultation",
    "seo_title": "Get a Quote or Book a Consultation — Abrielex",
    "meta_description": "Request a quote or book a consultation with Abrielex for business registration, tax, procurement, bookkeeping and compliance services in Zimbabwe.",
    "primary_keyword": "business consultancy quote Zimbabwe",
    "focus_keyword": "book a business consultation Zimbabwe",
    "secondary_keywords": "business consultants Zimbabwe, request a quote Zimbabwe, business advisory consultation, company registration quote Zimbabwe",
    "search_phrases": "business consultancy quote Zimbabwe\nbook a business consultation Zimbabwe\nrequest a quote company registration Zimbabwe",
    "slug": "/get-a-quote",
    "canonical_url": "https://abrielexconsultancy.co.zw/get-a-quote",
    "robots": "index,follow",
    "og_title": "Get a Quote or Book a Consultation — Abrielex",
    "og_description": "Tell us about the service you require and we will review your enquiry and provide appropriate guidance.",
    "og_image": "https://media.base44.com/images/public/user_6a87c5f2c8a0dd45c2e8e73b/8a0351310_Abrielex_logo.svg",
    "social_image": "https://media.base44.com/images/public/user_6a87c5f2c8a0dd45c2e8e73b/8a0351310_Abrielex_logo.svg",
    "image_alt_text": "Get a quote or book a consultation with Abrielex",
    "related_keywords": "business consultants Zimbabwe, business advisory consultation Zimbabwe",
    "schema_type": "WebPage",
    "breadcrumb_label": "Get a Quote",
    "published": true
  },
  {
    "path": "/locations",
    "page_title": "Our Coverage",
    "seo_title": "Business Consultancy Coverage Across Zimbabwe | Abrielex",
    "meta_description": "Abrielex serves businesses across Zimbabwe — Bulawayo, Harare, Victoria Falls, Masvingo, Chiredzi and more, with remote and online service delivery.",
    "primary_keyword": "business services Zimbabwe",
    "focus_keyword": "business consultancy coverage Zimbabwe",
    "secondary_keywords": "business services Bulawayo, business services Harare, business services Victoria Falls, business services Masvingo, business services Chiredzi",
    "search_phrases": "business services Zimbabwe\nbusiness services Bulawayo\nbusiness services Harare\nbusiness services Victoria Falls\nbusiness services Masvingo\nbusiness services Chiredzi",
    "slug": "/locations",
    "canonical_url": "https://abrielexconsultancy.co.zw/locations",
    "robots": "index,follow",
    "og_title": "Our Coverage — Business Services Across Zimbabwe",
    "og_description": "From our base in Bulawayo, we deliver business consultancy services across Zimbabwe — remotely or in person.",
    "og_image": "https://media.base44.com/images/public/user_6a87c5f2c8a0dd45c2e8e73b/8a0351310_Abrielex_logo.svg",
    "social_image": "https://media.base44.com/images/public/user_6a87c5f2c8a0dd45c2e8e73b/8a0351310_Abrielex_logo.svg",
    "image_alt_text": "Abrielex Business Consultancy coverage across Zimbabwe",
    "related_keywords": "business consultants Bulawayo, business consultants Harare",
    "schema_type": "CollectionPage",
    "breadcrumb_label": "Locations",
    "published": true
  },
  {
    "path": "/privacy",
    "page_title": "Privacy Policy",
    "seo_title": "Privacy Policy — Abrielex Business Consultancy",
    "meta_description": "How Abrielex Business Consultancy collects, uses, stores and protects the personal information you share through this website and its enquiry forms.",
    "primary_keyword": "Abrielex privacy policy",
    "focus_keyword": "privacy policy",
    "secondary_keywords": "data protection Zimbabwe, website privacy policy, personal information Zimbabwe",
    "search_phrases": "Abrielex privacy policy\nhow we use your information",
    "slug": "/privacy",
    "canonical_url": "https://abrielexconsultancy.co.zw/privacy",
    "robots": "index,follow",
    "og_title": "Privacy Policy — Abrielex Business Consultancy",
    "og_description": "Privacy policy for the Abrielex Business Consultancy website and client services.",
    "og_image": "https://media.base44.com/images/public/user_6a87c5f2c8a0dd45c2e8e73b/8a0351310_Abrielex_logo.svg",
    "social_image": "https://media.base44.com/images/public/user_6a87c5f2c8a0dd45c2e8e73b/8a0351310_Abrielex_logo.svg",
    "image_alt_text": "Abrielex Business Consultancy privacy policy",
    "related_keywords": "terms and conditions Abrielex, website legal Zimbabwe",
    "schema_type": "WebPage",
    "breadcrumb_label": "Privacy Policy",
    "published": true
  },
  {
    "path": "/terms",
    "page_title": "Terms and Conditions",
    "seo_title": "Terms and Conditions — Abrielex Business Consultancy",
    "meta_description": "The terms and conditions governing use of the Abrielex Business Consultancy website and any quote, consultation or service enquiry you submit to us.",
    "primary_keyword": "Abrielex terms and conditions",
    "focus_keyword": "terms and conditions",
    "secondary_keywords": "website terms of service Zimbabwe, business consultancy terms, enquiries terms",
    "search_phrases": "Abrielex terms and conditions\nwebsite terms of service Zimbabwe",
    "slug": "/terms",
    "canonical_url": "https://abrielexconsultancy.co.zw/terms",
    "robots": "index,follow",
    "og_title": "Terms and Conditions — Abrielex Business Consultancy",
    "og_description": "Terms of service for using the Abrielex Business Consultancy website and engaging our services.",
    "og_image": "https://media.base44.com/images/public/user_6a87c5f2c8a0dd45c2e8e73b/8a0351310_Abrielex_logo.svg",
    "social_image": "https://media.base44.com/images/public/user_6a87c5f2c8a0dd45c2e8e73b/8a0351310_Abrielex_logo.svg",
    "image_alt_text": "Abrielex Business Consultancy terms and conditions",
    "related_keywords": "privacy policy Abrielex, website legal Zimbabwe",
    "schema_type": "WebPage",
    "breadcrumb_label": "Terms and Conditions",
    "published": true
  },
  {
    "path": "/locations/bulawayo",
    "page_title": "Business Services in Bulawayo",
    "seo_title": "Business Services in Bulawayo | Registration & Tax",
    "meta_description": "Business registration, ZIMRA tax, PRAZ, bookkeeping and compliance services in Bulawayo. Abrielex is based at Lutheran House, Bulawayo, Zimbabwe.",
    "primary_keyword": "business services Bulawayo",
    "focus_keyword": "business consultants Bulawayo",
    "secondary_keywords": "company registration Bulawayo, ZIMRA tax clearance Bulawayo, bookkeeping Bulawayo, business consultants Bulawayo",
    "search_phrases": "business services Bulawayo\nbusiness consultants Bulawayo\ncompany registration Bulawayo\ntax clearance Bulawayo",
    "slug": "/locations/bulawayo",
    "canonical_url": "https://abrielexconsultancy.co.zw/locations/bulawayo",
    "robots": "index,follow",
    "og_title": "Business Services in Bulawayo — Abrielex Business Consultancy",
    "og_description": "Business registration, compliance, tax, procurement and bookkeeping services in Bulawayo, Zimbabwe.",
    "og_image": "https://media.base44.com/images/public/user_6a87c5f2c8a0dd45c2e8e73b/8a0351310_Abrielex_logo.svg",
    "social_image": "https://media.base44.com/images/public/user_6a87c5f2c8a0dd45c2e8e73b/8a0351310_Abrielex_logo.svg",
    "image_alt_text": "Business services in Bulawayo by Abrielex",
    "related_keywords": "business services Harare, business services Victoria Falls, business services Masvingo",
    "schema_type": "Service",
    "breadcrumb_label": "Bulawayo",
    "published": true
  },
  {
    "path": "/locations/harare",
    "page_title": "Business Services in Harare",
    "seo_title": "Business Services in Harare | Registration & Tax",
    "meta_description": "Business registration, ZIMRA tax, PRAZ, bookkeeping and compliance services for businesses in Harare, Zimbabwe — delivered remotely or in person.",
    "primary_keyword": "business services Harare",
    "focus_keyword": "business consultants Harare",
    "secondary_keywords": "company registration Harare, ZIMRA tax clearance Harare, bookkeeping Harare, business consultants Harare",
    "search_phrases": "business services Harare\nbusiness consultants Harare\ncompany registration Harare\ntax clearance Harare",
    "slug": "/locations/harare",
    "canonical_url": "https://abrielexconsultancy.co.zw/locations/harare",
    "robots": "index,follow",
    "og_title": "Business Services in Harare — Abrielex Business Consultancy",
    "og_description": "Business registration, compliance, tax, procurement and bookkeeping services in Harare, Zimbabwe.",
    "og_image": "https://media.base44.com/images/public/user_6a87c5f2c8a0dd45c2e8e73b/8a0351310_Abrielex_logo.svg",
    "social_image": "https://media.base44.com/images/public/user_6a87c5f2c8a0dd45c2e8e73b/8a0351310_Abrielex_logo.svg",
    "image_alt_text": "Business services in Harare by Abrielex",
    "related_keywords": "business services Bulawayo, business services Masvingo, business services Chiredzi",
    "schema_type": "Service",
    "breadcrumb_label": "Harare",
    "published": true
  },
  {
    "path": "/locations/victoria-falls",
    "page_title": "Business Services in Victoria Falls",
    "seo_title": "Business Services in Victoria Falls | Registration & Tax",
    "meta_description": "Business registration, tax, procurement, bookkeeping and compliance services for businesses in Victoria Falls, Zimbabwe, from Abrielex Business Consultancy.",
    "primary_keyword": "business services Victoria Falls",
    "focus_keyword": "business services Victoria Falls",
    "secondary_keywords": "company registration Victoria Falls, tax clearance Victoria Falls, bookkeeping Victoria Falls, liquor licence Victoria Falls",
    "search_phrases": "business services Victoria Falls\ncompany registration Victoria Falls\ntax clearance Victoria Falls",
    "slug": "/locations/victoria-falls",
    "canonical_url": "https://abrielexconsultancy.co.zw/locations/victoria-falls",
    "robots": "index,follow",
    "og_title": "Business Services in Victoria Falls — Abrielex Business Consultancy",
    "og_description": "Business registration, compliance, tax, procurement and bookkeeping services in Victoria Falls, Zimbabwe.",
    "og_image": "https://media.base44.com/images/public/user_6a87c5f2c8a0dd45c2e8e73b/8a0351310_Abrielex_logo.svg",
    "social_image": "https://media.base44.com/images/public/user_6a87c5f2c8a0dd45c2e8e73b/8a0351310_Abrielex_logo.svg",
    "image_alt_text": "Business services in Victoria Falls by Abrielex",
    "related_keywords": "business services Bulawayo, business services Harare, business services Masvingo",
    "schema_type": "Service",
    "breadcrumb_label": "Victoria Falls",
    "published": true
  },
  {
    "path": "/locations/masvingo",
    "page_title": "Business Services in Masvingo",
    "seo_title": "Business Services in Masvingo | Registration & Tax",
    "meta_description": "Business registration, ZIMRA tax, procurement, bookkeeping and compliance services for businesses in Masvingo, Zimbabwe, from Abrielex Business Consultancy.",
    "primary_keyword": "business services Masvingo",
    "focus_keyword": "business services Masvingo",
    "secondary_keywords": "company registration Masvingo, tax clearance Masvingo, bookkeeping Masvingo, business permits Masvingo",
    "search_phrases": "business services Masvingo\ncompany registration Masvingo\ntax clearance Masvingo",
    "slug": "/locations/masvingo",
    "canonical_url": "https://abrielexconsultancy.co.zw/locations/masvingo",
    "robots": "index,follow",
    "og_title": "Business Services in Masvingo — Abrielex Business Consultancy",
    "og_description": "Business registration, compliance, tax, procurement and bookkeeping services in Masvingo, Zimbabwe.",
    "og_image": "https://media.base44.com/images/public/user_6a87c5f2c8a0dd45c2e8e73b/8a0351310_Abrielex_logo.svg",
    "social_image": "https://media.base44.com/images/public/user_6a87c5f2c8a0dd45c2e8e73b/8a0351310_Abrielex_logo.svg",
    "image_alt_text": "Business services in Masvingo by Abrielex",
    "related_keywords": "business services Chiredzi, business services Bulawayo, business services Harare",
    "schema_type": "Service",
    "breadcrumb_label": "Masvingo",
    "published": true
  },
  {
    "path": "/locations/chiredzi",
    "page_title": "Business Services in Chiredzi",
    "seo_title": "Business Services in Chiredzi | Registration & Tax",
    "meta_description": "Business registration, tax, procurement, bookkeeping and compliance services for businesses in Chiredzi, Zimbabwe, from Abrielex Business Consultancy.",
    "primary_keyword": "business services Chiredzi",
    "focus_keyword": "business services Chiredzi",
    "secondary_keywords": "company registration Chiredzi, tax clearance Chiredzi, bookkeeping Chiredzi, business permits Chiredzi",
    "search_phrases": "business services Chiredzi\ncompany registration Chiredzi\ntax clearance Chiredzi",
    "slug": "/locations/chiredzi",
    "canonical_url": "https://abrielexconsultancy.co.zw/locations/chiredzi",
    "robots": "index,follow",
    "og_title": "Business Services in Chiredzi — Abrielex Business Consultancy",
    "og_description": "Business registration, compliance, tax, procurement and bookkeeping services in Chiredzi, Zimbabwe.",
    "og_image": "https://media.base44.com/images/public/user_6a87c5f2c8a0dd45c2e8e73b/8a0351310_Abrielex_logo.svg",
    "social_image": "https://media.base44.com/images/public/user_6a87c5f2c8a0dd45c2e8e73b/8a0351310_Abrielex_logo.svg",
    "image_alt_text": "Business services in Chiredzi by Abrielex",
    "related_keywords": "business services Masvingo, business services Bulawayo, business services Harare",
    "schema_type": "Service",
    "breadcrumb_label": "Chiredzi",
    "published": true
  }
],
  NotificationTemplate: [
  {
    "event": "contact_message",
    "channel": "email",
    "subject": "NEW CONTACT MESSAGE — ABRIELEX BUSINESS CONSULTANCY",
    "body": "A new contact message was received from {{client_name}}.\n\nSubmission type: Contact\nClient name: {{client_name}}\nEmail address: {{email}}\nPhone: {{phone}}\nSubject: {{subject}}\nService: {{service_category}}\nLocation: {{location}}\nReceived: {{submitted_at}}\n\nMessage:\n{{message}}\n\nView and respond to this submission in the admin dashboard:\nhttps://abrielexconsultancy.co.zw/admin/messages",
    "active": true
  },
  {
    "event": "quote_request",
    "channel": "email",
    "subject": "NEW GET A QUOTE REQUEST — ABRIELEX BUSINESS CONSULTANCY",
    "body": "A new Get a Quote request was received from {{client_name}}.\n\nSubmission type: Get a Quote\nClient name: {{client_name}}\nEmail address: {{email}}\nPhone: {{phone}}\nIndividual or business: {{client_type}}\nBusiness / entity type: {{entity_type}}\nService category: {{service_category}}\nSpecific service: {{specific_service}}\nPreferred contact method: {{preferred_contact_method}}\nLocation: {{location}}\nReceived: {{submitted_at}}\n\nDescription of requirement:\n{{description}}\n\nAdditional information:\n{{additional_info}}\n\nAttachment: {{document_url}}\n\nView and respond to this submission in the admin dashboard:\nhttps://abrielexconsultancy.co.zw/admin/quotes",
    "active": true
  },
  {
    "event": "consultation_booking",
    "channel": "email",
    "subject": "NEW BOOK A CONSULTATION REQUEST — ABRIELEX BUSINESS CONSULTANCY",
    "body": "A new consultation request was received from {{client_name}}.\n\nSubmission type: Book a Consultation\nClient name: {{client_name}}\nEmail address: {{email}}\nPhone: {{phone}}\nWhatsApp: {{whatsapp}}\nConsultation type: {{consultation_type}}\nPreferred date: {{preferred_date}}\nPreferred time: {{preferred_time}}\nLocation: {{location}}\nReceived: {{submitted_at}}\n\nReason for consultation:\n{{reason}}\n\nAttachment: {{document_url}}\n\nView and confirm this booking in the admin dashboard:\nhttps://abrielexconsultancy.co.zw/admin/consultations",
    "active": true
  },
  {
    "event": "contact_message",
    "channel": "inapp",
    "subject": "New Contact Message from {{client_name}}",
    "body": "{{client_name}} sent a contact message: {{subject}}",
    "active": true
  },
  {
    "event": "quote_request",
    "channel": "inapp",
    "subject": "New Get a Quote Request from {{client_name}}",
    "body": "{{client_name}} requested {{specific_service}} ({{service_category}}).",
    "active": true
  },
  {
    "event": "consultation_booking",
    "channel": "inapp",
    "subject": "New Consultation Request from {{client_name}}",
    "body": "{{client_name}} requested {{consultation_type}} on {{preferred_date}} at {{preferred_time}}.",
    "active": true
  }
],
  Country: [
  {
    "code": "ZW",
    "name": "Zimbabwe",
    "currency": "USD / ZiG",
    "confirmed": true,
    "regulatory_bodies": "ZIMRA — Zimbabwe Revenue Authority (tax)\nDeeds, Companies & Intellectual Property Registry (DCIP) (companies)\nPRAZ — Procurement Regulatory Authority of Zimbabwe (procurement)\nLocal Municipality / City Council (local authority)\nLocal Liquor Licensing Board (liquor)",
    "coverage": "Bulawayo, Harare, Gwanda, Hwange, Lupane, Victoria Falls, Masvingo, Chiredzi, Mutare, Kwekwe, Chitungwiza, Marondera and Kadoma — remote/online services available across all coverage areas.",
    "active": true,
    "sort_order": 1
  }
],
  // Testimonials are only ever populated where genuine client testimonials have
  // been supplied. None have been provided for Abrielex, so this stays empty
  // rather than being filled with invented reviews.
  Testimonial: [],
};

export function buildCmsSeed() {
  return cmsSeed;
}
