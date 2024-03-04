import React, { useState } from 'react'
import Header from './Header'
import Sidebar from './SideMenu'
import PageContent from './pageContent'
import Footer from './Footer'
import '../SellerDashBoard/Style.css';

function DashBoadr() {
  const [selectOption ,setSelectOption ] = useState('DashBoard')
  const handleOption = (option) => {
    setSelectOption(option)
  }
  return (
    <div className="App">
    <Header/>
    <div className='sidebarAndPage' >
      <Sidebar  handleOption={handleOption} /> 
      <PageContent option={selectOption} />
    </div>
    <Footer/>
    </div>
  )
  
}

export default DashBoadr