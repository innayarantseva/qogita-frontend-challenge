import { useState } from "react";
import { Product } from "../../types";
import Button from "../Button";

type Quantity = {
  value: number;
  setValue: (newValue: number) => void;
};

const AddQuantity = ({ value, setValue }: Quantity) => {
  return (
    <div className="flex mt-auto">
      <input
        type="number"
        min={1}
        value={value}
        onChange={({ target }) => setValue(Number(target.value))}
        className="w-20 border rounded-l-md pl-4"
      />
      <Button
        label="Add to cart"
        disabled={value < 1}
        className="rounded-l-none border-l-0 w-full"
      />
    </div>
  );
};

const ProductItem = (product: Product) => {
  const [value, setValue] = useState(1);

  return (
    <li className="flex flex-col w-60 shadow-lg rounded-xl p-4">
      <img src={product.imageUrl} alt={`Image of ${product.name}`} />
      <h1 className="text-lg font-semibold text-gray-900">{product.name}</h1>
      <h4 className="text-gray-400">{product.brandName}</h4>
      <div>{`${product.recommendedRetailPrice} ${product.recommendedRetailPriceCurrency}`}</div>

      <AddQuantity value={value} setValue={setValue} />
      {/* <Button label="Add to cart" /> */}
    </li>
  );
};

export default ProductItem;
