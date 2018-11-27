import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import './HeaderStyle.css';
import compose from 'recompose/compose';

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
           <Link style={{ textDecoration: 'none',color: '#ffffff'}} to="/signout"><Button color="inherit">Sign Out</Button></Link>
           <Link style={{ textDecoration: 'none',color: '#ffffff'}} to="/feature"><Button  color="inherit">PLAYLISTS</Button></Link>
        </div>
      );
    } else {
      return (
        <div>
          <Link style={{ textDecoration: 'none',color: '#ffffff'}} to="/signup"><Button  color="inherit">Sign Up</Button></Link>
          <Link style={{ textDecoration: 'none',color: '#ffffff'}} to="/signin"><Button  color="inherit">Sign In</Button></Link>
        </div>
      );
    }
  }




  render() {

    const styles = {
      root: {
        flexGrow: 1,
      },
      grow: {
        flexGrow: 1,
      },
      menuButton: {
        marginLeft: -12,
        marginRight: 20,
      },
    };


    
    return (
      <div style={styles.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton style={styles.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" style={styles.grow} color="inherit" >
            Dj
          </Typography>
          {this.renderLinks()}
        </Toolbar>
      </AppBar>
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



