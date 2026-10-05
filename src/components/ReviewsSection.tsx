import React from 'react';
import { Star, CheckCircle } from 'lucide-react';
import { REVIEWS_DATA } from '../data/toys';

export const ReviewsSection: React.FC = () => {
  return (
    <section id="reviews" className="py-16 sm:py-20 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#9B3D0B]">
              Real Playroom Stories
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#2D2723] mt-1.5 tracking-tight">
              Cherished in over 14,000 family homes
            </h2>
          </div>

          <div className="flex items-center gap-3 bg-[#F2ECE1] px-4 py-2 rounded-xl border border-[#E3DACD]">
            <div className="flex text-[#D97706]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <div className="text-xs font-medium text-[#2D2723]">
              <span className="font-bold font-mono">4.96 / 5.0</span>
              <span className="text-[#6B6158] ml-1.5">from 1,840 verified family reviews</span>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS_DATA.map((review) => (
            <div
              key={review.id}
              className="bg-[#F7F3EC] p-6 rounded-2xl border border-[#EBE3D7] flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex text-[#D97706]">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-[11px] font-mono text-[#8C8075]">{review.date}</span>
                </div>

                <h3 className="font-serif text-base font-semibold text-[#2D2723] leading-snug">
                  "{review.headline}"
                </h3>

                <p className="text-xs text-[#5C534D] leading-relaxed">
                  {review.comment}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#EAE1D3] space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-serif font-semibold text-xs text-[#2D2723]">
                    {review.author}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] text-[#3A6B4F] font-medium">
                    <CheckCircle className="w-3 h-3" />
                    Verified Heirloom
                  </span>
                </div>
                <div className="text-[11px] text-[#7A6F66]">
                  {review.role} · {review.location}
                </div>
                <div className="text-[11px] text-[#9B3D0B] font-medium pt-0.5">
                  Piece: {review.productName} ({review.childAge})
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
