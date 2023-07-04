import { ItemProp, UserLocationProp } from "@/utils";

export const getUserLocationInfo = () => {
  let user: UserLocationProp = {
    state: "Lagos",
    country: "Nigeria",
    currency: "NGN",
    countryCode: "NG",
  };

  fetch(
    "https://api.geoapify.com/v1/ipinfo?apiKey=3af953e6b2c047bda897bb48d619897d"
  )
    .then((response) => response.json())
    .then((data) => {
      // You can now access the location data in the "data" object
      // console.log("pppp", data);
      user = {
        ...user,
        state: data.city.name,
        currency: data.country.currency,
        countryCode: data.country.iso_code,
      };
    });

  return user;
};

export const calDiscount = (discount: number, price: number): number => {
  const ds = price * (discount / 100);
  const result = price - ds;
  return result;
};

export const calRating = (item: ItemProp): number => {
  let ratings: number[] = [];
  let total: number = 0;
  const data = { ...item };

  data?.reviews?.forEach((option) => {
    if (option.rating) {
      ratings.push(option.rating);
      total = total++;
    }
  });

  const tots = ratings.reduce((acc, curr) => {
    acc = curr + acc;

    return acc;
  }, 0);

  return tots / total;
};

export function generateID(length: number) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

export const getSizeLabel = (size: string): string => {
  if (size === "S") {
    return "small";
  } else if (size === "M") {
    return "medium";
  } else if (size === "L") {
    return "large";
  } else if (size === "XL") {
    return "xLarge";
  } else if (size === "XXL") {
    return "xxLarge";
  } else {
    return "large";
  }
};

export const formatSearchString = (str: string): string => {
  return str
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .map((x) => {
      let newStrArr = x[0].toUpperCase() + x.slice(1);
      return newStrArr;
    })
    .join(" ");
};

export const calcItemRating = (op: ItemProp): ItemProp => {
  const x: ItemProp = op;

  const total = x.reviews?.reduce((acc, curr) => {
    acc = curr.rating ? acc + curr.rating : acc;
    return acc;
  }, 0);

  const rating = total && x.reviews ? total / x.reviews?.length : 5;
  const item: ItemProp = {
    ...x,
    rating,
  };
  return item;
};
