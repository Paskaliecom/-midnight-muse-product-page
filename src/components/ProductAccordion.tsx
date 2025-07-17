'use client';

import { useState } from 'react';

interface ProductAccordionProps {
  product: {
    title: string;
    price: string;
    description: string;
    features: string[];
    composition: {
      top: string;
      bottom: string;
      decoration: string;
    };
  };
}

export default function ProductAccordion({ product }: ProductAccordionProps) {
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({});

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const sections = [
    {
      id: 'description',
      title: 'DESCRIPTION',
      content: (
        <div className="space-y-4">
          <p>{product.description}</p>
          <ul className="list-disc list-inside space-y-1">
            {product.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
          <div className="font-semibold">Composition</div>
          <p>Top: {product.composition.top}</p>
          <p>Bottom: {product.composition.bottom}</p>
          <p>{product.composition.decoration}</p>
        </div>
      )
    },
    {
      id: 'shipping',
      title: 'SHIPPING AND RETURNS',
      content: (
        <div className="space-y-4">
          <div>
            <h5 className="font-semibold mb-2">DELIVERY</h5>
            <ul className="list-disc list-inside space-y-1">
              <li>Shipping: Within 24 hours</li>
              <li>Free shipping on all products.</li>
              <li>Delivery time 12 to 20 working days</li>
              <li>Easy 30-day returns and exchanges</li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold mb-2">RETURNS</h5>
            <p>If you don't like the product, you can return it within 30 days. We have an easy and hassle-free returns policy. See our Delivery and Returns Policy for more information</p>
          </div>
        </div>
      )
    },
    {
      id: 'additional',
      title: 'ADDITIONAL INFORMATION',
      content: (
        <ul className="list-disc list-inside space-y-1">
          <li>Quality Guarantee</li>
          <li>Free shipping throughout UK</li>
          <li>Delivery Monday through Friday</li>
          <li>Returns within 7 days if dissatisfied with the product</li>
        </ul>
      )
    },
    {
      id: 'size',
      title: 'SIZE & FIT',
      content: (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-center font-sans text-sm">
            <thead>
              <tr className="bg-pink-100">
                <th className="p-2 border border-gray-300">Size</th>
                <th className="p-2 border border-gray-300">UK</th>
                <th className="p-2 border border-gray-300">Bust</th>
                <th className="p-2 border border-gray-300">Waist</th>
                <th className="p-2 border border-gray-300">Hips</th>
              </tr>
            </thead>
            <tbody>
              {[
                { size: 'XXS', uk: '4', bust: '31.5"', waist: '23"', hips: '33.5"' },
                { size: 'XS', uk: '6', bust: '32.5"', waist: '24"', hips: '34.5"' },
                { size: 'XS', uk: '8', bust: '33.5"', waist: '25"', hips: '35.5"' },
                { size: 'S', uk: '10', bust: '34.5"', waist: '26"', hips: '36.5"' },
                { size: 'S', uk: '12', bust: '35.5"', waist: '27"', hips: '37.5"' },
                { size: 'M', uk: '14', bust: '36.5"', waist: '28"', hips: '38.5"' },
                { size: 'M', uk: '16', bust: '37.5"', waist: '29"', hips: '39.5"' },
                { size: 'L', uk: '18', bust: '39"', waist: '30.5"', hips: '41"' },
                { size: 'L', uk: '20', bust: '40.5"', waist: '32"', hips: '42.5"' },
                { size: 'XL', uk: '22', bust: '42.5"', waist: '34"', hips: '44.5"' },
                { size: 'XL', uk: '24', bust: '44.5"', waist: '36"', hips: '46.5"' },
                { size: 'XXL', uk: '26', bust: '46.5"', waist: '38"', hips: '48.5"' }
              ].map((row, index) => (
                <tr key={index}>
                  <td className="p-2 border border-gray-300">{row.size}</td>
                  <td className="p-2 border border-gray-300">{row.uk}</td>
                  <td className="p-2 border border-gray-300">{row.bust}</td>
                  <td className="p-2 border border-gray-300">{row.waist}</td>
                  <td className="p-2 border border-gray-300">{row.hips}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    }
  ];

  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto space-y-4">
        {sections.map((section) => (
          <div key={section.id} className="border border-gray-200 rounded-lg">
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full px-6 py-4 text-left bg-pink-100 hover:bg-pink-200 transition-colors flex items-center justify-between"
            >
              <h3 className="font-semibold text-black">{section.title}</h3>
              <svg
                className={`w-5 h-5 transition-transform ${
                  openSections[section.id] ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {openSections[section.id] && (
              <div className="px-6 py-4 bg-white">
                {section.content}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 