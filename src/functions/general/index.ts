import { UserLocationProp } from "@/utils";

export const getUserLocationInfo = async () => {
  let user: UserLocationProp = {
    state: "Lagos",
    country: "Nigeria",
    currency: "NGN",
    countryCode: "NG",
  };
  await fetch("http://ip-api.com/json/")
    .then((response) => response.json())
    .then((data) => {
      user = {
        ...user,
        state: data.regionName,
        country: data.country,
        currency: data.currency,
        countryCode: data.countryCode,
      };
    });
  return user;
};
