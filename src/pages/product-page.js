import ProductList from "../components/product/product-list";
import { useGetProductsQuery } from "../redux/product/productApi";
const ProductPage = () => {
  const { data: products } = useGetProductsQuery();
  return (
    <div>
      <ProductList products={products} />;
    </div>
  );
};
export default ProductPage;
