import React, { useState } from 'react';
import { AiTwotoneAppstore, AiOutlineShop, AiOutlineShoppingCart, AiOutlineUser, AiOutlineMenu } from "react-icons/ai";
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper'; // Import Paper component
import './style.css';

function Sidebar({ handleOptionClick }) {
  const [open, setOpen] = useState(false);
  const [expandedItem, setExpandedItem] = useState(null);

  const toggleSidebar = () => {
    setOpen(!open);
  };

  const handleItemClick = (key) => {
    if (expandedItem === key) {
      setExpandedItem(null);
    } else {
      setExpandedItem(key);
    }
    
    if (key !== 'Products' && key !== 'Orders' && key !== 'Category' && key !== 'Users') {
      setOpen(false);
    }
    
    
    handleOptionClick(key);
  };

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
      options: [
        {
          label: "New Product",
          key: "AddProducts",
        },
        {
          label: "Product List",
          key: "ProductList",
        }
      ]
    },
    {
      label: "Category",
      icons: <AiOutlineShop />,
      key: 'Category',
      options: [
      
        {
          label: "Category List",
          key: "Categorylist",
        }
      ]
    },
    {
      label: "Users ",
      icons: <AiOutlineUser />,
      key: 'Users',
      options: [
        {
          label: "User List",
          key: "UserList",
        },
        {
          label: "Seller List",
          key: "SellerList",
        }
      ]
    },
    {
      label: "Orders",
      icons: <AiOutlineShoppingCart />,
      key: 'Orders'
    },
  ];

  return (
    <div className='sidebar_container'>
      <button className="toggleButton" onClick={toggleSidebar}>
        <AiOutlineMenu style={{ color: "black", backgroundColor: 'white', textAlign: 'center', fontSize: '20px' }} />
      </button>
      <SwipeableDrawer
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        PaperProps={{ style: { backgroundColor: 'white',  } }} // Change background color here
      >
        <List className='sideBar-list' style={{marginTop:'30px'}}>
          {items.map((item, index) => (
            <React.Fragment key={item.label}>
              <ListItem button onClick={() => handleItemClick(item.key)}>
                <ListItemIcon>{item.icons}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItem>
              {expandedItem === item.key && item.options && (
                item.options.map((option, optIndex) => (
                  <ListItem button key={option.label} onClick={() => handleItemClick(option.key)} style={{ paddingLeft: 32 }}>
                    <ListItemIcon></ListItemIcon>
                    <ListItemText primary={option.label} />
                  </ListItem>
                ))
              )}
            </React.Fragment>
          ))}
        </List>
      </SwipeableDrawer>
    </div>
  );
}

export default Sidebar;
