-- Add views column to articles table
ALTER TABLE articles ADD COLUMN IF NOT EXISTS views INTEGER DEFAULT 0;

-- Create likes table
CREATE TABLE IF NOT EXISTS likes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_ip TEXT,
    article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
    video_id UUID REFERENCES videos(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_ip, article_id),
    UNIQUE(user_ip, video_id),
    CHECK (
        (article_id IS NOT NULL AND video_id IS NULL) OR
        (article_id IS NULL AND video_id IS NOT NULL)
    )
);

-- Create comments table
CREATE TABLE IF NOT EXISTS comments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_name TEXT,
    content TEXT NOT NULL,
    article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
    video_id UUID REFERENCES videos(id) ON DELETE CASCADE,
    parent_id UUID REFERENCES comments(id) ON DELETE CASCADE,
    approved BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CHECK (
        (article_id IS NOT NULL AND video_id IS NULL) OR
        (article_id IS NULL AND video_id IS NOT NULL)
    )
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_likes_article ON likes(article_id);
CREATE INDEX IF NOT EXISTS idx_likes_video ON likes(video_id);
CREATE INDEX IF NOT EXISTS idx_comments_article ON comments(article_id);
CREATE INDEX IF NOT EXISTS idx_comments_video ON comments(video_id);
CREATE INDEX IF NOT EXISTS idx_comments_parent ON comments(parent_id);

-- Update videos table views column to be integer (if currently text)
-- Note: This may require data conversion; we assume views are stored as text like '125K'.
-- For simplicity, we keep as text for now but you may want to convert later.
-- We'll add an integer column as well, but we can keep both.
-- ALTER TABLE videos ADD COLUMN IF NOT EXISTS views_int INTEGER DEFAULT 0;