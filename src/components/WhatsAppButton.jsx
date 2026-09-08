import React from "react";
import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/siteData";

export default function WhatsAppButton() {
  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Abrielex on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 transition-transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[#25D366]/30"
    >
      <MessageCircle className="h-7 w-7" strokeWidth={1.8} />
    </a>
  );
}