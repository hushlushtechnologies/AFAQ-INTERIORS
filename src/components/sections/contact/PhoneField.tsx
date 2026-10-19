"use client";
import { useEffect, useRef, useState } from "react";
import { AsYouType, getCountries, getCountryCallingCode, isValidPhoneNumber, type CountryCode } from "libphonenumber-js";
import { cn } from "@/lib/utils";

// Gulf + India first, then every other country A–Z
const PRIORITY: CountryCode[] = ["AE", "SA", "QA", "KW", "BH", "OM", "IN"];
const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
const nameOf = (c: CountryCode) => regionNames.of(c) ?? c;
const COUNTRIES: CountryCode[] = [
  ...PRIORITY,
  ...getCountries()
    .filter((c) => !PRIORITY.includes(c))
    .sort((a, b) => nameOf(a).localeCompare(nameOf(b))),
];

const isCountry = (c?: string): c is CountryCode => !!c && (COUNTRIES as string[]).includes(c);

type Props = {
  defaultCountry?: string;
  defaultValue?: string;
  serverError?: string;
  inputClassName: string;
};

export function PhoneField({ defaultCountry, defaultValue, serverError, inputClassName }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const initialCountry: CountryCode = isCountry(defaultCountry) ? defaultCountry : "AE";
  const [country, setCountry] = useState<CountryCode>(initialCountry);
  const [localError, setLocalError] = useState<string | null>(null);

  // React clears the form after each submit; keep the visible country code in sync
  useEffect(() => {
    const form = wrapRef.current?.closest("form");
    if (!form) return;
    const onReset = () => {
      setCountry(initialCountry);
      setLocalError(null);
    };
    form.addEventListener("reset", onReset);
    return () => form.removeEventListener("reset", onReset);
  }, [initialCountry]);

  const error = localError ?? serverError;
  const errorId = "cf-phone-error";

  return (
    <div ref={wrapRef}>
      <div className="flex items-stretch">
        {/* Country code: a real <select>, invisible, over a neat "AE +971" label */}
        <div className="relative flex shrink-0 items-center border-r border-terracotta/30 pl-2.5 pr-9 focus-within:bg-white/50">
          <span aria-hidden className="text-base text-ink md:text-lg">
            <span className="mr-1.5 text-xs font-medium text-ink/50">{country}</span>+{getCountryCallingCode(country)}
          </span>
          <svg
            aria-hidden
            viewBox="0 0 24 24"
            className="pointer-events-none absolute right-2.5 top-1/2 size-4 -translate-y-1/2 fill-none stroke-ink/60 stroke-[1.5]"
          >
            <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <label htmlFor="cf-phone-country" className="sr-only">Country code</label>
          <select
            id="cf-phone-country"
            name="phoneCountry"
            defaultValue={initialCountry}
            onChange={(e) => {
              setCountry(e.target.value as CountryCode);
              setLocalError(null);
            }}
            className="absolute inset-0 cursor-pointer opacity-0"
          >
            {COUNTRIES.map((c) => (
              <option key={c} value={c}>
                {nameOf(c)} (+{getCountryCallingCode(c)})
              </option>
            ))}
          </select>
        </div>

        <label htmlFor="cf-phone" className="sr-only">Phone number</label>
        <input
          id="cf-phone"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          required
          placeholder="Phone Number"
          defaultValue={defaultValue}
          onChange={() => localError && setLocalError(null)}
          onBlur={(e) => {
            const raw = e.target.value.trim();
            if (!raw) return setLocalError(null);
            // Tidy into the local format and give instant feedback
            e.target.value = new AsYouType(country).input(raw);
            setLocalError(isValidPhoneNumber(raw, country) ? null : `Please check this ${nameOf(country)} number.`);
          }}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={cn(inputClassName, "min-w-0 flex-1")}
        />
      </div>

      {error && (
        <p id={errorId} className="px-2.5 pb-3 text-sm text-accent">
          {error}
        </p>
      )}
    </div>
  );
}