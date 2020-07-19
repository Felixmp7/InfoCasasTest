import React from 'react'
import styles from './css/Header.module.css'

const Header = ({}) => {
  return (
    <div className={styles.headerContainer}>
      <h4 className={styles.welcome}>Welcome to InfoCasas Test</h4>
      <h5 className={styles.powered}>{`Powered by <Felix Pacheco/>`}</h5>
    </div>
  );
}

export default Header;
