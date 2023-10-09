// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import axios from 'axios'
import React,{useState,useEffect} from 'react';
import { API_BASE_URL } from '../../../Apis/api'
// ** Icons Imports
import ChevronUp from 'mdi-material-ui/ChevronUp'
import ChevronDown from 'mdi-material-ui/ChevronDown'
import DotsVertical from 'mdi-material-ui/DotsVertical'



const TotalDeals = () => {
  const[dealscount,setDealscount]=useState(0);
  useEffect(() => {

    axios.get(`${API_BASE_URL}/api/deal/countall`)
      .then((response) => {
        // Assuming your response data is a JSON object with a "count" property
        setDealscount(response.data);
      })
      .catch((error) => {
        console.error('Error fetching customer count:', error);
      });
  }, []);
  return (
    <Card>
      <CardHeader
        title='Deals'
        titleTypographyProps={{ sx: { lineHeight: '1.2 !important', letterSpacing: '0.31px !important' } }}
        action={
          <IconButton size='small' aria-label='settings' className='card-more-options' sx={{ color: 'text.secondary' }}>
            <DotsVertical />
          </IconButton>
        }
      />
      <CardContent sx={{ pt: theme => `${theme.spacing(2)} !important` }}>
      <div>
          <h4>Total Deals</h4>
          <p>{dealscount}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default TotalDeals
