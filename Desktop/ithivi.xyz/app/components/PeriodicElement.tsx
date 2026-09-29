import React from 'react';

interface ElementProps {
  symbol: string;
  name: string;
  number: number;
  category: string;
  purity?: string;
}

export const PeriodicElement: React.FC<ElementProps> = ({
  symbol,
  name,
  number,
  category,
  purity = '99.9%'
}) => {
  return (
    <div className="w-full aspect-square border border-emerald-500/30 bg-black/80 rounded-xl p-4 flex flex-col justify-between hover:border-emerald-400 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all duration-300 backdrop-blur-md group">
      {/* Top Header */}
      <div className="flex justify-between items-center text-[10px] text-emerald-500 font-mono">
        <span className="font-bold opacity-80">#{number < 10 ? `0${number}` : number}</span>
        <span className="uppercase tracking-wider text-[9px] bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20 truncate max-w-[90px]">
          {category}
        </span>
      </div>

      {/* Symbol Centerpiece */}
      <div className="my-auto text-center py-1">
        <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-widest group-hover:text-emerald-400 transition-colors">
          {symbol}
        </span>
      </div>

      {/* Bottom Footer Info */}
      <div className="text-center font-mono">
        <p className="text-xs font-semibold text-gray-200 truncate">{name}</p>
        <p className="text-[9px] text-emerald-400/80 mt-0.5">Purity: {purity}</p>
      </div>
    </div>
  );
};