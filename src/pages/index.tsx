import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Products from "../components/Products";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { CartItem, ProductsResponse } from "../types";

const HomePage = () => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState<null | ProductsResponse>(null);
  const [isLoading, setLoading] = useState(false);

  const [cart, setCart] = useLocalStorage<CartItem[]>("cart", []);

  useEffect(() => {
    setLoading(true);

    fetch(`/api/products?page=${page}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, [page]);

  return (
    <Layout>
      <h1>Products</h1>
      <Products
        data={data}
        isLoading={isLoading}
        onButtonClick={setPage}
        cart={cart}
        setCart={setCart}
      />
    </Layout>
  );
};

export default HomePage;
