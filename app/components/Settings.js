import React, { Component, PropTypes } from 'react';
import { miliToMin, minToMili } from '../../common/conversion';
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

  setSetCount(event) {
    return this.props.setSetCount(parseFloat(event.target.value) || 0);
  }

  render() {
    const { settings, setWorkDuration, setShortBreakDuration, setLongBreakDuration } = this.props;

    return (
      <div>
        <label>Work:
          <input
            type="number"
            onChange={this.setTime.bind(this, setWorkDuration)}
            defaultValue={miliToMin(settings.workDuration)} />
        </label>
        <label>Short Break:
          <input
            type="number"
            onChange={this.setTime.bind(this, setShortBreakDuration)}
            defaultValue={miliToMin(settings.shortBreakDuration)} />
        </label>
        <label>Long Break:
          <input
            type="number"
            onChange={this.setTime.bind(this, setLongBreakDuration)}
            defaultValue={miliToMin(settings.longBreakDuration)} />
        </label>
        <label>Set Count:
          <input
            type="number"
            onChange={this.setSetCount.bind(this)}
            defaultValue={settings.setCount} />
        </label>
          <Link to="/">Done</Link>
      </div>
    );
  }
}

export default Settings;
