import { useCallback } from "react";
import { CartItem, Product } from "../../types";
import ProductsListItem from "../ProductsListItem";
import {
  ExistingCartItem,
  getExistingCartItemByGtin,
} from "./getExistingCartItemByGtin";

type ProductsListProps = {
  products: Product[];
  cart: CartItem[];
  setCart: (newCart: CartItem[]) => void;
};

const ProductsList: React.FC<ProductsListProps> = ({
  products,
  cart,
  setCart,
}) => {
  if (products.length === 0) {
    return <p>No products to show 🙅‍♀️</p>;
  }

  const addToCart = useCallback(
    (gtin: string, existingCartItem: ExistingCartItem) => (quantity: number) => {
      const newCart = Array.from(cart);
      const newCartItem = { gtin, quantity };

      if (existingCartItem) {
        if (quantity === 0) {
          newCart.splice(existingCartItem.index, 1);
        } else if (existingCartItem.quantity !== quantity) {
          newCart.splice(existingCartItem.index, 1, newCartItem);
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
        const existingCartItem = getExistingCartItemByGtin(cart, product.gtin);

        return (
          <ProductsListItem
            key={product.gtin}
            amountInCart={existingCartItem?.quantity}
            addToCart={addToCart(product.gtin, existingCartItem)}
            {...product}
          />
        );
      })}
    </ul>
  );
};

export default ProductsList;
