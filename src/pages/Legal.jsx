import React, { useEffect, useState } from "react";
import SectionHeading from "@/components/SectionHeading";
import CTASection from "@/components/CTASection";
import { companyInfo } from "@/lib/siteData";
import { base44 } from "@/api/base44Client";

const privacySections = [
  {
    title: "1. Introduction",
    body: [
      `${companyInfo.name} ("Abrielex", "we", "us" or "our") is a business consultancy based in Bulawayo, Zimbabwe. We respect your privacy and are committed to protecting the personal information you share with us through this website.`,
      "This Privacy Policy explains what information we collect, how we use it, how it is stored and protected, and the rights you have over your personal information. It applies to visitors and enquirers who use this website or submit a quote request, consultation booking, service request or contact enquiry to us.",
    ],
  },
  {
    title: "2. Information we collect",
    body: [
      "We collect information in two broad ways: information you voluntarily provide through our forms, and limited technical information collected automatically when you visit the website.",
    ],
  },
  {
    title: "2.1 Personal information submitted through forms",
    body: [
      "When you submit a quote request, consultation booking, service request or contact enquiry, we collect the details you enter. This typically includes:",
      "• Your name; • Your email address; • Your phone number and/or WhatsApp number; • The service category and specific service you are enquiring about; • The city or area you are located in, where you provide it; • The details of your enquiry or message; • Any documents you choose to upload.",
      "We use this information to understand your requirements, prepare a response or quotation, and contact you about the service you have requested.",
    ],
  },
  {
    title: "2.2 Automatically collected technical information",
    body: [
      "When you visit the website, our hosting platform may automatically collect certain technical information, such as your browser type, device type, approximate region, the pages you visit and the times of your visits. This information is used in aggregate to maintain and improve the website and is not used to identify you personally.",
    ],
  },
  {
    title: "3. Cookies and similar technologies",
    body: [
      "The website may use cookies or similar technologies to remember your preferences and keep the site working correctly. You can set your browser to refuse cookies, though some features of the website may not function as intended if cookies are disabled.",
    ],
  },
  {
    title: "4. How we use your information",
    body: [
      "We use the information you submit to: respond to your enquiry; prepare a quote or consultation; identify the service you are interested in; contact you about your request; and maintain records of enquiries for the purpose of providing our services.",
      "We do not sell your personal information to third parties.",
    ],
  },
  {
    title: "5. How information is stored",
    body: [
      "Enquiry information you submit is stored securely within our consultancy management system so that our team can review and respond to your request. Documents you upload are stored for the purpose of assessing and progressing your enquiry.",
    ],
  },
  {
    title: "6. Data security",
    body: [
      "We take reasonable steps to protect the information you provide against unauthorised access, alteration or disclosure. However, no method of transmission or electronic storage is completely secure, and we cannot guarantee absolute security.",
    ],
  },
  {
    title: "7. Data retention",
    body: [
      "We retain enquiry information for as long as is necessary to respond to your request and for a reasonable period thereafter for record-keeping purposes. Where an enquiry does not progress to an engagement, we may retain the information for a limited period and then delete or anonymise it.",
    ],
  },
  {
    title: "8. Sharing and disclosure of information",
    body: [
      "We do not share your personal information with third parties for marketing purposes. We may disclose information where necessary to respond to your enquiry, to comply with a legal obligation, or where required by a regulator or law enforcement authority in accordance with applicable law.",
    ],
  },
  {
    title: "8.1 Service providers",
    body: [
      "We may use trusted service providers (such as our hosting and communications providers) to operate the website and deliver our services. These providers process information on our behalf and are expected to handle it confidentially and securely.",
    ],
  },
  {
    title: "8.2 Legal and regulatory disclosures",
    body: [
      "We may disclose your information where required to do so by law, court order, or by a regulator with lawful authority, to the extent permitted or required by applicable Zimbabwean law.",
    ],
  },
  {
    title: "9. Third-party links",
    body: [
      "This website may contain links to third-party websites (such as social media pages). We are not responsible for the privacy practices of those websites and encourage you to review their privacy policies.",
    ],
  },
  {
    title: "10. Website analytics",
    body: [
      "We may use analytics tools to understand how visitors use the website in aggregate. Where used, these tools help us improve site content and performance and do not identify individual visitors.",
    ],
  },
  {
    title: "11. Children's privacy",
    body: [
      "Our services are intended for businesses and individuals seeking professional business consultancy. We do not knowingly collect personal information from children. If you believe a child has provided us with personal information, please contact us so we can remove it.",
    ],
  },
  {
    title: "12. Your rights",
    body: [
      "You may request access to, correction of, or deletion of the personal information you have provided to us. You may also ask us to stop contacting you. To exercise any of these rights, contact us using the details below.",
    ],
  },
  {
    title: "12.1 Access and correction",
    body: [
      "You may request a copy of the personal information we hold about you and ask us to correct anything that is inaccurate or incomplete.",
    ],
  },
  {
    title: "12.2 Communication preferences",
    body: [
      "You can opt out of receiving communications from us at any time by replying to any message we send or by contacting us using the details below.",
    ],
  },
  {
    title: "13. Changes to this Privacy Policy",
    body: [
      "We may update this Privacy Policy from time to time. The updated version will be published on this page with a revised date. We encourage you to review it periodically.",
    ],
  },
  {
    title: "14. Contact for privacy enquiries",
    body: [
      `If you have any questions about this Privacy Policy or how we handle your information, please contact us at ${companyInfo.email}, telephone ${companyInfo.phone}, or WhatsApp ${companyInfo.whatsapp}. Our office is at ${companyInfo.office.line1}, ${companyInfo.office.line2}, ${companyInfo.office.city}, ${companyInfo.office.country}.`,
    ],
  },
];

const termsSections = [
  {
    title: "1. Introduction",
    body: [
      `These Terms and Conditions ("Terms") govern your use of the ${companyInfo.name} ("Abrielex", "we", "us" or "our") website and any enquiry you submit to us through it. By accessing this website or submitting an enquiry, you agree to these Terms.`,
    ],
  },
  {
    title: "2. Definitions",
    body: [
      "“Website” means this Abrielex Business Consultancy website. “Enquiry” means any quote request, consultation booking, service request or contact message you submit. “Services” means the business consultancy services we offer. “Regulatory authorities” means bodies such as ZIMRA, the companies registry (DCIP), PRAZ, local authorities and licensing boards.",
    ],
  },
  {
    title: "3. Website use",
    body: [
      "You agree to use this website lawfully and only for the purpose of learning about our services and submitting genuine enquiries. You must not misuse the website, submit false or misleading information, or attempt to disrupt its operation.",
    ],
  },
  {
    title: "4. Acceptable use",
    body: [
      "You must not use the website to submit abusive, fraudulent or unlawful content, or to send unsolicited communications. We may decline to respond to or act on any enquiry that we reasonably believe is unlawful, abusive or made in bad faith.",
    ],
  },
  {
    title: "5. Consultancy and service enquiries",
    body: [
      "Through this website you may submit a quote request, book a consultation, request a specific service, or send a contact message. Submitting an enquiry is a request for information or assistance — it is not a binding contract for services.",
    ],
  },
  {
    title: "5.1 Quote requests",
    body: [
      "A quote request asks us to prepare a quotation for a service. We will review your requirements and, where we are able to assist, provide a quote. A quote is an offer and does not become an engagement until you and Abrielex agree in writing.",
    ],
  },
  {
    title: "5.2 Consultation requests",
    body: [
      "A consultation booking is a request to schedule a consultation. Consultations are confirmed by us and may be subject to availability. Submitting a booking request does not guarantee a specific date or time until we confirm it with you.",
    ],
  },
  {
    title: "5.3 Service requests",
    body: [
      "A service request identifies a specific service you are interested in. We will contact you to discuss the requirements, documents and process. We are not obliged to accept or undertake any work until an engagement is agreed.",
    ],
  },
  {
    title: "6. Accuracy of information provided by users",
    body: [
      "You are responsible for the accuracy of the information and documents you provide. We rely on the information you give us to advise and act for you. We are not liable for consequences arising from inaccurate, incomplete or misleading information you provide.",
    ],
  },
  {
    title: "7. No automatic client relationship",
    body: [
      "Submitting a quote, consultation, contact or service request does not automatically create a client relationship, and does not guarantee that Abrielex will accept or undertake the work. A formal engagement arises only when we and you agree to proceed, typically in writing.",
    ],
  },
  {
    title: "8. Service availability",
    body: [
      "Our services are subject to availability and to the requirements of the relevant regulatory authorities. Timelines are estimates only and may be affected by factors outside our control, including authority turnaround times.",
    ],
  },
  {
    title: "9. Third-party authorities and regulatory bodies",
    body: [
      "Many of our services involve dealings with regulatory authorities such as ZIMRA, the companies registry, PRAZ, local authorities and licensing boards. These bodies operate independently of Abrielex, and their processes, requirements and timelines are outside our control.",
    ],
  },
  {
    title: "10. Information for general and business support purposes",
    body: [
      "Information provided on this website and in our resources is for general business support and educational purposes. It is not a substitute for tailored professional advice. You should confirm current requirements with us or the relevant authority before acting.",
    ],
  },
  {
    title: "11. Fees and quotations",
    body: [
      "Service fees are discussed and agreed with you before work commences. Any quote we provide is valid for the period stated in the quote (or, if none, for a reasonable period) and may be withdrawn or revised if circumstances change.",
    ],
  },
  {
    title: "12. Payment terms",
    body: [
      "Where an engagement is agreed, payment terms will be set out in that agreement. This website does not process online checkout payments. Fees are arranged directly with the agency.",
    ],
  },
  {
    title: "13. Cancellation and rescheduling of consultations",
    body: [
      "If you need to cancel or reschedule a confirmed consultation, please contact us as early as possible. We will use reasonable efforts to accommodate rescheduling. We may apply our standard rescheduling or cancellation terms where an engagement has been agreed.",
    ],
  },
  {
    title: "14. Intellectual property",
    body: [
      "The content of this website, including text, logos, graphics and resources, is owned by or licensed to Abrielex and is protected by intellectual property laws. You may view and download content for your personal, non-commercial use. You must not reproduce or redistribute our content without our permission.",
    ],
  },
  {
    title: "15. Website content",
    body: [
      "We take care to keep website content accurate and current, but regulatory requirements change. We do not warrant that all information is complete or up to date at all times and recommend confirming current requirements with us.",
    ],
  },
  {
    title: "16. Third-party links",
    body: [
      "This website may link to third-party websites we do not control. We are not responsible for their content or availability and do not endorse them.",
    ],
  },
  {
    title: "17. Privacy and data handling",
    body: [
      "How we handle information you submit is described in our Privacy Policy, which is incorporated into these Terms by reference.",
    ],
  },
  {
    title: "18. Limitation of liability",
    body: [
      "To the fullest extent permitted by law, Abrielex shall not be liable for any indirect, incidental or consequential loss or damage arising from your use of this website or reliance on information provided through it. Our liability for any agreed engagement is as set out in the engagement agreement.",
    ],
  },
  {
    title: "19. No guarantee of regulatory approval or outcome",
    body: [
      "We do not guarantee that any application, registration, filing or submission will be approved by ZIMRA, PRAZ, the companies registry, any licensing authority, or any other regulator. Approval decisions rest with the relevant authorities. We provide professional assistance to prepare and submit matters correctly, but outcomes depend on factors outside our control.",
    ],
  },
  {
    title: "20. User responsibilities",
    body: [
      "You are responsible for providing accurate information and required documents in a timely manner, responding to our communications, and complying with your own legal and regulatory obligations.",
    ],
  },
  {
    title: "21. Website availability",
    body: [
      "We aim to keep the website available but do not guarantee uninterrupted access. We may update, suspend or restrict access to the website for maintenance or operational reasons without notice.",
    ],
  },
  {
    title: "22. Changes to services",
    body: [
      "We may add, change or withdraw services from time to time. Any change to a service that is the subject of an agreed engagement will be communicated to you.",
    ],
  },
  {
    title: "23. Changes to these Terms",
    body: [
      "We may update these Terms from time to time. The current version will be published on this page with a revised date. Your continued use of the website after changes constitutes acceptance of the updated Terms.",
    ],
  },
  {
    title: "24. Governing law and jurisdiction",
    body: [
      "These Terms are governed by the laws of Zimbabwe. Any dispute arising in connection with these Terms or your use of this website shall be subject to the jurisdiction of the Zimbabwean courts, unless otherwise required by applicable law or agreed in writing.",
    ],
  },
  {
    title: "25. Contact information",
    body: [
      `If you have any questions about these Terms, please contact us at ${companyInfo.email}, telephone ${companyInfo.phone}, or WhatsApp ${companyInfo.whatsapp}. Our office is at ${companyInfo.office.line1}, ${companyInfo.office.line2}, ${companyInfo.office.city}, ${companyInfo.office.country}.`,
    ],
  },
];

export default function Legal({ kind = "privacy" }) {
  const [content, setContent] = useState({});
  const isPrivacy = kind === "privacy";
  useEffect(() => {
    base44.entities.SiteContent.filter({ section: kind }, "key", 500)
      .then((rows) => setContent(Object.fromEntries(rows.map((row) => [row.key, row.value]))))
      .catch(() => {});
  }, [kind]);
  const defaults = isPrivacy ? privacySections : termsSections;
  const sections = defaults.map((section, sectionIndex) => ({
    title: content[`${kind}.${sectionIndex}.title`] || section.title,
    body: section.body.map((paragraph, paragraphIndex) => content[`${kind}.${sectionIndex}.body.${paragraphIndex}`] || paragraph),
  }));
  const title = isPrivacy ? "Privacy Policy" : "Terms and Conditions";
  const intro = isPrivacy
    ? "This Privacy Policy explains how Abrielex Business Consultancy collects, uses and protects your information when you use this website or submit an enquiry."
    : "These Terms and Conditions govern your use of the Abrielex Business Consultancy website and any enquiry you submit to us.";

  return (
    <>
      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-4xl px-6 py-16 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-primary" />
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">Legal</span>
            <span className="h-px w-8 bg-primary" />
          </div>
          <h1 className="font-serif-display text-4xl font-bold sm:text-5xl">{title}</h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground">{intro}</p>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-3xl px-6 py-16">
          <p className="mb-10 text-sm font-medium text-muted-foreground">
            Last updated: {new Date().toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" })}
          </p>
          <div className="space-y-10">
            {sections.map((s) => (
              <div key={s.title}>
                <h2 className="mb-3 font-serif-display text-xl font-semibold text-foreground">{s.title}</h2>
                <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
                  {s.body.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection title="Questions about our legal terms?" description="Contact us and we'll be happy to help with any questions about our Privacy Policy or Terms." />
    </>
  );
}