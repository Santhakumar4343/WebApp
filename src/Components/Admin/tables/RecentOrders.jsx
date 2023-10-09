import { Avatar, Box, Card, CardHeader, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'

import React,{useState,useEffect} from 'react'

import { useNavigate } from 'react-router-dom'
import { API_BASE_URL } from '../../../Apis/api';
import axios from "axios";

const RecentOrders = () => {

  const [orders, setOrders] = useState([]);

    const navigate=useNavigate();

    useEffect(() => {
 
      axios.get(`${API_BASE_URL}/api/admin/orders/`) 
        .then((response) => {
     
          setOrders(response.data);
  
          console.log(response.data.customers)
        })
        .catch((error) => {
          console.error("Error fetching orders:", error);
        });
    }, []);
  return (
    <Card>
       <CardHeader
          title='Recent Orders'
          sx={{ pt: 2, alignItems: 'center', '& .MuiCardHeader-action': { mt: 0.6 } }}
          action={<Typography onClick={()=>navigate("/admin/products")} variant='caption' sx={{color:"blue",cursor:"pointer",paddingRight:".8rem"}}>View All</Typography>}
          titleTypographyProps={{
            variant: 'h5',
            sx: { lineHeight: '1.6 !important', letterSpacing: '0.15px !important' }
          }}
        />
          <TableContainer>
      <Table sx={{ minWidth: 800 }} aria-label="table in dashboard">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Order date</TableCell>
            <TableCell>Order ID</TableCell>
            <TableCell>Order Status</TableCell>
            <TableCell>Final price</TableCell>
            <TableCell>discount</TableCell>
            <TableCell>Total price</TableCell>
            <TableCell>Total Items</TableCell>
            <TableCell>Customer Name</TableCell>
            <TableCell>Payment status</TableCell>
     
            {/* Add more table headers as needed */}
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.orderDate}</TableCell>
              <TableCell>{order.orderId}</TableCell>
              <TableCell>{order.orderStatus}</TableCell>
              <TableCell>{order.finalPrice}</TableCell>
              <TableCell>{order.discounte}</TableCell>
              <TableCell>{order.totalPrice}</TableCell>  
                <TableCell>{order.totalItem}</TableCell>
       <TableCell>{order.customer.customerName}</TableCell>
       <TableCell>{order.paymentDetails.status}</TableCell>
             
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Card>
  )
}

export default RecentOrders