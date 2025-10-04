import { db, persistDb } from './db';
import { Item, User } from '../types';
import { generateItem, generateUser, Overrides } from './data-generators';
import { hash } from './utils';
import { users as mockUsers } from './mock-data';

export const createUser = (user: Overrides<User>) => {
  const newUser = generateUser(user);
  return db.user.create({
    ...newUser,
    password: hash(newUser.password),
  });
};

export const seedUsers = (users: Array<Partial<User>>) => {
  const createdUsers = users.map((user) => createUser(user));
  persistDb('user');
  return createdUsers;
};

export const createItem = (item: Overrides<Item>) => {
  const newItem = generateItem(item);
  return db.item.create({
    ...newItem,
  });
};

export const seedItems = () => {
  const items = Array.from({ length: 200 }, () => generateItem());
  const createdItems = items.map((item) => createItem(item));
  persistDb('item');
  return createdItems;
};

export const runSeeders = () => {
  seedUsers(mockUsers);
  seedItems();
  return;
};
