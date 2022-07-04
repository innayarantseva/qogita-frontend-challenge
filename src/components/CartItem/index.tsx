import { Product } from "../../types";
import ProductsListItem from "../ProductsListItem";

type CartItemProps = {
  quantity: number;
  addToCart: (quantity: number) => void;
  item: Product | undefined;
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
