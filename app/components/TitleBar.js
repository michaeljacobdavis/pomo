import React, { Component } from 'react';
import styles from './TitleBar.module.css';
import { Link } from 'react-router';

class TitleBar extends Component {
  render() {
    return (
      <div className={styles.container}>
        <Link className={styles.item} to="/settings">Settings</Link>
      </div>
    );
  }
}

export default TitleBar;
