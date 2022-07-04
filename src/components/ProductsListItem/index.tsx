import { useState } from "react";
import { Product } from "../../types";
import AddQuantity from "./AddQuantity";

type ProductsListItemProps = Product & {
  amountInCart?: number;
  addToCart: (quantity: number) => void;
};

const ProductsListItem: React.FC<ProductsListItemProps> = ({
  name,
  brandName,
  imageUrl,
  recommendedRetailPrice,
  recommendedRetailPriceCurrency,
  amountInCart,
  addToCart,
}) => {
  const [value, setValue] = useState(amountInCart || 1);

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
          isAdded={Boolean(amountInCart)}
          addToCart={addToCart}
        />
      </div>
    </li>
  );
};

export default ProductsListItem;
