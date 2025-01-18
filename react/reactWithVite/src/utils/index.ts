/**
 * 合并多个数组
 * @param arrays
 * @returns 合并后的数组
 */
const concatArrays = <T>(...arrays: T[][]): T[] =>
  arrays.reduce((acc, cur) => acc.concat(cur), []);

export { concatArrays };
