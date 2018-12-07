import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';


class Signout extends Component {
  
  componentDidMount() {
    this.props.signout()
    this.props.signout2()
    this.props.signout3()
  }

  render() {
    return(
      <div style={{padding:'20px'}} >
        <Card style={{display:'flex',alignItems:'center'}}>
        <Typography component="h2" variant="display2" color="secondary" >
            sorry to see you go :-(
        </Typography>
        </Card>

      </div>
    ) 
  }
}

export default connect(null, actions)(Signout);