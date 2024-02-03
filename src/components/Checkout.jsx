import React, { useCallback, useContext } from 'react'
import Modal from './UI/Modal'
import CartContext from '../store/CartContext'
import { currencyFormatter } from '../util/formatting'
import Input from './UI/Input'
import Button from './UI/Button'
import UserProgressContext from '../store/UserProgressContext'




function Checkout() {

  const cartCtx = useContext(CartContext)

  const userProgressCtx = useContext(UserProgressContext)

  const cartTotal = cartCtx.items.reduce((totalPrice , item) => totalPrice + item.quantity * item.price, 0)

  function handleClose (){

    userProgressCtx.hideCheckout()

  }


  function handleSubmit(e){
    e.preventDefault()

    const fd = new FormData(e.target)

    // extracting data from the input we use the code bellow

    const customerData = Object.fromEntries(fd.entries()); // {email:test@example.com}

    // sending data to backend

    fetch('http://localhost:3000/orders', {
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        order:{
            items:cartCtx.items,
            customer:customerData
          
        }
      })
    })


  }


  return (
    <Modal open={userProgressCtx.progress === 'checkout'}>
      <form onSubmit={handleSubmit}>
        <h1>Checkout</h1>
        <p>Total Amount {currencyFormatter.format(cartTotal)}</p>
        <Input label='Full Name' type ='text' id='name'/>
        <Input label='Email Address' type ='text' id='email'/>
        <Input label='Street' type ='text' id='street'/>
        <div className='control-row'>
          <Input label='Postal Code' type='text' id='postal-code'/>
          <Input label='City' type='text' id='city'/>
        </div>
        <p className='modal-actions'>
          <Button type='button' textOnly onClick={handleClose}> Close </Button>
          <Button > Submit Order </Button>
        </p>
      </form>
    </Modal>
  )
}

export default Checkout