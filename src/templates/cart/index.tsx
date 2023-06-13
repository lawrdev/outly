import { useState, useEffect } from "react";
import {
  CartItemList,
  CartPageYouMayAlsoLike,
  OrderSummary,
} from "@/components/CartPage/organisms";
import { CategoryHero } from "@/components/Category/organisms";
import { Container, PageWrapper } from "@/components/General/atoms";
import { Footer, Header } from "@/components/General/organisms";
import { Box, HStack } from "@chakra-ui/react";
import { ItemProp, LocalStorageItemProp, SearchCategoriesTypes } from "@/utils";
import { useRecoilState } from "recoil";
import { cartAtom } from "@/recoil";
import { getMultipleItems } from "@/functions/firebase/item";
import { useQuery } from "@tanstack/react-query";
import { calDiscount, removeItemFromCart } from "@/functions";

export function CartTemplate() {
  const [subTotal, setSubTotal] = useState(0);
  const [cartItems, setCartItems] = useState<ItemProp[]>([]);

  const [cartAtomValue, setCartAtomValue] = useRecoilState(cartAtom);

  const fetchItems = useQuery(
    ["get_cart_items"],
    () => {
      if (cartAtomValue && cartAtomValue.length > 0) {
        return getMultipleItems(cartAtomValue.map((item) => item.id));
      }
      return;
    },
    {
      enabled: !!(cartAtomValue.length > 0),
      onSuccess: (data) => {
        // console.log("we haveeeeeeee", data);
        if (data) setCartItems(data);
      },
    }
  );

  useEffect(() => {
    const calcTotal = (): number => {
      if (cartAtomValue.length === 0) return 0;

      if (fetchItems.data && fetchItems.data?.length > 0) {
        const total = [...fetchItems.data].reduce((acc, curr) => {
          let quantity = 1;
          const findQunatity = cartAtomValue.filter(
            (item) => item.id === curr?._id
          );
          if (findQunatity.length > 0) {
            quantity = findQunatity[0].quantity;
          }

          let currentPrice = !curr?.discount
            ? curr.price
            : calDiscount(curr.discount, curr.price);

          acc = currentPrice! * quantity + acc;

          return acc;
        }, 0);

        return total;
      } else {
        return 0;
      }
    };
    let tot = calcTotal();

    setSubTotal(tot);
  }, [cartAtomValue, fetchItems.data]);

  const getTotalQuantity = (): number => {
    let total = 0;
    if (cartAtomValue && cartAtomValue.length > 0) {
      let res = [...cartAtomValue].reduce((acc, curr) => {
        acc = acc + curr.quantity;
        return acc;
      }, 0);

      total = res;
    }

    return total;
  };

  const getItemPrice = (itemID: string): number => {
    let itemAvaliable = [...cartAtomValue].find((item) => item.id === itemID);
    let itemPrice = 0;

    if (cartItems && cartItems?.length > 0) {
      let result = [...cartItems].find((item) => item._id === itemID);

      if (result) {
        itemPrice = result.discount
          ? calDiscount(result.discount, result.price)
          : result.price;
      }
    }

    if (itemAvaliable) {
      return itemPrice * itemAvaliable.quantity;
    }
    return 0;
  };

  const getItemFromCartFn = (
    itemID: string
  ): LocalStorageItemProp | undefined => {
    let itemAvaliable = [...cartAtomValue].find((item) => item.id === itemID);

    return itemAvaliable;
  };

  const handleRemoveItem = (itemID: string) => {
    setCartAtomValue(removeItemFromCart(itemID));

    setCartItems((prev) => {
      return prev?.filter((op) => op._id !== itemID);
    });
  };

  return (
    <PageWrapper>
      <header>
        <Header inActive />
      </header>

      <CategoryHero isCart />

      <main>
        <Container>
          <HStack
            mt={12}
            alignItems={"flex-start"}
            flexWrap={"wrap"}
            spacing={"0px"}
          >
            <Box
              flexBasis={{ base: "100%", lg: "60%" }}
              pr={{ base: "0px", lg: "20px" }}
            >
              <CartItemList
                loading={
                  cartAtomValue.length > 0 ? fetchItems.isLoading : false
                }
                items={cartItems}
                getItemPrice={getItemPrice}
                refetch={fetchItems.refetch}
                removeItem={handleRemoveItem}
                itemInCartFn={getItemFromCartFn}
              />
            </Box>

            <Box
              flexBasis={{ base: "100%", lg: "40%" }}
              pl={{ base: "0px", lg: "20px" }}
            >
              <OrderSummary show={cartItems.length > 0} subTotal={subTotal} />
            </Box>
          </HStack>

          {cartItems && cartItems.length > 0 ? (
            <Box my={"52px"} width={{ base: "100%", xl: "60%" }}>
              <CartPageYouMayAlsoLike
                categories={[...cartItems].reduce((acc, curr) => {
                  acc = [...acc, ...curr.category];

                  return acc;
                }, [] as SearchCategoriesTypes[])}
                idArray={cartItems.map((item) => item._id)}
              />
            </Box>
          ) : null}
        </Container>
      </main>

      <Footer />
    </PageWrapper>
  );
}
