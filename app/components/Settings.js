import React, { Component, PropTypes } from 'react';
import { miliToMin, minToMili } from '../../common/helpers/conversion';
import { Link } from 'react-router';

class Settings extends Component {
  static propTypes = {
    setWorkDuration: PropTypes.func.isRequired,
    setShortBreakDuration: PropTypes.func.isRequired,
    setLongBreakDuration: PropTypes.func.isRequired,
    setSetCount: PropTypes.func.isRequired,
    settings: PropTypes.object.isRequired
  };


  setTime(cb, event) {
    return cb(minToMili(parseFloat(event.target.value) || 0));
  }

  render() {
    const { settings, setWorkDuration, setShortBreakDuration, setLongBreakDuration, setSetCount } = this.props;

    return (
      <div>
        <label>Work:
          <input
            type="text"
            onChange={this.setTime.bind(setWorkDuration)}
            value={miliToMin(settings.workDuration)} />
        </label>
        <label>Short Break:
          <input
            type="text"
            onChange={this.setTime.bind(setShortBreakDuration)}
            value={miliToMin(settings.shortBreakDuration)} />
        </label>
        <label>Long Break:
          <input
            type="text"
            onChange={this.setTime.bind(setLongBreakDuration)}
            value={miliToMin(settings.longBreakDuration)} />
        </label>
        <label>Set Count:
          <input
            type="text"
            onChange={setSetCount}
            value={miliToMin(settings.setCount)} />
        </label>
          <Link to="/">Done</Link>
      </div>
    );
  }
}

export default Settings;
