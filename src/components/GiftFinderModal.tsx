import React, { useState, useMemo } from 'react';
import { X, Sparkles, ArrowRight, RotateCcw, ShoppingBag, Check } from 'lucide-react';
import { ToyProduct } from '../types/toy';
import { TOY_PRODUCTS } from '../data/toys';

interface GiftFinderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: ToyProduct) => void;
  onAddToCart: (product: ToyProduct) => void;
}

export const GiftFinderModal: React.FC<GiftFinderModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  onAddToCart
}) => {
  if (!isOpen) return null;

  const [selectedAge, setSelectedAge] = useState<'0-2' | '3-5' | '6-8' | '9+' | 'all'>('3-5');
  const [selectedPersona, setSelectedPersona] = useState<string>('builder');
  const [selectedBudget, setSelectedBudget] = useState<number>(100);
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

  const personas = [
    { id: 'builder', label: 'Builder & Maker', desc: 'Loves constructing, stacking, tracks, physics & gravity' },
    { id: 'storyteller', label: 'Storyteller & Worlds', desc: 'Pretend play, dollhouses, figurines, imaginary journeys' },
    { id: 'explorer', label: 'Nature & STEM', desc: 'Tinkering, outdoor observation, stargazing & collecting' },
    { id: 'cuddler', label: 'Gentle & Calming', desc: 'Sensory comfort, soothing bedtime companions, quiet play' }
  ];

  // Matched recommendations
  const recommendations = useMemo(() => {
    return TOY_PRODUCTS.filter((toy) => {
      // Age matching
      const matchesAge = selectedAge === 'all' || toy.ageGroup === selectedAge || (selectedAge === '3-5' && toy.ageGroup === '0-2');
      // Budget matching
      const matchesBudget = toy.price <= selectedBudget;
      
      // Persona matching
      let matchesPersona = true;
      if (selectedPersona === 'builder') {
        matchesPersona = toy.category === 'wooden' || toy.category === 'puzzles';
      } else if (selectedPersona === 'storyteller') {
        matchesPersona = toy.category === 'imaginative';
      } else if (selectedPersona === 'explorer') {
        matchesPersona = toy.category === 'stem' || toy.category === 'wooden';
      } else if (selectedPersona === 'cuddler') {
        matchesPersona = toy.category === 'plush' || toy.category === 'puzzles';
      }

      return matchesAge && matchesBudget && matchesPersona;
    });
  }, [selectedAge, selectedPersona, selectedBudget]);

  const handleQuickAdd = (toy: ToyProduct, e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(toy);
    setAddedIds((prev) => ({ ...prev, [toy.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [toy.id]: false }));
    }, 1500);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative bg-[#FAF7F2] rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto border border-[#E0D7CA] shadow-2xl p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-5 border-b border-[#E8DFC0]">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#9B3D0B] uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Interactive Gift Recommender</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#2D2723] mt-1">
              Find the perfect heirloom plaything
            </h2>
            <p className="text-xs sm:text-sm text-[#6B6158] mt-1">
              Tell us about the lucky child to receive personalized, developmental toy suggestions.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#6B6158] hover:text-[#2D2723] hover:bg-[#EFE9DF] rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Wizard Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6 border-b border-[#E8DFC0]">
          
          {/* Step 1: Age */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2D2723]">
              1. Child's Age
            </span>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: '0-2', label: '0–2 yrs', sub: 'Babies & Toddlers' },
                { id: '3-5', label: '3–5 yrs', sub: 'Preschool Play' },
                { id: '6-8', label: '6–8 yrs', sub: 'Early Explorer' },
                { id: 'all', label: 'All Ages', sub: 'Timeless Gifts' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedAge(item.id as any)}
                  className={`p-2.5 text-left rounded-lg border text-xs transition-all cursor-pointer ${
                    selectedAge === item.id
                      ? 'border-[#9B3D0B] bg-[#F7ECE4] text-[#2D2723] font-semibold'
                      : 'border-[#E0D7CA] bg-white text-[#5C534D] hover:border-[#C4B7A5]'
                  }`}
                >
                  <div className="font-medium text-[#2D2723]">{item.label}</div>
                  <div className="text-[10px] text-[#7A6F66]">{item.sub}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Play Persona */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2D2723]">
              2. Play Persona
            </span>
            <div className="space-y-2">
              {personas.map((persona) => (
                <button
                  key={persona.id}
                  onClick={() => setSelectedPersona(persona.id)}
                  className={`w-full p-2.5 text-left rounded-lg border text-xs transition-all cursor-pointer ${
                    selectedPersona === persona.id
                      ? 'border-[#9B3D0B] bg-[#F7ECE4] text-[#2D2723] font-semibold'
                      : 'border-[#E0D7CA] bg-white text-[#5C534D] hover:border-[#C4B7A5]'
                  }`}
                >
                  <div className="font-medium text-[#2D2723]">{persona.label}</div>
                  <div className="text-[10px] text-[#7A6F66] line-clamp-1">{persona.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Budget Slider */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#2D2723]">
                3. Maximum Budget
              </span>
              <span className="text-xs font-mono font-bold text-[#9B3D0B]">${selectedBudget}</span>
            </div>
            <input
              type="range"
              min={40}
              max={150}
              step={10}
              value={selectedBudget}
              onChange={(e) => setSelectedBudget(Number(e.target.value))}
              className="w-full accent-[#9B3D0B] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#7A6F66] font-mono">
              <span>$40</span>
              <span>$100</span>
              <span>$150+</span>
            </div>

            {/* Reset button */}
            <div className="pt-2">
              <button
                onClick={() => {
                  setSelectedAge('3-5');
                  setSelectedPersona('builder');
                  setSelectedBudget(100);
                }}
                className="inline-flex items-center gap-1.5 text-xs text-[#7A6F66] hover:text-[#2D2723] cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Selections</span>
              </button>
            </div>
          </div>

        </div>

        {/* Results Section */}
        <div className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-serif text-lg font-semibold text-[#2D2723]">
              Curated Matches ({recommendations.length})
            </h3>
            <span className="text-xs text-[#7A6F66]">
              All items include lifetime warranty & heirloom box
            </span>
          </div>

          {recommendations.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {recommendations.map((toy) => (
                <div
                  key={toy.id}
                  onClick={() => {
                    onSelectProduct(toy);
                    onClose();
                  }}
                  className="bg-white rounded-xl border border-[#E3D9CC] p-3.5 flex flex-col justify-between hover:border-[#9B3D0B] transition-all cursor-pointer group shadow-sm hover:shadow-md"
                >
                  <div className="space-y-2.5">
                    <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-[#EFE9DF]">
                      <img
                        src={toy.image}
                        alt={toy.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm text-[10px] font-semibold text-[#9B3D0B] px-2 py-0.5 rounded">
                        {toy.ageRange}
                      </span>
                    </div>

                    <div>
                      <h4 className="font-serif text-sm font-semibold text-[#2D2723] line-clamp-1 group-hover:text-[#9B3D0B] transition-colors">
                        {toy.name}
                      </h4>
                      <p className="text-[11px] text-[#6B6158] line-clamp-2 mt-0.5">
                        {toy.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-[#EFE8DD] flex items-center justify-between">
                    <span className="font-mono font-bold text-sm text-[#2D2723]">
                      ${toy.price}
                    </span>

                    <button
                      onClick={(e) => handleQuickAdd(toy, e)}
                      className={`px-3 py-1 rounded text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
                        addedIds[toy.id]
                          ? 'bg-[#3A6B4F] text-white'
                          : 'bg-[#FAF5EC] hover:bg-[#9B3D0B] text-[#9B3D0B] hover:text-white border border-[#E2D5C3]'
                      }`}
                    >
                      {addedIds[toy.id] ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Add to Bag</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 bg-white rounded-xl border border-dashed border-[#DDD3C4] p-8">
              <p className="text-sm text-[#6B6158]">
                No exact match found with these specific filters. Try raising the budget slightly or choosing "All Ages".
              </p>
              <button
                onClick={() => {
                  setSelectedBudget(150);
                  setSelectedAge('all');
                }}
                className="mt-3 px-4 py-2 bg-[#9B3D0B] text-white text-xs font-semibold rounded-lg cursor-pointer"
              >
                Expand Match Criteria
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
