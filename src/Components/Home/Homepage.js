import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './Homepage.css';
import axios from "axios"; 
import { Link } from "react-router-dom";

const Homepage = () => {
  const [categories, setCategories] = useState([]);
  const [hoveredCategoryId, setHoveredCategoryId] = useState(null);
  const [subcategories, setSubcategories] = useState([]);
  const navigate = useNavigate();
  const [showMore, setShowMore] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      console.log('Scrolled!');
      const scrolled = window.scrollY > 0;
      setIsScrolled(scrolled);
    };
    

    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [])

  const headerClassName = isScrolled ? "header scrolled" : "header";

  useEffect(() => {
    axios.get("http://localhost:8080/api/Categories/getAllCategories")
      .then((response) => {
        console.log("Received data from API:", response.data); 
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  useEffect(() => {
    if (hoveredCategoryId !== null) {
      axios.get(`http://localhost:8080/api/subcategroy/getByCategory/${hoveredCategoryId}`)
        .then((response) => {
          console.log("Received subcategories from API:", response.data);
          setSubcategories(response.data);
        })
        .catch((error) => {
          console.error("Error fetching subcategories:", error);
        });
    }
  }, [hoveredCategoryId]);

  const categoryStyle = {
    textDecoration: 'none',
    color: '#fff',
    display: 'inline-block',
    maxWidth: '150px', 
    whiteSpace: 'nowrap', 
    overflow: 'hidden',
    textOverflow: 'ellipsis', 
    fontWeight: 'bold',
  };

  const subcategoryStyle = {
    padding: '5px',
    backgroundColor: '#F4EDEB',
    borderBottom: '1px solid #ddd',
    cursor: 'pointer',
    color: '#000',
    width: '200px',
  };

  const headerStyle = {
    height: '60px', // Set a fixed height for the header
    position: 'relative',
  };

  const subcategoriesDropdownStyle = {
    position: 'absolute',
    backgroundColor: '#fff',
    boxShadow: '0px 10px 12px rgba(0, 0, 0, 0.9)',
    zIndex: '999',
  };

  const handleCategoryMouseEnter = (categoryId) => {
    setHoveredCategoryId(categoryId);
  };

  const handleCategoryMouseLeave = () => {
    setHoveredCategoryId(null);
  };

  return (
    <div className="homepage">
    <header className={headerClassName} style={headerStyle}>
  <nav className="nav">
    <div className="categories-scroll-container">
      <ul className="sub-categories">
        {categories.map((category) => (
          <li
            key={category.categoryId}
            onMouseEnter={() => handleCategoryMouseEnter(category.categoryId)}
            onMouseLeave={handleCategoryMouseLeave}
          >
           <div className="category" style={{ ...categoryStyle, color: 'black' }} title={category.categoryNames}>
  {category.categoryNames}
</div>

            {hoveredCategoryId === category.categoryId && (
              <div className="subcategories-dropdown" style={subcategoriesDropdownStyle}>
                {subcategories.map((subcategory) => (
                  <div
                    key={subcategory.subId}
                    style={subcategoryStyle}
                    onClick={() => navigate(`/products/${subcategory.subId}`)}
                  >
                    {subcategory.subCategoryNames}
                  </div>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  </nav>
</header>
</div>
      
  );
};

export default Homepage;
