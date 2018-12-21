import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';

import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import Typography from '@material-ui/core/Typography';


 class MetaData extends Component {

  componentDidMount(){
    this.props.aGetGif('music')
  }


  randamNumber = (arlNum) =>{
    let x = Math.floor((Math.random() * arlNum ) + 1)
    return x
  }


  
  render() {
    
    const gif = this.props.gif

    return (
      <Card style={{height:'300px',width:'295px'}} >
      <CardActionArea>
        <CardMedia
          style={{height:'170px',width:'300px'}}
          image={gif ? gif : '../css/hanny-naibaho-388579-unsplash.jpg'}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {this.props.gifId}
          </Typography>
          <Typography component="p">
            Song in Line: {this.props.songInlist.length}
          </Typography>
          <Typography component="p">
            Guests: {this.randamNumber(20)}
          </Typography>
          <Typography component="p">
            Access Code: {this.randamNumber(999)}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    )
  }
}

const mapStateToProps = (state) => ({
  gif: state.auth.randamGif
})







export default connect(mapStateToProps,actions)(MetaData)