/* eslint-env mocha */

import { expect } from 'chai';
import sinon from 'sinon';
import freeze from 'deep-freeze';
import timer, { initialState } from '../../../app/reducers/timer';
import { TIMER_START, TIMER_RESET } from '../../../common/action-types/timer';
import { SET_SCHEDULE_INDEX } from '../../../common/action-types/schedule';

let internals;

before(() => {
  freeze(initialState);
});

describe('timer', () => {
  beforeEach(() => {
    internals = {};
    internals.sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    internals.sandbox.restore();
  });

  describe('TIMER_START', () => {
    it('sets running to true', () => {
      const result = timer(initialState, { type: TIMER_START });
      expect(result.running).to.equal(true);
    });
  });

  describe('TIMER_RESET', () => {
    it('sets current to 0', () => {
      const result = timer(initialState, { type: TIMER_RESET });
      expect(result.current).to.equal(0);
    });
  });

  describe('SET_SCHEDULE_INDEX', () => {
    it('sets current to 0', () => {
      const result = timer(initialState, { type: SET_SCHEDULE_INDEX });
      expect(result.current).to.equal(0);
    });
  });
});
