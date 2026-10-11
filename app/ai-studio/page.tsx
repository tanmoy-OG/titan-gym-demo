/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Sparkles, Image as ImageIcon, Sliders, Upload, Download, RefreshCw, Wand2, ShieldAlert } from 'lucide-react';

export default function AiStudioPage() {
  const [activeTab, setActiveTab] = useState<'create' | 'edit'>('create');
  const [prompt, setPrompt] = useState('Athletic male bodybuilder performing heavy dumbbell rows in a dark cinematic gym with amber LED rim lights, 8k commercial quality');
  const [imageSize, setImageSize] = useState<'1K' | '2K' | '4K'>('1K');
  const [aspectRatio, setAspectRatio] = useState<'1:1' | '16:9' | '4:3' | '9:16'>('1:1');
  const [modelChoice, setModelChoice] = useState<'gemini-3-pro-image' | 'gemini-nano-banana-2.1'>('gemini-3-pro-image');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const presets = [
    'Hyrox athlete pushing sled on green indoor turf with intense grit, sweat, high-definition action',
    'Female athlete performing Olympic clean and jerk under dramatic arena spotlights, chalk dust in air',
    'Modern luxury gym interior with Eleiko bumper plates, black rubber flooring, and floor-to-ceiling glass at sunset',
    'Athlete resting in luxury contrast recovery suite with cold plunge and cedar sauna',
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadedImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setErrorMessage(null);

    try {
      if (activeTab === 'create') {
        const res = await fetch('/api/gemini/generate-image', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prompt,
            imageSize,
            aspectRatio,
            modelName: modelChoice,
          }),
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || 'Failed to generate image');
        }
        setGeneratedImage(data.imageUrl);
      } else {
        if (!uploadedImage) {
          throw new Error('Please upload an image to edit.');
        }
        const res = await fetch('/api/gemini/edit-image', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prompt,
            base64Image: uploadedImage,
            imageSize,
            aspectRatio,
            modelName: 'gemini-nano-banana-2.1',
          }),
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || 'Failed to edit image');
        }
        setGeneratedImage(data.imageUrl);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'An error occurred while rendering visual.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#08090d] text-white flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        {/* Page Title */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime-400/10 border border-lime-400/25 text-lime-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Fitness Visualizer & Generator</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight">
            Titan AI Athletic Studio
          </h1>
          <p className="mt-3 text-zinc-400 text-sm sm:text-base leading-relaxed">
            Generate ultra high-resolution workout avatars, physique goals, or edit training photos with high-fidelity 1K, 2K, and 4K resolution.
          </p>
        </div>

        {/* Studio Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-5 bg-[#0e1017] border border-white/10 rounded-2xl p-6 shadow-xl space-y-6">
            {/* Tabs: Create vs Edit */}
            <div className="flex p-1 bg-black/60 rounded-xl border border-white/10">
              <button
                onClick={() => setActiveTab('create')}
                className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
                  activeTab === 'create'
                    ? 'bg-lime-400 text-black shadow-md'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Create New Image
              </button>
              <button
                onClick={() => setActiveTab('edit')}
                className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
                  activeTab === 'edit'
                    ? 'bg-lime-400 text-black shadow-md'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Edit Photo
              </button>
            </div>

            {/* Model Selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                AI Model Engine
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setModelChoice('gemini-3-pro-image')}
                  className={`p-2.5 rounded-lg border text-left text-xs transition-all ${
                    modelChoice === 'gemini-3-pro-image'
                      ? 'border-lime-400 bg-lime-400/10 text-white'
                      : 'border-white/10 bg-white/5 text-zinc-400 hover:border-white/20'
                  }`}
                >
                  <p className="font-bold text-white">Gemini 3 Pro Image</p>
                  <p className="text-[10px] text-zinc-400">High-fidelity preview</p>
                </button>
                <button
                  type="button"
                  onClick={() => setModelChoice('gemini-nano-banana-2.1')}
                  className={`p-2.5 rounded-lg border text-left text-xs transition-all ${
                    modelChoice === 'gemini-nano-banana-2.1'
                      ? 'border-lime-400 bg-lime-400/10 text-white'
                      : 'border-white/10 bg-white/5 text-zinc-400 hover:border-white/20'
                  }`}
                >
                  <p className="font-bold text-white">Nano Banana 2.1</p>
                  <p className="text-[10px] text-zinc-400">Precision image edit</p>
                </button>
              </div>
            </div>

            {/* Image Size Affordance (1K, 2K, 4K) per specification */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                  Image Resolution
                </label>
                <span className="text-[11px] font-mono text-lime-400">{imageSize} Ultra-HD</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {(['1K', '2K', '4K'] as const).map((sz) => (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => setImageSize(sz)}
                    className={`py-2 px-3 rounded-lg text-xs font-bold tracking-wide border transition-all ${
                      imageSize === sz
                        ? 'bg-lime-400 text-black border-lime-400 font-extrabold shadow-md'
                        : 'bg-white/5 text-zinc-300 border-white/10 hover:border-white/25'
                    }`}
                  >
                    {sz} Resolution
                  </button>
                ))}
              </div>
            </div>

            {/* Aspect Ratio Affordance */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                Aspect Ratio
              </label>
              <div className="grid grid-cols-4 gap-2 text-xs">
                {(['1:1', '16:9', '4:3', '9:16'] as const).map((ar) => (
                  <button
                    key={ar}
                    type="button"
                    onClick={() => setAspectRatio(ar)}
                    className={`py-1.5 rounded-md border text-center transition-all ${
                      aspectRatio === ar
                        ? 'bg-white/20 border-lime-400 text-white font-bold'
                        : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white'
                    }`}
                  >
                    {ar}
                  </button>
                ))}
              </div>
            </div>

            {/* Photo Upload if Edit Mode */}
            {activeTab === 'edit' && (
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                  Source Image to Edit
                </label>
                <div className="border-2 border-dashed border-white/20 hover:border-lime-400/50 rounded-xl p-4 text-center cursor-pointer transition-colors relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                  {uploadedImage ? (
                    <div className="space-y-2">
                      <img
                        src={uploadedImage}
                        alt="Uploaded for edit"
                        className="max-h-32 mx-auto rounded-lg object-cover"
                      />
                      <p className="text-[11px] text-lime-400 font-semibold">Image loaded! Click to change</p>
                    </div>
                  ) : (
                    <div className="space-y-1.5 py-3">
                      <Upload className="w-6 h-6 mx-auto text-zinc-400" />
                      <p className="text-xs text-zinc-300 font-medium">Click or drop workout photo here</p>
                      <p className="text-[10px] text-zinc-500">JPG, PNG supported</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Prompt Input */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                {activeTab === 'create' ? 'Prompt Description' : 'Edit Instruction'}
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={4}
                placeholder={
                  activeTab === 'create'
                    ? 'e.g. Cinematic portrait of a female sprinter at Titan Athletic Club turf track, rim lighting, 8k...'
                    : 'e.g. Add cinematic neon amber lighting behind the athlete and add barbell plates to the floor...'
                }
                className="w-full bg-black/60 border border-white/10 rounded-xl p-3 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-lime-400 transition-colors"
              />
            </div>

            {/* Quick Presets */}
            <div>
              <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider block mb-1.5">
                Quick Inspiration Presets:
              </span>
              <div className="space-y-1.5">
                {presets.map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setPrompt(p)}
                    className="block w-full text-left text-[11px] text-zinc-400 hover:text-lime-300 truncate transition-colors bg-white/5 px-2.5 py-1.5 rounded"
                  >
                    ⚡ {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Action CTA Button */}
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-lime-400 hover:bg-lime-300 disabled:opacity-50 text-black font-black uppercase tracking-wider text-xs sm:text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(163,230,53,0.3)] transition-all"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Synthesizing {imageSize} Visual...</span>
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4" />
                  <span>
                    {activeTab === 'create' ? `Generate ${imageSize} Visual` : 'Execute Image Edit'}
                  </span>
                </>
              )}
            </button>

            {errorMessage && (
              <div className="p-3 bg-red-950/50 border border-red-500/30 rounded-xl text-xs text-red-300 flex items-start gap-2">
                <ShieldAlert className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-semibold">Generation Notice:</p>
                  <p className="text-[11px] leading-relaxed">{errorMessage}</p>
                </div>
              </div>
            )}
          </div>

          {/* Visual Display Output Column */}
          <div className="lg:col-span-7 bg-[#0e1017] border border-white/10 rounded-2xl p-6 shadow-xl min-h-[500px] flex flex-col justify-between">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
              <div className="flex items-center gap-2 text-xs text-zinc-400">
                <ImageIcon className="w-4 h-4 text-lime-400" />
                <span className="font-bold text-white uppercase tracking-wider">Canvas Output</span>
                <span>·</span>
                <span className="font-mono">{imageSize}</span>
                <span>·</span>
                <span>{aspectRatio}</span>
              </div>
              {generatedImage && (
                <a
                  href={generatedImage}
                  download="titan-ai-fitness-render.png"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Save Image</span>
                </a>
              )}
            </div>

            <div className="flex-1 flex items-center justify-center">
              {loading ? (
                <div className="text-center space-y-4 py-20">
                  <div className="w-16 h-16 rounded-full border-4 border-lime-400 border-t-transparent animate-spin mx-auto shadow-[0_0_20px_rgba(163,230,53,0.3)]" />
                  <p className="text-sm font-bold uppercase tracking-wider text-lime-400">
                    Generating High-Fidelity {imageSize} Fitness Visual
                  </p>
                  <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                    Applying athletic lighting, realistic biomechanics, and cinematic color grade...
                  </p>
                </div>
              ) : generatedImage ? (
                <div className="relative w-full rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-black">
                  <img
                    src={generatedImage}
                    alt="AI Generated Fitness Visual"
                    className="w-full h-auto max-h-[640px] object-contain mx-auto"
                  />
                </div>
              ) : (
                <div className="text-center py-20 space-y-3">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-zinc-500">
                    <Sparkles className="w-8 h-8 text-lime-400/60" />
                  </div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-300">
                    Awaiting Generation Directive
                  </h3>
                  <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                    Select your desired resolution (1K, 2K, or 4K), type your vision or choose a preset, then click generate.
                  </p>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-white/5 mt-4 flex items-center justify-between text-[11px] text-zinc-500">
              <span>Powered by Gemini 3 Image Suite & Nano Banana 2.1</span>
              <span>Commercial Gym Visualizer</span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
