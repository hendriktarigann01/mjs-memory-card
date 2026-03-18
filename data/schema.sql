DROP TABLE IF EXISTS leaderboard;

CREATE TABLE leaderboard (
  id          UUID                     DEFAULT gen_random_uuid() PRIMARY KEY,
  player_name VARCHAR(50)              NOT NULL,
  avatar      VARCHAR(20)              NOT NULL DEFAULT 'profile-1',
  time_ms     BIGINT                   NOT NULL,
  moves       INTEGER                  NOT NULL,
  stage       INTEGER                  NOT NULL DEFAULT 2,
  created_at  TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);
 
-- Primary ranking: fastest total time first
CREATE INDEX idx_leaderboard_time_ms ON leaderboard (time_ms ASC);
 
-- Row Level Security
ALTER TABLE leaderboard ENABLE ROW LEVEL SECURITY;
 
CREATE POLICY "Allow public read access"
  ON leaderboard FOR SELECT TO public USING (true);
 
CREATE POLICY "Allow public insert access"
  ON leaderboard FOR INSERT TO public WITH CHECK (true);