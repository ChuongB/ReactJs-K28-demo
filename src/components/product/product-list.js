import Box from "@mui/material/Box";
import React from "react";
import useProduct from "../../hooks/useProduct";
import ProductCard from "./product-card";
const ProductList = () => {
  const products = useProduct();

  function renderListCard() {
    return products.map((product) => (
      <ProductCard key={product.id} product={product}></ProductCard>
    ));
  }

  return (
    <Box sx={{ display: "flex", padding: "50px", gap: "30px" }}>
      {renderListCard()}
    </Box>
  );
};
export default ProductList;
