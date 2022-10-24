import { useSelector } from "react-redux";
import Cart from "../components/product/cart";
const CartPage = () => {
  const { cart } = useSelector((state) => state.product);
  return <Cart cart={cart} />;
};
export default CartPage;
