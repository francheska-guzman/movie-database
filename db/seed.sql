CREATE TABLE favorites (
  ID SERIAL PRIMARY KEY,
  title VARCHAR(255),
  release VARCHAR(255),
  genre VARCHAR(255),
  raiting NUMERIC,
  comment TEXT
);

INSERT INTO favorites (title, release, genre, raiting, comment)
  VALUES ('Finding Nemo', '2003-05-30', 'Animation, Family', 7.5, 'Amazing!');

INSERT INTO favorites (title, release, genre, raiting, comment)
  VALUES ('The Secret Life of Pets', '2016-06-28', 'Animation', 5.8, 'Woof woof!');