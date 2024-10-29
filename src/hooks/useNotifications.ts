import { useState, useEffect } from 'react';
import type { Contact, Notification } from '../types';

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    // Check for pending responses every 5 minutes
    const interval = setInterval(checkPendingResponses, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const checkPendingResponses = () => {
    // This would integrate with your WhatsApp API
    // For now, we'll simulate notifications
  };

  const dismissNotification = (id: string) => {
    setNotifications((current) =>
      current.filter((notification) => notification.id !== id)
    );
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return {
    notifications,
    dismissNotification,
    unreadCount,
  };
}