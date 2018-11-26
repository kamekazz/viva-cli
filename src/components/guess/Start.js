import React, { Component } from 'react'

export default class Start extends Component {



    // Our component just got rendered
    componentDidMount() {
        this.shouldNavigateAway();
    }

        // Our component just got updated
    componentDidUpdate() {
        this.shouldNavigateAway();
    }

    shouldNavigateAway() {
        let id = this.props.match.params.id
        if (!localStorage.getItem('token')) {
            this.props.history.push(`/xxxxxx/signin/${id}`);
        }else{
            this.props.history.push(`/guess/${this.props.match.params.id}`);
        }
    }


  render() {


    




    return (
      <div>
        Lodinging....
      </div>
    )
  }
}
