'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Sparkles, ArrowRight, Check, ShieldCheck, Heart, Clock } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [name, setName] = useState('Arya');
  const [locale, setLocale] = useState('en');
  const [checkinTime, setCheckinTime] = useState('09:00');
  const [checkinEnabled, setCheckinEnabled] = useState(true);
  const [aiDisclosureAccepted, setAiDisclosureAccepted] = useState(false);
  const [saving, setSaving] = useState(false);

  const languages = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
    { code: 'te', label: 'Telugu', native: 'తెలుగు' },
    { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
  ];

  const handleComplete = async () => {
    if (!aiDisclosureAccepted) return;
    setSaving(true);
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        await supabase
          .from('profiles')
          .update({
            full_name: name,
            preferred_locale: locale,
            onboarded: true,
            ai_disclosure_accepted: true,
            checkin_enabled: checkinEnabled,
          })
          .eq('id', user.id);

        await supabase
          .from('checkin_settings')
          .upsert({
            user_id: user.id,
            enabled: checkinEnabled,
            preferred_time: checkinTime,
          });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
      router.push('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b0914] px-4 py-12">
      <div className="w-full max-w-xl rounded-3xl border border-purple-500/20 bg-gradient-to-b from-[#16102a]/95 to-[#0f0b1e]/95 p-8 shadow-2xl backdrop-blur-2xl">
        
        {/* Progress header */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-xs font-semibold text-purple-300/70 mb-3">
            <span>Step {step} of 3</span>
            <span className="flex items-center gap-1.5 text-purple-300">
              <Sparkles className="h-3.5 w-3.5 text-purple-400" />
              Personalizing your experience
            </span>
          </div>
          <div className="h-1.5 w-full bg-purple-950/60 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        {/* Step 1: Name and Language */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white">What should Leyla call you?</h2>
              <p className="text-sm text-purple-200/70 mt-1">
                Your preferred name and the language you feel most comfortable in.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-purple-200/80 mb-2">
                Your Preferred Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Arya"
                className="w-full rounded-xl border border-purple-500/25 bg-[#0d0a1b] py-3 px-4 text-white text-base focus:border-purple-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-purple-200/80 mb-2">
                Preferred Language
              </label>
              <div className="grid grid-cols-2 gap-3">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => setLocale(lang.code)}
                    className={`flex items-center justify-between p-3.5 rounded-xl border text-sm font-semibold transition-all ${
                      locale === lang.code
                        ? 'border-purple-400 bg-purple-600/25 text-white shadow-md'
                        : 'border-purple-500/15 bg-white/5 text-purple-200 hover:bg-white/10'
                    }`}
                  >
                    <span>{lang.native} ({lang.label})</span>
                    {locale === lang.code && <Check className="h-4 w-4 text-purple-400" />}
                  </button>
                ))}
              </div>
            </div>

            <Button
              onClick={() => setStep(2)}
              className="w-full rounded-xl py-5 text-sm font-bold bg-gradient-to-r from-purple-600 to-pink-500 mt-4"
            >
              Continue
              <ArrowRight className="h-4 w-4 ml-1.5" />
            </Button>
          </div>
        )}

        {/* Step 2: Proactive Check-in preferences */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white">Proactive Care Check-ins</h2>
              <p className="text-sm text-purple-200/70 mt-1">
                Leyla can gently check in with a cozy message once a day. You can adjust or disable this anytime.
              </p>
            </div>

            <div className="p-4 rounded-2xl border border-purple-500/20 bg-purple-950/30 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-white">Enable Daily Check-in</h4>
                <p className="text-xs text-purple-200/60 mt-0.5">
                  A small &quot;Hey, how are you?&quot; at your preferred time.
                </p>
              </div>
              <input
                type="checkbox"
                checked={checkinEnabled}
                onChange={(e) => setCheckinEnabled(e.target.checked)}
                className="h-5 w-5 accent-purple-600 rounded cursor-pointer"
              />
            </div>

            {checkinEnabled && (
              <div>
                <label className="block text-xs font-semibold text-purple-200/80 mb-2 flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-purple-400" />
                  <span>Preferred Check-in Time</span>
                </label>
                <input
                  type="time"
                  value={checkinTime}
                  onChange={(e) => setCheckinTime(e.target.value)}
                  className="rounded-xl border border-purple-500/25 bg-[#0d0a1b] py-2.5 px-4 text-white text-sm focus:border-purple-400 focus:outline-none"
                />
              </div>
            )}

            <div className="flex gap-3 mt-4">
              <Button
                variant="outline"
                onClick={() => setStep(1)}
                className="rounded-xl px-5"
              >
                Back
              </Button>
              <Button
                onClick={() => setStep(3)}
                className="flex-1 rounded-xl py-5 text-sm font-bold bg-gradient-to-r from-purple-600 to-pink-500"
              >
                Continue
                <ArrowRight className="h-4 w-4 ml-1.5" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: AI Disclosure Acknowledgement */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white">Safety &amp; AI Disclosure</h2>
              <p className="text-sm text-purple-200/70 mt-1">
                Your trust and wellbeing come before everything else.
              </p>
            </div>

            <div className="space-y-3.5 rounded-2xl border border-purple-500/20 bg-purple-950/20 p-5 text-xs text-purple-200/80 leading-relaxed">
              <div className="flex items-start gap-3">
                <ShieldCheck className="h-4 w-4 text-purple-400 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Leyla is an AI companion</strong>, not a doctor, licensed therapist, or medical clinician. She cannot diagnose conditions or prescribe medication.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <Heart className="h-4 w-4 text-pink-400 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Your privacy is protected:</strong> All mood entries and journals are secured with Row Level Security. We never sell your data or log raw conversations in server debug logs.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <Sparkles className="h-4 w-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Crisis safety:</strong> If Leyla detects severe distress or self-harm risk, conversations immediately switch to verified crisis helplines.
                </span>
              </div>
            </div>

            <label className="flex items-center gap-3 p-4 rounded-xl border border-purple-500/25 bg-[#140f26] cursor-pointer">
              <input
                type="checkbox"
                checked={aiDisclosureAccepted}
                onChange={(e) => setAiDisclosureAccepted(e.target.checked)}
                className="h-5 w-5 accent-purple-600 rounded cursor-pointer"
              />
              <span className="text-xs font-medium text-white">
                I understand that Leyla is an AI companion and agree to the Terms &amp; Privacy Policy.
              </span>
            </label>

            <div className="flex gap-3 mt-4">
              <Button
                variant="outline"
                onClick={() => setStep(2)}
                className="rounded-xl px-5"
              >
                Back
              </Button>
              <Button
                disabled={!aiDisclosureAccepted || saving}
                onClick={handleComplete}
                className="flex-1 rounded-xl py-5 text-sm font-bold bg-gradient-to-r from-purple-600 to-pink-500 disabled:opacity-50"
              >
                {saving ? 'Setting up...' : 'Enter Safe Space'}
                <ArrowRight className="h-4 w-4 ml-1.5" />
              </Button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
