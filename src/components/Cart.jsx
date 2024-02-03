import React, { useContext } from 'react'
import Modal from './UI/Modal'
import CartContext from '../store/CartContext'
import {currencyFormatter} from '../util/formatting.js';
import Button from './UI/Button';
import UserProgressContext from '../store/UserProgressContext.jsx';
import CartItem from './CartItem.jsx';



function Cart() {
  
  const cartCTX = useContext(CartContext)

  const userProgressCtx = useContext(UserProgressContext)


  const cartTotal = cartCTX.items.reduce((totalPrice, item) =>  totalPrice + item.quantity * item.price, 0)

  
  function handleCloseCart (){


    userProgressCtx.hideCart()

  }

  
  function handleGoToCheckout(){
    userProgressCtx.showCheckout()
  }

  return (
    <Modal className='cart' open={userProgressCtx.progress === 'cart'}>

      <h2>Your cart</h2>
      <ul>
        {cartCTX.items.map((item)=>{
          return (
           <CartItem key={item.id} name={item.name} quantity={item.quantity} price={item.price} onIncrease={()=> cartCTX.addItem(item)} onDecrease={() => cartCTX.removeItem(item.id)} />
          )
        })}
      </ul>
      <p className='cart-total'> {currencyFormatter.format(cartTotal)} </p>
      <p className='modal-actions'>
        <Button textOnly onClick={handleCloseCart} >Close</Button>
        {cartCTX.items.length > 0 ? <Button  onClick={handleGoToCheckout}>Go to checkout</Button> : null}
      </p>

    </Modal>
  )
}

export default Cart