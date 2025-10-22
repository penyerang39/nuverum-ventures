import Image from "next/image";
import { MagnifyingGlassIcon, BriefcaseIcon, LinkIcon, FireIcon, ChartBarIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import HeroSection from "./components/HeroSection";
import PartnersStats from "./components/PartnersStats";
import ContactButton from "./components/ContactButton";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nuverum Ventures - Bridging Vision with Opportunity',
  description: 'Strategic venture capital introductory firm for innovative companies.  We invite forward-thinking entrepreneurs into our network of venture capitalists to fuel growth and innovation.',
  keywords: [
    'venture capital',
    'investment',
    'startup funding',
    'strategic investment',
    'business development',
    'entrepreneurship',
    'innovation',
    'growth capital',
    'investor introductions',
    'pitch deck',
    'fundraising'
  ],
  openGraph: {
    title: 'Nuverum Ventures - Bridging Vision with Opportunity',
    description: 'Strategic venture capital introductory firm for innovative companies.  We invite forward-thinking entrepreneurs into our network of venture capitalists to fuel growth and innovation.',
    type: 'website',
    url: 'https://nuverum.com',
  },
};

export default function Home() {
  return (
    <>
      <HeroSection />

      {/* Partners */}
      <section 
        id="partners" 
        className="section bg-gradient-to-b from-white/[0.02] to-transparent" 
        aria-labelledby="partners-heading"
        data-animate="section"
      >
        <div className="container">
          <div className="text-start mb-12">
            <p id="partners-heading" className="eyebrow mb-3">Our Partners</p>
            <h2 className="heading-lg">Our Professional Network</h2>
          </div>
          
          <PartnersStats />

          <div className="grid gap-0 grid-cols-1 md:grid-cols-3 lg:grid-cols-5" data-animate="cards" data-stagger="150">
                  <div className="card text-start">
              <div className="w-full h-20 py-5 bg-primary/10 rounded-lg flex items-start justify-start mb-4">
                <Image
                  src="/partners/overkill.svg"
                  alt="Overkill Capital logo"
                  width={120}
                  height={30}
                  className="h-16 w-auto object-contain"
                  data-noindex
                />
              </div>
              <div className="space-y-2">
                <h4 className="text-lg font-semibold text-foreground">Overkill Capital</h4>
                <p className="text-sm text-muted">Riga, Latvia</p>
                <p className="text-sm text-muted leading-relaxed" data-nosnippet>
                  A dynamic venture capital firm with multiple partners, specializing in early-stage investments across the Baltic region. Known for their hands-on approach and deep understanding of emerging markets.
                </p>
              </div>
            </div>

                  <div className="card text-start">
              <div className="w-full h-20 py-5 bg-primary/10 rounded-lg flex items-start justify-start mb-4">
                <Image
                  src="/partners/cherry-cropped.svg"
                  alt="Cherry VC logo"
                  width={120}
                  height={40}
                  className="h-16 w-auto object-contain"
                  data-noindex
                />
              </div>
              <div className="space-y-2">
                <h4 className="text-lg font-semibold text-foreground">Cherry VC</h4>
                <p className="text-sm text-muted">Amsterdam, Netherlands</p>
                <p className="text-sm text-muted leading-relaxed" data-nosnippet>
                  A focused venture capital partner based in Amsterdam, bringing European expertise to global opportunities. Their strategic approach combines local market knowledge with international investment experience.
                </p>
              </div>
            </div>

                  <div className="card text-start">
              <div className="w-full h-20 py-5 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Image
                  src="/partners/pointNine.png"
                  alt="Point Nine Capital logo"
                  width={120}
                  height={40}
                  className="h-16 w-auto object-contain"
                  data-noindex
                />
              </div>
              <div className="space-y-2">
                <h4 className="text-lg font-semibold text-foreground">Point Nine Capital</h4>
                <p className="text-sm text-muted">Berlin, Germany</p>
                <p className="text-sm text-muted leading-relaxed" data-nosnippet>
                  A leading European venture capital firm with a single dedicated partner, focusing on B2B SaaS and marketplace investments. Renowned for their technical expertise and founder-friendly approach.
                </p>
              </div>
            </div>

                  <div className="card text-start">
              <div className="w-full h-20 py-5 bg-primary/10 rounded-lg flex items-start justify-start mb-4">
                <Image
                  src="/partners/transformVC.svg"
                  alt="Transform VC logo"
                  width={120}
                  height={40}
                  className="h-16 w-auto object-contain"
                  data-noindex
                />
              </div>
              <div className="space-y-2">
                <h4 className="text-lg font-semibold text-foreground">Transform VC</h4>
                <p className="text-sm text-muted">New York City, USA</p>
                <p className="text-sm text-muted leading-relaxed" data-nosnippet>
                  A New York-based venture capital partner specializing in transformative technologies and innovative business models. Their global perspective and extensive network provide unique opportunities for portfolio companies.
                </p>
              </div>
            </div>

                  <div className="card text-start">
              <div className="w-full h-20 p-0 bg-primary/10 rounded-lg flex items-start justify-start mt-4">
                <Image
                  src="/partners/bCombinator.png"
                  alt="B Combinator logo"
                  width={200}
                  height={20}
                  className="h-16 w-auto object-contain"
                  data-noindex
                />
              </div>
              <div className="space-y-2">
                <h4 className="text-lg font-semibold text-foreground">B Combinator</h4>
                <p className="text-sm text-muted">Barcelona, Spain</p>
                <p className="text-sm text-muted leading-relaxed" data-nosnippet>
                        B Combinator is a Barcelona-based venture capital fund investing in transformative technologies and innovative business models, leveraging a global network to unlock exceptional growth opportunities for founders.
                      </p>
                    </div>
                  </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section 
        id="services" 
        className="section bg-gradient-to-b from-white/[0.02] to-transparent" 
        aria-labelledby="services-heading"
        data-animate="section"
      >
        <div className="container">
          <p id="services-heading" className="eyebrow mb-3">Services</p>
          <h2 className="heading-lg mb-6">What We Offer</h2>
          <div className="flex flex-col lg:flex-row lg:gap-8 lg:items-start">
            <p className="text-muted lg:max-w-[300px] lg:flex-shrink-0 mb-6 lg:mb-0">
              Nuverum Ventures is an introductory service, we provide founders with selective access to investors, thoughtful evaluation of pitch materials and strategic guidance tailored to their venture.
              <br />
              <br />
              We Curate introductions, refine presentations, and illuminate the next steps, enabling companies to navigate their path from vision to opportunity with clarity and purpose.
            </p>
            <div className="grid gap-5 grid-cols-1 lg:grid-cols-3 lg:flex-1" data-animate="cards" data-stagger="200">
                    <div className="card">
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

      {/* Approach - 3P Framework */}
      <section 
        id="framework" 
        className="section bg-background" 
        aria-labelledby="framework-heading"
        data-animate="section"
      >
        <div className="container">
          <div className="text-start mb-8">
            <p id="framework-heading" className="eyebrow mb-3">Our Approach</p>
            <h2 className="heading-lg">The 3 P Framework</h2>
            <p className="text-muted max-w-2xl mt-4">
              Every partnership begins with careful evaluation. We screen opportunities based on clear criteria that ensure mutual success and meaningful outcomes.
            </p>
          </div>
          
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3" data-animate="cards" data-stagger="150">
                  <div className="card">
              <div className="flex items-center gap-3 mb-3">
                <div className="card-icon-inline" aria-hidden>
                 <FireIcon className="size-full" aria-hidden/>
                </div>
                <div className="card-title">Passion</div>
              </div>
              <p className="card-body">
                We seek founders driven by genuine passion and deep commitment to creating meaningful impact. We partner with entrepreneurs who view their companies as platforms for substantial change, not quick exits. This intrinsic motivation translates into resilience and authentic leadership that attracts both talent and investors.
              </p>
            </div>

                  <div className="card">
              <div className="flex items-center gap-3 mb-3">
                <div className="card-icon-inline" aria-hidden>
                <ChartBarIcon className="size-full" aria-hidden/>
                </div>
                <div className="card-title">Potential</div>
              </div>
              <p className="card-body">
                We focus on ventures that represent the founder&apos;s primary commitment with scale to justify significant investment. We work exclusively with projects that command founders&apos; full attention, not side ventures. We seek opportunities with substantial market potential that can support meaningful growth trajectories.
              </p>
            </div>

                  <div className="card">
              <div className="flex items-center gap-3 mb-3">
                <div className="card-icon-inline" aria-hidden>
                <CheckCircleIcon className="size-full" aria-hidden/>
                </div>
                <div className="card-title">Possibility</div>
              </div>
              <p className="card-body">
                We maintain high standards because we believe in setting founders up for success. Rather than pursuing &quot;maybe&quot; opportunities, we conduct thorough assessments to ensure realistic paths to successful fundraising. Our reputation is built on presenting well-prepared, investment-ready companies with honest feedback when needed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Founders */}
      <section 
        id="about" 
        className="section bg-gradient-to-b from-white/[0.02] to-transparent" 
        aria-labelledby="founders-heading"
        data-animate="section"
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
                data-noindex
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
                src="/Thomas.jpg"
                alt="Thomas - Finance-driven entrepreneur"
                width={400}
                height={300}
                className="w-full h-auto object-cover rounded-3xl"
                data-noindex
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
        id="why-we-do-it" 
        className="section bg-background" 
        aria-labelledby="why-heading"
        data-animate="section"
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
        id="our-approach" 
        className="section bg-gradient-to-b from-white/[0.02] to-transparent" 
        aria-labelledby="approach-heading"
        data-animate="section"
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
                Our revenue model aligns our success with yours. We operate on a consulting fee structure, ensuring we&apos;re incentivized to secure the right opportunities for your venture. Consulting fees are capped at a maximum of 5% of final funding round amount, reflecting our commitment to fair and transparent partnerships.
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

      {/* Mission */}
      <section 
        id="approach" 
        className="section bg-background" 
        aria-labelledby="mission-eyebrow"
        data-animate="section"
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
        <ContactButton />
      </section>
    </>
  );
}
