import { useCallback, useEffect, useState } from "react";
import CartItemsList, { Item } from "../../components/CartItemsList";
import EmptyCart from "../../components/EmptyCart";
import Heading from "../../components/Heading";
import Layout from "../../components/Layout";
import { updateCart } from "../../components/ProductsList";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { CartItem, Product } from "../../types";

const getPriceStr = (items: Item[]) => {
  if (items.length <= 0) {
    return "0";
  }

  // price calculation is super-simplified; it doesn't check for currency, for example
  const currency = items[0].item.recommendedRetailPriceCurrency;

  const price = items.reduce(
    (acc, { quantity, item: { recommendedRetailPrice } }) =>
      (acc += quantity * recommendedRetailPrice),
    0
  );

  return `Total price: ${price.toFixed(2)} ${currency}`;
};

const CartPage = () => {
  const [cart, setCart] = useLocalStorage<CartItem[]>("cart", []);
  const [items, setItems] = useState<Item[]>([]);
  const [totalPrice, setTotalPrice] = useState("0");

  const addToCart = useCallback(
    (gtin: string) => updateCart(cart, setCart, gtin),
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

      setTotalPrice(getPriceStr(fetchedItems));
    });
  }, [cart, setItems]);

  return (
    <Layout>
      <Heading text="Your Cart" />

      {cart.length > 0 ? (
        <div className="flex">
          <CartItemsList items={items} addToCart={addToCart} />

          <div className="w-1/3 font-semibold">{totalPrice}</div>
        </div>
      ) : (
        <EmptyCart />
      )}
    </Layout>
  );
};

export default CartPage;
