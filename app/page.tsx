import Image from "next/image";
import { MagnifyingGlassIcon, CheckCircleIcon, UserGroupIcon, ClipboardDocumentCheckIcon, ChartBarSquareIcon, RocketLaunchIcon } from "@heroicons/react/24/outline";
import HeroDiscoverMore from "./components/HeroDiscoverMore";
import ContactButton from "./components/ContactButton";
import FAQItem from "./components/FAQItem";
import Tooltip from "./components/Tooltip";
import type { Metadata } from 'next';
import Iridescence from "@/components/Iridescence";

export const metadata: Metadata = {
  title: 'Nuverum Ventures - Expert Fundraising Consultation for Startups',
  description: 'We help founders prepare to raise capital with strategic guidance, pitch refinement, and investor preparation. Flat-fee fundraising consultation services.',
  keywords: [
    'fundraising consultation',
    'pitch deck redesign',
    'startup fundraising',
    'investor preparation',
    'pitch materials',
    'fundraising strategy',
    'startup consulting',
    'investor research',
    'fundraising readiness',
    'pitch deck evaluation',
    'capital raising'
  ],
  openGraph: {
    title: 'Nuverum Ventures - Expert Fundraising Consultation for Startups',
    description: 'We help founders prepare to raise capital with strategic guidance, pitch refinement, and investor preparation. Flat-fee fundraising consultation services.',
    type: 'website',
    url: 'https://nuverum.com',
  },
};

export default function Home() {
  return (
    <>
      <section id="home" className="hero" aria-labelledby="hero-heading">
        <div className="absolute min-h-[100vh] inset-0 -z-10 filter:grayscale[1]">
        <Iridescence
            color={[1, 1, 1]}
            mouseReact={false}
            amplitude={0.1}
            speed={1.0}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/55 to-white/70" />
        </div>
        <div className="hero-inner max-md:mb-[20vh] container text-center">
          <div className="font-light heading-xl mb-6" data-animate="hero-text">
            <h1>Expert Fundraising Consultation for Startups</h1>
          </div>
          <div className="max-w-[700px] mx-auto mb-8 text-muted/90">
            <p className="text-lg">We help founders prepare to raise capital—strategic guidance, pitch refinement, and investor preparation.</p>
          </div>
        </div>
        <HeroDiscoverMore />
      </section>

      {/* What We Do */}
      <section 
        id="what-we-do" 
        className="section bg-gradient-to-b from-white/[0.02] to-transparent" 
        aria-labelledby="what-we-do-heading"
        data-animate="section"
      >
        <div className="container">
          <p id="what-we-do-heading" className="eyebrow mb-3">What We Do</p>
          <h2 className="heading-lg mb-6">We Help Founders Prepare for Fundraising</h2>
          <div className="flex flex-col lg:flex-row lg:gap-8 lg:items-start">
            <div className="lg:max-w-[380px] lg:flex-shrink-0 mb-6 lg:mb-0 space-y-4">
              <p className="text-muted">
                At Nuverum Ventures, we provide strategic consultation to help startups prepare for fundraising. We evaluate your pitch materials, develop your fundraising strategy, and help you build the investor pipeline you need to succeed.
              </p>
              <p className="text-muted">
                We operate on a flat-fee basis as consultants. Our compensation is never tied to whether you raise capital or who you raise it from.
              </p>
            </div>
            <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:flex-1" data-animate="cards" data-stagger="200">
              <div className="card">
                <div className="flex items-center gap-3 mb-3">
                  <div className="card-icon-inline" aria-hidden>
                    <MagnifyingGlassIcon className="size-full" aria-hidden />
                  </div>
                  <div className="card-title">Pitch Deck Evaluation</div>
                </div>
                <p className="card-body">
                  Professional pitch deck evaluation and redesign with investor-ready formatting tailored to your target audience.
                </p>
              </div>

              <div className="card">
                <div className="flex items-center gap-3 mb-3">
                  <div className="card-icon-inline" aria-hidden>
                    <ChartBarSquareIcon className="size-full" aria-hidden />
                  </div>
                  <div className="card-title">Fundraising Planning</div>
                </div>
                <p className="card-body">
                  Strategic fundraising planning and readiness assessment to ensure you're prepared for your raise.
                </p>
              </div>

              <div className="card">
                <div className="flex items-center gap-3 mb-3">
                  <div className="card-icon-inline" aria-hidden>
                    <UserGroupIcon className="size-full" aria-hidden />
                  </div>
                  <div className="card-title">Investor Research</div>
                </div>
                <p className="card-body">
                  Investor research and outreach strategy to help you identify and connect with the right capital partners.
                </p>
              </div>

              <div className="card">
                <div className="flex items-center gap-3 mb-3">
                  <div className="card-icon-inline" aria-hidden>
                    <CheckCircleIcon className="size-full" aria-hidden />
                  </div>
                  <div className="card-title">Actionable Guidance</div>
                </div>
                <p className="card-body">
                  Clear, actionable guidance to help you raise capital effectively and navigate the fundraising process.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Packages */}
      <section 
        id="packages" 
        className="section bg-background" 
        aria-labelledby="packages-heading"
        data-animate="section"
      >
        <div className="container">
          <div className="text-start mb-12">
            <p id="packages-heading" className="eyebrow mb-3">Our Packages</p>
            <h2 className="heading-lg">Choose Your Package</h2>
          </div>
          
          <div className="grid gap-8 grid-cols-1 md:grid-cols-3" data-animate="cards" data-stagger="150">
            {/* Package 1 */}
            <div className="card flex flex-col">
              <div className="space-y-4 flex-1">
                <div>
                  <h3 className="text-2xl font-semibold mb-2">Pitch Material Evaluation & Redesign</h3>
                  <p className="text-3xl font-bold">$1,000</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">What You Get:</h4>
                  <ul className="space-y-2 text-muted">
                    <li className="flex gap-2">
                      <CheckCircleIcon className="size-5 flex-shrink-0 mt-0.5" />
                      <span>Full evaluation of your existing pitch deck and materials</span>
                    </li>
                    <li className="flex gap-2">
                      <CheckCircleIcon className="size-5 flex-shrink-0 mt-0.5" />
                      <span>Assessment based on your funding stage and needs</span>
                    </li>
                    <li className="flex gap-2">
                      <CheckCircleIcon className="size-5 flex-shrink-0 mt-0.5" />
                      <span>Complete pitch deck redesign with professional formatting</span>
                    </li>
                    <li className="flex gap-2">
                      <CheckCircleIcon className="size-5 flex-shrink-0 mt-0.5" />
                      <span>Investor-ready materials tailored to your target audience</span>
                    </li>
                  </ul>
                </div>
                <div className="pt-4 border-t border-white/10">
                  <p className="text-sm text-muted mb-1"><strong>Best For:</strong> Early-stage startups that need polished, investor-ready materials.</p>
                  <p className="text-sm text-muted"><strong>Timeline:</strong> 7-10 business days</p>
                </div>
              </div>
              <ContactButton variant="muted" />
            </div>

            {/* Package 2 */}
            <div className="card flex flex-col">
              <div className="space-y-4 flex-1">
                <div>
                  <h3 className="text-2xl font-semibold mb-2">Pitch + Fundraising Strategy</h3>
                  <p className="text-3xl font-bold">$2,500</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">What You Get:</h4>
                  <ul className="space-y-2 text-muted">
                    <li className="flex gap-2">
                      <CheckCircleIcon className="size-5 flex-shrink-0 mt-0.5" />
                      <span>Everything in Package 1, plus:</span>
                    </li>
                    <li className="flex gap-2">
                      <CheckCircleIcon className="size-5 flex-shrink-0 mt-0.5" />
                      <span>10-page Strategic Fundraising Report with readiness assessment</span>
                    </li>
                    <li className="flex gap-2">
                      <CheckCircleIcon className="size-5 flex-shrink-0 mt-0.5" />
                      <span>Recommended funding amounts and approach</span>
                    </li>
                    <li className="flex gap-2">
                      <CheckCircleIcon className="size-5 flex-shrink-0 mt-0.5" />
                      <span>Target investor profiles and timing strategy</span>
                    </li>
                    <li className="flex gap-2">
                      <CheckCircleIcon className="size-5 flex-shrink-0 mt-0.5" />
                      <span>2-hour strategy consultation call</span>
                    </li>
                  </ul>
                </div>
                <div className="pt-4 border-t border-white/10">
                  <p className="text-sm text-muted mb-1"><strong>Best For:</strong> Founders who need both materials and a clear fundraising roadmap.</p>
                  <p className="text-sm text-muted"><strong>Timeline:</strong> 10-14 business days</p>
                </div>
              </div>
              <ContactButton />
            </div>

            {/* Package 3 */}
            <div className="card flex flex-col">
              <div className="space-y-4 flex-1">
                <div>
                  <h3 className="text-2xl font-semibold mb-2">Comprehensive Fundraising Prep</h3>
                  <p className="text-3xl font-bold">$3,000 - $5,000</p>
                  <p className="text-sm text-muted mt-1">(based on scope)</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">What You Get:</h4>
                  <ul className="space-y-2 text-muted z-2">
                    <li className="flex gap-2">
                      <CheckCircleIcon className="size-5 flex-shrink-0 mt-0.5" />
                      <span>Everything in Package 2, plus:</span>
                    </li>
                    <li className="flex gap-2">
                      <CheckCircleIcon className="size-5 flex-shrink-0 mt-0.5" />
                      <span>Custom investor CRM list (100-300+ relevant contacts)</span>
                    </li>
                    <li className="flex gap-2">
                      <CheckCircleIcon className="size-5 flex-shrink-0 mt-0.5" />
                      <span>Database with investor details, thesis, and stage focus</span>
                    </li>
                    <li className="flex gap-2">
                      <CheckCircleIcon className="size-5 flex-shrink-0 mt-0.5" />
                      <span>Email outreach templates and best practices</span>
                    </li>
                    <li className="flex gap-2">
                      <CheckCircleIcon className="size-5 flex-shrink-0 mt-0.5" />
                      <span className="flex items-center gap-1">
                        Introductions through our network
                        <Tooltip text="Any introductions we make are optional courtesy connections, not a paid service. Our fee is for consultation and research only." />
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="pt-4 border-t border-white/10">
                  <p className="text-sm text-muted mb-1"><strong>Best For:</strong> Startups ready to launch their fundraising campaign with a complete investor pipeline.</p>
                  <p className="text-sm text-muted"><strong>Timeline:</strong> 14-21 business days</p>
                </div>
              </div>
              <ContactButton variant="muted" />
            </div>
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section 
        id="how-we-work" 
        className="section bg-gradient-to-b from-white/[0.02] to-transparent" 
        aria-labelledby="how-we-work-heading"
        data-animate="section"
      >
        <div className="container">
          <div className="text-start mb-12">
            <p id="how-we-work-heading" className="eyebrow mb-3">Our Approach</p>
            <h2 className="heading-lg">How We Work</h2>
          </div>
          
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3" data-animate="cards" data-stagger="150">
            <div className="card">
              <div className="flex items-center gap-3 mb-3">
                <div className="card-icon-inline" aria-hidden>
                  <ClipboardDocumentCheckIcon className="size-full" aria-hidden />
                </div>
                <div className="card-title">Discovery & Assessment</div>
              </div>
              <p className="card-body">
                We start by understanding your business, traction, and goals. Then we assess your fundraising readiness and identify gaps in your materials and strategy.
              </p>
            </div>

            <div className="card">
              <div className="flex items-center gap-3 mb-3">
                <div className="card-icon-inline" aria-hidden>
                  <ChartBarSquareIcon className="size-full" aria-hidden />
                </div>
                <div className="card-title">Strategic Planning</div>
              </div>
              <p className="card-body">
                We develop tailored recommendations: realistic funding targets, investor profiles, and a clear roadmap for your raise.
              </p>
            </div>

            <div className="card">
              <div className="flex items-center gap-3 mb-3">
                <div className="card-icon-inline" aria-hidden>
                  <RocketLaunchIcon className="size-full" aria-hidden />
                </div>
                <div className="card-title">Execution Support</div>
              </div>
              <p className="card-body">
                We deliver professional materials, detailed reports, investor databases and outreach frameworks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Us - Meet the Team */}
      <section 
        id="about" 
        className="section bg-background" 
        aria-labelledby="about-heading"
        data-animate="section"
      >
        <div className="container">
          <div className="text-start mb-12">
            <p id="about-heading" className="eyebrow mb-3">About Us</p>
            <h2 className="heading-lg">Meet the Team</h2>
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
                  Daniel is a growth-focused entrepreneur who launched his first business at age 14. With experience founding agencies in online course building, email marketing, and AI automation, he now helps startups prepare for fundraising through strategic consultation and pitch refinement.
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
                  Thomas is a finance-driven entrepreneur with expertise in tax strategy, financial optimization, and fintech. Co-founder of Brightincorp and Christian Marcus, Thomas brings financial services experience and strategic insight to help startups navigate fundraising.
                </p>
              </div>
            </div>
          </div>

          {/* Our Story */}
          <div className="mt-16 max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-semibold mb-4">Our Story</h3>
            <p className="text-muted leading-relaxed">
              As founders ourselves, we've experienced the challenges of raising capital. We built Nuverum Ventures to provide the strategic guidance and preparation we wish we'd had—delivered transparently and professionally.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section 
        id="faq" 
        className="section bg-gradient-to-b from-white/[0.02] to-transparent" 
        aria-labelledby="faq-heading"
        data-animate="section"
      >
        <div className="container">
          <div className="text-start items-center mb-12">
            <p id="faq-heading" className="eyebrow mb-3">FAQ</p>
            <h2 className="heading-lg">Frequently Asked Questions</h2>
          </div>
          
          <div className="max-w-3xl">
            <FAQItem 
              index={0}
              question="What exactly do you do?"
              answer="We're fundraising consultants. We help you prepare to raise capital by refining your pitch, developing your strategy, and building your investor pipeline."
            />
            <FAQItem 
              index={1}
              question="Do you introduce us to investors?"
              answer="In Package 3, we may make courtesy introductions through our network, but that's not what you're paying for. Our fee is for consultation and research services."
            />
            <FAQItem 
              index={2}
              question="What if we don't raise capital?"
              answer="Our fees are for the consultation services we provide, not for fundraising outcomes. We give you the tools and strategy—execution is up to you."
            />
            <FAQItem 
              index={3}
              question="Can we pay you a success fee instead?"
              answer="No. We only work on a flat-fee basis as consultants."
            />
            <FAQItem 
              index={4}
              question="How do I know which package is right?"
              answer="Schedule a free 15-minute call and we'll help you figure out the best fit for your needs."
            />
          </div>
        </div>
      </section>

      {/* Get Started */}
      <section 
        id="get-started" 
        className="section bg-background" 
        aria-labelledby="get-started-heading"
        data-animate="section"
      >
        <div className="container text-center">
          <p id="get-started-heading" className="eyebrow items-start mb-3">Get Started</p>
          <h2 className="heading-lg mb-6">Ready to Recieve Funding?</h2>
          <p className="text-muted max-w-2xl mx-auto mb-8">
            Whether you're refining your pitch or building a complete fundraising strategy, we're here to help.
          </p>
          <ContactButton />
        </div>
      </section>
    </>
  );
}
