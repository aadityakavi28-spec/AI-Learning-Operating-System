'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, FileText, PenTool, Sparkles, ChevronLeft, ChevronRight, X } from 'lucide-react';
import Navbar from '@/components/layout/navbar';
import Sidebar from '@/components/layout/sidebar';
import VideoPlayer from '@/components/learning/video-player';
import ResourceCard from '@/components/learning/resource-card';
import AIChatSidebar from '@/components/ai/ai-chat-sidebar';
import NotesEditor from '@/components/notes/notes-editor';
import FlashcardList from '@/components/notes/flashcard-list';
import { learningResources, topics, notes, flashcards } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

type TabType = 'content' | 'notes' | 'flashcards';

export default function LearnPage() {
  const [activeTab, setActiveTab] = useState<TabType>('content');
  const [showChat, setShowChat] = useState(true);
  const [selectedTopic, setSelectedTopic] = useState(topics[0]);

  const tabs = [
    { id: 'content' as const, label: 'Content', icon: BookOpen },
    { id: 'notes' as const, label: 'Notes', icon: PenTool },
    { id: 'flashcards' as const, label: 'Flashcards', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Navbar />
      <Sidebar />
      
      <main className="pt-20 pb-8 pl-64 pr-4 lg:pr-8">
        <div className="max-w-[1600px] mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
              <span>Learn</span>
              <ChevronRight className="w-4 h-4" />
              <span className="text-cyan-600 dark:text-cyan-400">{selectedTopic.title}</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              {selectedTopic.title}
            </h1>
          </motion.div>

          {/* Main Layout */}
          <div className="flex gap-6">
            {/* Left Content Area */}
            <div className="flex-1 min-w-0">
              {/* Tabs */}
              <div className="flex items-center gap-2 mb-6 bg-white dark:bg-slate-800 p-1.5 rounded-xl border border-slate-200 dark:border-slate-700 w-fit">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all',
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
                    )}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                {activeTab === 'content' && (
                  <div className="p-6 space-y-6">
                    {/* Video Player */}
                    <VideoPlayer
                      title={learningResources[0].title}
                      thumbnail={learningResources[0].thumbnail}
                    />

                    {/* Resource List */}
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                        More Resources
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {learningResources.map((resource) => (
                          <ResourceCard
                            key={resource.id}
                            id={resource.id}
                            type={resource.type}
                            title={resource.title}
                            description={resource.description}
                            thumbnail={resource.thumbnail}
                            source={resource.source}
                            duration={resource.duration}
                            difficulty={resource.difficulty}
                            tags={resource.tags}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'notes' && (
                  <div className="p-6">
                    <NotesEditor
                      initialTitle={notes[0].title}
                      initialContent={notes[0].content}
                      onSave={(title, content) => console.log('Saved:', title, content)}
                    />
                  </div>
                )}

                {activeTab === 'flashcards' && (
                  <div className="p-6">
                    <FlashcardList />
                  </div>
                )}
              </div>
            </div>

            {/* Right Sidebar - AI Chat */}
            {showChat && (
              <div className="w-80 flex-shrink-0">
                <AIChatSidebar />
              </div>
            )}
          </div>

          {/* Toggle Chat Button */}
          <button
            onClick={() => setShowChat(!showChat)}
            className={cn(
              'fixed bottom-6 right-6 z-50 p-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-full shadow-xl hover:shadow-2xl transition-all',
              showChat && 'right-[340px]'
            )}
          >
            {showChat ? <X className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
          </button>
        </div>
      </main>
    </div>
  );
}

