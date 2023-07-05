import React, { useState, useEffect } from 'react';
import styles from './ProductList.module.css';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const ProductList = ({}) => {
    const [productsByCategory, setProductsByCategory] = useState([]);
    const { category } = useParams();
    const selectedCategory = category || null;

    const categories = [
        { key: 'fashion', values: ["men's clothing", "women's clothing"] },
        { key: 'jewelery', values: ['jewelery'] },
        { key: 'electronics', values: ['electronics'] },
      ];
      const categoryTitles = {
        'fashion': '패션',
        'jewelery': '악세서리',
        'electronics': '디지털',
      };
    
      useEffect(() => {
        fetch('https://fakestoreapi.com/products')
          .then((res) => res.json())
          .then((data) => {
            if (selectedCategory) {
              const category = categories.find((category) => category.key === selectedCategory);
              const filteredData = data.filter((product) => category.values.includes(product.category));
              const products = [
                {
                  title: categoryTitles[selectedCategory],
                  products: filteredData
                },];
              setProductsByCategory(products);
            } else {
              const products = categories.map((category) => {
                const filteredData = data.filter((product) => category.values.includes(product.category));
                return {
                  title: categoryTitles[category.key],
                  products: filteredData.slice(0, 4),
                };
              });
              setProductsByCategory(products);
            }
          });
      }, [selectedCategory]);


    
  
  return (
    <div className={styles.productListContainer}>
      {productsByCategory.map((category, index) => (
        <div key={index} className={styles.categoryContainer}>
          <h2 className={styles.categoryTitle}>{category.title}</h2>
          <div className={styles.products}>
            {category.products.map((product) => (
              <Link to={`/product/${product.id}`} key={product.id}>
                <div className={styles.productCard}>
                  <div className={styles.productImageWrapper}>
                    <img
                      src={product.image}
                      alt={product.title}
                      className={styles.productImage}
                    />
                  </div>
                  <h2 className={styles.productTitle}>{product.title}</h2>
                  <p className={styles.productPrice}>${product.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;