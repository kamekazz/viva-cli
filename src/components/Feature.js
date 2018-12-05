import React, { Component } from 'react';
import axios from 'axios';
import confing from '../confing'
import PlaylistOrder from './PlaylistOrder';
import requireAuth from './requireAuth';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


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

   onAdd = async (prPlaylist) => {
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
        this.props.newMassages(response.data.message,response.data.success)
      } catch (e) {
        console.log(e)
      }
  }

  onFormSubmit = (e) => {
    e.preventDefault()
    if (this.state.playlistArry.length < 20) {
      this.onAdd(this.state.addToPlaylist)
    }else{
      this.props.newMassages('the max number of available space for playlist is 20',false)
    }
    
  }

  render() {

  
    return(
        <div className="display-list" style={{padding:'10px',paddingBottom:'10px'}}>
              <div className="playlist-h1" >
              <Typography component="h2" variant="h1" color="secondary"  >
                Playlist
              </Typography>
              </div> 
              <Paper  elevation={3} style={{maxWidth:'400px',marginBottom:'12px'}} >
              <form onSubmit={this.onFormSubmit} style={{display: 'flex'}}>
                <TextField  type="text"  style={{ flexGrow:'3'}} 
                  label="add  Playlist here"
                  value={this.state.addToPlaylist}
                  onChange={(event)=> this.setState({addToPlaylist:event.target.value})}
                  variant="outlined"
                  color="secondary"
                  />
                <Button onClick={this.onFormSubmit} style={{ flexGrow:'1'}} variant="contained" color="secondary">
                    Add
                </Button>

              </form>
              </Paper>
          <Paper  elevation={3}>
            <PlaylistOrder playlistArry={this.state.playlistArry}/>
          </Paper>
        </div>
    )
   
  }
}


export default requireAuth(Feature);