import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Gift, Tag, Check, Truck } from 'lucide-react';
import { CartItem } from '../types/toy';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout
}) => {
  if (!isOpen) return null;

  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  const FREE_SHIPPING_THRESHOLD = 75;

  const subtotal = items.reduce((acc, item) => {
    const itemTotal = item.product.price * item.quantity;
    const giftTotal = item.giftWrap ? 5 * item.quantity : 0;
    return acc + itemTotal + giftTotal;
  }, 0);

  const discountAmount = (subtotal * discountPercent) / 100;
  const finalTotal = Math.max(0, subtotal - discountAmount);
  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  const applyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    setPromoSuccess('');
    const code = promoCode.trim().toUpperCase();

    if (code === 'HEIRLOOM10' || code === 'WELCOME10') {
      setDiscountPercent(10);
      setPromoSuccess('10% Heirloom Welcome Discount Applied!');
    } else {
      setPromoError('Invalid coupon code. Try HEIRLOOM10');
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-[#FAF7F2] h-full shadow-2xl flex flex-col justify-between border-l border-[#E5DACB]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cart Header */}
        <div className="p-5 border-b border-[#E8DFC0] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#9B3D0B]" />
            <h2 className="font-serif text-lg font-bold text-[#2D2723]">
              Your Play Basket ({items.reduce((sum, i) => sum + i.quantity, 0)})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#6B6158] hover:text-[#2D2723] rounded-lg transition-colors cursor-pointer"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="px-5 py-3 bg-[#F2ECE1] border-b border-[#E8DFC0] text-xs">
          <div className="flex items-center justify-between font-medium text-[#2D2723] mb-1.5">
            <span className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-[#9B3D0B]" />
              {amountToFreeShipping > 0 ? (
                <span>
                  Add <strong className="font-mono text-[#9B3D0B]">${amountToFreeShipping}</strong> for Complimentary Wooden Box Shipping
                </span>
              ) : (
                <span className="text-[#3A6B4F] font-bold">
                  ✓ Unlocked! Free Compliment Wooden Crate Delivery
                </span>
              )}
            </span>
          </div>
          <div className="w-full bg-[#E0D7CA] rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-[#9B3D0B] h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Itemized List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
              <div className="w-16 h-16 rounded-full bg-[#EFE9DF] flex items-center justify-center text-[#9B3D0B]">
                <ShoppingBag className="w-8 h-8 opacity-60" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-[#2D2723]">
                Your basket is waiting to be filled
              </h3>
              <p className="text-xs text-[#7A6F66] max-w-xs">
                Explore our handcrafted trains, Waldorf stacking stones, and heirloom play pieces.
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-5 py-2.5 bg-[#9B3D0B] text-[#FAF7F2] rounded-full text-xs font-semibold cursor-pointer"
              >
                Browse Heirloom Toys
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.product.id}
                className="flex gap-3 bg-white p-3.5 rounded-xl border border-[#EBE3D7] shadow-xs"
              >
                {/* Product thumbnail */}
                <div className="w-20 h-20 rounded-lg overflow-hidden bg-[#EFE9DF] shrink-0">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="font-serif text-xs font-semibold text-[#2D2723] line-clamp-1">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="text-[#968A7E] hover:text-[#9B3D0B] p-0.5 cursor-pointer"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-[11px] text-[#7A6F66]">
                      {item.product.ageRange}
                    </div>

                    {item.giftWrap && (
                      <div className="flex items-center gap-1 text-[11px] text-[#9B3D0B] mt-0.5 font-medium">
                        <Gift className="w-3 h-3" />
                        <span>Artisan Gift Wrap (+$5)</span>
                      </div>
                    )}
                  </div>

                  {/* Quantity and Price */}
                  <div className="flex items-center justify-between mt-2 pt-1 border-t border-[#F2ECE1]">
                    <div className="flex items-center border border-[#DDD3C4] rounded bg-[#FAF7F2]">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                        className="px-2 py-0.5 text-xs text-[#5C534D] hover:bg-[#EBE3D7] cursor-pointer"
                      >
                        -
                      </button>
                      <span className="px-2 py-0.5 text-xs font-mono font-semibold tabular-nums text-[#2D2723]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                        className="px-2 py-0.5 text-xs text-[#5C534D] hover:bg-[#EBE3D7] cursor-pointer"
                      >
                        +
                      </button>
                    </div>

                    <span className="font-mono text-xs font-bold tabular-nums text-[#2D2723]">
                      ${(item.product.price + (item.giftWrap ? 5 : 0)) * item.quantity}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Checkout Summary */}
        {items.length > 0 && (
          <div className="p-5 border-t border-[#E8DFC0] bg-[#FAF7F2] space-y-4">
            
            {/* Promo Code Form */}
            <form onSubmit={applyPromo} className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-[#8C8075]" />
                <input
                  type="text"
                  placeholder="Promo Code (HEIRLOOM10)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="w-full text-xs pl-8 pr-2 py-2 rounded-lg border border-[#DDD3C4] bg-white uppercase font-mono placeholder:normal-case focus:outline-none focus:ring-1 focus:ring-[#9B3D0B]"
                />
              </div>
              <button
                type="submit"
                className="px-3 py-2 bg-[#2D2723] hover:bg-[#433B36] text-white text-xs font-medium rounded-lg cursor-pointer transition-colors"
              >
                Apply
              </button>
            </form>
            {promoSuccess && (
              <p className="text-[11px] text-[#3A6B4F] flex items-center gap-1 font-medium">
                <Check className="w-3.5 h-3.5" />
                {promoSuccess}
              </p>
            )}
            {promoError && (
              <p className="text-[11px] text-[#9B3D0B] font-medium">{promoError}</p>
            )}

            {/* Calculations */}
            <div className="space-y-1.5 text-xs text-[#5C534D]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono tabular-nums font-semibold text-[#2D2723]">${subtotal}</span>
              </div>
              {discountPercent > 0 && (
                <div className="flex justify-between text-[#3A6B4F]">
                  <span>Discount ({discountPercent}%)</span>
                  <span className="font-mono tabular-nums font-semibold">-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Eco Wood-Crate Shipping</span>
                <span className="font-mono tabular-nums">
                  {amountToFreeShipping === 0 ? (
                    <span className="text-[#3A6B4F] font-semibold">FREE</span>
                  ) : (
                    '$9.00'
                  )}
                </span>
              </div>
              <div className="pt-2 border-t border-[#E8DFC0] flex justify-between text-sm font-bold text-[#2D2723]">
                <span>Estimated Total</span>
                <span className="font-mono tabular-nums text-base text-[#9B3D0B]">
                  ${(finalTotal + (amountToFreeShipping === 0 ? 0 : 9)).toFixed(2)}
                </span>
              </div>
            </div>

            {/* Checkout Action Button */}
            <button
              onClick={() => {
                onProceedToCheckout();
              }}
              className="w-full py-3.5 bg-[#9B3D0B] hover:bg-[#803107] text-[#FAF7F2] rounded-xl text-xs sm:text-sm font-semibold tracking-wide flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
            >
              <span>Proceed to Heirloom Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-[10px] text-center text-[#8C8075]">
              Carbon-neutral delivery · Hand-inspected before leaving our workshop
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
