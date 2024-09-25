import React, { useState, useEffect } from 'react';
import Footer from '../UserDashBoard/Layout/Footer/Footer';
import Header from './Header';
import PageContent from './PageContent';
import Sidebar from './Sidebar';
import { useSelector } from 'react-redux';

function DashBoard() {
  const userRole = useSelector(state => state.auth.user?.role); // Access user's role from Redux state
  const [selectedOption, setSelectedOption] = useState('');

  useEffect(() => {
    if (userRole === 'admin') {
      setSelectedOption('Admin-dashBoard');
    } else if (userRole === 'seller') {
      setSelectedOption('seller-dashBoard');
    } else {
      setSelectedOption(''); // Handle other roles or default case
    }
  }, [userRole]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="App">
      <Header />
      <div>
        <Sidebar handleOptionClick={handleOptionClick} userRole={userRole} />
        <PageContent option={selectedOption} userRole={userRole} /> {/* Passed userRole to PageContent */}
      </div>
      <Footer />
    </div>
  );
}

export default DashBoard;
