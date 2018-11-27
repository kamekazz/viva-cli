import React, { Component } from 'react'
import confing from '../../confing'
// import YTSearch from 'youtube-api-search'
import _ from 'lodash'
import SearchBar from '../playar/SearchBar';
import VideoList from '../playar/VideoList'
import Myplaylist from '../playar/Myplaylist'
import axios from 'axios';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Search';
import FavoriteIcon from '@material-ui/icons/PlayArrow';
import PersonPinIcon from '@material-ui/icons/Settings';


const API_KEY = confing.API_KEY
const API_URL = confing.apiUrl


 class ListPlayar extends Component {
  state={
    playListId:'',
    songInlist:[],
    videos:[],
    value: 2,
    selectedVideo: null
  }



  componentDidMount(){
    this.setState({playListId:this.props.match.params.id})
    this.timerfiveSc()
    this.getMyList()
  }

  timerfiveSc() {
    setInterval(() => { 
      this.getMyList()
    }, 5000);
  }




  videoSearch=(term)=>{
    let ROOT_URL = 'https://www.googleapis.com/youtube/v3/search';
    let params = {
      part: 'snippet',
      key: API_KEY,
      q: term,
      type: 'video',
      videoCategoryId:10,
      maxResults:6
    };
    axios.get(ROOT_URL, { params: params })
    .then((response) => {
        this.setState({
          videos: response.data.items
        })
    })
    .catch((error) => {
      console.error(error)
    });
  }
  trigger() {
    setInterval(() => { 
      this.getMyList()
    }, 5000);
  }


  

  addvideoToMyList = async (v)=> {
    let body = {
      playlistId: this.state.playListId,
      title: v.snippet.title,
      description: v.snippet.description,
      videoId: v.id.videoId,
      imageUrl: v.snippet.thumbnails.default.url
    }
    let yourConfig = {
      headers: {
        Authorization:  localStorage.getItem('token')
      }
    }
    try {
      const response = await axios.post(
        `${API_URL}/api/song/add`,
        body,
        yourConfig
      )
      console.log('data back',response.data.message)
      this.getMyList()
 
    } catch (e) {
      console.log(e)
    }
  }

  getMyList = async ()=> {
    let yourConfig = {
      headers: {
        Authorization:  localStorage.getItem('token')
      }
    }
    try {
      const response = await axios.get(
        `${API_URL}/api/playlist/songs/${this.props.match.params.id}`,
        yourConfig
      )
      this.setState({songInlist: response.data.data})

    } catch (e) {
      console.log(e)
    }
  }





  voteUp = async (ev)=> {
    let yourConfig = {
      headers: {
        Authorization:  localStorage.getItem('token')
      }
    }
    try {
      const response = await axios.get(
        `${API_URL}/api/song/voteup/${ev}`,
        yourConfig
      )
      console.log(response.data.message)
      this.getMyList()
    } catch (e) {
      console.log(e)
    }
  }

  voteDon = async (ev)=> {
    let yourConfig = {
      headers: {
        Authorization:  localStorage.getItem('token')
      }
    }
    try {
      const response = await axios.get(
        `${API_URL}/api/song/voted/${ev}`,
        yourConfig
      )
      console.log(response.data.message)
      this.getMyList()
    } catch (e) {
      console.log(e)
    }
  }





  handleChange = (event, value) => {
    this.setState({ value });
  };

  
  render() {
    const { value } = this.state;

    const styles ={
      root: {
        flexGrow: 1,
        // backgroundColor: theme.palette.background.paper,
      },
    }

    const seaerchComponetn =() =>{
      return(
        <div>
          <SearchBar onSearchTermChange={videoSearch}/>
          <VideoList  addvideoToMyList={this.addvideoToMyList} videos={this.state.videos}/>
        </div>
      )
    }



    const videoSearch = _.debounce((term) => {this.videoSearch(term) }, 1000)
    return (
   
        <div style={styles.root}>
        <AppBar position="static">
          <Tabs value={value}  onChange={this.handleChange} fullWidth >
          <Tab icon={<PhoneIcon />} />
          <Tab icon={<FavoriteIcon />} />
          <Tab icon={<PersonPinIcon />} />
          </Tabs>
        </AppBar>
        {value === 0 && seaerchComponetn()    }
        {value === 1 &&  <Myplaylist mylist={this.state.songInlist} voteUp={this.voteUp} voteDon={this.voteDon} />   }
        {value === 2 &&    <h1>ok 3</h1>  }
      </div>
        
    );
  }


}


export default ListPlayar