import { useCallback, useMemo } from "react";
import { CartItem, Product } from "../../types";
import ProductsListItem from "../ProductsListItem";

type Props = {
  products: Product[];
  cart: CartItem[];
  setCart: (newCart: CartItem[]) => void;
};

export type FoundCartItem =
  | {
      index: number;
      cartItem: CartItem;
    }
  | undefined;

const getCartItemByGtin = (cart: CartItem[], productGtin: string) => {
  const cartItemIndex = cart.findIndex((item) => item.gtin === productGtin);

  if (cartItemIndex < 0) {
    return;
  }

  return { index: cartItemIndex, cartItem: cart[cartItemIndex] };
};

const ProductsList: React.FC<Props> = ({ products, cart, setCart }) => {
  if (products.length === 0) {
    return <p>No products to show 🙅‍♀️</p>;
  }

  const addToCart = useCallback(
    (productGtin: string, cartItem: FoundCartItem) => (quantity: number) => {
      const newCart = Array.from(cart);
      const newCartItem = { gtin: productGtin, quantity };

      if (cartItem) {
        if (quantity === 0) {
          newCart.splice(cartItem.index, 1);
        } else if (cartItem.cartItem.quantity !== quantity) {
          newCart.splice(cartItem.index, 1, newCartItem);
        }
      } else {
        newCart.push(newCartItem);
      }

      setCart(newCart);
    },
    [cart]
  );

  return (
    <ul className="flex flex-wrap gap-6 justify-center p-4">
      {products.map((product) => {
        const cartItem = getCartItemByGtin(cart, product.gtin);

        return (
          <ProductsListItem
            key={product.gtin}
            {...product}
            currentCartItem={cartItem}
            addToCart={addToCart(product.gtin, cartItem)}
          />
        );
      })}
    </ul>
  );
};

export default ProductsList;
