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
import { Wave } from 'react-animated-text';

import MunuButton from './MunuButton'






class Header extends Component {

  state={
    windowSize:null,
    link:120,
    anchorEl: null
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  
  updateWindowDimensions =()=> {
    this.setState({ windowSize: window.innerWidth })
    this.hpchevaled()
  }

  hpchevaled = () => {
    if (this.state.windowSize > 801 ) {
      this.setState({ link: 100 });

    }
    if (this.state.windowSize <= 800 && this.state.windowSize > 701  ) {
      this.setState({ link: 50 });

    }
     if (this.state.windowSize <= 700 && this.state.windowSize > 601  ) {
      this.setState({ link: 37 });
      
    }
    if (this.state.windowSize <= 600 && this.state.windowSize > 501 ) {
      this.setState({ link: 30 });
    }
     if (this.state.windowSize <= 500 && this.state.windowSize > 401) {
      this.setState({ link: 20 });

    }
    if (this.state.windowSize <= 400 && this.state.windowSize > 301) {
      this.setState({ link: 20 });
 
    }
    if (this.state.windowSize <= 300 && this.state.windowSize > 201) {
      this.setState({ link: 10 });

    }
     if (this.state.windowSize <= 200 ) {
      this.setState({ link: 5 });

    }
    
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

    

    



    const tamanoNormal = (title,length) =>{
      let trimmedStringTitle = title.substring(0, length)
      if (title.length > length ) {
        trimmedStringTitle = trimmedStringTitle + '....'
      }
      if (title.length < length) {
        
      }
      return trimmedStringTitle
    }


    
    const styles = {
      root: {
        flexGrow: 1,
      },
      grow: {
        flexGrow: 1,
      },
      menuButton: {
        // marginLeft: -12,
        // marginRight: 20,
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

    const animadText = () => (
      <Wave text={tamanoNormal(this.props.howPaying.title,this.state.link)} />
    )

    
    return (
      <div className="appBar" style={styles.root}>
      <AppBar >
        <Toolbar>
          <IconButton style={styles.menuButton} color="inherit" aria-label="Menu">
            {disctester()}
          </IconButton>
          <Typography variant="subtitle1" style={styles.grow} color="inherit" >
           {this.props.howPaying && animadText()}
          </Typography>
          <MunuButton authenticated={this.props.authenticated} />
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



