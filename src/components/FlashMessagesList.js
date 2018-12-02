import React, { Component } from 'react'
import { connect } from 'react-redux'
import Snackbar from '@material-ui/core/Snackbar';
import * as actions from '../actions'

export class FlashMessagesList extends Component {

  settimer =()=>[
    setTimeout(() => {
      this.props.newMassages(null,null)
    }, 3000)
  ]


  render() {
    const message = this.props.message

    const checkMessages = ()=>{
      if (message.text) {
        this.settimer()
        return true
      } else {
        return false
      }
    }


    return (

      <div>
       <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={checkMessages()}
          message={<span id={message.type ? 'message-id' : 'message-id-err'}>{message.text}</span>}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  message:state.message.newMessages,
  howPaying: state.auth.liveSong
})



export default connect(mapStateToProps, actions)(FlashMessagesList)
