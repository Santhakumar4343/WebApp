import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import axios from 'axios';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { API_BASE_URL } from '../../../../Apis/api';
ChartJS.register(ArcElement, Tooltip, Legend);

const Doughnuts = () => {
  const [categories, setCategories] = useState(0);
  const [subcategories, setSubcategories] = useState(0);
  const [products, setProducts] = useState(0);
  const [customers,setCustomers]=useState(0);
  const [orders,setOrders]=useState(0);
  

  const data1 = {
    labels: ['Total no of products', 'No of sold products', 'In-stock'],
    datasets: [
      {
        label: 'Stocks',
        data: [products, orders, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const data2 = {
    labels: [ 'Total customers', 'Orders client'],
    datasets: [
      {
        label: 'Customers',
        data: [ customers, 15],
        backgroundColor: [
          
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
        ],
        borderColor: [
         
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const data3 = {
    labels: ['Total Categories', 'Sub-Categories'],
    datasets: [
      {
        label: 'Categories',
        data: [categories, subcategories], 
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };


  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/Categories/countall`)
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error('Error fetching categories count:', error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/subcategroy/countall`)
      .then((response) => {
        setSubcategories(response.data);
        console.log(response.data)
      })
      .catch((error) => {
     
        console.error('Error fetching subcategories count:', error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/product/countall`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching product count:', error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/order/count`)
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error('Error fetching orders count:', error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/customer/countall`)
      .then((response) => {
        setCustomers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching orders count:', error);
      });
  }, []);

  return (
    <div className='container'>
      <div className='row'>
        <div className='card' style={{ width: '22%' }}>
          <Doughnut data={data1} />
        </div>
        <div className='card' style={{ width: '22%' }}>
          <Doughnut data={data2} />
        </div>
        <div className='card' style={{ width: '20%' }}>
          <Doughnut data={data3} />
        </div>
      </div>
    </div>
  );
};

export default Doughnuts;