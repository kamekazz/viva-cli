import React, { Component } from 'react';
import requireAuth from './requireAuth';

import axios from 'axios';


const apiUrl = 'http://localhost:3090'




class Feature extends Component {

  

  async onPlaylist() {
    let yourConfig = {
      headers: {
        Authorization:  localStorage.getItem('token')
      }
    };
    try {
      const response = await axios.get(
        `${apiUrl}/api/playlist/getall`,
        yourConfig
      )
      console.log('data back',response.data)
    } catch (e) {
      console.log(e)
    }
  }

  async onAdd() {
    let yourConfig = {
      headers: {
        Authorization:  localStorage.getItem('token')
      }
    }
    try {
      const response = await axios.post(
        `${apiUrl}/api/playlist/new`,
        yourConfig
      );
      console.log('data back',response.data)
    } catch (e) {
      console.log(e)
    }
  }

  render() {

    
    return(
        <div>
          This is the feature!
            <p>{this.props.userInfo}</p>
            <button onClick={this.onPlaylist}>playlist</button>
            <input />
            <button onClick={this.onAdd}>ADD</button>
        </div>
    )
   
  }
}



export default requireAuth(Feature);