import React from 'react'
import { Link } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';

export default function PlaylistOrder(props) {

    const  hpRanderNumberG = (uintN) =>{
        let x = Math.floor((Math.random() * uintN ) + 1)
        return x
    }


    



  return (
    <div >
      <Paper style={{width:'100%',overflow:'auto'}}>
      <Table  >
        <TableHead>
          <TableRow>
            <TableCell >GoTo</TableCell>
            <TableCell>Title</TableCell>
            <TableCell >Songs</TableCell>
            <TableCell >Guests</TableCell>
            <TableCell >CREATED</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.playlistArry.map(row => {
            return (
              <Slide direction="up" key={row.id} in={true} mountOnEnter unmountOnExit>
              <TableRow key={row.id}>
                <TableCell ><Link to={`/playlist/${row._id}/${row.name}`}  ><Button variant="contained" color="primary">Open</Button></Link></TableCell>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell >{hpRanderNumberG(54)}</TableCell>
                <TableCell >{hpRanderNumberG(20)}</TableCell>
                <TableCell >{row.created}</TableCell>
              </TableRow>
              </Slide>
            )
          })}
        </TableBody>
      </Table>
    </Paper>
    </div>
  )
}




