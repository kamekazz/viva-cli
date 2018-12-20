import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import SwipeableViews from 'react-swipeable-views';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Zoom from '@material-ui/core/Zoom';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import SettingsIcon from '@material-ui/icons/Settings';
// import green from '@material-ui/core/colors/green';
import Feature from '../Feature';

function TabContainer(props) {
  const { children, dir } = props;

  return (
    <Typography component="div" dir={dir} style={{ padding: 5 * 2 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

const styles = theme => ({
  root: {
    backgroundColor: '#5c5c5c',
    // width: 500,
    position: 'relative',
    minHeight: '900px',
  }
});

class Dashboard  extends Component {
  state = {
    value: 1,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  gotoPlayr =()=>{
    this.props.history.push('/signin');
  }

  render() {
    const { classes, theme } = this.props;
    const transitionDuration = {
      enter: theme.transitions.duration.enteringScreen,
      exit: theme.transitions.duration.leavingScreen,
    };

    const moveButton =(val)=>{
      this.setState({
        value: val
      })
    }

    const fabs = [
      {
        id:1,
        color: 'primary',
        className: classes.fab,
        icon: <SettingsIcon />,
        val:2
      },
      {
        id:2,
        color: 'secondary',
        className: classes.fab,
        icon: <SearchIcon />,
        val:0
      },
      {
        id:3,
        color: 'secondary',
        className: classes.fab,
        icon: <AddIcon />,
        val:1
      },
    ];

    return (
      <div className={classes.root}  >
        <AppBar position="sticky"  color="default">
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="secondary"
            textColor="primary"
            fullWidth
          >
            <Tab label="Find List" />
            <Tab label="My List" />
            <Tab label="Settings" />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer dir={theme.direction}>currently not available</TabContainer>
          <TabContainer dir={theme.direction}><Feature /></TabContainer>
          <TabContainer dir={theme.direction}>currently not available</TabContainer>
        </SwipeableViews>
        <div id="mybutton">
        {fabs.map((fab, index) => (
          <Zoom
            key={fab.id}
            in={this.state.value === index}
            timeout={transitionDuration}
            style={{
              transitionDelay: `${this.state.value === index ? transitionDuration.exit : 0}ms`,
            }}
            unmountOnExit
          >
            <Fab onClick={ (e) => moveButton(fab.val,e) } className={"feedback"} color={fab.color}>
              {fab.icon}
            </Fab>
          </Zoom>
          
        ))}
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Dashboard);