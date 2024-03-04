import React, { useState } from 'react';
import { AiTwotoneAppstore, AiOutlineShop, AiOutlineShoppingCart, AiOutlineUser, AiOutlineMenu } from "react-icons/ai";

function Sidebar({ handleOptionClick }) {
  const [open, setOpen] = useState(true);

  // Define items array outside of the component
  const items = [
    {
      label: "Dashboard",
      icons: <AiTwotoneAppstore />,
      key: 'Admin-dashBoard'
    },
    {
      label: "Products",
      icons: <AiOutlineShop />,
      key: 'Products'
    },
    {
      label: "Users",
      icons: <AiOutlineUser />,
      key: 'Users'
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
