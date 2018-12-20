import React, { Component } from 'react'

import { connect } from 'react-redux'
import Button from '@material-ui/core/Button';

export class PlayButton extends Component {


  render() {

    const {startPlay,songInlist} = this.props
    console.log(songInlist.length)
    const rdHowPaying = ()=>{
        if (this.props.howPaying) {
            return(
                <Button  onClick={startPlay} variant="outlined" color="secondary" >
                    next
                </Button>
            )
        } else {
            return(
                <Button onClick={startPlay}   variant="outlined" color="secondary" >
                    Start Play
                </Button>
            )
        }
    }

    const rdResetButton =()=>{
        if (songInlist.length === 0) {
            return(
                <Button  variant="outlined" color="secondary" >
                    reset
                </Button>
            )
        } else {
            if (this.props.howPaying) {
                return(
                    <Button  onClick={startPlay} variant="outlined" color="secondary" >
                        next
                    </Button>
                )
            } else {
                return(
                    <Button onClick={startPlay}   variant="outlined" color="secondary" >
                        Start Play
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
