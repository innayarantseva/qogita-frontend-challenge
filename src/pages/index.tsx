import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Products from "../components/Products";
import { ProductsResponse } from "../types";

const HomePage = () => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState<null | ProductsResponse>(null);
  const [isLoading, setLoading] = useState(false);

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
      <Products data={data} isLoading={isLoading} onButtonClick={setPage} />
    </Layout>
  );
};

export default HomePage;
