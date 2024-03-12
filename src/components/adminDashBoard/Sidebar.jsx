// Sidebar.jsx
import React, { useState } from 'react';
import { AiTwotoneAppstore, AiOutlineShop, AiOutlineShoppingCart, AiOutlineUser, AiOutlineMenu } from "react-icons/ai";
import { Link } from 'react-router-dom';

function Sidebar({ handleOptionClick }) {
  const [open, setOpen] = useState(true);
  const [showList, setShowList] = useState(false);

  // Define items array outside of the component
  const items = [
    {
      label: "Dashboard",
      icons: <AiTwotoneAppstore />,
      key: 'Admin-dashBoard', 
    },
    {
      label: "Products",
      icons: <AiOutlineShop />,
      key: 'Products',
      options: {
        label1: "Add  Product",
        key1:"AddProdcts",
        label2: "Edit Product",
      }
    },
    {
      label: "Users",
      icons: <AiOutlineUser />,
      key: 'Users',
      options: {
        label1: "user",
        label2: "Seller",
      }
    },
    {
      label: "Orders",
      icons: <AiOutlineShoppingCart />,
      key: 'Orders'
    },
    // Add more items as needed
  ];

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setOpen(!open);
  };

  // Toggle list visibility
  const handleOptions = (key) => {
    setShowList(showList === key ? null : key);    
  };
  const handleMouseLeave = () => {
    setShowList(null);
  };


  return (
    <div className={`PanelSideBar ${open ? '' : 'closed'}`}>
      <button className="toggleButton" onClick={toggleSidebar}>
        <AiOutlineMenu style={{color:"black",backgroundColor:'white',textAlign:'center'}} />
      </button>

      {/* Map over items array to render navigation items */}
      {open && items.map((item, index) => (
        <div key={index} onClick={() => handleOptionClick(item.key)}>
          <div className='options'>
            <span>{item.icons}</span>
            <span>{item.label}</span>
          </div>
          
         

        </div>
      ))}
    </div>
  );
}

export default Sidebar;
