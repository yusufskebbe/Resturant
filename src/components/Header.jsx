import React, { useContext } from 'react'
import logoImage from '../assets/logo.jpg'
import Button from './UI/Button'
import CartContext from '../store/CartContext'


function Header() {

 const cartCtx = useContext(CartContext)

 const totalCartItems = cartCtx.items.reduce((totalNumberOfItems,item)=>{
  return totalNumberOfItems + item.quantity
 }, 0);

  return (
    <header id='main-header'>
      <div id='title'>
        <img src={logoImage} alt="logo"  />
        <h1>Kebbe Resturant</h1>
      </div>
      <nav>
       <Button textOnly >Cart ({totalCartItems})</Button>
      </nav>
    </header>
  )
}

export default Header