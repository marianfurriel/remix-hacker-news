export function count(arr: any[], key: string): number {
  return arr.reduce((acc, item) => {
    if (item[key] && item[key].length) {
      const r = count(item[key], key);
      acc += r;
    }

    return acc + 1;
  }, 0);
}
