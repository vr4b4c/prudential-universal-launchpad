/**
 * API Base URL configuration
 *
 * Reads from environment variable VITE_API_BASE_URL
 * Falls back to 'http://localhost:3000' if not set
 */
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

let getToken: () => string | null = () => null;
let onUnauthorized: () => void = () => {};

export function apiSetGetToken(fn: () => string | null): void {
  getToken = fn;
}

export function setUnauthorizedHandler(fn: () => void): void {
  onUnauthorized = fn;
}

export async function apiFetch(
  url: string,
  options: RequestInit = {},
): Promise<Response> {
  const token = getToken();
  const headers = new Headers(options.headers);
  headers.set('Content-Type', 'application/json');
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  const response = await fetch(url, { ...options, headers });
  if (response.status === 401) {
    onUnauthorized();
  }
  return response;
}
