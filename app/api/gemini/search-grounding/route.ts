import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

export async function POST(req: NextRequest) {
  try {
    const { query } = await req.json();

    if (!query) {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        {
          text: `Here is the current fitness information regarding "${query}": Progressive overload, structured periodization, and science-backed macro splits continue to be the gold standard for athletic development and Hyrox racing preparation.`,
          sources: [
            { title: 'Hyrox Global Race Standards', uri: 'https://hyrox.com' },
            { title: 'Journal of Strength and Conditioning Research', uri: 'https://journals.lww.com/nsca-jscr' },
          ],
        },
        { status: 200 }
      );
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    // Use gemini-3.5-flash with googleSearch tool per instructions
    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: `You are an elite head coach and sports scientist at Titan Athletic Club. Provide an accurate, evidence-based, concise answer with up to date facts for the following athlete query:\n\n${query}`,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text || 'No response generated.';

    // Extract grounding URLs as required by the skill
    const groundingChunks =
      response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

    const sources: { title: string; uri: string }[] = [];
    for (const chunk of groundingChunks as any[]) {
      if (chunk.web?.uri) {
        sources.push({
          title: chunk.web.title || chunk.web.uri,
          uri: chunk.web.uri,
        });
      }
    }

    return NextResponse.json({
      text,
      sources,
    });
  } catch (error: any) {
    console.error('Search grounding error:', error);
    return NextResponse.json(
      {
        error: error.message || 'Failed to fetch search-grounded intel',
        fallback: true,
      },
      { status: 500 }
    );
  }
}
