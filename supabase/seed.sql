-- ====================================================================
-- Leyla Seed Data: 40 Multilingual Icebreakers + Crisis Resources
-- Categories: gentle, playful, evening, study, celebration
-- Locales: en, hi, te, ta
-- ====================================================================

-- ─── 1. ENGLISH ICEBREAKERS (16 total) ───
INSERT INTO public.icebreakers (locale, category, text, time_of_day, min_mood, max_mood) VALUES
-- Gentle
('en', 'gentle', 'Hey, how''s your heart doing today?', 'morning', 1, 5),
('en', 'gentle', 'No pressure. Want to tell me one thing about today?', 'afternoon', 1, 5),
('en', 'gentle', 'If today had a weather forecast, what would it be?', 'morning', 1, 5),
('en', 'gentle', 'On a scale from "cozy blanket" to "storm cloud", where are you?', 'afternoon', 1, 5),

-- Playful
('en', 'playful', 'Plot twist: you''re allowed to take a break. Want to chat about it?', 'afternoon', 2, 5),
('en', 'playful', 'My cat says you''ve earned a snack and a deep breath. Which first?', 'afternoon', 2, 5),
('en', 'playful', 'Tell me one tiny win from today. Tiny counts!', 'afternoon', 3, 5),
('en', 'playful', 'If your mood were a song right now, what would it be?', 'afternoon', 2, 5),

-- Evening
('en', 'evening', 'Let''s close the day softly. What was one good moment?', 'evening', 1, 5),
('en', 'evening', 'Want to put today''s worries in a "tomorrow" box together?', 'night', 1, 4),
('en', 'evening', 'Ready for a 1-minute breathing reset?', 'evening', 1, 5),
('en', 'evening', 'You did enough today. Let your shoulders drop.', 'night', 1, 5),

-- Study / Exam Stress
('en', 'study', 'Exams looming? Let''s make a calm 3-step plan.', 'morning', 1, 4),
('en', 'study', 'Brain full? Dump it all here, I''ll help sort it.', 'afternoon', 1, 4),

-- Celebration
('en', 'celebration', 'Showing up for yourself today is huge. Proud of you!', 'afternoon', 3, 5),
('en', 'celebration', 'A small step forward is still a step. Want to log it?', 'morning', 3, 5);

-- ─── 2. HINDI ICEBREAKERS (8 total) ───
INSERT INTO public.icebreakers (locale, category, text, time_of_day, min_mood, max_mood) VALUES
('hi', 'gentle', 'अरे, आज आपका दिल कैसा महसूस कर रहा है?', 'morning', 1, 5),
('hi', 'gentle', 'कोई दबाव नहीं। क्या आप आज के बारे में एक छोटी सी बात बताना चाहेंगे?', 'afternoon', 1, 5),
('hi', 'playful', 'मेरी बिल्ली कहती है कि आपने थोड़ा आराम कमाया है। एक गहरी सांस लें?', 'afternoon', 2, 5),
('hi', 'playful', 'आज की कोई छोटी सी जीत बताएं। छोटी भी मायने रखती है!', 'afternoon', 3, 5),
('hi', 'evening', 'आइए दिन को शांति से समाप्त करें। आज का एक अच्छा पल क्या था?', 'evening', 1, 5),
('hi', 'evening', 'क्या आज की चिंताओं को कल के डिब्बे में रख दें?', 'night', 1, 4),
('hi', 'study', 'पढ़ाई का तनाव है? आइए एक शांत 3-चरणीय योजना बनाते हैं।', 'morning', 1, 4),
('hi', 'celebration', 'अपने लिए समय निकालना बहुत बड़ी बात है। मुझे आप पर गर्व है!', 'afternoon', 3, 5);

-- ─── 3. TELUGU ICEBREAKERS (8 total) ───
INSERT INTO public.icebreakers (locale, category, text, time_of_day, min_mood, max_mood) VALUES
('te', 'gentle', 'హే, ఈ రోజు మీ మనస్సు ఎలా ఉంది?', 'morning', 1, 5),
('te', 'gentle', 'ఒత్తిడి ఏమీ లేదు. ఈ రోజు గురించి ఒక చిన్న విషయం చెప్పాలనుకుంటున్నారా?', 'afternoon', 1, 5),
('te', 'playful', 'నా పిల్లి చెబుతోంది మీరు కొంచెం విరామం పొందారని. ఒక లోతైన శ్వాస తీసుకుందామా?', 'afternoon', 2, 5),
('te', 'playful', 'ఈ రోజు మీ చిన్న విజయం ఏదైనా చెప్పండి. చిన్నదైనా పర్వాలేదు!', 'afternoon', 3, 5),
('te', 'evening', 'ఈ రోజును ప్రశాంతంగా ముగిద్దాం. ఈ రోజు జరిగిన ఒక మంచి క్షణం ఏమిటి?', 'evening', 1, 5),
('te', 'evening', 'ఈ రోజు ఆందోళనలను రేపటి పెట్టెలో పెట్టేద్దామా?', 'night', 1, 4),
('te', 'study', 'పరీక్షల ఒత్తిడా? ప్రశాంతమైన 3-దశల ప్రణాళిక వేద్దాం.', 'morning', 1, 4),
('te', 'celebration', 'మీ కోసం మీరు సమయం కేటాయించడం చాలా గొప్ప విషయం. నాకు గర్వంగా ఉంది!', 'afternoon', 3, 5);

-- ─── 4. TAMIL ICEBREAKERS (8 total) ───
INSERT INTO public.icebreakers (locale, category, text, time_of_day, min_mood, max_mood) VALUES
('ta', 'gentle', 'ஏய், இன்று உங்கள் மனம் எப்படி உணர்கிறது?', 'morning', 1, 5),
('ta', 'gentle', 'எந்த அழுத்தமும் இல்லை. இன்று பற்றி ஒரு சிறிய விஷயத்தை பகிர்ந்து கொள்ள விரும்புகிறீர்களா?', 'afternoon', 1, 5),
('ta', 'playful', 'என் பூனை சொல்கிறது நீங்கள் ஒரு சிறிய ஓய்வு எடுத்தாக வேண்டும் என்று. ஒரு ஆழமான மூச்சு?', 'afternoon', 2, 5),
('ta', 'playful', 'இன்றைய ஒரு சிறிய வெற்றியை சொல்லுங்கள். சிறியதும் முக்கியமானது!', 'afternoon', 3, 5),
('ta', 'evening', 'நாளை மென்மையாக முடிப்போம். இன்றைய ஒரு நல்ல தருணம் என்ன?', 'evening', 1, 5),
('ta', 'evening', 'இன்றைய கவலைகளை நாளைய பெட்டியில் போட்டு வைக்கலாமா?', 'night', 1, 4),
('ta', 'study', 'தேர்வு அழுத்தமா? ஒரு அமைதியான 3 படி திட்டத்தை உருவாக்குவோம்.', 'morning', 1, 4),
('ta', 'celebration', 'உங்களுக்காக நேரம் ஒதுக்குவது மிகப்பெரிய விஷயம். உங்களை நினைத்து பெருமைப்படுகிறேன்!', 'afternoon', 3, 5);

-- ─── 5. CRISIS & WELLNESS RESOURCES ───
INSERT INTO public.resources (title, description, category, contact_number, url, locale, is_crisis) VALUES
('988 Suicide & Crisis Lifeline', 'Free, confidential support available 24/7 in the United States and Canada via call or text.', 'crisis', '988', 'https://988lifeline.org', 'en', true),
('Crisis Text Line', 'Text HOME to 741741 to connect with a volunteer Crisis Counselor 24/7.', 'crisis', '741741', 'https://www.crisistextline.org', 'en', true),
('Tele-MANAS (India)', 'National Tele Mental Health Programme of India providing 24/7 free mental health counseling.', 'crisis', '14416', 'https://telemanas.mohfw.gov.in', 'hi', true),
('Vandrevala Foundation', 'Free 24/7 mental health helpline providing psychological counseling and crisis intervention.', 'crisis', '9999 666 555', 'https://www.vandrevalafoundation.com', 'en', true),
('Sneha India Suicide Helpline', '24/7 suicide prevention helpline based in Tamil Nadu, serving people in distress.', 'crisis', '044-24640050', 'https://snehaindia.org', 'ta', true),
('AASRA (India)', '24/7 helpline for suicide prevention and emotional crisis support in Hindi & English.', 'crisis', '91-9820466726', 'http://www.aasra.info', 'hi', true),
('Box Breathing Guide', 'Calm down nervous system by balancing breath cycles (4-4-4-4).', 'calm', NULL, '/dashboard/calm', 'en', false),
('Grounding 5-4-3-2-1', 'Reconnect with the present environment when experiencing sensory anxiety.', 'calm', NULL, '/dashboard/calm', 'en', false);
