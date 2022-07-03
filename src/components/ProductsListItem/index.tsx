import { useState } from "react";
import { Product } from "../../types";
import Button from "../Button";

type Quantity = {
  value: number;
  setValue: (newValue: number) => void;
};

const AddQuantity = ({ value, setValue }: Quantity) => {
  return (
    <div className="flex">
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

const ProductsListItem = ({
  name,
  brandName,
  imageUrl,
  recommendedRetailPrice,
  recommendedRetailPriceCurrency,
}: Product) => {
  const [value, setValue] = useState(1);

  return (
    <li className="flex flex-col w-60 shadow-lg rounded-xl p-4">
      <img src={imageUrl} alt={`Image of ${name}`} />

      <div className="my-4">
        <h1 className="text-lg font-semibold text-gray-900">{name}</h1>
        <h4 className="text-gray-400">{brandName}</h4>
      </div>

      <div className="mt-auto">
        <p className="mb-2 font-bold">{`${recommendedRetailPrice} ${recommendedRetailPriceCurrency}`}</p>
        <AddQuantity value={value} setValue={setValue} />
      </div>
    </li>
  );
};

export default ProductsListItem;
