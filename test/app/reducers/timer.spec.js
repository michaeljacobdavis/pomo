import { expect } from 'chai';
import sinon from 'sinon';
import timer from '../../../app/reducers/timer';
import { TIMER_START } from '../../../common/action-types/timer';
let internals;

describe('timer', () => {
  beforeEach(() => {
    internals = {};
    internals.sandbox = sinon.sandbox.create();
    internals.clock = sinon.useFakeTimers();
  });

  afterEach(() => {
    internals.sandbox.restore();
    internals.clock.restore();
  });

  describe('TIMER_START', () => {
    it('sets start to the current time', () => {
      const time = 120000;
      internals.clock.tick(time);
      const result = timer(timer.initialState, { type: TIMER_START });
      expect(result.start).to.equal(time);
    });

    it('sets running to true', () => {
      const result = timer(timer.initialState, { type: TIMER_START });
      expect(result.running).to.equal(true);
    });
  });
});
