'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ColoredTick from '@/components/ColoredTick';
import { DETAILED_SUBSCRIPTIONS, BRANCHES_DATA, SubscriptionPlan } from '@/data/gymData';
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
} from 'lucide-react';

function PaymentContent() {
  const searchParams = useSearchParams();
  const planParam = searchParams.get('plan');
  const billingParam = searchParams.get('billing');

  const [userSelectedPlanId, setUserSelectedPlanId] = useState<string | null>(null);

  const selectedPlan =
    DETAILED_SUBSCRIPTIONS.find((p) => p.id === (userSelectedPlanId || planParam)) ||
    DETAILED_SUBSCRIPTIONS[1]; // Default to Gold

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

  const price = billingCycle === 'annual' ? selectedPlan.annualPrice : selectedPlan.monthlyPrice;
  const initialDue = billingCycle === 'annual' ? selectedPlan.annualPrice * 12 : selectedPlan.monthlyPrice;

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
                Instant digital keycard generation. Activate your pass today with zero signup fees.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              {/* Left Column: Form & Configuration */}
              <div className="lg:col-span-7 space-y-8">
                {/* 1. Select Tier Plan */}
                <div className="bg-[#0f111a] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-4">
                  <h3 className="text-base font-bold uppercase tracking-wider text-white">
                    1. Select Membership Plan
                  </h3>
                  <div className="grid grid-cols-3 gap-3">
                    {DETAILED_SUBSCRIPTIONS.map((plan) => (
                      <button
                        key={plan.id}
                        type="button"
                        onClick={() => setUserSelectedPlanId(plan.id)}
                        className={`p-4 rounded-xl border text-left transition-all ${
                          selectedPlan.id === plan.id
                            ? 'border-lime-400 bg-lime-400/10 text-white shadow-md'
                            : 'border-white/10 bg-white/5 text-zinc-400 hover:border-white/20'
                        }`}
                      >
                        <span className="text-[10px] font-mono font-bold uppercase text-lime-400 block mb-1">
                          {plan.badge}
                        </span>
                        <p className="font-black text-white text-base">{plan.name}</p>
                        <p className="text-xs text-zinc-400 font-mono mt-1">
                          ${billingCycle === 'annual' ? plan.annualPrice : plan.monthlyPrice}/mo
                        </p>
                      </button>
                    ))}
                  </div>

                  {/* Billing cycle radio */}
                  <div className="pt-2 flex items-center justify-between p-3 bg-black/60 rounded-xl border border-white/10">
                    <span className="text-xs font-bold text-zinc-300">Billing Cadence:</span>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setBillingCycle('monthly')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                          billingCycle === 'monthly' ? 'bg-lime-400 text-black' : 'text-zinc-400'
                        }`}
                      >
                        Monthly
                      </button>
                      <button
                        type="button"
                        onClick={() => setBillingCycle('annual')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 ${
                          billingCycle === 'annual' ? 'bg-lime-400 text-black' : 'text-zinc-400'
                        }`}
                      >
                        <span>Annual (Save 20%)</span>
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
                    *Gold and Elite passes include universal access to all regional clubs.
                  </p>
                </div>

                {/* 3. Member Information */}
                <form onSubmit={handleSubmit} className="bg-[#0f111a] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-4">
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
                        placeholder="+1 (555) 482-9900"
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
                          <span>Confirm & Issue Membership Pass (${initialDue})</span>
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
                    {selectedPlan.badge}
                  </span>
                </div>

                <div className="space-y-3">
                  <h3 className="text-2xl font-black text-white uppercase tracking-tight">
                    {selectedPlan.name} Pass
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {selectedPlan.tagline}
                  </p>
                </div>

                <div className="space-y-2.5 py-4 border-t border-b border-white/10 text-xs">
                  <div className="flex justify-between text-zinc-300">
                    <span>Membership Fee ({billingCycle})</span>
                    <span className="font-mono text-white font-bold">${price} / mo</span>
                  </div>
                  <div className="flex justify-between text-zinc-300">
                    <span>Club Induction & Assessment</span>
                    <span className="text-lime-400 font-bold uppercase font-mono">FREE ($99 Value)</span>
                  </div>
                  <div className="flex justify-between text-zinc-300">
                    <span>Titan Digital Keycard</span>
                    <span className="text-lime-400 font-bold uppercase font-mono">FREE</span>
                  </div>
                  <div className="flex justify-between text-zinc-300">
                    <span>Signup Admin Surcharge</span>
                    <span className="text-lime-400 font-bold uppercase font-mono">$0.00</span>
                  </div>
                </div>

                <div className="flex items-baseline justify-between">
                  <span className="text-sm font-bold uppercase text-white">Total Due Today:</span>
                  <div className="text-right">
                    <span className="text-3xl font-black text-white font-mono">${initialDue}</span>
                    <p className="text-[10px] text-zinc-500 font-mono">
                      {billingCycle === 'annual' ? 'Billed annually' : 'Renews monthly'}
                    </p>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block">
                    Your Inclusions:
                  </span>
                  <ul className="space-y-2">
                    {selectedPlan.features.slice(0, 4).map((f, i) => (
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
                Your registration has been activated. A copy has been dispatched to {formData.email}.
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
                  {selectedPlan.name} VIP
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
                  <span className="text-[10px] text-zinc-500 uppercase font-mono block">Valid Thru</span>
                  <p className="text-xs font-mono font-semibold text-zinc-200">October 2027</p>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between relative z-10">
                <div className="flex items-center gap-2 text-xs text-zinc-400">
                  <QrCode size={32} className="text-white" />
                  <span className="text-[11px] leading-tight">
                    Scan at front turnstile for 24/7 biometric keycard access
                  </span>
                </div>
                <span className="text-[10px] font-mono text-zinc-500 uppercase">OFFICIAL PASS</span>
              </div>
            </div>

            <div className="text-center pt-4">
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
    <Suspense fallback={<div className="min-h-screen bg-[#08090d] text-white flex items-center justify-center">Loading Checkout...</div>}>
      <PaymentContent />
    </Suspense>
  );
}
