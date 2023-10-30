export const API_ENDPOINT = "http://localhost:5000/api";
export const API_ENDPOINT_SECURE = "https://localhost:5000/api";

type TParam = string | undefined;

type ApiEndpoints<Param extends TParam = undefined> =
  | `games?hostId=${Param}` // /{userId}

  | `users/${Param}` // /{username}
  | `users/${Param}` // /{userId}

export type HttpMethods =
  | 'GET'
  | 'POST'
  | 'PUT'
  | 'DELETE';

type RequestOptions<TBody = any> = Omit<RequestInit, 'method' | 'body'> & {
  method?: HttpMethods;
  body?: TBody;
  noHeaders?: boolean;
  controller?: AbortController;
};

export async function Request<TData, Param extends TParam = undefined>(
  path: ApiEndpoints<Param>,
  {
    method = 'GET',
    body,
    noHeaders = false,
    controller = new AbortController(),
  }: RequestOptions | undefined = {}) {
  console.log(`Requesting ${path} with method ${method}`);

  const init: RequestInit = {
    method,
    body: body ? !noHeaders ? JSON.stringify(body) : body : undefined,
    headers: !noHeaders ? { 'Content-Type': 'application/json' } : undefined,
    signal: controller.signal,
  };

  const res = await fetch(API_ENDPOINT + ensureSlash(path), init).catch(err => {
    if (err instanceof Error && err.message.includes('Failed to fetch')) {
      return fetch(API_ENDPOINT_SECURE + ensureSlash(path), init);
    }

    console.error(`Failed to [${method}] ${path}`, err);
    throw err;
  });

  const clone = res.clone();
  const isSuccessful = res.status.toString().startsWith('2');

  try {
    return {
      success: isSuccessful,
      status: res.status,
      data: await res.json() as TData,
      text: await clone.text(),
    };
  } catch {
    return {
      success: isSuccessful,
      status: res.status,
      data: null as unknown as TData,
      text: await clone.text(),
    };
  }
}

export function ensureSlash(path: string) {
  return path.startsWith('/') ? path : '/' + path;
}