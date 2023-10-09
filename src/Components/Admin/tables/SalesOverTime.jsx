// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import { useTheme } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports
import DotsVertical from 'mdi-material-ui/DotsVertical'

// ** Custom Components Imports
import ReactApexCharts from 'react-apexcharts';

// import ReactApexcharts from 'src/@core/components/react-apexcharts'

const SalesOverTime = () => {
  // ** Hook
  const theme = useTheme()



  return (
    <Card>
      <CardHeader
        title='Sales Over Time'
       
      />
      <CardContent sx={{ '& .apexcharts-xcrosshairs.apexcharts-active': { opacity: 0 } }}>
        iam from sales
      </CardContent>
    </Card>
  )
}

export default SalesOverTime
