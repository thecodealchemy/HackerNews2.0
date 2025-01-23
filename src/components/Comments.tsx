import React from 'react';
import { formatTime } from '../utils/time';
import { Comment } from '../types';

interface CommentsProps {
  comments: Comment[];
}

export function Comments({ comments }: CommentsProps) {
  return (
    <div className="mt-4 space-y-3">
      <h3 className="font-semibold text-sm text-gray-700 dark:text-gray-300">Top Comments</h3>
      {comments.map((comment) => (
        <div key={comment.id} className="pl-3 border-l-2 border-orange-200 dark:border-orange-800">
          <div 
            className="text-sm text-gray-700 dark:text-gray-300"
            dangerouslySetInnerHTML={{ __html: comment.text || '' }}
          />
          <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            by {comment.by} • {formatTime(comment.time)}
          </div>
        </div>
      ))}
    </div>
  );
}