import { useState } from "react";
import { Product } from "../../types";
import Button from "../Button";
import { FoundCartItem } from "../ProductsList";

type Quantity = {
  value: number;
  setValue: (newValue: number) => void;
  isAdded?: boolean;
  addToCart: (quantity: number) => void;
};

const AddQuantity = ({ value, setValue, isAdded, addToCart }: Quantity) => {
  return (
    <div className="flex">
      <input
        type="number"
        min={1}
        value={value}
        onChange={({ target }) => {
          if (Number(target.value) >= 1) {
            setValue(Number(target.value));

            // if the product was already added,
            // we are increasing a number of products in cart when changing number in input
            if (isAdded) {
              addToCart(Number(target.value));
            }
          }
        }}
        className={`w-20 border rounded-l-md pl-4 ${
          isAdded ? "border-purple-500 hover:border-purple-600" : ""
        }`}
      />
      <Button
        label={isAdded ? "In Cart" : "Add to cart"}
        disabled={value < 1}
        className={`rounded-l-none border-l-0 w-full ${
          isAdded
            ? "bg-purple-500 border-transparent hover:bg-purple-600 text-white"
            : ""
        }`}
        onClick={() => addToCart(value)}
      />

      {isAdded && (
        <Button label="X" className="ml-2" onClick={() => addToCart(0)} />
      )}
    </div>
  );
};

const ProductsListItem = ({
  name,
  brandName,
  imageUrl,
  recommendedRetailPrice,
  recommendedRetailPriceCurrency,
  currentCartItem,
  addToCart,
}: Product & {
  currentCartItem?: FoundCartItem;
  addToCart: (quantity: number) => void;
}) => {
  const [value, setValue] = useState(currentCartItem?.cartItem.quantity || 1);

  return (
    <li className="flex flex-col w-72 shadow-lg rounded-xl p-4">
      <img src={imageUrl} alt={`Image of ${name}`} />

      <div className="my-4">
        <h1 className="text-lg font-semibold text-gray-900">{name}</h1>
        <h4 className="text-gray-400">{brandName}</h4>
      </div>

      <div className="mt-auto">
        <p className="mb-2 font-bold">{`${recommendedRetailPrice} ${recommendedRetailPriceCurrency}`}</p>
        <AddQuantity
          value={value}
          setValue={setValue}
          isAdded={Boolean(currentCartItem)}
          addToCart={addToCart}
        />
      </div>
    </li>
  );
};

export default ProductsListItem;
