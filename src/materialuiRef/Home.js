import React ,{useState,useEffect}from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Parse from 'parse/dist/parse.min.js';
import { Button } from '@mui/material';
import { Link, Route, Switch } from "react-router-dom";
import { useHistory } from "react-router-dom";
function Home() {
  const [Person, setPerson] = useState(null);
  
  
  const history = useHistory();
  async function fetchPerson() {
    // create your Parse Query using the Person Class you've created
    const query = new Parse.Query('apiInformation');
    const Person = await query.find();
    // access the Parse Object attributes
    setPerson(Person);
    console.log(Person,"______person_________");
    
    let newp = Person.map(e=>console.log(e.createdAt.toLocaleDateString("en-US")))
  }
  
  useEffect(() => {
    fetchPerson();
    return
  }, []);

  return (
    <div>   
      
       <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Object (ID)</TableCell>
          <TableCell >Token</TableCell>
          <TableCell >Sent Data</TableCell>
          <TableCell >Url</TableCell>
          <TableCell >created At</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {Person?.map((row) => (
         <TableRow
         key={row.id}
         sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
         >
         <TableCell component="th" scope="row">
         {row.id}
         </TableCell>
         <TableCell >{row.get('token')}</TableCell>
         <TableCell >{row.get('datas')}</TableCell>
         <TableCell >{row.get('url')}</TableCell>
         <TableCell >{row.createdAt.toString()}</TableCell>
         </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
 <Button variant="contained" onClick={()=>history.push('./')}>Back</Button>
  </div>
  )
}

export default Home

