import React, { Component } from 'react';
import axios from 'axios';
import confing from '../confing'
import PlaylistOrder from './PlaylistOrder';
import requireAuth from './requireAuth';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';


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
    this.setState({addToPlaylist:''})
    if (this.state.playlistArry.length < 20) {
      this.onAdd(this.state.addToPlaylist)
    }else{
      this.props.newMassages('the max number of available space for playlist is 20',false)
    }
    
  }

  render() {

  
    return(
        <div >
          <Paper className={"display-list"} elevation={1} style={{padding:'5px'}}>
              <div className="playlist-h1"  elevation={3} >
              <Typography component="h2" variant="h1" color="secondary"  elevation={3}  >
                Playlist
              </Typography>
              </div> 
              <form onSubmit={this.onFormSubmit} style={{margin:'5px'}} >
                <Grid container  direction="row"   justify="flex-start"  alignItems="center"  >
                  <Grid item  xl={5} lg={6} md={8} sm={10} xs={10}>
                    <TextField  type="text"  
                      label="add  Playlist here"
                      value={this.state.addToPlaylist}
                      onChange={(event)=> this.setState({addToPlaylist:event.target.value})}
                      variant="outlined"
                      color="secondary"
                      style={{backgroundColor:'white',width:'100%'}}
                    />
                  </Grid>
                  <Grid item  xl={7} lg={6} md={4} sm={2}  xs={1}>
                    <Button onClick={this.onFormSubmit} style={{height:'57px',marginLeft:'10px',marginRight:'3px'}} variant="contained" color="secondary">
                        Add
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          <Paper style={{marginTop:'12px'}}>
            <PlaylistOrder playlistArry={this.state.playlistArry}/>
          </Paper>
        </div>
    )
   
  }
}


export default requireAuth(Feature);