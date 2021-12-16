import storage from './storage';
import { ThemeMode } from './constants';

export function toggleMode(themeKey: string) {
  if (themeKey == ThemeMode.DARK) {
    document.documentElement.classList.add("dark");
    storage.set('theme', themeKey);
  } 

  if (themeKey === ThemeMode.LIGHT) {
    document.documentElement.classList.remove("dark");
    storage.set('theme', themeKey);
  }
}
