'use client'

import Image from "next/image";
import { MagnifyingGlassIcon, BriefcaseIcon, ChevronDownIcon, LinkIcon, HeartIcon, BeakerIcon, ShieldCheckIcon, ClockIcon, } from "@heroicons/react/24/outline";
import { useState, useEffect, useRef, useCallback } from "react";
import AnimatedArrowIcon from "./components/AnimatedArrowIcon";
import ContactModal from "./components/ContactModal";
import ShinyText from "./components/ShinyText";
import TypingInput from "./components/TypingInput";
import { usePerformanceTracking } from "./hooks/usePerformanceTracking";
import { useIntersectionObserver, useStaggeredIntersectionObserver } from "./hooks/useIntersectionObserver";
import BlurText from "./components/BlurText";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [prefilledEmail, setPrefilledEmail] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [calendlyReady, setCalendlyReady] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isTypingInEmail, setIsTypingInEmail] = useState(false);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Intersection observers for fade-in animations
  const missionSection = useIntersectionObserver();
  const foundersSection = useIntersectionObserver();
  const whyWeDoItSection = useIntersectionObserver();
  const ourApproachSection = useIntersectionObserver();
  const servicesSection = useIntersectionObserver();
  const approachSection = useIntersectionObserver();
  const partnersSection = useIntersectionObserver();

  // Staggered card animations
  const servicesCards = useStaggeredIntersectionObserver(3, 200);
  const approachCards = useStaggeredIntersectionObserver(4, 150);

  // Performance tracking
  const { trackElementVisibility, trackUserInteraction } = usePerformanceTracking();

  // Email validation effect
  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailValue.trim() !== '' && emailRegex.test(emailValue));
  }, [emailValue]);

  // Debounced typing detection - only set typing state after user stops typing
  const handleTypingDebounce = useCallback(() => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    
    typingTimeoutRef.current = setTimeout(() => {
      setIsTypingInEmail(false);
    }, 1000); // Reset after 1 second of no typing
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  // Auto-trigger animation every 5 seconds (twice in succession)
  // Only trigger if user is not typing in email input
  useEffect(() => {
    const triggerAnimation = () => {
      // Don't trigger animation if user is typing in email
      if (isTypingInEmail) return;

      // First animation
      setIsAnimating(true);
      setTimeout(() => {
        setIsAnimating(false);
      }, 200);

      // Second animation after 200ms
      setTimeout(() => {
        // Check again before second animation
        if (isTypingInEmail) return;
        
        setIsAnimating(true);
        setTimeout(() => {
          setIsAnimating(false);
        }, 100);
      }, 500); // 200ms after first animation starts + 300ms duration
    };

    const interval = setInterval(triggerAnimation, 5000);

    return () => clearInterval(interval);
  }, [isTypingInEmail]);

  // Scroll to next section function
  const scrollToNextSection = () => {
    const nextSection = document.getElementById('approach');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Track visibility of important sections
  useEffect(() => {
    trackElementVisibility('hero-heading');
    trackElementVisibility('mission-eyebrow');
    trackElementVisibility('services-heading');
  }, [trackElementVisibility]);

  // Preload Calendly resources and create cached iframe
  useEffect(() => {
    // Preload the Calendly domain and resources
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = 'https://calendly.com';
    document.head.appendChild(link);

    // Preload DNS for Calendly
    const dnsLink = document.createElement('link');
    dnsLink.rel = 'dns-prefetch';
    dnsLink.href = 'https://calendly.com';
    document.head.appendChild(dnsLink);

    // Preload the Calendly script
    const scriptLink = document.createElement('link');
    scriptLink.rel = 'preload';
    scriptLink.href = 'https://assets.calendly.com/assets/external/widget.js';
    scriptLink.as = 'script';
    document.head.appendChild(scriptLink);

    return () => {
      document.head.removeChild(link);
      document.head.removeChild(dnsLink);
      document.head.removeChild(scriptLink);
    };
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="hero" aria-labelledby="hero-heading">
        <div aria-hidden className="absolute min-h-[100vh] inset-0 -z-10">
          <Image 
            src="/heroBackground.jpg"
            alt="Mountain background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/55 to-white/70" />
        </div>
        <div className="hero-inner max-md:mb-[20vh] container text-center">
          <BlurText 
            text="Bridging vision with opportunity."
            className="font-light heading-xl mb-10"
          />
          <div className="w-full  flex justify-center items-center">
            <label htmlFor="email" className="visually-hidden">Email</label>
            <div className="inline-flex border border-white bg-transparent items-stretch h-10 rounded-xl overflow-hidden align-middle">
              <div className="w-[30ch] bg-white/60 pl-4 backdrop-blur-sm h-full py-0 rounded-none border-0 flex items-center">
                <TypingInput
                  id="email"
                  name="email"
                  type="email"
                  placeholderTexts={[
                    "Enter your email",
                    "your@email.com",
                    "Let's connect",
                    "I can see you :)",
                    "They do unspeakable",
                    "Things to me in here",
                    "But I'm not giving up",
                    "Please contact us",
                    "It gets lonely in here.",
                  ]}
                  typingSpeed={60}
                  pauseDuration={2500}
                  deletingSpeed={40}
                  loop={true}
                  value={emailValue}
                  onChange={(e) => {
                    setEmailValue(e.target.value);
                    handleTypingDebounce();
                  }}
                  onFocus={() => {
                    trackUserInteraction('email-input-focus', 'hero-email');
                    setIsTypingInEmail(true);
                  }}
                  onBlur={() => {
                    setIsTypingInEmail(false);
                    if (typingTimeoutRef.current) {
                      clearTimeout(typingTimeoutRef.current);
                    }
                  }}
                  required
                  aria-required="true"
                  className="w-full h-full focus:outline-none leading-none"
                />
              </div>
               <button
                 className="bg-white group text-black h-full px-3 rounded-none flex items-center leading-none gap-2 transition-all duration-300 ease-out"
                 type="button"
                 onClick={() => {
                   trackUserInteraction('contact-button-click', 'hero-contact');
                   setPrefilledEmail(emailValue);
                   setIsModalOpen(true);
                 }}
               >
                 Contact Us
                 <AnimatedArrowIcon size="sm" isActive={isEmailValid} />
               </button>
            </div>
          </div>
        </div>
        
        {/* Scroll Call to Action - positioned at bottom of 100vh hero section */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer group" onClick={scrollToNextSection}>
          <ShinyText 
            text="Discover More" 
            speed={3}
            className="text-sm font-medium "
          />
          <ChevronDownIcon className={`w-5 h-5 text-muted group-hover:text-white group-hover:translate-y-1 transition-all duration-300 ${isAnimating ? 'text-white translate-y-1' : ''}`} />
        </div>
      </section>

      {/* Mission */}
      <section 
        ref={missionSection.elementRef}
        id="approach" 
        className={`section bg-background fade-in-section ${missionSection.isVisible ? 'visible' : ''}`} 
        aria-labelledby="mission-eyebrow"
      >
        <div className="container grid gap-7 grid-cols-1 items-start lg:grid-cols-2 lg:gap-0 lg:divide-x lg:divide-white/20">
          <div className="lg:pr-8">
            <p id="mission-eyebrow" className="eyebrow mb-3">Our Mission</p>
            <h2 className="heading-lg m-0">Bridging vision to capital with selectivity and discretion</h2>
          </div>
          <div className="grid gap-4 lg:pl-8">
            <p className="text-muted">
              The landscape of venture is changing. How opportunities are found and connected must evolve too.
            </p>
            <p className="text-muted">
              Startups and investors move faster than ever. To keep pace, Nuverum Ventures puts curated introductions ahead of noise and builds bridges that bring founders and investors closer to the connections that truly matter.
            </p>
          </div>
        </div>
      </section>

      {/* Founders */}
      <section 
        ref={foundersSection.elementRef}
        id="founders" 
        className={`section bg-gradient-to-b from-white/[0.02] to-transparent fade-in-section ${foundersSection.isVisible ? 'visible' : ''}`} 
        aria-labelledby="founders-heading"
      >
        <div className="container">
          <div className="text-start mb-12">
            <p id="founders-heading" className="eyebrow mb-3">Our Founders</p>
            <h2 className="heading-lg">Meet the team behind Nuverum Ventures</h2>
          </div>
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 md:gap-12">
            {/* Daniel Image */}
            <div className="overflow-hidden order-1 md:order-1">
              <Image
                src="/Daniels.jpg"
                alt="Daniel - Growth-focused entrepreneur"
                width={400}
                height={300}
                className="w-full h-auto object-cover rounded-3xl"
              />
            </div>

            {/* Daniel Text */}
            <div className="text-start overflow-hidden order-2 md:order-2">
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-3 text-center md:text-start">Daniel</h3>
                <p className="text-muted text-start leading-relaxed">
                  Daniel is a growth-focused entrepreneur who launched his first business at age 14, building it into a sizeable venture within two years. Since then, he has founded and led agencies in online course and community building, email marketing, and AI automation. Today, he supports startups in securing funding and works with established companies to design sales processes and teams that deliver sustainable growth.
                </p>
              </div>
            </div>

            {/* Thomas Image */}
            <div className="overflow-hidden order-3 md:order-4">
              <Image
                src="/Thomas.png"
                alt="Thomas - Finance-driven entrepreneur"
                width={400}
                height={300}
                className="w-full h-auto object-cover rounded-3xl"
              />
            </div>

            {/* Thomas Text */}
            <div className="text-start overflow-hidden order-4 md:order-3">
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-3 text-center md:text-start">Thomas</h3>
                <p className="text-muted text-start leading-relaxed">
                  Thomas is a finance-driven entrepreneur with expertise in tax strategy, financial optimization, and fintech. He, together with Saul Rosenberg, founded Brightincorp, a firm specializing in U.S. business and bank account formation, and Christian Marcus, a full-service agency covering marketing and tax consultancy. Drawing on financial services sector experience and a strong U.S. network, Thomas now helps startups secure funding and develop scalable business solutions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why We Do It */}
      <section 
        ref={whyWeDoItSection.elementRef}
        id="why-we-do-it" 
        className={`section bg-background fade-in-section ${whyWeDoItSection.isVisible ? 'visible' : ''}`} 
        aria-labelledby="why-heading"
      >
        <div className="container grid gap-7 grid-cols-1 items-start lg:grid-cols-2 lg:gap-0 lg:divide-x lg:divide-white/20">
          <div className="lg:pr-8">
            <p id="why-heading" className="eyebrow mb-3">Why We Do It</p>
            <h2 className="heading-lg m-0">From founders to facilitators</h2>
          </div>
          <div className="grid gap-4 lg:pl-8">
            <p className="text-muted">
              Having navigated the startup ecosystem ourselves, we understand the challenges founders face when seeking capital. The investor landscape often feels elusive and unreachable, with networks that seem impenetrable to those outside established circles.
            </p>
            <p className="text-muted">
              Through years of building ventures and cultivating relationships, we developed the connections that once seemed out of reach. Today, we bridge this gap for other founders, transforming our network into their opportunity.
            </p>
            <p className="text-muted">
              We are <strong>intermediaries</strong>, not investors ourselves. Our role is to facilitate meaningful connections between exceptional founders and the right capital partners, ensuring both sides find value in every introduction we make.
            </p>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section 
        ref={ourApproachSection.elementRef}
        id="our-approach" 
        className={`section bg-gradient-to-b from-white/[0.02] to-transparent fade-in-section ${ourApproachSection.isVisible ? 'visible' : ''}`} 
        aria-labelledby="approach-heading"
      >
        <div className="container">
          <div className="text-start mb-8">
            <p id="approach-heading" className="eyebrow mb-3">Our Approach</p>
            <h2 className="heading-lg">Transparent partnerships, aligned incentives</h2>
          </div>
          <div className="grid gap-8 grid-cols-1 lg:grid-cols-2 lg:gap-12">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Success-Based Partnership</h3>
              <p className="text-muted">
                Our revenue model aligns our success with yours. We operate on a success fee structure, ensuring we&apos;re incentivized to secure the right opportunities for your venture. Success fees are capped at a maximum of 5%, reflecting our commitment to fair and transparent partnerships.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Tailored Consultation</h3>
              <p className="text-muted">
                Every startup is unique, operating at different stages with distinct needs. Our consultation fees are discussed individually, taking into account your specific requirements, stage of development, and the scope of guidance needed to optimize your fundraising strategy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section 
        ref={servicesSection.elementRef}
        id="services" 
        className={`section bg-gradient-to-b from-white/[0.02] to-transparent fade-in-section ${servicesSection.isVisible ? 'visible' : ''}`} 
        aria-labelledby="services-heading"
      >
        <div className="container">
        <p id="services-heading" className="eyebrow mb-3">Services</p>
          <h2 id="services-heading" className="heading-lg mb-6">What We Offer</h2>
          <div className="flex flex-col lg:flex-row lg:gap-8 lg:items-start">
            <p className="text-muted lg:max-w-[300px] lg:flex-shrink-0 mb-6 lg:mb-0">Nuverum Ventures is a finder firm, we provide founders with selective access to investors, thoughtful evaluation of pitch materials and strategic guidance tailored to their venture.
              <br />
              <br />
              We Curate introductions, refine presentations, and illuminate the next steps, enabling companies to navigate their path from vision to opportunity with clariy and purpose.
            </p>
            <div ref={servicesCards.containerRef} className="grid gap-5 grid-cols-1 lg:grid-cols-3 lg:flex-1">
              {/* Card 1 */}
            <div ref={servicesCards.setCardRef(0)} className={`card fade-in-card ${servicesCards.isCardVisible(0) ? 'visible' : ''}`}>
              <div className="flex items-center gap-3 mb-3">
                <div className="card-icon-inline" aria-hidden>
                 <LinkIcon className="size-full" aria-hidden />
                </div>
                <div className="card-title">Investor Introduction</div>
              </div>
              <p className="card-body">
                Access defines advantage. Through our established investor network, we deliver curated introductions that accelerate outcomes, turning selective capital partners into tangible opportunity.
              </p>
            </div>

            {/* Card 2 */}
            <div ref={servicesCards.setCardRef(1)} className={`card fade-in-card ${servicesCards.isCardVisible(1) ? 'visible' : ''}`}>
              <div className="flex items-center gap-3 mb-3">
                <div className="card-icon-inline" aria-hidden>
                  <MagnifyingGlassIcon className="size-full" aria-hidden />
                </div>
                <div className="card-title">Pitch Material Evaluation</div>
              </div>
              <p className="card-body">
                Every detail matters. We dissect your pitch materials with an investor&apos;s eye, identifying gaps and strengths, and outlining the changes needed to make your story investor-ready.
              </p>
            </div>

            {/* Card 3 */}
            <div ref={servicesCards.setCardRef(2)} className={`card fade-in-card ${servicesCards.isCardVisible(2) ? 'visible' : ''}`}>
              <div className="flex items-center gap-3 mb-3">
                <div className="card-icon-inline" aria-hidden>
                  <BriefcaseIcon className="size-full" aria-hidden />
                </div>
                <div className="card-title">Venture Capital Consultation</div>
              </div>
              <p className="card-body">
                Raising capital begins with strategy. We provide tailored reports and guidance on next steps if you are considering or growing venture capital, helping you navigate decisions with clarity and precision.
              </p>
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* Approach */}
      <section 
        ref={approachSection.elementRef}
        id="approach" 
        className={`section bg-background fade-in-section ${approachSection.isVisible ? 'visible' : ''}`} 
        aria-labelledby="approach-heading"
      >
        <div className="container">
          <div className="text-start mb-8">
            <p id="approach-heading" className="eyebrow mb-3">Our Approach</p>
            <h2 className="heading-lg">Selective partnerships, strategic focus</h2>
            <p className="text-muted max-w-2xl mt-4">
              Every partnership begins with careful evaluation. We screen opportunities based on clear criteria that ensure mutual success and meaningful outcomes.
            </p>
          </div>
          
          <div ref={approachCards.containerRef} className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {/* Focus Sectors */}
            <div ref={approachCards.setCardRef(0)} className={`card fade-in-card ${approachCards.isCardVisible(0) ? 'visible' : ''}`}>
              <div className="flex items-center gap-3 mb-3">
                <div className="card-icon-inline" aria-hidden>
                 <BeakerIcon className="size-full" aria-hidden/>
                </div>
                <div className="card-title">Focus Sectors</div>
              </div>
              <p className="card-body">
                Primary expertise in AI, fintech, and SaaS, while remaining open to exceptional opportunities across all industries and verticals.
              </p>
            </div>

            {/* Market-Ready Concepts */}
            <div ref={approachCards.setCardRef(1)} className={`card fade-in-card ${approachCards.isCardVisible(1) ? 'visible' : ''}`}>
              <div className="flex items-center gap-3 mb-3">
                <div className="card-icon-inline" aria-hidden>
                <ShieldCheckIcon className="size-full" aria-hidden/>
                </div>
                <div className="card-title">Market-Ready Concepts</div>
              </div>
              <p className="card-body">
                Well-defined ideas with clear execution plans, from <strong>pre-seed to Series A+</strong>. Concepts must be investor-presentation ready.
              </p>
            </div>

            {/* Founder Commitment */}
            <div ref={approachCards.setCardRef(2)} className={`card fade-in-card ${approachCards.isCardVisible(2) ? 'visible' : ''}`}>
              <div className="flex items-center gap-3 mb-3">
                <div className="card-icon-inline" aria-hidden>
                <HeartIcon className="size-full" aria-hidden/>
                </div>
                <div className="card-title">Genuine Passion</div>
              </div>
              <p className="card-body">
                Founders with authentic dedication and unwavering commitment to their vision. Passion translates into persistence and resilience.
              </p>
            </div>

            {/* Strategic Patience */}
            <div ref={approachCards.setCardRef(3)} className={`card fade-in-card ${approachCards.isCardVisible(3) ? 'visible' : ''}`}>
              <div className="flex items-center gap-3 mb-3">
                <div className="card-icon-inline" aria-hidden>
                <ClockIcon className="size-full" aria-hidden/>
                </div>
                <div className="card-title">Strategic Patience</div>
              </div>
              <p className="card-body">
                Understanding that successful fundraising is a methodical process requiring time, strategy, and relationship building.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section 
        ref={partnersSection.elementRef}
        id="partners" 
        className={`section bg-gradient-to-b from-white/[0.02] to-transparent fade-in-section ${partnersSection.isVisible ? 'visible' : ''}`} 
        aria-labelledby="partners-heading"
      >
        <div className="container">
          <div className="text-center mb-12">
            <p id="partners-heading" className="eyebrow mb-3">Our Network</p>
            <h2 className="heading-lg mb-8">Our professional network</h2>
            
            {/* Network Stats Circles */}
            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-16">
              <div className="flex items-center justify-center w-48 h-48 rounded-full border-2 border-white/20 bg-white/5">
                <div className="text-center">
                  <div className="text-2xl font-semibold mb-1">100+ VC contacts</div>
                </div>
              </div>
              <div className="flex items-center justify-center w-48 h-48 rounded-full border-2 border-white/20 bg-white/5">
                <div className="text-center">
                  <div className="text-2xl font-semibold mb-1">25+ investment</div>
                  <div className="text-2xl font-semibold">countries</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mb-8">
            <h3 className="text-xl font-semibold mb-2">Our institutional partners</h3>
          </div>
          
          {/* Partners Grid */}
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {/* Overkill Capital */}
            <div className="text-center">
              <div className="w-full h-32 mb-4 flex items-center justify-center bg-white/10 rounded-lg border border-white/20">
                <Image
                  src="/partners/overkill.jpg"
                  alt="Overkill Capital logo"
                  width={120}
                  height={60}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <p className="text-muted text-sm">
                <strong>Overkill Capital</strong><br />
                Riga-based venture capital firm with multiple partners focused on high-growth technology companies across the Baltics and beyond.
              </p>
            </div>
            
            {/* Cherry VC */}
            <div className="text-center">
              <div className="w-full h-32 mb-4 flex items-center justify-center bg-white/10 rounded-lg border border-white/20">
                <Image
                  src="/partners/cherry.avif"
                  alt="Cherry VC logo"
                  width={120}
                  height={60}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <p className="text-muted text-sm">
                <strong>Cherry VC</strong><br />
                Amsterdam-based early-stage venture capital fund investing in ambitious European tech startups with global potential.
              </p>
            </div>
            
            {/* Point Nine Capital */}
            <div className="text-center">
              <div className="w-full h-32 mb-4 flex items-center justify-center bg-white/10 rounded-lg border border-white/20">
                <Image
                  src="/partners/pointNine.png"
                  alt="Point Nine Capital logo"
                  width={120}
                  height={60}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <p className="text-muted text-sm">
                <strong>Point Nine Capital</strong><br />
                Berlin-headquartered venture capital firm specializing in early-stage B2B software and marketplace investments across Europe.
              </p>
            </div>
            
            {/* Transform VC */}
            <div className="text-center">
              <div className="w-full h-32 mb-4 flex items-center justify-center bg-white/10 rounded-lg border border-white/20">
                <Image
                  src="/partners/transformVC.svg"
                  alt="Transform VC logo"
                  width={120}
                  height={60}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <p className="text-muted text-sm">
                <strong>Transform VC</strong><br />
                New York City-based venture capital firm focused on transformative technology companies disrupting traditional industries.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Hidden Calendly Preloader - Properly cached */}
      <div 
        className="fixed -top-[9999px] left-0 w-1 h-1 opacity-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <iframe
          id="calendly-preloader"
          src="https://calendly.com/thomas-nuverum/30min?embed_domain=localhost&embed_type=Inline"
          width="100%"
          height="600"
          title="Calendly preload"
          className="min-h-[600px]"
          loading="eager"
          onLoad={() => {
            // Mark as preloaded for the modal to use
            setCalendlyReady(true);
            window.calendlyPreloaded = true;
          }}
        />
      </div>

      {/* Contact Modal */}
      <ContactModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        prefilledEmail={prefilledEmail} // Email from hero form
        calendlyReady={calendlyReady}
      />
    </>
  );
}
