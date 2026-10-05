import React, { useState } from 'react';
import { Mail, Check, ArrowRight, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail('');
      }, 3500);
    }
  };

  return (
    <footer className="bg-[#2D2723] text-[#FAF7F2] pt-16 pb-12 border-t border-[#433B36]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Newsletter & Atelier Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-12 border-b border-[#433B36]/80">
          
          {/* Brand & Manifesto */}
          <div className="lg:col-span-5 space-y-4">
            <span className="font-serif text-2xl font-bold tracking-tight text-[#FAF7F2]">
              Lark & Timber Toys
            </span>
            <p className="text-xs sm:text-sm text-[#BFB3A6] leading-relaxed max-w-sm">
              Artisanal heirloom playthings carved from sustainably harvested hardwoods, natural mineral dyes, and open-ended wonder. Built to inspire whole generations of playful discovery.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#9B3D0B] font-medium pt-1">
              <span className="w-2 h-2 rounded-full bg-[#9B3D0B]" />
              <span className="text-[#D9CFC4]">Portland Workshop & Black Forest Atelier</span>
            </div>
          </div>

          {/* Links Grid */}
          <div className="lg:col-span-3 grid grid-cols-2 gap-6 text-xs">
            <div className="space-y-3">
              <span className="font-serif font-semibold text-sm text-[#FAF7F2]">Collections</span>
              <ul className="space-y-2 text-[#B5A899]">
                <li><a href="#catalog" className="hover:text-white transition-colors">Wooden Trains</a></li>
                <li><a href="#catalog" className="hover:text-white transition-colors">Nordic Dolls & Manors</a></li>
                <li><a href="#catalog" className="hover:text-white transition-colors">Balancing Stones</a></li>
                <li><a href="#catalog" className="hover:text-white transition-colors">Organic Linen Bears</a></li>
                <li><a href="#catalog" className="hover:text-white transition-colors">Wildflower Herbariums</a></li>
              </ul>
            </div>

            <div className="space-y-3">
              <span className="font-serif font-semibold text-sm text-[#FAF7F2]">Philosophy</span>
              <ul className="space-y-2 text-[#B5A899]">
                <li><a href="#workshop" className="hover:text-white transition-colors">FSC® Forestry</a></li>
                <li><a href="#workshop" className="hover:text-white transition-colors">Botanical Dyes</a></li>
                <li><a href="#workshop" className="hover:text-white transition-colors">Safety Standards</a></li>
                <li><a href="#workshop" className="hover:text-white transition-colors">Lifetime Mending</a></li>
                <li><a href="#reviews" className="hover:text-white transition-colors">Customer Stories</a></li>
              </ul>
            </div>
          </div>

          {/* Workshop Journal Newsletter */}
          <div className="lg:col-span-4 space-y-3">
            <span className="font-serif font-semibold text-sm text-[#FAF7F2]">
              The Workshop Dispatch
            </span>
            <p className="text-xs text-[#B5A899] leading-relaxed">
              Stories from our woodturning benches, child-led play philosophy, and seasonal limited carvings. No spam, ever.
            </p>

            <form onSubmit={handleSubscribe} className="pt-1">
              <div className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter parent or educator email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-[#3A332E] border border-[#524840] rounded-xl px-3.5 py-2.5 text-xs text-[#FAF7F2] placeholder:text-[#8C8075] focus:outline-none focus:border-[#9B3D0B]"
                />
                <button
                  type="submit"
                  className="bg-[#9B3D0B] hover:bg-[#803107] text-[#FAF7F2] px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer shrink-0"
                >
                  <span>Join</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
            {subscribed && (
              <p className="text-[11px] text-[#86EFAC] flex items-center gap-1.5 font-medium">
                <Check className="w-3.5 h-3.5" />
                <span>Welcome to our family table. Check your inbox for your 10% welcome token.</span>
              </p>
            )}
          </div>

        </div>

        {/* Bottom Bar: Quiet Copyright and Standards */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#9E9082]">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Lark & Timber Toy Co. All rights reserved.</span>
            <span aria-hidden="true">·</span>
            <span>Handmade with care</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="hover:text-white transition-colors cursor-pointer">Safety & Testing</span>
            <span>·</span>
            <span className="hover:text-white transition-colors cursor-pointer">Shipping & Returns</span>
            <span>·</span>
            <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
