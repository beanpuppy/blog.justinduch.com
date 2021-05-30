import { writable } from 'svelte/store';

const createPersistStore = (key, startValue) => {
  const { subscribe, set, update } = writable(startValue);

  return {
    subscribe,
    update,
    set,
    useSessionStorage: () => {
      const json = sessionStorage.getItem(key);

      if (json) {
        set(JSON.parse(json));
      }

      subscribe(current => {
        sessionStorage.setItem(key, JSON.stringify(current));
      });
    },
    useLocalStorage: () => {
      const json = localStorage.getItem(key);

      if (json) {
        set(JSON.parse(json));
      }

      subscribe(current => {
        localStorage.setItem(key, JSON.stringify(current));
      });
    }
  };
}

export default createPersistStore;
