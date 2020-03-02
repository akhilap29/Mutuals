import React, {useEffect, useState} from 'react';
import './App.css';
import  { getTransactionData }  from './services/transactionData';
import { TransactionLogic } from './transactionLogic'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    maxWidth: 1440,
    margin: '0 auto'
  },
});

function App() {
  const classes = useStyles();
  const [data, setData] = useState(null);
  useEffect(()=>{
     getTransactionData().then((res)=>{
      const transactionLogic = new TransactionLogic(res);
      const formattedData = transactionLogic.getTransactionsData()
      setData(formattedData);
     })
  }, [])
  return (
    <div className="App">
      {data && data.length > 0 && <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                  <TableCell>Customer Name</TableCell>
                  <TableCell align="right">DEC Rewards</TableCell>
                  <TableCell align="right">JAN Rewards</TableCell>
                  <TableCell align="right">FEB Rewards</TableCell>
                  <TableCell align="right">MAR Rewards</TableCell>
                  <TableCell align="right">Total Rewards</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((data, i) => (
                <TableRow key={i}>
                  <TableCell component="th" scope="row">
                    {data.customerName}
                  </TableCell>
                  <TableCell align="right">{data.Dec}</TableCell>
                  <TableCell align="right">{data.Jan}</TableCell>
                  <TableCell align="right">{data.Feb}</TableCell>
                  <TableCell align="right">{data.Mar}</TableCell>
                  <TableCell align="right">{data.total}</TableCell>
                </TableRow>
              ))}
            </TableBody>
        </Table>
    </TableContainer>}
  </div>
  );
}

export default App;
