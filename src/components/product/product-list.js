import Box from "@mui/material/Box";
import React from "react";
import ProductCard from "./product-card";
import { useGetProductsQuery } from "../../redux/product/api";
import { useSelector } from "react-redux";
const ProductList = () => {
  useGetProductsQuery();
  const { products } = useSelector((state) => state.product);
  function renderListCard() {
    return (
      products &&
      products.map((product) => (
        <ProductCard key={product.id} product={product}></ProductCard>
      ))
    );
  }

  return (
    <Box sx={{ display: "flex", padding: "50px", gap: "30px" }}>
      {renderListCard()}
    </Box>
  );
};
export default ProductList;
