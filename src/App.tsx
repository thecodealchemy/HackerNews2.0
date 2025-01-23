import React, { useEffect, useState } from 'react';
import { Story, User, StoryType } from './types';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { StoryCard } from './components/StoryCard';
import { ArrowBigDownDash } from 'lucide-react'; 
import './App.css';

function App() {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [storyType, setStoryType] = useState<StoryType>('top');
  const [refreshing, setRefreshing] = useState(false);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [storyIds, setStoryIds] = useState<number[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);

  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return false;
  });

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const fetchStories = async (type: StoryType) => {
    try {
      setRefreshing(true);
      setStories([]); // Clear previous stories
      setLoading(true);
      setCurrentIndex(0);

      const endpoint = `${type}stories`;
      const response = await fetch(`https://hacker-news.firebaseio.com/v0/${endpoint}.json`);
      const ids = await response.json();
      setStoryIds(ids);
      setLoading(false);

      await loadMoreStories(ids.slice(0, 30));

      setRefreshing(false);
    } catch (error) {
      console.error('Error fetching stories:', error);
      setLoading(false);
      setRefreshing(false);
    }
  };

  const loadMoreStories = async (ids: number[]) => {
    setLoadingMore(true);

    for (const id of ids) {
      await delay(100); // 10 requests per second
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-min">
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
    </div>
  );
}

export default App;
