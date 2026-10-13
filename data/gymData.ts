export interface Branch {
  id: string;
  name: string;
  city: string;
  area: string;
  rating: number;
  reviewCount: number;
  address: string;
  phone: string;
  email: string;
  hours: string;
  image: string;
  gallery: string[];
  lat: number;
  lng: number;
  facilities: string[];
  classes: string[];
}

export interface ProgramItem {
  id: string;
  title: string;
  slug: string;
  category: 'Tier' | 'Specialty' | 'Coaching';
  shortSubject: string;
  description: string;
  videoUrl?: string;
  image: string;
  checklist: string[];
  intensity: 'Medium' | 'High' | 'Extreme';
  suitableFor: string;
  includedInTiers: string[];
  monthlyPrice: number;
  annualPrice: number;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  badge?: string;
  monthlyPrice: number;
  annualPrice: number;
  period: string;
  image: string;
  popular?: boolean;
  tagline: string;
  features: string[];
  guestPasses: number;
  accessScope: string;
}

export interface TransformationItem {
  id: string;
  name: string;
  age: number;
  duration: string;
  weightLoss?: string;
  muscleGain?: string;
  rating: number;
  program: string;
  beforeImage: string;
  afterImage: string;
  quote: string;
  fullStory: string;
  trainer: string;
  dietFocus: string;
  date: string;
}

export interface Trainer {
  id: string;
  name: string;
  speciality: string;
  experience: string;
  image: string;
  certifications: string[];
  bio: string;
}

export const GYM_INFO = {
  name: 'TITAN ATHLETIC CLUB',
  tagline: 'Defy Limits. Forge Elite Strength.',
  description: 'World-class fitness center featuring cinematic training zones, Olympic lifting arenas, Hyrox conditioning turf, and evidence-based coaching.',
  email: 'membership@titanathletic.com',
  phone: '+1 (800) 848-2628',
  whatsappNumber: '+18008482628',
  whatsappDisplay: '+1 (800) 848-2628',
  hours: 'Mon - Fri: 5:00 AM - 11:00 PM | Sat - Sun: 6:00 AM - 9:00 PM',
  stats: [
    { label: 'Total Years Running', value: '14+' },
    { label: 'Active Members', value: '25,000+' },
    { label: 'Weekly Classes', value: '180+' },
    { label: 'Fitness Professionals', value: '65+' },
    { label: 'Total Trainers', value: '42+' },
  ],
  coreValues: [
    {
      title: 'Relentless Progression',
      desc: 'We measure success through tangible milestones, systematic overload, and continuous athletic development.',
    },
    {
      title: 'Evidence-Based Coaching',
      desc: 'No pseudoscience or fads. Every program is anchored in exercise physiology, biomechanics, and sports nutrition.',
    },
    {
      title: 'Inclusive Strength',
      desc: 'Whether pursuing your first barbell deadlift or preparing for the Hyrox World Championship, you belong on our turf.',
    },
    {
      title: 'Community Synergy',
      desc: 'A high-vibration environment where elite athletes and everyday champions uplift and push each other forward.',
    },
    {
      title: 'Uncompromising Recovery',
      desc: 'Contrast therapy, infrared saunas, and mobility labs engineered so you rebuild stronger every single session.',
    },
  ],
};

export const BRANCHES_DATA: Branch[] = [
  {
    id: 'downtown-flagship',
    name: 'Titan Downtown Flagship Arena',
    city: 'Metropolis',
    area: 'Downtown Financial District',
    rating: 4.9,
    reviewCount: 1420,
    address: '742 Grand Avenue, Suite 100, Downtown Metro, CA 90210',
    phone: '+1 (213) 555-8810',
    email: 'downtown@titanathletic.com',
    hours: '24 Hours / 7 Days a Week',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1470&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=1469&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1470&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?q=80&w=1469&auto=format&fit=crop',
    ],
    lat: 34.0488,
    lng: -118.2518,
    facilities: ['Parking', 'Showering', 'Changing Room', 'Washroom', 'Drinking Water', 'CCTV', 'Locker'],
    classes: ['Olympic Weightlifting', 'Hyrox Performance', 'HIIT Forge', 'Power Yoga', 'Zumba Energy', 'Reformer Pilates'],
  },
  {
    id: 'westside-athletic',
    name: 'Titan Westside High-Performance Club',
    city: 'Metropolis',
    area: 'Westside Coastal Hub',
    rating: 4.8,
    reviewCount: 980,
    address: '1280 Ocean Boulevard, Westside Marina, CA 90401',
    phone: '+1 (310) 555-4422',
    email: 'westside@titanathletic.com',
    hours: 'Mon - Sun: 5:00 AM - Midnight',
    image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?q=80&w=1471&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1470&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1470&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=1475&auto=format&fit=crop',
    ],
    lat: 34.0195,
    lng: -118.4912,
    facilities: ['Parking', 'Showering', 'Changing Room', 'Washroom', 'Drinking Water', 'CCTV', 'Locker'],
    classes: ['Beachside Conditioning', 'Zumba Rhythm', 'Strength Camp', 'Recovery Cold Plunge', 'Boxing Fundamentals'],
  },
  {
    id: 'uptown-performance',
    name: 'Titan Uptown Olympic Grounds',
    city: 'Metropolis',
    area: 'Uptown Arts & Tech Corridor',
    rating: 4.9,
    reviewCount: 1150,
    address: '405 North Meridian Way, Uptown District, CA 90028',
    phone: '+1 (323) 555-7733',
    email: 'uptown@titanathletic.com',
    hours: 'Mon - Fri: 5:00 AM - 11:00 PM | Sat - Sun: 6:00 AM - 10:00 PM',
    image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=1475&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1470&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?q=80&w=1471&auto=format&fit=crop',
    ],
    lat: 34.1012,
    lng: -118.3253,
    facilities: ['Parking', 'Showering', 'Changing Room', 'Washroom', 'Drinking Water', 'CCTV', 'Locker'],
    classes: ['Hyrox Simulation', 'Game Preparation', 'Olympic Lifting', 'HIIT Circuit', 'Mobility & Foam Rolling'],
  },
  {
    id: 'metro-olympic',
    name: 'Titan South Bay Powerhouse',
    city: 'Metropolis',
    area: 'South Bay Industrial Quarter',
    rating: 4.8,
    reviewCount: 840,
    address: '920 Innovation Parkway, South Bay, CA 90503',
    phone: '+1 (424) 555-9920',
    email: 'southbay@titanathletic.com',
    hours: 'Mon - Sun: 5:30 AM - 11:00 PM',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1470&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1470&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1470&auto=format&fit=crop',
    ],
    lat: 33.8358,
    lng: -118.3406,
    facilities: ['Parking', 'Showering', 'Changing Room', 'Washroom', 'Drinking Water', 'CCTV', 'Locker'],
    classes: ['Strongman Training', 'Calisthenics Lab', 'Zumba Beats', 'Weightloss Mastery', 'Powerlifting Squad'],
  },
];

export interface MinimalProgram {
  tier: 'Silver' | 'Gold' | 'Platinum';
  title: string;
  subject: string;
  highlight: string;
  color: string;
  border: string;
  cardBg: string;
  radialGlow: string;
  shadowGlow: string;
  shimmerClass: string;
  shimmerGradient: string;
  accentText: string;
  accentHover: string;
  dotGlow: string;
}

export const MINIMAL_PROGRAMS: MinimalProgram[] = [
  {
    tier: 'Silver',
    title: 'Silver Foundation',
    subject: 'Complete access to cardio, free-weight floors, luxury locker rooms, and standard off-peak group studios.',
    highlight: 'Essential Gym Access',
    color: 'from-slate-200 via-zinc-400 to-slate-300',
    border: 'border-slate-400/35 hover:border-slate-300/80',
    cardBg: 'bg-gradient-to-br from-[#181c26] via-[#10131b] to-[#141722]',
    radialGlow: 'radial-gradient(circle at 85% 15%, rgba(203, 213, 225, 0.16) 0%, transparent 60%), radial-gradient(circle at 15% 85%, rgba(148, 163, 184, 0.08) 0%, transparent 50%)',
    shadowGlow: 'shadow-[0_4px_30px_rgba(0,0,0,0.6),0_0_25px_rgba(203,213,225,0.08)] hover:shadow-[0_8px_35px_rgba(0,0,0,0.7),0_0_35px_rgba(226,232,240,0.22)]',
    shimmerClass: 'animate-shimmer-silver',
    shimmerGradient: 'bg-gradient-to-r from-transparent via-white/25 to-transparent',
    accentText: 'text-slate-300',
    accentHover: 'group-hover:text-slate-100',
    dotGlow: 'shadow-[0_0_12px_rgba(203,213,225,0.7)]',
  },
  {
    tier: 'Gold',
    title: 'Gold All-Access',
    subject: 'Unlimited access across all city branches, priority group fitness, biometric body scanning, and sauna suites.',
    highlight: 'Most Popular Member Choice',
    color: 'from-amber-300 via-yellow-400 to-amber-500',
    border: 'border-amber-500/45 hover:border-amber-400/90',
    cardBg: 'bg-gradient-to-br from-[#271d0e] via-[#151108] to-[#20180a]',
    radialGlow: 'radial-gradient(circle at 85% 15%, rgba(245, 158, 11, 0.22) 0%, transparent 60%), radial-gradient(circle at 15% 85%, rgba(217, 119, 6, 0.14) 0%, transparent 50%)',
    shadowGlow: 'shadow-[0_4px_30px_rgba(0,0,0,0.6),0_0_30px_rgba(245,158,11,0.18)] hover:shadow-[0_8px_35px_rgba(0,0,0,0.7),0_0_45px_rgba(251,191,36,0.35)]',
    shimmerClass: 'animate-shimmer-gold',
    shimmerGradient: 'bg-gradient-to-r from-transparent via-amber-200/30 to-transparent',
    accentText: 'text-amber-400',
    accentHover: 'group-hover:text-amber-300',
    dotGlow: 'shadow-[0_0_12px_rgba(245,158,11,0.8)]',
  },
  {
    tier: 'Platinum',
    title: 'Platinum Elite',
    subject: 'VIP 24/7 universal pass, dedicated personal coach sessions, Hyrox tournament access, and private recovery contrast baths.',
    highlight: 'Ultimate High-Performance',
    color: 'from-cyan-300 via-sky-300 to-blue-400',
    border: 'border-cyan-400/45 hover:border-cyan-300/90',
    cardBg: 'bg-gradient-to-br from-[#0e2034] via-[#091321] to-[#12263d]',
    radialGlow: 'radial-gradient(circle at 85% 15%, rgba(56, 189, 248, 0.22) 0%, transparent 60%), radial-gradient(circle at 15% 85%, rgba(165, 243, 252, 0.12) 0%, transparent 50%)',
    shadowGlow: 'shadow-[0_4px_30px_rgba(0,0,0,0.6),0_0_30px_rgba(56,189,248,0.18)] hover:shadow-[0_8px_35px_rgba(0,0,0,0.7),0_0_45px_rgba(56,189,248,0.35)]',
    shimmerClass: 'animate-shimmer-platinum',
    shimmerGradient: 'bg-gradient-to-r from-transparent via-cyan-100/30 to-transparent',
    accentText: 'text-cyan-300',
    accentHover: 'group-hover:text-cyan-200',
    dotGlow: 'shadow-[0_0_12px_rgba(56,189,248,0.8)]',
  },
];

export const DETAILED_SUBSCRIPTIONS: SubscriptionPlan[] = [
  {
    id: 'silver-plan',
    name: 'Silver',
    badge: 'Essential',
    monthlyPrice: 2499,
    annualPrice: 1999,
    period: 'per month',
    tagline: 'Ideal for independent lifters seeking top-of-the-line gym equipment and locker room amenities.',
    image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1470&auto=format&fit=crop',
    features: [
      'Full access to single home branch gym floor & cardio deck',
      'Full access to premium free-weights and Olympic barbell platforms',
      'Standard locker room, rainfall showers, and steam access',
      'Complimentary initial fitness assessment & app tracking',
      'Access to standard off-peak group fitness classes',
      'Free high-speed member Wi-Fi & chilled filtered water stations',
    ],
    guestPasses: 1,
    accessScope: 'Single Home Branch',
  },
  {
    id: 'gold-plan',
    name: 'Gold',
    badge: 'Most Popular',
    popular: true,
    monthlyPrice: 3999,
    annualPrice: 3199,
    period: 'per month',
    tagline: 'Universal multi-branch access with limitless group fitness, Zumba, HIIT, and recovery amenities.',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop',
    features: [
      'Unlimited multi-branch access across all 4 Titan Athletic clubs',
      'Unlimited Group Fitness classes (HIIT, Zumba, Yoga, Power Camp)',
      'Monthly InBody 770 composition scan & body fat metrics',
      'Infrared sauna and contrast cold plunge recovery lounge',
      '1 Complimentary 1-on-1 Personal Trainer introduction session per quarter',
      'Priority booking 7 days in advance for popular class slots',
      '10% discount on Titan fuel bar smoothies and merchandise',
    ],
    guestPasses: 3,
    accessScope: 'All Regional Branches',
  },
  {
    id: 'elite-plan',
    name: 'Elite',
    badge: 'Comprehensive',
    monthlyPrice: 6999,
    annualPrice: 5599,
    period: 'per month',
    tagline: 'The gold standard in athletic conditioning. Full coaching access, Hyrox prep, and luxury perks.',
    image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=1469&auto=format&fit=crop',
    features: [
      'Universal 24/7 VIP keycard access to all Titan clubs nationwide',
      '2 Dedicated Monthly 1-on-1 Personal Training coaching sessions',
      'Full entry to official Hyrox Arena training & Game Preparation camps',
      'Customized periodized training split & nutrition macro coaching',
      'Unlimited recovery suite: Cryotherapy, Infrared Sauna & Normatec boots',
      'Unlimited guest passes (bring a training partner anytime)',
      'Reserved VIP executive locker & complimentary laundry kit service',
    ],
    guestPasses: 999,
    accessScope: 'Universal VIP Nationwide',
  },
];

export const ALL_PROGRAMS: ProgramItem[] = [
  {
    id: 'prog-silver',
    title: 'Silver',
    slug: 'silver',
    category: 'Tier',
    shortSubject: 'Core athletic foundation with premium equipment and cardio access.',
    description: 'Our foundational program designed for self-directed athletes who demand professional-grade Eleiko bars, Rogue rigs, and premium cardio gear without unnecessary frills.',
    image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1470&auto=format&fit=crop',
    checklist: [
      'Full floor access to hammer strength, cable towers & free weights',
      'Cardio theater equipped with Woodway treadmills & Concept2 rowers',
      'Keycard access during all standard operating club hours',
      'Luxury locker rooms with executive showers and grooming amenities',
      'Complimentary induction and digital workout logging on Titan App',
    ],
    intensity: 'Medium',
    suitableFor: 'Beginners to intermediate fitness enthusiasts',
    includedInTiers: ['Silver', 'Gold', 'Elite'],
    monthlyPrice: 2499,
    annualPrice: 1999,
  },
  {
    id: 'prog-gold',
    title: 'Gold',
    slug: 'gold',
    category: 'Tier',
    shortSubject: 'Multi-branch access with unlimited group classes and recovery suite.',
    description: 'A dynamic athletic lifestyle membership giving you access to all locations, high-energy group fitness classes, and specialized functional fitness zones.',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop',
    checklist: [
      'Seamless multi-club passport across all regional facilities',
      'Unlimited access to over 180 weekly instructor-led group workouts',
      'Monthly InBody biometric body composition analysis report',
      'Contrast therapy: cedar infrared saunas and cold plunges',
      'Early reservation window for peak weekend classes',
    ],
    intensity: 'High',
    suitableFor: 'Consistent gym-goers looking for variety and cross-training',
    includedInTiers: ['Gold', 'Elite'],
    monthlyPrice: 3999,
    annualPrice: 3199,
  },
  {
    id: 'prog-platinum',
    title: 'Platinum',
    slug: 'platinum',
    category: 'Tier',
    shortSubject: 'VIP universal access with dedicated coach, Hyrox arenas, and private recovery.',
    description: 'Our pinnacle tier for competitive individuals who accept nothing less than elite support, 1-on-1 personal training, and cutting-edge performance tech.',
    image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=1469&auto=format&fit=crop',
    checklist: [
      'Unrestricted 24/7 keycard access to every club amenity',
      'Included monthly 1-on-1 personal training & programming with senior coach',
      'Direct admission to Hyrox simulation tracks and Game Preparation camps',
      'Normatec compression therapy and cryotherapy recovery lounges',
      'Concierge towel, locker, and complimentary pre-workout beverage service',
    ],
    intensity: 'Extreme',
    suitableFor: 'Serious competitors, executives, and high-performance athletes',
    includedInTiers: ['Elite'],
    monthlyPrice: 6999,
    annualPrice: 5599,
  },
  {
    id: 'prog-personal-training',
    title: 'Personal Training',
    slug: 'personal-training',
    category: 'Coaching',
    shortSubject: 'Bespoke 1-on-1 physiology-driven coaching tailored to your exact biomechanics.',
    description: 'Pair with certified strength & conditioning specialists (CSCS) who formulate individualized training regimens, correct movement patterns, and accelerate your transformation.',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1470&auto=format&fit=crop',
    checklist: [
      'Comprehensive functional movement screen & postural assessment',
      'Tailored macro calculation and dietary habit optimization plan',
      'Real-time form correction to prevent injury and maximize tension',
      'Custom app-synchronized homework routines and recovery protocols',
      'Weekly check-ins with quantitative strength metric tracking',
    ],
    intensity: 'High',
    suitableFor: 'Anyone seeking accelerated results and targeted accountability',
    includedInTiers: ['Elite (included)', 'Silver/Gold (add-on)'],
    monthlyPrice: 7999,
    annualPrice: 6499,
  },
  {
    id: 'prog-group-classes',
    title: 'Group Classes',
    slug: 'group-classes',
    category: 'Specialty',
    shortSubject: 'High-octane collective energy led by world-class dynamic instructors.',
    description: 'Feed off the infectious energy of a motivated tribe. From barbell strength endurance to rhythm spin and metabolic blasts, sweat in sync with our best trainers.',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1470&auto=format&fit=crop',
    checklist: [
      'Over 180 scheduled sessions weekly across morning, lunch & evening slots',
      'Top-tier surround sound acoustic engineering and concert lighting',
      'Options ranging from low-impact mobility to high-intensity intervals',
      'Heart-rate tracking display synced to club big screens',
      'Supportive community atmosphere welcoming all fitness backgrounds',
    ],
    intensity: 'High',
    suitableFor: 'Those who thrive on community motivation and team camaraderie',
    includedInTiers: ['Gold', 'Elite'],
    monthlyPrice: 2499,
    annualPrice: 1999,
  },
  {
    id: 'prog-hiit-training',
    title: 'HIIT Training',
    slug: 'hiit-training',
    category: 'Specialty',
    shortSubject: 'Maximum caloric burn and cardiovascular threshold expansion in 45 intense minutes.',
    description: 'Scientifically calibrated work-to-rest intervals combining ski ergs, assault bikes, kettlebells, and plyometrics to spike your metabolic rate for 36 hours post-workout.',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1470&auto=format&fit=crop',
    checklist: [
      'Interval structures combining anaerobic power and aerobic recovery',
      'Polar heart-rate zone validation to guarantee optimal EPOC burn',
      'Dedicated rubber turf zone with prowler sleds and battle ropes',
      'Varied daily programming so your body never hits a plateau',
      'Scalable exercise modifications for joint preservation and longevity',
    ],
    intensity: 'Extreme',
    suitableFor: 'Athletes focused on fat loss, stamina, and cardiovascular resilience',
    includedInTiers: ['Gold', 'Elite'],
    monthlyPrice: 2799,
    annualPrice: 2199,
  },
  {
    id: 'prog-game-preparation',
    title: 'Game Preparation',
    slug: 'game-preparation',
    category: 'Coaching',
    shortSubject: 'Sport-specific athletic agility, explosive velocity, and rotational power development.',
    description: 'Engineered for competitive team and solo athletes (soccer, basketball, tennis, martial arts) aiming to dominate in speed, deceleration mechanics, and sprint velocity.',
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1470&auto=format&fit=crop',
    checklist: [
      'Multi-planar agility drills on indoor synthetic turf',
      'Rotational power training with Keiser pneumatic resistance machines',
      'Force plate jump velocity testing and force-time curve diagnostics',
      'Sport-specific injury mitigation: ACL resilience and rotator cuff stability',
      'Periodized tapering strategies leading up to competitive fixtures',
    ],
    intensity: 'Extreme',
    suitableFor: 'Competitive athletes, collegiate players, and martial artists',
    includedInTiers: ['Elite', 'Specialty Registration'],
    monthlyPrice: 3999,
    annualPrice: 3199,
  },
  {
    id: 'prog-weightloss-program',
    title: 'Weightloss Program',
    slug: 'weightloss-program',
    category: 'Specialty',
    shortSubject: 'Sustainable body recomposition fusing resistance training and metabolic conditioning.',
    description: 'Say goodbye to crash diets. Our evidence-based body transformation system focuses on preserving lean muscle while maximizing visceral and subcutaneous fat loss.',
    image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?q=80&w=1471&auto=format&fit=crop',
    checklist: [
      'Personalized caloric deficit mapping without extreme food deprivation',
      'Hypertrophy-focused lifting protocols to maintain metabolic rate',
      'Continuous body fat caliper and 3D optical body scanning',
      'Dedicated habit coaching on sleep hygiene, hydration & stress reduction',
      'Nutritional meal prep guides and dining-out survival playbooks',
    ],
    intensity: 'Medium',
    suitableFor: 'Members pursuing significant, permanent body fat reduction',
    includedInTiers: ['Gold', 'Elite', 'Dedicated Camp'],
    monthlyPrice: 3499,
    annualPrice: 2799,
  },
  {
    id: 'prog-hyrox-program',
    title: 'Hyrox Program',
    slug: 'hyrox-program',
    category: 'Specialty',
    shortSubject: 'Official affiliate coaching for the global fitness racing phenomenon.',
    description: 'Train on official competition gear. Master the 8x1km run splits and the 8 stations: SkiErg, Sled Push, Sled Pull, Burpee Broad Jumps, Rowing, Farmers Carry, Sandbag Lunges, and Wall Balls.',
    image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=1469&auto=format&fit=crop',
    checklist: [
      'Dedicated 50-meter turf track with regulation Centaur competition sleds',
      'Official Concept2 rowing and ski erg station pacing strategies',
      'Weekly full-course simulation simulations and relay squad practices',
      'Certified Hyrox Master Coaches providing transition transition cues',
      'Club travel crew and VIP race corral access at regional Hyrox races',
    ],
    intensity: 'Extreme',
    suitableFor: 'Endurance athletes, hybrid lifters, and Hyrox racers',
    includedInTiers: ['Elite', 'Hyrox Squad Add-on'],
    monthlyPrice: 4499,
    annualPrice: 3599,
  },
  {
    id: 'prog-zumba',
    title: 'Zumba',
    slug: 'zumba',
    category: 'Specialty',
    shortSubject: 'Electrifying dance party fitness fusing Latin rhythms with calorie-torching cardio.',
    description: 'Lose yourself in the rhythm. Led by licensed international Zumba instructors, this dynamic party session blends Salsa, Reggaeton, Merengue, and Cumbia into an addictive workout.',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1470&auto=format&fit=crop',
    checklist: [
      'High-energy Latin, Afrobeat, and global dance music playlists',
      'Easy-to-follow choreography designed for dancers and non-dancers alike',
      'Burns up to 650 calories per 50-minute exhilarating session',
      'Full body toning through continuous aerobic core & glute activation',
      'Inclusive, celebratory, stress-melting dance studio environment',
    ],
    intensity: 'Medium',
    suitableFor: 'All fitness levels, dance lovers, and cardio enthusiasts',
    includedInTiers: ['Gold', 'Elite'],
    monthlyPrice: 1999,
    annualPrice: 1599,
  },
];

export const TRANSFORMATIONS_DATA: TransformationItem[] = [
  {
    id: 'trans-1',
    name: 'Rohan Mukherjee',
    age: 31,
    duration: '16 Weeks',
    weightLoss: '-14 kg Fat',
    muscleGain: '+4.5 kg Lean Muscle',
    rating: 5,
    program: 'Weightloss & Strength Hybrid',
    beforeImage: '/images/transformations/rohan-before.jpg',
    afterImage: '/images/transformations/rohan-after.jpg',
    quote: 'Titan changed my relationship with fitness completely. The coaches guided my nutrition, kept my form flawless, and pushed me past plateaus I was stuck on for years.',
    fullStory: 'Rohan came to Titan Athletic Club with a sedentary desk job routine, low energy, and stubborn belly fat. Working closely with our strength coaching team, Rohan followed 16 disciplined weeks of progressive barbell overload and structured macronutrient planning. He dropped 14 kg of body fat, sculpted dense upper-body muscle, and doubled his deadlift numbers.',
    trainer: 'Kavita Patel (CSCS)',
    dietFocus: 'High-protein desi meal prep & structured carb cycling',
    date: 'March 2026',
  },
  {
    id: 'trans-2',
    name: 'Ananya Sen',
    age: 28,
    duration: '24 Weeks',
    weightLoss: '-9.5 kg Fat',
    muscleGain: '+5.2 kg Muscle Tone',
    rating: 5,
    program: 'Hyrox Performance & Functional Conditioning',
    beforeImage: '/images/transformations/ananya-before.jpg',
    afterImage: '/images/transformations/ananya-after.jpg',
    quote: 'I used to feel intimidated stepping into the free weights section. Today the turf and barbells are my second home. The atmosphere at Titan is empowering.',
    fullStory: 'Ananya wanted to move beyond generic cardio routines and build genuine athleticism and endurance. Starting with foundational kettlebell technique and sled intervals, she transitioned into Olympic lifting and high-tempo conditioning. In 24 weeks, she trimmed 9.5 kg, achieved exceptional core definition, and placed top 10 in her regional Hyrox simulation.',
    trainer: 'Darius Thorne',
    dietFocus: 'Nutrient-timed complex carbohydrates & micronutrient balance',
    date: 'February 2026',
  },
  {
    id: 'trans-3',
    name: 'Vikram Chatterjee',
    age: 29,
    duration: '20 Weeks',
    weightLoss: '-12 kg Fat',
    muscleGain: '+6.8 kg Lean Mass',
    rating: 5,
    program: 'Gold All-Access & Muscle Hypertrophy',
    beforeImage: '/images/transformations/vikram-before.jpg',
    afterImage: '/images/transformations/vikram-after.jpg',
    quote: 'From feeling sluggish and untrained to lifting heavier than I ever imagined. Titan provided the structure, accountability, and community that made it all click.',
    fullStory: 'Vikram struggled with inconsistent training and a soft physique. Enrolling in the Gold All-Access program, he dedicated 4 sessions a week to compound hypertrophy lifts and recovery protocols. In 20 weeks, he dropped 12 kg of visceral fat while packing on 6.8 kg of dense muscle across his shoulders, chest, and legs.',
    trainer: 'Liam Vance (DPT)',
    dietFocus: 'Clean surplus lean bulking with whole food protein sources',
    date: 'January 2026',
  },
];

export const TRAINERS_DATA: Trainer[] = [
  {
    id: 'trainer-darius',
    name: 'Darius Thorne',
    speciality: 'Olympic Weightlifting & Hyrox Master Coach',
    experience: '12 Years Experience',
    image: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=1374&auto=format&fit=crop',
    certifications: ['CSCS', 'USAW Level 2', 'Hyrox Pro Certified'],
    bio: 'Former collegiate decathlete specializing in explosive power development, bar path biomechanics, and competitive athletic preparation.',
  },
  {
    id: 'trainer-elena',
    name: 'Elena Rostova',
    speciality: 'Physique Transformation & Metabolic Conditioning',
    experience: '9 Years Experience',
    image: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=1374&auto=format&fit=crop',
    certifications: ['NASM-CPT', 'Precision Nutrition L2', 'FMS Expert'],
    bio: 'Renowned for orchestrating jaw-dropping transformations through strict progressive overload, habit design, and postural realignment.',
  },
  {
    id: 'trainer-kavita',
    name: 'Kavita Patel',
    speciality: 'HIIT Performance & Zumba Master Educator',
    experience: '8 Years Experience',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1376&auto=format&fit=crop',
    certifications: ['ACE Certified', 'ZIN International', 'Oxygen Advantage Coach'],
    bio: 'Ignites every room with unmatched kinetic energy, rhythmic choreography, and cardiovascular intervals that leave you euphoric.',
  },
  {
    id: 'trainer-liam',
    name: 'Liam Vance',
    speciality: 'Strength Biomechanics & Injury Rehabilitation',
    experience: '11 Years Experience',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1528&auto=format&fit=crop',
    certifications: ['Doctorate in Physical Therapy (DPT)', 'CSCS', 'FRC Mobility Specialist'],
    bio: 'Integrates orthopedic recovery with heavy barbell loading to help lifters bulletproof joints and overcome chronic pain.',
  },
];

export const GALLERY_ITEMS = [
  {
    id: 'g-1',
    title: 'Olympic Barbell Arena',
    category: 'Gym Space',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop',
    aspect: 'aspect-video',
  },
  {
    id: 'g-2',
    title: 'Hyrox Competition Turf',
    category: 'Gym Space',
    image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1470&auto=format&fit=crop',
    aspect: 'aspect-square',
  },
  {
    id: 'g-3',
    title: 'Elite Powerlifter Sled Drive',
    category: 'Athletes',
    image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=1469&auto=format&fit=crop',
    aspect: 'aspect-video',
  },
  {
    id: 'g-4',
    title: 'High-Octane Zumba Session',
    category: 'Group Classes',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1470&auto=format&fit=crop',
    aspect: 'aspect-square',
  },
  {
    id: 'g-5',
    title: 'Classic Back Double Bicep',
    category: 'Bodybuilding Poses',
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1470&auto=format&fit=crop',
    aspect: 'aspect-[3/4]',
  },
  {
    id: 'g-6',
    title: 'Morning Kettlebell Circuit',
    category: 'Group Classes',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1470&auto=format&fit=crop',
    aspect: 'aspect-video',
  },
  {
    id: 'g-7',
    title: 'Hyrox National Championship Trophy',
    category: 'Awards & Achievements',
    image: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?q=80&w=1469&auto=format&fit=crop',
    aspect: 'aspect-square',
  },
  {
    id: 'g-8',
    title: 'Deadlift PR Celebration',
    category: 'Athletes',
    image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?q=80&w=1471&auto=format&fit=crop',
    aspect: 'aspect-video',
  },
  {
    id: 'g-9',
    title: 'Front Lat Spread Aesthetics',
    category: 'Bodybuilding Poses',
    image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=1470&auto=format&fit=crop',
    aspect: 'aspect-[3/4]',
  },
  {
    id: 'g-10',
    title: 'Best Performance Center Award 2025',
    category: 'Awards & Achievements',
    image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1470&auto=format&fit=crop',
    aspect: 'aspect-video',
  },
];
