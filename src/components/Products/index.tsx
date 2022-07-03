import { ProductsResponse } from "../../types";
import Button from "../Button";
import ProductItem from "../Product";

type Props = {
  data: ProductsResponse | null;
  isLoading: boolean;
  onButtonClick: (page: number) => void;
};

const Products = ({ data, isLoading, onButtonClick }: Props) => {
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!data) {
    return <p>It looks like something wrong with the products :(</p>;
  }

  const { results, count, page } = data;

  const isFirstPage = page === 1;
  const isLastPage = count / 20 <= page;

  return (
    <section className="container">
      {results.length > 0 ? (
        <ul className="flex flex-wrap gap-6 justify-center p-4">
          {results.map((product) => {
            return <ProductItem key={product.gtin} {...product} />;
          })}
        </ul>
      ) : (
        <p>No products :(</p>
      )}

      <footer className="flex justify-between content-center border-t pt-4">
        <p>{`Showing ${20 * (page - 1) + 1} to ${
          20 * (page - 1) + results.length
        } of ${count} results`}</p>

        <div>
          <Button
            label="Previous"
            disabled={isFirstPage}
            onClick={() => onButtonClick(page - 1)}
          />
          <Button
            label="Next"
            disabled={isLastPage}
            onClick={() => onButtonClick(page + 1)}
          />
        </div>
      </footer>
    </section>
  );
};

export default Products;
