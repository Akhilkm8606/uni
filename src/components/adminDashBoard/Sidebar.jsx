import React, { useState } from 'react';
import { AiTwotoneAppstore, AiOutlineShop, AiOutlineShoppingCart, AiOutlineUser, AiOutlineMenu } from "react-icons/ai";
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import './style.css';
const allItems = [
  {
    label: "Dashboard",
    icons: <AiTwotoneAppstore />,
    key: 'Admin-dashBoard',
    route: "/admin/dashboard",
    roles: ['admin']
  },
  {
    label: "Products",
    icons: <AiOutlineShop />,
    key: 'products',
    route: "/admin/products",
    roles: ['admin'],
    options: [
      {
        label: "New Product",
        key: "AddProducts",
        route: "/admin/products/add",
      },
      {
        label: "Product List",
        key: "ProductList",
        route: "/admin/products/list",
      }
    ]
  },
  {
    label: "Category",
    icons: <AiOutlineShop />,
    key: 'category',
    route: "/admin/category",
    roles: ['admin'],
    options: [
     
      {
        label: "Category List",
        key: "CategoryList",
        route: "/admin/category/list",
      }
    ]
  },
  {
    label: "Users",
    icons: <AiOutlineUser />,
    key: 'users',
    route: "/admin/users",
    roles: ['admin'],
    options: [
     
      {
        label: "User List",
        key: "UserList",
        route: "/admin/users/list",
      }
    ]
  },
  {
    label: "Orders",
    icons: <AiOutlineShoppingCart />,
    key: 'orders',
    route: "/admin/orders",
    roles: ['admin'],
    options: [
          {
        label: "Order List",
        key: "OrderList",
        route: "/admin/orders/list",
      }
    ]
  },
  {
    label: "Dashboard",
    icons: <AiTwotoneAppstore />,
    key: 'seller-dashBoard',
    route: "/seller/dashboard",
    roles: ['seller']
  },
  {
    label: "Products",
    icons: <AiOutlineShop />,
    key: 'seller-Products',
    route: "/seller/products",
    roles: ['seller'],
    options: [
      {
        label: "New Product",
        key: "seller-AddProducts",
        route: "/seller/products/add",
      },
      {
        label: "Product List",
        key: "seller-ProductList",
        route: "/seller/products/list",
      }
    ]
  },
  {
    label: "Orders",
    icons: <AiOutlineShop />,
    key: 'seller-Orders',
    route: "/seller/Orders",
    roles: ['seller'],
    options: [
     
      {
        label: "Orders List",
        key: "seller-OrdersList",
        route: "/seller/Orders/list",
      }
    ]
  }
];

function Sidebar({ handleOptionClick, userRole }) {
  const [open, setOpen] = useState(false);
  const [expandedItem, setExpandedItem] = useState(null);
  const location = useLocation();
  const navigate = useNavigate(); // Import and use navigate

  const toggleSidebar = () => {
    setOpen(!open);
  };

  const handleItemClick = (key, route) => {
    if (expandedItem === key) {
      setExpandedItem(null);
    } else {
      setExpandedItem(key);
    }

    if (route) {
      navigate(route); // Use navigate for routing
    }

    handleOptionClick(key); // Call handleOptionClick to update the option state
  };

  const itemsToRender = allItems.filter((item) => item.roles.includes(userRole));

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
        PaperProps={{ style: { backgroundColor: 'white' } }}
      >
        <List className='sideBar-list' style={{ marginTop: '30px' }}>
          {itemsToRender.map((item) => (
            <React.Fragment key={item.label}>
              <ListItem
                button
                component={NavLink}
                to={item.route}
                onClick={() => handleItemClick(item.key, item.route)}
                className={location.pathname === item.route ? 'active' : ''}
              >
                <ListItemIcon>{item.icons}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItem>
              {expandedItem === item.key && item.options && (
                item.options.map((option) => (
                  <ListItem
                    button
                    key={option.label}
                    component={NavLink}
                    to={option.route}
                    onClick={() => handleItemClick(option.key, option.route)}
                    style={{ paddingLeft: 32 }}
                  >
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