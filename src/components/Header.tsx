import React, { useState } from 'react';
import { ShoppingBag, Search, Heart, Menu, X } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onNavigateSection: (sectionId: string) => void;
  onOpenGiftFinder: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onNavigateSection,
  onOpenGiftFinder,
  searchQuery,
  onSearchChange
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);

  const handleNavClick = (sectionId: string) => {
    onNavigateSection(sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#EBE4D8] transition-colors">
      {/* Slim Promotional Bar - Section 2C Restraint */}
      <div className="bg-[#2D2723] text-[#FAF7F2] text-xs py-2 px-4 text-center font-medium tracking-wide">
        <span>Complimentary wood-crate shipping & handwritten gift note on orders over $75</span>
        <span className="hidden sm:inline text-[#D9CFC4] ml-2">· Code: HEIRLOOM10 for 10% off</span>
      </div>

      {/* Top Bar Contract: Zone 1 (Wordmark), Zone 2 (4-6 nav links), Zone 3 (1-2 primary actions) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        
        {/* Zone 1: Single element brand wordmark */}
        <button
          onClick={() => handleNavClick('hero')}
          className="text-left group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9B3D0B]"
        >
          <span className="font-serif text-2xl sm:text-2xl font-semibold tracking-tight text-[#2D2723] group-hover:text-[#9B3D0B] transition-colors">
            Lark & Timber Toys
          </span>
        </button>

        {/* Zone 2: Clean 4-6 text navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#5C534D]">
          <button
            onClick={() => handleNavClick('catalog')}
            className="hover:text-[#2D2723] transition-colors cursor-pointer"
          >
            Curated Shop
          </button>
          <button
            onClick={() => handleNavClick('age-stages')}
            className="hover:text-[#2D2723] transition-colors cursor-pointer"
          >
            Ages & Stages
          </button>
          <button
            onClick={onOpenGiftFinder}
            className="text-[#9B3D0B] hover:text-[#7D3008] font-semibold transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <span>Gift Finder</span>
            <span className="text-[10px] bg-[#F2E5D5] text-[#9B3D0B] px-1.5 py-0.5 rounded font-mono">Interactive</span>
          </button>
          <button
            onClick={() => handleNavClick('workshop')}
            className="hover:text-[#2D2723] transition-colors cursor-pointer"
          >
            Our Workshop
          </button>
          <button
            onClick={() => handleNavClick('reviews')}
            className="hover:text-[#2D2723] transition-colors cursor-pointer"
          >
            Family Stories
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          {/* Search Toggle / Input */}
          <div className="relative">
            {showSearchInput ? (
              <div className="flex items-center bg-white border border-[#DDD3C4] rounded-full px-3 py-1 shadow-sm">
                <Search className="w-4 h-4 text-[#8C8075] shrink-0" />
                <input
                  type="text"
                  placeholder="Search toys, ages, materials..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  autoFocus
                  className="w-40 sm:w-56 text-xs text-[#2D2723] bg-transparent outline-none ml-2 placeholder:text-[#A89F95]"
                />
                <button
                  onClick={() => {
                    setShowSearchInput(false);
                    onSearchChange('');
                  }}
                  className="text-xs text-[#8C8075] hover:text-[#2D2723] ml-1 p-0.5 cursor-pointer"
                  aria-label="Close search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowSearchInput(true)}
                className="p-2 text-[#5C534D] hover:text-[#2D2723] hover:bg-[#EFE8DD] rounded-full transition-colors cursor-pointer"
                aria-label="Open search"
              >
                <Search className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={onOpenWishlist}
            className="relative p-2 text-[#5C534D] hover:text-[#9B3D0B] hover:bg-[#EFE8DD] rounded-full transition-colors cursor-pointer"
            aria-label="View Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#9B3D0B] text-white text-[10px] font-bold rounded-full flex items-center justify-center font-mono">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart Button */}
          <button
            onClick={onOpenCart}
            className="flex items-center gap-2 bg-[#2D2723] hover:bg-[#433B36] text-[#FAF7F2] px-4 py-2 rounded-full text-xs font-medium transition-all shadow-sm cursor-pointer whitespace-nowrap"
            aria-label="Open Cart"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Bag</span>
            <span className="bg-[#433B36] text-[#FAF7F2] px-2 py-0.5 rounded-full text-[11px] font-mono font-semibold">
              {cartCount}
            </span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#5C534D] hover:text-[#2D2723] rounded-lg cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF7F2] border-b border-[#EBE4D8] px-6 py-4 space-y-3">
          <button
            onClick={() => handleNavClick('catalog')}
            className="block w-full text-left text-sm font-medium text-[#2D2723] py-2"
          >
            Curated Shop
          </button>
          <button
            onClick={() => handleNavClick('age-stages')}
            className="block w-full text-left text-sm font-medium text-[#2D2723] py-2"
          >
            Ages & Stages
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenGiftFinder();
            }}
            className="block w-full text-left text-sm font-semibold text-[#9B3D0B] py-2"
          >
            Interactive Gift Finder
          </button>
          <button
            onClick={() => handleNavClick('workshop')}
            className="block w-full text-left text-sm font-medium text-[#2D2723] py-2"
          >
            Our Workshop Philosophy
          </button>
          <button
            onClick={() => handleNavClick('reviews')}
            className="block w-full text-left text-sm font-medium text-[#2D2723] py-2"
          >
            Family Stories & Reviews
          </button>
        </div>
      )}
    </header>
  );
};
