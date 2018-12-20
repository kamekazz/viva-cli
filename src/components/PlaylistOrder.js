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
import Button from '@material-ui/core/Button';


import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import history from '../history';


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

    console.log(id);
    console.log(name);
    console.log(e);
  }



  render() {
  const tamanoNormal = (title,length) =>{
    let trimmedStringTitle = title.substring(0, length)
    if (title.length > length ) {
      trimmedStringTitle = trimmedStringTitle + '..'
    }
    if (title.length < length) {
      
    }
    return trimmedStringTitle
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
            let nowPlaying = row.nowPlaying.length
            return (
              <TableRow   className={classes.row} key={row._id} onClick={(e)=>this.gotoPlayr(row._id,row.name,e)}  >
                
                <CustomTableCell component="th" scope="row">
                  {tamanoNormal(row.name,8)}
                </CustomTableCell>
                <CustomTableCell >
                  <IconButton aria-label="4 pending messages" className={classes.margin}>
                    <Badge badgeContent={contG} color="primary">
                      <PeopleIcon />
                    </Badge>
                  </IconButton>
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
                <Button size="small" variant="outlined" style={{backgroundColor:'#5e566373'}} >
                    <EditIcon />
                </Button>
                </CustomTableCell>
                
              </TableRow>
            
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

export default withStyles(styles)(PlaylistOrder);



// to={`/playlist/${row._id}/${row.name}`}
