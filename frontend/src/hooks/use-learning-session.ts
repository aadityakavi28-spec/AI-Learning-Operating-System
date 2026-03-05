'use client';

import { useState, useEffect, useCallback } from 'react';

interface SessionState {
  isActive: boolean;
  startTime: Date | null;
  duration: number;
  resourceId: string | null;
  topicId: string | null;
}

interface UseLearningSessionOptions {
  resourceId?: string;
  topicId?: string;
  onSessionEnd?: (duration: number) => void;
}

export function useLearningSession({ 
  resourceId, 
  topicId, 
  onSessionEnd 
}: UseLearningSessionOptions = {}) {
  const [session, setSession] = useState<SessionState>({
    isActive: false,
    startTime: null,
    duration: 0,
    resourceId: null,
    topicId: null,
  });

  const [actions, setActions] = useState<Array<{
    type: string;
    timestamp: Date;
    metadata?: Record<string, unknown>;
  }>>([]);

  const startSession = useCallback(() => {
    setSession({
      isActive: true,
      startTime: new Date(),
      duration: 0,
      resourceId: resourceId || null,
      topicId: topicId || null,
    });
    setActions([]);
  }, [resourceId, topicId]);

  const endSession = useCallback(() => {
    if (session.isActive && session.startTime) {
      const duration = Math.floor((new Date().getTime() - session.startTime.getTime()) / 1000);
      setSession((prev) => ({
        ...prev,
        isActive: false,
        duration,
      }));
      onSessionEnd?.(duration);
    }
  }, [session, onSessionEnd]);

  const recordAction = useCallback((
    type: string, 
    metadata?: Record<string, unknown>
  ) => {
    if (session.isActive) {
      setActions((prev) => [
        ...prev,
        { type, timestamp: new Date(), metadata }
      ]);
    }
  }, [session.isActive]);

  // Auto-track session duration
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (session.isActive && session.startTime) {
      interval = setInterval(() => {
        const duration = Math.floor(
          (new Date().getTime() - session.startTime!.getTime()) / 1000
        );
        setSession((prev) => ({ ...prev, duration }));
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [session.isActive, session.startTime]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (session.isActive) {
        endSession();
      }
    };
  }, []);

  return {
    session,
    actions,
    isActive: session.isActive,
    duration: session.duration,
    startSession,
    endSession,
    recordAction,
  };
}

