import React, { useState, useMemo } from 'react';
import { SlidersHorizontal, Sparkles, Filter, X } from 'lucide-react';
import { ToyProduct } from '../types/toy';
import { ProductCard } from './ProductCard';

interface CatalogSectionProps {
  products: ToyProduct[];
  searchQuery: string;
  onClearSearch: () => void;
  onQuickView: (product: ToyProduct) => void;
  onAddToCart: (product: ToyProduct) => void;
  wishlist: ToyProduct[];
  onToggleWishlist: (product: ToyProduct) => void;
  onOpenGiftFinder: () => void;
}

export const CatalogSection: React.FC<CatalogSectionProps> = ({
  products,
  searchQuery,
  onClearSearch,
  onQuickView,
  onAddToCart,
  wishlist,
  onToggleWishlist,
  onOpenGiftFinder
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedAge, setSelectedAge] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  const categories = [
    { id: 'all', label: 'All Playthings' },
    { id: 'wooden', label: 'Wooden & Trains' },
    { id: 'imaginative', label: 'Imaginative & Dolls' },
    { id: 'puzzles', label: 'Puzzles & Cairn Stones' },
    { id: 'plush', label: 'Organic Linen Plush' },
    { id: 'stem', label: 'STEM & Exploration' }
  ];

  const ages = [
    { id: 'all', label: 'All Ages' },
    { id: '0-2', label: '0–2 yrs (Infant & Toddler)' },
    { id: '3-5', label: '3–5 yrs (Preschool)' },
    { id: '6-8', label: '6–8 yrs (Explorer)' }
  ];

  const filteredProducts = useMemo(() => {
    return products
      .filter((toy) => {
        // Category filter
        const matchCategory = selectedCategory === 'all' || toy.category === selectedCategory;
        // Age filter
        const matchAge = selectedAge === 'all' || toy.ageGroup === selectedAge;
        // Search query
        const matchSearch =
          !searchQuery.trim() ||
          toy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          toy.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          toy.material.toLowerCase().includes(searchQuery.toLowerCase()) ||
          toy.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());

        return matchCategory && matchAge && matchSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        // Featured default
        return (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0);
      });
  }, [products, selectedCategory, selectedAge, searchQuery, sortBy]);

  return (
    <section id="catalog" className="py-14 sm:py-20 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#E8DFC0]">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#9B3D0B]">
              <span>Curated Atelier Collection</span>
              <span aria-hidden="true">·</span>
              <span>Tested to European & US Standards</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#2D2723] mt-1.5 tracking-tight">
              Playthings for Open-Ended Discovery
            </h2>
            <p className="text-xs sm:text-sm text-[#665B54] mt-2 max-w-xl">
              Each piece is carved, sanded, and tested to endure boundless energy and gentle moments alike.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenGiftFinder}
              className="inline-flex items-center gap-2 bg-[#F2ECE1] hover:bg-[#EBE2D4] text-[#9B3D0B] border border-[#DDD3C4] px-4 py-2.5 rounded-full text-xs font-semibold transition-all cursor-pointer shadow-2xs"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Need help choosing? Try Gift Finder</span>
            </button>
          </div>
        </div>

        {/* Filter & Sort Bar */}
        <div className="pt-6 space-y-4">
          
          {/* Categories Segmented Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 text-xs font-semibold rounded-full whitespace-nowrap transition-all cursor-pointer border ${
                  selectedCategory === cat.id
                    ? 'bg-[#2D2723] text-[#FAF7F2] border-[#2D2723] shadow-xs'
                    : 'bg-[#F2ECE1] hover:bg-[#EBE3D7] text-[#5C534D] border-[#E2D8C9]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Age Group Bar & Sort Controls */}
          <div id="age-stages" className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
            
            {/* Age Filter Tabs */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-xs font-medium text-[#7A6F66] mr-1 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" /> Age:
              </span>
              {ages.map((a) => (
                <button
                  key={a.id}
                  onClick={() => setSelectedAge(a.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                    selectedAge === a.id
                      ? 'bg-[#9B3D0B] text-white font-semibold'
                      : 'bg-white border border-[#DDD3C4] text-[#5C534D] hover:bg-[#F2ECE1]'
                  }`}
                >
                  {a.label}
                </button>
              ))}
            </div>

            {/* Sort Selector & Count */}
            <div className="flex items-center gap-3 justify-between sm:justify-end">
              <span className="text-xs text-[#7A6F66] font-mono tabular-nums">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'}
              </span>

              <div className="flex items-center gap-2 text-xs">
                <span className="text-[#7A6F66] hidden sm:inline">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-white border border-[#DDD3C4] rounded-lg px-3 py-1.5 text-xs text-[#2D2723] font-medium outline-none focus:ring-1 focus:ring-[#9B3D0B] cursor-pointer"
                >
                  <option value="featured">Featured & Bestsellers</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Customer Rating</option>
                </select>
              </div>
            </div>

          </div>

          {/* Active Search Notification */}
          {searchQuery && (
            <div className="flex items-center justify-between bg-[#F2ECE1] px-4 py-2 rounded-lg text-xs text-[#2D2723]">
              <span>
                Filtering by keyword: <strong>"{searchQuery}"</strong>
              </span>
              <button
                onClick={onClearSearch}
                className="text-[#9B3D0B] hover:underline flex items-center gap-1 cursor-pointer font-medium"
              >
                <X className="w-3.5 h-3.5" />
                Clear search
              </button>
            </div>
          )}

        </div>

        {/* Product Grid */}
        <div className="mt-8">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
              {filteredProducts.map((product) => {
                const isWishlisted = wishlist.some((w) => w.id === product.id);
                return (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onQuickView={onQuickView}
                    onAddToCart={onAddToCart}
                    isWishlisted={isWishlisted}
                    onToggleWishlist={onToggleWishlist}
                  />
                );
              })}
            </div>
          ) : (
            <div className="py-16 text-center bg-white rounded-2xl border border-dashed border-[#DDD3C4] p-8 space-y-3">
              <h3 className="font-serif text-lg font-semibold text-[#2D2723]">
                No playthings found matching your filters
              </h3>
              <p className="text-xs text-[#6B6158] max-w-sm mx-auto">
                Try selecting "All Ages" or "All Playthings" to view our complete collection.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedAge('all');
                  onClearSearch();
                }}
                className="px-5 py-2.5 bg-[#9B3D0B] text-white text-xs font-semibold rounded-full cursor-pointer hover:bg-[#803107] transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
