
import React, { useState, useEffect, useContext } from 'react';
import styles from './ProductPage.module.css';
import { useParams, useNavigate } from 'react-router-dom';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { CartContext } from '../../contexts/CartContext';

const ProductPage = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleGoToCart = () => {
    navigate('/cart');
  };

  return (
    <div className={styles.productPageContainer}>
      {product ? (
        <>
          <img src={product.image} alt={product.title} className={styles.productImage} />
          <div className={styles.productDetails}>
            <h2 className={styles.productTitle}>{product.title}</h2>
            <p className={styles.productDescription}>{product.description}</p>
            <div className={styles.rating}>
              {[1, 2, 3, 4, 5].map((num) => (
                num <= Math.round(product.rating.rate) ? (
                  <FaStar key={num} className={styles.starIcon} />
                ) : (
                  <FaRegStar key={num} className={styles.starIcon} />
                )
              ))}
              <span>{product.rating.rate}점/</span>
              <span> ({product.rating.count}명 참여)</span>
            </div>
            <p className={styles.productPrice}>${product.price}</p>
            <button className={styles.addToCartButton} onClick={handleAddToCart}>장바구니 담기</button>
            <button className={styles.goToCartButton} onClick={handleGoToCart}>장바구니 이동</button>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProductPage;