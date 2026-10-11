import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

export async function POST(req: NextRequest) {
  try {
    const {
      prompt,
      base64Image,
      mimeType = 'image/jpeg',
      imageSize = '1K',
      aspectRatio = '1:1',
      modelName = 'gemini-nano-banana-2.1',
    } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Edit prompt is required' }, { status: 400 });
    }
    if (!base64Image) {
      return NextResponse.json({ error: 'Base64 image is required for editing' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'GEMINI_API_KEY is not configured.' }, { status: 400 });
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    // Clean base64 data if it includes a data URL header
    const cleanBase64 = base64Image.replace(/^data:image\/[a-zA-Z]+;base64,/, '');

    const selectedModel = modelName || 'gemini-nano-banana-2.1';

    const response = await ai.models.generateContent({
      model: selectedModel,
      contents: {
        parts: [
          {
            inlineData: {
              data: cleanBase64,
              mimeType: mimeType || 'image/jpeg',
            },
          },
          {
            text: prompt,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: aspectRatio || '1:1',
          imageSize: (imageSize as any) || '1K',
        },
      },
    });

    let imageUrl = '';
    let textResponse = '';

    const parts = response.candidates?.[0]?.content?.parts || [];
    for (const part of parts) {
      if (part.inlineData?.data) {
        imageUrl = `data:${part.inlineData.mimeType || 'image/png'};base64,${part.inlineData.data}`;
        break;
      }
      if (part.text) {
        textResponse += part.text;
      }
    }

    if (!imageUrl) {
      return NextResponse.json(
        {
          error: textResponse || 'No edited image returned.',
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      imageUrl,
      modelUsed: selectedModel,
    });
  } catch (error: any) {
    console.error('Image edit error:', error);
    return NextResponse.json(
      {
        error: error.message || 'Failed to edit image',
      },
      { status: 500 }
    );
  }
}
