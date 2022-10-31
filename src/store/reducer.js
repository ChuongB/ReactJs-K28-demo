export const actionTypes = {
  GET_PRODUCTS: "GET_PRODUCTS",
  GET_PRODUCT_DETAILS: "GET_PRODUCT_DETAILS",
  ADD_TO_CART: "ADD_TO_CART",
  INCREMENT_CART_ITEM: "INCREMENT_CART_ITEM",
  DECREMENT_CART_ITEM: "DECREMENT_CART_ITEM",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGOUT: "LOGOUT",
  GET_USER: "GET_USER",
  SET_USER: "GET_USER",
};

export const rootReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.LOGIN_SUCCESS: {
      localStorage.setItem("user", JSON.stringify(payload));
      return {
        ...state,
        isLoggedIn: true,
        user: payload,
      };
    }

    case actionTypes.LOGOUT: {
      localStorage.removeItem("user");
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    }
    case actionTypes.SET_USER: {
      localStorage.setItem("user", JSON.stringify(payload));
      return {
        ...state,
        user: payload,
      };
    }
    case actionTypes.GET_PRODUCTS: {
      return {
        ...state,
        products: payload,
      };
    }
    case actionTypes.GET_PRODUCT_DETAILS: {
      return {
        ...state,
        product: payload,
      };
    }
    case actionTypes.ADD_TO_CART: {
      const cart = JSON.parse(JSON.stringify(state.cart));
      const product = cart.find((item) => item.id === payload.id);

      if (!product) {
        cart.push({ ...action.payload, quantity: 1 });
      } else {
        product.quantity++;
      }
      return { ...state, cart };
    }
    case actionTypes.INCREMENT_CART_ITEM: {
      const cart = JSON.parse(JSON.stringify(state.cart));
      const product = cart.find((item) => item.id === payload.id);
      product.quantity++;

      return { ...state, cart };
    }

    case actionTypes.DECREMENT_CART_ITEM: {
      let cart = JSON.parse(JSON.stringify(state.cart));
      const product = cart.find((item) => item.id === payload.id);
      if (product.quantity === 1) {
        cart = cart.filter((item) => item.id !== product.id);
      } else {
        product.quantity--;
      }

      return { ...state, cart };
    }
    default:
      return state;
  }
};
