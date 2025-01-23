export type StoryType = 'top' | 'new' | 'best' | 'ask' | 'show' | 'job';

export interface Story {
  id: number;
  title: string;
  url?: string;
  score: number;
  by: string;
  time: number;
  descendants: number;
  type: string;
  kids?: number[];
  text?: string;
  comments?: Comment[];
}

export interface Comment {
  id: number;
  text?: string;
  by: string;
  time: number;
  kids?: number[];
}

export interface User {
  id: string;
  created: number;
  karma: number;
  about?: string;
  submitted?: number[];
}