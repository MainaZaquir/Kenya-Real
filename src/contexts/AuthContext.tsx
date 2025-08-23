import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { User } from '../types';

interface SignupData {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: 'buyer' | 'agent'; // admin is restricted (seeded only)
}

interface AuthResult {
  success: boolean;
  error?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<AuthResult>;
  signup: (userData: SignupData) => Promise<AuthResult>;
  logout: () => void;
  isLoading: boolean;
}

const USERS_KEY = 'kenyareal_users';
const SESSION_KEY = 'kenyareal_user';

type StoredUser = User & { password: string };

const seedUsers: StoredUser[] = [
  {
    id: '1',
    name: 'John Buyer',
    email: 'buyer@example.com',
    password: 'password123',
    phone: '+254722123456',
    avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150',
    role: 'buyer',
    savedProperties: ['1', '2'],
    preferences: {
      maxPrice: 5000000,
      minBedrooms: 2,
      preferredAreas: ['Kilimani', 'Westlands'],
      propertyTypes: ['apartment', 'house']
    }
  },
  {
    id: '2',
    name: 'Sarah Agent',
    email: 'agent@example.com',
    password: 'password123',
    phone: '+254733987654',
    avatar: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=150',
    role: 'agent',
    savedProperties: [],
    preferences: { maxPrice: 0, minBedrooms: 0, preferredAreas: [], propertyTypes: [] }
  },
  {
    id: '3',
    name: 'Admin User',
    email: 'admin@kenyareal.co.ke',
    password: 'admin123',
    phone: '+254700123456',
    avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150',
    role: 'admin',
    savedProperties: [],
    preferences: { maxPrice: 0, minBedrooms: 0, preferredAreas: [], propertyTypes: [] }
  }
];

function readUsers(): StoredUser[] {
  const raw = localStorage.getItem(USERS_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    localStorage.removeItem(USERS_KEY);
    return [];
  }
}

function writeUsers(users: StoredUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

const ensureSeeded = () => {
  const current = readUsers();
  if (current.length === 0) {
    writeUsers(seedUsers);
    return seedUsers;
  }
  // Ensure admin exists (in case someone cleared users partially)
  const hasAdmin = current.some(u => u.role === 'admin' && u.email === 'admin@kenyareal.co.ke');
  if (!hasAdmin) {
    const merged = [...current, seedUsers.find(u => u.email === 'admin@kenyareal.co.ke')!];
    writeUsers(merged);
    return merged;
  }
  return current;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // boot
  useEffect(() => {
    const users = ensureSeeded();

    const storedUser = localStorage.getItem(SESSION_KEY);
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem(SESSION_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<AuthResult> => {
    setIsLoading(true);
    try {
      await new Promise(r => setTimeout(r, 600));
      const users = ensureSeeded();
      const found = users.find(u => u.email === email);
      if (!found) return { success: false, error: 'No account found for that email.' };
      if (found.password !== password) return { success: false, error: 'Incorrect password.' };

      const { password: _pw, ...safeUser } = found;
      setUser(safeUser);
      localStorage.setItem(SESSION_KEY, JSON.stringify(safeUser));
      return { success: true };
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (data: SignupData): Promise<AuthResult> => {
    setIsLoading(true);
    try {
      await new Promise(r => setTimeout(r, 700));
      const users = ensureSeeded();

      const exists = users.some(u => u.email.toLowerCase() === data.email.toLowerCase());
      if (exists) return { success: false, error: 'A user with that email already exists.' };

      // Prevent creating admin via signup
      if (data.role !== 'buyer' && data.role !== 'agent') {
        return { success: false, error: 'Invalid role.' };
      }

      const newUser: StoredUser = {
        id: String(Date.now()),
        name: data.name,
        email: data.email,
        password: data.password,
        phone: data.phone,
        avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150',
        role: data.role,
        savedProperties: [],
        preferences: { maxPrice: 0, minBedrooms: 0, preferredAreas: [], propertyTypes: [] }
      };

      const next = [...users, newUser];
      writeUsers(next);

      const { password, ...safeUser } = newUser;
      setUser(safeUser);
      localStorage.setItem(SESSION_KEY, JSON.stringify(safeUser));

      return { success: true };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(SESSION_KEY);
  };

  const value = useMemo(() => ({ user, login, signup, logout, isLoading }), [user, isLoading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
