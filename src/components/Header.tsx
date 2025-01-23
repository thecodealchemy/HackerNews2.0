import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { Github } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export function Header({ darkMode, onToggleDarkMode }: HeaderProps) {
  return (
    <div className="fixed top-4 right-4 flex items-center gap-4 z-50">
      {/* GitHub Link */}
      <a
        href="https://github.com/thecodealchemy/HackerNews2.0"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 px-4 py-2 rounded-full shadow-lg text-sm font-semibold transition-colors"
      >
        <Github className="h-5 w-5" />
      </a>

      {/* Portfolio Link */}
      {/* <a
        href="https://code-alchemy.netlify.app/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 px-4 py-2 rounded-full shadow-lg text-sm font-semibold transition-colors"
      >
        <Globe className="h-5 w-5" />
        Portfolio
      </a> */}

      {/* Dark Mode Toggle */}
      <button
        onClick={onToggleDarkMode}
        className="bg-white dark:bg-gray-800 text-orange-500 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-gray-700 px-4 py-2 rounded-full shadow-lg text-sm font-semibold flex items-center gap-2 transition-colors"
      >
        {darkMode ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
      </button>

      {/* App Title */}
      <div className="bg-orange-500 text-white px-4 py-2 rounded-full shadow-lg text-sm font-semibold">
        Hacker News 2.0
      </div>
    </div>
  );
}
