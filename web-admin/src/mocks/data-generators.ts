import {
  randEmail,
  randNumber,
  randPassword,
  randPhoneNumber,
  randProductCategory,
  randProductName,
  randSentence,
  randUserName,
  randUuid,
} from '@ngneat/falso';
import { Item, User } from '../types';

export type Overrides<T> = Partial<T>;

export const generateUser = (overrides?: Overrides<User>) => ({
  id: randUuid() + Math.random(),
  username: randUserName({ withAccents: false }),
  password: randPassword(),
  storeId: randEmail() + Math.random(),
  name: randUserName({ withAccents: false }),
  role: 'admin',
  email: randEmail(),
  phone: randPhoneNumber(),
  createdAt: Date.now(),
  updatedAt: Date.now(),
  ...overrides,
});

export const generateItem = (overrides?: Overrides<Item>) => ({
  id: randUuid() + Math.random(),
  storeId: randEmail() + Math.random(),
  name: randProductName(),
  category: randProductCategory(),
  basePrice: randNumber({ min: 5, max: 1000 }),
  description: randSentence(),
  ...overrides,
});
