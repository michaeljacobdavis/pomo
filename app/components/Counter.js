import React, { Component, PropTypes } from 'react';
import styles from './Counter.module.css';

class Counter extends Component {
  static propTypes = {
    setDuration: PropTypes.func.isRequired,
    timerStart: PropTypes.func.isRequired,
    timerStop: PropTypes.func.isRequired,
    counter: PropTypes.object.isRequired
  };


  setDuration(event) {
    return this.props.setDuration(this.minToMili(parseFloat(event.target.value) || 0));
  }

  miliToMin(miliseconds) {
    return Math.floor(miliseconds / 60000);
  }

  minToMili(min) {
    return min * 60000;
  }

  format(duration) {
    let seconds = Math.floor((duration / 1000) % 60);
    let minutes = Math.floor((duration / (1000 * 60)) % 60);
    let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? '0' + hours : hours;
    minutes = (minutes < 10) ? '0' + minutes : minutes;
    seconds = (seconds < 10) ? '0' + seconds : seconds;

    return hours + ':' + minutes + ':' + seconds;
  }


  render() {
    const { counter, timerStart, timerStop } = this.props;
    return (
      <div>
        <div className={styles.counter}>
          {this.format(counter.duration - (counter.current - counter.start))}
        </div>
        <button onClick={() => timerStart()}>Start</button>
        <button onClick={() => timerStop()}>Stop</button>
        <input
          type="text"
          onChange={this.setDuration.bind(this)}
          value={this.miliToMin(counter.duration)} />
      </div>
    );
  }
}

export default Counter;
