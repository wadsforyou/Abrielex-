import React, { createContext, useContext, useMemo } from "react";
import { countries } from "./siteData";

// Abrielex is a Zimbabwe-based consultancy. The country is fixed (Zimbabwe)
// and is no longer interactive. This context remains so existing components
// that read `country` keep working without per-component refactors.
const CountryContext = createContext(null);

export function CountryProvider({ children }) {
  const country = useMemo(() => countries[0], []);

  const value = useMemo(
    () => ({
      country,
      countryCode: country.code,
      location: { state: "", city: "" },
      setLocation: () => {},
      isConfirmed: true,
    }),
    [country]
  );

  return <CountryContext.Provider value={value}>{children}</CountryContext.Provider>;
}

export function useCountry() {
  const ctx = useContext(CountryContext);
  if (!ctx) throw new Error("useCountry must be used within CountryProvider");
  return ctx;
}