CREATE TABLE IF NOT EXISTS t_p58206380_ai_game_creation_fre.users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS t_p58206380_ai_game_creation_fre.sessions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES t_p58206380_ai_game_creation_fre.users(id),
  token VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP DEFAULT NOW() + INTERVAL '30 days'
);