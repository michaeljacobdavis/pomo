import React, { Component, PropTypes} from 'react';
import DevTools from './DevTools';
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
        <DevTools />
      </div>
    );
  }
}
