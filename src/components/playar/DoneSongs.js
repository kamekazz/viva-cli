import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
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

    const { classes ,songsDone} = this.props;

    return (  
    <Paper   style={{height:'300px',width:'100%'}}>
        {rdHeder()}
      <List className={classes.root}>
        {songsDone.map(song => (
          <ListItem key={song._id} role={undefined} dense button onClick={this.handleToggle(song._id)}>
            <MusicNote />

            <ListItemText primary={song.title} />

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



