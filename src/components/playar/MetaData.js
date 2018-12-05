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
        <img 
          // style={{maxWidth:'300px'}}
          src={gif} alt='totos' />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  gif: state.auth.randamGif
})







export default connect(mapStateToProps,actions)(MetaData)