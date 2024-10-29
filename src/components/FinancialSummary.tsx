import React from 'react';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import type { Product } from '../types';

interface FinancialSummaryProps {
  products: Product[];
}

export function FinancialSummary({ products }: FinancialSummaryProps) {
  const totalRevenue = products.reduce((acc, product) => acc + (product.price * product.stock), 0);
  const totalCost = products.reduce((acc, product) => acc + (product.cost * product.stock), 0);
  const profit = totalRevenue - totalCost;
  const profitMargin = totalRevenue ? (profit / totalRevenue) * 100 : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="text-gray-500">Revenue</h3>
          <div className="bg-green-100 p-2 rounded-lg">
            <DollarSign className="w-5 h-5 text-green-600" />
          </div>
        </div>
        <p className="text-2xl font-semibold mt-2">${totalRevenue.toFixed(2)}</p>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="text-gray-500">Costs</h3>
          <div className="bg-red-100 p-2 rounded-lg">
            <TrendingDown className="w-5 h-5 text-red-600" />
          </div>
        </div>
        <p className="text-2xl font-semibold mt-2">${totalCost.toFixed(2)}</p>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="text-gray-500">Profit</h3>
          <div className="bg-blue-100 p-2 rounded-lg">
            <TrendingUp className="w-5 h-5 text-blue-600" />
          </div>
        </div>
        <p className="text-2xl font-semibold mt-2">${profit.toFixed(2)}</p>
        <p className="text-sm text-gray-500 mt-1">
          Margin: {profitMargin.toFixed(1)}%
        </p>
      </div>
    </div>
  );
}