import React from 'react';
import { FaBell } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { IoIosSearch } from "react-icons/io";

function Searchheader(){
    return(
        <div>
            <div className='search-bar'>
                <IoIosSearch />
            </div>
            <FaBell />
            <CgProfile />
        </div>
    );
}
export default Searchheader;