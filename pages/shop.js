import React from 'react'
import Products from '../components/Products';
import Header from '../components/Header';

// export async function getStaticProps() {
//     // Fetch data for the dynamic route using the params object
//     // var baseUrl = 'http://localhost:8888';
//     var baseUrl = 'https://ecomtemplate1.netlify.app'
//     const products = await fetch(`${baseUrl}/.netlify/functions/getProducts`)
//     const prices = await fetch(`${baseUrl}/.netlify/functions/getPrices`);

//     var productsData = await products.json();
//     var pricesData = await prices.json()

//     var pricesDict = {}

//     for (let i = 0; i < pricesData.length; i++){
//         pricesDict[pricesData[i].id] = pricesData[i].unit_amount
//     }
    

//     return {
//       props: {
//         products: productsData,
//         prices: pricesDict
//       },
//     }
//   }

export default function Shop() {
  return (
    <>
    {/* <Header style={1} />
    <main className='width-container'>
        <h1>Shop</h1>
        <Products products={products} prices={prices} />
    </main> */}
    </>
    
  )
}
