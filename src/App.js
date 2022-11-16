import logo from './logo.svg';
import './App.css';
import {useState,useEffect} from 'react'; // returns an array of variable and function to update the variable
import axios from 'axios';

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

function App() {

  const [foodName, setfoodName] = useState(''); // initial value of foodname is an empty string which will show in the search box
  const [foodItems, setfoodItems] = useState([]); // initially the foodItems array is an empty array

  const changeHandler = (e) => {
    setfoodName(e.target.value);
  }

  const onSubmit = async (e) => {
    e.preventDefault(); // prevents from reloading the page
    // console.log(foodName)

    
    // fetching the data from our api
    const items = await axios.get(`http://localhost:8080/food-item?foodName=${foodName}`)

    setfoodItems(items.data.results)
    console.log(items.data)
  }

  
   console.log(foodItems)
  return (
    <div className="App">
        
        {/* <input type="text" value={foodName} onChange={changeHandler}/> */}
        {/* <input type="submit" onClick={onSubmit}/> */}
        <TextField id="outlined-basic" label="Food Name" variant="outlined" value={foodName} onChange={changeHandler}/>
        <Button variant="outlined" onClick={onSubmit} sx={{color:"green", margin:"0px 10px", padding:"0.9rem"}}>Search</Button>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            {
              foodItems.length !== 0 && (
              <TableHead>
                <TableRow>
                  <TableCell>Food Name</TableCell>
                  <TableCell align="right">Brand Name</TableCell>
                  <TableCell align="right">Calories</TableCell>
                </TableRow>
              </TableHead>
              )
            }
          
            <TableBody>
              {foodItems.map((item,index) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {item.name}
                  </TableCell>
                  <TableCell align="right">{item.brand_name}</TableCell>
                  <TableCell align="right">{item.calories}</TableCell>
                  
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        

    </div>
  );
}

export default App;
