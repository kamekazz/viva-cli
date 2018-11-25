import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Signup2 extends Component {

    onSubmit = formProps => {
        this.props.signup(formProps, () => {
            this.props.history.push(`/guess/${this.props.match.params.id}`);
            console.log('singup done')
        });
    };

    componentDidMount(){
        
    }


    makeid = () => {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      
        for (var i = 0; i < 5; i++)
          text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    }
      

  render() {
    const { handleSubmit } = this.props;

    return (
        <form onSubmit={handleSubmit(this.onSubmit)}>
            <fieldset>
            <label>Email</label>
            <Field
                name="userName"
                type="text"
                component="input"
                autoComplete="none"
                value="hhhhh"
            />
            </fieldset>
            <fieldset>
            <label>Password</label>
            <Field
                name="password"
                type="password"
                component="input"
                autoComplete="none"
                value='123'
            />
            </fieldset>
            <div>{this.props.errorMessage}</div>
            <button>Sign Up!</button>
        </form>
    );
  }
}

function mapStateToProps(state) {
    return { errorMessage: state.auth.errorMessage };
}


export default compose(
    connect(mapStateToProps, actions),
    reduxForm({ form: 'signup' })
)(Signup2);