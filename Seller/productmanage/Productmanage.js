import './Productmanage.css';
import React from 'react'
import Header from './Header';
import Searchheader from '../component/Searchheader';
import Addproduct from './Addproduct';

function Productmanage() {
  return (
    <div>
        <Header/>
        <Searchheader/>
        <Addproduct/>
    </div>
  )
}

export default Productmanage