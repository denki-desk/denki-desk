import { http, HttpResponse } from 'msw';
import { db } from '../db';
import { env } from '../../libs/env';

export const itemsHandlers = [
  http.get(`${env.API_URL}/items`, () => {
    const items = db.item.getAll();
    return HttpResponse.json({ data: items });
  }),
];
