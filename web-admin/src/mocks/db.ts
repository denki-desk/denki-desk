import { factory } from '@mswjs/data';
import { models } from './models';

export const db = factory(models);

export type Models = keyof typeof models;

export const loadDb = () =>
  Object.assign(JSON.parse(window.localStorage.getItem('msw-db') || '{}'));

export const storeDb = (data: string) =>
  window.localStorage.setItem('msw-db', data);

export const persistDb = (model: Models) => {
  const data = loadDb();
  data[model] = db[model].getAll();
  storeDb(JSON.stringify(data));
};

export const initializeDb = () => {
  const database = loadDb();
  Object.entries(db).forEach(([key, model]) => {
    const dataEntries = database[key];
    if (dataEntries) {
      dataEntries.forEach((entry: Record<string, any>) => {
        model.create(entry);
      });
    }
  });
};

export const resetDb = () => {
  window.localStorage.clear();
};
