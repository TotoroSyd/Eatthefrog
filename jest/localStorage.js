"use strict";

export default class LocalStorage {
  constructor() {
    this.store = {};
  }
  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = value.toString();
  }

  removeItem(key) {
    delete this.store[key];
  }
}

/* Note
  // localStorage.test.js
import localStorage from './localStorage';

describe('localStorage', () => {
  beforeEach(() => localStorage.clear());

  it('is initialized properly', () => expect(localStorage.store).toEqual({}));

  it("returns undefined if requested item doesn't exist", () => {
    const foo = localStorage.getItem('foo');
    expect(foo).toBeUndefined();
  });

  it('sets the value of an item', () => {
    localStorage.setItem('foo', 'bar');
    expect(localStorage.store).toEqual({ foo: 'bar' });
  });

  it('gets the value of an item', () => {
    localStorage.setItem('foo', 'bar');
    const foo = localStorage.getItem('foo');
    expect(foo).toBe('bar');
  });

  it('removes an item', () => {
    localStorage.setItem('foo', 'bar');
    localStorage.removeItem('foo');
    const foo = localStorage.getItem('foo');
    expect(foo).toBeUndefined();
  });

  it('clears all items', () => {
    localStorage.setItem('foo', 'qwerty');
    localStorage.setItem('bar', 'asdf');
    expect(localStorage.store).toEqual({ foo: 'qwerty', bar: 'asdf' });
    localStorage.clear();
    expect(localStorage.store).toEqual({});
  });
});

*/
