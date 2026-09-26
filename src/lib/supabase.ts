import { createClient } from '@supabase/supabase-js';

// The `anon` key is safe to ship in client code by design — Supabase's
// security model is enforced by Postgres row-level security policies, not by
// keeping this key secret. It's committed here (with an env var override for
// local overrides) rather than injected at CI build time, since GitHub Pages
// has no server-side secret store anyway.
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL ?? 'https://kpceakmvvyiueyrtkwht.supabase.co';
const SUPABASE_ANON_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY ??
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtwY2Vha212dnlpdWV5cnRrd2h0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA0NDQwNDYsImV4cCI6MjEwNjAyMDA0Nn0.b9buwljDDeO1D3m-MzmNWFgoDgiVf8QyW6KIWj9Quwk';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
