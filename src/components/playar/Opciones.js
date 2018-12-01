import React, { Component } from 'react'
import {Share} from '@material-ui/icons';
import Button from '@material-ui/core/Button';
import {CopyToClipboard} from 'react-copy-to-clipboard';


export default class Opciones extends Component {

  render() {
    const fullUrl = 'https://viva-la-musica.firebaseapp.com/x/start/' + this.props.playListId
    return (
      <div>
        <CopyToClipboard onCopy={this.onCopy} text={fullUrl}>
            <Button  variant="outlined" color="secondary"   aria-label="Play/pause">
                <Share />
            </Button >
        </CopyToClipboard>
      </div>
    )
  }
}
