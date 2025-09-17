import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    console.log('AuthProvider: Setting up auth state listener');
    
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, !!session);
        setSession(session);
        setUser(session?.user ?? null);
        
        // Check admin status when user logs in
        if (session?.user) {
          console.log('Checking admin status for user:', session.user.id);
          setTimeout(async () => {
            try {
              const { data: profile, error } = await supabase
                .from('profiles')
                .select('role')
                .eq('user_id', session.user.id)
                .maybeSingle();
              
              console.log('Profile data:', profile, 'Error:', error);
              const adminStatus = profile?.role === 'admin';
              console.log('Setting admin status to:', adminStatus);
              setIsAdmin(adminStatus);
            } catch (error) {
              console.error('Error checking admin status:', error);
              setIsAdmin(false);
            }
          }, 100); // Slightly longer delay to ensure database is ready
        } else {
          console.log('No user, setting admin to false');
          setIsAdmin(false);
        }
        
        setLoading(false);
      }
    );

    // THEN check for existing session
    console.log('AuthProvider: Checking for existing session');
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      console.log('Initial session check:', !!session);
      setSession(session);
      setUser(session?.user ?? null);
      
      // Check admin status for existing session
      if (session?.user) {
        console.log('Initial admin check for user:', session.user.id);
        try {
          const { data: profile, error } = await supabase
            .from('profiles')
            .select('role')
            .eq('user_id', session.user.id)
            .maybeSingle();
          
          console.log('Initial profile data:', profile, 'Error:', error);
          const adminStatus = profile?.role === 'admin';
          console.log('Initial admin status:', adminStatus);
          setIsAdmin(adminStatus);
        } catch (error) {
          console.error('Error checking initial admin status:', error);
          setIsAdmin(false);
        }
      } else {
        console.log('No initial user found');
        setIsAdmin(false);
      }
      
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const redirectUrl = `${window.location.origin}/`;
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    return { error };
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error);
    }
  };

  const value = {
    user,
    session,
    loading,
    signIn,
    signOut,
    isAdmin
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};