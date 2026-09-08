import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X, Search, Phone } from "lucide-react";
import Logo from "./Logo";
import CountrySelector from "./CountrySelector";
import { companyInfo, telLink } from "@/lib/siteData";
import { cn } from "@/lib/utils";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/resources", label: "Resources" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  function handleSearch(e) {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/resources?q=${encodeURIComponent(query.trim())}`);
      setSearchOpen(false);
      setMobileOpen(false);
      setQuery("");
    }
  }

  return (
    <header className="sticky top-0 z-40">
      {/* top utility bar */}
      <div className="hidden border-b border-border bg-foreground text-white/90 lg:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-1.5 text-xs">
          <div className="flex items-center gap-5">
            <a href={telLink} className="flex items-center gap-1.5 hover:text-white">
              <Phone className="h-3 w-3" /> {companyInfo.phone}
            </a>
            <a href={`mailto:${companyInfo.email}`} className="hover:text-white">{companyInfo.email}</a>
            <span className="text-white/50">Office No. 116, Lutheran House, Bulawayo</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/get-a-quote" className="font-medium hover:text-white">Get a Quote / Book a Consultation</Link>
            <span className="text-white/30">·</span>
            <Link to="/admin-login" className="font-medium text-white/60 hover:text-white">Staff Login</Link>
          </div>
        </div>
      </div>

      {/* main bar */}
      <div
        className={cn(
          "border-b border-border bg-card/95 backdrop-blur transition-shadow",
          scrolled && "shadow-sm"
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-1.5 sm:px-6">
          <Link to="/" className="flex items-center" aria-label="Abrielex home">
            <Logo className="h-[94px]" />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  cn(
                    "px-3 py-2 text-sm font-medium transition-colors hover:text-primary",
                    isActive ? "text-primary" : "text-foreground/80"
                  )
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSearchOpen((s) => !s)}
              aria-label="Search"
              className="flex h-10 w-10 items-center justify-center rounded-md text-foreground hover:bg-accent"
            >
              <Search className="h-4 w-4" />
            </button>
            <div className="hidden sm:block">
              <CountrySelector />
            </div>
            <Link
              to="/contact"
              className="hidden items-center bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary/90 lg:flex"
            >
              Contact Us
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className="flex h-10 w-10 items-center justify-center rounded-md text-foreground hover:bg-accent lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* search bar */}
        {searchOpen && (
          <div className="border-t border-border bg-card">
            <form onSubmit={handleSearch} className="mx-auto flex max-w-7xl items-center gap-3 px-6 py-3">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search resources, services, guides…"
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
              <button type="submit" className="text-sm font-semibold text-primary">Search</button>
            </form>
          </div>
        )}
      </div>

      {/* mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <div className="absolute right-0 top-0 flex h-full w-80 max-w-[85%] flex-col bg-card shadow-xl">
            <div className="flex items-center justify-between border-b border-border p-4">
              <Logo className="h-16" />
              <button onClick={() => setMobileOpen(false)} aria-label="Close menu" className="rounded-md p-2 hover:bg-accent">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex items-center justify-between border-b border-border p-4">
              <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Country</span>
              <CountrySelector />
            </div>
            <nav className="flex flex-col p-2">
              {navLinks.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.to === "/"}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "rounded-md px-4 py-3 text-sm font-medium hover:bg-accent",
                      isActive ? "text-primary" : "text-foreground"
                    )
                  }
                >
                  {l.label}
                </NavLink>
              ))}
            </nav>
            <div className="mt-auto space-y-2 border-t border-border p-4">
              <Link to="/get-a-quote" onClick={() => setMobileOpen(false)} className="block w-full rounded-md bg-primary px-4 py-3 text-center text-sm font-semibold text-primary-foreground">
                Get a Quote / Book a Consultation
              </Link>
              <Link to="/contact" onClick={() => setMobileOpen(false)} className="block w-full rounded-md border border-border px-4 py-3 text-center text-sm font-semibold text-foreground">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}