import { useEffect, useState, type ReactNode } from 'react';
import { supabase } from '../lib/supabase';
import { AuthContext, type Profile } from './authContext';
import type { Session } from '@supabase/supabase-js';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .auth.getSession()
      .then(({ data }) => {
        setSession(data.session);
        setLoading(false);
      })
      .catch(() => setLoading(false));

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });

    return () => subscription.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const userId = session?.user.id;
    if (!userId) {
      setProfile(null);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const { data } = await supabase
          .from('profiles')
          .select('id, display_name, avatar_url')
          .eq('id', userId)
          .abortSignal(AbortSignal.timeout(15000))
          .single();
        if (!cancelled) setProfile(data);
      } catch {
        /* profile fetch failed or timed out - the UI just won't show a name/avatar yet */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [session?.user.id]);

  async function signInWithGoogle() {
    const redirectTo = window.location.origin + import.meta.env.BASE_URL;
    await supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo } });
  }

  async function signOut() {
    await supabase.auth.signOut();
  }

  return (
    <AuthContext.Provider value={{ session, profile, loading, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
