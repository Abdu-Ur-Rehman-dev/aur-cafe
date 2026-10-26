import React, { useState } from 'react';
import { CartItem } from '../types';
import { X, Trash2, Plus, Minus, ShoppingBag, CheckCircle2, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  if (!isOpen) return null;

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderType, setOrderType] = useState<'In-Café' | 'Express Pickup'>('In-Café');

  const subtotal = items.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  const tax = subtotal * 0.08875;
  const grandTotal = subtotal + tax;

  const handleCheckout = () => {
    setOrderPlaced(true);
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#B98252', '#C9A46A', '#FFF9F1'],
      });
    } catch {
      // ignore
    }
  };

  const handleFinish = () => {
    onClearCart();
    setOrderPlaced(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/75 backdrop-blur-md animate-in fade-in duration-300">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#241711] border-l border-[#C9A46A]/30 p-6 sm:p-8 flex flex-col justify-between shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#4A2C20] pb-6">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-5 h-5 text-[#C9A46A]" />
              <h3 className="font-serif text-2xl font-bold text-[#FFF9F1]">Your Order</h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full border border-[#4A2C20] text-[#F5EBDD] hover:border-[#C9A46A] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {orderPlaced ? (
            /* Order Placed Success View */
            <div className="my-auto text-center space-y-6 py-8">
              <div className="w-16 h-16 rounded-full bg-[#B98252]/20 border border-[#C9A46A] text-[#C9A46A] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <span className="text-xs text-[#C9A46A] tracking-widest uppercase font-semibold">
                  Order Submitted
                </span>
                <h4 className="font-serif text-2xl font-bold text-[#FFF9F1]">
                  Preparing at the Espresso Bar
                </h4>
                <p className="text-xs text-[#F5EBDD]/70 max-w-xs mx-auto">
                  Your order #{Math.floor(1000 + Math.random() * 9000)} is now being hand-extracted by our master barista.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#4A2C20]/40 border border-[#C9A46A]/20 text-left text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-[#F5EBDD]/60">Order Type</span>
                  <span className="text-[#C9A46A] font-semibold">{orderType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#F5EBDD]/60">Total Paid</span>
                  <span className="text-[#FFF9F1] font-bold tabular-nums">
                    ${grandTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={handleFinish}
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#B98252] to-[#C9A46A] text-[#241711] font-bold text-xs tracking-widest uppercase"
              >
                Done
              </button>
            </div>
          ) : (
            <>
              {/* Order Items List */}
              <div className="my-6 space-y-4 overflow-y-auto flex-1 pr-1">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-3 opacity-60">
                    <ShoppingBag className="w-12 h-12 text-[#C9A46A]" />
                    <p className="text-sm font-serif text-[#F5EBDD]">Your order tray is empty.</p>
                    <p className="text-xs text-[#F5EBDD]/60">
                      Explore our signature drinks and patisserie items to start your session.
                    </p>
                  </div>
                ) : (
                  items.map((cartItem) => (
                    <div
                      key={cartItem.id}
                      className="p-4 rounded-2xl bg-[#4A2C20]/30 border border-[#4A2C20] space-y-3 flex flex-col justify-between"
                    >
                      <div className="flex items-start gap-3">
                        <img
                          src={cartItem.menuItem.image}
                          alt={cartItem.menuItem.name}
                          className="w-14 h-14 rounded-xl object-cover border border-[#C9A46A]/30 shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <h4 className="font-serif text-base font-bold text-[#FFF9F1] leading-tight">
                              {cartItem.menuItem.name}
                            </h4>
                            <button
                              onClick={() => onRemoveItem(cartItem.id)}
                              className="text-[#F5EBDD]/40 hover:text-red-400 transition-colors p-1"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {/* Custom Options Notes */}
                          {cartItem.customOptions && (
                            <div className="text-[10px] text-[#F5EBDD]/70 space-y-0.5 mt-1 bg-[#241711]/60 p-2 rounded-lg border border-[#4A2C20]/60">
                              <p>
                                <span className="text-[#C9A46A]">Temp:</span> {cartItem.customOptions.temperature} ·{' '}
                                <span className="text-[#C9A46A]">Milk:</span> {cartItem.customOptions.milk}
                              </p>
                              <p>
                                <span className="text-[#C9A46A]">Shots:</span> {cartItem.customOptions.shots} ·{' '}
                                <span className="text-[#C9A46A]">Sweetness:</span> {cartItem.customOptions.sweetness}%
                              </p>
                              {cartItem.customOptions.syrup !== 'None' && (
                                <p>
                                  <span className="text-[#C9A46A]">Syrup:</span> {cartItem.customOptions.syrup}
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Quantity Stepper & Price */}
                      <div className="flex items-center justify-between pt-2 border-t border-[#4A2C20]/40">
                        <div className="flex items-center gap-2 bg-[#241711] rounded-lg border border-[#4A2C20] px-2 py-1">
                          <button
                            onClick={() => onUpdateQuantity(cartItem.id, -1)}
                            className="p-1 text-[#F5EBDD]/70 hover:text-[#FFF9F1]"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold text-[#FFF9F1] w-4 text-center">
                            {cartItem.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(cartItem.id, 1)}
                            className="p-1 text-[#F5EBDD]/70 hover:text-[#FFF9F1]"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="font-serif font-bold text-base text-[#C9A46A] tabular-nums">
                          ${(cartItem.unitPrice * cartItem.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Order Mode Toggle & Summary */}
              {items.length > 0 && (
                <div className="space-y-4 pt-4 border-t border-[#4A2C20]">
                  <div className="grid grid-cols-2 gap-2 p-1 bg-[#241711] rounded-xl border border-[#4A2C20]">
                    {(['In-Café', 'Express Pickup'] as const).map((type) => (
                      <button
                        key={type}
                        onClick={() => setOrderType(type)}
                        className={`py-1.5 text-xs font-semibold rounded-lg transition-all ${
                          orderType === type
                            ? 'bg-[#B98252] text-[#241711] font-bold'
                            : 'text-[#F5EBDD]/60 hover:text-[#FFF9F1]'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>

                  <div className="space-y-1.5 text-xs text-[#F5EBDD]/80">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="tabular-nums">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>State Sales Tax (8.875%)</span>
                      <span className="tabular-nums">${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-base font-serif font-bold text-[#FFF9F1] pt-2 border-t border-[#4A2C20]">
                      <span>Grand Total</span>
                      <span className="text-[#C9A46A] tabular-nums">
                        ${grandTotal.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleCheckout}
                    className="w-full py-4 rounded-full bg-gradient-to-r from-[#B98252] to-[#C9A46A] text-[#241711] font-bold text-xs tracking-widest uppercase hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-xl"
                  >
                    <span>Place Order (${grandTotal.toFixed(2)})</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
