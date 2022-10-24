import Box from "@mui/material/Box";
import React from "react";
import ProductCard from "./product-card";
const ProductList = ({ products, ...props }) => {
  function renderListCard() {
    return products.map((product) => (
      <ProductCard key={product.id} product={product}></ProductCard>
    ));
  }

  return (
    products && (
      <Box sx={{ display: "flex", padding: "50px", gap: "30px" }}>
        {renderListCard()}
      </Box>
    )
  );
};
export default ProductList;
