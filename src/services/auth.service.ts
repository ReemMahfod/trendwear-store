import type { AuthSession, User } from '../types';
import { generateCsrfToken, hashPassword } from '../utils/security';
import { secureStorage } from '../utils/storage';
import type { LoginInput, RegisterInput } from '../utils/validators';

const SESSION_DURATION_MS = 60 * 60 * 1000;

const SEEDED_USER: User & { passwordHash: string } = {
  id: '1',
  email: 'member@trendwear.com',
  name: 'Alex Morgan',
  role: 'user',
  passwordHash: '',
};

const registeredUsers = new Map<string, User & { passwordHash: string }>();

async function seedMemberAccount() {
  SEEDED_USER.passwordHash = await hashPassword('TrendWear1!');
  registeredUsers.set(SEEDED_USER.email, SEEDED_USER);
}

const seedReady = seedMemberAccount();

function createSession(user: User): AuthSession {
  return {
    token: crypto.randomUUID(),
    expiresAt: Date.now() + SESSION_DURATION_MS,
    user,
  };
}

function toPublicUser(user: User & { passwordHash?: string }): User {
  const { passwordHash: _, ...publicUser } = user as User & { passwordHash?: string };
  return publicUser;
}

function genericAuthError(): Error {
  return new Error('Invalid email or password');
}

export const authService = {
  async login(input: LoginInput): Promise<AuthSession> {
    await seedReady;
    const lockout = secureStorage.isLockedOut();
    if (lockout.locked) {
      const minutes = Math.ceil(lockout.remainingMs / 60000);
      throw new Error(`Too many attempts. Try again in ${minutes} min.`);
    }

    await delay(350);

    const passwordHash = await hashPassword(input.password);
    const user = registeredUsers.get(input.email.toLowerCase());

    if (!user || user.passwordHash !== passwordHash) {
      secureStorage.recordFailedLogin();
      throw genericAuthError();
    }

    secureStorage.clearLoginAttempts();
    const session = createSession(toPublicUser(user));
    secureStorage.setSession(session);
    secureStorage.setCsrfToken(generateCsrfToken());
    return session;
  },

  async register(input: RegisterInput): Promise<AuthSession> {
    await seedReady;
    await delay(400);

    const email = input.email.toLowerCase();
    if (registeredUsers.has(email)) {
      throw new Error('Unable to create account. Please check your details.');
    }

    const passwordHash = await hashPassword(input.password);
    const newUser: User & { passwordHash: string } = {
      id: crypto.randomUUID(),
      email,
      name: input.name,
      role: 'user',
      passwordHash,
    };

    registeredUsers.set(email, newUser);
    const session = createSession(toPublicUser(newUser));
    secureStorage.setSession(session);
    secureStorage.setCsrfToken(generateCsrfToken());
    return session;
  },

  logout(): void {
    secureStorage.clearSession();
  },

  getCurrentSession(): AuthSession | null {
    const session = secureStorage.getSession<AuthSession>();
    if (!session) return null;
    if (Date.now() >= session.expiresAt) {
      secureStorage.clearSession();
      return null;
    }
    return session;
  },

  updateProfile(userId: string, data: Partial<User>): User {
    const session = secureStorage.getSession<AuthSession>();
    if (!session || session.user.id !== userId) {
      throw new Error('Unauthorized');
    }

    const stored = registeredUsers.get(session.user.email);
    if (!stored) throw new Error('User not found');

    const updated = { ...toPublicUser(stored), ...data };
    registeredUsers.set(stored.email, { ...stored, ...updated });
    const newSession = { ...session, user: updated };
    secureStorage.setSession(newSession);
    return updated;
  },
};

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
