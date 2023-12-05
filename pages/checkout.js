import {React, useState, useEffect} from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import {LeftOutlined, ShoppingOutlined, CreditCardOutlined , CheckOutlined } from '@ant-design/icons'
import { Steps } from 'antd'
import Link from 'next/link';
import CheckoutForm from "../components/CheckoutForm";

const stripePromise = loadStripe("pk_test_51IBM5BG706NbNZFJCcGjm8txPqSny8DWrVquht03ZDHkZdDkV5ThmMPfxniakGUVDH3gjJxVyVNLdSz0YYUXDRLf00rmlNBVnP");

export default function App() {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    var baseUrl = window.location.host;
    console.log(baseUrl)
    fetch(`${baseUrl}/.netlify/functions/createPaymentIntent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
    }).then((res) => res.json())
    .then((data) => setClientSecret(data.clientSecret));
    
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <main className="width-container">
    <section className="checkout-section">
        <div>
        <br></br>
        
        <Link href='/cart'><LeftOutlined style={{fontSize: '1.5em', color: 'black'}} /></Link>
        <h1>Checkout</h1>
        <Steps className='steps'
            current={1}
            items={[
            {
                title: 'Review cart',
                icon: <ShoppingOutlined/>,
                status: 'finish'
            },
            {
                title: 'Checkout',
                icon: <CreditCardOutlined />,
                status: 'process',
            },
            {
                title: 'Order Confirmation',
                icon: <CheckOutlined />
            },
            ]}
        />
        
        </div>
    </section>
    <section>
        {clientSecret && (
            <Elements options={options} stripe={stripePromise}>
            <CheckoutForm />
            </Elements>
        )}
    </section>
      
    </main>
  );
}