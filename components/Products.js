import { React, useEffect, useRef, useState, useContext } from 'react';
import { Card, Button,  Flex, Modal, Checkbox } from 'antd'
const { Meta } = Card;
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import ShoppingCartContext from './contexts/ShoppingCartContext'
import Image from 'next/image';

export default function Products({products, prices}) {
  const [loading, setLoading] = useState(true);
  const [dataLoaded, setDataLoaded] = useState(false)
  const [open, setOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState(products[0])
  const [activeToppings, setActiveToppings] = useState([])
  const [activeQuantities, setActiveQuantities] = useState({})
  const [toppingsById, setToppingsById] = useState({})
  const {cartItems, addToCart, removeFromCart, clearCart} = useContext(ShoppingCartContext)

  const showModal = (product) => {
    setActiveProduct(product)
    setOpen(true);
  };

  const handleAddToCart = (product, quantity) => {
      var lineItem = {
        price: product.default_price,
        quantity: quantity
      }
      console.log(lineItem)
      addToCart(lineItem, quantity, prices[product.default_price])
  };

  const handleCancel = () => {
    setActiveToppings([])
    setOpen(false);
  };

  const updateQuantity =(isAdd, productId) => {

    console.log(productId)
    console.log(activeQuantities[productId])
    if(isAdd){
      var quanitites = {...activeQuantities};
      quanitites[productId] += 1
      setActiveQuantities( quanitites)
    }else {
      var quanitites = {...activeQuantities};
      quanitites[productId] -= 1
      setActiveQuantities( quanitites)
    }
  }

  useEffect(() => {
    var quanitites = {}
    for(let i =0; i < products.length; i++){
      quanitites[products[i].id] = 1
    }

    setActiveQuantities(quanitites)
    setLoading(false)
  }, []);
  
  return ( 
    <>
    <Flex vertical={false} wrap="wrap" gap="small" justify="center">    
      {
      products.map((product) => {
        return ((product != null) &&
            
            <Card cover={<img alt="example" src={product.images[0]} />} hoverable className='product-card' key={product.id} loading={loading}>
            <Card.Grid hoverable={false}  style={{width: '80%', boxShadow: 'none'}}>
              <Meta title={product.name} description={product.description}/>                
            </Card.Grid>
            <Card.Grid  hoverable={false}  style={{width: '20%', boxShadow: 'none'}}>
              
            <p className='product-price'>${prices[product.default_price] / 100 }</p>
            </Card.Grid>
            <Card.Grid hoverable={false}  style={{width: '100%', boxShadow: 'none'}}> 
              <Flex vertical={false} justify='space-between' align='center'>
              <div>
                <Button disabled={activeQuantities[product.id] == 1} size='small' shape="circle" onClick={()=> {updateQuantity(0, product.id)}}><MinusOutlined /></Button>
                  <span className='quantity'>{activeQuantities[product.id]}</span>
                <Button size="small" shape="circle" onClick={()=> {{updateQuantity(1, product.id)}}}><PlusOutlined /></Button> 
              </div>
              
              <Button type='primary' onClick={() => {handleAddToCart(product, activeQuantities[product.id])}}>Add to cart</Button>
                
              </Flex>
            </Card.Grid>
            </Card>
        )
    })
    }
    </Flex>
   
    </>
  )
}

