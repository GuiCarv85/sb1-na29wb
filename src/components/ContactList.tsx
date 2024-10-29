import React from 'react';
import { Phone, Star, Clock, ArrowUpRight } from 'lucide-react';
import type { Contact } from '../types';

interface ContactListProps {
  contacts: Contact[];
  onSelectContact: (contact: Contact) => void;
}

export function ContactList({ contacts, onSelectContact }: ContactListProps) {
  const sortedContacts = [...contacts].sort((a, b) => b.priority - a.priority);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm h-[calc(100vh-8rem)] overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4">Priority Contacts</h2>
      <div className="space-y-3">
        {sortedContacts.map((contact) => (
          <div
            key={contact.id}
            onClick={() => onSelectContact(contact)}
            className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <div className="flex items-center space-x-4">
              <div className={`p-2 rounded-lg ${getPriorityColor(contact.priority)}`}>
                {getPriorityIcon(contact)}
              </div>
              <div>
                <h3 className="font-medium">{contact.name}</h3>
                <p className="text-sm text-gray-500">{contact.phone}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">{contact.category}</p>
              <p className="text-xs text-gray-500">
                {formatLastInteraction(contact.lastInteraction)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function getPriorityColor(priority: number): string {
  if (priority >= 8) return 'bg-red-100 text-red-600';
  if (priority >= 5) return 'bg-yellow-100 text-yellow-600';
  return 'bg-blue-100 text-blue-600';
}

function getPriorityIcon(contact: Contact) {
  switch (contact.category) {
    case 'negotiation':
      return <Star className="w-5 h-5" />;
    case 'follow-up':
      return <Clock className="w-5 h-5" />;
    default:
      return <Phone className="w-5 h-5" />;
  }
}

function formatLastInteraction(date: Date): string {
  return new Intl.RelativeTimeFormat('en', { numeric: 'auto' }).format(
    -Math.round((Date.now() - date.getTime()) / (1000 * 60 * 60)),
    'hours'
  );
}