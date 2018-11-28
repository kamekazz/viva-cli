import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';

class SearchBar extends Component {


  constructor(props) {
    super(props)

    this.state ={
      term: ''
    }

  }

  render() {
    return (
      <div className="search-bar">
        <input 
          value={this.state.term}
          onChange={(event) => this.onINputChange(event.target.value)}
          type="text"
         />
         <TextField id="time" type="text"  />
      </div>
    )
  }

  onINputChange(term){
    this.setState({term})
    this.props.onSearchTermChange(term)
  }


}


export default  SearchBar
