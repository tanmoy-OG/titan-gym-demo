import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

export async function POST(req: NextRequest) {
  try {
    const { branchName, address, lat, lng, userQuery } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        {
          text: `Titan Athletic Club is located at ${address || '742 Grand Avenue, Downtown Metro'}. The facility features dedicated multi-level parking, 24/7 keycard entry, transit connections via Metro Red Line, and nearby high-protein dining cafes.`,
          sources: [
            {
              title: branchName || 'Titan Athletic Club Facility',
              uri: `https://maps.google.com/?q=${encodeURIComponent(address || 'Titan Athletic Club')}`,
            },
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

    const prompt = userQuery
      ? `Provide detailed local directions, parking options, public transport, and nearby healthy amenities for Titan Athletic Club located at ${address}. User question: "${userQuery}"`
      : `Provide parking details, highway access, public transit routes, and local landmarks for visiting Titan Athletic Club located at ${address} (${branchName}).`;

    const config: any = {
      tools: [{ googleMaps: {} }],
    };

    if (lat && lng) {
      config.toolConfig = {
        retrievalConfig: {
          latLng: {
            latitude: Number(lat),
            longitude: Number(lng),
          },
        },
      };
    }

    // Call gemini-3.5-flash with googleMaps tool per instructions
    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config,
    });

    const text = response.text || 'Location information retrieved successfully.';

    // Extract grounding URLs as strictly required by the skill
    const groundingChunks =
      response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

    const mapSources: { title: string; uri: string }[] = [];
    for (const chunk of groundingChunks as any[]) {
      if (chunk.maps?.uri) {
        mapSources.push({
          title: chunk.maps.title || branchName || 'Google Maps Location',
          uri: chunk.maps.uri,
        });
      }
    }

    // Always guarantee at least the Google Maps direct link
    if (mapSources.length === 0) {
      mapSources.push({
        title: branchName || 'View on Google Maps',
        uri: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address || 'Titan Athletic Club')}`,
      });
    }

    return NextResponse.json({
      text,
      sources: mapSources,
    });
  } catch (error: any) {
    console.error('Maps grounding error:', error);
    return NextResponse.json(
      {
        text: 'Titan Athletic Club provides reserved validation parking and direct metro access. Please see front desk for validated parking stamps.',
        sources: [
          {
            title: 'Google Maps Directions',
            uri: 'https://maps.google.com',
          },
        ],
        fallback: true,
      },
      { status: 200 }
    );
  }
}
