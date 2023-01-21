import { AppProduct, ProductCtx } from 'models/product.model';
import queryString from 'query-string';

const BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_ENDPOINT}/ai-engine/api/v2.0`;
const GET_PRODUCTS_URL = (): string => `/product/search`;

type Args = { q?: string | null; namedTags?: string; isReady?: string };
export const getProducts = async (
  args?: Args,
  pageParam?: number,
): Promise<{ products: AppProduct[]; from: number }> => {
  try {
    let filters: Record<string, unknown> = { q: args?.q };

    if (args) {
      (Object.keys(args) as (keyof typeof args)[]).forEach((key) => {
        if (args[key] && key !== 'q') {
          filters[`filters.${key}`] = args[key];
        }
      });
    }
    const query = queryString.stringify(args ? filters : {});

    const request = await fetch(
      `${BASE_URL}${GET_PRODUCTS_URL()}?size=24&from=${pageParam}${
        query !== '' ? `&${query}` : ''
      }`,
    );
    const response = await request.json();

    const products: { products: AppProduct[]; from: number } = {
      from: pageParam || 0,
      products: (response.products as ProductCtx[]).map((product) => ({
        id: product.id,
        title: product.name,
        image: product.photo.SMALL,
        vendor: product.vendor.name,
        status: product.status.title,
        category: product.categoryTitle,
      })),
    };

    return products;
  } catch (e) {
    throw new Error(e as string);
  }
};
