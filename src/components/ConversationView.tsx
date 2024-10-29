import React from 'react';
import { Send, ArrowLeft } from 'lucide-react';
import type { Contact, Message } from '../types';

interface ConversationViewProps {
  contact: Contact | null;
  messages: Message[];
  onBack: () => void;
  onSendMessage: (message: string) => void;
}

export function ConversationView({ contact, messages, onBack, onSendMessage }: ConversationViewProps) {
  const [newMessage, setNewMessage] = React.useState('');

  if (!contact) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500">
        Select a contact to view conversation
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage('');
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl shadow-sm">
      <div className="p-4 border-b border-gray-200 flex items-center space-x-4">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="font-semibold">{contact.name}</h2>
          <p className="text-sm text-gray-500">{contact.phone}</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.type === 'outgoing' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                message.type === 'outgoing'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              <p>{message.content}</p>
              <p className="text-xs opacity-70 mt-1">
                {new Date(message.timestamp).toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
        <div className="flex space-x-4">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}