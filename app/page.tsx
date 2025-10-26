import Image from "next/image";
import { MagnifyingGlassIcon, CheckCircleIcon, UserGroupIcon, ClipboardDocumentCheckIcon, ChartBarSquareIcon, RocketLaunchIcon } from "@heroicons/react/24/outline";
import HeroDiscoverMore from "./components/HeroDiscoverMore";
import ContactButton from "./components/ContactButton";
import FAQItem from "./components/FAQItem";
import type { Metadata } from 'next';
import Iridescence from "@/components/Iridescence";
import RotatingText from "@/components/RotatingText";

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
        <div className="absolute min-h-[100vh] inset-0 mx-0 px-0 -z-10 filter:grayscale[1]">
        <Iridescence
            color={[1, 1, 1]}
            mouseReact={false}
            amplitude={0.1}
            speed={1.0}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/55 to-white/70" />
        </div>
        <div className="hero-inner max-md:mb-[20vh] container mx-0 px-0 text-center">
          <div className="font-light heading-xl mb-6" data-animate="hero-text">
            <h1 className="flex flex-wrap items-center justify-center gap-2">Expert <RotatingText
              texts={['Fundraising', 'Pre-Seed', 'Series A', 'Scaling']}
              mainClassName="px-2 sm:px-2 md:px-3 mx-3 mx-3 bg-black text-white overflow-hidden py-0.5 sm:py-1 md:py-3 rounded-lg flex-shrink-0 whitespace-nowrap"
              staggerFrom="last"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-120%" }}
              staggerDuration={0.025}
              splitLevelClassName="overflow-hidden"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={4000}
            /> <span className="basis-full"></span>Consultation for Startups</h1>
          </div>
          <div className="lg:whitespace-nowrap absolute bottom-20 italic mx-auto mb-8 text-muted/90">
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
            {/* Daniel Column */}
            <div className="space-y-6">
              <div className="overflow-hidden">
                <Image
                  src="/Daniels.jpg"
                  alt="Daniel - Growth-focused entrepreneur"
                  width={400}
                  height={300}
                  className="w-full h-auto object-cover rounded-3xl"
                  data-noindex
                />
              </div>
              <div className="text-start">
                <h3 className="text-2xl font-semibold mb-3 text-center md:text-start">Daniel</h3>
                <p className="text-muted text-start leading-relaxed">
                  Daniel is a growth-focused entrepreneur who launched his first business at age 14. With experience founding agencies in online course building, email marketing, and AI automation, he now helps startups prepare for fundraising through strategic consultation and pitch refinement.
                </p>
              </div>
            </div>

            {/* Thomas Column */}
            <div className="space-y-6">
              <div className="overflow-hidden">
                <Image
                  src="/Thomas.jpg"
                  alt="Thomas - Finance-driven entrepreneur"
                  width={400}
                  height={300}
                  className="w-full h-auto object-cover rounded-3xl"
                  data-noindex
                />
              </div>
              <div className="text-start">
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
              <div className="space-y-4 pb-4 border-b border-white/10 h-32">
                <div>
                  <h3 className="text-2xl font-semibold mb-2">Pitch Material Evaluation & Redesign</h3>
                  <p className="text-3xl font-bold">$1,000</p>
                </div>
              </div>
              <div className="flex flex-col justify-between flex-1">
                <div className="space-y-4 py-4">
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
                </div>
                <div className="pt-4 border-t border-white/10">
                  <p className="text-sm text-muted mb-1"><strong>Best For:</strong> Early-stage startups that need polished, investor-ready materials.</p>
                  <p className="text-sm text-muted"><strong>Timeline:</strong> 7-10 business days</p>
                </div>
              </div>
              <ContactButton variant="muted" packageName="Pitch Material Evaluation & Redesign" />
            </div>

            {/* Package 2 */}
            <div className="card flex flex-col">
              <div className="space-y-4 pb-4 border-b border-white/10 h-32">
                <div>
                  <h3 className="text-2xl font-semibold mb-2">Pitch + Fundraising Strategy</h3>
                  <p className="text-3xl font-bold">$2,500</p>
                </div>
              </div>
              <div className="flex flex-col justify-between flex-1">
                <div className="space-y-4 py-4">
                  <div>
                    <h4 className="font-semibold mb-3">What You Get:</h4>
                    <ul className="space-y-2 text-muted">
                      <li className="flex gap-2 text-black">
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
                </div>
                <div className="pt-4 border-t border-white/10">
                  <p className="text-sm text-muted mb-1"><strong>Best For:</strong> Founders who need both materials and a clear fundraising roadmap.</p>
                  <p className="text-sm text-muted"><strong>Timeline:</strong> 10-14 business days</p>
                </div>
              </div>
              <ContactButton packageName="Pitch + Fundraising Strategy" />
            </div>

            {/* Package 3 */}
            <div className="card flex flex-col">
              <div className="space-y-4 pb-4 border-b border-white/10 h-32">
                <div>
                  <h3 className="text-2xl font-semibold mb-2">Comprehensive Fundraising Prep</h3>
                  <p className="text-3xl font-bold">$3,000 - $5,000</p>
                  <p className="text-sm text-muted mt-1">(based on scope)</p>
                </div>
              </div>
              <div className="flex flex-col justify-between flex-1">
                <div className="space-y-4 py-4">
                  <div>
                    <h4 className="font-semibold mb-3">What You Get:</h4>
                    <ul className="space-y-2 text-muted">
                      <li className="flex gap-2 text-black">
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
                          Introductions through our network (optional courtesy service)
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="pt-4 border-t border-white/10">
                  <p className="text-sm text-muted mb-1"><strong>Best For:</strong> Startups ready to launch their fundraising campaign with a complete investor pipeline.</p>
                  <p className="text-sm text-muted"><strong>Timeline:</strong> 14-21 business days</p>
                </div>
              </div>
              <ContactButton variant="muted" packageName="Comprehensive Fundraising Prep" />
            </div>
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
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
            <div className="col max-w-3xl h-flex">
              <FAQItem 
                index={0}
                question="What services does Nuverum Ventures provide?"
                answer="We provide strategic fundraising consultation to help startups prepare for capital raises. Our services include pitch deck evaluation and redesign, fundraising strategy development, investor research, and investor pipeline development."
              />
              <FAQItem 
                index={1}
                question="Do you provide investor introductions?"
                answer="Investor introductions are an optional courtesy service included in our Comprehensive Fundraising Prep package. However, our primary value is in the consultation, research, and strategy we provide—introductions are supplementary."
              />
              <FAQItem 
                index={2}
                question="Are your fees contingent on successful fundraising?"
                answer="No. Our consulting fees are fixed and based on the package you select. We're compensated for the strategic guidance and materials we deliver, regardless of fundraising outcomes. Our success metrics are based on the quality of our work, not your results."
              />
              <FAQItem 
                index={3}
                question="Do you work on a success-fee or equity basis?"
                answer="We only work on a flat-fee consulting basis. We do not accept success fees, equity, or outcome-based compensation arrangements."
              />
              <FAQItem 
                index={4}
                question="How do I determine which package is best for my needs?"
                answer="We recommend scheduling a complimentary 15-minute consultation call to discuss your specific situation, goals, and requirements. This allows us to recommend the package that best aligns with your fundraising stage and objectives."
              />
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 250 150" className="col w-full h-auto" aria-label="Nuverum Logo">
              <defs>
                <style>{`.nuverum-black { fill: #5b646e; }`}</style>
              </defs>
              <g>
                <path className="nuverum-black" d="M1.75,74.41c0-7.33,4.41-11.16,10.98-11.16s10.98,3.82,10.98,11.16v11.65h-2.07v-11.65c0-5.94-3.51-9.22-8.91-9.22s-8.91,3.28-8.91,9.22v11.65H1.75v-11.65Z"/>                                                            
                <path className="nuverum-black" d="M38.02,75.49v-11.65h2.07v11.65c0,5.94,3.51,9.23,8.91,9.23s8.91-3.29,8.91-9.23v-11.65h2.07v11.65c0,7.33-4.41,11.16-10.98,11.16s-10.98-3.83-10.98-11.16Z"/>                                                            
                <path className="nuverum-black" d="M73.12,63.83h2.29l9.45,20.2,9.45-20.2h2.2l-10.48,22.23h-2.43l-10.48-22.23Z"/>                                                        
                <path className="nuverum-black" d="M107.72,74.95c0-6.75,4.95-11.7,11.97-11.7s11.93,4.95,11.93,11.7v.54h-21.78c.22,5.35,4.14,9.23,9.85,9.23,4.05,0,7.15-1.85,8.73-4.91h2.25c-1.71,4.14-5.76,6.84-10.98,6.84-7.02,0-11.97-4.95-11.97-11.7ZM129.46,73.6c-.58-5.04-4.46-8.41-9.77-8.41s-9.22,3.42-9.81,8.41h19.57Z"/>                       
                <path className="nuverum-black" d="M145.03,72.56c0-6.25,3.73-9.31,9.18-9.31s9.18,3.06,9.18,9.31v.36h-2.03v-.36c0-5.04-2.88-7.38-7.15-7.38s-7.11,2.34-7.11,7.38v13.5h-2.07v-13.5Z"/>                                                                     
                <path className="nuverum-black" d="M176.35,75.49v-11.65h2.07v11.65c0,5.94,3.51,9.23,8.91,9.23s8.91-3.29,8.91-9.23v-11.65h2.07v11.65c0,7.33-4.41,11.16-10.98,11.16s-10.98-3.83-10.98-11.16Z"/>                                                           
                <path className="nuverum-black" d="M212.62,72.92c0-6.48,3.78-9.67,8.86-9.67,3.78,0,6.88,1.89,8.14,5.62,1.26-3.73,4.32-5.62,8.14-5.62,5.08,0,8.87,3.19,8.87,9.67v13.14h-2.07v-13.14c0-5.17-2.92-7.74-6.93-7.74s-6.97,2.7-6.97,7.74v13.14h-2.07v-13.14c0-5.04-2.97-7.74-6.98-7.74s-6.93,2.56-6.93,7.74v13.14h-2.07v-13.14Z"/>             
              </g>
            </svg>
          </div>
        </div>
      </section>
    </>
  );
}
