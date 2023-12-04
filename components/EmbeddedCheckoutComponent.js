import React, { useEffect, useState, useContext } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from '@stripe/react-stripe-js';
import ShoppingCartContext from './contexts/ShoppingCartContext';

const stripePromise = loadStripe("pk_test_51IBM5BG706NbNZFJCcGjm8txPqSny8DWrVquht03ZDHkZdDkV5ThmMPfxniakGUVDH3gjJxVyVNLdSz0YYUXDRLf00rmlNBVnP");

export default function EmbeddedCheckoutComponent() {
  const [clientSecret, setClientSecret] = useState('');
  const {cartItems} = useContext(ShoppingCartContext)
  useEffect(() => {
    console.log(cartItems)
    var baseUrl = 'http://localhost:8888';
    fetch(`${baseUrl}/.netlify/functions/checkoutSessions`, {
      method: "POST",
      body: JSON.stringify({cart: cartItems})
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  return (
    <div id="checkout">
      {clientSecret && (
        <EmbeddedCheckoutProvider
          stripe={stripePromise}
          options={{clientSecret}}
        >
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      )}
    </div>
  )
}