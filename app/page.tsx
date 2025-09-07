// import Image from "next/image";

export default function Home() {
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
        <div className="hero-inner container">
          <h1 id="hero-heading" className="heading-xl mb-4">
            Bridging vision with opportunity.
          </h1>
          <form className="container flex gap-3 justify-center max-w-[520px]" action="#contact" aria-label="Contact form">
            <label htmlFor="email" className="visually-hidden">Email</label>
            <input className="input flex-1" id="email" type="email" placeholder="Enter your email" required aria-required="true" />
            <button className="btn" type="submit">Contact</button>
          </form>
        </div>
      </section>

      {/* Mission */}
      <section id="approach" className="section bg-background" aria-labelledby="mission-eyebrow">
        <div className="container grid gap-7 grid-cols-1 items-start">
          <div>
            <p id="mission-eyebrow" className="eyebrow mb-3">Our Mission</p>
            <h2 className="heading-lg m-0">Bridging vision to capital with selectivity and discretion</h2>
          </div>
          <div className="grid gap-4">
            <p className="text-muted">
              The landscape of venture is changing. How opportunities are found and connected must evolve too.
            </p>
            <p className="text-muted">
              Startups and investors move faster than ever. To keep pace, Nuverum Ventures puts curated introductions ahead of noise and builds bridges that bring founders and investors closer to the connections that truly matter.
            </p>
            <a className="btn btn-ghost self-start" href="#about">
              Learn more about our mission
            </a>
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
                <span className="text-[22px]">🔗</span>
              </div>
              <div className="card-title">Investor Introduction</div>
              <p className="card-body">
                Access defines advantage. Through our established investor network, we deliver curated introductions that accelerate outcomes, turning selective capital partners into tangible opportunity.
              </p>
            </div>

            {/* Card 2 */}
            <div className="card">
              <div className="card-icon" aria-hidden>
                <span className="text-[22px]">🔍</span>
              </div>
              <div className="card-title">Pitch Material Evaluation</div>
              <p className="card-body">
                Every detail matters. We dissect your pitch materials with an investor's eye, identifying gaps and strengths, and outlining the changes needed to make your story investor-ready.
              </p>
            </div>

            {/* Card 3 */}
            <div className="card">
              <div className="card-icon" aria-hidden>
                <span className="text-[22px]">🧭</span>
              </div>
              <div className="card-title">Venture Capital Consultation</div>
              <p className="card-body">
                Raising capital begins with strategy. We provide tailored reports and guidance on next steps if you are considering or growing venture capital, helping you navigate decisions with clarity and precision.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
