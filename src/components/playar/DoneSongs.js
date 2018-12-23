import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MusicNote from '@material-ui/icons/MusicNote';
import MusicOff from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import Flag from '@material-ui/icons/Flag';
import Favorite from '@material-ui/icons/Favorite';
import { connect } from 'react-redux'
import * as actions from '../../actions'
import axios from 'axios';
import confing from '../../confing'
import RepeatIcon from '@material-ui/icons/Repeat'
const API_KEY = confing.API_KEY
const API_URL = confing.apiUrl



const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    height: 227,
  },
});

class CheckboxList extends React.Component {
  newMassages = this.props.newMassages
  state = {
    checked: [0],
  };

  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked,
    });
  };

  deleteSong = async (id)=> {
    let yourConfig = {
      headers: {
        authorization:  localStorage.getItem('token')
      }
    }
    try {
      const response = await axios.delete(
        `${API_URL}/api/song/delete/${id}`,
        yourConfig
      )
      if (response.data.success) {
        this.newMassages(' Song delete',true)
      } else{
        this.newMassages(response.data.message,false)
      }
      this.props.getMyDoneList()
      this.props.acDialog()
    } catch (e) {
      console.log(e)
    }
  }

  replay = async (id)=> {
    let yourConfig = {
      headers: {
        authorization:  localStorage.getItem('token')
      }
    }
    try {
      const response = await axios.put(
        `${API_URL}/api/playlist/resetall/${id}`,
        yourConfig
      )
      if (response.data.success) {
        this.newMassages('Replay',true)
      } else{
        this.newMassages(response.data.message,false)
      }
      this.props.getMyDoneList()
      this.props.acDialog()
    } catch (e) {
      console.log(e)
      this.newMassages('please check internet connection',false)
      this.props.acDialog()
    }
  }
  

  render() {

    const rdactivetiButton =(id)=>{
      return(
      <Button onClick={()=>this.deleteSong(id)} color="secondary">
                delete
      </Button>
      )
    }

    const rdactivetiButtonReplay =(id)=>{
      return(
      <Button onClick={()=>this.replay(id)} color="secondary">
                 Replay 
      </Button>
      )
    }

    const hpTamanoNormal = (title,length) =>{
      let trimmedStringTitle = title.substring(0, length)
      if (title.length > length ) {
        trimmedStringTitle = trimmedStringTitle + '..'
      }
      if (title.length < length) {
        
      }
      return trimmedStringTitle
    }

  const { classes ,songsDone} = this.props;
  
    if(songsDone.length === 0){
      return <div></div>
    }
    

      const rdHeder =()=>{
        return(
            <div >
                <Toolbar id="history">
                <Typography variant="h6" id="historyText">
                    History
                </Typography>
                <Button  onClick={()=>this.props.acDialog('are you sure you want to reply all?','',rdactivetiButtonReplay(this.props.playlistId),true)} color="primary">
                     <RepeatIcon />
                </Button>
                </Toolbar>
            </div> 
        )
      }

    return (  
    <Paper   style={{height:'300px',width:'100%'}}>
        {rdHeder()}
      <List className={classes.root}  subheader={<ListItem />} >
        {songsDone.map(song => (
          <ListItem key={song._id} role={undefined} dense button onClick={this.handleToggle(song._id)}>
            <MusicNote />
            <ListItemText primary={hpTamanoNormal(song.title,18)} />
            <div className="historyline">
              <IconButton  onClick={()=>this.props.acDialog('currently not available?','','',true)} aria-label="Comments">
                <Favorite />
              </IconButton>
    
              <IconButton  onClick={()=>this.props.acDialog('are you sure you want to delete the song from the playlist??',rdactivetiButton(song._id),'',true)} aria-label="Comments">
                <MusicOff />
              </IconButton>
     
              <IconButton  onClick={()=>this.props.acDialog('currently not available?','','',true)} aria-label="Comments">
                <Flag />
              </IconButton>
            </div> 
          </ListItem>
        ))}
      </List>
      </Paper>
    );
  }
}

CheckboxList.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default connect(null, actions)(withStyles(styles)(CheckboxList));


