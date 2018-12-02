import React, { Component } from 'react'
import { connect } from 'react-redux'

export class FlashMessagesList extends Component {


  render() {
    const message = this.props.message

    return (
      <div>
        {message}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  message:state.message.newMessages
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(FlashMessagesList)
