export type HttpRequestParams = {
  url: string;
  config: Record<string, unknown>;
  body?: Record<string, unknown>;
};

export type HttpClientParams<T> = {
  params?: T;
};
