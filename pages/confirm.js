import Head from 'next/head'
import { Steps, Result, Button  } from 'antd'
import { useEffect, useContext } from 'react';
import Link from 'next/link';
import {LeftOutlined, ShoppingOutlined, CreditCardOutlined , CheckOutlined } from '@ant-design/icons'
import ShoppingCartContext from '../components/contexts/ShoppingCartContext'
import { useRouter } from 'next/router';

const Confirm = () => {

  const {orderInfo, cartItems} = useContext(ShoppingCartContext)
  const router = useRouter();

  useEffect(() => {
    console.log(orderInfo)
    if(orderInfo.orderId == ''){
        router.push("/cart")
    }
 
  });

  return (
    <div >
      <Head>
        <title>Confirm - SabaiTea Boba - Elgin based Boba Tea Shop</title>
        <meta name="description" content="Brining the deliciousness of hand crafted boba tea beverages to the Northwest suburubs of Chicago."></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"></meta>
      </Head>

      <main className='width-container'>
        <section className="checkout-section">
          <div >
            <br></br>
            
            <Link href='/cart'><LeftOutlined style={{fontSize: '1.5em', color: 'black'}} /></Link>
            <h1>Confirm</h1>
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
                  status: 'finish',
                },
                {
                  title: 'Order Confirmation',
                  icon: <CheckOutlined />,
                  status: 'finish'
                },
              ]}
          />

        {orderInfo != undefined &&<Result
            status="success"
            title={`Thank you for ordering ${orderInfo.customerName}`}
            subTitle={`Order number: ${orderInfo.orderId}`}
            extra={[
            <Link href='/menu'><Button type="primary" key="order">Order Again</Button></Link>,
            <Link href='/'><Button  key="home">
                Go Home
            </Button></Link>
            ]}
        />}
            
          </div>
        </section>        
      </main>   

    </div>
   
  )

}


export default Confirm;