'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ColoredTick from '@/components/ColoredTick';
import ImageWithFallback from '@/components/ImageWithFallback';
import ScrollZoomSection from '@/components/ScrollZoomSection';
import TransformationCard from '@/components/TransformationSlider';
import BranchSlider from '@/components/BranchSlider';
import SearchGroundingWidget from '@/components/SearchGroundingWidget';
import {
  MINIMAL_PROGRAMS,
  DETAILED_SUBSCRIPTIONS,
  TRANSFORMATIONS_DATA,
  GYM_INFO,
} from '@/data/gymData';
import {
  ArrowRight,
  Flame,
  Award,
  Sparkles,
  Phone,
  Mail,
  MessageSquare,
  ShieldCheck,
  Send,
  CheckCircle2,
} from 'lucide-react';

export default function HomePage() {
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', phone: '', goal: 'Strength & Conditioning' });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#08090d] text-white flex flex-col selection:bg-lime-400 selection:text-black">
      <Header />

      <main className="flex-1">
        {/* =========================================================================
            1. HERO SECTION
            Background: Cinematic video / high-octane workout motion backdrop
            Content: Catchy and hooking hero texts
        ========================================================================= */}
        <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden border-b border-white/5">
          {/* Cinematic Background Video / Overlay */}
          <div className="absolute inset-0 z-0">
            <video
              autoPlay
              loop
              muted
              playsInline
              poster="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop"
              className="w-full h-full object-cover scale-105"
            >
              {/* High quality royalty-free athletic video loops */}
              <source
                src="https://assets.mixkit.co/videos/preview/mixkit-athlete-working-out-with-a-barbell-in-a-gym-44026-large.mp4"
                type="video/mp4"
              />
              <source
                src="https://assets.mixkit.co/videos/preview/mixkit-man-training-with-a-kettlebell-in-a-gym-44027-large.mp4"
                type="video/mp4"
              />
            </video>
            {/* Scrim Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#08090d] via-[#08090d]/65 to-black/75" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#08090d]/50 to-[#08090d]" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
            {/* Catchy kicker */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-lime-400/10 border border-lime-400/30 text-lime-400 text-xs sm:text-sm font-bold uppercase tracking-widest mb-6 backdrop-blur-md">
              <Flame className="w-4 h-4 text-lime-400" />
              <span>Forged For Greatness · Metropolis Flagship Arena</span>
            </div>

            {/* Hooking Hero Headline */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white max-w-5xl mx-auto leading-[0.98] drop-shadow-2xl">
              Where Relentless Iron Meets <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 via-emerald-300 to-lime-200">Unstoppable Humans.</span>
            </h1>

            {/* Subtext */}
            <p className="mt-6 text-base sm:text-xl text-zinc-300 max-w-2xl mx-auto leading-relaxed font-normal">
              Elevate your physical capability with Olympic barbell platforms, official Hyrox tracks, contrast recovery spas, and world-class athletic coaching.
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/payment"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-lime-400 hover:bg-lime-300 text-black font-black uppercase tracking-wider text-sm transition-all shadow-[0_0_30px_rgba(163,230,53,0.4)] hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
              >
                <span>Get Membership Pass</span>
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/programs"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold uppercase tracking-wider text-sm transition-all backdrop-blur-md flex items-center justify-center gap-2"
              >
                <span>Explore All 10 Programs</span>
              </Link>
            </div>

            {/* Social Trust Metrics */}
            <div className="mt-16 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-left">
              <div className="space-y-1">
                <p className="text-2xl sm:text-3xl font-black text-white font-mono tabular-nums">14+ Years</p>
                <p className="text-xs text-zinc-400 uppercase tracking-wider">Heritage of Strength</p>
              </div>
              <div className="space-y-1">
                <p className="text-2xl sm:text-3xl font-black text-lime-400 font-mono tabular-nums">25,000+</p>
                <p className="text-xs text-zinc-400 uppercase tracking-wider">Active Athletes</p>
              </div>
              <div className="space-y-1">
                <p className="text-2xl sm:text-3xl font-black text-white font-mono tabular-nums">4 Clubs</p>
                <p className="text-xs text-zinc-400 uppercase tracking-wider">Regional Arenas</p>
              </div>
              <div className="space-y-1">
                <p className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono tabular-nums">100%</p>
                <p className="text-xs text-zinc-400 uppercase tracking-wider">Evidence-Based</p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. PROGRAMS MINIMAL
            layout: Minimal Cards
            cards: ["Silver", "Gold", "Platinum"]
            card_content:
              title: Program Name
              subject: A few words emphasizing access and inclusions
              price: Hidden
        ========================================================================= */}
        <section className="py-24 bg-[#0a0c12] relative border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs font-bold uppercase tracking-wider text-lime-400 block mb-2">
                Tiered Access Architecture
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
                Programs Minimal
              </h2>
              <p className="mt-3 text-zinc-400 text-sm sm:text-base">
                Tailored tiers crafted to fit your discipline, schedule, and athletic goals.
              </p>
            </div>

            {/* 3 Minimal Cards: Silver, Gold, Platinum (Price Hidden) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {MINIMAL_PROGRAMS.map((prog) => (
                <div
                  key={prog.tier}
                  className={`bg-[#0f111a] rounded-2xl p-8 border ${prog.border} shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-400">
                        {prog.highlight}
                      </span>
                      <span className={`w-3 h-3 rounded-full bg-gradient-to-r ${prog.color}`} />
                    </div>

                    {/* Program Name */}
                    <h3 className="text-2xl font-black text-white uppercase tracking-tight group-hover:text-lime-400 transition-colors">
                      {prog.title}
                    </h3>

                    {/* Subject: Access & inclusions (Price Hidden) */}
                    <p className="text-sm text-zinc-300 leading-relaxed">
                      {prog.subject}
                    </p>
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                    <span className="text-xs text-zinc-500 font-medium">All-Inclusive Pass</span>
                    <Link
                      href="/programs"
                      className="text-xs font-bold text-lime-400 hover:text-lime-300 flex items-center gap-1 group/btn"
                    >
                      <span>View Program</span>
                      <ArrowRight size={13} className="group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            3. ADVERTISING SECTION 1 - SINGLE SUBSCRIPTION
            content: Caption advertising one single subscription for all fitness needs
            visuals: Multiple relevant stock pictures
            animation: Fade in and progressive zoom-in as user scrolls down
        ========================================================================= */}
        <ScrollZoomSection
          id="single-subscription-ad"
          badge="Unified Athletic Passport"
          title="One Single Subscription. Endless Athletic Possibilities."
          caption="Eliminate fragmented memberships. Your Titan Club Pass grants you frictionless access to top-of-the-line strength floors, Olympic lifting zones, sprint turfs, recovery spas, and multi-branch locations under a single transparent subscription."
          highlights={[
            'Single card access across all 4 metropolitan locations',
            'Full Olympic lifting equipment by Eleiko and Rogue Fitness',
            'Unrestricted access to contrast saunas and cold plunges',
            'Zero peak-hour surcharges or hidden facility maintenance fees',
          ]}
          ctaLabel="Unlock Single Pass"
          ctaHref="/payment"
          images={[
            {
              src: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop',
              alt: 'Single Subscription Gym Floor',
              title: 'Main Floor & Free Weights',
            },
            {
              src: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1470&auto=format&fit=crop',
              alt: 'Turf Sprint Zone',
              title: 'Indoor Hyrox Turf',
            },
            {
              src: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=1469&auto=format&fit=crop',
              alt: 'Olympic Platform',
              title: 'Olympic Platforms',
            },
          ]}
        />

        {/* =========================================================================
            4. ADVERTISING SECTION 2 - TRAINER & GROUP PROGRAMS
            content: Caption advertising trainer programs, group classes, Zumba, HIIT, and fun Hyrox events
            visuals: Multiple relevant stock background pictures
            animation: Fade in and progressive zoom-in as user scrolls down
        ========================================================================= */}
        <ScrollZoomSection
          id="trainer-group-ad"
          badge="High-Voltage Collective Energy"
          title="Expert Trainers, Zumba Beats, HIIT Blasts & Hyrox Racing"
          caption="Experience world-class group classes led by charismatic instructors. Burn up to 700 calories in our pulse-pounding Zumba dance parties, push anaerobic thresholds in HIIT Forge, or test your mettle in official Hyrox simulation tournaments."
          highlights={[
            'Certified CSCS & USAW strength and conditioning coaches',
            'Electrifying Zumba dance fitness sessions with concert lighting',
            'Metabolic HIIT conditioning on Woodway ergs and assault bikes',
            'Official community Hyrox relay race preparation and events',
          ]}
          ctaLabel="Join Group Sessions"
          ctaHref="/programs"
          reversed={true}
          images={[
            {
              src: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1470&auto=format&fit=crop',
              alt: 'Zumba & Group Fitness',
              title: 'Group Fitness & Zumba',
            },
            {
              src: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1470&auto=format&fit=crop',
              alt: 'HIIT Conditioning',
              title: 'HIIT Conditioning Circuits',
            },
            {
              src: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1470&auto=format&fit=crop',
              alt: '1-on-1 Personal Coaching',
              title: '1-on-1 Personal Coaching',
            },
          ]}
        />

        {/* =========================================================================
            5. TRANSFORMATION PICTURES
            type: Featured Blog Items
            layout: Card Format
            card_details:
              images: Before and After transformation split (Interactive slider)
              name: Person's Name
              rating: Star rating out of 5
        ========================================================================= */}
        <section className="py-24 bg-[#0a0c12] relative border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-lime-400 block mb-2">
                  Proven Real-World Outcomes
                </span>
                <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
                  Member Transformations
                </h2>
                <p className="mt-2 text-zinc-400 text-sm max-w-xl">
                  Explore before & after journeys of verified members who reshaped their strength, health, and confidence.
                </p>
              </div>

              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-lime-400 hover:text-lime-300"
              >
                <span>Browse All Stories on Blog</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            {/* Card format with interactive before/after split slider */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {TRANSFORMATIONS_DATA.map((item) => (
                <TransformationCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            6. BRANCHES GALLERY
            id: branches-section
            layout: Horizontally slidable card gallery
            controls: [Arrow buttons, Auto-slide every 4 seconds]
            card_details:
              background: Gym location picture
              name: Gym Branch Name
              location: City/Area
              rating: Google Review Stars
              address: Full Address
              cta: View More Details (opens in new tab)
        ========================================================================= */}
        <BranchSlider />

        {/* =========================================================================
            7. DETAILED SUBSCRIPTIONS
            plans: ["Silver", "Gold", "Elite"]
            card_details:
              image: Plan specific banner
              features: List of inclusions with colored tick bullet points
              buttons:
                - "Buy Now" -> navigate_to_payment_page
                - "Learn More" -> open_new_tab /plan-page
        ========================================================================= */}
        <section className="py-24 bg-[#08090d] relative border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold uppercase tracking-wider text-lime-400 block mb-2">
                Commitment to Excellence
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
                Detailed Subscriptions
              </h2>
              <p className="mt-3 text-zinc-400 text-sm sm:text-base">
                Transparent monthly and annual membership options. No hidden signup fees, pause anytime.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
              {DETAILED_SUBSCRIPTIONS.map((plan) => (
                <div
                  key={plan.id}
                  className={`bg-[#0f111a] rounded-3xl overflow-hidden border ${
                    plan.popular
                      ? 'border-lime-400/50 shadow-[0_0_30px_rgba(163,230,53,0.15)] ring-1 ring-lime-400/30'
                      : 'border-white/10 shadow-xl'
                  } flex flex-col justify-between group hover:border-lime-400/40 transition-all`}
                >
                  <div>
                    {/* Plan Specific Banner */}
                    <div className="relative h-48 w-full overflow-hidden">
                      <ImageWithFallback
                        src={plan.image}
                        alt={`${plan.name} Plan Banner`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0f111a] via-[#0f111a]/50 to-transparent" />
                      
                      <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                        <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-black/80 backdrop-blur-md text-white border border-white/20">
                          {plan.badge}
                        </span>
                        {plan.popular && (
                          <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-lime-400 text-black shadow-md">
                            Best Value
                          </span>
                        )}
                      </div>

                      <div className="absolute bottom-4 left-6">
                        <h3 className="text-3xl font-black text-white uppercase tracking-tight">
                          {plan.name}
                        </h3>
                      </div>
                    </div>

                    {/* Price and Inclusions */}
                    <div className="p-6 sm:p-8 space-y-6">
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl sm:text-5xl font-black text-white font-mono tabular-nums">
                          ${plan.monthlyPrice}
                        </span>
                        <span className="text-xs text-zinc-400 uppercase tracking-wider">
                          / month
                        </span>
                      </div>

                      <p className="text-xs text-zinc-300 leading-relaxed">
                        {plan.tagline}
                      </p>

                      {/* Features List with Colored Tick Bullet Points */}
                      <div className="space-y-3 pt-2">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block">
                          Included Privileges:
                        </span>
                        <ul className="space-y-3">
                          {plan.features.map((feat, idx) => (
                            <li key={idx} className="flex items-start gap-2.5 text-xs text-zinc-200">
                              <ColoredTick color="lime" size="sm" className="mt-0.5" />
                              <span className="leading-snug">{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Buttons per spec: "Buy Now" & "Learn More" */}
                  <div className="p-6 sm:p-8 pt-0 space-y-3">
                    <Link
                      href={`/payment?plan=${plan.id}`}
                      className="w-full py-3.5 rounded-xl bg-lime-400 hover:bg-lime-300 text-black font-black uppercase tracking-wider text-xs transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(163,230,53,0.3)]"
                    >
                      <span>Buy Now</span>
                      <ArrowRight size={14} />
                    </Link>

                    <a
                      href="/plan-page"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white font-bold uppercase tracking-wider text-xs transition-all flex items-center justify-center gap-1.5"
                    >
                      <span>Learn More</span>
                      <span className="text-zinc-500 font-mono text-[10px]">↗</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Live Search Grounding Widget: Ask Titan Sports Science */}
        <section className="py-20 bg-[#06070a] border-b border-white/5">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <SearchGroundingWidget />
          </div>
        </section>

        {/* =========================================================================
            8. CONTACT US
            id: contact-section
            elements:
              - Email
              - Phone Number
              - WhatsApp Card (Standout/Highlighted design)
        ========================================================================= */}
        <section id="contact-section" className="py-24 bg-[#0a0c12] relative scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs font-bold uppercase tracking-wider text-lime-400 block mb-2">
                Always Reachable
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
                Connect With Titan Team
              </h2>
              <p className="mt-3 text-zinc-400 text-sm sm:text-base">
                Have questions regarding membership, corporate passes, or coach availability? Reach our concierge directly.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Elements: Email, Phone Number, WhatsApp Card */}
              <div className="lg:col-span-5 space-y-5">
                {/* Email Element */}
                <div className="bg-[#0f111a] border border-white/10 rounded-2xl p-6 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-lime-400/10 border border-lime-400/20 flex items-center justify-center text-lime-400 shrink-0">
                    <Mail size={22} />
                  </div>
                  <div>
                    <span className="text-xs uppercase font-mono text-zinc-400 tracking-wider">Direct Email</span>
                    <h3 className="text-base font-bold text-white mt-0.5">{GYM_INFO.email}</h3>
                    <p className="text-xs text-zinc-500 mt-1">Average response time: &lt; 2 business hours</p>
                  </div>
                </div>

                {/* Phone Number Element */}
                <div className="bg-[#0f111a] border border-white/10 rounded-2xl p-6 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-lime-400/10 border border-lime-400/20 flex items-center justify-center text-lime-400 shrink-0">
                    <Phone size={22} />
                  </div>
                  <div>
                    <span className="text-xs uppercase font-mono text-zinc-400 tracking-wider">Member Hotline</span>
                    <h3 className="text-base font-bold text-white mt-0.5">{GYM_INFO.phone}</h3>
                    <p className="text-xs text-zinc-500 mt-1">Toll-free concierge line: Mon–Sun 5am–11pm</p>
                  </div>
                </div>

                {/* WhatsApp Card: Standout / Highlighted design per specification */}
                <div className="relative overflow-hidden bg-gradient-to-br from-emerald-950 via-[#0a2016] to-[#07130d] border-2 border-emerald-400/60 rounded-2xl p-7 shadow-[0_0_35px_rgba(52,211,153,0.25)] group hover:border-emerald-300 transition-all">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <MessageSquare size={120} className="text-emerald-400" />
                  </div>
                  
                  <div className="relative z-10 space-y-4">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-400 text-black text-[11px] font-black uppercase tracking-wider">
                      <MessageSquare size={12} />
                      <span>Instant VIP Support</span>
                    </div>

                    <div>
                      <h3 className="text-2xl font-black text-white uppercase tracking-tight">
                        WhatsApp Concierge
                      </h3>
                      <p className="text-xs text-emerald-200/80 mt-1.5 leading-relaxed">
                        Need instant branch trial passes or trainer consultation? Chat with our head club director right now on WhatsApp.
                      </p>
                    </div>

                    <a
                      href={`https://wa.me/${GYM_INFO.whatsappNumber.replace(/[^0-9]/g, '')}?text=Hello%20Titan%20Athletic%20Club%2C%20I%20would%20like%20to%20learn%20more%20about%20membership%20and%20claim%20a%20guest%20pass.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-black font-black uppercase tracking-wider text-xs transition-all shadow-[0_0_20px_rgba(52,211,153,0.4)]"
                    >
                      <MessageSquare size={16} />
                      <span>Open WhatsApp Chat ({GYM_INFO.whatsappDisplay})</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Inquiry Form */}
              <div className="lg:col-span-7 bg-[#0f111a] border border-white/10 rounded-2xl p-8 sm:p-10 shadow-2xl">
                <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight mb-2">
                  Request a Free 1-Day All-Access Pass
                </h3>
                <p className="text-xs text-zinc-400 mb-6">
                  Experience our Olympic rigs, Hyrox turf, and contrast saunas firsthand at any branch of your choice.
                </p>

                {contactSubmitted ? (
                  <div className="p-8 text-center bg-lime-400/10 border border-lime-400/30 rounded-2xl space-y-3">
                    <CheckCircle2 className="w-12 h-12 text-lime-400 mx-auto" />
                    <h4 className="text-lg font-bold text-white">Your Trial Pass Has Been Reserved!</h4>
                    <p className="text-xs text-zinc-300 max-w-sm mx-auto">
                      Our concierge team sent your QR pass to {contactForm.email}. Show it at the front desk upon arrival.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Alex Morgan"
                          value={contactForm.name}
                          onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                          className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-lime-400 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="+1 (555) 000-0000"
                          value={contactForm.phone}
                          onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                          className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-lime-400 transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="alex@athlete.com"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-lime-400 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                        Primary Training Focus
                      </label>
                      <select
                        value={contactForm.goal}
                        onChange={(e) => setContactForm({ ...contactForm, goal: e.target.value })}
                        className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-lime-400 transition-colors"
                      >
                        <option value="Strength & Conditioning">Strength & Conditioning</option>
                        <option value="Hyrox Race Preparation">Hyrox Race Preparation</option>
                        <option value="Olympic Weightlifting">Olympic Weightlifting</option>
                        <option value="Weight Loss & Recomposition">Weight Loss & Recomposition</option>
                        <option value="Group Classes & Zumba">Group Classes & Zumba</option>
                      </select>
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full py-4 rounded-xl bg-lime-400 hover:bg-lime-300 text-black font-black uppercase tracking-wider text-xs sm:text-sm transition-all shadow-[0_0_25px_rgba(163,230,53,0.3)] flex items-center justify-center gap-2"
                      >
                        <Send size={15} />
                        <span>Send Guest Pass Request</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
