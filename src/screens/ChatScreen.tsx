import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import MessageBubble from '../components/MessageBubble';
import MessageInput from '../components/MessageInput';
import AIInsights from '../components/AIInsights';
import { useWhatsApp } from '../context/WhatsAppContext';

export default function ChatScreen() {
  const route = useRoute();
  const { contact } = route.params;
  const { messages, sendMessage } = useWhatsApp();
  const [showInsights, setShowInsights] = React.useState(false);

  const chatMessages = messages.filter((m) => m.contactId === contact.id);

  const handleSend = async (message: string) => {
    await sendMessage(contact.id, message);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 88 : 0}
    >
      <FlatList
        data={chatMessages}
        renderItem={({ item }) => (
          <MessageBubble
            message={item}
            isOutgoing={item.type === 'outgoing'}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messageList}
        inverted
      />
      <AIInsights
        visible={showInsights}
        onClose={() => setShowInsights(false)}
        messages={chatMessages}
      />
      <MessageInput
        onSend={handleSend}
        onToggleInsights={() => setShowInsights(!showInsights)}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  messageList: {
    padding: 16,
  },
});