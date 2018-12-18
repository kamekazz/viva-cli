import React, { Component } from 'react'
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Link } from 'react-router-dom';





const ITEM_HEIGHT = 48;

 class MunuButton extends Component {

    state = {
        anchorEl: null,
    }


    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    }
    
    handleClose = () => {
        this.setState({ anchorEl: null })

    }

    renderButton =() => {
        if (this.props.authenticated) {
            return(
                <div  >
                <Link  style={{ textDecoration: 'none',color: '#E54B4B'}} to="/signout">
                <MenuItem   style={{ textDecoration: 'none',color: '#E54B4B'}} onClick={this.handleClose}>
                    Sign Out
                </MenuItem>
                </Link>
                <Link  style={{ textDecoration: 'none',color: '#E54B4B'}} to="/feature">
                <MenuItem   style={{ textDecoration: 'none',color: '#E54B4B'}} onClick={this.handleClose}>
                    Playlist
                </MenuItem>
                </Link>
                </div>
            )
        } else {
            return(
                <div  >
                <Link style={{ textDecoration: 'none',color: '#E54B4B'}}  to="/signup">
                <MenuItem style={{ textDecoration: 'none',color: '#E54B4B'}}  onClick={this.handleClose}>
                    Sign Up
                </MenuItem>
                </Link>
                <Link style={{ textDecoration: 'none',color: '#E54B4B'}}   to="/signin">
                <MenuItem  style={{ textDecoration: 'none',color: '#E54B4B'}}  onClick={this.handleClose}>
                    Sign In
                </MenuItem>
                </Link>
                </div>
            )
        }
    }


  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    return (
      <div>
        <IconButton
          aria-label="More"
          aria-owns={open ? 'long-menu' : undefined}
          aria-haspopup="true"
          color="secondary"
          onClick={this.handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          open={open}
          
          onClose={this.handleClose}
          PaperProps={{
            style: {
                maxHeight: ITEM_HEIGHT * 4.5,
                width: 200,
            },
          }}
        >
          {this.renderButton()}
        </Menu>
      </div>
    )
  }


}
export default MunuButton