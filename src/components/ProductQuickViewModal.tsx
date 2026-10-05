import React, { useState } from 'react';
import { X, Check, ShoppingBag, ShieldCheck, Sparkles, Heart, Package, Ruler, Globe, Gift } from 'lucide-react';
import { ToyProduct } from '../types/toy';

interface ProductQuickViewModalProps {
  product: ToyProduct | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: ToyProduct, quantity: number, giftWrap: boolean, giftNote?: string) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: ToyProduct) => void;
}

export const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  isWishlisted,
  onToggleWishlist
}) => {
  if (!isOpen || !product) return null;

  const [quantity, setQuantity] = useState(1);
  const [giftWrap, setGiftWrap] = useState(false);
  const [giftNote, setGiftNote] = useState('');
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    onAddToCart(product, quantity, giftWrap, giftNote);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative bg-[#FAF7F2] rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-[#E0D7CA] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/80 hover:bg-white text-[#5C534D] hover:text-[#2D2723] rounded-full transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 sm:p-8">
          
          {/* Left Column: Visual Showcase */}
          <div className="space-y-4">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#EFE9DF] border border-[#E4DBD0]">
              <img
                src={product.image}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded text-xs font-semibold text-[#9B3D0B]">
                {product.ageRange}
              </div>
            </div>

            {/* Quick Spec Highlights */}
            <div className="bg-[#F2ECE1] rounded-xl p-4 space-y-2.5 text-xs text-[#5C534D]">
              <div className="flex items-start gap-2">
                <Globe className="w-4 h-4 text-[#9B3D0B] shrink-0 mt-0.5" />
                <span><strong className="text-[#2D2723]">Crafted:</strong> {product.origin}</span>
              </div>
              <div className="flex items-start gap-2">
                <Ruler className="w-4 h-4 text-[#9B3D0B] shrink-0 mt-0.5" />
                <span><strong className="text-[#2D2723]">Dimensions:</strong> {product.dimensions}</span>
              </div>
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-[#9B3D0B] shrink-0 mt-0.5" />
                <span><strong className="text-[#2D2723]">Safety:</strong> {product.safetyCert}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Module */}
          <div className="flex flex-col justify-between space-y-5">
            <div>
              {/* Category & Status */}
              <div className="flex items-center justify-between text-xs text-[#7A6F66]">
                <span className="uppercase tracking-wider font-medium text-[#9B3D0B]">
                  {product.categoryLabel}
                </span>
                <span className="text-[#3A6B4F] font-semibold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#3A6B4F] inline-block" />
                  In Stock & Ready to Ship
                </span>
              </div>

              {/* Title */}
              <h2 className="text-2xl font-serif font-bold text-[#2D2723] mt-1 leading-snug">
                {product.name}
              </h2>

              {/* Price */}
              <div className="flex items-baseline gap-3 mt-2">
                <span className="text-2xl font-bold font-mono tabular-nums text-[#2D2723]">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-sm font-mono tabular-nums text-[#8F8377] line-through">
                    ${product.originalPrice}
                  </span>
                )}
                <span className="text-xs text-[#7A6F66]">
                  (Taxes calculated at checkout)
                </span>
              </div>

              {/* Story & Description */}
              <p className="text-xs sm:text-sm text-[#5C534D] leading-relaxed mt-3">
                {product.story}
              </p>

              {/* Materials callout */}
              <div className="mt-3 text-xs bg-[#FAF5EC] border border-[#E7DECD] p-3 rounded-lg">
                <span className="font-semibold text-[#2D2723]">Materials: </span>
                <span className="text-[#6B6158]">{product.material}</span>
              </div>

              {/* Features List */}
              <div className="mt-3 space-y-1.5">
                <h4 className="text-xs font-semibold text-[#2D2723] uppercase tracking-wider">Play Details:</h4>
                <ul className="text-xs text-[#6B6158] space-y-1">
                  {product.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#9B3D0B]" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Gift Wrapping Option */}
              <div className="mt-4 pt-3 border-t border-[#E8DFD3]">
                <label className="flex items-center gap-2 text-xs font-medium text-[#2D2723] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={giftWrap}
                    onChange={(e) => setGiftWrap(e.target.checked)}
                    className="rounded text-[#9B3D0B] focus:ring-[#9B3D0B] accent-[#9B3D0B]"
                  />
                  <Gift className="w-4 h-4 text-[#9B3D0B]" />
                  <span>Add Artisanal Linen Gift Wrap & Wax Seal (+$5)</span>
                </label>

                {giftWrap && (
                  <div className="mt-2">
                    <input
                      type="text"
                      placeholder="Write a short gift note (e.g. For little Maya on your 4th birthday!)..."
                      value={giftNote}
                      onChange={(e) => setGiftNote(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-lg border border-[#DACFBF] bg-white focus:outline-none focus:ring-1 focus:ring-[#9B3D0B]"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Sticky/Stable Purchase Bar */}
            <div className="pt-4 border-t border-[#E8DFD3] space-y-3">
              <div className="flex items-center gap-3">
                {/* Quantity Stepper */}
                <div className="flex items-center border border-[#DDD3C4] rounded-lg bg-white overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-sm text-[#5C534D] hover:bg-[#F2ECE1] transition-colors cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-3 py-2 text-xs font-mono font-semibold tabular-nums text-[#2D2723]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-sm text-[#5C534D] hover:bg-[#F2ECE1] transition-colors cursor-pointer"
                  >
                    +
                  </button>
                </div>

                {/* Primary Buy CTA */}
                <button
                  onClick={handleAdd}
                  disabled={added}
                  className={`flex-1 py-3 px-4 rounded-lg text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer whitespace-nowrap shadow-sm ${
                    added
                      ? 'bg-[#3A6B4F] text-white'
                      : 'bg-[#9B3D0B] hover:bg-[#803107] text-[#FAF7F2]'
                  }`}
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Bag!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>
                        Add to Bag · ${(product.price * quantity + (giftWrap ? 5 : 0))}
                      </span>
                    </>
                  )}
                </button>

                {/* Wishlist toggle */}
                <button
                  onClick={() => onToggleWishlist(product)}
                  className={`p-3 rounded-lg border transition-colors cursor-pointer ${
                    isWishlisted
                      ? 'border-[#9B3D0B] bg-[#F7ECE4] text-[#9B3D0B]'
                      : 'border-[#DDD3C4] bg-white text-[#5C534D] hover:text-[#9B3D0B]'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>

              <div className="flex items-center justify-between text-[11px] text-[#7A6F66]">
                <span>Ships in 24–48 hours</span>
                <span>30-Day Happiness Guarantee</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
