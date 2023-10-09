// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const AboutList = ({ categoryId }) => {
//   const [products, setProducts] = useState([]);

//   const cccc=1;

//   useEffect(() => {
//     axios
//       .get(`http://localhost:8080/api/product/getproductsbycategory/${cccc}`)
//       .then((response) => {
//         setProducts(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching products:", error);
//       });
//   }, [categoryId]);

//   return (
//     <div className="product-list">
//         <h1>Hiiiii</h1>
//       {products.map((product) => (
//         <div className="product-card" key={product.productId}>
//           <h2>{product.productName}</h2>
//           <p>Cost: {product.productCost}</p>
//           <p>Quantity: {product.productQuantity}</p>
//         </div>
//       ))}

      
//     </div>
//   );
// };

// export default AboutList;
