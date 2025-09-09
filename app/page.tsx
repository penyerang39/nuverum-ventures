'use client'

// import Image from "next/image";
import { MagnifyingGlassIcon, BriefcaseIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import AnimatedArrowIcon from "./components/AnimatedArrowIcon";
import ContactModal from "./components/ContactModal";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [prefilledEmail, setPrefilledEmail] = useState('');
  return (
    <>
      {/* Hero */}
      <section className="hero" aria-labelledby="hero-heading">
        <div aria-hidden className="absolute min-h-[100vh] inset-0 -z-10">
          <img 
            src="/heroBackground.jpg"
            alt="Mountain background"
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              objectFit: 'cover',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/55 to-white/70" />
        </div>
        <div className="hero-inner container flex flex-col items-center justify-center text-center">
          <h1 id="hero-heading" className="font-light heading-xl mb-10">
            Bridging vision with opportunity.
          </h1>
          <form 
            className="w-full flex justify-center items-center" 
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const email = formData.get('email') as string;
              setPrefilledEmail(email || '');
              setIsModalOpen(true);
            }}
            aria-label="Contact form"
          >
            <label htmlFor="email" className="visually-hidden">Email</label>
            <div className="inline-flex border border-white bg-transparent items-stretch h-10 rounded-xl overflow-hidden align-middle">
              <input
                className="w-[30ch] bg-white/20 pl-4 backdrop-blur-sm text-white h-full py-0 rounded-none border-0 focus:outline-none leading-none"
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                required
                aria-required="true"
              />
               <button
                 className="bg-white group text-black h-full px-3 rounded-none flex items-center leading-none gap-2 transition-all duration-300 ease-out"
                 type="submit"
               >
                 Contact Us
                 <AnimatedArrowIcon size="sm" />
               </button>
            </div>
          </form>
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

      {/* Services */}
      <section id="services" className="section bg-gradient-to-b from-white/[0.02] to-transparent" aria-labelledby="services-heading">
        <div className="container">
          <h2 id="services-heading" className="heading-lg mb-6">Services</h2>
          <div className="grid gap-5 grid-cols-1">
            {/* Card 1 */}
            <div className="card">
              <div className="card-icon" aria-hidden>
                <span className="text-[22px]"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
                    </svg>
              </span>
              </div>
              <div className="card-title">Investor Introduction</div>
              <p className="card-body">
                Access defines advantage. Through our established investor network, we deliver curated introductions that accelerate outcomes, turning selective capital partners into tangible opportunity.
              </p>
            </div>

            {/* Card 2 */}
            <div className="card">
              <div className="card-icon" aria-hidden>
                <MagnifyingGlassIcon className="size-6" aria-hidden />
              </div>
              <div className="card-title">Pitch Material Evaluation</div>
              <p className="card-body">
                Every detail matters. We dissect your pitch materials with an investor's eye, identifying gaps and strengths, and outlining the changes needed to make your story investor-ready.
              </p>
            </div>

            {/* Card 3 */}
            <div className="card">
              <div className="card-icon" aria-hidden>
                <BriefcaseIcon className="size-6" aria-hidden />
              </div>
              <div className="card-title">Venture Capital Consultation</div>
              <p className="card-body">
                Raising capital begins with strategy. We provide tailored reports and guidance on next steps if you are considering or growing venture capital, helping you navigate decisions with clarity and precision.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Modal */}
      <ContactModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        prefilledEmail={prefilledEmail} // Email from hero form
      />
    </>
  );
}
