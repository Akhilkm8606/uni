import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../../Redux/Slice/themeSlice';
import { FaMoon } from "react-icons/fa";
import { BsBrightnessHigh } from "react-icons/bs";

function Theme() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme); // Get the theme from Redux state

  const handleToggleTheme = () => {
    dispatch(toggleTheme()); // Dispatch the toggleTheme action
  };

  useEffect(() => {
    // Update the document body styles based on the theme
    document.body.style.backgroundColor = theme === 'dark' ? 'rgb(4 15 27)' : 'rgb(255, 255, 255)';
    document.body.style.color = theme === 'dark' ? 'rgb(255, 255, 255)' : 'rgb(0, 0, 0)';
    document.body.style.borderColor = theme === 'dark' ? 'rgb(255, 255, 255)' : 'rgb(0, 0, 0)';
  }, [theme]);
  return (
    <span>
      {theme === 'dark' ? (
        <span style={{ cursor: 'pointer', fontSize: '16px' }} onClick={handleToggleTheme} className="material-symbols-outlined theme">
          <FaMoon />
        </span>
      ) : (
        <span style={{ cursor: 'pointer', fontSize: '18px', color: 'white' }} onClick={handleToggleTheme} className="material-symbols-outlined theme">
          <BsBrightnessHigh />
        </span>
      )}
    </span>
  );
}

export default Theme;
