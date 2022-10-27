import React, { Suspense, useReducer } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Navbar from "./components/navbar/navbar";
import { rootReducer } from "./store/reducer";
const HomePage = React.lazy(() => import("./pages/home-page"));
const ProductPage = React.lazy(() => import("./pages/product-page"));
const ProductDetailsPage = React.lazy(() =>
  import("./pages/product-details-page")
);
const NotFound = React.lazy(() => import("./pages/not-found"));
const PrivateRoutes = React.lazy(() => import("./pages/private-routes"));
const Account = React.lazy(() => import("./pages/account"));
const CartPage = React.lazy(() => import("./pages/cart-page"));
const LoginPage = React.lazy(() => import("./pages/login-page"));
const SignupPage = React.lazy(() => import("./pages/signup-page"));

const initialState = {
  products: [],
  product: null,
  cart: [],
};

export const AppContext = React.createContext();

const App = () => {
  const [state, dispatch] = useReducer(rootReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <Router>
        <Navbar />
        <Suspense fallback={<p> Loading...</p>}>
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/product" element={<ProductPage />} />
            <Route path="/product/:id" element={<ProductDetailsPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route element={<PrivateRoutes />}>
              <Route path="/account" element={<Account />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
      <ToastContainer />
    </AppContext.Provider>
  );
};
export default App;
