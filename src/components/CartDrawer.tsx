import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Trash2,
  ShoppingCart,
  Tag,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  MessageSquare,
  Sparkles,
  CreditCard
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    clearCart,
    formatPrice,
    currency,
    adminSettings,
    activeCoupon,
    applyCoupon,
    removeCoupon
  } = useApp();

  const [couponInput, setCouponInput] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{ success: boolean; message: string } | null>(null);
  const [orderComplete, setOrderComplete] = useState(false);

  if (!isCartOpen) return null;

  // Calculate raw subtotal
  const rawSubtotal = cart.reduce((acc, item) => acc + item.price, 0);
  
  // Calculate discount if coupon active
  const discountMultiplier = activeCoupon ? activeCoupon.discountPercentage / 100 : 0;
  const discountAmount = rawSubtotal * discountMultiplier;
  const finalTotal = Math.max(0, rawSubtotal - discountAmount);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    setCouponFeedback(res);
  };

  const handleCheckoutViaWhatsApp = () => {
    const itemList = cart
      .map((item, idx) => `${idx + 1}. ${item.title} (${item.subtitle || ''}) - ${currency === 'BDT' ? '৳' : '$'}${item.price}`)
      .join('%0A');

    const totalText = `${currency === 'BDT' ? '৳' : '$'}${Math.round(finalTotal)}`;
    const couponText = activeCoupon ? ` (Applied Coupon: ${activeCoupon.code})` : '';

    const text = `⚡ *NEW ORDER FROM TOOFANHOST WEBSITE* ⚡%0A%0A*Items:*%0A${itemList}%0A%0A*Total Amount:* ${totalText}${couponText}%0A%0APlease provide bKash/Nagad payment number and activate my service!`;

    window.open(`https://wa.me/${adminSettings.supportWhatsApp.replace(/[^0-9]/g, '')}?text=${text}`, '_blank');
  };

  const handleSimulateCheckout = () => {
    setOrderComplete(true);
    confetti({
      particleCount: 80,
      spread: 90,
      origin: { y: 0.5 },
    });
  };

  const handleClose = () => {
    setIsCartOpen(false);
    setOrderComplete(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-[#0a101d] border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col justify-between">
          
          {/* Cart Header */}
          <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
              <h3 className="font-heading text-lg font-bold text-slate-900 dark:text-white">Your Shopping Cart</h3>
              <span className="px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-cyan-100 dark:bg-cyan-500/20 text-cyan-800 dark:text-cyan-400">
                {cart.length}
              </span>
            </div>
            <button
              onClick={handleClose}
              className="p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {orderComplete ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="font-heading text-2xl font-bold text-white">Order Received! ⚡</h4>
                <p className="text-xs text-slate-300 max-w-xs mx-auto leading-relaxed">
                  Thank you for choosing ToofanHost. Our automated provisioning system has registered your ticket.
                </p>
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-left text-xs space-y-2">
                  <div className="flex justify-between text-slate-400">
                    <span>Order Reference:</span>
                    <span className="font-mono text-cyan-400 font-bold">TFH-#{Math.floor(100000 + Math.random() * 900000)}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Status:</span>
                    <span className="text-emerald-400 font-bold">Awaiting Payment Confirmation</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Support Hotline:</span>
                    <span className="text-white font-medium">{adminSettings.supportPhone}</span>
                  </div>
                </div>

                <div className="pt-2 flex flex-col gap-2">
                  <button
                    onClick={handleCheckoutViaWhatsApp}
                    className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Confirm & Pay via WhatsApp (bKash/Nagad)</span>
                  </button>
                  <button
                    onClick={() => {
                      clearCart();
                      handleClose();
                    }}
                    className="w-full py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700 transition-all"
                  >
                    Done & Close
                  </button>
                </div>
              </div>
            ) : cart.length === 0 ? (
              <div className="text-center py-16 text-slate-400">
                <ShoppingCart className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                <p className="text-sm font-medium">Your cart is empty.</p>
                <p className="text-xs text-slate-500 mt-1">Search for a domain or choose a high-speed hosting plan above.</p>
              </div>
            ) : (
              <>
                {/* List items */}
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-start justify-between gap-3"
                    >
                      <div>
                        <h4 className="font-bold text-white text-sm">{item.title}</h4>
                        <p className="text-xs text-slate-400 mt-0.5">{item.subtitle}</p>
                        {item.specsSummary && (
                          <div className="text-[11px] font-mono text-cyan-400 mt-1">
                            {item.specsSummary}
                          </div>
                        )}
                        <div className="text-sm font-extrabold text-cyan-300 mt-1 font-heading">
                          {currency === 'BDT' ? `৳${Math.round(item.price)}` : `$${item.price.toFixed(2)}`}
                        </div>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                        title="Remove from cart"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Coupon Code Section */}
                <div className="pt-2">
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                        placeholder="Promo code (e.g. TOOFAN30)"
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 uppercase font-mono focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-bold border border-slate-700 transition-all cursor-pointer"
                    >
                      Apply
                    </button>
                  </form>

                  {couponFeedback && (
                    <div className={`mt-2 text-xs ${couponFeedback.success ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {couponFeedback.message}
                    </div>
                  )}

                  {activeCoupon && (
                    <div className="mt-2 p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between text-xs">
                      <span className="text-emerald-400 font-bold flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        {activeCoupon.code} ({activeCoupon.discountPercentage}% OFF active)
                      </span>
                      <button
                        onClick={removeCoupon}
                        className="text-slate-400 hover:text-rose-400 text-[11px]"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Cart Footer / Checkout actions */}
          {!orderComplete && cart.length > 0 && (
            <div className="p-6 border-t border-slate-800 bg-[#090e1a] space-y-4">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal:</span>
                  <span className="text-white font-mono font-bold">
                    {currency === 'BDT' ? `৳${Math.round(rawSubtotal)}` : `$${rawSubtotal.toFixed(2)}`}
                  </span>
                </div>

                {activeCoupon && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Coupon Discount ({activeCoupon.discountPercentage}%):</span>
                    <span className="font-mono font-bold">
                      -{currency === 'BDT' ? `৳${Math.round(discountAmount)}` : `$${discountAmount.toFixed(2)}`}
                    </span>
                  </div>
                )}

                <div className="flex justify-between text-slate-400">
                  <span>Setup Fees & Migration:</span>
                  <span className="text-emerald-400 font-bold">FREE (৳0)</span>
                </div>

                <div className="pt-2 border-t border-slate-800 flex justify-between items-baseline">
                  <span className="text-sm font-bold text-white">Total Amount:</span>
                  <span className="font-heading text-2xl font-extrabold text-cyan-300">
                    {currency === 'BDT' ? `৳${Math.round(finalTotal)}` : `$${finalTotal.toFixed(2)}`}
                  </span>
                </div>
              </div>

              {/* Supported Payment methods */}
              <div className="pt-1">
                <div className="text-[11px] text-slate-400 mb-1.5">Instant Activation with:</div>
                <div className="flex items-center gap-2 text-[10px] text-slate-300 font-mono">
                  <span className="px-2 py-0.5 rounded bg-pink-950/80 text-pink-300 border border-pink-800 font-bold">
                    bKash
                  </span>
                  <span className="px-2 py-0.5 rounded bg-orange-950/80 text-orange-300 border border-orange-800 font-bold">
                    Nagad
                  </span>
                  <span className="px-2 py-0.5 rounded bg-purple-950/80 text-purple-300 border border-purple-800 font-bold">
                    Rocket
                  </span>
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    Cards/Bank
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={handleCheckoutViaWhatsApp}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 cursor-pointer active:scale-95 transition-all"
                >
                  <MessageSquare className="w-4 h-4 fill-slate-950" />
                  <span>Order via WhatsApp (Instant bKash/Nagad)</span>
                </button>

                <button
                  type="button"
                  onClick={handleSimulateCheckout}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-400 to-indigo-500 hover:from-cyan-300 hover:to-indigo-400 text-slate-950 font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/30 cursor-pointer active:scale-95 transition-all"
                >
                  <span>Complete Online Order</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>30-Day Money Back Guarantee & 24/7 SLA</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
