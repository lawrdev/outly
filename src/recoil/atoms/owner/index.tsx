import { atom } from "recoil";
import { CiFacebook, CiTwitter, CiInstagram, CiYoutube } from "react-icons/ci";

export const OwnerAtom = atom({
  key: "owner_atom",
  default: {
    socials: [
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
    ],
  },
});
