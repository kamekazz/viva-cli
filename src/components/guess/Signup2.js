import React, { Component } from 'react';
import confing from '../../confing'
import axios from 'axios'
import { connect } from 'react-redux'
import * as actions from '../../actions'

import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
// import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';


const API_URL = confing.apiUrl

class Signup2 extends Component {


  state={
    userName:''
  }

    onSubmit = () => {
            this.props.history.push(`/guess/${this.props.match.params.id}`)
            console.log('singup done')
    }

    // componentDidMount(){
    //     this.singInguess()
    // }


    singInguess = async ()=> {
      let params ={
        userName:this.state.userName
      }
        try {
          const response = await axios.post(
            `${API_URL}/api/accounts/new/guste`,params)
            if (response.data.success) {
              localStorage.setItem('token', response.data.token)
              this.onSubmit()
            } else {
              this.props.newMassages(response.data.message,response.data.success)
            }
        } catch (e) {
          console.log(e)
        }
    }



  render() {
  

    return (

        <div  className="flex-container ">
            <Card className="login-sing flex-container-nada">
            <form onSubmit={this.onSubmit} className="flex-container-nada">
            <Typography component="h2" variant="display2" color="secondary" gutterBottom>
              Guests 
            </Typography>
                 <TextField
                  name="userName"
                  label="Username"
                  value={this.state.userName}
                  onChange={(e) => this.setState({userName: e.target.value})}
                  margin="normal"
                />
              <Button onClick={this.onSubmit} variant="contained" color="secondary" >
                Submit
              </Button>
            </form>
            </Card>
            </div>
    );
  }
}



export default connect(null,actions)(Signup2)