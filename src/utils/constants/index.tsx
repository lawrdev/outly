import dayjs from "dayjs";
import { CiFacebook, CiTwitter, CiInstagram, CiYoutube } from "react-icons/ci";

export const TRANSITION_FAST = "all 0.25s cubic-bezier(0.645,0.045,0.355,1)";

export const maxFreeShipping = 50000;
export const shippingFee = 5000;
export const categoryArray = [
  "All",
  "Accessories",
  "Coats and Jackets",
  "Kids",
  "Mens",
  "Pants & Chinos",
  "Pants & Leggings",
  "Shirts",
  "Shorts",
  "Skirts",
  "Womens",
  "Footwear",
];

// flutterwave public key
export const FLUTTERWAVE_PUBLIC_KEY = `FLWPUBK_TEST-ddf692d57e2af6d8b705005a581932a4-X`;

export const PAYSTACK_PUBLIC_KEY = `pk_test_a84996176637e8951d666483c52bac71fed4764e`;

export const DATE_NOW_WITH_TIME = dayjs().format(`MMM D, YYYY h:mm A`);
export const DATE_NOW = dayjs().format(`MMMM D, YYYY`);

// OWNER DETAILS
export const CONTACT_ADDRESS = "01 Belery Ave, Abuja FCT 900271";

export const CONTACT_PHONE = "+234 905 XXX XXXX";

export const CONTACT_EMAIL = "lawrence.tsx@gmail.com";

export const CONTACT_SOCIALS = [
  {
    label: "Facebook",
    link: "http://www.facebook.com/outly",
    icon: <CiFacebook />,
  },
  {
    label: "Twitter",
    link: "http://twitter.com/lawrdev",
    icon: <CiTwitter />,
  },
  {
    label: "Instagram",
    link: "http://instagram.com/",
    icon: <CiInstagram />,
  },
  { label: "Youtube", link: "http://youtube.com/", icon: <CiYoutube /> },
];
