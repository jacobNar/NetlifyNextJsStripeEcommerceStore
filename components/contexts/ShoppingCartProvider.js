import React, { useState } from 'react';
import ShoppingCartContext from './ShoppingCartContext';

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [orderTotal, setOrderTotal] = useState(0);
  const [itemCount, setItemCount] = useState(0);
  const [orderInfo, setOrderInfo] = useState({customerName: '', orderId: ''})

  const addToCart = (item, quantity, price) => {
    console.log(item)
    setCartItems([...cartItems, item]);
    setOrderTotal(orderTotal + (price * quantity))
    setItemCount(itemCount + quantity)
    // document.cookie = `cart=${JSON.stringify(cartItems)};`
  };

  const removeFromCart = (index) => {
    let tempCart = [...cartItems]
    tempCart.splice(index, 1)
    setCartItems(tempCart);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const increaseQuantity = (index) => {
    let tempCart = [...cartItems]
    tempCart[index].quantitySold += 1;
    setCartItems(tempCart);
    setItemCount(itemCount + 1)
    setOrderTotal(orderTotal + tempCart[index].priceWithModifiers)
  }

  const decreaseQuantity = (index) => {
    
    if(cartItems[index].quantitySold == 1){
      removeFromCart(index)
    }else {
      let tempCart = [...cartItems]
      tempCart[index].quantitySold -= 1;
      setCartItems(tempCart);
    }
    setItemCount(itemCount - 1)
    setOrderTotal(orderTotal - tempCart[index].priceWithModifiers)
  }

  const setCart = function(cart )  {
    console.log("set cart")
    setCartItems(cart);
  }

  return (
    <ShoppingCartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity, setCart, orderTotal, itemCount, orderInfo, setOrderInfo }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};

export default CartProvider;