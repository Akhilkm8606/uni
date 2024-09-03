import React from 'react';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

function CloseBtn({ onClick }) {
  return (
    <IconButton
      onClick={onClick}
      style={{ position: 'absolute', top: 10, right: 10 }}
    >
      <CloseIcon />
    </IconButton>
  );
}

export default CloseBtn;
