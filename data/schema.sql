-- Create leaderboard table
CREATE TABLE leaderboard (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  player_name VARCHAR(50) NOT NULL,
  score INTEGER NOT NULL,
  moves INTEGER NOT NULL,
  time INTEGER NOT NULL,
  difficulty VARCHAR(20) NOT NULL DEFAULT 'normal',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create index for faster queries
CREATE INDEX idx_leaderboard_score ON leaderboard(score DESC, time ASC);
CREATE INDEX idx_leaderboard_difficulty ON leaderboard(difficulty);

-- Enable Row Level Security (optional tapi recommended)
ALTER TABLE leaderboard ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read
CREATE POLICY "Allow public read access"
ON leaderboard FOR SELECT
TO public
USING (true);

-- Policy: Anyone can insert
CREATE POLICY "Allow public insert access"
ON leaderboard FOR INSERT
TO public
WITH CHECK (true);