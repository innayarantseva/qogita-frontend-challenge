import { Product } from "../../types";
import { AddItemToCart } from "../ProductsList";
import ProductsListItem from "../ProductsListItem";

type CartItemProps = {
  quantity: number;
  addToCart: AddItemToCart;
  item: Product;
};

const CartItem: React.FC<CartItemProps> = ({ quantity, addToCart, item }) => {
  if (!item) {
    return <li>{`There are some problems with getting this product info`}</li>;
  }

  return (
    <ProductsListItem
      {...item}
      amountInCart={quantity}
      addToCart={addToCart}
      vertical={false}
    />
  );
};

export default CartItem;
