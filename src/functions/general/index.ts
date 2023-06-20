import { ItemProp, UserLocationProp } from "@/utils";

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
