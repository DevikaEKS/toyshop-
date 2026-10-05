import React from 'react';
import { ArrowRight, Compass, Sparkles, ShieldCheck, HeartHandshake } from 'lucide-react';
import { HERO_IMAGE } from '../data/toys';

interface HeroProps {
  onShopClick: () => void;
  onGiftFinderClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onShopClick, onGiftFinderClick }) => {
  return (
    <section className="relative overflow-hidden pt-6 pb-14 lg:py-16 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid: Split Content & Visual Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Editorial Copy & CTAs */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Quiet Unboxed Kicker */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#9B3D0B]">
              <span>Handcrafted Heirloom Playthings</span>
              <span aria-hidden="true">·</span>
              <span>Generations of Wonder</span>
            </div>

            {/* Display Headline with balanced wrap */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] leading-[1.12] font-serif font-bold text-[#2D2723] tracking-tight text-balance">
              Toys crafted to spark lifetimes of imagination, not battery waste.
            </h1>

            {/* Body Prose */}
            <p className="text-base sm:text-lg text-[#615750] leading-relaxed max-w-xl font-normal">
              Turned from sustainably harvested European hardwoods, hand-sewn with organic flax linen, and finished with non-toxic botanical oils. Natural toys designed to be passed from child to child.
            </p>

            {/* Actions */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onShopClick}
                className="inline-flex items-center gap-2.5 bg-[#9B3D0B] hover:bg-[#803107] text-[#FAF7F2] px-6 py-3.5 rounded-full text-sm font-semibold tracking-wide transition-all shadow-sm hover:shadow-md cursor-pointer"
              >
                <span>Explore the Collection</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onGiftFinderClick}
                className="inline-flex items-center gap-2 bg-[#F0E8DC] hover:bg-[#E7DCCE] text-[#2D2723] px-6 py-3.5 rounded-full text-sm font-semibold transition-all border border-[#DDD3C4] cursor-pointer"
              >
                <Compass className="w-4 h-4 text-[#9B3D0B]" />
                <span>Gift Finder by Age</span>
              </button>
            </div>

            {/* Unboxed Editorial Proof Markers */}
            <div className="pt-6 border-t border-[#E8DFC0]/70 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-[#6F645C]">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#9B3D0B]" />
                <span>EN-71 & ASTM F963 Certified</span>
              </div>
              <span aria-hidden="true" className="text-[#CFC2B4]">·</span>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#9B3D0B]" />
                <span>Zero Plastic Packaging</span>
              </div>
              <span aria-hidden="true" className="text-[#CFC2B4]">·</span>
              <div className="flex items-center gap-1.5">
                <HeartHandshake className="w-4 h-4 text-[#9B3D0B]" />
                <span>Lifetime Mending Warranty</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Asset */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-[#E8DFD3] bg-[#EFE9DF] aspect-[16/10] sm:aspect-[16/10]">
              <img
                src={HERO_IMAGE}
                alt="Artisanal handcrafted wooden toys in a sunlit Scandinavian playroom"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transform hover:scale-[1.01] transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              
              {/* Quiet Inset Label */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs">
                <span className="font-serif italic drop-shadow-sm">The Heritage Playroom Studio</span>
                <span className="bg-black/30 backdrop-blur-sm px-2.5 py-1 rounded text-[11px] font-mono tracking-wider drop-shadow-sm">
                  PORTLAND & BLACK FOREST
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
