import React from 'react';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { IconButton } from '@mui/material';


function AccountPortal() {
  return (
    <div>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        // onClick={}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
    </div>
  );
}

export default AccountPortal;