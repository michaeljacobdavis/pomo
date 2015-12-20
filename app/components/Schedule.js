import React, { Component, PropTypes } from 'react';
import styles from './Schedule.module.css';
import formatTime from '../../common/format-time';
import workTypeDisplay from '../../common/work-type-display';


const Schedule = ({schedule}) => {
  return (
    <div>
      {schedule.list.map((event, index) => {
        return (<div className={ (schedule.current === index) ? styles.current : styles.event } key={index}>
          {formatTime(event.duration)} {workTypeDisplay(event.type)}
        </div>);
      })}
    </div>
  );
};

Schedule.propTypes = {
  schedule: PropTypes.object.isRequired
};

export default Schedule;
