import React, { useState } from 'react';
import { Siren, Sparkles, Award, MessageSquare, Star, Zap, Loader2, Menu } from 'lucide-react';
import { StoryType } from '../types';

interface NavigationProps {
  storyType: StoryType;
  refreshing: boolean;
  onSelectType: (type: StoryType) => void;
}

export function Navigation({ storyType, refreshing, onSelectType }: NavigationProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

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
    <div className="fixed top-16 right-4 flex flex-col gap-2 z-50">
      <div className="block md:hidden">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="bg-white dark:bg-gray-800 text-orange-500 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-gray-700 px-4 py-2 rounded-full shadow-lg text-sm font-semibold flex items-center gap-2 transition-colors"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>
      <div className={`flex flex-col gap-2 ${dropdownOpen ? 'block' : 'hidden'} md:flex`}>
        {(['top', 'new', 'best', 'ask', 'show', 'job'] as StoryType[]).map((type) => (
          <button
            key={type}
            onClick={() => {
              onSelectType(type);
              setDropdownOpen(false);
            }}
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
    </div>
  );
}