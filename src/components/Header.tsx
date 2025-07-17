'use client';

import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full">
      {/* Top Bar */}
      <div className="bg-black text-white text-center py-2 text-sm">
        IMMEDIATE SHIPPING
      </div>
      
      {/* Navegação Principal */}
      <nav className="bg-pink-100 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Menu e Pesquisa */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-black hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <button className="text-black hover:text-gray-600 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
          
          {/* Logo */}
          <div className="flex flex-col items-center">
            <div className="text-2xl font-bold text-black mb-1">M</div>
            <div className="text-lg font-semibold text-black">MIDNIGHT MUSE</div>
          </div>
          
          {/* Perfil e Carrinho */}
          <div className="flex items-center space-x-4">
            <button className="text-black hover:text-gray-600 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
            <button className="text-black hover:text-gray-600 transition-colors relative">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
              </svg>
              <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </button>
          </div>
        </div>
      </nav>
      
      {/* Menu Mobile */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-2 space-y-2">
            <a href="#" className="block py-2 text-black hover:text-gray-600">Home</a>
            <a href="#" className="block py-2 text-black hover:text-gray-600">Products</a>
            <a href="#" className="block py-2 text-black hover:text-gray-600">About</a>
            <a href="#" className="block py-2 text-black hover:text-gray-600">Contact</a>
          </div>
        </div>
      )}
    </header>
  );
} 