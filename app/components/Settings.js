import React, { Component, PropTypes } from 'react';
import TitleBar from './TitleBar';
import styles from './Settings.module.css';
import { miliToMin, minToMili } from '../../common/conversion';
import { Link } from 'react-router';

class Settings extends Component {
  static propTypes = {
    setWorkDuration: PropTypes.func.isRequired,
    setShortBreakDuration: PropTypes.func.isRequired,
    setLongBreakDuration: PropTypes.func.isRequired,
    setSetCount: PropTypes.func.isRequired,
    timer: PropTypes.object.isRequired,
    settings: PropTypes.object.isRequired
  };


  setTime(cb, event) {
    return cb(minToMili(parseFloat(event.target.value) || 0));
  }

  setSetCount(event) {
    return this.props.setSetCount(parseFloat(event.target.value) || 0);
  }

  render() {
    const { settings, timer, setWorkDuration, setShortBreakDuration, setLongBreakDuration } = this.props;

    return (
      <div>
        <TitleBar>
          <div className={styles['title-bar-container']}>
            <Link className={timer.running ? styles['title-bar-back-running'] : styles['title-bar-back-paused']} to="/" />
          </div>
        </TitleBar>

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
      </div>
    );
  }
}

export default Settings;
