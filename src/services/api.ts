import type { AuthSession } from '../types';
import { generateCsrfToken } from '../utils/security';
import { secureStorage } from '../utils/storage';

const API_BASE = import.meta.env.VITE_API_URL ?? '/api';

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const session = secureStorage.getSession<AuthSession>();
  const csrfToken = secureStorage.getCsrfToken();

  const headers = new Headers(options.headers);
  headers.set('Content-Type', 'application/json');

  if (session?.token) {
    headers.set('Authorization', `Bearer ${session.token}`);
  }
  if (csrfToken && options.method && options.method !== 'GET') {
    headers.set('X-CSRF-Token', csrfToken);
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
    credentials: 'same-origin',
  });

  if (!response.ok) {
    throw new ApiError('Request failed', response.status);
  }

  return response.json() as Promise<T>;
}

export function initCsrfToken(): void {
  if (!secureStorage.getCsrfToken()) {
    secureStorage.setCsrfToken(generateCsrfToken());
  }
}
