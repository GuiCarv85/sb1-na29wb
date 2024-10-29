import React, { useState } from 'react';
import { Header } from './components/Header';
import { ContactList } from './components/ContactList';
import { ConversationView } from './components/ConversationView';
import { NotificationPanel } from './components/NotificationPanel';
import { useWhatsApp } from './hooks/useWhatsApp';
import { useNotifications } from './hooks/useNotifications';
import type { Contact } from './types';

function App() {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const { contacts, messages, sendMessage } = useWhatsApp();
  const { notifications, dismissNotification } = useNotifications();

  const handleSendMessage = (message: string) => {
    if (selectedContact) {
      sendMessage(selectedContact.id, message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <NotificationPanel
        notifications={notifications}
        onDismiss={dismissNotification}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-8rem)]">
          <ContactList
            contacts={contacts}
            onSelectContact={setSelectedContact}
          />
          <ConversationView
            contact={selectedContact}
            messages={messages.filter((m) => m.contactId === selectedContact?.id)}
            onBack={() => setSelectedContact(null)}
            onSendMessage={handleSendMessage}
          />
        </div>
      </main>
    </div>
  );
}

export default App;