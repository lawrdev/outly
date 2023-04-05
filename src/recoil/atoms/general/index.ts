import { getUserLocationInfo } from "@/functions";
import { UserLocationProp } from "@/utils";
import { atom } from "recoil";

let value: UserLocationProp = {
  state: "Lagos",
  country: "Nigeria",
  currency: "NGN",
  countryCode: "NG",
};
if (typeof window !== "undefined") {
  async () => {
    value = await getUserLocationInfo();
  };
}

export const userLocationState = atom({
  key: "UserCountryState",
  default: value,
});
