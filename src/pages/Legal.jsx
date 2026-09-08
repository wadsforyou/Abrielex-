import React from "react";
import SectionHeading from "@/components/SectionHeading";
import { companyInfo } from "@/lib/siteData";

export default function Legal({ kind = "privacy" }) {
  const isPrivacy = kind === "privacy";
  return (
    <>
      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-4xl px-6 py-16 text-center">
          <h1 className="font-serif-display text-4xl font-bold sm:text-5xl">
            {isPrivacy ? "Privacy Policy" : "Terms of Service"}
          </h1>
        </div>
      </section>
      <section className="border-b border-border">
        <div className="mx-auto max-w-3xl px-6 py-16">
          <div className="prose prose-sm max-w-none text-muted-foreground">
            <p className="text-sm">Last updated: {new Date().toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" })}</p>
            {isPrivacy ? (
              <div className="mt-6 space-y-4 text-sm leading-relaxed">
                <p>{companyInfo.name} respects your privacy. This policy explains how we collect, use and protect information you provide through this website.</p>
                <h3 className="font-serif-display text-lg font-semibold text-foreground">Information we collect</h3>
                <p>We collect information you submit through our forms — such as your name, email, phone, location and the details of your enquiry — solely to respond to and deliver our services.</p>
                <h3 className="font-serif-display text-lg font-semibold text-foreground">How we use it</h3>
                <p>We use your information to process quote requests, consultation bookings and contact enquiries, and to communicate with you about our services.</p>
                <h3 className="font-serif-display text-lg font-semibold text-foreground">Your rights</h3>
                <p>You may request access to, correction of, or deletion of your personal information by contacting us at {companyInfo.email}.</p>
                <p className="text-xs">This is a standard privacy policy placeholder. It can be expanded and customised through the admin dashboard.</p>
              </div>
            ) : (
              <div className="mt-6 space-y-4 text-sm leading-relaxed">
                <p>By using this website and engaging {companyInfo.name}, you agree to these terms of service.</p>
                <h3 className="font-serif-display text-lg font-semibold text-foreground">Services</h3>
                <p>We provide business registration, compliance, tax, financial and general business consultancy services. Service fees and timelines are discussed and agreed with the agency before work commences. We do not process online payments.</p>
                <h3 className="font-serif-display text-lg font-semibold text-foreground">No warranty</h3>
                <p>While we strive for accuracy, regulatory information may change. We recommend confirming current requirements with us before acting. Information for countries other than Zimbabwe may be marked "to be confirmed" pending verification.</p>
                <h3 className="font-serif-display text-lg font-semibold text-foreground">Contact</h3>
                <p>For any questions about these terms, contact us at {companyInfo.email} or {companyInfo.phone}.</p>
                <p className="text-xs">This is a standard terms placeholder. It can be expanded and customised through the admin dashboard.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}