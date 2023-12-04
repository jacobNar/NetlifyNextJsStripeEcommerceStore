import React from 'react';

const ShoppingCartContext = React.createContext({
  cartItems: [],
  orderTotal: 0,
  itemCount: 0,
  orderInfo: {},
  setOrderInfo: () => {},
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  updateLineItem: () => {},
  increaseQuantity: () => {},
  decreaseQuantity: () => {},
  setCart: () => {}
});

export default ShoppingCartContext