import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineInventory } from "react-icons/md";
import { SlNotebook } from "react-icons/sl";
import { LiaShippingFastSolid } from "react-icons/lia";
import { FaBell } from "react-icons/fa";
import { CgPerformance } from "react-icons/cg";
import { MdAddCall } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoHome } from "react-icons/io5";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const navigate = useNavigate();

  const handleNavigateToProductManage = () => {
    navigate('/Productmanage');
  };

  const handleNavigateToHome = () => {
    navigate('/Home');
  };

  return (
    <div>
      <div className="header">
        <GiHamburgerMenu className="hamburger-icon" onClick={toggleSidebar} />
      </div>
      <div className={`Sellersidebar ${isOpen ? 'open' : ''}`}>
        <ul className='Sellersidebar-content'>
          <li onClick={handleNavigateToHome}>
            <IoHome className='Sellersidebar-icon' />
            <span className='Sellersidebar-opt'>Home</span>
          </li>
          <li>
            <MdOutlineInventory className='Sellersidebar-icon' />
            <span className="Sellersidebar-opt">Inventory Management</span>
          </li>
          <li onClick={toggleDropdown} className="dropdown-li">
            <SlNotebook className='Sellersidebar-icon' />
            <span className="Sellersidebar-opt">Manage Product <IoMdArrowDropdown /></span>
            {dropdownOpen && (
              <div className="dropdown-content">
                <button className="add-product" onClick={handleNavigateToProductManage}>+ Add Product</button>
                <button className='add-product'>- Remove Product</button>
              </div>
            )}
          </li>
          <li>
            <LiaShippingFastSolid className='Sellersidebar-icon' />
            <span className="Sellersidebar-opt">Shipping Settings</span>
          </li>
          <li>
            <FaBell className='Sellersidebar-icon' />
            <span className="Sellersidebar-opt">Updates</span>
          </li>
          <li>
            <CgPerformance className='Sellersidebar-icon' />
            <span className="Sellersidebar-opt">Performance</span>
          </li>
          <li>
            <MdAddCall className='Sellersidebar-icon' />
            <span className="Sellersidebar-opt">Exclusive Help/Support</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
