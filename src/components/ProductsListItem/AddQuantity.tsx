import Button from "../Button";
import { useCallback } from "react";

type AddQuantityProps = {
  value: number;
  setValue: (newValue: number) => void;
  isAdded?: boolean;
  addToCart: (quantity: number) => void;
};

const AddQuantity: React.FC<AddQuantityProps> = ({
  value,
  setValue,
  isAdded,
  addToCart,
}) => {
  const onInputChange = useCallback(
    ({ target }) => {
      const quantity = Number(target.value);

      if (quantity >= 1) {
        setValue(quantity);

        // if the product was already added,
        // we increase a number of products in cart when changing number in input
        if (isAdded) {
          addToCart(quantity);
        }
      }
    },
    [setValue, isAdded, addToCart]
  );

  const onAddToCartClick = useCallback(
    () => addToCart(value),
    [addToCart, value]
  );
  const onRemoveFromCartClick = useCallback(() => {
    addToCart(0);
    setValue(1);
  }, [addToCart, setValue]);

  return (
    <div className="flex w-64">
      <input
        type="number"
        min={1}
        value={value}
        onChange={onInputChange}
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
        onClick={onAddToCartClick}
      />

      {isAdded && (
        <Button label="X" className="ml-2" onClick={onRemoveFromCartClick} />
      )}
    </div>
  );
};

export default AddQuantity;
