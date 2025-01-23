import React from 'react';
import { Sun, Moon } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export function Header({ darkMode, onToggleDarkMode }: HeaderProps) {
  return (
    <div className="fixed top-4 right-4 flex items-center gap-3 z-50">
      <button
        onClick={onToggleDarkMode}
        className="bg-white dark:bg-gray-800 text-orange-500 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-gray-700 px-4 py-2 rounded-full shadow-lg text-sm font-semibold flex items-center gap-2 transition-colors"
      >
        {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
      <div className="bg-orange-500 text-white px-4 py-2 rounded-full shadow-lg text-sm font-semibold">
        Hacker News 2.0
      </div>
    </div>
  );
}