export function promisify(callbackBasedFunction: any) {
  return function (...args: any) {
    return new Promise((resolve, reject) => {
      callbackBasedFunction(...args, (error: any, result: any) => {
        if (error) reject(error);
        else resolve(result);
      });
    });
  };
}
