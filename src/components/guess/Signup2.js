import React, { Component } from 'react';
import confing from '../../confing'
import axios from 'axios'

const API_URL = confing.apiUrl

class Signup2 extends Component {

    onSubmit = () => {
            this.props.history.push(`/guess/${this.props.match.params.id}`);
            console.log('singup done')
    };

    componentDidMount(){
        this.singInguess()
    }


    singInguess = async ()=> {
        try {
          const response = await axios.get(
            `${API_URL}/api/accounts/new/guste`)
            localStorage.setItem('token', response.data.token);
        } catch (e) {
          console.log(e)
        }
    }



  render() {
  

    return (
        <button onClick={this.onSubmit}>Start</button>
    );
  }
}



export default Signup2