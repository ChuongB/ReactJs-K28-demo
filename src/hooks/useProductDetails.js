import axios from "axios";
import React, { useState, useEffect } from "react";

const useProductDetails = (id) => {
  const [product, setProduct] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const url = `http://localhost:3004/products/${id}`;
      try {
        const res = await axios.get(url);
        if (res && res.data) {
          setProduct(res.data);
        }
      } catch (error) {
        console.warn(error);
      }
    }
    fetchData();
  }, []);

  return product;
};

export default useProductDetails;
