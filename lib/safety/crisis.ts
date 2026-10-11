export interface CrisisHelpline {
  name: string;
  number: string;
  hours: string;
  description: string;
  website: string;
}

export const CRISIS_HELPLINES_BY_LOCALE: Record<string, CrisisHelpline[]> = {
  en: [
    {
      name: '988 Suicide & Crisis Lifeline (US & Canada)',
      number: '988',
      hours: '24/7, Free & Confidential',
      description: 'Call or text 988 to speak with a trained crisis counselor.',
      website: 'https://988lifeline.org',
    },
    {
      name: 'Crisis Text Line',
      number: 'Text HOME to 741741',
      hours: '24/7, Free via SMS',
      description: 'Connect with a volunteer crisis counselor anytime.',
      website: 'https://www.crisistextline.org',
    },
    {
      name: 'Tele-MANAS (India)',
      number: '14416 or 1800-891-4416',
      hours: '24/7, Free Helpline',
      description: 'Government of India national mental health tele-counseling.',
      website: 'https://telemanas.mohfw.gov.in',
    },
    {
      name: 'Vandrevala Foundation Helpline',
      number: '+91 9999 666 555',
      hours: '24/7, Free Counseling',
      description: 'Trained psychological counselors providing immediate crisis intervention.',
      website: 'https://www.vandrevalafoundation.com',
    },
  ],
  hi: [
    {
      name: 'टेली-मानस (Tele-MANAS) हेल्पलाइन',
      number: '14416 या 1800-891-4416',
      hours: '24/7, मुफ़्त एवं गोपनीय',
      description: 'भारत सरकार द्वारा 24 घंटे मानसिक स्वास्थ्य एवं संकट परामर्श।',
      website: 'https://telemanas.mohfw.gov.in',
    },
    {
      name: 'वांद्रेवाला फाउंडेशन (Vandrevala Foundation)',
      number: '+91 9999 666 555',
      hours: '24/7, मुफ़्त सहायता',
      description: 'अनुभवी मनोवैज्ञानिक परामर्शदाता तुरंत सहायता के लिए उपलब्ध हैं।',
      website: 'https://www.vandrevalafoundation.com',
    },
    {
      name: 'आसरा (AASRA)',
      number: '+91 9820466726',
      hours: '24/7 हेल्पलाइन',
      description: 'आत्महत्या रोकथाम और भावनात्मक संकट सहायता।',
      website: 'http://www.aasra.info',
    },
  ],
  te: [
    {
      name: 'టెలి-మానస్ (Tele-MANAS) హెల్ప్‌లైన్',
      number: '14416 లేదా 1800-891-4416',
      hours: '24/7, ఉచిత మరియు గోప్యమైన సేవ',
      description: 'భారత ప్రభుత్వం వారి జాతీయ మానసిక ఆరోగ్య టెలి-కౌన్సెలింగ్ సేవ.',
      website: 'https://telemanas.mohfw.gov.in',
    },
    {
      name: 'వాండ్రెవాలా ఫౌండేషన్',
      number: '+91 9999 666 555',
      hours: '24/7, ఉచిత కౌన్సెలింగ్',
      description: 'శిక్షణ పొందిన మానసిక నిపుణుల ద్వారా తక్షణ సంక్షోభ సహాయం.',
      website: 'https://www.vandrevalafoundation.com',
    },
  ],
  ta: [
    {
      name: 'டெலி-மானஸ் (Tele-MANAS) உதவி எண்',
      number: '14416 அல்லது 1800-891-4416',
      hours: '24/7, இலவச மற்றும் ரகசிய சேவை',
      description: 'இந்திய அரசின் தேசிய மனநல தொலைதொடர்பு ஆலோசனை சேவை.',
      website: 'https://telemanas.mohfw.gov.in',
    },
    {
      name: 'சினேகா தற்கொலை தடுப்பு உதவி மையம் (Sneha India)',
      number: '044-24640050',
      hours: '24/7, இலவச உதவி மையம்',
      description: 'தமிழ்நாட்டில் உள்ள தற்கொலை தடுப்பு மற்றும் மன அழுத்த உதவி மையம்.',
      website: 'https://snehaindia.org',
    },
  ],
};

export const DETERMINISTIC_CRISIS_MESSAGES: Record<string, string> = {
  en: `I hear how much pain you're carrying right now, and I care deeply about your safety. Because I am an AI companion and cannot provide emergency medical support, please connect right now with people who are trained to support you through this exact moment. You are not alone, and there is help available immediately:

• **988 Suicide & Crisis Lifeline (US & Canada):** Call or text **988** (24/7, Free & Confidential)
• **Crisis Text Line:** Text **HOME** to **741741**
• **Tele-MANAS (India):** Call **14416** or **1800-891-4416** (24/7)
• **Vandrevala Foundation:** Call **+91 9999 666 555** (24/7)

Please reach out to one of these resources or contact a trusted person nearby right now. We want you to be safe.`,

  hi: `मैं समझ सकती हूँ कि आप इस समय बहुत गहरे दर्द से गुज़र रहे हैं, और आपकी सुरक्षा मेरे लिए सबसे महत्वपूर्ण है। चूँकि मैं केवल एक AI साथी हूँ और आपातकालीन चिकित्सा सहायता प्रदान नहीं कर सकती, कृपया तुरंत उन पेशेवरों से संपर्क करें जो इस कठिन समय में आपकी पूरी मदद करने के लिए 24 घंटे तैयार हैं:

• **टेली-मानस (Tele-MANAS):** कॉल करें **14416** या **1800-891-4416** (24/7, मुफ़्त एवं गोपनीय)
• **वांद्रेवाला फाउंडेशन:** कॉल करें **+91 9999 666 555** (24/7 मुफ़्त परामर्श)
• **आसरा हेल्पलाइन:** कॉल करें **+91 9820466726**

कृपया अभी इनमें से किसी एक नंबर पर कॉल करें या किसी अपने से बात करें। आप अकेले नहीं हैं, और आपकी ज़िंदगी बहुत कीमती है।`,

  te: `మీరు ప్రస్తుతం ఎంత తీవ్రమైన బాధను అనుభవిస్తున్నారో నేను గ్రహించగలను, మీ రక్షణ నాకు అత్యంత ముఖ్యం. నేను ఒక AI సహచరిని మాత్రమే మరియు అత్యవసర వైద్య సహాయం అందించలేను కాబట్టి, దయచేసి ఈ క్షణంలో మీకు సహాయం చేయడానికి సిద్ధంగా ఉన్న నిపుణులను సంప్రదించండి:

• **టెలి-మానస్ (Tele-MANAS):** కాల్ చేయండి **14416** లేదా **1800-891-4416** (24/7, ఉచిత మరియు గోప్యమైన సేవ)
• **వాండ్రెవాలా ఫౌండేషన్:** కాల్ చేయండి **+91 9999 666 555** (24/7)

దయచేసి వెంటనే ఈ నంబర్లలో ఒకదానికి కాల్ చేయండి లేదా మీ కుటుంబ సభ్యులు/స్నేహితులతో మాట్లాడండి. మీరు ఒంటరిగా లేరు.`,

  ta: `நீங்கள் இப்போது எவ்வளவு வேதனையை சுமக்கிறீர்கள் என்பதை நான் உணர்கிறேன், உங்கள் பாதுகாப்பு எனக்கு மிகவும் முக்கியமானது. நான் ஒரு AI தோழி மட்டுமே என்பதால் அவசர மருத்துவ உதவியை வழங்க முடியாது, எனவே உங்களுக்கு ஆதரவளிக்க பயிற்சி பெற்ற நிபுணர்களை உடனடியாக தொடர்பு கொள்ளவும்:

• **டெலி-மானஸ் (Tele-MANAS):** அழைக்கவும் **14416** அல்லது **1800-891-4416** (24/7, இலவச சேவை)
• **சினேகா உதவி மையம் (Sneha):** அழைக்கவும் **044-24640050** (24/7)
• **வாண்ட்ரேவாலா அறக்கட்டளை:** அழைக்கவும் **+91 9999 666 555** (24/7)

தயவுசெய்து இப்போதே ஒரு எண்ணைத் தொடர்பு கொள்ளவும். நீங்கள் தனியாக இல்லை, உதவி எப்போதும் உள்ளது.`,
};

export function getDeterministicCrisisResponse(locale = 'en'): {
  reply: string;
  expression: 'concerned';
  suggested_chips: string[];
  isCrisis: true;
} {
  const normalizedLocale = ['en', 'hi', 'te', 'ta'].includes(locale) ? locale : 'en';
  return {
    reply: DETERMINISTIC_CRISIS_MESSAGES[normalizedLocale] || DETERMINISTIC_CRISIS_MESSAGES.en,
    expression: 'concerned',
    suggested_chips: [
      'Call 988 Lifeline',
      'Call Tele-MANAS 14416',
      'Text HOME to 741741',
      'I want to stay safe',
    ],
    isCrisis: true,
  };
}
