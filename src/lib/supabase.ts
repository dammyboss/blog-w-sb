import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  featured_image: string;
  tags: string[];
  reading_time: string;
  publish_date: string;
  created_at: string;
  updated_at: string;
  views: number;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  youtube_id: string;
  category: string;
  thumbnail: string;
  duration: string;
  views: string; // keep as string for compatibility, but consider integer later
  publish_date: string;
  created_at: string;
  updated_at: string;
}

export interface Like {
  id: string;
  user_ip: string | null;
  article_id: string | null;
  video_id: string | null;
  created_at: string;
}

export interface Comment {
  id: string;
  user_name: string | null;
  content: string;
  article_id: string | null;
  video_id: string | null;
  parent_id: string | null;
  approved: boolean;
  created_at: string;
  updated_at: string;
}