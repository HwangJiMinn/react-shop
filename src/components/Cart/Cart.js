import React, { useContext, useState } from 'react';
import styles from './Cart.module.css';
import { CartContext } from '../../contexts/CartContext';
import { toast, ToastContainer } from 'react-toastify';
import Modal from 'react-modal';

const Cart = () => {
    const { cartItems, addToCart, removeFromCart, setCartItems } = useContext(CartContext);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const updateQuantity = (id, newQuantity) => {
      const itemToUpdate = cartItems.find((item) => item.id === id);

      if (newQuantity < 1) {
        removeFromCart(id);
        return;
      }

      if (newQuantity > itemToUpdate.quantity) {
        addToCart(itemToUpdate);
      } else {
        removeFromCart(id);
      }
    };

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };
    
    Modal.setAppElement('#root');
    const openModal = () => {
        setModalIsOpen(true);
      };
    
      const closeModal = () => {
        setModalIsOpen(false);
      };
    
      const purchase = () => {
        toast.success('구매 완료');
        setCartItems([]);
        closeModal();
      };


    return (
        <div className={styles.cartContainer}>
            <h1 className={styles.cartBasket}>장바구니</h1>
            <ul className={styles.cartItems}>
            {cartItems.map((item) => (
                <li key={item.id} className={styles.cartItem}>
                <div className={styles.cartItemImageWrapper}>
                <img src={item.image} alt={item.title} className={styles.cartItemImage} />
                </div>
                <div className={styles.cartItemInfo}>
                    <h2 className={styles.cartItemTitle}>{item.title}</h2>
                    <p className={styles.cartItemPrice}>{(item.price * item.quantity).toLocaleString()}$</p>
                    <div className={styles.cartItemQuantity}>
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                    </div>
                </div>
                </li>
            ))}
            </ul>
            <div className={styles.totalPrice}>
                <h2 className={styles.cartItemQuantity}>총 가격: {getTotalPrice().toLocaleString()}$</h2>
                <button className={styles.purchaseButton} onClick={openModal}>구매하기</button>
                <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className={styles.modal} overlayClassName={styles.modalOverlay}>
                    <h2>구매 확인</h2>
                    <p>정말로 구매하시겠습니까? 장바구니의 모든 상품들이 삭제됩니다.</p>
                    <button className={styles.modalConfirmButton} onClick={purchase}>네</button>
                    <button className={styles.modalCancelButton} onClick={closeModal}>아니오</button>
                </Modal>
                <ToastContainer />
            </div>
        </div>
    );
};

export default Cart;