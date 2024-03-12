import React from 'react'
import { Card } from 'react-bootstrap';
import { IoMdNotifications, IoIosMail } from "react-icons/io";

function Header() {
    return (
        <div className='HeaderSection'>
            <div>
            
            </div>
            <div>
                profile
            </div>
            <div className='headerIcons'>
               
                <span>
                    <IoIosMail />
                    
                    </span>
                    <span>
                    <IoMdNotifications  />
                    </span>

            </div>
        </div>
    )
}

export default Header