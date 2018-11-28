import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';

import FormControl from '@material-ui/core/FormControl';




class SearchBar extends Component {


  constructor(props) {
    super(props)

    this.state ={
      term: ''
    }

  }

  render() {



    return (
      <Paper  elevation={5}  className="searchbar">
      <FormControl fullWidth >
        <TextField id="time" 
          value={this.state.term} 
          onChange={(event) => this.onINputChange(event.target.value)}
          type="text" 
          label="Search for Songs or Artists"
          margin="normal"
          variant="outlined"
          color="primary"
        />
        </FormControl>
      </Paper>
    )
  }

  onINputChange(term){
    this.setState({term})
    this.props.onSearchTermChange(term)
  }


}





export default SearchBar