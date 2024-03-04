import React, { useState } from 'react';
import '../adminDashBoard/style.css';
import Footer from './Footer';
import Header from './Header';
import PageContent from './PageContent';
import Sidebar from './Sidebar';

function DashBoard() {
  const [selectedOption, setSelectedOption] = useState('Admin-dashBoard'); // State to track selected option

  const handleOptionClick = (option) => {
    setSelectedOption(option); // Update selected option
  };

  return (
    <div className="App">
      <Header/>
      <div className='sidebarAndPage'>
        <Sidebar handleOptionClick={handleOptionClick} /> 
        <PageContent option={selectedOption} />
      </div>
      <Footer/>
    </div>
  );
}

export default DashBoard;
