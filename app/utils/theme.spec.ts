import storage from './storage';
import { ThemeMode } from './constants';

import { toggleMode } from './theme';

jest.mock('./storage', () => ({
  set: jest.fn(),
  get: jest.fn(),
}));

describe('Theme tests', () => {
  it('should toggle to light mode', () => {
    toggleMode(ThemeMode.LIGHT);

    expect(storage.set).toHaveBeenCalledTimes(1);
    expect(storage.set).toHaveBeenCalledWith('theme', ThemeMode.LIGHT);
  });

  it('should toggle to dark mode', () => {
    toggleMode(ThemeMode.DARK);

    expect(storage.set).toHaveBeenCalledTimes(1);
    expect(storage.set).toHaveBeenCalledWith('theme', ThemeMode.DARK);
  })

  it('should toggle to dark mode', () => {
    toggleMode('');
  })
});
