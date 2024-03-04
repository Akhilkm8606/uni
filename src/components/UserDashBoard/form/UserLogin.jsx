import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
// import { userAuthentic } from '../redux/slice/user';
import axios from 'axios';
import '../form/style.css';


function UserLogin() {
    const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [show , setShow] = useState(true)

 
//   const user = useSelector(state => state.auth.user);
//   const userRole = useSelector(state => state.auth.user?.role);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', {
        email,
        password,
      }, { withCredentials: true });
      
      if (response && response.data) {
        // if (response.data.success) {
        // //   dispatch(userAuthentic({
        // //     user: response.data.user,
        // //     token: response.data.token,
        //   }));
        console.log("hi");
        console.log(response.data);
        toast.success(response.data.msg);

      }else {
          toast.error(response.data.msg);
        }
      
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error(error.response.data.message);
    }
  }

//   useEffect(() => {
//     if (userRole === "admin") {
//       navigate('/admin-dashboard');
//     } else if(userRole === "seller") {
//       navigate('/S-dashbord');
//     }
//      else if(userRole === "user") {
//       navigate('/');
//     }
   
//   }, [userRole, navigate]);
const handleHide = ( ) =>{
  setShow(!show)
}
  return (
    <div className='registration-container'>
     {show ? (
      <div>
      <form onSubmit={handleSubmit}>
        <h2>signup</h2>
        <input id='email' type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder='Email' />
        <input id='password' type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder='Password' />
        <button className='btn' type="submit">signup</button>
        <div className='bottom'>
          <p>Already have an account? </p>
          <Link className='btn' onClick={handleHide}  to="">Log In </Link>
        </div>
      </form>
      </div>
       ) : (
      <div>
      <form onSubmit={handleSubmit}>
        <h2>LogIn</h2>
        <input id='email' type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder='Email' />
        <input id='password' type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder='Password' />
        <button className='btn' type="submit">Log In </button>
        <div className='bottom'>
          <p>Don't have an account? </p>
          <Link className='btn' onClick={handleHide} to="">signup</Link>
        </div>
      </form>
      </div>
       )}
    
  
    <ToastContainer />
  </div>
);
}


  

export default UserLogin