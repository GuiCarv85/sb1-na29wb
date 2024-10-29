import { useState, useEffect } from 'react';
import { Message } from '../types';

interface AIInsights {
  suggestions: string[];
  analysis: string;
}

export function useAI(messages: Message[]) {
  const [insights, setInsights] = useState<AIInsights>({
    suggestions: [],
    analysis: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const analyzeConversation = async () => {
      if (messages.length === 0) return;

      setLoading(true);
      try {
        // Here we would make the actual API call to OpenAI
        // For now, we'll simulate a response
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        setInsights({
          suggestions: [
            'Consider offering a product bundle based on their interests',
            'Follow up about their previous purchase experience',
            'Share new product features that align with their needs',
          ],
          analysis: 'Customer shows high engagement and interest in premium products. Response time is good, but there\'s opportunity to provide more detailed product information.',
        });
      } catch (error) {
        console.error('Error analyzing conversation:', error);
      } finally {
        setLoading(false);
      }
    };

    analyzeConversation();
  }, [messages]);

  return { insights, loading };
}