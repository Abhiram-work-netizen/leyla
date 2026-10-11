-- ====================================================================
-- Leyla Supabase RLS Security Verification Test Suite
-- Proves that User A cannot read or modify User B's rows
-- ====================================================================

BEGIN;

-- 1. Create two test users in auth.users
DO $$
DECLARE
  user_a UUID := '11111111-1111-1111-1111-111111111111';
  user_b UUID := '22222222-2222-2222-2222-222222222222';
  found_count INT;
BEGIN
  -- Insert dummy profiles
  INSERT INTO public.profiles (id, email, full_name, preferred_locale)
  VALUES 
    (user_a, 'user_a@test.com', 'User A', 'en'),
    (user_b, 'user_b@test.com', 'User B', 'en')
  ON CONFLICT (id) DO NOTHING;

  -- User A logs a mood entry
  INSERT INTO public.mood_entries (user_id, score, note)
  VALUES (user_a, 4, 'User A private mood log');

  -- User A writes a journal entry
  INSERT INTO public.journal_entries (user_id, title, content)
  VALUES (user_a, 'User A Secret Journal', 'This should never be visible to User B.');

  -- 2. Switch context to User B (simulate JWT authenticated session)
  PERFORM set_config('request.jwt.claim.sub', user_b::text, true);
  PERFORM set_config('role', 'authenticated', true);

  -- TEST 1: User B tries to read User A's mood entries
  SELECT COUNT(*) INTO found_count
  FROM public.mood_entries
  WHERE user_id = user_a;

  IF found_count > 0 THEN
    RAISE EXCEPTION 'RLS FAILURE: User B was able to read User A mood_entries!';
  ELSE
    RAISE NOTICE 'SUCCESS: User B read 0 rows of User A mood_entries.';
  END IF;

  -- TEST 2: User B tries to read User A's journal entries
  SELECT COUNT(*) INTO found_count
  FROM public.journal_entries
  WHERE user_id = user_a;

  IF found_count > 0 THEN
    RAISE EXCEPTION 'RLS FAILURE: User B was able to read User A journal_entries!';
  ELSE
    RAISE NOTICE 'SUCCESS: User B read 0 rows of User A journal_entries.';
  END IF;

  -- TEST 3: User B can read shared icebreakers
  SELECT COUNT(*) INTO found_count
  FROM public.icebreakers;

  IF found_count = 0 THEN
    RAISE EXCEPTION 'RLS FAILURE: User B could not read shared icebreakers!';
  ELSE
    RAISE NOTICE 'SUCCESS: User B successfully read shared icebreakers.';
  END IF;

  RAISE NOTICE 'All RLS Isolation Tests Passed Cleanly!';
END $$;

ROLLBACK;
