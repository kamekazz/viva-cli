import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';


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
          this.props.history.push('/');
        }
        if (!this.props.userInfo) {
          this.props.history.push('/');
        }
      }
  
      render() {
        return <ChildComponent {...this.props} />;
      }
    }
  
    function mapStateToProps(state) {
      return(
         {
            auth: state.auth.authenticated,
            userInfo: state.auth.userInfo,
            errorMessage: state.auth.errorMessage 
         }
      
      )

    }
  
    return connect(mapStateToProps, actions)(ComposedComponent);
};