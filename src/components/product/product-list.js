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
          gap: "30px",
          flexWrap: "wrap",
          justifyContent: "center",
          maxWidth: "1200px",
          margin: "50px auto",
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
    <Box
      sx={{
        display: "flex",
        gap: "30px",
        margin: "50px auto",
        maxWidth: "1200px",
      }}
    >
      {renderListCard()}
    </Box>
  );
};
export default ProductList;
