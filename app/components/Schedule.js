import React, { Component, PropTypes } from 'react';
import styles from './Schedule.module.css';
import formatTime from '../../common/format-time';
import workTypeDisplay from '../../common/work-type-display';

class Schedule extends Component {
  static propTypes = {
    schedule: PropTypes.object.isRequired
  };

  renderSchedule(schedule, current) {
    return schedule.map((event, index) => {
      return (<div className={ (current === index) ? styles.current : styles.event } key={index}>
        {formatTime(event.duration)} {workTypeDisplay(event.type)}
      </div>);
    });
  }

  render() {
    const { schedule } = this.props;

    return (
      <div>
        {this.renderSchedule(schedule.list, schedule.current)}
      </div>
    );
  }
}

export default Schedule;
