import React from 'react';

function Breadcrumb({ crumbs }) {




  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        {crumbs.map((crumb, index) => (
          <li key={index} className="breadcrumb-item " style={{listStyle:'none'}}>
            {crumb}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default Breadcrumb;
