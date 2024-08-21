import React from 'react'
import Users from '../../pages/SellerPanel/Users'
import Order from '../../pages/SellerPanel/Order'
import Store from '../../pages/SellerPanel/Store';

function pageContent({option}) {

  return (
    <div className='PagesContents'>
       {option === 'Store' && <Store />}
      {option === 'Users' && <Users />}
      {option === 'Orders' && <Order />}
    </div>
  )
}

export default pageContent