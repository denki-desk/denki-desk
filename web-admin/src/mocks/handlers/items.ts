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

      // Support multiple category params: category[]=Shoes&category[]=Clothes
      const categories = url.searchParams.getAll('category[]');
      const search =
        getValueString(url.searchParams.get('q'))?.trim().toLowerCase() || '';

      let filtered = db.item.getAll();

      // text search
      if (search) {
        filtered = filtered.filter((item) =>
          item.name?.toLowerCase().includes(search)
        );
      }

      // category multi-filter
      if (categories.length > 0) {
        filtered = filtered.filter((item) =>
          categories.includes(item.category)
        );
      }

      const total = filtered.length;
      const totalPages = Math.ceil(total / limit);
      const paginated = filtered.slice((page - 1) * limit, page * limit);

      return HttpResponse.json({
        data: paginated,
        meta: {
          page,
          total,
          totalPages,
        },
      });
    } catch (error) {
      console.error('Error /item handler: ', error);
      return HttpResponse.json(
        { message: 'Internal server error' },
        { status: 500 }
      );
    }
  }),
];
