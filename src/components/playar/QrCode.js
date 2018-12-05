import React, { Component } from 'react'
var QRCode = require('qrcode-react');

export default class QrCode extends Component {



  render() {

    const fullUrl = 'https://viva-la-musica.firebaseapp.com/x/start/' + this.props.playListId
    return (
      <div >
            <QRCode
             value={fullUrl}
             bgColor={'#E54B4B'}
             logo={'../css/record-33583.svg'}
             size={300}
            />
      </div>
    )
  }
}
