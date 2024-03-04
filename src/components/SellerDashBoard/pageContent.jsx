import React from 'react'
import Store from '../../pages/SellerPanel/Store'
import Users from '../../pages/SellerPanel/Users'
import Order from '../../pages/SellerPanel/Order'

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