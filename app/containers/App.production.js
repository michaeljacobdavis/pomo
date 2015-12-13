import React, { Component, PropTypes} from 'react';
import TitleBar from '../components/TitleBar';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  };

  render() {
    return (
      <div>
        <TitleBar />
        {this.props.children}
      </div>
    );
  }
}
