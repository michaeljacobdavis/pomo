import React, { Component, PropTypes } from 'react';
import styles from './TitleBar.module.css';

const TitleBar = ({children}) => {
  return (
    <div className={styles.container}>
    {children}
    </div>
  );
};

TitleBar.propTypes = {
  children: PropTypes.element
};

export default TitleBar;
