'use client'

import Image from "next/image";
import { MagnifyingGlassIcon, BriefcaseIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import AnimatedArrowIcon from "./components/AnimatedArrowIcon";
import ContactModal from "./components/ContactModal";
import ShinyText from "./components/ShinyText";
import { usePerformanceTracking } from "./hooks/usePerformanceTracking";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [prefilledEmail, setPrefilledEmail] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);

  // Performance tracking
  const { trackElementVisibility, trackUserInteraction } = usePerformanceTracking();

  // Email validation effect
  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailValue.trim() !== '' && emailRegex.test(emailValue));
  }, [emailValue]);

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

  // Preload Calendly resources
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

    return () => {
      document.head.removeChild(link);
      document.head.removeChild(dnsLink);
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
        <div className="hero-inner max-md:mb-[20vh] container flex flex-col items-center justify-center text-center relative">
          <h1 id="hero-heading" className="font-light heading-xl mb-10">
            Bridging vision with opportunity.
          </h1>
          <div className="w-full flex justify-center items-center">
            <label htmlFor="email" className="visually-hidden">Email</label>
            <div className="inline-flex border border-white bg-transparent items-stretch h-10 rounded-xl overflow-hidden align-middle">
              <input
                className="w-[30ch] bg-white/20 pl-4 backdrop-blur-sm text-white h-full py-0 rounded-none border-0 focus:outline-none leading-none"
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={emailValue}
                onChange={(e) => setEmailValue(e.target.value)}
                onFocus={() => trackUserInteraction('email-input-focus', 'hero-email')}
                required
                aria-required="true"
              />
               <button
                 className="bg-white group text-black h-full px-3 rounded-none flex items-center leading-none gap-2 transition-all duration-300 ease-out"
                 type="button"
                 onClick={() => {
                   trackUserInteraction('contact-button-click', 'hero-contact');
                   const emailInput = document.getElementById('email') as HTMLInputElement;
                   const email = emailInput?.value || '';
                   setPrefilledEmail(email);
                   setIsModalOpen(true);
                 }}
               >
                 Contact Us
                 <AnimatedArrowIcon size="sm" isActive={isEmailValid} />
               </button>
            </div>
          </div>
          
          {/* Scroll Call to Action */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer group" onClick={scrollToNextSection}>
            <ShinyText 
              text="Discover More" 
              speed={3}
              className="text-sm font-medium text-white/80 group-hover:text-white transition-colors duration-300"
            />
            <ChevronDownIcon className="w-5 h-5 text-white/60 group-hover:text-white group-hover:translate-y-1 transition-all duration-300" />
          </div>
        </div>
      </section>

      {/* Mission */}
      <section id="approach" className="section bg-background" aria-labelledby="mission-eyebrow">
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
      <section id="founders" className="section bg-gradient-to-b from-white/[0.02] to-transparent" aria-labelledby="founders-heading">
        <div className="container">
          <div className="text-start mb-12">
            <p id="founders-heading" className="eyebrow mb-3">Our Founders</p>
            <h2 className="heading-lg">Meet the team behind Nuverum Ventures</h2>
          </div>
          <div className="grid gap-8 grid-cols-1 lg:grid-cols-2 lg:gap-12">
            {/* Daniel */}
            <div className="card-no-padding text-start overflow-hidden flex flex-col lg:flex-row">
              <div className="relative w-full lg:w-1/3 rounded-t-2xl lg:rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src="/Daniels.jpg"
                  alt="Daniel - Growth-focused entrepreneur"
                  width={400}
                  height={300}
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="p-6 flex-1">
                <h3 className="text-2xl font-semibold mb-3 text-center lg:text-start">Daniel</h3>
                <p className="text-muted text-start leading-relaxed">
                  Daniel is a growth-focused entrepreneur who launched his first business at age 14, building it into a sizeable venture within two years. Since then, he has founded and led agencies in online course and community building, email marketing, and AI automation. Today, he supports startups in securing funding and works with established companies to design sales processes and teams that deliver sustainable growth.
                </p>
              </div>
            </div>

            {/* Thomas */}
            <div className="card-no-padding text-start overflow-hidden flex flex-col lg:flex-row">
              <div className="relative w-full lg:w-1/3 rounded-t-full lg:rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src="/Thomas.jpg"
                  alt="Thomas - Finance-driven entrepreneur"
                  width={400}
                  height={300}
                  className="w-full h-auto object-cover rounded-t-full lg:rounded-full"
                />
              </div>
              <div className="p-6 flex-1">
                <h3 className="text-2xl font-semibold mb-3 text-center lg:text-start">Thomas</h3>
                <p className="text-muted text-start leading-relaxed">
                  Thomas is a finance-driven entrepreneur with expertise in tax strategy, financial optimization, and fintech. He, together with Saul Rosenberg, founded Brightincorp, a firm specializing in U.S. business and bank account formation, and Christian Marcus, a full-service agency covering marketing and tax consultancy. Drawing on financial services sector experience and a strong U.S. network, Thomas now helps startups secure funding and develop scalable business solutions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why We Do It */}
      <section id="why-we-do-it" className="section bg-background" aria-labelledby="why-heading">
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
      <section id="our-approach" className="section bg-gradient-to-b from-white/[0.02] to-transparent" aria-labelledby="approach-heading">
        <div className="container">
          <div className="text-start mb-8">
            <p id="approach-heading" className="eyebrow mb-3">Our Approach</p>
            <h2 className="heading-lg">Transparent partnerships, aligned incentives</h2>
          </div>
          <div className="grid gap-8 grid-cols-1 lg:grid-cols-2 lg:gap-12">
            <div className="space-y-3">
              <h3 className="heading-xl">Success fee up to 5%</h3>
              <p className="text-muted">Consultation fee discussed individually based on scope and stage.</p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Financing strategies, tailored to you</h3>
              <p className="text-muted">
                We help founders evaluate and pursue the right capital path—from equity and venture capital to venture debt, revenue-based financing, and other non-dilutive options—and tailor our approach to your goals, stage, and timeline.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="section bg-gradient-to-b from-white/[0.02] to-transparent" aria-labelledby="services-heading">
        <div className="container">
        <p id="services-heading" className="eyebrow mb-3">Services</p>
          <h2 id="services-heading" className="heading-lg mb-6">What We Offer</h2>
          <div className="flex flex-col lg:flex-row lg:gap-8 lg:items-start">
            <p className="text-muted lg:max-w-[300px] lg:flex-shrink-0 mb-6 lg:mb-0">Nuverum Ventures is a finder firm, we provide founders with selective access to investors, thoughtful evaluation of pitch materials and strategic guidance tailored to their venture.
              <br />
              <br />
              We Curate introductions, refine presentations, and illuminate the next steps, enabling companies to navigate their path from vision to opportunity with clariy and purpose.
            </p>
            <div className="grid gap-5 grid-cols-1 lg:grid-cols-3 lg:flex-1">
              {/* Card 1 */}
            <div className="card">
              <div className="flex items-center gap-3 mb-3">
                <div className="card-icon-inline" aria-hidden>
                  <span className="text-[22px]"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-full">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
                      </svg>
                </span>
                </div>
                <div className="card-title">Investor Introduction</div>
              </div>
              <p className="card-body">
                Access defines advantage. Through our established investor network, we deliver curated introductions that accelerate outcomes, turning selective capital partners into tangible opportunity.
              </p>
            </div>

            {/* Card 2 */}
            <div className="card">
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
            <div className="card">
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

      {/* Hidden Calendly Preloader */}
      <div 
        className="fixed -top-[9999px] left-0 w-1 h-1 opacity-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <iframe
          src="https://calendly.com/thomas-nuverum/30min?embed_domain=localhost&embed_type=Inline"
          width="100%"
          height="600"
          title="Calendly preload"
          className="min-h-[600px]"
          loading="eager"
        />
      </div>

      {/* Contact Modal */}
      <ContactModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        prefilledEmail={prefilledEmail} // Email from hero form
      />
    </>
  );
}
