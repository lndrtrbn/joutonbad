/**
 * Get data from localstorage.
 *
 * @param key The key to retrieve in local storage.
 * @returns The data associated to the key.
 */
export function getLocalItem<T>(key: string): T | undefined {
  const dataStr = localStorage.getItem(key);
  let data: T | undefined;
  if (dataStr) {
    data = JSON.parse(dataStr);
  }
  return data;
}

/**
 * Store data in the localstorage.
 *
 * @param key The key to use to store the data.
 * @param data The data to store.
 */
export function setLocalItem<T>(key: string, data: T | undefined) {
  if (!data) {
    localStorage.removeItem(key);
  } else {
    localStorage.setItem(key, JSON.stringify(data));
  }
}
