import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '../../Context/UseUser';
import axios from 'axios';
import ProductList from '../Product/ProductList';
import Popover from '@mui/material/Popover';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { FaSearch, FaShoppingCart, FaUser, FaBars } from 'react-icons/fa';
import './navbar.css'
import { deepOrange, deepPurple } from '@mui/material/colors';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';


import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import {
  Alert,
   AlertTitle,
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Card,
  CardHeader,
  Chip,
  FormControl,
  InputLabel,
  Menu,
  MenuItem,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Grid,
  TextField,
  Select,
  IconButton,
  Autocomplete ,
} from "@mui/material";
import { API_BASE_URL } from '../../Apis/api';
export const Navbar = () => {
  const { userData, setUserData } = useUser();
  const [openMenu, setOpenMenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [customerCartDetails, setCustomerCartDetails] = useState({});
  const[totalItemsss,setTotalitems]=useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [customerName, setCustomerName] = useState(() => {
    // Initialize customerName from localStorage if available
    const storedUserData = JSON.parse(localStorage.getItem('userData'));
    return storedUserData ? storedUserData.customerName : '';
  });
  const navigate = useNavigate('');


  const handleSearchChange = async (event, value) => {
    setSearchQuery(value);
    setLoading(true);

    try {
      const response = await axios.get("http://localhost:8080/api/Categories/getAllCategories");
      const allCategories = response.data;

      // This will hold the search results
      const searchResults = [];

      // Loop through all categories and their subcategories and products
      allCategories.forEach(category => {
        category.subcategories.forEach(subcategory => {
          subcategory.products.forEach(product => {
            // Check if the product name contains the search query (case-insensitive)
            if (product.productName.toLowerCase().includes(value.toLowerCase())) {
              // Add the product to the search results
              searchResults.push({
                categoryName: category.categoryNames,
                subcategoryName: subcategory.subCategoryNames,
                product: product
              });
            }
          });
        });
      });


      
      console.log('Search results:', searchResults);
  
      // Navigate to a search results page passing the results as state
      navigate('/search-results', { state: { searchResults: searchResults } });

      setSearchResults(searchResults);
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };

  const openLogin = () => {
    navigate('/login');
  };

  // const openCartComponent = () => {
  //   console.log('Clicked');
  //   navigate('/cart');
  // };
  
  const openCartComponent = () => {
    const savedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  
    if (userData && userData.customerId) {
      // User is logged in, navigate to the cart page and fetch cart items from the server
      navigate('/cart');
    } else if (savedCartItems.length > 0) {
      // User is not logged in, display the cart items from local storage
      console.log( { state: { cartItems: savedCartItems } })
      navigate('/cart', { state: { cartItems: savedCartItems } });
    } else {
      // User is not logged in and no saved cart items, navigate to a page or display a message
      // For example, you could navigate to the product list page
      navigate('/cart');
    }
  };
  
  
  

  const cartDatass = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/cart/totalItem/${userData.customerId}`);
      setTotalitems(response.data);
     console.log(response.data)
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    cartDatass();
  },[userData,totalItemsss]); // Empty dependency array to fetch cart data only once when the component mounts

 // Fetch customer name when userData changes
 useEffect(() => {
  if (userData && userData.customerName) {  
    setCustomerName(userData.customerName);
  }

  // Fetch cart details from localStorage
  const savedCartDetails = JSON.parse(localStorage.getItem('customerCartDetails'));

  if (savedCartDetails) {
    setCustomerCartDetails(savedCartDetails);
  }
}, [userData]);
  
// Function to handle logout
const logout = () => {
  // Clear user data in the context
  setUserData(null);
  localStorage.removeItem('userData');

  // Reset the customerName to an empty string
  setCustomerName('');

  // Refresh the page
  window.location.reload();
};



const profile = () => {
  if (userData && userData.customerId) {
    navigate(`/profile/${userData.customerId}`);
  }
};

const openHome = () => {
  navigate('/home');
};

const orders = () => {
  if (userData && userData.customerId) {
    navigate(`/orders/${userData.customerId}`);
  }
};

useEffect(() => {
  const handleClick = (event) => {
    if (anchorEl && !anchorEl.contains(event.target)) {
      handleMenuClose();
    }
  };

  if (openMenu) {
    document.addEventListener('click', handleClick);
  }

  return () => {
    document.removeEventListener('click', handleClick);
  };
}, [openMenu, anchorEl]);





const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));









const handleMenuOpen = (event) => {
  setOpenMenu(true);
  setAnchorEl(event.currentTarget);
};

const handleMenuClose = () => {
  setOpenMenu(false);
};





  return (

    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="fixed"  color="primary">
    <div className="container" style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px' }}>
      <div className="navbar-brand">
  <Button onClick={openHome}>
    <img src="./assests/li.jpg" alt="Your Logo" className="logo" />
  </Button>
</div>

<div className="d-flex align-items-center">
          <Autocomplete
            id="search"
            freeSolo
            options={searchResults.map(result => ` ${result.product.productName}`)}
            loading={loading}
            onInputChange={handleSearchChange}
            renderInput={(params) => (
            
              <TextField
                {...params}
                id="outlined-basic"
                label="Search..."
                variant="outlined"
                fullWidth style={{ width: '400px' }} // Adjust the width as needed
                value={searchQuery}
                onChange={handleSearchChange}
            
              />
             
            )}
          />
        </div>




<div className="iconcart">
  <div className="item-count-badge">
    {totalItemsss > 0 && <p className="item-count">{totalItemsss}</p>}
  </div>
  <FaShoppingCart className="nav-icon" onClick={openCartComponent} />
</div>

          {customerName ? (
      <Avatar
        sx={{ bgcolor: deepOrange[500] }}
        onClick={handleMenuOpen}
      >
        {customerName.charAt(0).toUpperCase()}
        
        <Popover
          open={openMenu}
          anchorEl={anchorEl}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <MenuItem onClick={() => { handleMenuClose(); orders(userData?.customerId); }}>Orders</MenuItem>
          <MenuItem onClick={() => { handleMenuClose(); profile(userData?.customerId); }}>Profile</MenuItem>
          <MenuItem onClick={logout}>Logout</MenuItem>
        </Popover>
      </Avatar>
    ) : (
      <div className="space-y-6 border-t border-gray-200 px-4 py-6">
      <div className="flow-root">
        <Button className="-m-2 block p-2 font-medium text-black-900 bg-red-500 text-white" onClick={openLogin}>
          Sign in
        </Button>
      </div>
    </div>
    
    )}




            

       
      </div>
       

    
    </AppBar>
  </Box>
   
  );
};

export default Navbar;