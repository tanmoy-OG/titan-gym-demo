'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ColoredTick from '@/components/ColoredTick';
import {
  DETAILED_SUBSCRIPTIONS,
  ALL_PROGRAMS,
  BRANCHES_DATA,
  SubscriptionPlan,
  ProgramItem,
} from '@/data/gymData';
import {
  CreditCard,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  QrCode,
  Sparkles,
  MapPin,
  Calendar,
  Dumbbell,
  Layers,
} from 'lucide-react';

// Standalone Programs (excludes tier packages Silver, Gold, Platinum per specification)
const STANDALONE_PROGRAMS = ALL_PROGRAMS.filter((p) => p.category !== 'Tier');

function PaymentContent() {
  const searchParams = useSearchParams();
  const planParam = searchParams.get('plan');
  const programParam = searchParams.get('program');
  const billingParam = searchParams.get('billing');

  // Determine initial mode: if a tier or silver/gold/platinum is requested, open 'tier' mode, otherwise 'program' if specific program requested
  const isTierRequested =
    Boolean(planParam) ||
    programParam === 'silver' ||
    programParam === 'gold' ||
    programParam === 'platinum';

  const [checkoutType, setCheckoutType] = useState<'program' | 'tier'>(
    isTierRequested ? 'tier' : (programParam ? 'program' : 'program')
  );

  // Selected Program (defaults to requested slug, or first standalone program)
  const initialProgram =
    STANDALONE_PROGRAMS.find((p) => p.slug === programParam || p.id === programParam) ||
    STANDALONE_PROGRAMS[0];
  const [selectedProgramId, setSelectedProgramId] = useState<string>(initialProgram.id);

  // Selected Tier Plan (defaults to requested plan, or Gold)
  const initialPlan =
    DETAILED_SUBSCRIPTIONS.find((p) => p.id === planParam) ||
    (programParam === 'silver'
      ? DETAILED_SUBSCRIPTIONS[0]
      : programParam === 'platinum'
      ? DETAILED_SUBSCRIPTIONS[2]
      : DETAILED_SUBSCRIPTIONS[1]);
  const [selectedPlanId, setSelectedPlanId] = useState<string>(initialPlan.id);

  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>(
    billingParam === 'annual' ? 'annual' : 'monthly'
  );
  const [selectedBranch, setSelectedBranch] = useState(BRANCHES_DATA[0].id);

  // Form
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    cardNumber: '•••• •••• •••• 4242',
    cardExp: '12/28',
    cardCvc: '888',
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [digitalPassId, setDigitalPassId] = useState('');

  // Keep track of the last URL parameters processed to only sync if external navigation changes them
  const prevParamsRef = useRef({ planParam, programParam });

  useEffect(() => {
    if (
      prevParamsRef.current.planParam !== planParam ||
      prevParamsRef.current.programParam !== programParam
    ) {
      prevParamsRef.current = { planParam, programParam };

      if (programParam === 'silver' || programParam === 'gold' || programParam === 'platinum') {
        setCheckoutType('tier');
        setSelectedPlanId(
          programParam === 'silver'
            ? 'silver-plan'
            : programParam === 'gold'
            ? 'gold-plan'
            : 'elite-plan'
        );
      } else if (programParam) {
        const match = STANDALONE_PROGRAMS.find((p) => p.slug === programParam || p.id === programParam);
        if (match) {
          setCheckoutType('program');
          setSelectedProgramId(match.id);
        }
      } else if (planParam) {
        const match = DETAILED_SUBSCRIPTIONS.find((p) => p.id === planParam);
        if (match) {
          setCheckoutType('tier');
          setSelectedPlanId(match.id);
        }
      }
    }
  }, [planParam, programParam]);

  const selectedProgram =
    STANDALONE_PROGRAMS.find((p) => p.id === selectedProgramId) || STANDALONE_PROGRAMS[0];
  const selectedPlan =
    DETAILED_SUBSCRIPTIONS.find((p) => p.id === selectedPlanId) || DETAILED_SUBSCRIPTIONS[1];

  const isProgramCheckout = checkoutType === 'program';
  const activeTitle = isProgramCheckout ? `${selectedProgram.title} Pass` : `${selectedPlan.name} Pass`;
  const activeBadge = isProgramCheckout ? `${selectedProgram.category} Pass` : (selectedPlan.badge || 'Tier Pass');
  const activeTagline = isProgramCheckout ? selectedProgram.shortSubject : selectedPlan.tagline;
  const activeFeatures = isProgramCheckout ? selectedProgram.checklist : selectedPlan.features;

  const price = isProgramCheckout
    ? (billingCycle === 'annual' ? selectedProgram.annualPrice : selectedProgram.monthlyPrice)
    : (billingCycle === 'annual' ? selectedPlan.annualPrice : selectedPlan.monthlyPrice);

  const initialDue = billingCycle === 'annual' ? price * 12 : price;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone) {
      alert('Please fill out all member registration fields.');
      return;
    }
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setDigitalPassId(`TAC-${Math.floor(100000 + Math.random() * 900000)}`);
      setIsCompleted(true);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#08090d] text-white flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 w-full">
        {!isCompleted ? (
          <div>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-lime-400 block mb-2">
                Fast & Secure Registration
              </span>
              <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
                Complete Your Membership Pass
              </h1>
              <p className="mt-2 text-zinc-400 text-sm">
                Instant digital keycard generation. Activate your standalone program pass or all-inclusive tier with zero signup fees.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              {/* Left Column: Form & Configuration */}
              <div className="lg:col-span-7 space-y-8">
                {/* 1. Select Program or Membership Tier */}
                <div className="bg-[#0f111a] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
                    <div>
                      <h3 className="text-base font-bold uppercase tracking-wider text-white">
                        1. Select Payment Option
                      </h3>
                      <p className="text-xs text-zinc-400 mt-0.5">
                        Choose between an individual training program pass or an all-inclusive club tier.
                      </p>
                    </div>

                    {/* Toggle Switch */}
                    <div className="inline-flex p-1 bg-black/70 rounded-xl border border-white/15 shrink-0 self-start sm:self-auto">
                      <button
                        type="button"
                        onClick={() => setCheckoutType('program')}
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                          checkoutType === 'program'
                            ? 'bg-lime-400 text-black shadow-md font-black'
                            : 'text-zinc-400 hover:text-white'
                        }`}
                      >
                        <Dumbbell size={13} />
                        <span>Single Programs ({STANDALONE_PROGRAMS.length})</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setCheckoutType('tier')}
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                          checkoutType === 'tier'
                            ? 'bg-lime-400 text-black shadow-md font-black'
                            : 'text-zinc-400 hover:text-white'
                        }`}
                      >
                        <Layers size={13} />
                        <span>All-Access Tiers ({DETAILED_SUBSCRIPTIONS.length})</span>
                      </button>
                    </div>
                  </div>

                  {/* Program Selection Cards: Only Standalone Programs (Silver/Gold/Platinum excluded) */}
                  {checkoutType === 'program' ? (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                          Select Specific Training Program:
                        </span>
                        <span className="text-[11px] text-lime-400 font-mono">
                          Standalone access without bundle
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[380px] overflow-y-auto pr-1 custom-scrollbar">
                        {STANDALONE_PROGRAMS.map((prog) => {
                          const isSelected = selectedProgram.id === prog.id;
                          const progPrice =
                            billingCycle === 'annual' ? prog.annualPrice : prog.monthlyPrice;
                          return (
                            <button
                              key={prog.id}
                              type="button"
                              onClick={() => setSelectedProgramId(prog.id)}
                              className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between ${
                                isSelected
                                  ? 'border-lime-400 bg-lime-400/10 text-white shadow-[0_0_20px_rgba(163,230,53,0.15)] ring-1 ring-lime-400/40'
                                  : 'border-white/10 bg-white/5 text-zinc-400 hover:border-white/20 hover:bg-white/[0.08]'
                              }`}
                            >
                              <div>
                                <div className="flex items-center justify-between gap-1 mb-1.5">
                                  <span className="text-[10px] font-mono font-bold uppercase text-lime-400">
                                    {prog.category} Curriculum
                                  </span>
                                  <span className="text-[10px] text-zinc-500 font-mono">
                                    {prog.intensity}
                                  </span>
                                </div>
                                <p className="font-black text-white text-base leading-tight">
                                  {prog.title}
                                </p>
                                <p className="text-[11px] text-zinc-400 line-clamp-1 mt-1">
                                  {prog.shortSubject}
                                </p>
                              </div>
                              <div className="mt-3.5 pt-2.5 border-t border-white/10 flex items-baseline justify-between">
                                <div>
                                  <div className="flex items-baseline gap-1 whitespace-nowrap">
                                    <span className="text-sm font-mono font-bold text-white">
                                      ₹{progPrice.toLocaleString('en-IN')}
                                    </span>
                                    <span className="text-[10px] text-zinc-400 font-normal">/ mo</span>
                                  </div>
                                  <p className="text-[10px] text-zinc-500 font-mono mt-0.5">
                                    {billingCycle === 'annual'
                                      ? 'Billed annually'
                                      : `₹${prog.annualPrice.toLocaleString('en-IN')}/mo annual`}
                                  </p>
                                </div>
                                {isSelected ? (
                                  <span className="text-[10px] text-lime-400 font-bold uppercase flex items-center gap-1 shrink-0">
                                    <CheckCircle2 size={12} />
                                    Active
                                  </span>
                                ) : (
                                  <span className="text-[10px] text-zinc-500 hover:text-zinc-300 shrink-0">
                                    Select
                                  </span>
                                )}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    /* Tier Selection Cards: Only All-Access Tiers (Silver, Gold, Platinum) */
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                          Select All-Inclusive Membership Tier:
                        </span>
                        <span className="text-[11px] text-zinc-400 font-mono">
                          Universal facility access
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {DETAILED_SUBSCRIPTIONS.map((plan) => {
                          const planPrice =
                            billingCycle === 'annual' ? plan.annualPrice : plan.monthlyPrice;
                          const isSelected = selectedPlan.id === plan.id;
                          return (
                            <button
                              key={plan.id}
                              type="button"
                              onClick={() => setSelectedPlanId(plan.id)}
                              className={`p-4 rounded-xl border text-left transition-all ${
                                isSelected
                                  ? 'border-lime-400 bg-lime-400/10 text-white shadow-md ring-1 ring-lime-400/40'
                                  : 'border-white/10 bg-white/5 text-zinc-400 hover:border-white/20 hover:bg-white/[0.08]'
                              }`}
                            >
                              <span className="text-[10px] font-mono font-bold uppercase text-lime-400 block mb-1">
                                {plan.badge}
                              </span>
                              <p className="font-black text-white text-base">{plan.name}</p>
                              <div className="mt-2 space-y-0.5">
                                <div className="flex items-baseline gap-1 whitespace-nowrap">
                                  <span className="text-base font-mono font-bold text-white">
                                    ₹{planPrice.toLocaleString('en-IN')}
                                  </span>
                                  <span className="text-[10px] text-zinc-400 font-normal">/ mo</span>
                                </div>
                                <p className="text-[10px] text-zinc-500 font-mono">
                                  {billingCycle === 'annual'
                                    ? 'Billed annually'
                                    : `₹${plan.annualPrice.toLocaleString('en-IN')}/mo annual`}
                                </p>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Billing cycle radio */}
                  <div className="pt-2 flex items-center justify-between p-3.5 bg-black/60 rounded-xl border border-white/10">
                    <span className="text-xs font-bold text-zinc-300">Billing Cadence:</span>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setBillingCycle('monthly')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          billingCycle === 'monthly'
                            ? 'bg-lime-400 text-black font-black shadow-md'
                            : 'text-zinc-400 hover:text-white'
                        }`}
                      >
                        Monthly
                      </button>
                      <button
                        type="button"
                        onClick={() => setBillingCycle('annual')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                          billingCycle === 'annual'
                            ? 'bg-lime-400 text-black font-black shadow-md'
                            : 'text-zinc-400 hover:text-white'
                        }`}
                      >
                        <span>Annual (Save ~20%)</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* 2. Select Home Branch */}
                <div className="bg-[#0f111a] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-4">
                  <h3 className="text-base font-bold uppercase tracking-wider text-white">
                    2. Select Primary Home Branch
                  </h3>
                  <select
                    value={selectedBranch}
                    onChange={(e) => setSelectedBranch(e.target.value)}
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-lime-400"
                  >
                    {BRANCHES_DATA.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.name} ({b.area})
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-zinc-500">
                    {isProgramCheckout
                      ? `*Your ${selectedProgram.title} pass is registered at this home branch and provides access to all scheduled ${selectedProgram.title} facilities.`
                      : '*Gold and Elite passes include universal access to all regional clubs.'}
                  </p>
                </div>

                {/* 3. Member Information */}
                <form
                  onSubmit={handleSubmit}
                  className="bg-[#0f111a] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-4"
                >
                  <h3 className="text-base font-bold uppercase tracking-wider text-white">
                    3. Athlete Profile & Payment
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Marcus Vance"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-lime-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98300 12345"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-lime-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="marcus@athlete.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-lime-400"
                    />
                  </div>

                  <div className="pt-2 border-t border-white/10 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                        Card Details (Simulation Mode)
                      </span>
                      <div className="flex items-center gap-1.5 text-xs text-lime-400">
                        <Lock size={12} />
                        <span>256-Bit SSL Encrypted</span>
                      </div>
                    </div>

                    <div className="relative">
                      <CreditCard className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={formData.cardNumber}
                        onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                        className="w-full pl-10 pr-4 py-2.5 bg-black/60 border border-white/10 rounded-xl text-xs sm:text-sm text-white font-mono"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        value={formData.cardExp}
                        onChange={(e) => setFormData({ ...formData, cardExp: e.target.value })}
                        placeholder="MM/YY"
                        className="w-full px-4 py-2.5 bg-black/60 border border-white/10 rounded-xl text-xs sm:text-sm text-white font-mono"
                      />
                      <input
                        type="text"
                        value={formData.cardCvc}
                        onChange={(e) => setFormData({ ...formData, cardCvc: e.target.value })}
                        placeholder="CVC"
                        className="w-full px-4 py-2.5 bg-black/60 border border-white/10 rounded-xl text-xs sm:text-sm text-white font-mono"
                      />
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="w-full py-4 rounded-xl bg-lime-400 hover:bg-lime-300 disabled:opacity-50 text-black font-black uppercase tracking-wider text-xs sm:text-sm transition-all shadow-[0_0_25px_rgba(163,230,53,0.35)] flex items-center justify-center gap-2"
                    >
                      {isProcessing ? (
                        <span>Activating Pass On Titan Roster...</span>
                      ) : (
                        <>
                          <ShieldCheck size={16} />
                          <span>
                            Confirm & Issue {activeTitle} (₹{initialDue.toLocaleString('en-IN')})
                          </span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>

              {/* Right Column: Order Summary Card */}
              <div className="lg:col-span-5 bg-[#0f111a] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6 sticky top-28">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                    Order Summary
                  </span>
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-black uppercase bg-lime-400 text-black font-mono">
                    {activeBadge}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-lime-400">
                      {isProgramCheckout ? 'Standalone Program Enrollment' : 'All-Inclusive Club Tier'}
                    </span>
                  </div>
                  <h3 className="text-2xl font-black text-white uppercase tracking-tight">
                    {activeTitle}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {activeTagline}
                  </p>
                </div>

                <div className="space-y-2.5 py-4 border-t border-b border-white/10 text-xs">
                  <div className="flex justify-between text-zinc-300">
                    <span>
                      {isProgramCheckout ? 'Program Tuition Fee' : 'Membership Fee'} ({billingCycle})
                    </span>
                    <span className="font-mono text-white font-bold whitespace-nowrap">
                      ₹{price.toLocaleString('en-IN')} / mo
                    </span>
                  </div>
                  <div className="flex justify-between text-zinc-300">
                    <span>Club Induction & Biometrics Assessment</span>
                    <span className="text-lime-400 font-bold uppercase font-mono">FREE (₹1,499 Value)</span>
                  </div>
                  <div className="flex justify-between text-zinc-300">
                    <span>Titan Digital Keycard</span>
                    <span className="text-lime-400 font-bold uppercase font-mono">FREE</span>
                  </div>
                  <div className="flex justify-between text-zinc-300">
                    <span>Signup Admin Surcharge</span>
                    <span className="text-lime-400 font-bold uppercase font-mono">₹0.00</span>
                  </div>
                </div>

                <div className="flex items-baseline justify-between">
                  <span className="text-sm font-bold uppercase text-white">Total Due Today:</span>
                  <div className="text-right">
                    <span className="text-3xl font-black text-white font-mono">
                      ₹{initialDue.toLocaleString('en-IN')}
                    </span>
                    <p className="text-[10px] text-zinc-500 font-mono">
                      {billingCycle === 'annual' ? 'Billed annually' : 'Renews monthly'}
                    </p>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block">
                    {isProgramCheckout ? 'Program Curriculum Inclusions:' : 'Tier Inclusions:'}
                  </span>
                  <ul className="space-y-2">
                    {activeFeatures.slice(0, 4).map((f, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-zinc-300">
                        <ColoredTick color="lime" size="sm" className="mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Success Screen: Instant Digital Pass */
          <div className="max-w-2xl mx-auto py-8 space-y-8 animate-in fade-in duration-300">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-lime-400/20 border-2 border-lime-400 flex items-center justify-center text-lime-400 mx-auto">
                <CheckCircle2 size={36} />
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
                Welcome To The Club, {formData.fullName}!
              </h2>
              <p className="text-xs sm:text-sm text-zinc-300">
                Your registration for the <strong className="text-white">{activeTitle}</strong> has been activated. A copy has been dispatched to {formData.email}.
              </p>
            </div>

            {/* Digital Keycard Pass */}
            <div className="relative bg-gradient-to-br from-zinc-900 via-[#0e121a] to-black border-2 border-lime-400/60 rounded-3xl p-8 shadow-[0_0_40px_rgba(163,230,53,0.25)] space-y-6 overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Sparkles size={160} className="text-lime-400" />
              </div>

              <div className="flex items-center justify-between relative z-10 border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-6 bg-lime-400 skew-x-[-12deg]" />
                  <span className="font-black text-lg text-white uppercase tracking-tight">
                    TITAN ATHLETIC CLUB
                  </span>
                </div>
                <span className="px-3 py-1 rounded-full bg-lime-400 text-black font-black text-xs uppercase font-mono">
                  {isProgramCheckout ? `${selectedProgram.title} Pass` : `${selectedPlan.name} VIP`}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 relative z-10">
                <div>
                  <span className="text-[10px] text-zinc-500 uppercase font-mono block">Athlete</span>
                  <p className="text-lg font-bold text-white">{formData.fullName}</p>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-500 uppercase font-mono block">Pass ID</span>
                  <p className="text-lg font-mono font-bold text-lime-400">{digitalPassId}</p>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-500 uppercase font-mono block">Home Facility</span>
                  <p className="text-xs font-semibold text-zinc-200">
                    {BRANCHES_DATA.find((b) => b.id === selectedBranch)?.name || 'Downtown Flagship'}
                  </p>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-500 uppercase font-mono block">Registration Type</span>
                  <p className="text-xs font-mono font-semibold text-lime-400">
                    {isProgramCheckout ? `Standalone ${selectedProgram.title}` : `${selectedPlan.name} Tier Pass`}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between relative z-10">
                <div className="flex items-center gap-2 text-xs text-zinc-400">
                  <QrCode size={32} className="text-white" />
                  <span className="text-[11px] leading-tight">
                    Scan at front turnstile for keycard access to {isProgramCheckout ? selectedProgram.title : 'Titan Facilities'}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-zinc-500 uppercase">OFFICIAL PASS</span>
              </div>
            </div>

            <div className="text-center pt-4 flex flex-wrap justify-center gap-4">
              <Link
                href="/programs"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold uppercase tracking-wider text-xs transition-all border border-white/10"
              >
                <span>Browse Other Programs</span>
              </Link>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-lime-400 hover:bg-lime-300 text-black font-black uppercase tracking-wider text-xs transition-all shadow-lg"
              >
                <span>Return To Club Home</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default function PaymentPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#08090d] text-white flex items-center justify-center font-mono text-sm">
          Loading Checkout...
        </div>
      }
    >
      <PaymentContent />
    </Suspense>
  );
}
