import React from 'react';
import { FaBell } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { IoIosSearch } from "react-icons/io";


function Searchheader(){
    return(
        <>     
         <div className='search-header'> 
            <div className='search-container'>
                <div class="search">
                <input type="text" placeholder="Type to search..."/>
                <button><IoIosSearch className='search-icon'/></button>
                </div>
            </div>
            <div className='rightside-icon'>
                <FaBell className='bell-icon'/>
                <CgProfile className='profile-icon'/>
            </div>
        </div>
        <hr className='line'/>
        </>
    );
}
export default Searchheader;