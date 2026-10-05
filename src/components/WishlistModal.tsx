import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { ToyProduct } from '../types/toy';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: ToyProduct[];
  onRemoveFromWishlist: (product: ToyProduct) => void;
  onAddToCart: (product: ToyProduct) => void;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({
  isOpen,
  onClose,
  wishlist,
  onRemoveFromWishlist,
  onAddToCart
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative bg-[#FAF7F2] rounded-2xl max-w-xl w-full max-h-[85vh] overflow-y-auto border border-[#E0D7CA] shadow-2xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E8DFC0]">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#9B3D0B] fill-current" />
            <h2 className="font-serif text-xl font-bold text-[#2D2723]">
              Your Saved Keepsakes ({wishlist.length})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#6B6158] hover:text-[#2D2723] rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="py-4 space-y-3">
          {wishlist.length === 0 ? (
            <div className="text-center py-10 space-y-2">
              <p className="text-sm text-[#6B6158]">
                You haven't saved any toys yet.
              </p>
              <p className="text-xs text-[#8C8075]">
                Tap the heart on any toy card to save your favorites for birthdays and holidays.
              </p>
            </div>
          ) : (
            wishlist.map((toy) => (
              <div
                key={toy.id}
                className="flex items-center justify-between gap-3 p-3 bg-white rounded-xl border border-[#EBE3D7]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-lg bg-[#EFE9DF] overflow-hidden shrink-0">
                    <img
                      src={toy.image}
                      alt={toy.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-serif text-xs font-semibold text-[#2D2723] line-clamp-1">
                      {toy.name}
                    </h4>
                    <span className="text-[11px] text-[#7A6F66]">{toy.ageRange}</span>
                    <div className="font-mono text-xs font-bold text-[#2D2723]">
                      ${toy.price}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      onAddToCart(toy);
                      onRemoveFromWishlist(toy);
                    }}
                    className="px-3 py-1.5 bg-[#9B3D0B] hover:bg-[#803107] text-[#FAF7F2] rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Move to Bag</span>
                  </button>
                  <button
                    onClick={() => onRemoveFromWishlist(toy)}
                    className="p-1.5 text-[#968A7E] hover:text-[#9B3D0B] cursor-pointer"
                    aria-label="Remove"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="pt-3 border-t border-[#E8DFC0] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#2D2723] text-white text-xs font-semibold rounded-lg cursor-pointer hover:bg-[#433B36]"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
