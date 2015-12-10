import React, { Component, PropTypes } from 'react';
import { miliToMin, minToMili } from '../../common/helpers/conversion';
import { Link } from 'react-router';

class Settings extends Component {
  static propTypes = {
    setDuration: PropTypes.func.isRequired,
    settings: PropTypes.object.isRequired
  };


  setDuration(event) {
    return this.props.setDuration(minToMili(parseFloat(event.target.value) || 0));
  }

  render() {
    const { settings } = this.props;

    return (
      <div>
        <input
          type="text"
          onChange={this.setDuration.bind(this)}
          value={miliToMin(settings.duration)} />
          <Link to="/">Done</Link>
      </div>
    );
  }
}

export default Settings;
