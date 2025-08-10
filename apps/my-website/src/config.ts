export const API_URL =
  import.meta.env.VITE_API_URL ??
  (import.meta.env.MODE === 'development'
    ? 'http://localhost:3333/api'
    : 'https://api.vooksio.com/api');
