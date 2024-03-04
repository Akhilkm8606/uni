import React from 'react'
import { IoMdNotifications, IoIosMail } from "react-icons/io";

function Header() {
    return (
        <div className='HeaderSection'>
            <div>
                profile
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