import React, { useState } from 'react'
import {  AiOutlineShop, AiOutlineShoppingCart, AiOutlineUser, AiOutlineMenu } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';


function SideMenu({handleOption}) {
    const navigate = useNavigate();
  

    const [open ,setOpen ] = useState(true)
    const sellerMenu = [
        {
           

            title:"Store",
            icon:<AiOutlineShop/>,
            key:"Store"
        },
        {
            title:"Users",
            icon:<AiOutlineUser/>,
            key:"Users"
            
        },
        {
            title:"Orders",
            icon:<AiOutlineShoppingCart/>,
            key:"Order"
        },
       
    ]
    const toggleMenu = ()=>{
        setOpen(!open)
    }
 
    const handleNavigate = (key) => {
        navigate(key);
      };
  return (
    <div className={`SellerPanel ${open ? '' : "closed"}`}>
        <button  className="toggleButton"onClick={toggleMenu}>
        <AiOutlineMenu style={{color:"black",backgroundColor:'white',textAlign:'center'}} />

        </button>
        {open && sellerMenu.map((menu,index) => (
         
            <div key={index} onClick={() => handleOption(menu.key)}>
            <div className='options'>
                <span>
                   {menu.icon} </span>
                <span>
                   {menu.title} </span>
                    
            </div>
        </div>
        ))
}
        
         
    </div>
  )
}

export default SideMenu