import { CartItem, ProductsResponse } from "../../types";
import Pagination from "../Pagination";
import ProductsList from "../ProductsList";

type ProductsProps = {
  data: ProductsResponse | null;
  isLoading: boolean;
  onButtonClick: (nextPage: number) => void;
  cart: CartItem[];
  setCart: (newCart: CartItem[]) => void;
};

const Products: React.FC<ProductsProps> = ({
  data,
  isLoading,
  onButtonClick,
  cart,
  setCart,
}) => {
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!data) {
    return <p>It looks like it's something wrong with the products data :(</p>;
  }

  const { results, count, page } = data;

  return (
    <div className="container">
      <ProductsList products={results} cart={cart} setCart={setCart} />
      <Pagination
        page={page}
        totalCount={count}
        currentCount={results.length}
        onButtonClick={onButtonClick}
      />
    </div>
  );
};

export default Products;
