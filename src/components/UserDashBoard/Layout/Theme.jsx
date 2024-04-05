import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { themeset } from '../../Redux/Slice/themeSlice';
import { FaMoon } from "react-icons/fa";
import { BsBrightnessHigh } from "react-icons/bs";



function Theme() {
  const dispatch = useDispatch();
  const [theme, settheme] = useState(false)

  const toggletheme = () => {
    settheme(prevState => !prevState);
    dispatch(themeset(!theme)); // Dispatch the opposite value
  };

  useEffect(() => {
    document.body.style.backgroundColor = theme ? 'black' : 'white';
    document.body.style.color = theme ? 'white' : 'black';
    document.body.style.borderColor = theme ? 'white' : 'black'; // Set border color based on theme
  }, [theme]);

  return (
    <span  >
      {theme ? (
        <span style={{cursor:'pointer',fontSize:'16px'}} onClick={toggletheme} className="material-symbols-outlined theme"><FaMoon/></span>
      ) : (
        <span style={{cursor:'pointer',fontSize:'18px',color:'white'}} onClick={toggletheme} className="material-symbols-outlined theme"><BsBrightnessHigh /> </span>
      )}
    </span>
  )
}

export default Theme;
