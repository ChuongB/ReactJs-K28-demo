import React, {
  Suspense,
  useReducer,
  useEffect,
  useContext,
  useMemo,
} from "react";
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
import { actionTypes } from "./store/reducer";
const HomePage = React.lazy(() => import("./pages/home-page"));
const ProductPage = React.lazy(() => import("./pages/product-page"));
const ProductDetailsPage = React.lazy(() =>
  import("./pages/product-details-page")
);
const NotFound = React.lazy(() => import("./pages/not-found"));
const PrivateRoutes = React.lazy(() => import("./pages/private-routes"));
const CartPage = React.lazy(() => import("./pages/cart-page"));
const LoginPage = React.lazy(() => import("./pages/login-page"));
const SignupPage = React.lazy(() => import("./pages/signup-page"));
const ProfilePage = React.lazy(() => import("./pages/profile-page"));
const AdminPage = React.lazy(() => import("./pages/admin-page"));
const ProductListManagementPage = React.lazy(() =>
  import("./pages/product-management/product-list")
);
const ProductDetailsManagementPages = React.lazy(() =>
  import("./pages/product-management/product-details")
);

const initialState = {
  products: [],
  product: null,
  cart: [],
  isLoggedIn: false,
  user: null,
};

export const AppContext = React.createContext();
export const useAppContext = () => useContext(AppContext);

const App = () => {
  const [state, dispatch] = useReducer(rootReducer, initialState);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      dispatch({ type: actionTypes.LOGIN_SUCCESS, payload: JSON.parse(user) });
    }
  }, []);

  const contextValue = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);

  return (
    <AppContext.Provider value={contextValue}>
      <Router>
        <Navbar />
        <Suspense fallback={<p> Loading...</p>}>
          <Routes>
            <Route path="/" element={<Navigate to="home" />} />
            <Route path="home" element={<HomePage />} />
            <Route path="product" element={<ProductPage />} />
            <Route path="product/:id" element={<ProductDetailsPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignupPage />} />
            <Route element={<PrivateRoutes />}>
              <Route path="profile" element={<ProfilePage />} />
              <Route path="admin" element={<AdminPage />}>
                <Route path="" element={<Navigate to="products" />} />
                <Route
                  path="products"
                  element={<ProductListManagementPage />}
                />
                <Route
                  path="products/:id"
                  element={<ProductDetailsManagementPages />}
                />
              </Route>
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
