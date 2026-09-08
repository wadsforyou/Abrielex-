import React, { createContext, useContext, useState, useMemo } from "react";
import { countries } from "./siteData";

const CountryContext = createContext(null);

const STORAGE_KEY = "abrielex_country";

export function CountryProvider({ children }) {
  const [countryCode, setCountryCode] = useState(() => {
    if (typeof window !== "undefined") {
      return window.localStorage.getItem(STORAGE_KEY) || "ZW";
    }
    return "ZW";
  });
  const [location, setLocation] = useState({ state: "", city: "" });

  const country = useMemo(
    () => countries.find((c) => c.code === countryCode) || countries[0],
    [countryCode]
  );

  const setCountry = (code) => {
    setCountryCode(code);
    setLocation({ state: "", city: "" });
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, code);
    }
  };

  const value = useMemo(
    () => ({
      country,
      countryCode,
      setCountry,
      location,
      setLocation,
      isConfirmed: country.confirmed,
    }),
    [country, countryCode, location]
  );

  return <CountryContext.Provider value={value}>{children}</CountryContext.Provider>;
}

export function useCountry() {
  const ctx = useContext(CountryContext);
  if (!ctx) throw new Error("useCountry must be used within CountryProvider");
  return ctx;
}