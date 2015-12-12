import React, { Component, PropTypes } from 'react';
import styles from './Counter.module.css';
import formatTime from '../../common/format-time';
import { Link } from 'react-router';

class Counter extends Component {
  static propTypes = {
    timerStart: PropTypes.func.isRequired,
    timerStop: PropTypes.func.isRequired,
    counter: PropTypes.object.isRequired,
    schedule: PropTypes.object.isRequired
  };

  render() {
    const { schedule, counter, timerStart, timerStop } = this.props;
    const time = formatTime(schedule.list[schedule.current].duration - (counter.current - counter.start));

    return (
      <div>
        <div className={styles.counter}>
          {time}
        </div>
        <button onClick={() => timerStart()}>Start</button>
        <button onClick={() => timerStop()}>Stop</button>

        <Link to="/settings">Settings</Link>
      </div>
    );
  }
}

export default Counter;
