import React, { Component, PropTypes } from 'react';
import { miliToMin, minToMili } from '../../common/helpers';
import { Link } from 'react-router';

class Settings extends Component {
  static propTypes = {
    setDuration: PropTypes.func.isRequired,
    counter: PropTypes.object.isRequired
  };


  setDuration(event) {
    return this.props.setDuration(minToMili(parseFloat(event.target.value) || 0));
  }

  render() {
    const { counter } = this.props;

    return (
      <div>
        <input
          type="text"
          onChange={this.setDuration.bind(this)}
          value={miliToMin(counter.duration)} />
          <Link to="/">Done</Link>
      </div>
    );
  }
}

export default Settings;
