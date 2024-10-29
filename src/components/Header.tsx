import React from 'react';
import { MessageSquare, Bell } from 'lucide-react';
import { useNotifications } from '../hooks/useNotifications';

export function Header() {
  const { unreadCount } = useNotifications();

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <MessageSquare className="h-8 w-8 text-gray-900" />
          <h1 className="text-xl font-semibold text-gray-900">WhatsApp Assistant</h1>
        </div>
        <div className="relative">
          <Bell className="h-6 w-6 text-gray-600 hover:text-gray-900 cursor-pointer transition-colors" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
              {unreadCount}
            </span>
          )}
        </div>
      </div>
    </header>
  );
}