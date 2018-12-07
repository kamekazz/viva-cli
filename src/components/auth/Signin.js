import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';


class Signin extends Component {

  state={
    userName:'',
    password:'',
    progresive:false
  }
  

  onSubmit = () => {
    let formProps = {
      userName: this.state.userName,
      password:this.state.password
    }
    this.setState({progresive:true})
    this.props.signin(formProps, (isValed) => {
      if (isValed) {
        this.props.history.push('/feature')
      } else {
        this.setState({progresive:false})
      }
    });
  };

  render() {

    const spiner = () =>{
      if (this.state.progresive) {
        return <CircularProgress  color="secondary" className="login-sing flex-container-nada" />
      }
    }

    const singinRender =()=>{
      return(
        <div  className="flex-container ">
        <Card className="login-sing flex-container-nada">
        <form onSubmit={this.onSubmit} className="flex-container-nada">
            <Typography component="h2" variant="display2" color="secondary" gutterBottom>
              Sign In
            </Typography>
             <TextField
              name="userName"
              label="User Name"
              value={this.state.userName}
              onChange={(e) => this.setState({userName: e.target.value})}
              margin="normal"
            />
            <TextField
              name="password"
              label="password"
              value={this.state.password}
              onChange={(e) => this.setState({password: e.target.value})}
              margin="normal"
            />
          <Button onClick={this.onSubmit} variant="contained" color="secondary" >
            Submit
          </Button>
        </form>
        </Card>
        </div>
      )
    }





   

    return (
      <div>
        {this.state.progresive ? spiner() : singinRender()}
      </div>
   


    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.errorMessage };
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: 'signin' })
)(Signin);