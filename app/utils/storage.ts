function set(key: string, value: any) {
  localStorage.setItem(key, value);
}

function get(key: string, defaultValue?: any) {
  return localStorage.getItem(key) ?? defaultValue;
}

export default {
  set,
  get,
};
