import Cart from "../components/product/cart";
import { useSelector } from "react-redux";
const CartPage = () => {
  const { cart } = useSelector((state) => state.product);
  return <Cart cart={cart} />;
};

export default CartPage;
