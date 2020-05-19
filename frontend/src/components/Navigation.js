import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import StorefrontIcon from '@material-ui/icons/Storefront';

function Navigation(props) {
  return (
    <AppBar position="sticky" className="navigationbar">
      <Toolbar>
          <Box display="flex" flexDirection="row">
            <Link to="/" style={{ textDecoration: 'none' }}>
              <IconButton>
                <StorefrontIcon />
                <Typography>Items for sale</Typography>
              </IconButton>
            </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navigation;
