import React from 'react';
import { Bell, X } from 'lucide-react';
import type { Notification } from '../types';

interface NotificationPanelProps {
  notifications: Notification[];
  onDismiss: (id: string) => void;
}

export function NotificationPanel({ notifications, onDismiss }: NotificationPanelProps) {
  return (
    <div className="fixed top-20 right-4 w-80 space-y-2 z-50">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className="bg-white rounded-lg shadow-lg p-4 border border-gray-100 animate-slideIn"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-2">
              <Bell className="w-5 h-5 text-blue-500" />
              <div>
                <p className="font-medium text-sm">{notification.message}</p>
                <p className="text-xs text-gray-500">
                  {new Date(notification.timestamp).toLocaleTimeString()}
                </p>
              </div>
            </div>
            <button
              onClick={() => onDismiss(notification.id)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}