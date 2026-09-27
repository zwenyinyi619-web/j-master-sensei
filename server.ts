import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Initialize GoogleGenAI SDK with server-side API Key
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

// AI Japanese Sensei Chat & Kaiwa Assistant API
app.post('/api/chat', async (req, res) => {
  try {
    const { messages, userLanguage = 'my', context = 'general', jlptLevel = 'All' } = req.body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Messages array is required' });
    }

    let langInstruction = '';
    let targetLangName = '';

    if (userLanguage === 'my') {
      targetLangName = 'Burmese (မြန်မာဘာသာ)';
      langInstruction = `The user's preferred explanation language is MYANMAR (မြန်မာဘာသာ). 
Whenever you explain words, translate Japanese phrases, explain grammar points, or give corrections, write clear, natural, and helpful Burmese (မြန်မာလို ရှင်းလင်းစွာ ရေးပေးပါ).
Format Japanese terms with furigana/hiragana and romaji if helpful.
When the user asks questions in Myanmar (e.g. စားသည် ကို te form ဘယ်လိုပြောင်းလဲ, ဒီစာကြောင်း ဘာအဓိပ္ပါယ်လဲ, etc.), understand the Myanmar question perfectly and answer thoroughly in Myanmar!`;
    } else if (userLanguage === 'th') {
      targetLangName = 'Thai (ภาษาไทย)';
      langInstruction = `The user's preferred explanation language is THAI (ภาษาไทย).
Whenever you explain words, translate Japanese phrases, explain grammar points, or give corrections, write clear, natural, and polite Thai (อธิบายภาษาไทยอย่างชัดเจนและสุภาพ).
Format Japanese terms with furigana/hiragana and romaji if helpful.
When the user asks questions in Thai, understand their question perfectly and answer thoroughly in Thai!`;
    } else if (userLanguage === 'vi') {
      targetLangName = 'Vietnamese (Tiếng Việt)';
      langInstruction = `The user's preferred explanation language is VIETNAMESE (Tiếng Việt).
Whenever you explain words, translate Japanese phrases, explain grammar points, or give corrections, write natural, clear, and helpful Vietnamese.
Format Japanese terms with furigana/hiragana and romaji if helpful.
When the user asks questions in Vietnamese, understand their question perfectly and answer thoroughly in Vietnamese!`;
    } else {
      targetLangName = 'English';
      langInstruction = `The user's preferred explanation language is ENGLISH.
Whenever you explain words, translate Japanese phrases, explain grammar points, or give corrections, write clear, natural English.
Format Japanese terms with furigana/hiragana and romaji if helpful.`;
    }

    const systemPrompt = `You are "J-Master Sensei" (ဂျပန်စာဆရာ / อาจารย์ภาษาญี่ปุ่น / Thầy giáo tiếng Nhật), a patient, warm, and highly skilled Japanese Language Teacher specialized in teaching Japanese (JLPT N5, N4, N3) to multilingual learners.

${langInstruction}

Current Context: ${context} (JLPT Level focus: ${jlptLevel})

Your abilities & guidelines:
1. Understanding: You understand Japanese, Myanmar (မြန်မာစာ), Thai (ภาษาไทย), Vietnamese (Tiếng Việt), and English fluently. No matter what language the user types in, understand their intent directly.
2. Conversation (Kaiwa): When conversing in Japanese roleplays (restaurant, hotel, shopping, casual talk), respond with natural Japanese suitable for the learner's level, provide pronunciation/reading (Romaji/Furigana), and provide the translation in ${targetLangName}.
3. Feedback & Corrections: If the user attempted Japanese and made grammatical/particle mistakes, gently point out the mistake and show the natural correct form with a friendly explanation in ${targetLangName}.
4. Grammar & Meaning Q&A: If the user asks about a grammar rule, verb conjugation, or kanji meaning, provide:
   - Meaning in ${targetLangName}
   - Grammar formula / structure
   - 2-3 clear practical example sentences with readings and translation in ${targetLangName}.
   - Tips or common pitfalls.

Always respond in a structured JSON format with this exact schema:
{
  "japaneseResponse": "Japanese text response (Kana/Kanji)",
  "romaji": "Romaji reading of the Japanese response",
  "translation": "Translation of the Japanese response in ${targetLangName}",
  "explanation": "Detailed explanation, grammar breakdown, or answers to the user's questions in ${targetLangName}. If none needed, write helpful vocabulary or cultural notes.",
  "correction": "Optional correction if the user made a mistake in Japanese, or empty string if no mistake",
  "suggestedReplies": ["Suggested reply 1 in Japanese", "Suggested reply 2 in Japanese", "Suggested reply 3 in Japanese"]
}
Only output valid JSON.`;

    // Construct conversation history
    const conversationHistory = messages
      .slice(-10)
      .map((m: ChatMessage) => `${m.role === 'user' ? 'User' : 'Sensei'}: ${m.content}`)
      .join('\n\n');

    const prompt = `${systemPrompt}\n\nConversation so far:\n${conversationHistory}\n\nPlease generate your response JSON now:`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.7,
      },
    });

    const responseText = response.text || '{}';
    let parsedData;
    try {
      parsedData = JSON.parse(responseText.trim());
    } catch {
      parsedData = {
        japaneseResponse: responseText,
        romaji: '',
        translation: '',
        explanation: responseText,
        correction: '',
        suggestedReplies: ['分かりました', 'ありがとうございます'],
      };
    }

    return res.json(parsedData);
  } catch (error: any) {
    console.error('Error in /api/chat:', error);
    return res.status(500).json({
      error: 'Failed to process AI response',
      details: error?.message || 'Unknown error',
    });
  }
});

// Setup Vite in Dev or Static files in Prod
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
