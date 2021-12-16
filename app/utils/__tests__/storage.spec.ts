import storage from "../storage";
import { ThemeMode } from '../constants';

describe("Storage tests", () => {
  beforeEach(() => {
    window.localStorage.__proto__.setItem = jest.fn();
    window.localStorage.__proto__.getItem = jest.fn();

    window.localStorage.__proto__.getItem.mockClear();
  });

  it("should set storage item", () => {
    storage.set("theme", 'light');

    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith("theme", 'light');
  });

  it("should get storage item", () => {
    window.localStorage.__proto__.getItem.mockImplementation(() => ThemeMode.DARK);

    const value = storage.get("theme");

    expect(localStorage.getItem).toHaveBeenCalledTimes(1);
    expect(localStorage.getItem).toHaveBeenCalledWith('theme');
    expect(value).toEqual(ThemeMode.DARK);
  });

  it("should get default value when item is not found", () => {
    window.localStorage.__proto__.getItem.mockImplementation(() => undefined);

    const value = storage.get("theme", 'light');

    expect(localStorage.getItem).toHaveBeenCalledTimes(1);
    expect(localStorage.getItem).toHaveBeenCalledWith('theme');
    expect(value).toEqual('light');
  });
});
