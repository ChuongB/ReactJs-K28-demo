import Cart from "../components/product/cart";
import { useContext } from "react";
import { AppContext } from "../App";
const CartPage = () => {
  const { state } = useContext(AppContext);
  return <Cart cart={state.cart} />;
};

export default CartPage;
