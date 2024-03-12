import React, { useState } from 'react';
import { FaUser } from "react-icons/fa6";
import { IoIosCheckmarkCircleOutline, IoIosStarOutline, IoMdCall } from 'react-icons/io';
import { RiContactsBook2Line } from "react-icons/ri";
import { AiOutlineMail } from "react-icons/ai";
import { Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Profile() {
   const [showEdit , setShowEdit] = useState(false)
   const [isChecked, setIsChecked] = useState(false);


   const handleProfileEdit = () =>{
    setShowEdit(!showEdit)
   }

  // Function to handle checkbox change
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  return (
    <div className='UserProfile'>
      <h3>Profile</h3>
      <Row className='pro-head'>
        <div className='ProfileData'>
          <span> <FaUser/> Fullname:</span>
          <span> <IoIosCheckmarkCircleOutline/> Status:</span>
          <span> <IoIosStarOutline/>Role:</span>
          <h5>Contact <RiContactsBook2Line/></h5>
          <span> <IoMdCall/> Phone Number:</span>
          <span> <AiOutlineMail/> Email :</span>
        </div>
        <span>
          <button onClick={handleProfileEdit}>ProfileEdit</button>
        </span>
        {showEdit && (
 <div className='ProfileEdit'>
 <h3>Account</h3>
 <input type="text" placeholder='Fullname' />
 <input type="email" placeholder='Email' />
 <input type="text" placeholder='address' />
 <input type="text" placeholder='phone Number' />
 <input list="roles" type="option" placeholder='role' />
 <datalist id="roles" >
   <option value="Admin" />
   <option value="User" />
   <option value="Seller" />
 </datalist>

 <input list="status" type="option"  placeholder='status'/>
 <datalist id="status">
   <option value="Active" />
   <option value="Inactive" />
  
 </datalist>
<span>
<Link className='submitLink'>submit</Link>

</span>
    
</div>
        )}
       
      </Row>

      <div className='deleteA-C'>
        <div className='form'>
        <h3>Delete Account</h3>
        <div className='checkInput'>
        <input  style={{marginLeft:"10px"}}
            id="roleCheckbox" 
            type="checkbox" 
            checked={isChecked} 
            onChange={handleCheckboxChange} 
          />
          <p>I confirm my account deactivation</p>
        </div>

        <button className='Dltbtn'>
          Deactivate Account
        </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
