import { db, persistDb } from './db';
import { User } from '../types';
import { generateUser, Overrides } from './data-generators';
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

export const runSeeders = () => {
  seedUsers(mockUsers);
  return;
};
