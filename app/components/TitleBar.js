import React, { Component, PropTypes } from 'react';
import styles from './TitleBar.module.css';
import { Link } from 'react-router';

class TitleBar extends Component {
  static propTypes = {
    children: PropTypes.element
  };

  render() {
    return (
      <div className={styles.container}>
        {this.props.children}
        <Link to="/settings"><i className={[styles.item, 'fa', 'fa-cog'].join(' ')}></i></Link>
      </div>
    );
  }
}

export default TitleBar;
