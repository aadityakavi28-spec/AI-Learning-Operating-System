'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Grid, List, Pin, MoreVertical, Trash2, Edit } from 'lucide-react';
import Navbar from '@/components/layout/navbar';
import Sidebar from '@/components/layout/sidebar';
import NotesEditor from '@/components/notes/notes-editor';
import FlashcardList from '@/components/notes/flashcard-list';
import { notes, flashcards } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

type ViewMode = 'notes' | 'flashcards';

export default function NotesPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('notes');
  const [selectedNote, setSelectedNote] = useState(notes[0]);
  const [isCreating, setIsCreating] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Navbar />
      <Sidebar />
      
      <main className="pt-20 pb-8 pl-64 pr-4 lg:pr-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Notes & Flashcards
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                  Create and review your study materials
                </p>
              </div>
              <button
                onClick={() => setIsCreating(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
              >
                <Plus className="w-5 h-5" />
                New {viewMode === 'notes' ? 'Note' : 'Card'}
              </button>
            </div>
          </motion.div>

          {/* View Toggle */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-2 bg-white dark:bg-slate-800 p-1.5 rounded-xl border border-slate-200 dark:border-slate-700">
              <button
                onClick={() => setViewMode('notes')}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-all',
                  viewMode === 'notes'
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
                )}
              >
                Notes ({notes.length})
              </button>
              <button
                onClick={() => setViewMode('flashcards')}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-all',
                  viewMode === 'flashcards'
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
                )}
              >
                Flashcards ({flashcards.length})
              </button>
            </div>
          </div>

          {viewMode === 'notes' ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Notes List */}
              <div className="lg:col-span-1 space-y-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search notes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 text-slate-900 dark:text-white placeholder:text-slate-400"
                  />
                </div>

                {/* Notes List */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                  <div className="divide-y divide-slate-200 dark:divide-slate-700">
                    {filteredNotes.map((note) => (
                      <button
                        key={note.id}
                        onClick={() => setSelectedNote(note)}
                        className={cn(
                          'w-full p-4 text-left hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors',
                          selectedNote?.id === note.id && 'bg-cyan-50 dark:bg-cyan-900/20'
                        )}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              {note.isPinned && <Pin className="w-3 h-3 text-amber-500" />}
                              <h3 className="font-medium text-slate-900 dark:text-white truncate">
                                {note.title}
                              </h3>
                            </div>
                            <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mt-1">
                              {note.content.replace(/[#*`]/g, '').substring(0, 100)}...
                            </p>
                            <p className="text-xs text-slate-400 mt-2">
                              {new Date(note.updatedAt).toLocaleDateString()}
                            </p>
                          </div>
                          <button className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-600">
                            <MoreVertical className="w-4 h-4 text-slate-400" />
                          </button>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Note Editor */}
              <div className="lg:col-span-2">
                {isCreating ? (
                  <NotesEditor
                    onSave={(title, content) => {
                      console.log('Created:', title, content);
                      setIsCreating(false);
                    }}
                  />
                ) : selectedNote ? (
                  <NotesEditor
                    initialTitle={selectedNote.title}
                    initialContent={selectedNote.content}
                    onSave={(title, content) => console.log('Saved:', title, content)}
                    onDelete={() => console.log('Deleted:', selectedNote.id)}
                  />
                ) : (
                  <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-12 text-center">
                    <p className="text-slate-500 dark:text-slate-400">
                      Select a note or create a new one
                    </p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Flashcards View */
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
              <FlashcardList />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

