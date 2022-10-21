import { useState, useEffect } from "react";
import axios from "axios";
const useProduct = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const url = "http://localhost:3004/products";
      try {
        const res = await axios.get(url);
        if (res && res.data) {
          setProducts(res.data);
        }
      } catch (error) {
        console.warn(error);
      }
    }
    fetchData();
  }, []);

  return products;
};

export default useProduct;
