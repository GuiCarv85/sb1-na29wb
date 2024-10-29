import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import type { Product } from '../types';

interface ProductFormProps {
  onSubmit: (product: Omit<Product, 'id'>) => void;
}

export function ProductForm({ onSubmit }: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    cost: '',
    stock: '',
    category: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name: formData.name,
      price: Number(formData.price),
      cost: Number(formData.cost),
      stock: Number(formData.stock),
      category: formData.category,
    });
    setFormData({ name: '', price: '', cost: '', stock: '', category: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Add New Product</h2>
      <div className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Product Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            placeholder="Price"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="number"
            placeholder="Cost"
            value={formData.cost}
            onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
            className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            placeholder="Stock"
            value={formData.stock}
            onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
            className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            placeholder="Category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Product</span>
        </button>
      </div>
    </form>
  );
}