import React from 'react';
import { Package, Trash2 } from 'lucide-react';
import type { Product } from '../types';

interface ProductListProps {
  products: Product[];
  onDelete: (id: string) => void;
}

export function ProductList({ products, onDelete }: ProductListProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Products</h2>
      <div className="space-y-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium">{product.name}</h3>
                <p className="text-sm text-gray-500">{product.category}</p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="text-right">
                <p className="font-medium">${product.price.toFixed(2)}</p>
                <p className="text-sm text-gray-500">Stock: {product.stock}</p>
              </div>
              <button
                onClick={() => onDelete(product.id)}
                className="text-red-500 hover:text-red-600 transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
        {products.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No products added yet
          </div>
        )}
      </div>
    </div>
  );
}