import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import { ThemeProvider } from "@emotion/react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
// import InboxIcon from "@mui/icons-material/MoveToInbox";
// import MailIcon from "@mui/icons-material/Mail";
import ListItemIcon from "@mui/material/ListItemIcon";
import { customTheme } from "./them/customeThem";
import AdminNavbar from "./Navigation/AdminNavbar";
import Dashboard from "./Views/Admin";
import { Route, Routes, useNavigate } from "react-router-dom";
import DemoAdmin from "./Views/DemoAdmin";
import CreateProductForm from "./componets/createProduct/CreateProductFrom";
import CreateProuductDemo from "./componets/createProduct/CreateProuductDemo";
import InboxIcon from '@mui/icons-material/Inbox';
import MailIcon from '@mui/icons-material/Mail';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ProductsIcon from '@mui/icons-material/Storefront';
import CustomersIcon from '@mui/icons-material/PeopleAlt';
import OrdersIcon from '@mui/icons-material/ShoppingCart';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import CategoriesIcon from '@mui/icons-material/Category';
import AddProductIcon from '@mui/icons-material/AddShoppingCart';
import DealsIcon from '@mui/icons-material/LocalOffer';
import EnquiriesIcon from '@mui/icons-material/ContactSupport';
import OthersIcon from '@mui/icons-material/MoreHoriz';
import "./AdminPannel.css";
import ProductsTable from "./componets/Products/ProductsTable";
import OrdersTable from "./componets/Orders/OrdersTable";
import Customers from "./componets/customers/customers";
import UpdateProductForm from "./componets/updateProduct/UpdateProduct";
import AddCategories from "./componets/Addcategories/CategoriesSection";
import CategoriesSection from "./componets/Addcategories/CategoriesSection";
import DealsList from "./componets/Deals/DealsList";
import Enquiries from "./componets/Enquiries/Enquiries";
import AdminForm from "./componets/AdminForm/AdminForm";
import Doughnuts from "./componets/Doughnuts/Doughnuts";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
const drawerWidth = 240;

const menu = [
  {name:"Dashboard",path:"/admin"},
  {name:"Products",path:"/admin/products"},
  {name:"Customers",path:"/admin/customers"},
  {name:"Orders",path:"/admin/orders"},
  // {name:"Payement Information",path:"/admin"},
  {name:"Add Categories",path:"/admin/Addcategoires"},
  {name:"Add Product",path:"/admin/product/create"},
  {name:"Deals",path:"/admin/deals"},
  {name:"Enquiries",path:"/admin/enquiries"},
  {name:"Profile",path:"/admin/adminform"},
  {name:"Others",path:"/admin"},
  // {name:'Chart',path:'/admin/doughnuts'}
];
const iconMap = {
  "Dashboard": <DashboardIcon />,
  "Products": <ProductsIcon />,
  "Customers": <CustomersIcon />,
  "Orders": <OrdersIcon />,
  // "Payment Information": <CurrencyRupeeIcon />,
  "Add Categories": <CategoriesIcon />,
  "Add Product": <AddProductIcon />,
  "Deals": <DealsIcon />,
  "Enquiries": <EnquiriesIcon />,
  "Profile": <AccountCircleIcon />,
 
  
};
export default function AdminPannel() {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const [sideBarVisible, setSideBarVisible] = React.useState(false);
  const navigate=useNavigate();

  const drawer = (
    <Box
      sx={{
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {isLargeScreen && <Toolbar />}
      <List>
      {menu.map((item) => (
        <ListItem key={item.name} disablePadding onClick={() => navigate(item.path)}>
          <ListItemButton>
            <ListItemIcon>
              {iconMap[item.name] || <CurrencyRupeeIcon />} {/* Use the icon from the map or a default icon */}
            </ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>

      {/* <List sx={{ position: "absolute", bottom: 0, width: "100%" }}>
        <Divider />
        {["Account", "Request"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
    </Box>
  );

  const handleSideBarViewInMobile = () => {
    setSideBarVisible(true);
  };

  const handleCloseSideBar = () => {
    setSideBarVisible(false);
  };

  const drawerVariant = isLargeScreen ? "permanent" : "temporary";

  return (
    <ThemeProvider theme={customTheme}>
      <Box sx={{ display: `${isLargeScreen ? "flex" : "block"}` }}>
        <CssBaseline />
        <AdminNavbar handleSideBarViewInMobile={handleSideBarViewInMobile} />

        <Drawer
          variant={drawerVariant}
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
              ...(drawerVariant === "temporary" && {
                top: 0,
                [`& .MuiPaper-root.MuiDrawer-paperAnchorTop.MuiDrawer-paperTemporary`]:
                  {
                    position: "fixed",
                    left: 0,
                    right: 0,
                    height: "100%",
                    zIndex: (theme) => theme.zIndex.drawer + 2,
                  },
              }),
            },
          }}
          open={isLargeScreen || sideBarVisible}
          onClose={handleCloseSideBar}
        >
          {drawer}
        </Drawer>
        <Box className="adminContainer" component="main" sx={{ flexGrow: 1 }}>
          <Toolbar />
          <Routes>
            <Route path="/" element={ <Dashboard />}></Route>
            <Route path="/product/create" element={<CreateProductForm/>}></Route>
            <Route path="/product/update/:productId" element={<UpdateProductForm/>}></Route>
            <Route path="/products" element={<ProductsTable/>}></Route>
            <Route path="/orders" element={<OrdersTable/>}></Route>
            <Route path="/customers" element={<Customers/>}></Route>
            <Route path="/deals" element={<DealsList/>}></Route>
            <Route path="/Addcategoires" element={<CategoriesSection/>}></Route>
            <Route path="/enquiries" element={<Enquiries/>}></Route>
            <Route path="/adminform" element={<AdminForm />}></Route>
            {/* <Route path="/doughnuts" element={<Doughnuts />}></Route> */}
          </Routes>
         
        </Box>
      </Box>
    </ThemeProvider>
  );
}
