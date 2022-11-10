export const randomFromList = <T>(arr: Array<T>): T => {
  return arr[Math.floor(Math.random() * arr.length)];
};

export const randomInt=(min: number, max: number): number =>{
  return Math.floor(min + Math.random() * (max - min + 1));
}
