// ** MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { ThemeProvider, createTheme, styled, useTheme } from '@mui/material/styles'
import axios from 'axios';
import React,{useEffect,useState} from 'react'
import { API_BASE_URL } from '../../../Apis/api'
// Styled component for the triangle shaped background image
const TriangleImg = styled('img')({
  right: 0,
  bottom: 0,
  height: 170,
  position: 'absolute'
})

// Styled component for the trophy image
const TrophyImg = styled('img')({
  right: 36,
  bottom: 20,
  height: 98,
  position: 'absolute'
})



const AllCounts = () => {
  // ** Hook
  const theme = useTheme()
  const[categoires,setCategoires]=useState(0);
  const[subcategoirs,setSubcatgeories]=useState(0);
  const[products,setProducts]=useState(0);

  useEffect(() => {

    axios.get(`${API_BASE_URL}/api/Categories/countall`)
      .then((response) => {
        // Assuming your response data is a JSON object with a "count" property
        setCategoires(response.data);
      })
      .catch((error) => {
        console.error('Error fetching customer count:', error);
      });
  }, []);
  useEffect(() => {

    axios.get(`${API_BASE_URL}/api/subcategroy/countall`)
      .then((response) => {
        // Assuming your response data is a JSON object with a "count" property
        setSubcatgeories(response.data);
      })
      .catch((error) => {
        console.error('Error fetching customer count:', error);
      });
  }, []);
  useEffect(() => {

    axios.get(`${API_BASE_URL}/api/product/countall`)
      .then((response) => {
        // Assuming your response data is a JSON object with a "count" property
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching customer count:', error);
      });
  }, []);


  const imageSrc = theme.palette.mode === 'light' ? 'triangle-light.png' : 'triangle-dark.png'

  return (
  
       <Card sx={{ position: 'relative' }}>
      <CardContent>
      <div>
          <h4>Total Categoires</h4>
          <p>{categoires}</p>
        </div>
        <div>
          <h4>Total Sub Categoires</h4>
          <p>{subcategoirs}</p>
        </div>
        <div>
          <h4>Total Products</h4>
          <p>{products}</p>
        </div>
      </CardContent>
    </Card>
   
   
  )
}

export default AllCounts;
