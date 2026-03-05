'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Bold, 
  Italic, 
  Underline, 
  List, 
  ListOrdered, 
  Link as LinkIcon, 
  Image, 
  Code, 
  Quote, 
  Heading1, 
  Heading2, 
  Heading3,
  Save,
  Undo,
  Redo,
  MoreHorizontal,
  Trash2,
  Pin,
  Tag,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NotesEditorProps {
  initialTitle?: string;
  initialContent?: string;
  onSave?: (title: string, content: string) => void;
  onDelete?: () => void;
}

export default function NotesEditor({ 
  initialTitle = '', 
  initialContent = '', 
  onSave,
  onDelete 
}: NotesEditorProps) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [isPinned, setIsPinned] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);

  const handleSave = () => {
    onSave?.(title, content);
  };

  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };

  const toolbarButtons = [
    { icon: Bold, command: 'bold', title: 'Bold' },
    { icon: Italic, command: 'italic', title: 'Italic' },
    { icon: Underline, command: 'underline', title: 'Underline' },
    { type: 'divider' },
    { icon: Heading1, command: 'formatBlock', value: 'h1', title: 'Heading 1' },
    { icon: Heading2, command: 'formatBlock', value: 'h2', title: 'Heading 2' },
    { icon: Heading3, command: 'formatBlock', value: 'h3', title: 'Heading 3' },
    { type: 'divider' },
    { icon: List, command: 'insertUnorderedList', title: 'Bullet List' },
    { icon: ListOrdered, command: 'insertOrderedList', title: 'Numbered List' },
    { icon: Quote, command: 'formatBlock', value: 'blockquote', title: 'Quote' },
    { type: 'divider' },
    { icon: LinkIcon, command: 'createLink', value: 'https://', title: 'Insert Link' },
    { icon: Image, command: 'insertImage', value: '', title: 'Insert Image' },
    { icon: Code, command: 'formatBlock', value: 'pre', title: 'Code Block' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden"
    >
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
        <div className="flex items-center gap-1 overflow-x-auto">
          <button className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors" title="Undo">
            <Undo className="w-4 h-4 text-slate-600 dark:text-slate-400" />
          </button>
          <button className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors" title="Redo">
            <Redo className="w-4 h-4 text-slate-600 dark:text-slate-400" />
          </button>
          
          <div className="w-px h-6 bg-slate-300 dark:bg-slate-600 mx-1" />
          
          {toolbarButtons.map((btn, index) => 
            btn.type === 'divider' ? (
              <div key={index} className="w-px h-6 bg-slate-300 dark:bg-slate-600 mx-1" />
            ) : (
              <button
                key={index}
                onClick={() => execCommand(btn.command!, btn.value)}
                className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                title={btn.title}
              >
                {btn.icon && <btn.icon className="w-4 h-4 text-slate-600 dark:text-slate-400" />}
              </button>
            )
          )}
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsPinned(!isPinned)}
            className={cn(
              'p-2 rounded-lg transition-colors',
              isPinned 
                ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400' 
                : 'hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400'
            )}
            title={isPinned ? 'Unpin' : 'Pin'}
          >
            <Pin className="w-4 h-4" />
          </button>
          <button className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors" title="Add tag">
            <Tag className="w-4 h-4 text-slate-600 dark:text-slate-400" />
          </button>
          <button className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors" title="More">
            <MoreHorizontal className="w-4 h-4 text-slate-600 dark:text-slate-400" />
          </button>
        </div>
      </div>

      {/* Title Input */}
      <div className="px-6 pt-6">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Note title..."
          className="w-full text-2xl font-bold bg-transparent border-0 focus:outline-none placeholder:text-slate-400 text-slate-900 dark:text-white"
        />
      </div>

      {/* Editor */}
      <div className="px-6 py-4">
        <div
          ref={editorRef}
          contentEditable
          onInput={(e) => setContent(e.currentTarget.innerHTML)}
          className="min-h-[300px] outline-none prose prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-slate-300"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <span>Last edited just now</span>
        </div>
        <div className="flex items-center gap-2">
          {onDelete && (
            <button
              onClick={onDelete}
              className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 transition-colors"
              title="Delete note"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
          >
            <Save className="w-4 h-4" />
            Save
          </button>
        </div>
      </div>
    </motion.div>
  );
}

