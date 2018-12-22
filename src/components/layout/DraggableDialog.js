import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { connect } from 'react-redux'
import * as actions from '../../actions'

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class DraggableDialog extends React.Component {
  
 


  handleClose = () => {
    let a =''
    let s =''
    let d =''
    this.props.acDialog(a,s,d,false)
  };

  render() {

    const hpIfor =()=>{
      if (this.props.dialog) {
        return true
      } else {
        return false
        
      }
    }

    if (!this.props.dialog) {
      return <div></div>
    }
    
    return (
      <div>
        <Dialog
          open={hpIfor()}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {this.props.dialog.heder}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
            {this.props.dialog.text}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose}  color="primary">
              Disagree
            </Button>
            {this.props.dialog.modulo}
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  dialog: state.message.dialog
})



export default connect(mapStateToProps, actions)(DraggableDialog)






