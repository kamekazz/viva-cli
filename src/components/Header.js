import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import './HeaderStyle.css';
import compose from 'recompose/compose';

import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';









class Header extends Component {





  renderLinks =() =>{
    if (this.props.authenticated) {
      return (
        <div>
          <Link to="/signout">Sign Out</Link>
          <Link to="/feature">Feature</Link>
          <p>{this.props.userInfo}</p>
        </div>
      );
    } else {
      return (
        <div>
          <Link to="/signup">Sign Up</Link>
          <Link to="/signin">Sign In</Link>
        </div>
      );
    }
  }




  render() {




    
    return (
      <div className="header">
        <Link to="/">Redux Auth</Link>
        {this.renderLinks()}

        <div >
      <AppBar position="static">
        <Toolbar>
          <IconButton  color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" >
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
      </div>
    );
  }
}


  


function mapStateToProps(state) {
  return(
     {
      authenticated: state.auth.authenticated,
        userInfo: state.auth.userInfo
     }
  )

}



  


export default compose(
  // withStyles(styles),
  connect(mapStateToProps, null)
)(Header);