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
// import MenuIcon from '@material-ui/icons/Menu';
import logo from '../components/css/record-33583.svg'









class Header extends Component {


state={
  logoRT:false,
  classStriang:'logo2'
}



  discRunNow = () => {
    this.setState({logoRT: !this.state.logoRT})      
  }

  componentDidUpdate(){

  }




  renderLinks =() =>{
    if (this.props.authenticated) {
      return (
        <div>
           <Link style={{ textDecoration: 'none',color: '#ffffff'}} to="/signout"><Button variant="contained" color="secondary">Sign Out</Button></Link>
        </div>
      );
    } else {
      return (
        <div>
          <Link style={{ textDecoration: 'none',color: '#ffffff'}} to="/signup"><Button variant="contained" color="secondary">Sign Up</Button></Link>
          <Link style={{ textDecoration: 'none',color: '#ffffff'}} to="/signin"><Button variant="contained" color="secondary">Sign In</Button></Link>
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

    const disctester = () =>{
      if (this.props.howPaying) {
         return (
        <img  onClick={this.discRunNow} alt="logo" className="logo" src={logo}/>
      )
      } else {
        return (
          <img  onClick={this.discRunNow} alt="logo" className="logo2" src={logo}/>
        )
      }

    }

    
    return (
      <div style={styles.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton style={styles.menuButton} color="inherit" aria-label="Menu">
            {disctester()}
          </IconButton>
          <Typography variant="h6" style={styles.grow} color="inherit" >
           
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
      userInfo: state.auth.userInfo,
      howPaying: state.auth.liveSong
     }
  )

}



  


export default compose(
  // withStyles(styles),
  connect(mapStateToProps, null)
)(Header);



