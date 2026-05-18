import { useEffect, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export interface Profile {
  user_id: string;
  username: string;
  avatar_url: string | null;
}

interface AuthState {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
}

const listeners = new Set<(s: AuthState) => void>();
let state: AuthState = { user: null, session: null, profile: null, loading: true };
let initialized = false;

function emit() {
  for (const l of listeners) l(state);
}

async function loadProfile(userId: string): Promise<Profile | null> {
  const { data } = await supabase
    .from("profiles")
    .select("user_id, username, avatar_url")
    .eq("user_id", userId)
    .maybeSingle();
  return (data as Profile) ?? null;
}

function init() {
  if (initialized || typeof window === "undefined") return;
  initialized = true;

  supabase.auth.onAuthStateChange((_event, session) => {
    state = { ...state, session, user: session?.user ?? null, loading: false };
    emit();
    if (session?.user) {
      // defer to avoid deadlock in callback
      setTimeout(async () => {
        const profile = await loadProfile(session.user.id);
        state = { ...state, profile };
        emit();
      }, 0);
    } else {
      state = { ...state, profile: null };
      emit();
    }
  });

  supabase.auth.getSession().then(async ({ data }) => {
    const session = data.session;
    state = { ...state, session, user: session?.user ?? null, loading: false };
    if (session?.user) {
      state = { ...state, profile: await loadProfile(session.user.id) };
    }
    emit();
  });
}

export function useAuth() {
  const [s, setS] = useState<AuthState>(state);
  useEffect(() => {
    init();
    listeners.add(setS);
    setS(state);
    return () => {
      listeners.delete(setS);
    };
  }, []);
  return s;
}

export async function signOut() {
  await supabase.auth.signOut();
}
