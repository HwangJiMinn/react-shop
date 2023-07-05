import React from 'react'
import { FaFacebook, FaGithub, FaInstagram } from "react-icons/fa";
import styles from "./Footer.module.css"

function Footer() {
    return (
      <footer className={styles.container}>
        <div className={styles.zero}>제로베이스</div>
        <img src='./visa-card-logo.png' alt="Visa Card logo" className={styles.img}/>
        <div className={styles.sns}>
          <div className={styles.FB}><a href="https://www.facebook.com/0base"><FaFacebook /></a></div>
          <div className={styles.IG}><a href='https://www.instagram.com/zerobase.official/'><FaInstagram /></a></div>
          <div className={styles.GH}><a href='https://github.com/oinochoe'><FaGithub /></a></div>
        </div>
        <div className={styles.copy}>
          Copyright © 2022 Zero Base
        </div>
      </footer>
    );
  }

export default Footer