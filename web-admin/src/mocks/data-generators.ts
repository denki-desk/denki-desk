import {
  randEmail,
  randPassword,
  randPhoneNumber,
  randUserName,
  randUuid,
} from '@ngneat/falso';
import { User } from '../types';

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
