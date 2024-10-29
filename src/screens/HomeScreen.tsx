import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Cog } from 'lucide-react-native';
import ContactCard from '../components/ContactCard';
import PriorityBadge from '../components/PriorityBadge';
import { useWhatsApp } from '../context/WhatsAppContext';
import { Contact } from '../types';

export default function HomeScreen() {
  const navigation = useNavigation();
  const { contacts, refreshContacts, loading } = useWhatsApp();
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await refreshContacts();
    setRefreshing(false);
  }, [refreshContacts]);

  const handleContactPress = (contact: Contact) => {
    navigation.navigate('Chat', { contact });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={contacts}
        renderItem={({ item }) => (
          <ContactCard
            contact={item}
            onPress={() => handleContactPress(item)}
            leading={<PriorityBadge priority={item.priority} />}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      <TouchableOpacity
        style={styles.settingsButton}
        onPress={() => navigation.navigate('Settings')}
      >
        <Cog size={24} color="#000" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  list: {
    padding: 16,
  },
  settingsButton: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
});