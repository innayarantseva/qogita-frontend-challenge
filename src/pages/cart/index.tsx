import { useCallback, useEffect, useState } from "react";
import CartListItem from "../../components/CartItem";
import EmptyCart from "../../components/EmptyCart";
import Heading from "../../components/Heading";
import Layout from "../../components/Layout";
import { updateCart } from "../../components/ProductsList";
import {
  ExistingCartItem,
  getExistingCartItemByGtin,
} from "../../components/ProductsList/getExistingCartItemByGtin";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { CartItem, Product } from "../../types";

type Item = {
  gtin: string;
  item: Product | undefined;
  quantity: number;
};

const CartPage = () => {
  const [cart, setCart] = useLocalStorage<CartItem[]>("cart", []);
  const [items, setItems] = useState<Item[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const addToCart = useCallback(
    (gtin: string, existingCartItem: ExistingCartItem) =>
      updateCart(cart, setCart, gtin, existingCartItem),
    [cart, setCart]
  );

  useEffect(() => {
    const cartItemsPromises = cart.map(({ gtin, quantity }) => {
      return fetch(`/api/products/${gtin}`)
        .then((res) => res.json())
        .then((item: Product) => {
          return {
            gtin,
            quantity,
            item,
          };
        });
    });

    Promise.all(cartItemsPromises).then((fetchedItems) => {
      setItems(fetchedItems);

      // price calculation is super-simplified, it doesn't check for currency, for example
      setTotalPrice(
        fetchedItems.reduce(
          (acc, { quantity, item: { recommendedRetailPrice } }) =>
            (acc += quantity * recommendedRetailPrice),
          0
        )
      );
    });
  }, [cart, setItems]);

  return (
    <Layout>
      <Heading text="Your Cart" />

      {cart.length > 0 ? (
        <div className="flex">
          <ul className="flex flex-col gap-8 py-8 pr-8">
            {items ? (
              items.map((item) => (
                <CartListItem
                  key={`cart-item-${item.gtin}`}
                  {...item}
                  addToCart={addToCart(
                    item.gtin,
                    getExistingCartItemByGtin(cart, item.gtin)
                  )}
                />
              ))
            ) : (
              <div>Something went wrong...</div>
            )}
          </ul>

          <div className="w-1/3 font-semibold">{`Total price: ${totalPrice.toFixed(
            2
          )}`}</div>
        </div>
      ) : (
        <EmptyCart />
      )}
    </Layout>
  );
};

export default CartPage;
