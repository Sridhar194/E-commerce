import './Productmanage.css';
import React from 'react'
import Header from './Header';
import Searchheader from '../component/Searchheader';
import AddProduct from './Addproduct';


function Productmanage() {
  return (
    <div>
        <Header/>
        {/* <Searchheader/> */}
        <AddProduct/>
    </div>
  )
}

export default Productmanage