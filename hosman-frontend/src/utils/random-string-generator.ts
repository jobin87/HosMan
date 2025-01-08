/**
 * Random String Generator
 * */
export function randomString(length: number, random?: boolean) {
  var p = random
    ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    : 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  return [...Array(length)].reduce((a) => a + p[~~(Math.random() * p.length)], '');
}
