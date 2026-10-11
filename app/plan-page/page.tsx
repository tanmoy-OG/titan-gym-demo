'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ColoredTick from '@/components/ColoredTick';
import ImageWithFallback from '@/components/ImageWithFallback';
import { DETAILED_SUBSCRIPTIONS } from '@/data/gymData';
import { Check, X, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';

const getDetailedTierStyles = (planId: string) => {
  if (planId === 'silver-plan') {
    return {
      cardBg: 'bg-gradient-to-br from-[#181c26] via-[#10131b] to-[#141722]',
      radialGlow: 'radial-gradient(circle at 85% 15%, rgba(203, 213, 225, 0.14) 0%, transparent 60%)',
      border: 'border-slate-400/35 hover:border-slate-300/80',
      shimmerClass: 'animate-shimmer-silver',
      shimmerGradient: 'bg-gradient-to-r from-transparent via-white/20 to-transparent',
      shadow: 'shadow-[0_4px_30px_rgba(0,0,0,0.5),0_0_20px_rgba(203,213,225,0.08)] hover:shadow-[0_0_35px_rgba(203,213,225,0.22)]',
      badgeColor: 'text-slate-300',
    };
  }
  if (planId === 'gold-plan') {
    return {
      cardBg: 'bg-gradient-to-br from-[#271d0e] via-[#151108] to-[#20180a]',
      radialGlow: 'radial-gradient(circle at 85% 15%, rgba(245, 158, 11, 0.22) 0%, transparent 60%)',
      border: 'border-amber-500/45 hover:border-amber-400/90',
      shimmerClass: 'animate-shimmer-gold',
      shimmerGradient: 'bg-gradient-to-r from-transparent via-amber-200/25 to-transparent',
      shadow: 'shadow-[0_4px_30px_rgba(0,0,0,0.5),0_0_25px_rgba(245,158,11,0.16)] hover:shadow-[0_0_40px_rgba(251,191,36,0.32)] ring-1 ring-amber-400/30',
      badgeColor: 'text-amber-400',
    };
  }
  return {
    cardBg: 'bg-gradient-to-br from-[#0e2034] via-[#091321] to-[#12263d]',
    radialGlow: 'radial-gradient(circle at 85% 15%, rgba(56, 189, 248, 0.22) 0%, transparent 60%)',
    border: 'border-cyan-400/45 hover:border-cyan-300/90',
    shimmerClass: 'animate-shimmer-platinum',
    shimmerGradient: 'bg-gradient-to-r from-transparent via-cyan-100/25 to-transparent',
    shadow: 'shadow-[0_4px_30px_rgba(0,0,0,0.5),0_0_25px_rgba(56,189,248,0.16)] hover:shadow-[0_0_40px_rgba(56,189,248,0.32)]',
    badgeColor: 'text-cyan-300',
  };
};

export default function PlanPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  const comparisonFeatures = [
    { name: 'Cardio & Strength Gym Floor Access', silver: true, gold: true, elite: true },
    { name: 'Olympic Barbell & Eleiko Rig Access', silver: true, gold: true, elite: true },
    { name: 'Executive Locker Rooms & Rain Showers', silver: true, gold: true, elite: true },
    { name: 'Multi-Branch Citywide Passport', silver: false, gold: true, elite: true },
    { name: 'Unlimited Group Fitness & Zumba', silver: false, gold: true, elite: true },
    { name: 'HIIT Forge & Conditioning Circuits', silver: false, gold: true, elite: true },
    { name: 'Cedar Infrared Saunas & Cold Plunges', silver: false, gold: true, elite: true },
    { name: 'Monthly InBody 770 Biometric Scans', silver: false, gold: true, elite: true },
    { name: 'Hyrox Competition Turf Arena', silver: false, gold: false, elite: true },
    { name: 'Monthly 1-on-1 Personal Training Included', silver: false, gold: false, elite: true },
    { name: 'Normatec Compression & Cryotherapy Suite', silver: false, gold: false, elite: true },
    { name: 'Unlimited Guest Passes', silver: false, gold: false, elite: true },
  ];

  return (
    <div className="min-h-screen bg-[#08090d] text-white flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Banner */}
        <section className="py-20 bg-gradient-to-b from-[#0b0d14] to-[#08090d] border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime-400/10 border border-lime-400/25 text-lime-400 text-xs font-bold uppercase tracking-wider">
              <span>Full Tier Transparency</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white">
              Membership Plans & Inclusions
            </h1>
            <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto">
              Compare our Silver, Gold, and Elite memberships side by side to pick the exact tier that empowers your athletic journey.
            </p>

            {/* Billing Toggle: Monthly vs Annual (2 Months Free) */}
            <div className="pt-6 inline-flex p-1 bg-black/60 rounded-xl border border-white/10">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`py-2 px-5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
                  billingCycle === 'monthly'
                    ? 'bg-lime-400 text-black shadow-md'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Monthly Billing
              </button>
              <button
                onClick={() => setBillingCycle('annual')}
                className={`py-2 px-5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all flex items-center gap-2 ${
                  billingCycle === 'annual'
                    ? 'bg-lime-400 text-black shadow-md'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <span>Annual Billing</span>
                <span className="bg-emerald-500/30 text-emerald-300 text-[10px] px-1.5 py-0.5 rounded font-black">
                  Save 20%
                </span>
              </button>
            </div>
          </div>
        </section>

        {/* Plan Cards */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {DETAILED_SUBSCRIPTIONS.map((plan) => {
              const price = billingCycle === 'annual' ? plan.annualPrice : plan.monthlyPrice;
              const styles = getDetailedTierStyles(plan.id);
              return (
                <div
                  key={plan.id}
                  className={`relative rounded-3xl overflow-hidden p-8 border ${styles.border} ${styles.cardBg} ${styles.shadow} flex flex-col justify-between group hover:-translate-y-1.5 transition-all duration-500`}
                >
                  {/* Subtle Ambient Radial Glow */}
                  <div
                    className="pointer-events-none absolute inset-0 opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: styles.radialGlow }}
                  />

                  {/* Metallic Shimmer Sweep Light Beam */}
                  <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div
                      className={`absolute -top-12 -bottom-12 w-48 ${styles.shimmerGradient} ${styles.shimmerClass} blur-[1px] opacity-70 group-hover:opacity-100 transition-opacity duration-300`}
                    />
                  </div>

                  <div className="relative z-10 space-y-6">
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-mono font-bold uppercase tracking-wider ${styles.badgeColor}`}>
                        {plan.badge}
                      </span>
                      {plan.popular && (
                        <span className="px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider bg-amber-400 text-black rounded-full shadow-md">
                          Top Choice
                        </span>
                      )}
                    </div>

                    <div>
                      <h3 className="text-3xl font-black text-white uppercase tracking-tight">
                        {plan.name}
                      </h3>
                      <p className="text-xs text-zinc-400 mt-1">{plan.accessScope}</p>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-baseline gap-2 whitespace-nowrap">
                        <span className="text-4xl sm:text-5xl font-black text-white font-mono tabular-nums tracking-tight">
                          ₹{price.toLocaleString('en-IN')}
                        </span>
                        <span className="text-xs text-zinc-300 font-bold uppercase tracking-wider">
                          / month
                        </span>
                      </div>
                      <p className="text-[11px] font-mono text-zinc-400">
                        {billingCycle === 'annual'
                          ? `Billed annually at ₹${(price * 12).toLocaleString('en-IN')} / yr (Save ~20%)`
                          : `Or ₹${plan.annualPrice.toLocaleString('en-IN')} / mo if billed annually`}
                      </p>
                    </div>

                    <p className="text-xs text-zinc-300 leading-relaxed">{plan.tagline}</p>

                    <div className="space-y-3 pt-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block">
                        Included Features:
                      </span>
                      <ul className="space-y-2.5">
                        {plan.features.map((feat, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-xs text-zinc-200">
                            <ColoredTick color={plan.id === 'gold-plan' ? 'amber' : plan.id === 'silver-plan' ? 'slate' : 'cyan'} size="sm" className="mt-0.5" />
                            <span className="leading-snug">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="relative z-10 pt-8 mt-6 border-t border-white/10">
                    <Link
                      href={`/payment?plan=${plan.id}&billing=${billingCycle}`}
                      className={`w-full py-3.5 rounded-xl font-black uppercase tracking-wider text-xs transition-all flex items-center justify-center gap-2 ${
                        plan.id === 'gold-plan'
                          ? 'bg-amber-400 hover:bg-amber-300 text-black shadow-[0_0_20px_rgba(245,158,11,0.3)]'
                          : plan.id === 'silver-plan'
                          ? 'bg-slate-200 hover:bg-white text-black shadow-[0_0_20px_rgba(203,213,225,0.2)]'
                          : 'bg-cyan-400 hover:bg-cyan-300 text-black shadow-[0_0_20px_rgba(56,189,248,0.3)]'
                      }`}
                    >
                      <span>Choose {plan.name} Pass</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Feature Comparison Matrix */}
        <section className="py-20 bg-[#0a0c12] border-t border-b border-white/5">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-lime-400 block mb-1">
                Detailed Matrix
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
                Plan Comparison Grid
              </h2>
            </div>

            <div className="bg-[#0f111a] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-black/60 border-b border-white/10">
                    <tr>
                      <th className="py-4 px-6 font-bold uppercase text-zinc-400">Amenity / Benefit</th>
                      <th className="py-4 px-6 font-bold uppercase text-center text-white">Silver</th>
                      <th className="py-4 px-6 font-bold uppercase text-center text-lime-400">Gold</th>
                      <th className="py-4 px-6 font-bold uppercase text-center text-cyan-400">Elite</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {comparisonFeatures.map((feat, i) => (
                      <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-3.5 px-6 font-medium text-zinc-300">{feat.name}</td>
                        <td className="py-3.5 px-6 text-center">
                          {feat.silver ? (
                            <Check size={16} className="text-lime-400 mx-auto" />
                          ) : (
                            <X size={16} className="text-zinc-600 mx-auto" />
                          )}
                        </td>
                        <td className="py-3.5 px-6 text-center">
                          {feat.gold ? (
                            <Check size={16} className="text-lime-400 mx-auto" />
                          ) : (
                            <X size={16} className="text-zinc-600 mx-auto" />
                          )}
                        </td>
                        <td className="py-3.5 px-6 text-center">
                          {feat.elite ? (
                            <Check size={16} className="text-lime-400 mx-auto" />
                          ) : (
                            <X size={16} className="text-zinc-600 mx-auto" />
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
