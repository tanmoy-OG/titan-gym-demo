'use client';

import React, { useState } from 'react';
import { ShieldCheck, Lock, UserCheck, X, Upload, Star } from 'lucide-react';
import { TransformationItem } from '@/data/gymData';

interface MemberAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStoryPublished: (story: TransformationItem) => void;
}

export const MemberAuthModal: React.FC<MemberAuthModalProps> = ({
  isOpen,
  onClose,
  onStoryPublished,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [memberId, setMemberId] = useState('');
  const [memberEmail, setMemberEmail] = useState('');
  const [authError, setAuthError] = useState('');

  // Form fields for new blog post
  const [candidateName, setCandidateName] = useState('');
  const [programName, setProgramName] = useState('Hyrox Performance & Strength');
  const [duration, setDuration] = useState('16 Weeks');
  const [weightLoss, setWeightLoss] = useState('-18 lbs Fat');
  const [muscleGain, setMuscleGain] = useState('+7 lbs Muscle');
  const [rating, setRating] = useState(5);
  const [trainer, setTrainer] = useState('Darius Thorne');
  const [dietFocus, setDietFocus] = useState('High protein & macro balance');
  const [quote, setQuote] = useState('');
  const [fullStory, setFullStory] = useState('');
  const [beforeUrl, setBeforeUrl] = useState('https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=1469&auto=format&fit=crop');
  const [afterUrl, setAfterUrl] = useState('https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=1469&auto=format&fit=crop');

  if (!isOpen) return null;

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!memberId.trim() || !memberEmail.trim()) {
      setAuthError('Please enter your Member ID and registered email.');
      return;
    }

    // Accept valid format or provide instant demonstration verification
    setIsAuthenticated(true);
    setAuthError('');
  };

  const handleQuickDemoAuth = () => {
    setMemberId('TITAN-ELITE-9942');
    setMemberEmail('certified.athlete@titanathletic.com');
    setIsAuthenticated(true);
    setAuthError('');
  };

  const handleSubmitStory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!candidateName || !quote || !fullStory) {
      alert('Please fill out all required fields.');
      return;
    }

    const newStory: TransformationItem = {
      id: `trans-${Date.now()}`,
      name: candidateName,
      age: 30,
      duration,
      weightLoss,
      muscleGain,
      rating,
      program: programName,
      beforeImage: beforeUrl,
      afterImage: afterUrl,
      quote,
      fullStory,
      trainer,
      dietFocus,
      date: 'October 2026',
    };

    onStoryPublished(newStory);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
      <div className="bg-[#0f111a] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] sm:max-h-[88vh] flex flex-col overflow-hidden shadow-2xl relative">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-lime-400" />
            <h3 className="text-lg font-bold text-white uppercase tracking-tight">
              {isAuthenticated ? 'Author Member Transformation Story' : 'Certified Member Verification'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white p-1 rounded-md bg-white/5 border border-white/10 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Step 1: Member Authentication */}
        {!isAuthenticated ? (
          <div className="p-6 sm:p-8 space-y-6 flex-1 min-h-0 overflow-y-auto">
            <div className="bg-lime-400/10 border border-lime-400/20 rounded-xl p-4 text-xs text-lime-300 leading-relaxed">
              <span className="font-bold uppercase tracking-wider block mb-1">
                Access Control Policy:
              </span>
              Blog write-access is restricted strictly to <strong>Certified Gym Members</strong> with an active subscription pass. Enter your member credentials below to submit your official transformation story.
            </div>

            <form onSubmit={handleVerify} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                  Member Barcode ID
                </label>
                <input
                  type="text"
                  placeholder="e.g. TITAN-GOLD-8419"
                  value={memberId}
                  onChange={(e) => setMemberId(e.target.value)}
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-lime-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                  Registered Club Email
                </label>
                <input
                  type="email"
                  placeholder="e.g. member@titanathletic.com"
                  value={memberEmail}
                  onChange={(e) => setMemberEmail(e.target.value)}
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-lime-400"
                />
              </div>

              {authError && <p className="text-xs text-red-400">{authError}</p>}

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-lime-400 hover:bg-lime-300 text-black font-black uppercase text-xs tracking-wider rounded-xl transition-all shadow-[0_0_15px_rgba(163,230,53,0.3)] flex items-center justify-center gap-2"
                >
                  <Lock size={14} />
                  <span>Verify Membership & Unlock</span>
                </button>
                <button
                  type="button"
                  onClick={handleQuickDemoAuth}
                  className="py-3 px-4 bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 font-bold uppercase text-xs tracking-wider rounded-xl transition-all"
                >
                  Quick Demo Verify
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Step 2: Story Submission Form */
          <form onSubmit={handleSubmitStory} className="p-6 sm:p-8 space-y-4 flex-1 min-h-0 overflow-y-auto">
            <div className="flex items-center gap-2 text-xs text-lime-400 font-bold">
              <UserCheck size={16} />
              <span>Verified Certified Member: {memberId || 'TITAN-ATHLETE'}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1">
                  Candidate Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Jordan Mitchell"
                  value={candidateName}
                  onChange={(e) => setCandidateName(e.target.value)}
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-lime-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1">
                  Program Enrolled
                </label>
                <input
                  type="text"
                  value={programName}
                  onChange={(e) => setProgramName(e.target.value)}
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-lime-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1">
                  Duration
                </label>
                <input
                  type="text"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1">
                  Weight Loss
                </label>
                <input
                  type="text"
                  value={weightLoss}
                  onChange={(e) => setWeightLoss(e.target.value)}
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1">
                  Muscle Gain
                </label>
                <input
                  type="text"
                  value={muscleGain}
                  onChange={(e) => setMuscleGain(e.target.value)}
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1">
                  Rating Given to Gym (1-5 Stars)
                </label>
                <div className="flex items-center gap-2 pt-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setRating(s)}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <Star
                        size={22}
                        className={s <= rating ? 'fill-amber-400 text-amber-400' : 'text-zinc-600'}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-amber-400 ml-2">{rating}/5 Stars</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1">
                  Assigned Coach
                </label>
                <input
                  type="text"
                  value={trainer}
                  onChange={(e) => setTrainer(e.target.value)}
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1">
                Headline Quote / Hook *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. In 16 weeks, Titan changed not just my body, but my entire mindset."
                value={quote}
                onChange={(e) => setQuote(e.target.value)}
                className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-lime-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1">
                Detailed Transformation Story *
              </label>
              <textarea
                required
                rows={4}
                placeholder="Detail your training split, nutritional adjustments, hurdles overcome, and what you accomplished..."
                value={fullStory}
                onChange={(e) => setFullStory(e.target.value)}
                className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-lime-400"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 bg-lime-400 hover:bg-lime-300 text-black font-black uppercase text-xs tracking-wider rounded-xl transition-all shadow-[0_0_20px_rgba(163,230,53,0.3)]"
              >
                Publish Transformation Story to Public Blog
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default MemberAuthModal;
