import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import confing from '../confing'

import PlaylistOrder from './PlaylistOrder';





const apiUrl = confing.apiUrl

class Feature extends Component {

  state={
    addToPlaylist: '',
    playlistArry:[]
  }

  componentDidMount(){
    this.getPlaylist()
  }

  getPlaylist = async ()=> {
    let yourConfig = {
      headers: {
        Authorization:  localStorage.getItem('token')
      }
    }
    try {
      const response = await axios.get(
        `${apiUrl}/api/playlist/getall`,
        yourConfig
      )
      this.setState({playlistArry: response.data.data})
    } catch (e) {
      console.log(e)
    }
  }

  async onAdd(prPlaylist) {
    let body = {
      name:prPlaylist
    }
    let yourConfig = {
      headers: {
        Authorization:  localStorage.getItem('token')
      }
    }
    try {
      const response = await axios.post(
        `${apiUrl}/api/playlist/new`,
        body,
        yourConfig
      )
      this.getPlaylist()
      this.setState({ addToPlaylist: ''})
      console.log('data back',response.data)
    } catch (e) {
      console.log(e)
    }
  }

  onFormSubmit = (e)=> {
    e.preventDefault()
    this.onAdd(this.state.addToPlaylist)
  }

  render() {
    return(
        <div>
          This is the feature!
          <form onSubmit={this.onFormSubmit}>
             <input type="text"
              value={this.state.addToPlaylist}
              onChange={(event)=> this.setState({addToPlaylist:event.target.value})}
              />
             <button>ADD</button>
          </form>
          <h3>#nuber of list: {this.state.playlistArry.length}</h3>
          <PlaylistOrder playlistArry={this.state.playlistArry}/>
        </div>
    )
   
  }
}




function mapStateToProps(state) {
  return(
     {
        auth: state.auth.authenticated,
        userInfo: state.auth.userInfo,
        errorMessage: state.auth.errorMessage 
     }
  )

}


export default connect(mapStateToProps)(Feature);