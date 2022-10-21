import axios from "axios";
import React, { useState, useEffect } from "react";
import ProductCard from "./product-card";
import Box from "@mui/material/Box";

const ProductList = () => {
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

  function renderListCard() {
    return products.map((product) => (
      <ProductCard key={product.id} product={product}></ProductCard>
    ));
  }

  return (
    <Box sx={{ display: "flex", padding: "50px", gap: "30px" }}>{renderListCard()}</Box>
  );
};
export default ProductList;
