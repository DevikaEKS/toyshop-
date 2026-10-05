import React from 'react';
import { TreePine, Sparkles, Shield, Wrench } from 'lucide-react';

export const WorkshopStorySection: React.FC = () => {
  const pillars = [
    {
      num: '01',
      title: 'FSC®-Certified Hardwoods',
      desc: 'We strictly turn fallen beech, white oak, and sugar maple from sustainably managed European and New England forests.',
      icon: TreePine
    },
    {
      num: '02',
      title: 'Botanical & Mineral Stains',
      desc: 'Our pigments are derived from madder root, walnut husks, and indigo. 100% free from heavy metals, formaldehyde, and phthalates.',
      icon: Sparkles
    },
    {
      num: '03',
      title: 'Zero Plastic Packaging',
      desc: 'Each plaything arrives packaged in custom recycled paperboard boxes lined with unbleached organic cotton bags and paper tape.',
      icon: Shield
    },
    {
      num: '04',
      title: 'The Lifetime Mending Promise',
      desc: 'If a wooden train axle loosens or a linen seam parts over years of tumbling, ship it to our atelier for free hand repairs.',
      icon: Wrench
    }
  ];

  return (
    <section id="workshop" className="py-16 sm:py-20 bg-[#F4EFEA] border-y border-[#E8DFD3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#9B3D0B]">
            Our Craft Philosophy
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#2D2723] mt-1.5 tracking-tight text-balance">
            Quiet playthings designed to last longer than childhood itself.
          </h2>
          <p className="text-sm sm:text-base text-[#665B54] mt-3 leading-relaxed">
            In an era overwhelmed by flashing screens and brittle plastic junk, we return to the quiet sensory intelligence of natural wood, honest weight, and open-ended imagination.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.num}
                className="bg-[#FAF7F2] p-6 rounded-xl border border-[#E3DACD] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-bold text-[#9B3D0B] bg-[#F2ECE1] px-2.5 py-1 rounded">
                      {pillar.num}
                    </span>
                    <Icon className="w-5 h-5 text-[#9B3D0B]" />
                  </div>
                  <h3 className="font-serif text-base font-semibold text-[#2D2723]">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-[#6B6158] mt-2 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-[#EFE8DD] text-[11px] font-medium text-[#7A6F66]">
                  Inspected in Portland, OR
                </div>
              </div>
            );
          })}
        </div>

        {/* Studio Quote Banner */}
        <div className="mt-12 bg-[#FAF7F2] rounded-2xl p-6 sm:p-10 border border-[#E3DACD] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-1 max-w-2xl">
            <span className="font-serif italic text-lg sm:text-xl text-[#2D2723]">
              "A child does not need toys that do all the thinking for them. They need simple, beautiful instruments that invite them to invent the world."
            </span>
            <div className="text-xs text-[#7A6F66] pt-1">
              — Julian Lark, Master Toymaker & Co-Founder
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <div className="font-mono text-xs font-bold text-[#2D2723]">EN-71 / ASTM F963</div>
              <div className="text-[10px] text-[#7A6F66]">Third-Party Laboratory Verified</div>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#EAE2D5] flex items-center justify-center font-serif font-bold text-[#9B3D0B]">
              L&T
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
