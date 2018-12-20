export const format = (str: string, ...args: any[]) => {
  return str.replace(/\{(\d+)\}/g, (match, index) => {
    const k = parseInt(index, 10);
    return args.length > k ? args[k] : '';
  });
};
