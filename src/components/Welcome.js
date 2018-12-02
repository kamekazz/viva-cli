import React, { Component } from 'react'

import { connect } from 'react-redux'
import {newMassages}from '../../src/actions'

export class Welcome extends Component {


  render() {
    return (
      <div>
        Welcome
        <button onClick={this.props.newMassages}>newMassages</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  newMassages
}

export default connect(mapStateToProps, mapDispatchToProps)(Welcome)
