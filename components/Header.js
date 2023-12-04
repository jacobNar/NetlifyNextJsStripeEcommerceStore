import {InstagramOutlined, ShoppingOutlined, MenuOutlined, PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { Drawer, Badge, Popover, Card, Button } from 'antd';
import { useState, useContext } from 'react';
import Link from 'next/link';
import ShoppingCartContext from './contexts/ShoppingCartContext'

export default function Header({ title, style }) {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState('mail');
  const {cartItems, orderTotal, itemCount} = useContext(ShoppingCartContext)

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const content = (
    <>
      {cartItems.length != 0 ? cartItems.map((product) => { return(
        <Card className='product-card header-cart-item' key={product.id}>
              <Card.Grid hoverable={false} style={{width: '50%'}}>
              <img style={{maxWidth: '100%'}} alt="example" src="/images/products/boba-tea-no-bg.png" />
              </Card.Grid>
              <Card.Grid hoverable={false} style={{width: '50%'}}>
                  <p>{product.name}</p>
                  {/* <p>${(product.priceWithModifiers * product.quantitySold / 100 ).toFixed(2)}</p> */}
                  <Button size='small'><MinusOutlined /></Button><span className='quantity'></span><Button size='small'><PlusOutlined /></Button>
              </Card.Grid>
        </Card>
      ) }) : <Link href='menu'><Button size="large" className='cart-button'>Add more items</Button></Link>}
     
    </>
  );

  return (
    <>
    <div className={`header ${style ? "header-alt" : ""}`}>
      <div className="show-mobile">
        <MenuOutlined className='show-mobile' onClick={showDrawer} />
      </div>
      <div><Link href='/'>Company</Link></div>
      <div className='hide-mobile'>
        <Link href='/shop'> Shop</Link>
      </div>
      <div>
        <Popover content={content} title="Cart" trigger="hover" >
        <Badge count={itemCount}>

        
        <Link href='/cart'><ShoppingOutlined /></Link>
        </Badge>
        </Popover>
      </div>
    </div>
    <Drawer className='menu-drawer'
      placement='left'
      onClose={onClose}
      open={open} >
        <Link href='/shop'> Shop</Link>
    </Drawer>
    </>
  );
}
