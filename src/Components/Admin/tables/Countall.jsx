// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports
import TrendingUp from 'mdi-material-ui/TrendingUp'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import DotsVertical from 'mdi-material-ui/DotsVertical'
import CellphoneLink from 'mdi-material-ui/CellphoneLink'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import React,{useEffect,useState} from 'react'
import { API_BASE_URL } from '../../../Apis/api'
import axios from 'axios'

const Countall = () => {

  const [customerCount, setCustomerCount] = useState(0);
  const[categoires,setCategoires]=useState(0);
  useEffect(() => {

    axios.get(`${API_BASE_URL}/api/customer/countall`)
      .then((response) => {
        // Assuming your response data is a JSON object with a "count" property
        setCustomerCount(response.data);
      })
      .catch((error) => {
        console.error('Error fetching customer count:', error);
      });
  }, []);
 
  return (
    <Card>
      <CardHeader
      
      />
      <CardContent sx={{ pt: theme => `${theme.spacing(3)} !important` }}>
      <div>
          <h2>Total Customers</h2>
          <p>{customerCount}</p>
        </div>
       
      </CardContent>
    </Card>
  )
}

export default Countall
