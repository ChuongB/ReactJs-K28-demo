export const actionTypes = {
  GET_PRODUCTS: "GET_PRODUCTS",
  GET_PRODUCT_DETAILS: "GET_PRODUCT_DETAILS",
  ADD_TO_CART: "ADD_TO_CART",
};

export const rootReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
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
    case actionTypes.ADD_TO_CART:
      const cart = JSON.parse(JSON.stringify(state.cart));
      const product = cart.find((item) => item.id === payload.id);

      if (!product) {
        cart.push({ ...action.payload, quantity: 1 });
      } else {
        product.quantity++;
      }
      return { ...state, cart };
    default:
      return state;
  }
};
