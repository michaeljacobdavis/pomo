import React, { Component, PropTypes } from 'react';
import styles from './Counter.module.css';
import { miliToMin, minToMili, formatTime } from '../../common/helpers';

class Counter extends Component {
  static propTypes = {
    setDuration: PropTypes.func.isRequired,
    timerStart: PropTypes.func.isRequired,
    timerStop: PropTypes.func.isRequired,
    counter: PropTypes.object.isRequired
  };


  setDuration(event) {
    return this.props.setDuration(minToMili(parseFloat(event.target.value) || 0));
  }

  render() {
    const { counter, timerStart, timerStop } = this.props;
    const time = formatTime(counter.duration - (counter.current - counter.start));

    return (
      <div>
        <div className={styles.counter}>
          {time}
        </div>
        <button onClick={() => timerStart()}>Start</button>
        <button onClick={() => timerStop()}>Stop</button>
        <input
          type="text"
          onChange={this.setDuration.bind(this)}
          value={miliToMin(counter.duration)} />
      </div>
    );
  }
}

export default Counter;
