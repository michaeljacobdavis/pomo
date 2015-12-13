import React, { Component, PropTypes } from 'react';
import styles from './TitleBar.module.css';

class TitleBar extends Component {
  static propTypes = {
    children: PropTypes.element
  };

  render() {
    return (
      <div className={styles.container}>
        {this.props.children}
      </div>
    );
  }
}

export default TitleBar;
