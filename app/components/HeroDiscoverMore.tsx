'use client'

import { ChevronDownIcon } from "@heroicons/react/24/outline";
import ShinyText from "./ShinyText";

export default function HeroDiscoverMore() {
  const scrollToNextSection = () => {
    const nextSection = document.getElementById('what-we-do');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer group" onClick={scrollToNextSection}>
      <ShinyText 
        text="Discover More" 
        speed={3}
        className="text-sm font-medium"
      />
      <ChevronDownIcon className="w-5 h-5 text-muted group-hover:text-white group-hover:translate-y-1 transition-all duration-300" />
    </div>
  );
}
