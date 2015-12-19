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
        <div className={styles.container}>
        <TitleBar>
          <div className={styles['title-bar-container']}>
            <Link className={timer.running ? styles['title-bar-back-running'] : styles['title-bar-back-paused']} to="/" />
            <h3 className={styles.heading}>Settings</h3>
            <span className={styles['title-bar-empty']}></span>
          </div>
        </TitleBar>


        <div className={styles['input-container']}>
          <label className={styles.label}>Work:
            <input
              className={styles.input}
              type="number"
              step="1"
              min="1"
              onChange={this.setTime.bind(this, setWorkDuration)}
              defaultValue={miliToMin(settings.workDuration)} />
          </label>
        </div>
        <div className={styles['input-container']}>
          <label className={styles.label}>Short Break:
            <input
              className={styles.input}
              type="number"
              step="1"
              min="1"
              onChange={this.setTime.bind(this, setShortBreakDuration)}
              defaultValue={miliToMin(settings.shortBreakDuration)} />
          </label>
        </div>
        <div className={styles['input-container']}>
          <label className={styles.label}>Long Break:
            <input
              className={styles.input}
              type="number"
              step="1"
              min="1"
              onChange={this.setTime.bind(this, setLongBreakDuration)}
              defaultValue={miliToMin(settings.longBreakDuration)} />
          </label>
        </div>
        <div className={styles['input-container']}>
          <label className={styles.label}>Set Count:
            <input
              className={styles.input}
              type="number"
              step="1"
              min="1"
              max="6"
              onChange={this.setSetCount.bind(this)}
              defaultValue={settings.setCount} />
          </label>
        </div>
      </div>
    );
  }
}

export default Settings;
