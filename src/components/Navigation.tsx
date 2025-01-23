import React from 'react';
import { Siren, Sparkles, Award, MessageSquare, Star, Zap, Loader2 } from 'lucide-react';
import { StoryType } from '../types';

interface NavigationProps {
  storyType: StoryType;
  refreshing: boolean;
  onSelectType: (type: StoryType) => void;
}

export function Navigation({ storyType, refreshing, onSelectType }: NavigationProps) {
  const getStoryTypeIcon = (type: StoryType) => {
    switch (type) {
      case 'top': return <Siren className="h-4 w-4" />;
      case 'new': return <Sparkles className="h-4 w-4" />;
      case 'best': return <Award className="h-4 w-4" />;
      case 'ask': return <MessageSquare className="h-4 w-4" />;
      case 'show': return <Star className="h-4 w-4" />;
      case 'job': return <Zap className="h-4 w-4" />;
      default: return <Siren className="h-4 w-4" />;
    }
  };

  return (
    <div className="fixed top-20 right-4 flex flex-col gap-2 z-50">
      {(['top', 'new', 'best', 'ask', 'show', 'job'] as StoryType[]).map((type) => (
        <button
          key={type}
          onClick={() => onSelectType(type)}
          disabled={refreshing}
          className={`bg-white dark:bg-gray-800 text-orange-500 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-gray-700 px-4 py-2 rounded-full shadow-lg text-sm font-semibold flex items-center gap-2 transition-colors ${
            storyType === type ? 'ring-2 ring-orange-500' : ''
          }`}
        >
          {getStoryTypeIcon(type)}
          {type.charAt(0).toUpperCase() + type.slice(1)}
          {refreshing && storyType === type && <Loader2 className="h-4 w-4 animate-spin" />}
        </button>
      ))}
    </div>
  );
}