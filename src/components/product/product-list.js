import Box from "@mui/material/Box";
import React from "react";
import useProduct from "../../hooks/useProduct";
import ProductCard from "./product-card";
import CardSkeleton from "./cardSkeleton";
const ProductList = () => {
  const { data: products, loading } = useProduct();

  function renderListCard() {
    return (
      products &&
      products.map((product) => (
        <ProductCard key={product.id} product={product}></ProductCard>
      ))
    );
  }

  function renderLoading() {
    return (
      <Box
        sx={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          justifyContent: "center",
          marginTop: "50px",
        }}
      >
        {[...Array.from(Array(10))].map((item) => {
          return <CardSkeleton key={item} />;
        })}
      </Box>
    );
  }

  return loading ? (
    renderLoading()
  ) : (
    <Box sx={{ display: "flex", padding: "50px", gap: "30px" }}>
      {renderListCard()}
    </Box>
  );
};
export default ProductList;
