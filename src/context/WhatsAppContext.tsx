import React, { createContext, useContext, useState, useEffect } from 'react';
import { Contact, Message } from '../types';

interface WhatsAppContextType {
  contacts: Contact[];
  messages: Message[];
  loading: boolean;
  connected: boolean;
  sendMessage: (contactId: string, content: string) => Promise<void>;
  refreshContacts: () => Promise<void>;
}

const WhatsAppContext = createContext<WhatsAppContextType | undefined>(undefined);

export function WhatsAppProvider({ children }: { children: React.ReactNode }) {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    // Initialize WhatsApp connection
    connectToWhatsApp();
    loadInitialData();
  }, []);

  const connectToWhatsApp = async () => {
    try {
      // Here we would initialize the actual WhatsApp connection
      setConnected(true);
    } catch (error) {
      console.error('Failed to connect to WhatsApp:', error);
    }
  };

  const loadInitialData = async () => {
    try {
      // Simulate loading data
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setContacts([
        {
          id: '1',
          name: 'John Doe',
          phone: '+1234567890',
          priority: 8,
          status: 'active',
          lastInteraction: new Date(),
          category: 'negotiation',
        },
        // Add more sample contacts
      ]);
      
      setMessages([
        {
          id: '1',
          contactId: '1',
          content: 'Hi, I\'m interested in your products',
          timestamp: new Date(),
          type: 'incoming',
          read: true,
        },
        // Add more sample messages
      ]);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (contactId: string, content: string) => {
    try {
      // Here we would send the actual message via WhatsApp
      const newMessage: Message = {
        id: Date.now().toString(),
        contactId,
        content,
        timestamp: new Date(),
        type: 'outgoing',
        read: true,
      };
      
      setMessages(prev => [...prev, newMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  };

  const refreshContacts = async () => {
    setLoading(true);
    try {
      await loadInitialData();
    } finally {
      setLoading(false);
    }
  };

  return (
    <WhatsAppContext.Provider
      value={{
        contacts,
        messages,
        loading,
        connected,
        sendMessage,
        refreshContacts,
      }}
    >
      {children}
    </WhatsAppContext.Provider>
  );
}

export function useWhatsApp() {
  const context = useContext(WhatsAppContext);
  if (context === undefined) {
    throw new Error('useWhatsApp must be used within a WhatsAppProvider');
  }
  return context;
}