import React, { useState } from 'react';
import { ShoppingBag, Eye, Heart, Check, Star } from 'lucide-react';
import { ToyProduct } from '../types/toy';

interface ProductCardProps {
  product: ToyProduct;
  onQuickView: (product: ToyProduct) => void;
  onAddToCart: (product: ToyProduct) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: ToyProduct) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickView,
  onAddToCart,
  isWishlisted,
  onToggleWishlist
}) => {
  const [justAdded, setJustAdded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  };

  const handleHeartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleWishlist(product);
  };

  return (
    <article
      onClick={() => onQuickView(product)}
      className="group relative bg-[#F7F3EC] rounded-xl overflow-hidden border border-[#EBE3D7] hover:border-[#DACFBF] transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer flex flex-col justify-between"
    >
      {/* Visual Slot - 65-75% visual weight */}
      <div className="relative aspect-[4/3] w-full bg-[#EFE9E0] overflow-hidden">
        {!imageError ? (
          <img
            src={product.image}
            alt={product.name}
            onError={() => setImageError(true)}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          /* Styled CSS Fallback Container - Zero Broken Image Policy */
          <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#EFEAE2] to-[#E3DACD] text-[#786D65] text-center">
            <span className="font-serif text-lg font-medium text-[#2D2723] mb-1">{product.name}</span>
            <span className="text-xs uppercase tracking-wider text-[#9B3D0B]">{product.categoryLabel}</span>
          </div>
        )}

        {/* Subtle Single Text Tag (No pill clusters) */}
        {product.isBestseller && (
          <div className="absolute top-3 left-3 bg-[#FAF7F2]/90 backdrop-blur-sm px-2.5 py-1 rounded text-[11px] font-medium tracking-wide uppercase text-[#9B3D0B] border border-[#E5DACB]">
            Bestseller
          </div>
        )}
        {product.isNewArrival && !product.isBestseller && (
          <div className="absolute top-3 left-3 bg-[#FAF7F2]/90 backdrop-blur-sm px-2.5 py-1 rounded text-[11px] font-medium tracking-wide uppercase text-[#3A6B4F] border border-[#E5DACB]">
            New Release
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleHeartClick}
          aria-label={isWishlisted ? "Remove from wishlist" : "Save to wishlist"}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all cursor-pointer ${
            isWishlisted
              ? 'bg-[#9B3D0B] text-white'
              : 'bg-white/80 text-[#5C534D] hover:bg-white hover:text-[#9B3D0B]'
          }`}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Quick View Floating Affordance on Hover */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden sm:flex items-center justify-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="w-full py-2 bg-white/95 hover:bg-white text-[#2D2723] text-xs font-semibold rounded-lg shadow-sm backdrop-blur-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View & Specs</span>
          </button>
        </div>
      </div>

      {/* Content & Purchase Module */}
      <div className="p-4 sm:p-5 flex flex-col justify-between flex-grow">
        
        <div>
          {/* Clean Unboxed Metadata with Typographic Separator */}
          <div className="flex items-center gap-1.5 text-xs text-[#7A6F66] mb-1.5">
            <span>{product.ageRange}</span>
            <span aria-hidden="true">·</span>
            <span>{product.categoryLabel}</span>
          </div>

          {/* Product Title */}
          <h3 className="font-serif text-base sm:text-lg font-semibold text-[#2D2723] leading-snug group-hover:text-[#9B3D0B] transition-colors line-clamp-1">
            {product.name}
          </h3>

          {/* Short description */}
          <p className="text-xs text-[#6B6158] mt-1 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Price & Add to Cart Zone */}
        <div className="mt-4 pt-3 border-t border-[#EAE1D3] flex items-center justify-between gap-3">
          {/* Price with Tabular Numerals */}
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold font-mono tabular-nums text-[#2D2723]">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-xs font-mono tabular-nums text-[#968A7E] line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCartClick}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
              justAdded
                ? 'bg-[#3A6B4F] text-white shadow-sm'
                : 'bg-[#2D2723] hover:bg-[#9B3D0B] text-[#FAF7F2]'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5 animate-bounce" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>

      </div>
    </article>
  );
};
