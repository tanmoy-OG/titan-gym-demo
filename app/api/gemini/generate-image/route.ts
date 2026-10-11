import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

export async function POST(req: NextRequest) {
  try {
    const { prompt, imageSize = '1K', aspectRatio = '1:1', modelName = 'gemini-3-pro-image' } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
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

    // Valid size: 1K, 2K, 4K
    const validSizes = ['1K', '2K', '4K'];
    const chosenSize = validSizes.includes(imageSize) ? imageSize : '1K';

    // Model choice: allow gemini-3-pro-image or gemini-nano-banana-2.1
    const selectedModel = modelName === 'gemini-nano-banana-2.1' ? 'gemini-nano-banana-2.1' : 'gemini-3-pro-image';

    const response = await ai.models.generateContent({
      model: selectedModel,
      contents: {
        parts: [{ text: prompt }],
      },
      config: {
        imageConfig: {
          aspectRatio: aspectRatio || '1:1',
          imageSize: chosenSize as any,
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
          error: textResponse || 'No image data returned from model.',
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      imageUrl,
      modelUsed: selectedModel,
      size: chosenSize,
      aspectRatio,
    });
  } catch (error: any) {
    console.error('Image generation error:', error);
    return NextResponse.json(
      {
        error: error.message || 'Failed to generate image',
      },
      { status: 500 }
    );
  }
}
