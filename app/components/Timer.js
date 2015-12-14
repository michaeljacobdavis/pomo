import React, { Component, PropTypes } from 'react';
import styles from './Timer.module.css';
import formatTime from '../../common/format-time';
import TitleBar from './TitleBar';
import Schedule from './Schedule';
import { Link } from 'react-router';

class Timer extends Component {
  static propTypes = {
    timerStart: PropTypes.func.isRequired,
    timerStop: PropTypes.func.isRequired,
    timer: PropTypes.object.isRequired,
    schedule: PropTypes.object.isRequired
  };

  colorStatus(status, running, paused) {
    return status ? running : paused;
  }

  render() {
    const { schedule, timer, timerStart, timerStop } = this.props;
    const time = formatTime(schedule.list[schedule.current].duration - (timer.current - timer.start));

    return (
      <div className={this.colorStatus(timer.running, styles['container-running'], styles['container-paused'])}>
        <TitleBar>
          <Link to="/settings">
            <i className={[this.colorStatus(timer.running, styles['title-bar-item-running'], styles['title-bar-item-paused']), 'fa', 'fa-cog'].join(' ')}></i>
          </Link>
        </TitleBar>
        <div className={styles.timer}>
          {time}
        </div>
        <button onClick={() => timerStart()}>Start</button>
        <button onClick={() => timerStop()}>Stop</button>

        <Schedule schedule={schedule} />
      </div>
    );
  }
}

export default Timer;
