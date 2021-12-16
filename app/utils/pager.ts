import type { ILocation } from "~/typings";

export function getUrlParams(location: ILocation) {
  const { pathname, search } = location;

  const route = pathname.split('/').filter((v: string) => v);
  const searchParams = new URLSearchParams(search);
  const page = parseInt(searchParams.get('p') ?? '');

  if (!page || typeof page !== 'number') {
    return { route, page: 1 };
  } 

  return { route, page };
}