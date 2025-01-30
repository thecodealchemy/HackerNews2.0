import React, { useEffect, useState } from 'react';
import { Story, User, StoryType } from './types';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { StoryCard } from './components/StoryCard';
import { ArrowBigDownDash, RefreshCw } from 'lucide-react';
import './App.css';

function App() {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [storyType, setStoryType] = useState<StoryType>(() => {
    // Retrieve storyType from localStorage or default to 'top'
    const savedStoryType = localStorage.getItem('storyType');
    return (savedStoryType as StoryType) || 'top';
  });
  const [refreshing, setRefreshing] = useState(false);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [storyIds, setStoryIds] = useState<number[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    return savedDarkMode ? JSON.parse(savedDarkMode) : false;
  });
  const [refreshMessage, setRefreshMessage] = useState<string | null>("Support us by bookmarking this site!"); // New state for refresh message

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    // Persist storyType in localStorage whenever it changes
    localStorage.setItem('storyType', storyType);
  }, [storyType]);

  const fetchStories = async (type: StoryType) => {
    try {
      setRefreshing(true);
      const endpoint = `${type}stories`;
      const response = await fetch(`https://hacker-news.firebaseio.com/v0/${endpoint}.json`);
      const newStoryIds = await response.json();

      // Check if the new story IDs are the same as the existing ones
      if (JSON.stringify(newStoryIds) === JSON.stringify(storyIds)) {
        setRefreshing(false);
        setRefreshMessage("No new stories to fetch"); // Set message for no new stories
        setTimeout(() => setRefreshMessage(null), 2000); // Clear message after 2 seconds
        return; // No new stories, skip re-fetching
      }

      setStoryIds(newStoryIds);
      setLoading(false);
      setCurrentIndex(0);
      setStories([]); // Clear previous stories
      await loadMoreStories(newStoryIds.slice(0, 30), 0); // Load initial batch with 0 delay
      setRefreshing(false);
      setRefreshMessage("Refreshed!"); // Set message for successful refresh
      setTimeout(() => setRefreshMessage(null), 2000); // Clear message after 2 seconds
    } catch (error) {
      console.error('Error fetching stories:', error);
      setLoading(false);
      setRefreshing(false);
      setRefreshMessage("Error refreshing"); // Set message for error
      setTimeout(() => setRefreshMessage(null), 2000); // Clear message after 2 seconds
    }
  };

  const loadMoreStories = async (ids: number[], timedelay: number = 100) => {
    setLoadingMore(true);
    for (const id of ids) {
      await delay(timedelay); // 10 requests per second
      const story = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(res => res.json());
      setStories(prevStories => [...prevStories, story]);
    }
    setCurrentIndex(prevIndex => prevIndex + ids.length);
    setLoadingMore(false);
  };

  const handleLoadMore = () => {
    const nextBatch = storyIds.slice(currentIndex, currentIndex + 30);
    if (nextBatch.length > 0) {
      loadMoreStories(nextBatch);
    }
  };

  const fetchUser = async (username: string) => {
    try {
      const response = await fetch(`https://hacker-news.firebaseio.com/v0/user/${username}.json`);
      const userData = await response.json();
      setSelectedUser(userData);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const handleCommentClick = async (story: Story) => {
    if (selectedStory?.id === story.id) {
      setSelectedStory(null);
      return;
    }
    try {
      if (story.kids) {
        const promises = story.kids.slice(0, 10).map(id =>
          fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(res => res.json())
        );
        const comments = await Promise.all(promises);
        setSelectedStory({ ...story, comments });
      } else {
        setSelectedStory({ ...story, comments: [] });
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  useEffect(() => {
    fetchStories(storyType);
  }, [storyType]);

  if (loading) {
    return (
      <div className="min-h-screen bg-orange-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-orange-50 dark:bg-gray-900 relative pt-8">
      <Header
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
      />
      <Navigation
        storyType={storyType}
        refreshing={refreshing}
        onSelectType={setStoryType}
      />
      <main className="container mx-auto px-4" style={{ maxWidth: 'fit-content' }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-auto [grid-template-rows:masonry]">
          {stories.map((story, index) => (
            <StoryCard
              key={story.id}
              story={story}
              index={index}
              onFetchComments={handleCommentClick}
              onFetchUser={fetchUser}
              selectedStory={selectedStory}
              selectedUser={selectedUser}
            />
          ))}
        </div>
      </main>
      {loadingMore && (
        <div className="text-center text-orange-500 py-4">
          Loading more stories...
        </div>
      )}
      {currentIndex < storyIds.length && !loadingMore && (
        <div className="text-center mt-6">
          <button
            onClick={handleLoadMore}
            className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-md shadow-md hover:bg-orange-600 transition"
          >
            <ArrowBigDownDash className="h-6 w-6" />
          </button>
        </div>
      )}
      {/* Reload Button */}
      <div className="fixed bottom-4 right-4 flex items-center space-x-2">
        {/* Pop-up Message */}
        {refreshMessage && (
          <div className="bg-gray-800 text-white text-sm px-3 py-1 rounded-md shadow-md">
            {refreshMessage}
          </div>
        )}
        <button
          onClick={() => fetchStories(storyType)}
          className="bg-orange-500 text-white p-3 rounded-full shadow-lg hover:bg-orange-600 transition"
        >
          <RefreshCw className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}

export default App;