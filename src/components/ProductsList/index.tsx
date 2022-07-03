import { Product } from "../../types";
import ProductsListItem from "../ProductsListItem";

const ProductsList: React.FC<{ products: Product[] }> = ({ products }) => {
  if (products.length === 0) {
    return <p>No products to show 🙅‍♀️</p>;
  }

  return (
    <ul className="flex flex-wrap gap-6 justify-center p-4">
      {products.map((product) => {
        return <ProductsListItem key={product.gtin} {...product} />;
      })}
    </ul>
  );
};

export default ProductsList;
