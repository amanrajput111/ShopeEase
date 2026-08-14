 import React, { useState } from 'react'
 import Home from './pages/Home'
 import SignUp from './pages/SignUp'
import Login from './pages/Login'
import {Navbar} from './components/Navbar'
import Footer from './components/Footer'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import CreateProduct from './pages/CreateProduct'
import { AdminDashboard } from './pages/AdminDashbord'
import CartPage  from './pages/CartPage'
import { CartProvider } from "./context/Context";
import ProductsPage from './pages/ProductPage'
import  ProductDetails  from './pages/ProductDetails'
 
import ConfirmOrders from './pages/ConfirmOrder'
import  Order from './pages/Order'
import { Profile } from './components/Profile'
import OrdersDetails from './pages/OrdersDetails'
import Wishlist from "./pages/Wishlist";
import { WishlistProvider } from "./context/WishlistContext";



 



 
 const App = () => {
  
  


   return (
    <>
      <div className=''>
        <WishlistProvider>

         <CartProvider>
        
        <Routes>

          <Route path='/' element = {<> <Navbar/> <Home/> <Footer/></>}/> 
          <Route path='/SignUp' element = {<><SignUp/><Footer/></>}/> 
          <Route path='/login' element = {<><Login/><Footer/></>}/> 
          <Route path='/product-upload' element = {<CreateProduct/>}/> 
          <Route path='/Admin' element = {<AdminDashboard/>}/> 
          <Route path='/Cart' element = {<CartPage/>}/> 
          <Route path='/products' element = {<> <Navbar/> <ProductsPage/> <Footer/></>}/> 
          <Route path='/Products/:id' element = {<ProductDetails/>}/> 
            <Route path='/Confirm' element = {<ConfirmOrders/>}/> 
            <Route path='/orders' element = {<> <Navbar/><Order/><Footer/></>}/> 
            <Route path='/profile' element = {<> <Navbar/><Profile/><Footer/></>}/> 
                  <Route path="orders/:id" element={<OrdersDetails />} />
                  <Route path="/wishlist" element={<Wishlist />} />
            


 

        </Routes>
        </CartProvider>
        </WishlistProvider>
</div>
     
     </>
   )
 }
 
 export default App