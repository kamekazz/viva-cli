import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions'

import  history from '../history';


export default ChildComponent => {
  class ComposedComponent extends Component {
    // Our component just got rendered
    componentDidMount() {
      this.shouldNavigateAway();
    }

    // Our component just got updated
    componentDidUpdate() {
      this.shouldNavigateAway();
    }

    shouldNavigateAway() {
      if (!this.props.auth) {
        history.push('/signin');
      }
    }

    render() {
      return <ChildComponent {...this.props} />;
    }
  }




  const mapStateToProps = (state) => ({
     auth: state.auth.authenticated,
     gif: state.auth.randamGif
  })
  

  

  return connect(mapStateToProps,actions)(ComposedComponent);
};
