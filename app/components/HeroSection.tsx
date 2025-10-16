import Image from "next/image";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { BlurTextWrapper } from "./ClientAnimations";
import HeroEmailInput from "./HeroEmailInput";
import ShinyText from "./ShinyText";

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
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer group">
        <ShinyText 
          text="Discover More" 
          speed={3}
          className="text-sm font-medium"
        />
        <ChevronDownIcon className="w-5 h-5 text-muted group-hover:text-white group-hover:translate-y-1 transition-all duration-300" />
      </div>
    </section>
  );
}

