import React from 'react'
import { Link } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

export default function PlaylistOrder(props) {

    const  hpRanderNumberG = (uintN) =>{
        let x = Math.floor((Math.random() * uintN ) + 1)
        return x
    }


    

    const hpDate = (d)=>{
        let nesDate = d
        let timestamp = nesDate.getTime()
        return timestamp
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
              <TableRow key={row.id}>
                <TableCell ><Link to={`/playlist/${row._id}/${row.name}`}  ><Button variant="contained" color="primary">Open</Button></Link></TableCell>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell >{hpRanderNumberG(54)}</TableCell>
                <TableCell >{hpRanderNumberG(20)}</TableCell>
                <TableCell >{row.created}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
    </div>
  )
}




            // <div key={pl._id}>
            //         <Link name={pl.name} to={`/playlist/${pl._id}/${pl.name}`}>
            //             <p>NEME: {pl.name} </p>
            //             <p>CREATED: {pl.created} </p>
            //             <p>ID: {pl._id} </p>
            //             <hr></hr>
            //         </Link>
            //     </div>