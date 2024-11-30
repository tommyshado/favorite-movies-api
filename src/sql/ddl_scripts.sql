-- Create scripts

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE movies (
  id SERIAL PRIMARY KEY,
  title VARCHAR(250) NOT NULL,
  language VARCHAR(50) NOT NULL,
  overview TEXT NOT NULL,
  release_date DATE NOT NULL,
  adult BOOLEAN NOT NULL,
  ratings DECIMAL NOT NULL,
  popularity DECIMAL NOT NULL
);

CREATE TABLE favorite_movies (
  movie_id INT NOT NULL,
  FOREIGN KEY (movie_id) REFERENCES movies(id),
  user_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id),
  favorite_movie BOOLEAN NOT NULL
);

-- Insert scripts