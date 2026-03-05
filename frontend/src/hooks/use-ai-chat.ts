'use client';

import { useState, useCallback } from 'react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

interface UseAIChatOptions {
  initialMessages?: Message[];
  onMessage?: (message: Message) => void;
}

export function useAIChat({ initialMessages = [], onMessage }: UseAIChatOptions = {}) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate AI response (in real app, this would call an API)
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: generateAIResponse(content),
        timestamp: new Date().toISOString(),
      };
      
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
      onMessage?.(aiResponse);
    }, 1500);
  }, [onMessage]);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  return {
    messages,
    isTyping,
    sendMessage,
    clearMessages,
  };
}

function generateAIResponse(userMessage: string): string {
  const lowerMessage = userMessage.toLowerCase();
  
  if (lowerMessage.includes('help') || lowerMessage.includes('what')) {
    return "I'm here to help! I can assist you with:\n\n📚 **Understanding concepts** - Ask me to explain any topic\n\n📝 **Creating notes** - I can help you structure your notes\n\n🎴 **Flashcards** - I can generate flashcards from your learning materials\n\n💡 **Study tips** - Ask me for personalized study strategies\n\nWhat would you like to learn about?";
  }
  
  if (lowerMessage.includes('gradient') || lowerMessage.includes('descent')) {
    return "Gradient descent is an optimization algorithm used to minimize a function by iteratively moving in the direction of steepest descent.\n\n**Key Points:**\n- It calculates the gradient (slope) of the loss function\n- Moves in the opposite direction of the gradient\n- Learning rate controls step size\n- Used in training neural networks\n\nThink of it like hiking down a mountain to the lowest point!";
  }
  
  if (lowerMessage.includes('react') || lowerMessage.includes('hook')) {
    return "React Hooks are functions that let you use state and other React features in functional components.\n\n**Common Hooks:**\n- `useState` - Add state to components\n- `useEffect` - Handle side effects\n- `useMemo` - Optimize expensive calculations\n- `useCallback` - Memoize functions\n\nWant me to explain any specific hook in more detail?";
  }
  
  return "That's a great question! I'm analyzing your learning progress to provide you with the best guidance. Based on what you've been studying, I recommend reviewing the core concepts before moving to advanced topics.\n\nWould you like me to explain this further or create some practice flashcards?";
}

