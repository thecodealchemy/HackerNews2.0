import React from 'react';
import { ArrowUpIcon, MessageSquare, ExternalLink, Clock } from 'lucide-react';
import { formatTime } from '../utils/time';
import { Story, User } from '../types';
import { Comments } from './Comments';
import { UserProfile } from './UserProfile';

interface StoryCardProps {
  story: Story;
  index: number;
  onFetchComments: (story: Story) => void;
  onFetchUser: (username: string) => void;
  selectedStory: Story | null;
  selectedUser: User | null;
}

export function StoryCard({
  story,
  index,
  onFetchComments,
  onFetchUser,
  selectedStory,
  selectedUser,
}: StoryCardProps) {
  const getDomain = (url: string) => {
    try {
      return new URL(url).hostname.replace('www.', '');
    } catch {
      return '';
    }
  };

  const isSelected = selectedStory?.id === story.id;

  return (
    <div 
  className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 transition-all hover:shadow-lg 
    ${story.title.length > 80 ? 'md:col-span-2' : '' }
    ${story.text && story.text.length > 80 ? 'md:col-span-2' : '' }
    `}
>
      <div className="flex items-start space-x-3">
        <span className="text-gray-500 dark:text-gray-400 font-mono text-sm">{index + 1}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-start space-x-2">
            <a
              href={story.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-base font-semibold text-gray-900 dark:text-gray-100 hover:text-orange-600 dark:hover:text-orange-400 line-clamp-3"
            >
              {story.title}
            </a>
            {story.url && (
              <a
                href={story.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-500 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 flex-shrink-0 mt-1"
              >
                <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </div>
          {story.url && (
            <span className="text-xs text-gray-500 dark:text-gray-400 block mt-1">
              ({getDomain(story.url)})
            </span>
          )}
          {story.text && (
            <div 
              className="mt-2 text-sm text-gray-700 dark:text-gray-300"
              dangerouslySetInnerHTML={{ __html: story.text }}
            />
          )}
          <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-gray-600 dark:text-gray-300">
            <div className="flex items-center space-x-1">
              <ArrowUpIcon className="h-3 w-3 text-orange-500 dark:text-orange-400" />
              <span>{story.score} points</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-3 w-3" />
              <span>{formatTime(story.time)}</span>
            </div>
            <button
              onClick={() => onFetchComments(story)}
              className={`flex items-center space-x-1 hover:text-orange-500 ${
                isSelected ? 'text-orange-500 dark:text-orange-400' : ''
              }`}
            >
              <MessageSquare className="h-3 w-3" />
              <span>{story.descendants || 0} comments</span>
            </button>
            <button
              onClick={() => onFetchUser(story.by)}
              className="hover:text-orange-500"
            >
              by {story.by}
            </button>
          </div>

          {isSelected && selectedStory.comments && (
            <Comments comments={selectedStory.comments} />
          )}

          {selectedUser?.id === story.by && (
            <UserProfile user={selectedUser} />
          )}
        </div>
      </div>
    </div>
  );
}