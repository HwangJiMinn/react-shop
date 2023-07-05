import React, { useState, useEffect, useContext } from 'react';
import styles from './Nav.module.css';
import { FaSun, FaMoon, FaShoppingCart } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../../contexts/CartContext';

const Navbar = ({ theme ,toggleTheme, onLogoClick }) => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');
  const [products, setProducts] = useState([]);
  const { cartItems } = useContext(CartContext);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get('https://fakestoreapi.com/products');
      setProducts(response.data);
    };

    fetchProducts();
  }, []);

  const onSearch = (event) => {
    if (event.key === 'Enter') {
      navigate(`/search/${searchValue}`);
      setSearchValue('');
    }
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const filterProducts = (searchTerm) => {
    if (searchTerm === '') {
      return [];
    }

    return products.filter(product => product.title.toLowerCase().includes(searchTerm.toLowerCase()));
  };

  const searchResults = filterProducts(searchValue);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
    setSearchValue('');
  };
  return (
    <div className={styles.navbarContainer}>
      <h1 className={styles.logo}>
        <Link to="/" onClick={onLogoClick}>
          React Shop
        </Link>
      </h1>
      <ul className={styles.navItems}>
        <li className={styles.navItem}>
          <Link to="/category/fashion">패션</Link>
        </li>
        <li className={styles.navItem}>
          <Link to="/category/jewelery">악세서리</Link>
        </li>
        <li className={styles.navItem}>
          <Link to="/category/electronics">디지털</Link>
        </li>
      </ul>
      <button className={styles.themeToggleButton} onClick={toggleTheme}>
        {theme === 'light' ? <FaSun /> : <FaMoon />}
      </button>
      <div className={styles.searchContainer}>
        <input
          className={styles.input_wrap}
          type="search"
          placeholder="검색"
          value={searchValue}
          onChange={handleSearchChange}
          onKeyDown={onSearch}
        />
        <ul className={styles.searchResults}>
          {searchResults.slice(0, 5).map((product, index) => (
            <li key={index} className={styles.searchResultItem} onClick={() => handleProductClick(product.id)}>
              {product.title}
            </li>
          ))}
        </ul>
      </div>
      <button className={styles.cartButton}>
        <Link to="/cart"><FaShoppingCart /></Link>
        <span className={styles.cartItemCount}>{cartItems.reduce((count, item) => count + item.quantity, 0)}</span>
      </button>
    </div>
  );
};

export default Navbar;

