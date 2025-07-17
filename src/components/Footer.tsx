'use client';

import { useState } from 'react';

export default function Footer() {
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({});

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <footer className="bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Informações de Contato */}
          <div>
            <h4 className="font-semibold text-black mb-4">CONTACT INFORMATION</h4>
            <p className="text-gray-600 mb-4">
              If you have any questions, please reach out to our support team:
            </p>
            <div className="space-y-2">
              <div className="flex items-center text-gray-600">
                <span className="mr-2">📧</span>
                <a href="mailto:support@midnight-muse.shop" className="hover:text-black transition-colors">
                  support@midnight-muse.shop
                </a>
              </div>
              <div className="flex items-center text-gray-600">
                <span className="mr-2">📍</span>
                <span>Based in the United Kingdom</span>
              </div>
            </div>
          </div>

          {/* Customer Care */}
          <div>
            <button
              onClick={() => toggleSection('customer-care')}
              className="w-full text-left font-semibold text-black mb-4 flex items-center justify-between"
            >
              CUSTOMER CARE
              <svg
                className={`w-4 h-4 transition-transform ${
                  openSections['customer-care'] ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {openSections['customer-care'] && (
              <div className="space-y-2 text-gray-600">
                <a href="#" className="block hover:text-black transition-colors">Shipping & Returns</a>
                <a href="#" className="block hover:text-black transition-colors">Size Guide</a>
                <a href="#" className="block hover:text-black transition-colors">FAQ</a>
                <a href="#" className="block hover:text-black transition-colors">Contact Us</a>
              </div>
            )}
          </div>

          {/* Legal & Privacy */}
          <div>
            <button
              onClick={() => toggleSection('legal-privacy')}
              className="w-full text-left font-semibold text-black mb-4 flex items-center justify-between"
            >
              LEGAL & PRIVACY
              <svg
                className={`w-4 h-4 transition-transform ${
                  openSections['legal-privacy'] ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {openSections['legal-privacy'] && (
              <div className="space-y-2 text-gray-600">
                <a href="#" className="block hover:text-black transition-colors">Privacy Policy</a>
                <a href="#" className="block hover:text-black transition-colors">Terms of Service</a>
                <a href="#" className="block hover:text-black transition-colors">Cookie Policy</a>
                <a href="#" className="block hover:text-black transition-colors">GDPR</a>
              </div>
            )}
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-300 mt-8 pt-8 text-center">
          <p className="text-gray-600">©MIDNIGHT MUSE - All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
} 