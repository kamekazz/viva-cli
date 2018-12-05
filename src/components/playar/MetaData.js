import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'


 class MetaData extends Component {

  componentDidMount(){
    this.props.aGetGif(this.props.gifId)
  }
  render() {
    const gif = this.props.gif



    return (
      <div>
        MetaData
        <img  src= {gif} alt={gif} />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  gif: state.auth.randamGif
})







export default connect(mapStateToProps,actions)(MetaData)