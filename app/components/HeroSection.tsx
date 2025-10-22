import Image from "next/image";
import HeroEmailInput from "./HeroEmailInput";
import HeroDiscoverMore from "./HeroDiscoverMore";

export default function HeroSection() {
  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="absolute min-h-[100vh] inset-0 -z-10">
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
        <div className="font-light heading-xl mb-10" data-animate="hero-text">
          <h1>Bridging vision with opportunity.</h1>
        </div>
        <HeroEmailInput />
        <div className="max-w-[800px] text-muted/90 absolute bottom-30">
          <p>Strategic venture capital introductory firm for innovative companies.  We invite forward-thinking entrepreneurs into our network of venture capitalists to fuel growth and innovation.</p>
      </div>
      </div>
      <HeroDiscoverMore />
    </section>
  );
}

