// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'
import { Avatar, CardHeader, Pagination } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import React,{useEffect,useState} from 'react'
import axios from 'axios';
import { API_BASE_URL } from '../../../../Apis/api'


const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const navigate=useNavigate();

  useEffect(() => {
    // Make an API request to fetch customer data using the API_BASE_URL
    axios.get(`${API_BASE_URL}/api/customer/getAllCustomers`).then((response) => {
      const customerData = response.data;
      setCustomers(customerData);
    });
  }, [])
  function handlePaginationChange(event, value) {
    console.log("Current page:", value);
  }
  return (
    <Box>
         <Card>
      <CardHeader
          title='All Customers'
          sx={{ pt: 2, alignItems: 'center', '& .MuiCardHeader-action': { mt: 0.6 } }}
          
        />
      <TableContainer>
        <Table sx={{ minWidth: 390 }} aria-label='table in dashboard'>
          <TableHead>
            <TableRow>
            <TableCell>Customer Id</TableCell>
        
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone Number</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {customers.map((customer) => (
                <TableRow key={customer.customerId}>
                  <TableCell>{customer.customerId}</TableCell>
                  
                  <TableCell>{customer.customerName}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.contactNo}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
    <Card className="mt-2 felx justify-center items-center">
        <Pagination
          className="py-5 w-auto"
          size="large"
          count={10}
          color="primary"
          onChange={handlePaginationChange}
        />
      </Card>
    </Box>
   
  )
}

export default Customers;
