import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { X, Lightbulb, TrendingUp } from 'lucide-react-native';
import { Message } from '../types';
import { useAI } from '../hooks/useAI';

interface AIInsightsProps {
  visible: boolean;
  onClose: () => void;
  messages: Message[];
}

export default function AIInsights({ visible, onClose, messages }: AIInsightsProps) {
  const { insights, loading } = useAI(messages);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>AI Insights</Text>
            <TouchableOpacity onPress={onClose}>
              <X size={24} color="#000" />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.insights}>
            {loading ? (
              <Text style={styles.loading}>Analyzing conversation...</Text>
            ) : (
              <>
                <View style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <Lightbulb size={20} color="#6366f1" />
                    <Text style={styles.sectionTitle}>Suggestions</Text>
                  </View>
                  {insights.suggestions.map((suggestion, index) => (
                    <Text key={index} style={styles.suggestion}>
                      • {suggestion}
                    </Text>
                  ))}
                </View>

                <View style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <TrendingUp size={20} color="#6366f1" />
                    <Text style={styles.sectionTitle}>Engagement Analysis</Text>
                  </View>
                  <Text style={styles.analysis}>{insights.analysis}</Text>
                </View>
              </>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  content: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '70%',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  insights: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  suggestion: {
    fontSize: 15,
    color: '#374151',
    marginBottom: 8,
    lineHeight: 22,
  },
  analysis: {
    fontSize: 15,
    color: '#374151',
    lineHeight: 22,
  },
  loading: {
    textAlign: 'center',
    marginTop: 20,
    color: '#6366f1',
    fontSize: 16,
  },
});