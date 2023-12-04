import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Link from "next/link";

export default function cart() {
  return (
    <>
      <div>cart</div>
      <Link href='/embedded-checkout'>Checkout</Link>
    </>
    
  )
}
