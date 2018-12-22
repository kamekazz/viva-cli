import React ,{Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import PeopleIcon from '@material-ui/icons/People';
import WifiTethering from '@material-ui/icons/WifiTethering';
import PortableWifiOff from '@material-ui/icons/PortableWifiOff';
import MusicNote from '@material-ui/icons/MusicNote';
import MusicOff from '@material-ui/icons/MusicOff';
import EditIcon from '@material-ui/icons/Edit';
// import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Badge from '@material-ui/core/Badge';
import history from '../history';
// import Divider from '@material-ui/core/Divider';
import { connect } from 'react-redux'
import * as actions from '../actions'
import Button from '@material-ui/core/Button';


const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: "#2c1a36",
    color: theme.palette.common.white,
    '&:hover': {
      color: "#E54B4B",
    },
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
    '&:hover': {
      backgroundColor: "#d698fa4b",
      color: "#E54B4B",
    },
    '&:active': {
      backgroundColor: "#643d7a",
      color: "#E54B4B",
    },
  },
  badge: {
    top: 12,
    right: 6,
    width: 13,
    height: 13,
    // The border color match the background color.
    border: `2px solid ${
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[900]
    }`,
  },
});



class PlaylistOrder extends Component {


  gotoPlayr =(id,name,e)=>{
    history.push(`/playlist/${id}/${name}`)
  }

  deletelist = async (id)=>{
    await this.props.acDeletyPlaylist(id)
    await this.props.getPlaylist()
    this.props.acDialog(false)
  }
  



  render() {
    if (!this.props.playlistArry) {
      return <div></div>
    }


  const tamanoNormal = (title,length) =>{
    let trimmedStringTitle = title.substring(0, length)
    if (title.length > length ) {
      trimmedStringTitle = trimmedStringTitle + '..'
    }
    if (title.length < length) {
      
    }
    return trimmedStringTitle
  }

  const rdactivetiButton =(id)=>{
    return(
    <Button onClick={()=>this.deletelist(id)} color="secondary">
              delete
    </Button>
    )
  }


  
  const { classes ,playlistArry} = this.props;
  return (
    
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <CustomTableCell >GoTo</CustomTableCell>
            <CustomTableCell >Users</CustomTableCell>
            <CustomTableCell >Live</CustomTableCell>
            <CustomTableCell >Songs</CustomTableCell>
            <CustomTableCell >Edit</CustomTableCell> 
          </TableRow>
        </TableHead>
        <TableBody>
          {playlistArry.map(row => {
            let contG = row.guests.length
            let nowPlaying = row.videoId.length
            return (
              <TableRow   className={classes.row} key={row._id} onClick={(e)=>this.gotoPlayr(row._id,row.name,e)}  >
                <CustomTableCell component="th" scope="row">
                  {tamanoNormal(row.name,8)}
                </CustomTableCell>
                <CustomTableCell >
 
                    <Badge badgeContent={contG} color="primary">
                      <PeopleIcon />
                    </Badge>
      
                </CustomTableCell>
                <CustomTableCell >{row.live ? 
                  <WifiTethering style={{color:'green'}} />
                  :<PortableWifiOff style={{color:'#E54B4B'}}/>
                                   }</CustomTableCell>
                <CustomTableCell >
                  {nowPlaying ? 
                    <Badge badgeContent={nowPlaying} classes={{ badge: classes.badge }} color="primary">
                        <MusicNote />
                    </Badge>
                    :
                    <MusicOff />
                  }
                </CustomTableCell>
                <CustomTableCell >

                <div onClick={(e)=> e.stopPropagation()} className="playOline">

                <IconButton  onClick={()=>this.props.acDialog('currently not available?','','',true)} variant="outlined" style={{backgroundColor:'#5e566373'}} >
                    <EditIcon />
                </IconButton >

                <IconButton  onClick={()=>this.props.acDialog('are you sure you want to delete the playlist?','if you continue with the process you will not be able to retrieve your playlist',rdactivetiButton(row._id),true)}   color="secondary" variant="outlined" style={{backgroundColor:'#5e566373'}} >
                    <DeleteIcon />
                </IconButton >
                </div>
                </CustomTableCell>
              </TableRow > 
            );
          })}
        </TableBody>
      </Table>
    </Paper>
   
  );
}
}
PlaylistOrder.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  
})




export default connect(mapStateToProps, actions)(withStyles(styles)(PlaylistOrder));


// to={`/playlist/${row._id}/${row.name}`}
