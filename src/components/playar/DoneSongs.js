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
import MusicOff from '@material-ui/icons/MusicOff';
import Flag from '@material-ui/icons/Flag';
import Favorite from '@material-ui/icons/Favorite';

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
});

class CheckboxList extends React.Component {
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

  

  render() {

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
                </Toolbar>
            </div> 
        )
      }

    return (  
    <Paper   style={{height:'300px',width:'100%'}}>
        {rdHeder()}
      <List className={classes.root}>
        {songsDone.map(song => (
          <ListItem key={song._id} role={undefined} dense button onClick={this.handleToggle(song._id)}>
            <MusicNote />

            <ListItemText primary={hpTamanoNormal(song.title,29)} />

            <div className="historyline">
              <IconButton aria-label="Comments">
                <Favorite />
              </IconButton>
    
              <IconButton aria-label="Comments">
                <MusicOff />
              </IconButton>
     
              <IconButton aria-label="Comments">
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

export default withStyles(styles)(CheckboxList);



