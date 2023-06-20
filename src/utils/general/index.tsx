import { useEffect, useState } from "react";
import { getUserLocationInfo } from "@/functions";
import { UserLocationProp } from "../types";

export const FormatPrice = ({ price }: { price: number }) => {
  const [userCountry, setUserCountry] = useState<UserLocationProp>({
    state: "Lagos",
    country: "Nigeria",
    currency: "NGN",
    countryCode: "NG",
  });

  const CURRENCY_FORMATTER = Intl.NumberFormat(
    `en-${userCountry.countryCode || "US"}`,
    {
      style: "currency",
      currency: userCountry.currency || "USD",
      minimumFractionDigits: 0,
    }
  );

  useEffect(() => {
    async () => {
      const loc = await getUserLocationInfo();
      setUserCountry(loc);
    };
  }, []);

  return (
    <span style={{ fontWeight: "inherit", fontSize: "inherit" }}>
      {CURRENCY_FORMATTER.format(price)}
    </span>
  );
};

export const currencyFormatter = (price: number): string => {
  const CURRENCY_FORMATTER = Intl.NumberFormat(`en-NG`, {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  });

  return `${CURRENCY_FORMATTER.format(price)}`;
};
