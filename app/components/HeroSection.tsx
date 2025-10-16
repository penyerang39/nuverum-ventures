import Image from "next/image";
import { BlurTextWrapper } from "./ClientAnimations";
import HeroEmailInput from "./HeroEmailInput";
import HeroDiscoverMore from "./HeroDiscoverMore";

export default function HeroSection() {
  return (
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
        <BlurTextWrapper 
          className="font-light heading-xl mb-10"
        >
          <p>Bridging vision with opportunity.</p>
        </BlurTextWrapper>
        <HeroEmailInput />
      </div>
      
      <HeroDiscoverMore />
    </section>
  );
}

