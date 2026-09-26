import type { Session } from '@supabase/supabase-js';
import { createContext, useContext } from 'react';

export interface Profile {
  id: string;
  display_name: string | null;
  avatar_url: string | null;
}

export interface AuthContextValue {
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
