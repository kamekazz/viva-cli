import React, { Component } from 'react'
import confing from '../../confing'
import _ from 'lodash'
import SearchBar from '../playar/SearchBar';
import VideoDetail from '../playar/VideoDetail'
import VideoList from './VideoList'
import Myplaylist from './Myplaylist'
import MetaData from './MetaData'
import axios from 'axios';
import requireAuth from '../requireAuth';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Search';
import FavoriteIcon from '@material-ui/icons/PlayArrow';
import PersonPinIcon from '@material-ui/icons/Settings';
import Opciones from './Opciones';
import Grid from '@material-ui/core/Grid';
import QrCode from './QrCode';
import Hidden from '@material-ui/core/Hidden';
import  PlayButton  from './PlayButton';
import DoneSongs from './DoneSongs';





const API_KEY = confing.API_KEY
const API_URL = confing.apiUrl



 class PlayListPlayar extends Component {
  newMassages = this.props.newMassages

  state={
    playListId:'',
    songInlist:[],
    songsDone:[],
    videos:[],
    value: 1,
    selectedVideo: null
  }



  componentDidMount(){
    this.setState({playListId:this.props.match.params.id})
    this.trigger()
    this.getMyList()
    this.getMyDoneList()
  }

  videoSearch=(term)=>{
    let ROOT_URL = 'https://www.googleapis.com/youtube/v3/search';
    let params = {
      part: 'snippet',
      key: API_KEY,
      q: term,
      type: 'video',
      videoCategoryId:10,
      videoDuration:['short','medium'],
      maxResults:7
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

  removeformSearch = (v) =>{
    let allsearchArr = this.state.videos
    let noEscojido =  allsearchArr.filter(function(hero) {
      return hero.id !== v.id
    })

    this.setState({
      videos: noEscojido
    })
  }
  

  addvideoToMyList = async (v)=> {
    this.removeformSearch(v)
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
      if (response.data.message) {
        this.newMassages(response.data.message,response.data.success)
      }
      this.getMyList()
 
    } catch (e) {
      console.log(e)
    }
  }

  addMoreSong = () =>{
    this.setState({value:0})
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

  getMyDoneList = async ()=> {
    let yourConfig = {
      headers: {
        Authorization:  localStorage.getItem('token')
      }
    }
    try {
      const response = await axios.get(
        `${API_URL}/api/playlist/donesongs/${this.props.match.params.id}`,
        yourConfig
      )
      this.setState({songsDone: response.data.data})
    } catch (e) {
      console.log(e)
    }
  }

  startPlay = () =>{
    this.props.liveSong(this.state.songInlist[0])
    this.setState({
      selectedVideo: this.state.songInlist
    })
    this.doneSong()
    this.getMyDoneList()
  }

  doneSong = async ()=> {
    const testRemove = this.state.songInlist[0]
    let yourConfig = {
      headers: {
        authorization:  localStorage.getItem('token')
      }
    }
    try {
      const response = await axios.post(
        `${API_URL}/api/song/done/${testRemove._id}`,
        yourConfig
      )

      if (response.data.success) {
        this.newMassages('Next Song',true)
      } else{
        this.newMassages(response.data.message,false)
      }
      this.getMyList()
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
      if (response.data.message) {
        this.newMassages(response.data.message,response.data.success)
      }
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
      if (response.data.message) {
        this.newMassages(response.data.message,response.data.success)
      }
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
        // flexGrow: 1,
        // backgroundColor: theme.palette.background.paper,
      }
    }

    const seaerchComponetn =() =>{
      return(
        <div>
          <SearchBar onSearchTermChange={videoSearch}/>
          <VideoList  addvideoToMyList={this.addvideoToMyList} videos={this.state.videos}/>
        </div>
      )
    }

    const playComponetn =() =>{
      return(
        <div>
          <div className="playcomnetn-button">
          <PlayButton  addMoreSong={this.addMoreSong} songInlist={this.state.songInlist}  startPlay={this.startPlay} />
          <samp className="playcomnetn-button-item" ></samp>
          <Opciones className="playcomnetn-button-item"  playListId={this.state.playListId}></Opciones> 
          </div> 
          <Myplaylist mylist={this.state.songInlist} voteUp={this.voteUp} voteDon={this.voteDon} />
          <Hidden mdUp >
            <DoneSongs playlistId={this.props.match.params.id} getMyDoneList={this.getMyDoneList} songsDone={this.state.songsDone}  />
          </Hidden>
        </div>
      )
    }

    const renderSetiteng =()=>{
      return(
        <div>
          <Opciones playListId={this.state.playListId}></Opciones>
          <QrCode playListId={this.state.playListId} />
        </div>
      )
    }




    
    const videoSearch = _.debounce((term) => {this.videoSearch(term) }, 1000)
    return (
      <div style={styles.root}>
      <Grid container >
        <Grid item xs={12} sm={12} md={6} xl={3}>
        <Hidden smDown >
        <div style={{marginBottom:20}}></div>
        </Hidden>
          <AppBar position="static">
            <Tabs value={value}  onChange={this.handleChange} fullWidth >
              <Tab icon={<PhoneIcon />} />
              <Tab icon={<FavoriteIcon />} />
              <Tab icon={<PersonPinIcon />} />
            </Tabs>
          </AppBar>
          {value === 0 && seaerchComponetn() }
          {value === 1 &&  playComponetn()   }
          {value === 2 &&  renderSetiteng()  }
        </Grid>
        <Grid item xs={12} sm={12}  md={6} xl={9}>
          <div style={{display:'flex',flexDirection:'column'}}>
            <div style={{flexGrow:'1'}}>
            {this.state.selectedVideo && 
              <VideoDetail 
              video={this.state.selectedVideo[0]}
              neaxetSong={this.startPlay}
              />
            }
            </div>
            <div style={{flexGrow:'1',padding:'20px'}}>
            <Hidden smDown >
              <Grid container  spacing={8} >
                <Grid item >
                  <MetaData gifId={this.props.match.params.name} songInlist={this.state.songInlist}  ></MetaData> 
                </Grid>
                <Grid item >
                  <QrCode  playListId={this.state.playListId} />
                </Grid>
                <Hidden smDown >
                <Grid item >
                  <DoneSongs playlistId={this.props.match.params.id} getMyDoneList={this.getMyDoneList} songsDone={this.state.songsDone}  />
                </Grid>
                </Hidden>
              </Grid>
            </Hidden>
            </div>
          </div>
        </Grid>
      </Grid>
      </div>
    );
  }


}


export default requireAuth(PlayListPlayar)