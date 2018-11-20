import React, { Component } from 'react';
import requireAuth from './requireAuth';



class Feature extends Component {

 
  render() {

    
    return(
        <div>
          This is the feature!
            <h1>ok {this.props.userInfo.userName} </h1>
          </div>
    )
   
  }
}



export default requireAuth(Feature);