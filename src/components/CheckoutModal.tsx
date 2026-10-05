import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Truck, CreditCard, Sparkles, Printer, ArrowLeft } from 'lucide-react';
import { CartItem } from '../types/toy';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderCompleted: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderCompleted
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<'details' | 'confirmation'>('details');
  const [formData, setFormData] = useState({
    firstName: 'Eleanor',
    lastName: 'Pemberton',
    email: 'eleanor.pemberton@example.com',
    phone: '+1 (555) 349-2810',
    address: '428 Elmwood Lane',
    city: 'Portland',
    state: 'OR',
    zip: '97201',
    paymentMethod: 'card',
    cardNumber: '•••• •••• •••• 4242',
    deliveryMethod: 'standard'
  });

  const [orderNumber, setOrderNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotal = items.reduce((acc, item) => {
    const itemTotal = item.product.price * item.quantity;
    const giftTotal = item.giftWrap ? 5 * item.quantity : 0;
    return acc + itemTotal + giftTotal;
  }, 0);

  const shippingCost = subtotal >= 75 ? 0 : 9;
  const orderTotal = subtotal + shippingCost;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const generatedOrder = `LT-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderNumber(generatedOrder);
      setIsSubmitting(false);
      setStep('confirmation');
      onOrderCompleted();
    }, 1200);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative bg-[#FAF7F2] rounded-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto border border-[#E0D7CA] shadow-2xl p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#6B6158] hover:text-[#2D2723] rounded-full transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'details' ? (
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#9B3D0B]">
              <ShieldCheck className="w-4 h-4" />
              <span>Secure Workshop Checkout</span>
            </div>
            <h2 className="text-2xl font-serif font-bold text-[#2D2723] mt-1">
              Complete Your Heirloom Order
            </h2>
            <p className="text-xs text-[#6B6158] mt-1">
              Your pieces are gently packed in unbleached tissue and FSC-certified cedar boxes.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              
              {/* Recipient Details */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#2D2723]">
                  1. Shipping & Contact Information
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-[#5C534D] mb-1">First Name</label>
                    <input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full text-xs p-2.5 rounded-lg border border-[#DDD3C4] bg-white focus:outline-none focus:ring-1 focus:ring-[#9B3D0B]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-[#5C534D] mb-1">Last Name</label>
                    <input
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full text-xs p-2.5 rounded-lg border border-[#DDD3C4] bg-white focus:outline-none focus:ring-1 focus:ring-[#9B3D0B]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-[#5C534D] mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full text-xs p-2.5 rounded-lg border border-[#DDD3C4] bg-white focus:outline-none focus:ring-1 focus:ring-[#9B3D0B]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-[#5C534D] mb-1">Phone (for dispatch alerts)</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full text-xs p-2.5 rounded-lg border border-[#DDD3C4] bg-white focus:outline-none focus:ring-1 focus:ring-[#9B3D0B]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-[#5C534D] mb-1">Street Address</label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-lg border border-[#DDD3C4] bg-white focus:outline-none focus:ring-1 focus:ring-[#9B3D0B]"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-[#5C534D] mb-1">City</label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full text-xs p-2.5 rounded-lg border border-[#DDD3C4] bg-white focus:outline-none focus:ring-1 focus:ring-[#9B3D0B]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-[#5C534D] mb-1">State / Province</label>
                    <input
                      type="text"
                      required
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full text-xs p-2.5 rounded-lg border border-[#DDD3C4] bg-white focus:outline-none focus:ring-1 focus:ring-[#9B3D0B]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-[#5C534D] mb-1">Postal Code</label>
                    <input
                      type="text"
                      required
                      value={formData.zip}
                      onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                      className="w-full text-xs p-2.5 rounded-lg border border-[#DDD3C4] bg-white focus:outline-none focus:ring-1 focus:ring-[#9B3D0B]"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Choice */}
              <div className="space-y-2 pt-2 border-t border-[#E8DFC0]">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#2D2723]">
                  2. Sustainable Packing & Delivery
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <label
                    className={`flex items-start gap-2.5 p-3 rounded-lg border cursor-pointer ${
                      formData.deliveryMethod === 'standard'
                        ? 'border-[#9B3D0B] bg-[#F7ECE4]'
                        : 'border-[#DDD3C4] bg-white'
                    }`}
                  >
                    <input
                      type="radio"
                      name="delivery"
                      checked={formData.deliveryMethod === 'standard'}
                      onChange={() => setFormData({ ...formData, deliveryMethod: 'standard' })}
                      className="mt-0.5 accent-[#9B3D0B]"
                    />
                    <div>
                      <div className="font-semibold text-[#2D2723]">
                        {shippingCost === 0 ? 'Complimentary Eco Crate (3–5 Days)' : 'Standard Eco Crate ($9.00)'}
                      </div>
                      <div className="text-[11px] text-[#7A6F66]">Zero plastic, 100% recyclable pulp cushioning</div>
                    </div>
                  </label>

                  <label
                    className={`flex items-start gap-2.5 p-3 rounded-lg border cursor-pointer ${
                      formData.deliveryMethod === 'express'
                        ? 'border-[#9B3D0B] bg-[#F7ECE4]'
                        : 'border-[#DDD3C4] bg-white'
                    }`}
                  >
                    <input
                      type="radio"
                      name="delivery"
                      checked={formData.deliveryMethod === 'express'}
                      onChange={() => setFormData({ ...formData, deliveryMethod: 'express' })}
                      className="mt-0.5 accent-[#9B3D0B]"
                    />
                    <div>
                      <div className="font-semibold text-[#2D2723]">Expedited Workshop Dispatch ($16.00)</div>
                      <div className="text-[11px] text-[#7A6F66]">Guaranteed 1–2 business day delivery</div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Payment Method */}
              <div className="space-y-2 pt-2 border-t border-[#E8DFC0]">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#2D2723]">
                  3. Payment Method
                </h3>
                <div className="bg-[#FAF5EC] border border-[#E7DECD] p-3.5 rounded-xl space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-[#2D2723] font-medium">
                    <CreditCard className="w-4 h-4 text-[#9B3D0B]" />
                    <span>Card on File (Simulation Mode)</span>
                  </div>
                  <input
                    type="text"
                    disabled
                    value={formData.cardNumber}
                    className="w-full text-xs font-mono p-2 rounded border border-[#DACFBF] bg-white text-[#5C534D]"
                  />
                  <span className="text-[10px] text-[#8C8075]">
                    Simulated transaction. No real credit card charge occurs.
                  </span>
                </div>
              </div>

              {/* Summary and Submit */}
              <div className="pt-4 border-t border-[#E8DFC0] flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#7A6F66]">Total Due:</span>
                  <div className="text-xl font-mono font-bold text-[#2D2723] tabular-nums">
                    ${(orderTotal + (formData.deliveryMethod === 'express' ? 16 : 0)).toFixed(2)}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-[#9B3D0B] hover:bg-[#803107] text-[#FAF7F2] rounded-xl text-xs sm:text-sm font-semibold tracking-wide flex items-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Carving Your Order Receipt...</span>
                  ) : (
                    <>
                      <span>Place Heirloom Order</span>
                      <Sparkles className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>
        ) : (
          /* Step 2: Clear Post-Order State with Receipt Summary */
          <div className="text-center py-6 space-y-5 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-[#EBF5EE] text-[#3A6B4F] mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#3A6B4F] font-bold">
                Order #{orderNumber} Confirmed
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#2D2723] mt-1">
                Thank you for nurturing timeless play!
              </h2>
              <p className="text-xs sm:text-sm text-[#6B6158] mt-2 max-w-md mx-auto">
                We’ve received your order. A dispatch confirmation and tracking number will be sent to{' '}
                <strong className="text-[#2D2723]">{formData.email}</strong>.
              </p>
            </div>

            {/* Receipt Summary Box */}
            <div className="bg-white rounded-xl border border-[#E3D9CC] p-5 text-left max-w-md mx-auto space-y-3 text-xs shadow-xs">
              <div className="flex justify-between border-b border-[#F0E8DC] pb-2">
                <span className="text-[#7A6F66]">Delivery Address:</span>
                <span className="font-medium text-[#2D2723] text-right">
                  {formData.firstName} {formData.lastName}<br />
                  {formData.address}, {formData.city}, {formData.state} {formData.zip}
                </span>
              </div>
              <div className="flex justify-between border-b border-[#F0E8DC] pb-2">
                <span className="text-[#7A6F66]">Items Count:</span>
                <span className="font-mono font-medium text-[#2D2723]">
                  {items.reduce((s, i) => s + i.quantity, 0)} handcrafted pieces
                </span>
              </div>
              <div className="flex justify-between font-bold text-sm text-[#2D2723]">
                <span>Total Paid:</span>
                <span className="font-mono tabular-nums text-[#9B3D0B]">
                  ${(orderTotal + (formData.deliveryMethod === 'express' ? 16 : 0)).toFixed(2)}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 border border-[#DDD3C4] rounded-lg text-xs font-medium text-[#5C534D] hover:bg-[#F2ECE1] transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Receipt</span>
              </button>
              <button
                onClick={onClose}
                className="px-5 py-2 bg-[#2D2723] text-[#FAF7F2] rounded-lg text-xs font-semibold hover:bg-[#433B36] transition-colors cursor-pointer"
              >
                Return to Shop
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
