import React, { Suspense } from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar/navbar";
const HomePage = React.lazy(() => import("./pages/home-page"));
const ProductPage = React.lazy(() => import("./pages/product-page"));
const ProductDetailsPage = React.lazy(() =>
  import("./pages/product-details-page")
);
const AboutPage = React.lazy(() => import("./pages/about-page"));
const NotFound = React.lazy(() => import("./pages/not-found"));
const PrivateRoutes = React.lazy(() => import("./pages/private-routes"));
const Account = React.lazy(() => import("./pages/account"));
const CartPage = React.lazy(() => import("./pages/cart-page"));

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Suspense fallback={<p> Loading...</p>}>
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/product" element={<ProductPage />} />
            <Route path="/product/:id" element={<ProductDetailsPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route element={<PrivateRoutes />}>
              <Route path="/account" element={<Account />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
    </Provider>
  );
};
export default App;
