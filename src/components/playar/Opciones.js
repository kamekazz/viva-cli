import React, { Component } from 'react'
import {Share} from '@material-ui/icons';
import Button from '@material-ui/core/Button';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import * as actions from '../../actions'
import { connect } from 'react-redux'




 class Opciones extends Component {

  newMassages =()=>{
    this.props.newMassages('copy to clipboard',true)
  }

  render() {
    const fullUrl = 'https://viva-la-musica.firebaseapp.com/x/start/' + this.props.playListId
    return (
      <div onClick={this.newMassages}>
        <CopyToClipboard onCopy={this.onCopy}  text={fullUrl}>
            <Button  variant="outlined" color="secondary"   aria-label="Play/pause">
                <Share />
            </Button >
        </CopyToClipboard>
      </div>
    )
  }
}

export default  connect(null,actions)(Opciones)
