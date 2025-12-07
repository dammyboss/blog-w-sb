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
}

export interface Video {
  id: string;
  title: string;
  description: string;
  youtube_id: string;
  category: string;
  thumbnail: string;
  duration: string;
  views: string;
  publish_date: string;
  created_at: string;
  updated_at: string;
}