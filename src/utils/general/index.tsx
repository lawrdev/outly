export const getCart = () => {
  if (typeof localStorage !== "undefined") {
    const savedValue = localStorage.getItem("cart");

    if (savedValue != null) return JSON.parse(savedValue);

    return { quantity: 0, items: [] };
  }
};

const CURRENCY_FORMATTER = Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  minimumFractionDigits: 0,
});
export function formatPrice(number: number) {
  return CURRENCY_FORMATTER.format(number);
}
