import React, { useEffect, useState } from 'react';
import { Story, User, StoryType } from './types';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { StoryCard } from './components/StoryCard';
import './App.css';

function App() {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [storyType, setStoryType] = useState<StoryType>('top');
  const [refreshing, setRefreshing] = useState(false);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return false;
  });

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
      const endpoint = `${type}stories`;
      const response = await fetch(`https://hacker-news.firebaseio.com/v0/${endpoint}.json`);
      const storyIds = await response.json();
      const promises = storyIds.slice(0, 30).map((id: any) =>
        fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(res => res.json())
      );
      const fetchedStories = await Promise.all(promises);
      setStories(fetchedStories);
      setLoading(false);
      setRefreshing(false);
    } catch (error) {
      console.error('Error fetching stories:', error);
      setLoading(false);
      setRefreshing(false);
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
    // If the story is already selected, deselect it (close comments)
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
    <div className="min-h-screen bg-orange-50 dark:bg-gray-900 relative pt-4">
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
    </div>
  );
}

export default App;