// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import LinearProgress from '@mui/material/LinearProgress'

// ** Icons Imports
import MenuUp from 'mdi-material-ui/MenuUp'
import DotsVertical from 'mdi-material-ui/DotsVertical'




const TotalEarning = () => {
  return (
    <Card>
      <CardHeader
        title='Total Earning'
       
      />
      <CardContent sx={{ pt: theme => `${theme.spacing(1.5)} !important` }}>
      iam  from Total earning
      </CardContent>
    </Card>
  )
}

export default TotalEarning
