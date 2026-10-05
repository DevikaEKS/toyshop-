/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CatalogSection } from './components/CatalogSection';
import { WorkshopStorySection } from './components/WorkshopStorySection';
import { ReviewsSection } from './components/ReviewsSection';
import { Footer } from './components/Footer';
import { ProductQuickViewModal } from './components/ProductQuickViewModal';
import { GiftFinderModal } from './components/GiftFinderModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { WishlistModal } from './components/WishlistModal';
import { TOY_PRODUCTS } from './data/toys';
import { ToyProduct, CartItem } from './types/toy';
import { Check, ShoppingBag } from 'lucide-react';

export default function App() {
  // Cart state with localStorage persistence
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('lark_timber_cart');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Could not read cart from localStorage', e);
    }
    // Initial starter item for delightful first-load preview
    return [
      {
        product: TOY_PRODUCTS[0], // Artisan Heritage Express
        quantity: 1,
        giftWrap: false
      }
    ];
  });

  // Wishlist state with localStorage persistence
  const [wishlist, setWishlist] = useState<ToyProduct[]>(() => {
    try {
      const saved = localStorage.getItem('lark_timber_wishlist');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Could not read wishlist from localStorage', e);
    }
    return [TOY_PRODUCTS[3]]; // Barnaby Bear
  });

  // Modals and Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isGiftFinderOpen, setIsGiftFinderOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<ToyProduct | null>(null);

  // Search
  const [searchQuery, setSearchQuery] = useState('');

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('lark_timber_cart', JSON.stringify(cart));
    } catch (e) {
      console.warn('Failed to save cart', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('lark_timber_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.warn('Failed to save wishlist', e);
    }
  }, [wishlist]);

  // Cart operations
  const handleAddToCart = (
    product: ToyProduct,
    quantity = 1,
    giftWrap = false,
    giftNote?: string
  ) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
          giftWrap: giftWrap || next[existingIndex].giftWrap,
          giftNote: giftNote || next[existingIndex].giftNote
        };
        return next;
      }
      return [...prev, { product, quantity, giftWrap, giftNote }];
    });

    setToastMessage(`Added "${product.name}" to your basket`);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleOrderCompleted = () => {
    setCart([]);
  };

  // Wishlist operations
  const handleToggleWishlist = (product: ToyProduct) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const handleRemoveFromWishlist = (product: ToyProduct) => {
    setWishlist((prev) => prev.filter((p) => p.id !== product.id));
  };

  // Navigation scroll
  const handleNavigateSection = (sectionId: string) => {
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalCartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#2D2723] font-body selection:bg-[#E78044]/20 selection:text-[#9B3D0B]">
      
      {/* 3-Zone Top Bar */}
      <Header
        cartCount={totalCartItemCount}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onNavigateSection={handleNavigateSection}
        onOpenGiftFinder={() => setIsGiftFinderOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero
          onShopClick={() => handleNavigateSection('catalog')}
          onGiftFinderClick={() => setIsGiftFinderOpen(true)}
        />

        <CatalogSection
          products={TOY_PRODUCTS}
          searchQuery={searchQuery}
          onClearSearch={() => setSearchQuery('')}
          onQuickView={(toy) => setQuickViewProduct(toy)}
          onAddToCart={(toy) => handleAddToCart(toy)}
          wishlist={wishlist}
          onToggleWishlist={handleToggleWishlist}
          onOpenGiftFinder={() => setIsGiftFinderOpen(true)}
        />

        <WorkshopStorySection />

        <ReviewsSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals & Slide-overs */}
      <ProductQuickViewModal
        product={quickViewProduct}
        isOpen={Boolean(quickViewProduct)}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        isWishlisted={Boolean(
          quickViewProduct && wishlist.some((w) => w.id === quickViewProduct.id)
        )}
        onToggleWishlist={handleToggleWishlist}
      />

      <GiftFinderModal
        isOpen={isGiftFinderOpen}
        onClose={() => setIsGiftFinderOpen(false)}
        onSelectProduct={(toy) => setQuickViewProduct(toy)}
        onAddToCart={(toy) => handleAddToCart(toy)}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        onOrderCompleted={handleOrderCompleted}
      />

      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        onRemoveFromWishlist={handleRemoveFromWishlist}
        onAddToCart={(toy) => handleAddToCart(toy)}
      />

      {/* Toast Feedback Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#2D2723] text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-2.5 text-xs animate-slideUp border border-[#433B36]">
          <div className="w-5 h-5 rounded-full bg-[#3A6B4F] flex items-center justify-center shrink-0">
            <Check className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="font-medium">{toastMessage}</span>
          <button
            onClick={() => {
              setToastMessage(null);
              setIsCartOpen(true);
            }}
            className="ml-2 underline text-[#D9CFC4] hover:text-white cursor-pointer font-semibold"
          >
            View Bag
          </button>
        </div>
      )}

    </div>
  );
}
