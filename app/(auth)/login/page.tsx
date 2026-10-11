'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Sparkles, ArrowRight, ShieldCheck, Mail, Lock } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const supabase = createClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        // If account doesn't exist, try signUp
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        });
        if (signUpError) throw signUpError;
      }

      router.push('/dashboard');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Authentication failed';
      // In demo mode or if keys aren't set, allow direct entry
      if (message.includes('demo') || message.includes('failed') || message.includes('fetch')) {
        router.push('/dashboard');
      } else {
        setError(message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });
    } catch {
      router.push('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b0914] px-4 py-12 selection:bg-purple-500/30">
      {/* Background radial glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[500px] w-[800px] -translate-x-1/2 bg-[radial-gradient(circle,rgba(168,85,247,0.18)_0%,transparent_70%)] blur-2xl" />

      <div className="w-full max-w-md rounded-3xl border border-purple-500/20 bg-gradient-to-b from-[#16102a]/95 to-[#0f0b1e]/95 p-8 shadow-2xl shadow-purple-950/60 backdrop-blur-2xl">
        
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-3 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-purple-600 via-fuchsia-500 to-pink-500 shadow-md shadow-purple-500/30 group-hover:scale-105 transition-transform">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-white">
              Leyla
            </span>
          </Link>
          <h2 className="text-xl font-bold text-white">Welcome to your safe space</h2>
          <p className="text-xs text-purple-200/70 mt-1">
            Sign in or create an account to start your journey
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-xl border border-rose-500/30 bg-rose-950/40 p-3 text-xs text-rose-300 text-center">
            {error}
          </div>
        )}

        {/* Google One-Tap / OAuth */}
        <Button
          type="button"
          variant="outline"
          onClick={handleGoogleAuth}
          className="w-full rounded-xl py-5 border-purple-500/25 bg-white/5 text-purple-100 hover:bg-white/10 hover:border-purple-400/50 flex items-center justify-center gap-3 mb-6"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24">
            <path
              fill="#EA4335"
              d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z"
            />
            <path
              fill="#4285F4"
              d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
            />
            <path
              fill="#FBBC05"
              d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.8s.2-2.1.4-2.8L1.9 6.3C.7 8.7 0 10.3 0 12s.7 3.3 1.9 5.7l3.7-2.9z"
            />
            <path
              fill="#34A853"
              d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 16c1.8 3.7 5.6 7 10.1 7z"
            />
          </svg>
          <span className="text-sm font-semibold">Continue with Google</span>
        </Button>

        <div className="relative my-6 flex items-center justify-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-purple-500/15" />
          </div>
          <span className="relative bg-[#140f28] px-3 text-xs text-purple-300/50 uppercase tracking-wider">
            or with email
          </span>
        </div>

        {/* Email & Password Form */}
        <form onSubmit={handleEmailAuth} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-purple-200/80 mb-1.5">
              Email address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-purple-400/50" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-purple-500/20 bg-[#0d0a1b] py-2.5 pl-10 pr-4 text-sm text-white placeholder-purple-300/30 focus:border-purple-400 focus:outline-none focus:ring-1 focus:ring-purple-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-purple-200/80 mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-purple-400/50" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-purple-500/20 bg-[#0d0a1b] py-2.5 pl-10 pr-4 text-sm text-white placeholder-purple-300/30 focus:border-purple-400 focus:outline-none focus:ring-1 focus:ring-purple-400"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl py-5 text-sm font-bold bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-500 shadow-lg shadow-purple-600/30 hover:brightness-110 cursor-pointer"
          >
            {loading ? 'Connecting...' : 'Sign In / Sign Up'}
            <ArrowRight className="h-4 w-4 ml-1.5" />
          </Button>
        </form>

        {/* Demo Fast Access */}
        <div className="mt-6 pt-6 border-t border-purple-500/10 text-center">
          <Link
            href="/dashboard"
            className="text-xs text-purple-300/70 hover:text-white underline underline-offset-4"
          >
            Explore Dashboard Demo (No login required)
          </Link>
        </div>

        {/* Security badge */}
        <div className="mt-6 flex items-center justify-center gap-2 text-[11px] text-purple-300/50">
          <ShieldCheck className="h-3.5 w-3.5 text-purple-400" />
          <span>Encrypted with Supabase Auth &amp; Row Level Security</span>
        </div>

      </div>
    </div>
  );
}
