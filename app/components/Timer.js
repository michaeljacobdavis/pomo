import React, { Component, PropTypes } from 'react';
import styles from './Timer.module.css';
import formatTime from '../../common/format-time';
import TitleBar from './TitleBar';
import Schedule from './Schedule';
import { Link } from 'react-router';

const Timer = ({schedule, timer, timerStart, timerStop}) => {
  const time = formatTime(schedule.list[schedule.current].duration - (timer.current - timer.start));

  return (
    <div className={timer.running ? styles['container-running'] : styles['container-paused']}>
      <TitleBar>
        <div className={styles['title-bar-container']}>
          {timer.running ?
            <i onClick={() => timerStop()} className={styles['title-bar-pause']}></i> :
            <i onClick={() => timerStart()} className={styles['title-bar-play']}></i>
          }
          <Link className={timer.running ? styles['title-bar-settings-running'] : styles['title-bar-settings-paused']} to="/settings" />
        </div>
      </TitleBar>
      <div className={styles.timer}>
        {time}
      </div>

      <Schedule schedule={schedule} />
    </div>
  );
};

Timer.propTypes = {
  timerStart: PropTypes.func.isRequired,
  timerStop: PropTypes.func.isRequired,
  timer: PropTypes.object.isRequired,
  schedule: PropTypes.object.isRequired
};

export default Timer;
