// DashBoard.jsx
import React, { useState } from 'react';
import Footer from '../UserDashBoard/Layout/Footer/Footer';
import Header from './Header';
import PageContent from './PageContent';
import Sidebar from './Sidebar';
import { useSelector } from 'react-redux';
function DashBoard() { // Added userRole as a prop
  const userRole = useSelector(state => state.auth.user?.role); // Access user's role from Redux state
  const [selectedOption, setSelectedOption] = useState(() => {
    if (userRole === 'admin') {
      return 'Admin-dashBoard';
    } else if (userRole === 'seller') {
      return 'seller-dashBoard';
    } else {
      return ''; // Handle other roles or default case
    }
  });
  const handleOptionClick = (option) => {
    setSelectedOption(option);
    console.log(option);
  };

  return (
    <div className="App">
      <Header />
      <div>
        <Sidebar handleOptionClick={handleOptionClick} userRole={userRole}  />
        <PageContent option={selectedOption} userRole={userRole} /> {/* Passed userRole to PageContent */}
      </div>
      <Footer />
    </div>
  );
}

export default DashBoard;
