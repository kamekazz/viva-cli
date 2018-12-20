import React, { Component } from 'react'

import { connect } from 'react-redux'
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import FastForwardIcon from '@material-ui/icons/FastForward';

export class PlayButton extends Component {


  render() {

    const {startPlay,songInlist,addMoreSong} = this.props


    const rdResetButton =()=>{
        if (songInlist.length === 0) {
            return(
                <Button onClick={addMoreSong} variant="outlined" color="secondary" >
                    Add More songs <AddIcon style={{marginLeft:'5px'}} />
                </Button>
            )
        } else {
            if (this.props.howPaying) {
                return(
                    <Button  onClick={startPlay} variant="outlined" color="secondary" >
                        next <FastForwardIcon  style={{marginLeft:'5px'}} />
                    </Button>
                )
            } else {
                return(
                    <Button onClick={startPlay}   variant="outlined" color="secondary" >
                        start playing
                    </Button>
                )
            }
        }
    } 
    return (
      <div >
       { rdResetButton()}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
    howPaying: state.auth.liveSong
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayButton)
