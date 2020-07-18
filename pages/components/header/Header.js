import React from 'react'
import styles from './css/Header.module.css'
import Typography from "@material-ui/core/Typography";

const Header = ({}) => {
  return (
    <div className={styles.headerContainer}>
      <Typography variant="h4">Welcome to InfoCasas Test</Typography>
      <Typography variant="h5">{`Powered by <Felix Pacheco/>`}</Typography>
    </div>
  );
}

export default Header;
