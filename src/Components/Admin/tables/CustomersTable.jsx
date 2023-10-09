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
import { Avatar, CardHeader } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import React,{useEffect,useState} from 'react';
import axios from "axios";
import { API_BASE_URL } from '../../../Apis/api'

const statusObj = {
  applied: { color: 'info' },
  rejected: { color: 'error' },
  current: { color: 'primary' },
  resigned: { color: 'warning' },
  professional: { color: 'success' }
}



const CustomersTable = () => {
  const [customers, setCustomers] = useState([]);
  const navigate=useNavigate();

  useEffect(() => {
    // Make an API request to fetch customer data using the API_BASE_URL
    axios.get(`${API_BASE_URL}/api/customer/getNewCustomers`).then((response) => {
      const customerData = response.data;
      setCustomers(customerData);
    });
  }, [])
  return (
    <Card>
      <CardHeader
          title='New Customers'
          sx={{ pt: 2, alignItems: 'center', '& .MuiCardHeader-action': { mt: 0.6 } }}
          action={<Typography onClick={()=>navigate("/admin/customers")} variant='caption' sx={{color:"blue",cursor:"pointer",paddingRight:".8rem"}}>View All</Typography>}
          titleTypographyProps={{
            variant: 'h5',
            sx: { lineHeight: '1.6 !important', letterSpacing: '0.15px !important' }
          }}
        />
       <TableContainer>
        <Table sx={{ minWidth: 390 }} aria-label='table in dashboard'>
          <TableHead>
            <TableRow>
            <TableCell>Customer Id</TableCell>
        
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              
            </TableRow>
          </TableHead>
          <TableBody>
          {customers.map((customer) => (
                <TableRow key={customer.customerId}>
                  <TableCell>{customer.customerId}</TableCell>
                  
                  <TableCell>{customer.customerName}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}

export default CustomersTable
