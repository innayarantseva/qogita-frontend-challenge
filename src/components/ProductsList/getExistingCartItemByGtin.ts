import { CartItem } from "../../types";

export type ExistingCartItem =
  | {
      index: number;
      quantity: number;
    }
  | undefined;

export const getExistingCartItemByGtin = (
  cart: CartItem[],
  productGtin: string
) => {
  const cartItemIndex = cart.findIndex(({ gtin }) => gtin === productGtin);

  if (cartItemIndex < 0) {
    return;
  }

  return { index: cartItemIndex, quantity: cart[cartItemIndex].quantity };
};
