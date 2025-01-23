import React from 'react';
import { formatTime } from '../utils/time';
import { User } from '../types';

interface UserProfileProps {
  user: User;
}

export function UserProfile({ user }: UserProfileProps) {
  return (
    <div className="mt-4 p-3 bg-orange-50 dark:bg-gray-700 rounded-lg">
      <h3 className="font-semibold text-sm text-gray-700 dark:text-gray-300">User Profile</h3>
      <div className="mt-2 text-sm">
        <p className="text-gray-600 dark:text-gray-300">Karma: {user.karma}</p>
        <p className="text-gray-600 dark:text-gray-300">Joined: {formatTime(user.created)}</p>
        {user.about && (
          <div 
            className="mt-2 text-gray-700 dark:text-gray-300"
            dangerouslySetInnerHTML={{ __html: user.about }}
          />
        )}
      </div>
    </div>
  );
}