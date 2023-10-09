// ** MUI Imports
import Grid from "@mui/material/Grid";
import AdminPannelWrapper from "./AdminPannelWrapper";


import WeeklyOverview from "../tables/WeeklyOverview";
import TotalEarning from "../tables/TotalEarning";
import CardStatsVertical from "./CardStatsVertical";

import CustomersTable from "../tables/CustomersTable";
import { ThemeProvider, createTheme } from "@mui/material";
import { customTheme, darkTheme } from "../them/customeThem";
import "./Admin.css";
import RecentlyAddeddProducts from "../tables/RecentlyAddeddProducts";
import SalesOverTime from "../tables/SalesOverTime";
import RecentOrders from "../tables/RecentOrders";
import {AssuredWorkloadIcon }from '@mui/icons-material';

import Countall from "../tables/Countall";
import AllCounts from "../tables/AllCounts";
import TotalDeals from "../tables/TotalDeals";

const darkTheme1 = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#312d4b',
    },
    secondary: {
      main: '#f48fb1',
    },
  },
});

// bg-[#28243d]
const Dashboard = () => {
  return (
    <div className="adminContainer ">
      <ThemeProvider theme={customTheme}>
        <AdminPannelWrapper>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <AllCounts />
            </Grid>
            <Grid item xs={12} md={8}>
              <Countall />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <TotalDeals />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <TotalEarning />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Grid container spacing={2}>
            
              </Grid>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
            <CustomersTable />
            </Grid>
            <Grid item xs={12} md={12} lg={8}>
              <RecentOrders />
            </Grid>
           
            {/* <Grid item xs={12} md={6} lg={4}>
              <SalesOverTime/>
            </Grid> */}
           
          
          </Grid>
        </AdminPannelWrapper>
      </ThemeProvider>
    </div>
  );
};

export default Dashboard;
