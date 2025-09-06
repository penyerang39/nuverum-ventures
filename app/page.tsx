import Image from "next/image";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="hero" aria-labelledby="hero-heading">
        <div aria-hidden style={{position:'absolute',inset:0, zIndex:-1}}>
          <Image 
            src={"/heroBackground.jpg"}
            alt="Mountain background"
            fill
            priority
            sizes="100vw"
            style={{objectFit:'cover'}}
          />
          <div style={{position:'absolute',inset:0,background:"linear-gradient(180deg, rgba(5,7,10,.55), rgba(5,7,10,.7))"}} />
        </div>
        <div className="hero-inner container">
          <h1 id="hero-heading" className="heading-xl mb-4" style={{marginBottom:16}}>
            Bridging vision with opportunity.
          </h1>
          <form className="container" style={{display:"flex",gap:12,justifyContent:"center",maxWidth:520}} action="#contact" aria-label="Contact form">
            <label htmlFor="email" className="visually-hidden">Email</label>
            <input className="input" id="email" type="email" placeholder="Enter your email" required aria-required="true" style={{flex:1}} />
            <button className="btn" type="submit">Contact</button>
          </form>
        </div>
      </section>

      {/* Mission */}
      <section id="approach" className="section" aria-labelledby="mission-eyebrow">
        <div className="container" style={{display:"grid",gap:28,gridTemplateColumns:"1fr",alignItems:"start"}}>
          <div>
            <p id="mission-eyebrow" className="eyebrow" style={{marginBottom:12}}>Our Mission</p>
            <h2 className="heading-lg" style={{margin:0}}>Bridging vision to capital with selectivity and discretion</h2>
          </div>
          <div style={{display:"grid",gap:16}}>
            <p className="text-muted">
              The landscape of venture is changing. How opportunities are found and connected must evolve too.
            </p>
            <p className="text-muted">
              Startups and investors move faster than ever. To keep pace, Nuverum Ventures puts curated introductions ahead of noise and builds bridges that bring founders and investors closer to the connections that truly matter.
            </p>
            <a className="btn btn-ghost" href="#about" style={{alignSelf:"start"}}>
              Learn more about our mission
            </a>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="section" aria-labelledby="services-heading" style={{background:"linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0))"}}>
        <div className="container">
          <h2 id="services-heading" className="heading-lg" style={{marginBottom:24}}>Services</h2>
          <div style={{display:"grid",gap:20,gridTemplateColumns:"1fr"}}>
            {/* Card 1 */}
            <div className="card">
              <div className="card-icon" aria-hidden>
                <span style={{fontSize:22}}>🔗</span>
              </div>
              <div className="card-title">Investor Introduction</div>
              <p className="card-body">
                Access defines advantage. Through our established investor network, we deliver curated introductions that accelerate outcomes, turning selective capital partners into tangible opportunity.
              </p>
            </div>

            {/* Card 2 */}
            <div className="card">
              <div className="card-icon" aria-hidden>
                <span style={{fontSize:22}}>🔍</span>
              </div>
              <div className="card-title">Pitch Material Evaluation</div>
              <p className="card-body">
                Every detail matters. We dissect your pitch materials with an investor’s eye, identifying gaps and strengths, and outlining the changes needed to make your story investor-ready.
              </p>
            </div>

            {/* Card 3 */}
            <div className="card">
              <div className="card-icon" aria-hidden>
                <span style={{fontSize:22}}>🧭</span>
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
