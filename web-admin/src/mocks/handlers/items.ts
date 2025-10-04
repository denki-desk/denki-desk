import { http, HttpResponse } from 'msw';
import { db } from '../db';
import { env } from '../../libs/env';
import { getValueNumber, getValueString, requireAuth } from '../utils';

export const itemsHandlers = [
  http.get(`${env.API_URL}/items`, ({ request, cookies }) => {
    try {
      requireAuth(cookies);

      const url = new URL(request.url);
      const page = getValueNumber(url.searchParams.get('page')) || 1;
      const limit = getValueNumber(url.searchParams.get('limit')) || 10;
      const search = getValueString(url.searchParams.get('q')) || '';

      const where = {
        name: search ? { contains: search } : undefined,
      };

      const items = db.item.findMany({
        where,
        take: limit,
        skip: (page - 1) * limit,
      });

      const total = db.item.count();

      const totalPages = Math.ceil(total / limit);

      return HttpResponse.json({
        data: items,
        meta: {
          page,
          total,
          totalPages,
        },
      });
    } catch (error) {
      throw error;
    }
  }),
];
