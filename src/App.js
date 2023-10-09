// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Layout from './Components/Layout';
// import Modal from './Components/Modal';
// import Cart from './Components/Cart';
// import CategoryList from './Components/CategoryList';
// import AboutList from './Components/About';
// import ProductList from './Components/ProductList';
// import Home from './Components/Home';
// import Login from './Components/Logins/Login';
// import LoginSignup from './Components/Logins/LoginSignup/LoginSignup';
// import Forgot from './Components/Logins/Forgot';
// import AdminDashboard from './Components/Admin/AdminDashboard';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route
//           path="/"
//           element={
//             <Layout>
//               <Route path="/" element={<Home />} />
//               <Route path="/modal" element={<Modal />} />
//               <Route path="/cart" element={<Cart />} />
//               <Route path="/catego" element={<CategoryList />} />
//               <Route path="/products/:subcategoryId" element={<ProductList />} />
//               <Route path="/product/:productId" element={<ProductList />} />
//               <Route path="/about/:categoryId" element={<AboutList />} />
//               <Route path="/login" element={<Login />} />
//               <Route path="/loginSignup" element={<LoginSignup />} />
//               <Route path="/forgot" element={<Forgot />} />
//             </Layout>
//           }
//         />
//         <Route
//           path="/admin/*"
//           element={<AdminDashboard />} // Corrected this line
//         />
//       </Routes>
//     </Router>
//   );
// }

// export default App;



import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Components/Others/Layout"; // Import the Layout component
import AdminPannel from "./Components/Admin/AdminPannel";
import Modal from './Components/Others/Modal'
import Cart from "./Components/Cart/Cart";
import CategoryList from "./Components/Category/CategoryList";
import AboutList from "./Components/Others/About";
import ProductList from "./Components/Product/ProductList";
import Home from "./Components/Home/Home";
import Login from "./Components/Logins/Login";
import LoginSignup from "./Components/Logins/LoginSignup/LoginSignup";
import { UserProvider } from './Context/UseUser'; // Import the UserProvider
import Checkout from "./Components/Checkout/Checkout";
import AddressForm from "./Components/Checkout/AddressForm";
import Summary from "./Components/Checkout/Summary";
import Contactus from "./Pages/Contactus";
import ProductDetail from "./Components/Product/ProductDetail";
import PaymentForm from "./Components/Checkout/PaymentForm";
import SearchResults from "./Components/Navbar/SearchResults";
import Profile from "./Components/Navbar/Profile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Orders from "./Components/Orders/orders";
import AdminLogin from "./Components/Admin/componets/adminlogin/AdminLogin";
import Aboutus from "./Pages/Aboutus";
import PaymentFailed from "./Components/Checkout/PaymentFailed";
import './App.css';



function App() {
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [isAdminLogedin, setIsAdminLogedIn] = useState(false);
  // Function to update the notification count
  const updateNotificationCount = () => {
    setCartCount(cartCount + 1);
  };



  return (
    <UserProvider>
    <BrowserRouter>
    <ToastContainer />
    <Routes>

    <Route path="/adminlogin" element={<AdminLogin  setIsAdminLogedIn={setIsAdminLogedIn}/>} />
          {isAdminLogedin ? (
            <Route path="/admin/*" element={<AdminPannel />} />
          ) : null}
          <Route
            path="*"
            element={
              <Layout cartCount={cartCount} cartItems={cartItems}>
                <Routes>
                  <Route index element={<Home />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/modal" element={<Modal />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/catego" element={<CategoryList />} />
                  <Route
                    path="/products/:subcategoryId"
                    element={<ProductList />}
                  />
                  <Route
                    path="/product/:productId"
                    element={<ProductList />}
                  />
                  <Route path="/productdetails/:productId" element={<ProductDetail/>}/>
                  <Route path="/about/:categoryId" element={<AboutList />} />
                  <Route path="/login" element={<Login/> } />
                  <Route path="/loginSignup" element={<LoginSignup />} />
                  <Route path="/checkout" element={<Checkout />}/>
                  <Route path="/address" element={<AddressForm />}/>
                  <Route path="/summary" element={<Summary />}/>
                  <Route path="/contact" element={<Contactus />}/>
                  <Route path="/about" element={<Aboutus />}/>
                  <Route path="/categories" element={<CategoryList />}/>
                  <Route path="/profile/:customerId" element={<Profile/>} />
                  <Route path="/orders/:customerId" element={<Orders/>} />
                  <Route path="/search-results" element={<SearchResults />}/>
                  <Route path="/payment/:orderId" element={<PaymentForm />}/>
                  <Route path="/payment/failed" element={<PaymentFailed />}/>
                </Routes>
              </Layout>
            }
          />
        </Routes>
    </BrowserRouter>
   </UserProvider>
  );
}

export default App;