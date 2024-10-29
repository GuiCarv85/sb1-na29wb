export interface Contact {
  id: string;
  name: string;
  phone: string;
  priority: number;
  status: 'active' | 'pending' | 'completed';
  lastInteraction: Date;
  category: 'negotiation' | 'follow-up' | 'general';
}

export interface Message {
  id: string;
  contactId: string;
  content: string;
  timestamp: Date;
  type: 'incoming' | 'outgoing';
  read: boolean;
}

export interface Notification {
  id: string;
  contactId: string;
  type: 'reminder' | 'priority' | 'pending';
  message: string;
  timestamp: Date;
  read: boolean;
}