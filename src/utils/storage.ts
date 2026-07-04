const SESSION_KEY = 'trendwear_session';
const CSRF_KEY = 'trendwear_csrf';
const LOGIN_ATTEMPTS_KEY = 'trendwear_login_attempts';
const LOCKOUT_UNTIL_KEY = 'trendwear_lockout_until';

const MAX_LOGIN_ATTEMPTS = 5;
const LOCKOUT_MS = 15 * 60 * 1000;

function safeParse<T>(value: string | null): T | null {
  if (!value) return null;
  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

export const secureStorage = {
  getSession<T>(): T | null {
    return safeParse<T>(sessionStorage.getItem(SESSION_KEY));
  },

  setSession<T>(session: T): void {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
  },

  clearSession(): void {
    sessionStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem(CSRF_KEY);
  },

  getCsrfToken(): string | null {
    return sessionStorage.getItem(CSRF_KEY);
  },

  setCsrfToken(token: string): void {
    sessionStorage.setItem(CSRF_KEY, token);
  },

  recordFailedLogin(): number {
    const attempts = Number(sessionStorage.getItem(LOGIN_ATTEMPTS_KEY) ?? '0') + 1;
    sessionStorage.setItem(LOGIN_ATTEMPTS_KEY, String(attempts));
    if (attempts >= MAX_LOGIN_ATTEMPTS) {
      sessionStorage.setItem(LOCKOUT_UNTIL_KEY, String(Date.now() + LOCKOUT_MS));
    }
    return attempts;
  },

  clearLoginAttempts(): void {
    sessionStorage.removeItem(LOGIN_ATTEMPTS_KEY);
    sessionStorage.removeItem(LOCKOUT_UNTIL_KEY);
  },

  isLockedOut(): { locked: boolean; remainingMs: number } {
    const until = Number(sessionStorage.getItem(LOCKOUT_UNTIL_KEY) ?? '0');
    if (!until || Date.now() >= until) {
      return { locked: false, remainingMs: 0 };
    }
    return { locked: true, remainingMs: until - Date.now() };
  },
};
